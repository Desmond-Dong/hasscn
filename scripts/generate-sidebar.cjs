/**
 * 从 _meta.json 文件生成 Rspress 侧边栏配置
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

/**
 * 读取 _meta.json 文件
 */
function readMetaJson(dir) {
  const metaPath = path.join(dir, '_meta.json');
  if (fs.existsSync(metaPath)) {
    const content = fs.readFileSync(metaPath, 'utf-8');
    return JSON.parse(content);
  }
  return null;
}

/**
 * 获取文件的标题
 */
function getFileTitle(filePath) {
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 从 frontmatter 中获取标题
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?\n/);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  }
  
  // 从第一个标题获取
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  return null;
}

/**
 * 生成侧边栏项目
 */
function generateSidebarItems(dir, basePath, metaItems) {
  const items = [];
  
  for (const item of metaItems) {
    if (typeof item === 'string') {
      // 字符串项目 - 文件
      const filePath = path.join(dir, `${item}.md`);
      const mdxPath = path.join(dir, `${item}.mdx`);
      const actualPath = fs.existsSync(filePath) ? filePath : mdxPath;
      
      if (fs.existsSync(actualPath)) {
        const title = getFileTitle(actualPath) || item;
        items.push({
          text: title,
          link: `${basePath}/${item}`,
        });
      }
    } else if (item.type === 'file') {
      const filePath = path.join(dir, `${item.name}.md`);
      const mdxPath = path.join(dir, `${item.name}.mdx`);
      const actualPath = fs.existsSync(filePath) ? filePath : mdxPath;
      
      if (fs.existsSync(actualPath)) {
        const title = item.label || getFileTitle(actualPath) || item.name;
        items.push({
          text: title,
          link: `${basePath}/${item.name}`,
        });
      }
    } else if (item.type === 'dir') {
      const subDir = path.join(dir, item.name);
      const subMeta = readMetaJson(subDir);
      
      if (subMeta) {
        const subItems = generateSidebarItems(subDir, `${basePath}/${item.name}`, subMeta);
        items.push({
          text: item.label || item.name,
          collapsible: item.collapsible !== false,
          collapsed: item.collapsed || false,
          items: subItems,
        });
      }
    } else if (item.type === 'custom-link') {
      items.push({
        text: item.label,
        link: item.link,
      });
    }
  }
  
  return items;
}

/**
 * 生成 Music Assistant 侧边栏配置
 */
function generateMusicAssistantSidebar() {
  const maDir = path.join(docsDir, 'music-assistant');
  const meta = readMetaJson(maDir);
  
  if (!meta) {
    console.error('无法读取 music-assistant/_meta.json');
    return [];
  }
  
  return generateSidebarItems(maDir, '/music-assistant', meta);
}

// 生成配置
const sidebar = generateMusicAssistantSidebar();

// 输出为 JavaScript 模块格式
const output = `// 自动生成的 Music Assistant 侧边栏配置
// 生成时间: ${new Date().toISOString()}

module.exports = ${JSON.stringify(sidebar, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'music-assistant-sidebar.js'), output);
console.log('侧边栏配置已生成到 scripts/music-assistant-sidebar.js');
console.log(JSON.stringify(sidebar, null, 2));
