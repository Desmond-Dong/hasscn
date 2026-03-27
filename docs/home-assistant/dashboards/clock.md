---
title: 时钟卡片
description: '时钟卡片可使用多种格式、尺寸和时区显示当前时间。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 时钟卡片

时钟卡片可使用多种格式、尺寸和时区显示当前时间。

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_large.png' alt='时钟卡片截图'>
时钟卡片截图
</p>

要将时钟卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它将不再自动更新。
     - 一旦您接管了控制权，您将无法让这个特定仪表盘恢复自动更新。不过，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard)到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## 卡片设置

title:
  description: 在卡片顶部添加标题。
  type: string
  required: false
clock_style:
  description: 允许以数字或模拟样式显示时钟。默认为数字时钟。
  type: list
  required: false
  default: digital
  keys:
    digital:
      description: 数字时钟样式。
    analog:
      description: 模拟时钟样式。
clock_size:
  description: 调整文字大小，以适应不同类型的仪表盘。默认为 small。
  type: list
  required: false
  default: small
  keys:
    small:
      description: 小尺寸时钟。
    medium:
      description: 中等尺寸时钟。
    large:
      description: 大尺寸时钟。
show_seconds:
  description: 显示秒数，仅在使用 12 小时制格式时生效。
  type: boolean
  required: false
  default: false
no_background:
  description: 移除时钟卡片的背景。
  type: boolean
  required: false
  default: false
time_format:
  description: 按卡片级别更改时间格式。默认为用户个人资料设置。
  type: string
  required: false
time_zone:
  description: 按卡片级别更改时钟使用的时区。默认为用户个人资料设置。
  type: string
  required: false
analog_options:
  description: 使用模拟时钟样式时，可配置时钟外观。
  type: map
  required: false
  keys:
    border:
      description: 显示表盘边框。默认为 false。
      type: boolean
      required: false
      default: false
    ticks:
      description: 显示表盘刻度。默认为 hour。
      type: list
      required: false
      default: hour
      keys:
        none:
          description: 不显示刻度。
        quarter:
          description: 显示每刻钟刻度。
        hour:
          description: 显示小时刻度。
        minute:
          description: 显示分钟刻度。

### 示例

基本示例：

```yaml
type: clock
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_default.png' alt='基础时钟卡片截图'>
基础时钟卡片截图
</p>

适用于平板仪表盘的较大时钟卡片示例：

```yaml
type: clock
clock_size: large
time_format: "12"
show_seconds: true
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_large.png' alt='显示 am/pm 和秒数的大尺寸 12 小时制时钟卡片截图'>
显示 am/pm 和秒数的大尺寸 12 小时制时钟卡片截图
</p>

更适合桌面仪表盘的中等尺寸时钟卡片：

```yaml
type: clock
clock_size: medium
time_format: "12"
show_seconds: false
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_medium.png' alt='显示 am/pm 的中等尺寸 12 小时制时钟截图'>
显示 am/pm 的中等尺寸 12 小时制时钟截图
</p>

使用伦敦时区并带标题的中等尺寸 24 小时制时钟：

```yaml
type: clock
clock_size: medium
time_zone: Europe/London
title: London 💂

```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_london.png' alt='位于伦敦、带标题的中等尺寸 24 小时制时钟截图'>
位于伦敦、带标题的中等尺寸 24 小时制时钟截图
</p>

使用纽约时区并带标题的中等尺寸 12 小时制时钟：

```yaml
type: clock
clock_size: medium
time_format: "12"
time_zone: America/New_York
title: New York 🦅

```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_new_york.png' alt='位于纽约、显示 am/pm 和秒数的中等尺寸 12 小时制时钟截图'>
位于纽约、显示 am/pm 和秒数的中等尺寸 12 小时制时钟截图
</p>

无边框且显示小时刻度的模拟时钟：

```yaml
type: clock
clock_style: analog
clock_size: medium
analog_options:
  border: false
  ticks: hour
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_analog_hour_ticks.png' alt='显示小时刻度的中等尺寸模拟时钟截图'>
显示小时刻度的中等尺寸模拟时钟截图
</p>

带边框、显示分钟刻度和秒数的模拟时钟：

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
analog_options:
  border: true
  ticks: minute
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_analog_minute_ticks_border.png' alt='显示分钟刻度和秒数的中等尺寸模拟时钟截图'>
显示分钟刻度和秒数的中等尺寸模拟时钟截图
</p>

带标题、无刻度、有边框且显示秒数的模拟时钟：

```yaml
type: clock
clock_style: analog
clock_size: medium
show_seconds: true
analog_options:
  border: true
  ticks: none
title: Mountain Time
```

<p class='img'>
<img src='/home-assistant/images/dashboards/clock_card_analog_no_ticks_border_title_mountain_time.png' alt='带标题、无刻度、有边框且显示秒数的中等尺寸模拟时钟截图'>
带标题、无刻度、有边框且显示秒数的中等尺寸模拟时钟截图
</p>
