import * as path from 'node:path';
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
     ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'HAOS中国版',
        link: '/hassos',
      },
      {
        text: '下载专区',
        link: '/download',
      },
      {
        text: '助力发展',
        link: '/sponsor',
      },
    ],
    // sidebar: {
    //   '/hassos/': [
    //     {
    //       text: 'Home Assistant 中国版',
    //       link: '/hassos',
    //     },
    // },
    
    footer: {
      message: 'Copyright © 2025 Home Assistant 中文站 | 浙ICP备2025160066号',
    },
  },
});
