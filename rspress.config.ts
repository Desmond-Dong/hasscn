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
  themeConfig: {
    // socialLinks: [
    //   {
    //     icon: 'github',
    //     mode: 'link',
    //     content: 'https://github.com/desmond-dong',
    //   },
    // ],
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
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          link: '/guide',
        },
      ],
      '/hassos/': [
        {
          text: 'Home Assistant 中国版',
          link: '/hassos',
        },
      ],
      '/sponsor/': [
        {
          text: '关于此站',
          link: '/sponsor',
        },
      ],
    },
    footer: {
      message: 'Copyright © 2024 Home Assistant 中文站 | 浙ICP备2025160066号',
    },
  },
});
