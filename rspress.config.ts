import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import sitemap from "rspress-plugin-sitemap";
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  mediumZoom: false,
  trailingSlash: true,

  // Enable automatic route generation for better SEO
  autoGenerateSidebar: true,

  // Configure meta tags for better Chinese SEO
  transformHead: ({ pageData }) => {
    const frontmatter = pageData?.frontmatter;
    const title = frontmatter?.title || 'Home Assistant 中文网';
    const description = frontmatter?.description || '打造开源最全的免费的Home Assistant中文站以及国内专用的Home Assistant OS极速版';

    return [
      ['meta', { name: 'title', content: title }],
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'article:author', content: '老王杂谈说' }],
      ['meta', { name: 'article:section', content: 'Home Assistant' }],
      ['meta', { name: 'baidu_union_verify', content: '' }],
      ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ];
  },

  plugins: [
    pluginFontOpenSans(),
    readingTime({
      defaultLocale: 'zh-CN',
    }),
    sitemap({
      domain: "https://www.hasscn.top",
      customMaps: {
        "/": {
          loc: "/",
          priority: "1.0",
          changefreq: "daily",
        },
        "/haoscn": {
          loc: "/haoscn",
          priority: "0.9",
          changefreq: "weekly",
        },
        "/QandA": {
          loc: "/QandA",
          priority: "0.8",
          changefreq: "weekly",
        },
        "/about": {
          loc: "/about",
          priority: "0.7",
          changefreq: "monthly",
        },
        "/download": {
          loc: "/download",
          priority: "0.9",
          changefreq: "weekly",
        },
      },
      defaultChangeFreq: "monthly",
      defaultPriority: "0.6",
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
          {
            text: 'ESPHome 准备开始',
            link: 'https://www.hasscn.top/esphome/',
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
    ['meta', { property: 'og:site_name', content: 'Home Assistant 中文网' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'language', content: 'zh-CN' }],
    ['meta', { name: 'geo.region', content: 'CN' }],
    ['meta', { name: 'geo.country', content: 'China' }],
    ['meta', { name: 'baidu-site-verification', content: '' }],
    ['meta', { name: '360-site-verification', content: '' }],
    ['meta', { name: 'sogou_site_verification', content: '' }],
    ['meta', { name: 'shenma-site-verification', content: '' }],
    ['link', { rel: 'canonical', href: 'https://www.hasscn.top' }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: 'https://www.hasscn.top' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Home Assistant 中文网",
      "description": "打造开源最全的免费的Home Assistant中文站以及国内专用的Home Assistant OS极速版",
      "url": "https://www.hasscn.top",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.hasscn.top/icon.png"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.hasscn.top/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "老王杂谈说",
        "url": "https://www.hasscn.top"
      }
    })],
  ],
  markdown: {
    dangerouslySetRawContent: true,
  },
});
