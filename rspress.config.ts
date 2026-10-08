import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginAlgolia } from '@rspress/plugin-algolia';
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
    pluginAlgolia(),
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
          svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m15.585 4.586.486-.274q.032.17.06.303c.032.158.06.289.072.418.103 1.118.665 1.941 1.462 2.127 1.165.27 2.264-.177 2.856-1.164.711-1.184.403-2.634-.808-3.507C16.346.061 12.647-.609 8.663.56.072 3.095-2.867 13.65 3.23 20.122c2.608 2.769 5.92 3.964 9.68 3.873 4.817-.113 8.285-2.513 10.5-6.674 1.57-2.952-.137-6.178-3.405-6.849a21 21 0 0 0-5.675-.362 4.8 4.8 0 0 0-1.805.548c-.625.325-.805.998-.735 1.666.065.608.531.972 1.086 1.064 1.118.175 2.25.277 3.378.37.327.027.657.03.986.033.473.005.944.01 1.405.086 1.314.217 1.766 1.284 1.09 2.425a4.7 4.7 0 0 1-.577.766 6.55 6.55 0 0 1-3.318 1.964c-2.333.57-4.669.603-6.99-.13-2.645-.835-4.221-2.777-4.277-5.392A9.1 9.1 0 0 1 5.76 8.907c.36-.654.558-1.327.503-2.067a26 26 0 0 1-.05-.972l-.025-.565q.401.084.792.212c1.011.406 2.007.592 3.102.294a5.6 5.6 0 0 1 1.902-.122 4.76 4.76 0 0 0 2.921-.714c.218-.128.439-.251.681-.387"/></svg>',
        },
        mode: 'link',
        content: 'https://gitcode.com/ha-china/ha-apps',
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
