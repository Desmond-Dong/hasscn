---
title: "复杂功能"
id: "complications"
---


复杂功能允许您在 Apple Watch 表盘上显示 Home Assistant 传感器的值。Home Assistant Apple Watch 应用包含适用于大多数 Apple Watch 表盘的复杂功能。

## 前提条件

下面描述的所有模板化功能要求用户是[管理员](https://www.home-assistant.io/integrations/person/#adding-a-person-to-home-assistant)。


## 创建复杂功能

复杂功能是通过配对 iPhone 上的 Home Assistant 伴侣应用创建的，在[配置](https://my.home-assistant.io/redirect/config/)的伴侣应用部分的 Apple Watch 页面中。

复杂功能按其位置列出，并按表盘类型分组。对于某些位置，有多个模板可用，选择位置后可以选择所需的模板。复杂功能值使用 [Jinja2 模板](https://www.home-assistant.io/docs/configuration/templating/)设置。除了设置显示文本的模板外，还可以选择图标。每行文本和图标的颜色可以独立设置。有关不同复杂功能的概述以及它们在不同表盘上的显示方式，请参阅[这些 Apple 开发者指南](https://developer.apple.com/design/human-interface-guidelines/components/system-experiences/complications/)。

## 为新的"模块化"表盘创建复杂功能

WatchOS 9 移除了旧的"模块化"表盘，并将"信息图表模块化"重命名为"模块化"。为新的"模块化"表盘创建新复杂功能时，请从"图形"部分选择"圆形"或"矩形"。"模块化"部分中的复杂功能不再工作。

![新复杂功能](https://github.com/user-attachments/assets/46541b65-48da-4228-8035-06b90da73689)

示例：

![图形圆形示例](https://github.com/user-attachments/assets/57a69fd3-38b7-4b48-b401-2941504515f1)

## 环形/仪表复杂功能

要设置开放式或封闭式环形复杂功能的填充程度，请将模板产生的值标准化为 `0.0` 到 `1.0` 之间的数字。值为 `0.0` 将给出一个空环，`1.0` 将给出一个满环。您可以使用如下模板来实现：

```yaml
{{ (value - minimum) / (maximum - minimum) }}
```

例如，要在设定值之间显示温度传感器：

```yaml
{% set original = states("sensor.living_room_temperature") | float %}
{% set minimum = 16.0 %}
{% set maximum = 24.0 %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

您也可以使最小值和最大值动态化。例如，基于当前天气预报：

```yaml
{% set forecast = state_attr("weather.openweathermap", "forecast") | first %}
{% set original = state_attr("weather.openweathermap", "temperature") %}
{% set minimum = forecast["templow"] %}
{% set maximum = forecast["temperature"] %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

这两个示例都注意避免返回 <0 或 >1.0 的值，这正是 'adjusted' 变量所做的事情。

## 自动更新

复杂功能大约在每小时的 :00、:15、:30 和 :45 更新；确切时间由系统决定。编辑复杂功能会立即将其同步到手表，但您可能需要启动手表应用才能更新复杂功能。

应用保持非活动复杂功能的更新，以便于切换表盘。如果 Home Assistant 应用不在您的活动表盘上，它的更新频率会低得多，您可能会发现在切换表盘时显示的是旧信息。

## 手动更新

复杂功能也可以使用[通知命令](/companion/notifications/commands)进行更新。这些更新受系统限制，每天 50 次，您可以在[配置](https://my.home-assistant.io/redirect/config/)的伴侣应用部分的 Apple Watch 部分查看当前限制。

更新完全应用可能需要几秒钟或几分钟。

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 手动更新需要 2021.6 版本。

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: update_complications
```

:::info
使用本地推送时，通过命令手动更新尚不起作用。
:::