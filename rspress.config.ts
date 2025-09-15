import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import sitemap from "rspress-plugin-sitemap";
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  mediumZoom: false,
  trailingSlash: true,
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
  title: 'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说',
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
            id: 'LA_COLLECT',
            charset: 'UTF-8',

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
          svg: '<?xml version="1.0" encoding="utf-8"?><svg width="20px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg>',
        },
        mode: 'link',
        content: 'https://gitee.com/desmond_GT/hassio-addons',

      }
    ],
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {

        text: '汉化专区',
        items: [
          {
            text: '官方网页汉化',
            link: 'https://ha-doc.hasscn.top',
          },
          {
            text: '移动App汉化',
            link: 'https://www.hasscn.top/companion/',
          },
          {
            text: 'Node Red 网页汉化',
            link: 'https://nodered.hasscn.top/',
          },
          {
            text: 'Home Assistant 开发者文档',
            link: 'https://www.hasscn.top/developers/',
          },
          {
            text: 'HASS Agent 汉化手册',
            link: 'https://www.hasscn.top/hass-agent/',
          },
        ],
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
      message: '<img src="/Weixin Image_20250915103333_263_16.jpg"></img><br/>Copyright © 2025 Home Assistant 中文站（老王杂谈说） | <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2025160066号</a> | <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902004199" target="_blank">浙公网安备33010902004199号</a>',
    },
  },
  head: [
    ['meta', { name: 'referrer', content: 'origin-when-cross-origin' }],
    ['meta', { name: 'author', content: '老王杂谈说' }],
    ['meta', { name: 'keywords', content: 'Home Assistant,Home Assistant 中文网，Home Assistant 中文站，Home Assistant OS 极速版，老王杂谈说，HAOS，Nodered' }],
  ]
});
