import * as path from 'node:path';
import * as fs from 'node:fs';
import type { RspressPlugin } from '@rspress/core';

/**
 * 自定义插件：在所有 HTML 文件中注入 51.la 统计代码到 head 部分
 */
export function analyticsPlugin(): RspressPlugin {
  return {
    name: 'analytics-plugin',
    
    // 在构建完成后处理 HTML 文件
    afterBuild: async (config) => {
      const outDir = config.outDir || path.join(process.cwd(), 'doc_build');
      
      // 51.la 统计代码
      const analyticsCode = `
<script charset="UTF-8" id="LA_COLLECT" src="//sdk.51.la/js-sdk-pro.min.js"></script>
<script>LA.init({id:"3MhQABjxy4RZQ6Ig",ck:"3MhQABjxy4RZQ6Ig"})</script>`;
      
      // 递归查找所有 HTML 文件
      function processDirectory(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            processDirectory(fullPath);
          } else if (entry.name.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            
            // 在 </head> 前插入统计代码
            if (content.includes('</head>') && !content.includes('LA_COLLECT')) {
              content = content.replace('</head>', `${analyticsCode}\n</head>`);
              fs.writeFileSync(fullPath, content, 'utf-8');
              console.log(`✓ Injected analytics into: ${fullPath}`);
            }
          }
        }
      }
      
      processDirectory(outDir);
      console.log('✓ Analytics injection complete');
    },
  };
}
