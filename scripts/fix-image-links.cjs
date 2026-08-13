const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs', 'music-assistant');

// 将图片链接从 [alt](/assets/...) 格式转换为 <a href="/assets/..."><img src="/assets/..." alt="alt"></a> 格式
// 或者直接使用 <img> 标签

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 匹配 [![alt](/assets/image.png)](/assets/image.png) 格式 - 可点击的图片
  const clickableImageRegex = /\[!\[([^\]]*)\]\((\/assets\/[^)]+)\)\]\((\/assets\/[^)]+)\)/g;
  if (clickableImageRegex.test(content)) {
    content = content.replace(clickableImageRegex, '<a href="$3" target="_blank"><img src="$2" alt="$1" loading="lazy" /></a>');
    modified = true;
  }
  
  // 重置正则表达式的 lastIndex
  clickableImageRegex.lastIndex = 0;
  
  // 匹配 [..](/assets/...) 格式 - 其中 .. 是任意文字（图片链接）
  // 只有当链接以 /assets/ 开头且以图片扩展名结尾时才转换
  const imageLinkRegex = /\[([^\]]*)\]\((\/assets\/[^)]+\.(png|jpg|jpeg|gif|svg|webp))\)/gi;
  if (imageLinkRegex.test(content)) {
    content = content.replace(imageLinkRegex, '<a href="$2" target="_blank"><img src="$2" alt="$1" loading="lazy" style="max-width: 100%;" /></a>');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md')) {
      processFile(filePath);
    }
  }
}

walkDir(docsDir);
console.log('Done!');
