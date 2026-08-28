# Custom panel

**Custom panel** 集成允许您使用 JavaScript 编写自己的面板，并将其添加到 Home Assistant 中。有关如何构建自定义面板，请参阅开发者文档中的[相关说明](https://developers.home-assistant.io/docs/frontend/custom-ui/creating-custom-panels/)。

要在您的安装中启用自定义面板，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
panel_custom:
  - name: my-panel
    sidebar_title: TodoMVC
    sidebar_icon: mdi:work
    url_path: my-todomvc
    module_url: /local/my-panel.js
    config:
      who: world
```

:::tip
将自定义面板存放在 `<config>/www` 中，即可在前端通过 `/local` 路径访问它们。

:::

```yaml
name:
  description: 用于渲染面板的 Web 集成名称。
  required: true
  type: string
sidebar_title:
  description: 侧边栏中显示的面板友好名称。若省略，则不会显示侧边栏入口，但仍可通过 URL 访问。
  required: false
  type: string
sidebar_icon:
  description: 入口图标。请选择 [Material Design Icons](https://pictogrammers.com/library/mdi/) 中的图标，并在名称前加上 `mdi:`，例如 `mdi:car`、`mdi:ambulance` 或 `mdi:motorbike`。
  required: false
  default: "mdi:bookmark"
  type: icon
url_path:
  description: 面板在前端中的访问 URL。若省略，则默认为面板名称。
  required: false
  type: string
js_url:
  description: 包含面板 JavaScript 的 URL。如果与 `module_url` 一起使用，则仅会提供给使用前端 ES5 构建版本的用户。
  required: false
  type: string
module_url:
  description: 包含面板 JavaScript 模块的 URL。它会作为 JavaScript 模块而不是脚本加载。如果与 `js_url` 一起使用，则仅会提供给使用前端“latest”构建版本的用户。
  required: false
  type: string
config:
  description: 在实例化 Web 组件时传递给它的配置。
  required: false
  type: list
require_admin:
  description: 是否需要管理员权限才能查看此面板。
  required: false
  type: boolean
  default: false
embed_iframe:
  description: 设为 `true` 以将面板嵌入 iframe 中。如果面板使用 React 框架，或包含冲突的 Web 组件，则需要启用此项。
  required: false
  default: false
  type: boolean
trust_external_script:
  description: 默认情况下，用户在加载外部来源脚本前必须确认。设为 `true` 将跳过此确认。
  required: false
  default: false
  type: boolean
```
