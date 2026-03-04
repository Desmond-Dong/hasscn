const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', '.sync-temp', 'music-assistant.io', 'src', 'content', 'docs');
const targetDir = path.join(__dirname, '..', 'docs', 'music-assistant');

// 翻译映射表
const translations = {
  // 标题和常用词
  'Provider': '提供者',
  'provider': '提供者',
  'Features': '功能',
  'Configuration': '配置',
  'Settings': '设置',
  'Known Issues': '已知问题',
  'Notes': '说明',
  'Other': '其他',
  'Not yet supported': '尚不支持',
  'Requirements': '要求',
  'Prerequisites': '先决条件',
  'Installation': '安装',
  'Usage': '使用',
  'Troubleshooting': '故障排除',
  'FAQ': '常见问题',
  'Help': '帮助',
  
  // 常用短语
  'Subscription FREE': '免费订阅',
  'Self-Hosted Local Media': '自托管本地媒体',
  'Media Types Supported': '支持的媒体类型',
  'Artists, Albums, Tracks, Playlists': '艺术家、专辑、曲目、播放列表',
  'Recommendations': '推荐',
  'Supported': '支持',
  'Lyrics Supported': '支持歌词',
  'Radio Mode': '电台模式',
  'Maximum Stream Quality': '最高流媒体质量',
  'Login Method': '登录方式',
  'Yes': '是',
  'No': '否',
  
  // 音乐质量相关
  'Lossless': '无损',
  'Lossy': '有损',
  
  // 文档链接
  '/ui/': '/music-assistant/ui/',
  '/usage/': '/music-assistant/usage/',
  '/settings/': '/music-assistant/settings/',
  '/faq/': '/music-assistant/faq/',
  '/player-support/': '/music-assistant/player-support/',
  '/music-providers/': '/music-assistant/music-providers/',
  '/installation/': '/music-assistant/installation/',
  '/integration/': '/music-assistant/integration/',
  '/help/': '/music-assistant/help/',
  '/support/': '/music-assistant/support/',
  '/ha-plugin/': '/music-assistant/ha-plugin/',
  '/companion-app/': '/music-assistant/companion-app/',
  '/audiopipeline/': '/music-assistant/audiopipeline/',
  '/dsp/': '/music-assistant/dsp/',
};

// 翻译函数
function translateContent(content) {
  let result = content;
  
  // 替换链接
  for (const [en, zh] of Object.entries(translations)) {
    if (en.startsWith('/')) {
      result = result.split(en).join(zh);
    }
  }
  
  return result;
}

// 处理单个文件
function processFile(sourcePath, targetPath) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const translated = translateContent(content);
  fs.writeFileSync(targetPath, translated, 'utf8');
  console.log(`Processed: ${path.basename(targetPath)}`);
}

// 递归处理目录
function processDirectory(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(sourcePath, targetPath);
    } else if (entry.name.endsWith('.md')) {
      processFile(sourcePath, targetPath);
    }
  }
}

// 主函数
function main() {
  console.log('Starting translation...');
  processDirectory(sourceDir, targetDir);
  console.log('Done!');
}

main();
