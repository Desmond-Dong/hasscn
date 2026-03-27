---
title: 区域卡片
description: '区域卡片可让您控制和监控单个区域。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 区域卡片

区域卡片可让您控制和监控单个区域。

<p class='img'>
  <img src='/home-assistant/images/dashboards/area-cards.png' alt='区域卡片截图'>
  区域卡片截图。
</p>

要将区域卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您将无法让这个特定仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

卡片上会显示该区域内实体的按钮，包括风扇、灯光和开关。如果区域中有运动传感器且检测到运动，则左上角会显示运动传感器图标。

如果为该区域添加了摄像头，您可以显示摄像头画面而不是区域图片。

## YAML 配置

当您使用 YAML 模式，或只是更喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`area`"
  type: string
area:
  required: true
  description: "`area` 的 ID。"
  type: string
color:
  required: false
  description: 设置图标颜色以及悬停或聚焦状态的颜色。接受[颜色令牌](/home-assistant/dashboards/area/#available-colors)或十六进制颜色代码。
  type: string
display_type:
  required: false
  description: 定义卡片的显示样式。可选值包括 `compact`（精简布局）、`icon`（显示区域图标）、`picture`（显示区域图片）和 `camera`（显示实时摄像头画面）。
  type: string
  default: "picture"
camera_view:
  required: false
  description: 如果显示摄像头，当启用了 `stream` 时，`live` 会显示实时画面。
  default: auto
  type: string
aspect_ratio:
  required: false
  description: '强制图像高度按宽度比例显示。有效格式为高度百分比值（`23%`）或使用冒号或 "x" 分隔的比例（`16:9` 或 `16x9`）。对于比例，第二个元素可省略，默认值为 "1"（`1.78` 等同于 `1.78:1`）。'
  default: "16:9"
  type: string
tap_action:
  required: false
  description: 点击卡片时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
  default: none
image_tap_action:
  required: false
  description: 点击图片时执行的动作（仅在 `display_type` 为 `icon`、`picture` 或 `camera` 时可用）。未配置时，图片点击会使用卡片的 `tap_action`。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
  default: "摄像头显示类型为 `more-info`，其他情况为 `none`"
alert_classes:
  required: false
  type: list
  default: "moisture, motion"
  description: 二元传感器设备类别列表。当状态为 on 时，卡片会显示对应的提醒图标。如果显示类型设置为 `compact`，则只显示第一个提醒图标。
sensor_classes:
  required: false
  type: list
  default: "temperature, humidity"
  description: 传感器设备类别列表。卡片会显示该区域这些传感器读数的平均值。
features:
  required: false
  description: 用于控制该区域实体的额外小部件。请参阅[可用功能](/home-assistant/dashboards/features)。
  type: list
features_position:
  required: false
  description: 功能在区域卡片中的位置。可选 `bottom` 或 `inline`。当设置为 `inline` 时，只会显示第一个功能。
  type: string
  default: bottom
exclude_entities:
  required: false
  description: 要从卡片中排除的实体列表。这会影响 `sensor_classes`、`alert_classes` 和 `features`。
  type: list

### 示例

基本示例：

```yaml
type: area
area: bedroom
```

复杂示例：

```yaml
type: area
area: bedroom
display_type: picture
tap_action:
  action: navigate
  navigation_path: /lovelace/my_bedroom
sensor_classes:
  - temperature
  - humidity
alert_classes:
  - moisture
  - motion
features:
  - type: area-controls
```

## 可用颜色

以下颜色可用于为区域卡片着色：`primary`、`accent`、`disabled`、`red`、`pink`、`purple`、`deep-purple`、`indigo`、`blue`、`light-blue`、`cyan`、`teal`、`green`、`light-green`、`lime`、`yellow`、`amber`、`orange`、`deep-orange`、`brown`、`grey`、`blue-grey`、`black`、`white`，或任意十六进制颜色代码（例如 `#93c47d`）。
