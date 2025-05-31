import * as path from 'node:path';
import BilibiliIframe from '@/components/BilibiliIframe'
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Home Assistant 中文站',
  icon: '/icon.png',
  logo: {
    light: '/home-assistant-wordmark-with-margins-color-on-light.png',
    dark: '/home-assistant-wordmark-with-margins-color-on-dark.png',
  },
  builderConfig: {
    html: {
      tags: [
        {
          tag: 'script',
          attrs: {
            src: 'https://hm.baidu.com/hm.js?861929bdb98476134bbae53567c75414',
          },
        },
      ],
    },
  },
  themeConfig: {
     socialLinks: [
       {
         icon: 'wechat',
         mode: 'link',
         content: '/community.html',
       },
       {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/ha-china/',
      },
     ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '中国专区',
        link: '/hasscn',
      },

      {
        text: '下载专区',
        link: '/download',
      },
      {
        text: '快速问答',
        link: '/QandA',
      },
      {
        text: '支持我',
        link: '/sponsor',
      },
      {
        text: '关于',
        link: '/about',
      },
      {
        text: '服务器状态',
        link: 'https://status.hasscn.top/status/1',
      },

    ],
   
    
    footer: {
      message: 'Copyright © 2025 Home Assistant 中文站 | <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2025160066号</a>',
    },
  },
  head: [
    ['meta', { name: 'referrer', content: 'origin-when-cross-origin' }],
  ]
});
