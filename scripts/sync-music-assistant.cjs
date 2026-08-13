#!/usr/bin/env node
/**
 * Music Assistant 文档同步脚本
 * 
 * 功能：
 * 1. 从 GitHub 获取上游仓库最新文件列表和 SHA
 * 2. 与本地翻译状态对比，找出需要更新的文件
 * 3. 下载需要更新的文件到临时目录
 * 4. 输出变更报告
 * 
 * 使用方法：
 *   node scripts/sync-music-assistant.js           # 检查更新
 *   node scripts/sync-music-assistant.js --download # 下载更新的文件
 *   node scripts/sync-music-assistant.js --init     # 初始化所有文件
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  upstreamRepo: 'music-assistant/music-assistant.io',
  upstreamBranch: 'main',
  upstreamDocsPath: 'src/content/docs',
  statusFile: path.join(__dirname, '../docs/music-assistant/.translation-status.json'),
  outputDir: path.join(__dirname, '../docs/music-assistant'),
  tempDir: path.join(__dirname, '../.sync-temp/music-assistant'),
};

// GitHub API 请求封装 - 优先使用 gh CLI
function githubApi(apiPath) {
  return new Promise((resolve, reject) => {
    try {
      // 尝试使用 gh CLI
      const result = execSync(`gh api "${apiPath}"`, { encoding: 'utf-8' });
      resolve(JSON.parse(result));
    } catch (e) {
      // 如果 gh CLI 失败，尝试直接 HTTPS 请求
      const options = {
        hostname: 'api.github.com',
        path: apiPath,
        method: 'GET',
        headers: {
          'User-Agent': 'hasscn-sync-script',
          'Accept': 'application/vnd.github.v3+json',
        },
      };

      if (process.env.GITHUB_TOKEN) {
        options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
      }

      https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else if (res.statusCode === 403) {
            reject(new Error('GitHub API 速率限制，请设置 GITHUB_TOKEN 环境变量或使用 gh auth login'));
          } else {
            reject(new Error(`GitHub API 错误: ${res.statusCode}`));
          }
        });
      }).on('error', reject);
    }
  });
}

// 下载文件内容
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// 递归获取目录下所有文件
async function getAllFiles(repoPath) {
  const items = await githubApi(`/repos/${CONFIG.upstreamRepo}/contents/${repoPath}?ref=${CONFIG.upstreamBranch}`);
  const files = [];

  for (const item of items) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      files.push({
        name: item.name,
        path: item.path,
        sha: item.sha,
        downloadUrl: item.download_url,
        relativePath: item.path.replace(CONFIG.upstreamDocsPath + '/', ''),
      });
    } else if (item.type === 'dir') {
      const subFiles = await getAllFiles(item.path);
      files.push(...subFiles);
    }
  }

  return files;
}

// 获取最新 commit SHA
async function getLatestCommitSha() {
  const commits = await githubApi(`/repos/${CONFIG.upstreamRepo}/commits?sha=${CONFIG.upstreamBranch}&per_page=1`);
  return commits[0]?.sha;
}

// 读取本地翻译状态
function loadTranslationStatus() {
  if (fs.existsSync(CONFIG.statusFile)) {
    return JSON.parse(fs.readFileSync(CONFIG.statusFile, 'utf-8'));
  }
  return {
    upstreamRepo: CONFIG.upstreamRepo,
    upstreamBranch: CONFIG.upstreamBranch,
    upstreamDocsPath: CONFIG.upstreamDocsPath,
    lastSync: null,
    lastCommitSha: null,
    files: {},
  };
}

// 保存翻译状态
function saveTranslationStatus(status) {
  fs.writeFileSync(CONFIG.statusFile, JSON.stringify(status, null, 2));
}

// 比较文件变化
function compareFiles(upstreamFiles, localStatus) {
  const result = {
    new: [],
    modified: [],
    deleted: [],
    unchanged: [],
  };

  const upstreamMap = new Map(upstreamFiles.map((f) => [f.relativePath, f]));
  const localMap = new Map(Object.entries(localStatus.files));

  // 检查上游文件
  for (const file of upstreamFiles) {
    const local = localMap.get(file.relativePath);
    if (!local) {
      result.new.push(file);
    } else if (local.sourceSha !== file.sha) {
      result.modified.push({ ...file, oldSha: local.sourceSha });
    } else {
      result.unchanged.push(file);
    }
  }

  // 检查已删除的文件
  for (const [relativePath, local] of localMap) {
    if (!upstreamMap.has(relativePath)) {
      result.deleted.push({ relativePath, ...local });
    }
  }

  return result;
}

// 下载文件到临时目录
async function downloadFiles(files, tempDir) {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const downloaded = [];
  for (const file of files) {
    console.log(`  下载: ${file.relativePath}`);
    const content = await downloadFile(file.downloadUrl);
    const targetPath = path.join(tempDir, file.relativePath);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, content);
    downloaded.push({ ...file, localPath: targetPath });
  }

  return downloaded;
}

// 更新翻译状态
function updateTranslationStatus(status, files, latestSha) {
  const now = new Date().toISOString();

  for (const file of files) {
    const existing = status.files[file.relativePath] || {};
    status.files[file.relativePath] = {
      sourceSha: file.sha,
      translatedAt: existing.translatedAt || null,
      status: existing.status || 'pending', // pending, translated, needs_update
      lastModified: now,
    };
  }

  status.lastSync = now;
  status.lastCommitSha = latestSha;

  return status;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const shouldDownload = args.includes('--download');
  const shouldInit = args.includes('--init');
  const shouldForce = args.includes('--force');

  console.log('='.repeat(60));
  console.log('Music Assistant 文档同步工具');
  console.log('='.repeat(60));
  console.log();

  // 加载本地状态
  console.log('📁 加载本地翻译状态...');
  const localStatus = loadTranslationStatus();
  console.log(`   上次同步: ${localStatus.lastSync || '从未同步'}`);
  console.log(`   上次 Commit: ${localStatus.lastCommitSha || '无'}`);
  console.log();

  // 获取最新 commit
  console.log('🔗 获取上游最新信息...');
  const latestSha = await getLatestCommitSha();
  console.log(`   最新 Commit: ${latestSha?.substring(0, 7) || '获取失败'}`);

  if (latestSha === localStatus.lastCommitSha && !shouldInit && !shouldForce) {
    console.log();
    console.log('✅ 上游无更新，无需同步');
    console.log('💡 提示: 使用 --force 参数强制下载');
    return;
  }
  console.log();

  // 获取上游文件列表
  console.log('📄 获取上游文件列表...');
  const upstreamFiles = await getAllFiles(CONFIG.upstreamDocsPath);
  console.log(`   找到 ${upstreamFiles.length} 个文档文件`);
  console.log();

  // 比较文件变化
  console.log('🔍 检查文件变化...');
  const changes = compareFiles(upstreamFiles, localStatus);

  console.log(`   新增: ${changes.new.length} 个`);
  console.log(`   修改: ${changes.modified.length} 个`);
  console.log(`   删除: ${changes.deleted.length} 个`);
  console.log(`   未变: ${changes.unchanged.length} 个`);
  console.log();

  // 显示详细变化
  if (changes.new.length > 0) {
    console.log('📝 新增文件:');
    changes.new.forEach((f) => console.log(`   + ${f.relativePath}`));
    console.log();
  }

  if (changes.modified.length > 0) {
    console.log('📝 修改文件:');
    changes.modified.forEach((f) => console.log(`   ~ ${f.relativePath} (${f.oldSha?.substring(0, 7)} → ${f.sha?.substring(0, 7)})`));
    console.log();
  }

  if (changes.deleted.length > 0) {
    console.log('📝 已删除文件:');
    changes.deleted.forEach((f) => console.log(`   - ${f.relativePath}`));
    console.log();
  }

  // 需要处理的文件
  const filesToProcess = (shouldInit || shouldForce) ? upstreamFiles : [...changes.new, ...changes.modified];

  if (filesToProcess.length === 0) {
    console.log('✅ 没有需要更新的文件');
    return;
  }

  // 下载文件
  if (shouldDownload) {
    console.log(`📥 下载 ${filesToProcess.length} 个文件...`);
    const downloaded = await downloadFiles(filesToProcess, CONFIG.tempDir);
    console.log();
    console.log(`✅ 已下载到: ${CONFIG.tempDir}`);
    console.log();
    console.log('📋 下一步操作:');
    console.log('   1. 翻译 .sync-temp/music-assistant 目录中的文件');
    console.log('   2. 将翻译好的文件移动到 docs/music-assistant 目录');
    console.log('   3. 运行此脚本更新翻译状态');
  } else {
    console.log('💡 提示: 使用 --download 参数下载需要更新的文件');
    console.log('💡 提示: 使用 --init 参数初始化所有文件');
  }

  // 更新状态文件
  const updatedStatus = updateTranslationStatus(localStatus, filesToProcess, latestSha);
  saveTranslationStatus(updatedStatus);
  console.log();
  console.log('✅ 翻译状态已更新');
}

main().catch(console.error);
