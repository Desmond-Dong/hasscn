import type { SidebarGroup } from "@rspress/core";

function withPrefix(groups: SidebarGroup[]): SidebarGroup[] {
  const prefixLink = (link: string) => link.startsWith("/developers/") ? link : `/developers${link}`;
  return groups.map((group) => ({
    ...group,
    items: group.items?.map((item) => {
      if ("link" in item) {
        return { ...item, link: prefixLink(item.link) };
      }
      return item;
    }),
  }));
}

export const developersSidebar: SidebarGroup[] = withPrefix([
  {
    text: "开始使用",
    items: [
      { text: "首页", link: "/index" },
      { text: "架构总览", link: "/architecture_index" },
      { text: "开发环境", link: "/development_environment" },
      { text: "开发工作流", link: "/development_submitting" },
    ],
  },
  {
    text: "Home Assistant Core",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "Core 概览", link: "/development_index" },
      { text: "创建集成", link: "/creating_component_index" },
      { text: "配置流", link: "/config_entries_index" },
      { text: "YAML 配置", link: "/configuration_yaml_index" },
      { text: "自动化", link: "/automations" },
      { text: "实体模型", link: "/core/entity" },
      { text: "Asyncio", link: "/asyncio_index" },
      { text: "认证与权限", link: "/auth_index" },
      { text: "Bluetooth", link: "/bluetooth" },
      { text: "Intent", link: "/intent_index" },
      { text: "设备自动化", link: "/device_automation_index" },
      { text: "数据录入流", link: "/data_entry_flow_index" },
      { text: "设备注册表", link: "/device_registry_index" },
      { text: "实体注册表", link: "/entity_registry_index" },
      { text: "网络发现", link: "/network_discovery" },
    ],
  },
  {
    text: "API 与数据访问",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "REST API", link: "/api/rest" },
      { text: "WebSocket API", link: "/api/websocket" },
      { text: "原生应用集成 API", link: "/api/native-app-integration" },
      { text: "Supervisor API", link: "/api/supervisor/endpoints" },
      { text: "Python 库", link: "/api_lib_index" },
      { text: "实例 URL", link: "/instance_url" },
    ],
  },
  {
    text: "平台与客户端",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "前端", link: "/frontend" },
      { text: "Supervisor", link: "/supervisor" },
      { text: "操作系统", link: "/operating-system" },
      { text: "Android", link: "/android" },
      { text: "App 指南", link: "/apps" },
      { text: "语音", link: "/voice/overview" },
      { text: "文档规范", link: "/documenting" },
      { text: "国际化", link: "/internationalization" },
      { text: "翻译", link: "/translations" },
      { text: "杂项", link: "/misc" },
    ],
  },
  {
    text: "进阶主题",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "架构：Core", link: "/architecture/core" },
      { text: "架构：设备与服务", link: "/architecture/devices-and-services" },
      { text: "Asyncio 101", link: "/asyncio_101" },
      { text: "阻塞操作", link: "/asyncio_blocking_operations" },
      { text: "使用异步", link: "/asyncio_working_with_async" },
      { text: "应用教程", link: "/apps/tutorial" },
      { text: "应用配置", link: "/apps/configuration" },
      { text: "应用发布", link: "/apps/publishing" },
      { text: "操作系统开发板", link: "/operating-system/boards/overview" },
      { text: "意图识别", link: "/voice/intent-recognition" },
      { text: "语音管道", link: "/voice/pipelines" },
      { text: "LLM API", link: "/core/llm" },
    ],
  },
  {
    text: "开发博客",
    collapsible: true,
    collapsed: true,
    items: [
      { text: "2018-2020", link: "/blog/2019-07-19-building-all-the-things" },
      { text: "2021-2022", link: "/blog/2022-10-26-new-unit-enumerators" },
      { text: "2023", link: "/blog/2023-02-28-custom-tile-features" },
    ],
  },
]);
