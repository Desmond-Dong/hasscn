import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',
  title: 'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说',
  icon: '/icon.png',
  logo: {
    light: '/home-assistant-wordmark-with-margins-color-on-light.png',
    dark: '/home-assistant-wordmark-with-margins-color-on-dark.png',
  },

  globalStyles: path.join(__dirname, 'styles/index.css'),

  markdown: {
    // Rspress 2.0 不再支持 mdxRs，已迁移到 JS MDX 解析器
  },

  locales: [
    {
      lang: 'zh',
      label: '🇨🇳 简体中文',
      title: 'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说',
      description: '打造开源最全的免费的Home Assistant中文站以及国内专用的Home Assistant OS极速版',
    },
  ],

  builderConfig: {
    html: {
      tags: [
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: '/css/home-assistant-theme.css',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '//sdk.51.la/js-sdk-pro.min.js?id=3MhQABjxy4RZQ6Ig&ck=3MhQABjxy4RZQ6Ig',
            id: 'LA_COLLECT',
            charset: 'UTF-8',
          },
        },
        {
          tag: 'script',
          attrs: {
            src: '/js/bilingual-nav.js',
            defer: 'true',
          },
        },
      ],
    },
  },

  mediumZoom: false,
  themeConfig: {
    darkMode: true,
    enableAppearanceAnimation: true,
    locales: [
      {
        lang: 'zh',
        outlineTitle: '页面大纲',
        nav: [
          {
            text: 'home',
            link: '/',
          },
          {
            text: 'localization',
            items: [
              {
                text: 'officialWebLocalization',
                link: 'https://ha-doc.hasscn.top',
              },
              {
                text: 'mobileAppLocalization',
                link: '/companion/',
              },
              {
                text: 'homeAssistantDeveloperDocs',
                link: '/developers/',
              },
              {
                text: 'hassAgentLocalization',
                link: '/hass-agent/',
              },
              {
                text: 'esphomeGettingStarted',
                link: '/esphome/',
              },
              {
                text: 'otherResources',
                link: 'https://gitee.com/ha-china/Translated/',
              },
            ],
          },
          {
            text: 'downloads',
            link: '/download',
          },
          {
            text: 'qa',
            link: '/QandA',
          },
          {
            text: 'reviews',
            link: '/evaluation/index',
          },
          {
            text: 'sponsor',
            link: '/sponsor',
          },
          {
            text: 'about',
            items: [
              {
                text: 'aboutSite',
                link: '/about',
              },
              {
                text: 'searchEngine',
                link: '/no-baidu',
              },
              {
                text: 'majorEvents',
                link: '/MajorEvents',
              },
              {
                text: 'serverStatus',
                link: 'https://status.hasscn.top/status/1',
              },
            ],
          },
          ],
      },
    ],
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
          svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg>',
        },
        mode: 'link',
        content: 'https://gitee.com/desmond_GT/hassio-addons',
      },
    ],
    footer: {
      message: 'Copyright © 2025 Home Assistant 中文站（老王杂谈说） | <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2025160066号</a> | <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902004199" target="_blank">浙公网安备33010902004199号</a>',
    },
  },

  head: [
    ['meta', { name: 'referrer', content: 'origin-when-cross-origin' }],
    ['meta', { name: 'author', content: '老王杂谈说' }],
    ['meta', { name: 'keywords', content: 'Home Assistant,Home Assistant 中文网，Home Assistant 中文站，Home Assistant OS 极速版，老王杂谈说，HAOS，Nodered，智能家居，开源智能家居，IoT，家庭助理，智能生活' }],
    ['meta', { property: 'og:title', content: 'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说' }],
    ['meta', { property: 'og:description', content: '打造开源最全的免费的Home Assistant中文站以及国内专用的Home Assistant OS极速版' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.hasscn.top' }],
    ['meta', { property: 'og:image', content: 'https://www.hasscn.top/icon.png' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'baidu-site-verification', content: '' }],
    ['meta', { name: '360-site-verification', content: '' }],
    ['meta', { name: 'sogou_site_verification', content: '' }],
    ['meta', { name: 'shenma-site-verification', content: '' }],
    ['link', { rel: 'canonical', href: 'https://www.hasscn.top' }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: 'https://www.hasscn.top' }],
    ],
});