---
title: "Registering resources"
---

如果你想要用 custom cards、strategies 或 views 扩展 Home Assistant 界面，需要加载外部 resources。

第一步是让这些 resources 对 Home Assistant 前端可访问。这通过在你的 config 文件夹中创建一个名为 `www` 的新目录来实现。创建此目录并重启 Home Assistant。

重启后，你可以将文件放入此目录。每个文件都可以通过 UI 在 `/local` 下无认证访问。

下一步是向 Home Assistant 界面注册这些 resources。方法是按照下面链接导航到 Resources 页面：

[![Open your Home Assistant instance and show your resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_dashboards/)（注意：重定向后，点击右上角的三个点菜单。）

或者，你也可以通过将 resource 添加到配置中 `lovelace` 的 `resources` 部分来注册它：

```yaml
resources:
  - url: /local/<name of the resource>.js
    type: module
```

如果你正在构建一个社区 dashboard，在 Home Assistant 能在新 dashboard 对话框中显示它之前，必须加载该 resource。添加或更新 resource 后，刷新 Home Assistant 并重新打开对话框。

关于完整的 dashboard strategy 和选择器注册流程，请参见 [custom strategies](./custom-strategy.md)。
