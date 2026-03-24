---
title: 图片概览卡片
description: 图片概览卡片显示一张图片，并将相应的实体状态显示为图标。右侧的实体允许切换操作，其他实体显示更多信息对话框。
---
图片概览卡片显示一张图片，让您可以在卡片上放置实体状态的小图标，并从那里控制这些实体。在下图中：右侧的实体允许切换操作，其他实体显示更多信息对话框。

<p class='img'>
  <img src='/home-assistant/images/dashboards/picture_glance.gif' alt='客厅的图片概览卡片'>
  客厅的图片概览卡片。
</p>

## 添加卡片到仪表盘

1. 要添加卡片，请按照[从视图添加卡片](/home-assistant/dashboards/cards/#to-add-a-card-from-a-view)的步骤 1-4 操作。
   - 在步骤 2 中，在 **按卡片** 选项卡上，选择图片概览。

2. 添加图片：

   - **上传图片** 让您可以从用于显示 Home Assistant UI 的系统中选择图片。
   - **本地路径** 让您可以选择存储在 Home Assistant 上的图片。例如：`/homeassistant/images/lights_view_background_image.jpg`。
     - 要在 Home Assistant 上存储图片，您需要[配置文件访问权限](/home-assistant/common-tasks/os/#configuring-access-to-files)，例如通过 [Samba](/home-assistant/common-tasks/os/#installing-and-using-the-samba-app) 或 [Studio Code Server](/home-assistant/common-tasks/os/#installing-and-using-the-visual-studio-code-vsc-app) 应用（以前称为插件）。
   - **网页 URL** 让您可以使用网络上的图片。例如 `https://www.home-assistant.io/images/frontpage/assist_wake_word.png`。

3. 定义特定于图片概览卡片的参数。
   - 有关特定设置的描述，请参阅 YAML 配置下的说明。
   - 这些设置同样适用于 UI。
4. 保存您的更改。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`picture-glance`"
  type: string
实体:
  required: true
  description: 实体列表或实体对象。
  type: list
title:
  required: false
  description: 卡片标题。
  type: string
image:
  required: false
  description: 背景图片 URL（本地、网页或 `media-source://`）
  type: string
image_实体:
  required: false
  description: 要显示的图片或人员实体。
  type: string
camera_image:
  required: false
  description: 作为背景图片的摄像头实体。
  type: string
camera_view:
  required: false
  description: '如果启用了 `stream`，"live" 将显示实时视图。'
  default: auto
  type: string
state_image:
  required: false
  description: 基于实体状态的背景图片。
  type: map
  keys:
    state:
      type: string
      required: false
      description: "`state: image-url`，请查看下面的示例。"
state_filter:
  required: false
  description: '[基于状态的 CSS 滤镜](#how-to-use-state_filter)'
  type: map
aspect_ratio:
  required: false
  description: '强制图片高度为宽度的比例。有效格式：高度百分比值（`23%`）或使用冒号或 "x" 分隔符表示的比例（`16:9` 或 `16x9`）。对于比例，第二个元素可以省略，默认为 "1"（`1.78` 等于 `1.78:1`）。'
  type: string
fit_mode:
  required: false
  description: '定义图片拉伸/裁剪以适应卡片区域的方式。`cover`：图片保持其纵横比并填充给定的尺寸。图片将被裁剪以适应。`contain`：图片保持其纵横比，但调整大小以适应给定的尺寸。`fill`：图片调整大小以填充给定的尺寸。如有必要，图片将被拉伸或压缩以适应。'
  type: string
  default: cover
实体:
  required: false
  description: 用于 `state_image` 和 `state_filter` 的实体。
  type: string
show_state:
  required: false
  description: 显示实体状态文本。
  type: boolean
  default: false
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅[前端文档](/home-assistant/integrations/frontend/)。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/)。
  type: map

### 实体选项

如果您将实体定义为对象而不是字符串，可以添加更多自定义和配置：

实体:
  required: true
  description: 实体 ID。
  type: string
attribute:
  required: false
  description: 要显示的实体属性，而不是状态。
  type: string
prefix:
  required: false
  description: 在属性值之前显示的前缀。
  type: string
suffix:
  required: false
  description: 在属性值之后显示的后缀。
  type: string
icon:
  required: false
  description: 覆盖默认图标。
  type: string
show_state:
  required: false
  description: 显示实体状态文本。
  type: boolean
  default: true
tap_action:
  required: false
  description: 卡片点击时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/#tap-action)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/#hold-action)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的操作。请参阅[动作文档](/home-assistant/dashboards/actions/#double-tap-action)。
  type: map

### 如何使用 state_filter

指定不同的 [CSS 滤镜](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

```yaml
state_filter:
  "on": brightness(110%) saturate(1.2)
  "off": brightness(50%) hue-rotate(45deg)
entity: switch.decorative_lights
```

### 示例

本节列出了图片概览卡片的一些使用示例。

### 创建控制摄像头的卡片

如果您的摄像头支持 <abbr title="pan, tilt, and zoom">PTZ</abbr>（可以向不同方向移动），您可以使用图片概览卡片来控制摄像头。

<p class='img'>
  <img src='/home-assistant/images/dashboards/picture_glance_camera_control.gif' alt='控制摄像头的图片概览卡片'>
  控制摄像头的图片概览卡片。
</p>

1. 选择您的摄像头实体。
    - **图片路径** 和 **图片实体** 不是必需的。
    ![选择摄像头实体](/home-assistant/images/dashboards/picture_glance_card_select_camera_entity.png)
2. 如果您想在点击卡片本身时发生某些事情，请定义点击动作。
   - 在这里，我们切换一个灯光。
   ![选择摄像头实体](/home-assistant/images/dashboards/picture_glance_card_define_tap_action.png)
3. 选择用于向左、向右、向上或向下移动摄像头的实体。
   ![选择摄像头实体](/home-assistant/images/dashboards/picture_glance_card_select_camera_arrows.png)
4. 选择 **显示代码编辑器**。
5. 对于每个实体，按照 YAML 示例中所示指定图标。
6. 要使按钮在按下时做出反应（而不是弹出对话框）：
   - 对于每个实体，在 `tap_action` 下，使用 `button.press` 动作。

    ```yaml
    camera_view: live
    type: picture-glance
    title: Desk
    entities:
      - entity: button.camera1_ptz_left
        icon: mdi:pan-left
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_left
      - entity: button.camera1_ptz_right
        icon: mdi:pan-right
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_right
      - entity: button.camera1_ptz_up
        icon: mdi:pan-up
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_up
      - entity: button.camera1_ptz_down
        icon: mdi:pan-down
        tap_action:
          action: perform-action
          perform_action: button.press
          data:
            entity_id: button.camera1_ptz_down
    camera_image: camera.camera1_sub
    tap_action:
      action: perform-action
      perform_action: light.toggle
      target:
        entity_id: light.philips_929003052501_01_huelight
    ```
7. 就这样。您现在可以从仪表盘上的图片概览卡片控制您的摄像头了。

### 更多示例

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
  - lock.front_door
  - binary_sensor.movement_backyard
  - binary_sensor.basement_floor_wet
image: /local/living_room.png
```

显示摄像头图片作为背景：

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
camera_image: camera.demo_camera
```

显示没有其他实体的摄像头图片：

```yaml
type: picture-glance
title: Front garden
entities: []
camera_image: camera.front_garden_camera
```

根据实体状态使用不同的图片（支持本地、网页或 `media-source://` URL）：

```yaml
type: picture-glance
title: Living room
entities:
  - switch.decorative_lights
  - light.ceiling_lights
state_image:
  "on": /local/living_room_on.png
  "off": https://demo.home-assistant.io/stub_config/living_room.png
  "unavailable": media-source://image_upload/123456789
entity: group.living.room
```