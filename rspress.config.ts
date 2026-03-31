import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { analyticsPlugin } from './scripts/analytics-plugin';
import { globalNav } from './scripts/nav-config';
import mdiIconPlugin from './scripts/remark-mdi-icon';
import {
  companionSidebar,
  developersSidebar,
  homeAssistantSidebar,
  musicAssistantSidebar,
} from './scripts/sidebar-config';

const llmsExcludedRoutes = new Set([
  '/403',
  '/404',
  '/no-baidu',
  '/deprecated',
  '/guide',
  '/BilibiliVideo',
  '/TestVideo',
]);

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  lang: 'zh',
  title:
    'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说',
  icon: '/icon.png',
  logo: {
    light: '/home-assistant-wordmark-with-margins-color-on-light.png',
    dark: '/home-assistant-wordmark-with-margins-color-on-dark.png',
  },

  globalStyles: path.join(__dirname, 'styles/index.css'),

  description:
    'Home Assistant 中文网聚焦 Home Assistant 中国用户的安装部署、汉化资源、Music Assistant、ESPHome、配套应用与开发者文档。',

  markdown: {
    remarkPlugins: [mdiIconPlugin],
    link: {
      checkDeadLinks: false,
    },
  },

  search: false,

  plugins: [
    pluginSitemap({
      siteUrl: 'https://www.hasscn.top',
      defaultChangeFreq: 'monthly',
      defaultPriority: '0.6',
    }),
    pluginLlms({
      llmsTxt: {
        name: 'llms.txt',
        onTitleGenerate: ({ title, description }) => {
          return `# ${title}\n\n> ${description}\n\n本站聚焦 Home Assistant 中文内容、安装部署、本土化实践，以及 Music Assistant、ESPHome、配套应用与开发者文档。\n`;
        },
      },
      exclude: ({ page }) => {
        const routePath = page.routePath.endsWith('/')
          ? page.routePath.slice(0, -1)
          : page.routePath;
        return llmsExcludedRoutes.has(routePath);
      },
    }),
    analyticsPlugin(),
  ],

  builderConfig: {
    html: {
      tags: [
        {
          tag: 'script',
          attrs: {
            src: 'https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js',
            type: 'module',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: '/css/home-assistant-theme.css',
          },
        },
      ],
    },
  },

  mediumZoom: false,
  themeConfig: {
    darkMode: true,
    enableAppearanceAnimation: true,
    llmsUI: true,
    outlineTitle: '页面大纲',
    nav: globalNav,

    // 多侧边栏配置
    sidebar: {
      ...homeAssistantSidebar,
      '/developers/': developersSidebar,
      '/music-assistant/': musicAssistantSidebar,
      '/companion/': companionSidebar,
    },

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
      message:
        'Copyright © 2025 Home Assistant 中文站（老王杂谈说） | <a href="https://beian.miit.gov.cn" target="_blank">浙ICP备2025160066号</a> | <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902004199" target="_blank">浙公网安备33010902004199号</a>',
    },
  },

  head: [
    ['meta', { name: 'referrer', content: 'origin-when-cross-origin' }],
    ['meta', { name: 'author', content: '老王杂谈说' }],
    ['meta', { name: 'application-name', content: 'Home Assistant 中文网' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-title', content: 'Home Assistant 中文网' },
    ],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    ['meta', { name: 'theme-color', content: '#18bcf2' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Home Assistant,Home Assistant 中国,老王杂谈说,Home Assistant 中国社区,Home Assistant 中文,Music Assistant,ESPHome,Home Assistant 开发者文档,Home Assistant Companion,Home Assistant 中文网,Home Assistant 中文站,Home Assistant OS 极速版,HAOS,智能家居,开源智能家居,IoT,家庭助理',
      },
    ],
    [
      'meta',
      {
        property: 'og:title',
        content:
          'Home Assistant (家庭助理) | Home Assistant 中文网 | 公众号：老王杂谈说',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Home Assistant 中文网聚焦 Home Assistant 中国用户的安装部署、汉化资源、Music Assistant、ESPHome、配套应用与开发者文档。',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.hasscn.top' }],
    ['meta', { property: 'og:site_name', content: 'Home Assistant 中文网' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    [
      'meta',
      { property: 'og:image', content: 'https://www.hasscn.top/icon.png' },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'meta',
      { name: 'twitter:title', content: 'Home Assistant 中文网 | 老王杂谈说' },
    ],
    [
      'meta',
      {
        name: 'twitter:description',
        content:
          'Home Assistant 中国用户的安装部署、汉化资源、Music Assistant、ESPHome、配套应用与开发者文档。',
      },
    ],
    [
      'meta',
      { name: 'twitter:image', content: 'https://www.hasscn.top/icon.png' },
    ],
    [
      'meta',
      {
        name: 'robots',
        content:
          'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      },
    ],
  ],
});
