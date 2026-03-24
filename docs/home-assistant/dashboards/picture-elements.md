---
title: 图片元素卡片
description: 图片元素卡片是最通用的卡片类型之一。该卡片允许您根据坐标在图片上定位图标、文本甚至按钮！
---
图片元素卡片是最通用的卡片类型之一。

<p class='img'>
  <img src='/home-assistant/images/dashboards/picture_elements.gif' alt='由图片元素驱动的功能性地板图'>
  由图片元素驱动的功能性地板图。
</p>

该卡片允许您根据坐标在图片上定位图标、文本甚至按钮。可以把它理解为一个几乎不受限制的 [picture-glance](/home-assistant/dashboards/picture-glance/) 卡片，非常适合做平面图。

要将卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管该仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您无法让这个特定的仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)。

## YAML 配置

当您使用 YAML 模式或只是偏好使用 UI 代码编辑器中的 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`picture-elements`"
  type: string
image:
  required: true
  description: 图片的 URL。<br/>要使用本地托管的图片，请参阅 [托管](/home-assistant/integrations/http#hosting-files)，或使用 Media 内容的 `media-source://` URL。
  type: string
image_entity:
  required: false
  description: 要显示的图片或人物实体。
  type: string
camera_image:
  required: false
  description: 摄像头实体。
  type: string
camera_view:
  required: false
  description: '如果启用了 `stream`，`live` 将显示实时视图。'
  default: auto
  type: string
elements:
  required: true
  description: 元素列表。
  type: list
title:
  required: false
  description: 卡片标题。
  type: string
state_filter:
  required: false
  description: '[基于状态的 CSS 过滤器](#how-to-use-state_filter)'
  type: map
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片使用的主题。关于主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。
  type: string
dark_mode_image:
  required: false
  description: 当深色模式激活且未设置状态图片时使用此图片。<br/>要使用本地托管的图片，请参阅 [托管](/home-assistant/integrations/http#hosting-files)，或使用 Media 内容的 `media-source://` URL。
  type: string
dark_mode_filter:
  required: false
  description: "当深色模式激活时使用此 CSS 过滤器。"
  type: string

## 元素

元素是覆盖在图片上的活动组件（图标、徽章、按钮、文本等）。

有几种不同的元素类型可以添加到图片元素卡片中：

- [状态徽章](#状态徽章)
- [状态图标](#状态图标)
- [状态标签](#状态标签)
- [执行动作按钮](#perform-actions-button)
- [图标](#icon-element)
- [图片](#image-element)
- [条件](#conditional-element)
- [自定义](#custom-elements)

### 状态徽章

此元素创建一个代表实体状态的徽章。

type:
  required: true
  description: "`state-badge`"
  type: string
entity:
  required: true
  description: 实体 ID。
  type: string
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: map
  default: "position: absolute, transform: translate(-50%, -50%)"
name:
  required: false
  description: 显示在状态徽章下方的可选替代名称。如果未提供，默认为实体名称。设置为 null 以隐藏。
  type: string
title:
  required: false
  description: 状态徽章的提示文本。如果未提供，默认为实体名称。设置为 null 以隐藏。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map

### 状态图标

此元素使用图标表示实体状态。

type:
  required: true
  description: "`state-icon`"
  type: string
entity:
  required: true
  description: 要使用的实体 ID。
  type: string
icon:
  required: false
  description: 覆盖图标。
  type: string
title:
  required: false
  description: 图标提示文本。设置为 null 以隐藏。
  type: string
state_color:
  required: false
  description: 设置为 `true` 可在实体处于活动状态时为图标着色。
  type: boolean
  default: true
tap_action:
  required: false
  description: 卡片点击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

### 状态标签

此元素通过文本表示实体状态。

type:
  required: true
  description: "`state-label`"
  type: string
entity:
  required: true
  description: 实体 ID。
  type: string
attribute:
  required: false
  description: 如果存在，将显示相应的属性，而不是实体的状态。
  type: string
prefix:
  required: false
  description: 实体状态前的文本。
  type: string
suffix:
  required: false
  description: 实体状态后的文本。
  type: string
title:
  required: false
  description: 标签提示文本。设置为 null 以隐藏。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

### 执行动作按钮

此元素创建一个按钮（带有任意文本），可用于执行动作。

type:
  required: true
  description: "`action-button`"
  type: string
title:
  required: true
  description: 按钮标签。
  type: string
action:
  required: true
  description: "`light.turn_on`"
  type: string
target:
  required: false
  description: 动作的目标。
  type: map
data:
  required: false
  description: 动作的数据。
  type: map
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

### 图标元素

此元素创建一个不与实体状态关联的静态图标。

type:
  required: true
  description: "`icon`"
  type: string
icon:
  required: true
  description: "要显示的图标（例如，`mdi:home`）。"
  type: string
title:
  required: false
  description: 图标提示文本。设置为 null 以隐藏。
  type: string
entity:
  required: false
  description: 用于更多信息/切换的实体。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

### 图片元素

这会创建一个覆盖在背景图片上的图片元素。

type:
  required: true
  description: "`image`"
  type: string
entity:
  required: false
  description: "用于 `state_image` 和 `state_filter` 以及动作目标的实体。"
  type: string
title:
  required: false
  description: 图片提示文本。设置为 null 以隐藏。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map
image:
  required: false
  description: 要显示的图片。<br/>要使用本地托管的图片，请参阅 [托管](/home-assistant/integrations/http#hosting-files)，或使用 Media 内容的 `media-source://` URL。
  type: string
camera_image:
  required: false
  description: 摄像头实体。
  type: string
camera_view:
  required: false
  description: '如果启用了 `stream`，`live` 将显示实时视图。'
  default: auto
  type: string
state_image:
  required: false
  description: '[基于状态的图片](#how-to-use-state_image)'
  type: map
filter:
  required: false
  description: "默认：当实体状态为 `off` 时为 `grayscale(100%)`。设置为 `none` 以移除此设置。"
  type: string
state_filter:
  required: false
  description: '[基于状态的 CSS 过滤器](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: '强制图片高度为宽度的比例。有效格式：高度百分比值（`23%`）或用冒号或"x"分隔符表示的比例（`16:9` 或 `16x9`）。对于比例，可以省略第二个元素，默认为"1"（`1.78` 等于 `1.78:1`）。'
  type: string
  default: "50%"
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

### 条件元素

与条件卡片类似，此元素允许您根据实体状态显示其子元素。

type:
  required: true
  description: "`conditional`"
  type: string
conditions:
  required: true
  description: 实体 ID 和匹配状态的列表。
  type: list
  keys:
    entity:
      required: true
      description: 实体 ID。
      type: string
    state:
      required: false
      description: 实体状态等于此值。*
      type: string
    state_not:
      required: false
      description: 实体状态不等于此值。*
      type: string
elements:
  required: true
  description: 当条件满足时显示的一个或多个 [列出的类型](#elements) 元素。请参阅下面的示例。
  type: list

### 自定义元素

创建和引用自定义元素的过程与自定义卡片相同。请参阅[开发者文档](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-cards)了解更多信息。

type:
  required: true
  description: '带有 `custom:` 前缀的卡片名称（例如，`custom:my-custom-card`）。'
  type: string
style:
  required: true
  description: '[使用 CSS 定位和样式化元素](#how-to-use-the-style-object)。'
  type: string
  default: "position: absolute, transform: translate(-50%, -50%)"

## 元素属性说明

### 如何使用样式对象

使用 [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) 定位和样式化您的元素。也可以使用更多/其他键。请注意，大多数元素的默认样式包括 [translate](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)(-50%, -50%)，这意味着您提供的坐标将设置元素中心的位置。使用 `transform: none` 禁用此行为。

```yaml
style:
  # 元素的定位
  left: 50%
  top: 50%
```

### 如何使用 state_image

根据实体的状态指定要显示的不同图片（支持本地、网页或 `media-source://` URL）：

```yaml
state_image:
  "on": /local/bed_light_on.png
  "off": https://demo.home-assistant.io/stub_config/bedroom.png
  "unavailable": media-source://image_upload/123456789
```

### 如何使用 state_filter

指定不同的 [CSS 过滤器](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)。

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
```

### 如何使用点击并按住

如果指定了 `hold_action` 选项，当实体被点击并按住半秒或更长时间时，将执行该动作。

```yaml
tap_action:
  action: toggle
hold_action:
  action: perform-action
  perform_action: light.turn_on
  data:
    entity_id: light.bed_light
    brightness_pct: 100
```

## 示例

### 图标、标签和按钮示例

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  - type: state-icon
    tap_action:
      action: toggle
    entity: light.ceiling_lights
    style:
      top: 47%
      left: 42%
  - type: state-icon
    tap_action:
      action: toggle
    entity: light.kitchen_lights
    style:
      top: 30%
      left: 15%
  - type: state-label
    entity: sensor.outside_temperature
    style:
      top: 82%
      left: 79%
  - type: state-label
    entity: climate.kitchen
    attribute: current_temperature
    suffix: "°C"
    style:
      top: 33%
      left: 15%
  - type: action-button
    title: Turn lights off
    style:
      top: 95%
      left: 60%
    action: homeassistant.turn_off
    target:
      entity_id: group.all_lights
  - type: icon
    icon: mdi:home
    tap_action:
      action: navigate
      navigation_path: /lovelace/0
    style:
      top: 10%
      left: 10%
```

### 图片示例

```yaml
type: picture-elements
image: /local/floorplan.png
elements:
  # state_image & state_filter - 点击切换
  - type: image
    entity: light.living_room
    tap_action:
      action: toggle
    image: /local/living_room.png
    state_image:
      "off": /local/living_room_off.png
    filter: saturate(.8)
    state_filter:
      "on": brightness(120%) saturate(1.2)
    style:
      top: 25%
      left: 75%
      width: 15%
  # 摄像头，红色边框，圆角矩形 - 点击显示更多信息
  - type: image
    entity: camera.driveway_camera
    camera_image: camera.driveway_camera
    style:
      top: 5%
      left: 10%
      width: 10%
      border: 2px solid red
      border-radius: 10%
  # 单张图片，state_filter - 点击执行动作
  - type: image
    entity: media_player.living_room
    tap_action:
      action: perform-action
      perform_action: media_player.media_play_pause
      target:
        entity_id: media_player.living_room
    image: /local/television.jpg
    filter: brightness(5%)
    state_filter:
      playing: brightness(100%)
    style:
      top: 40%
      left: 75%
      width: 5%
```

### 条件示例

```yaml
type: picture-elements
image: /local/House.png
elements:
  # 当爸爸不在家而女儿在家时，有条件地显示电视关闭按钮快捷方式
  - type: conditional
    conditions:
      - entity: sensor.presence_daughter
        state: "home"
      - entity: sensor.presence_dad
        state: "not_home"
    elements:
      - type: state-icon
        entity: switch.tv
        tap_action:
          action: toggle
        style:
          top: 47%
          left: 42%
```
