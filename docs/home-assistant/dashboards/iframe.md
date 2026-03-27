---
title: 网页卡片
description: '网页卡片允许您将喜爱的网页直接嵌入到 Home Assistant 中。您也可以嵌入存储在 <config-directory/www 文件夹中的文件，并使用 /local/<file 引用它们。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 网页卡片

网页卡片允许您将喜爱的网页直接嵌入到 Home Assistant 中。您也可以嵌入存储在 `<config-directory>/www` 文件夹中的文件，并使用 `/local/<file>` 引用它们。

网页卡片用于[网页仪表盘](/home-assistant/dashboards/dashboard/#webpage-dashboard)。

<p class='img'>
  <img width="500" src='/home-assistant/images/dashboards/iframe.png' alt='Windy 天气雷达作为网页'>
  Windy 天气雷达作为网页。
</p>

要将网页卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦接管控制，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

请注意，由于某些网站设置的安全限制，并非所有网页都可以被嵌入。这些限制由您的浏览器强制执行，会阻止将它们嵌入到 Home Assistant 仪表盘中。

:::important
如果您使用 HTTPS 访问 Home Assistant，则无法嵌入使用 HTTP 的网站。
:::

## YAML 配置

当您使用 YAML 模式或在 UI 代码编辑器中更倾向于使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`iframe`"
  type: string
url:
  required: true
  description: 网站 URL。
  type: string
aspect_ratio:
  required: false
  description: '强制图像高度为宽度的比例。有效格式：高度百分比值（`23%`）或使用冒号或"x"分隔符表示的比例（`16:9` 或 `16x9`）。对于比例，第二个元素可以省略，默认为"1"（`1.78` 等于 `1.78:1`）。'
  type: string
  default: "50%"
allow_open_top_navigation:
  required: false
  description: '允许用户通过在 Home Assistant 移动应用中打开默认浏览器来打开 iframe 内容链接。默认为 false，因为它在 iframe sandbox 属性上添加了 allow-top-navigation-by-user-activation，这降低了安全性。因此，如果您需要此功能并对 iframe 内容有信心，请将其设置为 true。'
  type: boolean
  default: false
hide_background:
  required: false
  description: '隐藏卡片背景，使其透明。这会移除背景颜色、阴影和边框。对于允许透明背景的页面很有用，这样 iframe 可以融入仪表盘视图。'
  type: boolean
  default: false
title:
  required: false
  description: 卡片标题。
  type: string
allow:
  required: false
  description: iframe 的 [权限策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy#iframes)，即 [`allow`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#allow) 属性的值。
  type: string
  default: "fullscreen"
disable_sandbox:
  required: false
  description: 禁用 iframe 的 [sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) 属性，例如在 Chrome 中查看 PDF 时需要。这会降低安全性，仅应在您信任 iframe 内容的情况下使用。
  type: boolean
  default: false

### 示例

```yaml
type: iframe
url: https://www.home-assistant.io
aspect_ratio: 75%
```