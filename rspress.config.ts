import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import sitemap from "rspress-plugin-sitemap";
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  mediumZoom: false,
  plugins: [ 
    pluginFontOpenSans(),
    readingTime({
      defaultLocale: 'zh-CN',
    }),
    sitemap({
    domain: "https://www.hasscn.top",
    customMaps: {
      "/sitemap": {
        loc: "/sitemap",
        lastmod: "2024-04-27T07:44:43.422Z",
        priority: "0.7",
        changefreq: "always",
      },
    },
    defaultChangeFreq: "monthly",
    defaultPriority: "0.5",
  }),],
  root: path.join(__dirname, 'docs'),
  theme: 'theme/index.ts',
  title: 'Home Assistant 中文站 | Home Assistant 中文网 | 公众号：老王杂谈说',
  description: '打造开源最全的免费的Home Assistant中文站以及国内专用的Home Assistant OS极速版',
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
            src: '//sdk.51.la/js-sdk-pro.min.js?id=3MhQABjxy4RZQ6Ig&ck=3MhQABjxy4RZQ6Ig',
            id:'LA_COLLECT',
            charset:'UTF-8',

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
      {
        icon: 'bilibili',
        mode: 'link',
        content: 'https://space.bilibili.com/358562782',
      },
      {
        icon: {
          svg: '<svg>gitee</svg>',
        },
        mode: 'link',
        content: 'hhttps://gitee.com/desmond_GT/hassio-addons',
     
        }      ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '中国专区',
        items: [
          {
            text: 'Home Assistant OS 极速版',
            link: '/haoscn',
          },
          {
            text: 'Home Assistant OS 加载项',
            link: '/addoncn',
          },
          {
            text: 'HACS 极速版 (by Alone)',
            link: '/hacscn',
          },
          {
            text: '官方已弃用的安装方式',
            link: '/deprecated',
          },
          {
            text: '品牌目录',
            link: '/brand',
          },
        ]
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
        items: [
          {
            text: '关于本站',
            link: '/about',
          },
          {
            text: '搜索引擎',
            link: '/no-baidu',
          },
          {
            text: '重要事件',
            link: '/MajorEvents',
          },
          {
            text: '服务器状态(China Only)',
            link: 'https://status.hasscn.top/status/1',
          },
        ]
        
      },
    ],
   
    
    footer: {
      message: 'Copyright © 2025 Home Assistant 中文站 | <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2025160066号</a>',
    },
  },
  head: [
    ['meta', { name: 'referrer', content: 'origin-when-cross-origin' }],
    ['meta', { name: 'author', content: '老王杂谈说' }],
    ['meta', { name: 'keywords', content: 'Home Assistant,Home Assistant 中文网，Home Assistant 中文站，Home Assistant OS 极速版，老王杂谈说，HAOS，Nodered' }],
  ]
});
