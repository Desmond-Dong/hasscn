// Home Assistant Companion 侧边栏配置

import type { SidebarGroup } from '@rspress/core';

export { homeAssistantSidebar } from './home-assistant-sidebar';

export const companionSidebar: SidebarGroup[] = [
  {
    text: 'Companion Apps',
    items: [{ text: '概述', link: '/companion/index' }],
  },
  {
    text: '入门指南',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '入门指南', link: '/companion/getting_started/index' },
      {
        text: '连接安全级别',
        link: '/companion/getting_started/connection_security_level',
      },
    ],
  },
  {
    text: '核心功能',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '核心功能概述', link: '/companion/core/index' },
      { text: '操作', link: '/companion/core/actions' },
      { text: 'Android 版本', link: '/companion/core/android-flavors' },
      { text: '位置追踪', link: '/companion/core/location' },
      { text: '传感器', link: '/companion/core/sensors' },
    ],
  },
  {
    text: '通知',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '基础通知', link: '/companion/notifications/basic' },
      { text: '可操作通知', link: '/companion/notifications/actionable' },
      { text: '附件', link: '/companion/notifications/attachments' },
      { text: '动态内容', link: '/companion/notifications/dynamic-content' },
      { text: '关键通知', link: '/companion/notifications/critical' },
      { text: '通知详情', link: '/companion/notifications/details' },
      { text: '通知清除', link: '/companion/notifications/cleared' },
      { text: '通知命令', link: '/companion/notifications/commands' },
      { text: '通知声音', link: '/companion/notifications/sounds' },
      { text: '本地通知', link: '/companion/notifications/local' },
      { text: '接收通知', link: '/companion/notifications/received' },
    ],
  },
  {
    text: '集成',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '集成概述', link: '/companion/integrations/index' },
      {
        text: 'Android 设备控制',
        link: '/companion/integrations/android-device-controls',
      },
      {
        text: 'Android 主屏幕启动器',
        link: '/companion/integrations/android-home-app-launcher',
      },
      {
        text: 'Android 快速设置',
        link: '/companion/integrations/android-quick-settings',
      },
      {
        text: 'Android 快捷方式',
        link: '/companion/integrations/android-shortcuts',
      },
      {
        text: 'Android WebView',
        link: '/companion/integrations/android-webview',
      },
      {
        text: 'Android Widgets',
        link: '/companion/integrations/android-widgets',
      },
      { text: '应用事件', link: '/companion/integrations/app-events' },
      { text: '手势', link: '/companion/integrations/gestures' },
      { text: '触觉反馈', link: '/companion/integrations/haptics' },
      { text: 'iOS Widgets', link: '/companion/integrations/iOS-widgets' },
      { text: '分享', link: '/companion/integrations/sharing' },
      { text: 'Siri 快捷指令', link: '/companion/integrations/siri-shortcuts' },
      { text: '主题', link: '/companion/integrations/theming' },
      { text: '通用链接', link: '/companion/integrations/universal-links' },
      { text: 'URL 处理器', link: '/companion/integrations/url-handler' },
      {
        text: 'X-Callback-URL',
        link: '/companion/integrations/x-callback-url',
      },
    ],
  },
  {
    text: 'Apple Watch',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Apple Watch', link: '/companion/apple-watch/index' },
      { text: 'Watch 操作', link: '/companion/apple-watch/actions' },
      { text: '表盘复杂功能', link: '/companion/apple-watch/complications' },
    ],
  },
  {
    text: 'Wear OS',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Wear OS', link: '/companion/wear-os/index' },
      { text: 'Wear OS 传感器', link: '/companion/wear-os/sensors' },
    ],
  },
  {
    text: 'Android Auto',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'Android Auto', link: '/companion/android-auto/index' }],
  },
  {
    text: 'CarPlay',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'CarPlay', link: '/companion/carplay/index' }],
  },
  {
    text: 'Meta Quest',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'Meta Quest', link: '/companion/meta-quest/index' }],
  },
  {
    text: '故障排除',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '设置问题', link: '/companion/troubleshooting/setup' },
      { text: '错误信息', link: '/companion/troubleshooting/errors' },
      { text: '网络问题', link: '/companion/troubleshooting/networking' },
      { text: '集成问题', link: '/companion/troubleshooting/integrations' },
      {
        text: 'Beta 版本清理',
        link: '/companion/troubleshooting/beta-cleaning',
      },
      { text: '更多帮助', link: '/companion/troubleshooting/more-help' },
    ],
  },
  {
    text: '截图展示',
    collapsible: true,
    collapsed: true,
    items: [{ text: 'Android 截图展示', link: '/companion/gallery/index' }],
  },
];
