---
title: 天气预报卡片
description: '天气预报卡片用于显示天气信息。这款卡片特别适用于壁挂式显示屏。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 天气预报卡片

天气预报卡片用于显示天气信息。这款卡片特别适用于壁挂式显示屏。

<p class='img'>
  <img src='/home-assistant/images/dashboards/weather.png' alt='天气预报卡片截图'>
  天气预报卡片截图。
</p>

要添加天气预报卡片到您的用户界面：

1. 在屏幕右上角，选择编辑按钮 `[mdi:edit]`。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦接管控制，您无法将此特定仪表盘恢复为自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

## 卡片设置

实体:
  description: "要使用的 `weather` 平台实体。"
Name:
  description: 天气平台所在位置的名称。如果未设置，名称将是天气实体上设置的名称
Show Forecast:
  description: 如果您想在当前天气下方显示即将到来的预报，请选中此项。
Forecast type:
  description: 选择要显示的预报类型，包括 **每日**、**每小时** 和 **每日两次**。
Secondary Info 属性:
  description: 您可以在此处指定要在当前温度下方显示的次要属性。例如：极值、降水量、湿度。如果未设置，默认为极值（最高/最低）（如果可用），如果不可用则为降水量，如果降水量也不可用则为湿度。
Round temperature:
  description: 如果您想将卡片中的所有温度值四舍五入到最接近的整数，请选中此项。
Theme:
  description: 用于此卡片的任何已加载主题的名称。有关主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。

:::important
此卡片仅适用于定义了 `weather` 实体的平台。
例如，它适用于 [OpenWeatherMap](/home-assistant/integrations/openweathermap/#weather)，但不适用于 [OpenWeatherMap 传感器](/home-assistant/integrations/openweathermap/#sensor)
:::

</div>

## YAML 配置

当您使用 YAML 模式或只是喜欢在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`weather-forecast`"
  type: string
实体:
  required: true
  description: `weather` 域的实体 ID。
  type: string
name:
  required: false
  description: 覆盖友好名称。可以是字符串或名称配置对象。请参阅 [命名文档](/home-assistant/dashboards/naming/)。
  type: [string, map, list]
  default: 实体名称
show_current:
  required: false
  description: 在预报上方显示当前天气状况。
  type: boolean
  default: true
show_forecast:
  required: false
  description: 显示未来几小时/几天的预报。
  type: boolean
  default: true
forecast_type:
  required: true
  description: 要显示的预报类型，可选 `daily`、`hourly` 或 `twice_daily`。
  type: string
secondary_info_attribute:
  required: false
  description: 在温度下方显示的属性。
  type: string
  default: 默认为 `extrema`（如果可用），如果不可用则为 `precipitation`，如果降水量也不可用则为 `humidity`。
round_temperature:
  required: false
  description: 将温度值四舍五入到最接近的整数。
  type: boolean
  default: false
theme:
  required: false
  description: 使用任何已加载的主题覆盖此卡片使用的主题。有关主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。
  type: string
tap_action:
  required: false
  description: 卡片点击时执行的动作。更多信息，请参阅 [动作文档](/home-assistant/dashboards/actions/#tap-actions)。
  type: map
hold_action:
  required: false
  description: 卡片长按时执行的动作。更多信息，请参阅 [动作文档](/home-assistant/dashboards/actions/#hold-actions)。
  type: map
double_tap_action:
  required: false
  description: 卡片双击时执行的动作。更多信息，请参阅 [动作文档](/home-assistant/dashboards/actions/#double-tap-actions)。
  type: map

### 示例

```yaml
show_current: true
show_forecast: true
type: weather-forecast
entity: weather.openweathermap
forecast_type: daily
```

### 高级

#### 可主题化图标

默认的天气图标可以通过[主题](/home-assistant/integrations/frontend/#themes)进行主题化。主题变量包括：

```yaml
--weather-icon-cloud-front-color
--weather-icon-cloud-back-color
--weather-icon-sun-color
--weather-icon-rain-color
--weather-icon-moon-color
```

主题配置示例：

```yaml
--weather-icon-cloud-front-color: white
--weather-icon-cloud-back-color: blue
--weather-icon-sun-color: orange
--weather-icon-rain-color: purple
```

#### 个性化图标

天气图标可以通过[主题](/home-assistant/integrations/frontend/#themes)用您自己的个人图片覆盖。主题变量包括：

```yaml
--weather-icon-clear-night
--weather-icon-cloudy
--weather-icon-fog
--weather-icon-lightning
--weather-icon-lightning-rainy
--weather-icon-partlycloudy
--weather-icon-pouring
--weather-icon-rainy
--weather-icon-hail
--weather-icon-snowy
--weather-icon-snowy-rainy
--weather-icon-sunny
--weather-icon-windy
--weather-icon-windy-variant
--weather-icon-exceptional

// 如果您的状态不在上面列表中，请使用此格式
--weather-icon-<state>
```

主题配置示例：

```yaml
--weather-icon-sunny: url("/local/sunny.png")
```