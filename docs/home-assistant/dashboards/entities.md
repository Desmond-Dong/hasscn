---
title: 实体卡片
description: '实体卡片是最常见的卡片类型。它将项目组合成列表。它可以用于显示实体的状态或属性，也可以包含按钮、网页链接等。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 实体卡片

实体卡片是最常见的卡片类型。它将项目组合成列表。它可以用于显示实体的状态或属性，也可以包含按钮、网页链接等。

要将实体卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不再自动更新。
     - 一旦您接管了控制权，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并为您的仪表盘配置动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`entities`"
  type: string
entities:
  required: true
  description: "实体 ID 或 `entity` 对象或特殊行对象（见下文）的列表。"
  type: list
title:
  required: false
  description: 卡片标题。
  type: string
icon:
  required: false
  description: 显示在标题左侧的图标。
  type: string
show_header_toggle:
  required: false
  description: 用于打开/关闭所有实体的按钮。
  type: boolean
  default: true
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
state_color:
  required: false
  description: 设置为 `true` 可在实体处于活动状态时为图标着色。
  type: boolean
  default: false
header:
  required: false
  description: 要渲染的页眉组件。请参阅[页眉文档](/home-assistant/dashboards/header-footer/)。
  type: map
footer:
  required: false
  description: 要渲染的页脚组件。请参阅[页脚文档](/home-assistant/dashboards/header-footer/)。
  type: map

## 实体选项

如果您将实体定义为对象而不是字符串（通过在实体 ID 前添加 `entity:`），您可以添加更多自定义和配置。

entity:
  required: true
  description: 实体 ID。
  type: string
type:
  required: false
  description: "设置自定义卡片类型：`custom:my-custom-card`。它也可以用于强制具有默认特殊行格式的实体渲染为简单的状态。您可以通过设置 type: `simple-entity` 来实现。例如，这可以用于将带有可编辑控件的助手替换为只读值。"
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
icon:
  required: false
  description: 覆盖图标或实体图片。
  type: string
image:
  required: false
  description: 覆盖实体图片。
  type: string
secondary_info:
  required: false
  description: "显示附加信息。可选值：`entity-id`、`last-changed`、`last-updated`、`area`、`last-triggered`（仅用于自动化和脚本）、`position` 或 `tilt-position`（仅用于支持的遮盖）、`brightness`（仅用于灯光）。"
  type: string
format:
  required: false
  description: "状态应如何格式化。目前仅用于时间戳传感器。有效值为：`relative`、`total`、`date`、`time` 和 `datetime`。"
  type: string
action_name:
  required: false
  description: 按钮标签（仅适用于 `script` 和 `scene` 行）。
  type: string
state_color:
  required: false
  description: 设置为 `true` 可在实体处于活动状态时为图标着色。
  type: boolean
  default: false
tap_action:
  required: false
  description: 点击行时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 长按行时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 双击行时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map
confirmation:
  required: false
  description: 对于在行中显示按钮元素的实体（例如 button、门锁、脚本），此选项会在按下按钮时添加确认对话框。请参阅[确认选项](/home-assistant/dashboards/actions/#options-for-confirmation)了解配置选项。
  type: map

## 特殊行元素

实体卡片不仅可以将实体状态显示为文本输出，还支持多种特殊行，包括按钮、属性、网页链接、分隔线和分区等。

### 属性

type:
  required: true
  description: "`attribute`"
  type: string
entity:
  required: true
  description: 实体 ID。
  type: string
attribute:
  required: true
  description: 要从实体显示的属性。
  type: string
prefix:
  required: false
  description: 实体状态前的文本。
  type: string
suffix:
  required: false
  description: 实体状态后的文本。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
icon:
  required: false
  description: 要使用的图标。默认为实体的图标。
  type: string
format:
  required: false
  description: "属性值应如何格式化。目前仅支持时间戳属性。有效值为：`relative`、`total`、`date`、`time` 和 `datetime`。"
  type: string

### 按钮

带有（可选）图标、标签和行末单个文本按钮的行，可以触发定义的动作。

type:
  required: true
  description: "`button`"
  type: string
entity:
  required: false
  description: "实体 ID。需要提供 `entity` 或 `name`（或两者）。"
  type: string
name:
  required: false
  description: "行标签。需要提供 `entity` 或 `name`（或两者）。"
  type: string
  default: "如果指定了 `entity`，则为友好名称。"
icon:
  required: false
  description: 显示在主标签左侧的图标。
  type: string
action_name:
  required: false
  description: 按钮标签。
  type: string
  default: "`运行`"
tap_action:
  required: true
  description: 点击按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 长按按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 双击按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map

### 按钮组

在单行中并排显示多个按钮。请参阅下方的示例。

type:
  required: true
  description: "`buttons`"
  type: string
entities:
  required: true
  description: 要显示的实体列表。每个条目可以是实体 ID 或映射对象。
  type: list
  keys:
    entity:
      required: true
      description: 实体 ID。
      type: string
    icon:
      required: false
      description: 覆盖实体图标。
      type: string
    image:
      required: false
      description: 覆盖实体图片。
      type: string
    name:
      required: false
      description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅[命名文档](/home-assistant/dashboards/naming/)。
      type: [string, map, list]
      default: 实体名称
    show_name:
      required: false
      description: 如果为 false，则不显示按钮名称。
      type: boolean
      default: "false"
    show_icon:
      required: false
      description: 如果为 false，则不显示图标。
      type: boolean
      default: "true"
    tap_action:
      required: false
      description: 点击按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
      type: map
    hold_action:
      required: false
      description: 长按按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
      type: map
    double_tap_action:
      required: false
      description: 双击按钮时执行的动作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
      type: map

### 投屏

用于启动 Home Assistant Cast 的特殊行。

type:
  required: true
  description: "`cast`"
  type: string
dashboard:
  required: false
  description: 需要显示的视图的仪表盘路径。
  type: string
view:
  required: true
  description: 需要显示的视图路径。
  type: string
name:
  required: false
  description: 行中显示的名称。
  type: string
  default: Home Assistant 投屏
icon:
  required: false
  description: 要使用的图标。
  type: string
  default: "`hass:television`"
hide_if_unavailable:
  required: false
  description: 如果浏览器中不可用投屏功能，则隐藏此行。
  type: boolean
  default: false

### 条件

根据实体状态显示的特殊行。

type:
  required: true
  description: "`conditional`"
  type: string
conditions:
  required: true
  description: 要检查的条件列表。请参阅[可用条件](/home-assistant/dashboards/conditional/#card-conditions)。
  type: list
row:
  required: true
  description: 当所有条件匹配时要显示的行。可以是本页面描述的各种受支持的行类型。
  type: map

### 分隔线

type:
  required: true
  description: "`divider`"
  type: string
style:
  required: false
  description: 使用 CSS 设置元素样式。
  type: map
  default: "height: 1px, background-color: var(--divider-color)"

### 分区

type:
  required: true
  description: "`section`"
  type: string
label:
  required: false
  description: 分区标签。
  type: string

### 网页链接

type:
  required: true
  description: "`weblink`"
  type: string
url:
  required: true
  description: "网站 URL（或内部 URL，例如 `/hassio/仪表盘` 或 `/面板_custom_name`）。"
  type: string
name:
  required: false
  description: 链接标签。
  type: string
  default: URL 路径
icon:
  required: false
  description: "要显示的图标（例如 `mdi:home`）。"
  type: string
  default: "`mdi:link`"
new_tab:
  required: false
  description: 在新标签页中打开链接。如果链接是外部 URL 或下载链接，这将自动为 true。如果内部 URL 需要在新标签页中打开，请使用此选项。
  type: boolean
  default: false
download:
  required: false
  description: 链接是否为下载？
  type: boolean
  default: false

### 示例

#### 实体行

```yaml
type: entities
title: 实体卡片示例
show_header_toggle: true
header:
  image: "https://www.home-assistant.io/images/dashboards/header-footer/balloons-header.png"
  type: picture
entities:
  - entity: alarm_control_panel.alarm
    name: 报警面板
  - device_tracker.demo_paulus
  - switch.decorative_lights
  - group.all_lights
  - group.all_locks
```

#### 按钮行

分隔线上方是普通实体行，下方是类型为 `buttons` 的行。请注意，普通实体行会自动显示实体名称，而按钮则需要明确指定标签/名称。

<p class='img'>
<img src='/home-assistant/images/dashboards/entity_row_buttons.jpg' alt='按钮行截图'>
按钮行截图。
</p>

```yaml
type: entities
entities:
  - entity: light.office_ceiling
  - entity: light.dining_ceiling
  - type: divider
  - type: buttons
    entities:
      - entity: light.office_ceiling
        name: 办公室顶灯
      - entity: light.dining_ceiling
        name: 餐厅顶灯
```

#### 其他特殊行

<p class='img'>
<img src='/home-assistant/images/dashboards/entity_row_special.jpg' alt='其他特殊行截图'>
其他特殊行截图。
</p>

```yaml
type: entities
title: 实体卡片示例
entities:
  - type: button
    icon: mdi:power
    name: 床头灯渐变
    action_name: 切换灯光
    tap_action:
      action: perform-action
      perform_action: light.toggle
      data:
        entity_id: light.bed_light
        transition: 10
  - type: divider
  - type: attribute
    entity: sun.sun
    attribute: elevation
    name: 太阳高度角
    prefix: "~"
    suffix: 单位
  - type: conditional
    conditions:
      - entity: sun.sun
        state: above_horizon
    row:
      entity: sun.sun
      type: attribute
      attribute: azimuth
      icon: mdi:angle-acute
      name: 太阳方位角
  - type: section
    label: 分区示例
  - type: weblink
    name: Home Assistant
    url: https://www.home-assistant.io/
    icon: mdi:home-assistant
  - type: button
    name: 重启 LibreELEC 电源
    icon: mdi:power-cycle
    tap_action:
      action: perform-action
        confirmation:
          text: 确定要重新启动吗？
      perform_action: script.libreelec_power_cycle
```
