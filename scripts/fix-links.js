const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs', 'music-assistant');

// 需要修复的链接前缀
const linkReplacements = [
  { from: '](/music-providers/', to: '](/music-assistant/music-providers/' },
  { from: '](/player-support/', to: '](/music-assistant/player-support/' },
  { from: '](/settings/', to: '](/music-assistant/settings/' },
  { from: '](/faq/', to: '](/music-assistant/faq/' },
  { from: '](/dsp/', to: '](/music-assistant/dsp/' },
  { from: '](/ui/', to: '](/music-assistant/ui/' },
  { from: '](/usage/', to: '](/music-assistant/usage/' },
  { from: '](/integration/', to: '](/music-assistant/integration/' },
  { from: '](/support/', to: '](/music-assistant/support/' },
  { from: '](/installation/', to: '](/music-assistant/installation/' },
  { from: '](/help/', to: '](/music-assistant/help/' },
  { from: '](/ha-plugin/', to: '](/music-assistant/ha-plugin/' },
  { from: '](/companion-app/', to: '](/music-assistant/companion-app/' },
  { from: '](/audiopipeline/', to: '](/music-assistant/audiopipeline/' },
];

// 图片链接格式修复 - 将 [..](/assets/...) 改为 <img src="/assets/..." />
// 注意：只修复纯图片链接，不修复带文字的链接

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 修复内部链接
  for (const { from, to } of linkReplacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      modified = true;
    }
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