---
title: 状态和状态对象
description: 介绍 Home Assistant 中状态和状态对象的所有相关知识。
---

设备在 Home Assistant 中以实体表示。实体的状态（例如，灯是开着的，亮度为 50%，颜色为橙色）可以在仪表盘上显示或用于自动化。本页面介绍 _状态_、_状态对象_ 和 _实体状态属性_ 的概念。

## 状态与状态对象

在 Home Assistant 中，状态对象是实体在特定时刻的所有属性和状态的当前表示。状态被记录为 _状态对象_。实体不断跟踪其状态并将其写入状态对象，以便其他实体/模板/前端可以访问它。在示例中——灯是开着的，亮度为 50%，颜色为橙色——_on_ 是灯的实际状态。50% 的亮度和颜色是实体状态属性。

<a id="about-state-object"></a>

### 关于状态对象

状态对象表示实体在特定时间点的状态及其属性。所有状态对象都将始终具有实体 ID、状态以及最后更新、最后更改和最后报告的时间戳。
`state` 前缀表示此信息是状态对象的一部分（与实体相关）。例如，`state.state` 是实体在给定时间的状态。

| 字段                   | 描述                                                                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state.state`          | 实体当前状态的字符串表示。例如 `off`。                                                                                                                                                |
| `state.entity_id`      | 实体 ID。格式：`<domain>.<object_id>`。例如：`light.kitchen`。                                                                                                                          |
| `state.domain`         | 实体的域。例如：`light`。                                                                                                                                                               |
| `state.object_id`      | 实体的对象 ID。例如：`kitchen`。                                                                                                                                                        |
| `state.name`           | 实体的名称。基于 `friendly_name` 属性，如无则使用对象 ID。例如：`Kitchen ceiling`。                                                                                                     |
| `state.last_changed`   | 状态在状态机中更改的时间（UTC 时间）。如果仅状态属性更改，则不会更新此时间。例如：`2013-09-17 07:32:51.715874+00:00`。                                                                  |
| `state.last_reported`  | 状态写入状态机的时间（UTC 时间）。无论状态或状态属性是否有任何更改，此时间戳都会更新。例如：`2013-09-17 07:32:51.715874+00:00`。                                                        |
| `state.last_updated`   | 状态或状态属性在状态机中更改的时间（UTC 时间）。如果状态和状态属性都没有更改，则不会更新此时间。例如：`2013-09-17 07:32:51.715874+00:00`。                                              |
| `state.attributes`     | 包含与当前状态相关的额外属性的字典。                                                                                                                                                     |
| `state.context`        | 包含与状态上下文相关的额外属性的字典。                                                                                                                                                   |

### 关于状态

开发者工具状态页面的截图显示三个处于不同状态（`state.state`）的灯：`on`、`off` 和 `unavailable`。每个灯都有其自己的实体状态属性，如 `supported_color_modes`、`supported_features`。这些属性有自己的状态：`supported_color_modes` 属性的状态是 `color_temp` 和 `hs`，`supported_features` 属性的状态是 `4`。

<p class='img'>
  <img src='/home-assistant/images/integrations/light/state_light.png' alt='截图显示三个灯的不同状态：`on`、`off` 或 `unavailable`'>
  三个灯的不同状态：`on`、`off` 或 `unavailable`。
</p>

`state.state` 是[状态对象](#关于状态对象)的核心。状态保存了实体的关键信息。例如，灯是开还是关、当前温度或使用的能量。状态对象存储了与状态相关的 3 个时间戳：`last_updated`、`last_changed` 和 `last_reported`。每个实体恰好有一个状态，状态一次只保存一个值。

<a id="about-entity-state-attributes"></a>

### 关于实体状态属性

状态一次只保存一个值。但是，实体可以在状态对象中存储相关的实体状态属性。例如，灯的状态是 _on_，相关属性可能是其当前亮度和颜色值。[状态变更事件](/home-assistant/docs/configuration/events/#events-and-state-changes)可以用作触发器。当前状态可用于[条件](/home-assistant/docs/automation/condition/)。下面的示例显示了三个具有不同实体状态属性的灯。

<p class='img'>
  <img src='/home-assistant/images/integrations/light/state_light.png' alt='截图显示三个灯的不同状态和属性'>
  显示三个具有不同实体状态属性的灯的示例。
</p>

实体有一些与其状态无关的属性，例如 `friendly_name`。有些属性在所有实体上都可用，例如 `friendly_name` 或 `icon`。除此之外，每个集成都有自己的属性来表示实体的额外状态数据。例如，灯集成有灯的当前亮度和颜色属性。当属性不可用时，Home Assistant 不会将其写入状态。实体属性是可选的。

使用模板时，属性可以通过其名称访问。例如 `state.attributes.assumed_state`。

下表列出了可能存在的常见状态属性，具体取决于实体域。

| 属性                  | 描述                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `friendly_name`       | 实体的名称。例如：`Kitchen Ceiling`。                                                                                                                                                      |
| `icon`                | 前端中用于实体的图标。例如：`mdi:home`。                                                                                                                                                   |
| `entity_picture`      | 应用于代替域图标显示的图片 URL。例如：`http://example.com/picture.jpg`。                                                                                                                   |
| `assumed_state`       | 布尔值，表示当前状态是否为假设。[更多信息](/home-assistant/blog/2016/02/12/classifying-the-internet-of-things/#classifiers) 例如：`True`。                                                                   |
| `unit_of_measurement` | 状态的计量单位。用于图表分组或理解实体。例如：`°C`。                                                                                                                                       |
| `attribution`         | 数据提供者。例如："Data provided by rejseplanen.dk"、"Data provided by openSenseMap"                                                                                                        |
| `device_class`        | 实体代表的设备类型。用于在 UI 中显示设备特定信息。                                                                                                                                         |
| `supported_features`  | 实体支持的功能。例如，对于遮盖，可能列出 `opening`、`closing`、`stopping`、`setting position`。对于媒体播放器，可能列出 `play`、`pause`、`stop` 和 `volume control`                        |

当属性包含空格时，可以这样获取：`state_attr('sensor.livingroom', 'Battery numeric')`。

## 上下文

上下文是状态对象和事件中使用的属性。它将动作和状态联系在一起。每当动作或用户交互导致状态更改时，状态对象中会分配一个新的上下文。此上下文将附加到由于更改而发生的所有事件和状态。

| 字段        | 描述                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | 上下文的唯一标识符。                                                                                                                                                   |
| `user_id`   | 启动更改的用户的唯一标识符。如果动作不是由用户启动（例如，由自动化启动），则将为 `None`。                                                                               |
| `parent_id` | 启动更改的父上下文的唯一标识符（如果可用）。例如，如果触发自动化，触发器的上下文将被设置为父上下文。                                                                     |

## 示例

- 评估开关entities的 `state.last_changed`：
  

  ```jinja
  {{ state_attr('switch.coffee_maker', 'last_changed') }}
  ```
  
    
  结果类型：`string`，表示日期时间对象，例如  
  `2025-11-11 12:56:10.244125+00:00`

***

- 评估此开关的 `state.context.id`：
  
  
  ```jinja
  {{ state_attr('switch.coffee_maker', 'context')['id'] }}
  ```

  
  结果类型：`string`，表示 ID 代码，例如  
  `01K9SF2R36KRV5N4PTC38S6KJ2F`

***

- 评估此开关的 `state.context.user_id`：
  
  
  ```jinja
  {{ state_attr('switch.coffee_maker', 'context')['user_id'] }}
  
  ```
  
  结果类型：`string`，表示用户 ID 代码，例如
  `01K9SF2R36KRV5N4PTC38SKS4LW6`
