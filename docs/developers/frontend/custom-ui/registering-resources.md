---
title: "注册资源"
description: '如果你想使用自定义 cards、strategies 或 views 扩展 Home Assistant 界面，就需要加载外部资源。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 注册资源

如果你想使用自定义 cards、strategies 或 views 扩展 Home Assistant 界面，就需要加载外部资源。

第一步是让 Home Assistant 前端能够访问这些资源。为此，需要在你的 config 文件夹中创建一个名为 `www` 的新目录。创建该目录后，重启 Home Assistant。

重启后，你就可以将文件放入该目录中。每个文件都可以通过 UI 在 `/local` 下无认证访问。

下一步是将这些资源注册到 Home Assistant 界面中。可以通过下面的链接进入 Resources 页面：

[![Open your Home Assistant instance and show your resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_dashboards/)（注意：跳转后，请点击右上角的三点菜单。）

:::note

只有当当前活跃用户的 profile 启用了 "advanced mode" 时，这个区域才可用。

:::

![Screenshot of the Advanced Mode selector found on the Profile page](/developers/img/en/frontend/frontend-profile-advanced-mode.png)

或者，你也可以通过在配置中的 `lovelace` 的 `resources` 部分添加它来注册资源：

```yaml
resources:
  - url: /local/<name of the resource>.js
    type: module
```
