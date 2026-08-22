export const globalNav = [
  {
    text: '首页',
    link: '/',
  },
  {
    text: '汉化资源',
    items: [
      {
        text: 'HACS 极速版',
        link: '/hacscn',
      },
      {
        text: 'Home Assistant OS 加载项',
        link: '/addoncn',
      },
      {
        text: '汉化蓝图',
        link: '/blueprints',
      },
      {
        text: '热门集成推荐',
        link: '/integrations',
      },
      {
        text: '其它汉化资源',
        link: 'https://gitee.com/ha-china/Translated/',
      },
    ],
  },
  {
    text: '下载专区',
    link: '/download',
  },
  {
    text: '穿透服务',
    link: '/tunnel',
  },
  {
    text: "OHF roadmap汉化",
    link: "/roadmap.html"
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
        text: '更新日志',
        link: '/Changelog',
      },
      {
        text: '快速问答',
        link: '/QandA',
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
    ],
  },
];

export const homeAssistantNav = [
  {
    text: '返回首页',
    link: '/',
  },
  {
    text: 'Home Assistant',
    link: '/home-assistant/index',
  },
  {
    text: '安装',
    link: '/home-assistant/installation/index',
  },
  {
    text: '入门指南',
    link: '/home-assistant/getting-started/index',
  },
  {
    text: '集成',
    link: '/home-assistant/integrations/index',
  },
  {
    text: '仪表盘',
    link: '/home-assistant/dashboards/index',
  },
  {
    text: '常见任务',
    link: '/home-assistant/common-tasks/index',
  },
  {
    text: '语音控制',
    link: '/home-assistant/voice_control/index',
  },
  {
    text: '更多',
    items: [
      {
        text: '云服务',
        link: '/home-assistant/cloud/index',
      },
      {
        text: '开发者',
        link: '/home-assistant/developers/index',
      },
      {
        text: '文档',
        link: '/home-assistant/docs/index',
      },
      {
        text: '常见问题',
        link: '/home-assistant/faq/index',
      },
      {
        text: '博客',
        link: '/home-assistant/blog/index',
      },
    ],
  },
];

export const developersNav = [
  {
    text: '返回首页',
    link: '/',
  },
  {
    text: 'Home Assistant',
    items: [
      { text: '总览', link: '/developers/architecture_index', activeMatch: '^/developers/architecture' },
      { text: '核心', link: '/developers/development_index', activeMatch: '^/developers/development' },
      { text: '前端', link: '/developers/frontend', activeMatch: '^/developers/frontend' },
      { text: 'Supervisor', link: '/developers/supervisor', activeMatch: '^/developers/supervisor|^/developers/api/supervisor' },
      { text: 'Apps', link: '/developers/apps', activeMatch: '^/developers/apps' },
      { text: '操作系统', link: '/developers/operating-system', activeMatch: '^/developers/operating-system' },
      { text: '语音', link: '/developers/voice/overview', activeMatch: '^/developers/voice' },
      { text: '翻译', link: '/developers/translations', activeMatch: '^/developers/translations|^/developers/internationalization' },
      { text: 'Android', link: '/developers/android', activeMatch: '^/developers/android' },
      { text: 'Apple 平台', link: '/developers/apple/index', activeMatch: '^/developers/apple' },
    ],
  },
  { text: '杂项', link: '/developers/misc', activeMatch: '^/developers/misc|^/developers/review-process|^/developers/ai_policy|^/developers/documenting|^/developers/api_lib|^/developers/asyncio' },
  { text: '博客', link: '/developers/blog', activeMatch: '^/developers/blog' },
];
