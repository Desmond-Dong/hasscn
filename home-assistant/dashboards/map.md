# 地图卡片

地图卡片允许您在地图上显示您的家庭区域、实体和其他预定义的区域。此卡片用于[地图仪表盘](/home-assistant/dashboards/dashboard/#map-dashboard)，这是默认仪表盘之一。

<p class='img'>
<img src='/home-assistant/images/dashboards/map_card.webp' alt='地图卡片的截图'>
地图卡片的截图。
</p>

## 将地图卡片添加到您的仪表盘

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   * 如果这是您第一次编辑仪表盘，会出现**编辑仪表盘**对话框。
     * 通过编辑仪表盘，您将接管此仪表盘的控制权。
     * 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     * 一旦您接管了控制权，就无法再将此仪表盘设置为自动更新。但是，您可以创建一个新的默认仪表盘。
     * 要继续操作，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择**接管控制**。
2. [将地图卡片添加](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。
3. 默认情况下，您会在地图上看到房子 `[mdi:house]` 图标。它代表您的[家庭区域](/home-assistant/integrations/zone/index.md#about-the-home-zone)。

   * 要更改您家庭的位置，您需要[在常规设置中编辑您家庭的位置](/home-assistant/docs/configuration/basic/index.md#editing-the-general-settings)。

   ![编辑地图卡片设置](/home-assistant/images/dashboards/map_card_config.png)
4. 要了解如何在地图上显示其他区域，请按照[添加新区域](/home-assistant/integrations/zone/index.md#adding-a-new-zone-or-editing-zones)的步骤操作。
5. 要在地图上显示其他元素，可以在**实体**下添加它们，或使用**地理位置来源**。
   * 有关选项的描述，请参阅 [YAML 配置](#yaml-配置) 部分。它也适用于 UI 中显示的选项。
   * `[mdi:info]` **信息**：实体列表显示了您家中可用的设备追踪器，例如安装了伴侣应用的手机。
     * 如果您想查看实体过去位置的轨迹，您需要在**显示小时数**下定义一个时间范围。
   * 有关存在检测的更多信息，请参阅[存在检测入门教程](/home-assistant/getting-started/presence-detection/index.md)。

## 配置选项

此卡片的所有选项都可以通过用户界面进行配置。有关选项的详细描述，请参阅 [YAML 配置](#yaml-配置) 部分。它也适用于 UI 中显示的选项。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中更喜欢使用 YAML 时，可以使用以下 YAML 选项。

type:
required: true
description: "`map`"
type: string
实体:
required: false
description: 实体 ID 或 `entity` 对象的列表（参见[下文](#实体-选项)）。此选项、`show_all` 或 `geo_location_sources` 配置选项是必需的。
type: list
geo\_location\_sources:
required: false
description: 地理位置来源或 `source` 对象的列表（参见[下文](#geolocation-sources-选项)）。所有具有该来源的当前实体都将显示在地图上。有关有效来源，请参阅[地理位置](/home-assistant/integrations/geo_location/index.md)平台。设置为 `all` 以使用所有可用来源。此选项、`show_all` 或 `entities` 配置选项是必需的。
type: list
show\_all:
required: false
description: 自动将所有带有坐标的实体添加到地图卡片。（地图面板的默认行为）
type: boolean
default: false
auto\_fit:
required: false
description: 每次更新实体时，地图将通过调整视口来跟随移动的实体。
type: boolean
default: false
fit\_zones:
required: false
description: 地图在调整视口时是否应考虑指定实体列表中的区域。
type: boolean
default: false
title:
required: false
description: 卡片标题。
type: string
aspect\_ratio:
required: false
description: '强制图像高度为宽度的比例。有效格式：高度百分比值（`23%`）或用冒号或"x"分隔符表示的比例（`16:9` 或 `16x9`）。对于比例，第二个元素可以省略，默认为"1"（`1.78` 等于 `1.78:1`）。'
type: string
default\_zoom:
required: false
description: 地图的默认缩放级别。使用较小的数字缩小，使用较大的数字放大。
type: integer
default: 14（或适合所有可见标记所需的任何缩放级别）
theme\_mode:
required: false
description: '覆盖主题以强制地图以浅色模式（`theme_mode: light`）或深色模式（`theme_mode: dark`）显示。默认值（`theme_mode: auto`）将跟随主题设置。'
type: string
default: 'auto'
hours\_to\_show:
required: false
description: 显示先前位置的路径。在地图上显示为路径的小时数。
type: integer
default: 0
cluster:
required: false
description: '当设置为 `false` 时，地图不会对标记进行聚合。当您想一次查看所有标记时这很有用，但在标记数量较多时可能会导致性能问题。'
type: boolean
default: true
conditions:
required: false
description: 用于检查实体可见性的条件列表。参见[描述](#conditions-选项)。
type: list

:::important
只有具有纬度和经度属性的实体才会显示在地图上。
:::

:::note
如果在适应地图窗口中所有可见实体标记后将 `default_zoom` 值设置为高于当前缩放级别，则该值将被忽略。换句话说，这只能用于默认缩小地图。
:::

## conditions 选项

您可以指定一个或多个 `conditions`，在这种情况下，每个选定的实体都将针对每个条件进行测试，如果通过所有条件则显示。参见[可用条件](/home-assistant/dashboards/conditional/index.md#condition-options)。对于接受 `entity` id 的条件，这将自动设置为正在测试的实体。

### 示例

映射所有可定位的实体，但隐藏状态为 `home` 的实体。

```yaml
type: map
auto_fit: true
show_all: true
conditions:
  - condition: state
    state_not: home
```

## 实体 选项

如果您将实体定义为对象而不是字符串（通过在实体 ID 前添加 `entity:`），您可以添加更多自定义和配置。

实体:
required: true
description: 实体 ID。
type: string
name:
required: false
description: 替换标记的默认标签。
type: string
label\_mode:
required: false
default: name
description: 当设置为 `icon` 时，在标记中渲染实体的图标而不是文本。当设置为 `state` 或 `attribute` 时，将实体的状态或属性渲染为地图标记的标签，而不是实体的名称。此选项不适用于[区域](/home-assistant/integrations/zone/index.md)实体，因为它们使用图标而不是标签。
type: string
attribute:
required: false
description: 当 `label_mode` 设置为 `attribute` 时的实体属性。
type: string
unit:
required: false
description: 当 `label_mode` 设置为 `attribute` 时属性值的单位。
type: string
focus:
required: false
default: true
description: 当设置为 `false` 时，此实体将不会被考虑用于确定地图的默认缩放或适应。
type: boolean

## geolocation sources 选项

如果您将地理位置来源定义为对象而不是字符串（通过在 ID 前添加 `source:`），您可以添加更多自定义和配置。

source:
required: true
description: 地理位置来源的名称，或 `all`。
type: string
label\_mode:
required: false
default: name
description: 当设置为 `icon` 时，在标记中渲染实体的图标而不是文本。当设置为 `state` 或 `attribute` 时，将实体的状态或属性渲染为地图标记的标签，而不是实体的名称。
type: string
attribute:
required: false
description: 当 `label_mode` 设置为 `attribute` 时的实体属性。
type: string
unit:
required: false
description: 当 `label_mode` 设置为 `attribute` 时属性值的单位。
type: string
focus:
required: false
default: true
description: 当设置为 `false` 时，此来源的实体将不会被考虑用于确定地图的默认缩放或适应。
type: boolean

## 示例

```yaml
type: map
aspect_ratio: 16:9
default_zoom: 8
auto_fit: true
entities:
  - device_tracker.demo_paulus
  - zone.home
```

```yaml
type: map
geo_location_sources:
  - nsw_rural_fire_service_feed
  - source: gdacs
    focus: false
entities:
  - zone.home
```

```yaml
type: map
entities:
  - device_tracker.demo_paulus
  - entity: sensor.gas_station_gas_price
    label_mode: state
    focus: false
hours_to_show: 48
```
