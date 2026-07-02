# 选择器

选择器可用于指定蓝图输入接受哪些值。选择器还会定义该输入在用户界面中的显示方式。

例如，有些选择器会显示一个切换按钮，用于打开或关闭某项内容；而另一些选择器则可以过滤设备列表，只显示具备运动感应功能的设备。

为蓝图自动化输入设置合适的选择器，可以让蓝图在 UI 中更易于使用。

当前可用的选择器如下：

* [动作选择器](#action-selector)
* [应用选择器](#app-selector)
* [区域选择器](#area-selector)
* [属性选择器](#attribute-selector)
* [Assist 管线选择器](#assist-pipeline-selector)
* [备份位置选择器](#backup-location-selector)
* [布尔选择器](#boolean-selector)
* [色温选择器](#color-temperature-selector)
* [条件选择器](#condition-selector)
* [配置条目选择器](#config-entry-selector)
* [常量选择器](#constant-selector)
* [对话代理选择器](#conversation-agent-selector)
* [国家选择器](#country-selector)
* [日期选择器](#date-selector)
* [日期和时间选择器](#date--time-selector)
* [设备选择器](#device-selector)
* [时长选择器](#duration-selector)
* [实体选择器](#entity-selector)
* [楼层选择器](#floor-selector)
* [图标选择器](#icon-selector)
* [标签选择器](#label-selector)
* [语言选择器](#language-selector)
* [位置选择器](#location-selector)
* [媒体选择器](#media-selector)
* [数字选择器](#number-selector)
* [对象选择器](#object-selector)
* [二维码选择器](#qr-code-selector)
* [RGB 颜色选择器](#rgb-color-selector)
* [下拉选择器](#select-selector)
* [状态选择器](#state-selector)
* [统计选择器](#statistic-selector)
* [目标选择器](#target-selector)
* [模板选择器](#template-selector)
* [文本选择器](#text-selector)
* [主题选择器](#theme-selector)
* [时间选择器](#time-selector)
* [触发器选择器](#trigger-selector)

您可以在 [Home Assistant Design 门户](https://design.home-assistant.io/#components/ha-selector)中找到这些选择器的交互式演示。

如果未定义选择器，则会显示一个单行文本输入框。

<a id="action-selector"></a>

## 动作选择器

动作选择器允许您输入一个或多个动作序列。在用户界面中，会显示自动化编辑器的动作部分。该输入的值将包含一个要执行的动作列表。

![动作选择器截图](/home-assistant/images/blueprints/selector-action.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
action:
```

此选择器的输出是一个动作列表。例如：

```yaml
# 动作选择器输出示例
- action: scene.turn_on
  target:
    entity_id: scene.watching_movies
  metadata: {}
```

<a id="app-selector"></a>

## 应用选择器

此选择器只能在 Home Assistant Operating System 安装中使用。对于 Home Assistant Container 安装，会显示错误。

应用选择器（此前称为附加组件选择器）允许您输入应用 slug。在用户界面中，它会列出所有已安装的 Home Assistant 应用，并使用所选应用的 slug。

![应用选择器截图](/home-assistant/images/blueprints/selector-apps.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
# 应用选择器示例
app:
```

此选择器的输出是所选应用的 slug。例如：`core_ssh`。

<a id="area-selector"></a>

## 区域选择器

区域选择器会显示一个区域查找器，可根据选择器配置选择单个或多个区域。输入值将是区域 ID；如果将 `multiple` 设为 `true`，则返回区域 ID 列表。

区域选择器还可以根据分配到这些区域中的设备和实体属性来过滤区域列表。例如，可将区域列表限制为仅显示具有 [ZHA](/home-assistant/integrations/zha.md) 集成提供实体的区域。

在最基础的形式下，此选择器不需要任何选项，此时会显示所有区域。

![区域选择器截图](/home-assistant/images/blueprints/selector-area.png)

```yaml
area:
```

### Configuration variables for `area`

device:
description: >
提供 device 选项时，区域列表会过滤为至少包含一个符合给定条件设备的区域。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将区域列表限制为提供该集成域设备的区域，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
manufacturer:
description: >
设置后，会将区域列表限制为提供指定制造商设备的区域。
type: string
required: false
model:
description: >
设置后，会将区域列表限制为包含指定型号设备的区域。
type: string
required: false
model\_id:
description: >
设置后，会将区域列表限制为包含指定 model ID 设备的区域。
type: string
required: false
entity:
description: >
提供 entity 选项时，区域列表会过滤为至少包含一个符合给定条件实体的区域。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将区域列表限制为提供该集成域实体的区域，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
domain:
description: >
将区域列表限制为提供特定[域](/home-assistant/docs/configuration/entities_domains/index.md#domains)实体的区域，例如 [`light`](/home-assistant/integrations/light.md) 或 [`binary_sensor`](/home-assistant/integrations/binary_sensor.md)。可以是单个字符串，也可以是字符串列表。
type: \[string, list]
required: false
device\_class:
description: >
将区域列表限制为包含具有特定 device class 的实体的区域，例如 `motion` 或 `window`。可以是单个字符串，也可以是字符串列表。
type: \[device\_class, list]
required: false
supported\_features:
description: >
将区域列表限制为包含具有特定 supported feature 的实体的区域，例如 `light.LightEntityFeature.TRANSITION` 或 `climate.ClimateEntityFeature.TARGET_TEMPERATURE`。应为功能列表。有关各实体类型支持功能的列表，请参阅[实体文档](https://developers.home-assistant.io/docs/core/entity)。
type: list
required: false
multiple:
description: >
允许选择多个区域。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false

此选择器的输出是区域 ID；如果 `multiple` 设为 `true`，则输出区域 ID 列表。

```yaml
# 当 multiple 设为 false 时的区域选择器输出示例
living_room

# 当 multiple 设为 true 时的区域选择器输出示例
- living_room
- kitchen
```

### 区域选择器示例 <!-- omit from toc -->

以下示例的区域选择器只会显示提供一个或多个灯或开关实体，且这些实体由 [ZHA](/home-assistant/integrations/zha.md) 集成提供的区域。

```yaml
area:
  entity:
    integration: zha
    domain:
      - light
      - switch
```

下面这个示例使用区域选择器，只显示提供一个或多个遥控器，且这些遥控器由 [deCONZ](/home-assistant/integrations/deconz.md) 集成提供的区域。您还可以选择多个区域。

```yaml
area:
  multiple: true
  device:
    - integration: deconz
      manufacturer: IKEA of Sweden
      model: TRADFRI remote control
```

<a id="attribute-selector"></a>

## 属性选择器

属性选择器会显示某个指定实体的状态属性列表，您可以从中选择一个属性。

例如，您可以用它选择灯实体的“效果”属性，或 `sun` 实体的“下次黎明”属性。

![属性选择器截图](/home-assistant/images/blueprints/selector-attribute.png)

### Configuration variables for `attribute`

entity\_id:
description: 可从中选择状态属性的实体 ID。
type: string
required: true

此选择器的输出是所选属性的键，而不是前端中显示的翻译后或美化后的名称。例如：`next_dawn`。

<a id="assist-pipeline-selector"></a>

## Assist 管线选择器

Assist 管线选择器会显示所有可用的 Assist 管线（助手），您可以从中选择一个。

![Assist 管线选择器截图](/home-assistant/images/blueprints/selector-assist-pipeline.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
assist_pipeline:
```

<a id="backup-location-selector"></a>

## 备份位置选择器

此选择器只能在安装了 Home Assistant Operating System 的系统上使用。对于 Home Assistant Container 安装，会显示错误。

备份位置选择器会显示备份可保存到的位置列表，具体取决于您在[存储](https://my.home-assistant.io/redirect/storage/)中配置了什么。

![备份位置选择器截图](/home-assistant/images/blueprints/selector-backup-location.png)

此选择器的输出是所选网络存储的名称。如果用户选择本地数据磁盘选项，而不是某个已配置的网络存储位置，输出也可能是 `/backup`。

```yaml
backup_location:
```

<a id="boolean-selector"></a>

## 布尔选择器

布尔选择器会显示一个切换开关，让您开启或关闭所选选项。

![布尔选择器截图](/home-assistant/images/blueprints/selector-boolean.png)

布尔选择器适合用于为蓝图之类的内容添加功能开关。

此选择器没有其他选项，因此只包含它的键。

```yaml
boolean:
```

此选择器的输出为：开关开启时返回 `true`，否则返回 `false`。

<a id="color-temperature-selector"></a>

## 色温选择器

色温选择器允许您通过滑块在渐变条上选择色温。

![色温选择器截图](/home-assistant/images/blueprints/selector-color-temp.png)

```yaml
color_temp:
```

### Configuration variables for `color_temp`

unit:
description: 选择的色温单位，可以是 `kelvin` 或 `mired`。由于历史原因，默认值为 `mired`。
type: string
required: false
default: mired
min:
description: 所选单位下的最小色温。
type: integer
default: 开尔文为 2700，mired 为 153
required: false
max:
description: 所选单位下的最大色温。
type: integer
default: 开尔文为 6500，mired 为 500
required: false

此选择器的输出是一个数字，表示所用单位下选定的色温。

<a id="condition-selector"></a>

## 条件选择器

条件选择器允许您输入一个或多个条件。在用户界面中，会显示自动化编辑器的条件部分。输入值将包含一个条件列表。

![条件选择器截图](/home-assistant/images/blueprints/selector-condition.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
condition:
```

此选择器的输出是一个条件列表。例如：

```yaml
# 条件选择器输出示例
- condition: numeric_state
  entity_id: "sensor.outside_temperature"
  below: 20
```

<a id="config-entry-selector"></a>

## 配置条目选择器

配置条目选择器允许您选择某个集成的配置条目。该选择器返回所选集成配置条目的 entry ID。

![配置条目选择器截图](/home-assistant/images/blueprints/selector-config-entry.png)

```yaml
config_entry:
```

### Configuration variables for `config_entry`

integration:
description: 将可选择的配置条目列表限制为单个集成域。
type: string
required: false

此选择器的输出是配置条目的 entry ID，例如 `6b68b250388cbe0d620c92dd3acc93ec`。

<a id="constant-selector"></a>

## 常量选择器

常量选择器会显示一个切换开关，让您启用所选选项。它与[布尔选择器](#boolean-selector)类似，不同之处在于：当未启用时，常量选择器没有值。

![常量选择器截图](/home-assistant/images/blueprints/selector-constant.png)

必须配置该选择器的值，也可以选择性配置标签。

```yaml
constant:
  value: true
  label: 已启用
```

此选择器在开关开启时输出配置的值，关闭时没有输出。

<a id="conversation-agent-selector"></a>

## 对话代理选择器

对话代理选择器允许您选择一个对话代理。

![对话代理选择器截图](/home-assistant/images/blueprints/selector-conversation-agent.png)

该选择器有 1 个选项 `language`，用于根据语言过滤显示的对话代理。

```yaml
conversation_agent:
  language: en
```

### Configuration variables for `conversation_agent`

language:
description: 将对话代理列表限制为支持指定语言的代理。
type: string
required: false

此选择器的输出是对话代理的 ID。

<a id="country-selector"></a>

## 国家选择器

国家选择器允许您从国家列表中选择一个国家。

![国家选择器截图](/home-assistant/images/blueprints/country_selector.png)

```yaml
country:
```

### Configuration variables for `entity`

countries:
description: 可供选择的国家列表，应使用 ISO 3166 国家代码。
type: list
default: Home Assistant 前端中可用的国家
required: false
no\_sort:
description: >
是否按名称排序。设为 true 时，将保留提供的国家顺序。
type: boolean
default: false
required: false

此选择器的输出是 ISO 3166 国家代码。

<a id="date-selector"></a>

## 日期选择器

日期选择器会显示一个日期输入框，让您指定日期。

![日期选择器截图](/home-assistant/images/blueprints/selector-date.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
date:
```

此选择器的输出是 `YYYY-MM-DD` 格式的日期，例如 `2022-02-22`。

<a id="date--time-selector"></a>

## 日期和时间选择器

日期和时间选择器会显示一个日期时间输入框，让您指定带具体时间的日期。

![日期和时间选择器截图](/home-assistant/images/blueprints/selector-datetime.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
datetime:
```

此选择器的输出包含 `YYYY-MM-DD` 格式的日期和 24 小时制时间，例如：`2022-02-22 13:30:00`。

<a id="device-selector"></a>

## 设备选择器

设备选择器会显示一个设备查找器，可根据选择器配置选择单个或多个设备。输入值将包含设备 ID；如果 `multiple` 设为 `true`，则返回设备 ID 列表。

设备选择器可以根据设备制造商、型号、model ID、设备提供的实体，或提供该设备的域来过滤设备列表。

![设备选择器截图](/home-assistant/images/blueprints/selector-device.png)

在最基础的形式下，此选择器不需要任何选项，此时会显示所有设备。

```yaml
device:
```

### Configuration variables for `device`

entity:
description: >
提供 entity 选项时，设备列表会过滤为至少提供一个符合给定条件实体的设备。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将设备列表限制为提供该集成域实体的设备，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
domain:
description: >
将设备列表限制为提供特定[域](/home-assistant/docs/configuration/entities_domains/index.md#domains)实体的设备，例如 [`light`](/home-assistant/integrations/light.md) 或 [`binary_sensor`](/home-assistant/integrations/binary_sensor.md)。可以是单个字符串，也可以是字符串列表。
type: string
required: false
device\_class:
description: >
将设备列表限制为包含具有特定 device class 实体的设备，例如 `motion` 或 `window`。可以是单个字符串，也可以是字符串列表。
type: \[device\_class, list]
required: false
supported\_features:
description: >
将设备列表限制为包含具有特定 supported feature 实体的设备，例如 `light.LightEntityFeature.TRANSITION` 或 `climate.ClimateEntityFeature.TARGET_TEMPERATURE`。应为功能列表。有关各实体类型支持功能的列表，请参阅[实体文档](https://developers.home-assistant.io/docs/core/entity)。
type: list
required: false
filter:
description: >
提供 filter 选项时，设备列表会过滤为至少提供一个符合给定条件实体的设备。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将设备列表限制为由该集成域提供的设备。
type: string
required: false
manufacturer:
description: >
设置后，会将设备列表限制为指定制造商提供的设备。
type: string
required: false
model:
description: >
设置后，会将设备列表限制为具有指定型号的设备。
type: string
required: false
model\_id:
description: >
设置后，会将设备列表限制为具有指定 model ID 的设备。
type: string
required: false
multiple:
description: >
允许选择多个设备。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false

此选择器的输出是设备 ID；如果 `multiple` 设为 `true`，则输出设备 ID 列表。

```yaml
# 当 multiple 设为 false 时的设备选择器输出示例
faadde5365842003e8ca55267fe9d1f4

# 当 multiple 设为 true 时的设备选择器输出示例
- faadde5365842003e8ca55267fe9d1f4
- 3da77cb054352848b9544d40e19de562
```

### 设备选择器示例 <!-- omit from toc -->

下面这个示例的设备选择器只会显示满足以下条件的设备：

* 由 [deCONZ](/home-assistant/integrations/deconz.md) 集成提供
* 是型号为 RWL021 的 Philips Hue 遥控器
* 提供一个电池 [sensor](/home-assistant/integrations/sensor.md)

下面是对应的 YAML：

```yaml
device:
  filter:
    - integration: deconz
      manufacturer: Philips
      model: RWL021
  entity:
    - domain: sensor
      device_class: battery
```

<a id="duration-selector"></a>

## 时长选择器

时长选择器让您选择一个时间长度。例如，它可用于延迟或偏移量。

![时长选择器截图](/home-assistant/images/blueprints/selector-duration.png)

```yaml
duration:
```

### Configuration variables for `attribute`

enable\_day:
description: 设为 `true` 时，时长选择器允许选择天数。
type: boolean
default: false
required: false
enable\_second:
description: 设为 `true` 时，时长选择器允许选择秒数。
type: boolean
default: true
required: false
enable\_millisecond:
description: 设为 `true` 时，时长选择器允许选择毫秒。
type: boolean
default: false
required: false
allow\_negative:
description: 设为 `true` 时，时长选择器允许选择正值或负值。
type: boolean
default: false
required: false

此选择器的输出是一个映射，包含用户选择的时间值。例如：

```yaml
days: 1 # 仅当 enable_day 设为 true 时提供
hours: 12
minutes: 30
seconds: 15 # 仅当 enable_second 设为 true 时提供（默认）
milliseconds: 500 # 仅当 enable_millisecond 设为 true 时提供
```

<a id="entity-selector"></a>

## 实体选择器

实体选择器会显示一个实体查找器，可根据选择器配置选择单个实体或多个实体。输入值将包含实体 ID；如果 `multiple` 设为 `true`，则返回实体 ID 列表。

实体选择器可以根据设备的 class、实体的 domain，或提供该实体的域来过滤实体列表。

![实体选择器截图](/home-assistant/images/blueprints/selector-entity.png)

在最基础的形式下，此选择器不需要任何选项，此时会显示所有实体。

```yaml
entity:
```

### Configuration variables for `entity`

exclude\_entities:
description: 从可选列表中排除的实体 ID 列表。
type: list
required: false
include\_entities:
description: 将可选列表限制为这些实体 ID。
type: list
required: false
filter:
description: >
提供 filter 选项时，实体列表会限制为符合给定条件的实体。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将实体列表限制为由该集成域提供的实体，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
domain:
description: >
将实体列表限制为特定[域](/home-assistant/docs/configuration/entities_domains/index.md#domains)中的实体，例如 [`light`](/home-assistant/integrations/light.md) 或 [`binary_sensor`](/home-assistant/integrations/binary_sensor.md)。可以是单个字符串，也可以是字符串列表。
type: \[string, list]
required: false
device\_class:
description: >
将实体列表限制为具有特定 device class 的实体，例如 `motion` 或 `window`。可以是单个字符串，也可以是字符串列表。
type: \[device\_class, list]
required: false
supported\_features:
description: >
将实体列表限制为具有特定 supported feature 的实体，例如 `light.LightEntityFeature.TRANSITION` 或 `climate.ClimateEntityFeature.TARGET_TEMPERATURE`。应为功能列表。
type: list
required: false
multiple:
description: >
允许选择多个实体。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false
reorder:
description: >
允许重新排序实体（仅在 `multiple` 设为 `true` 时适用）。
type: boolean
default: false
required: false

此选择器的输出是实体 ID；如果 `multiple` 设为 `true`，则输出实体 ID 列表。

```yaml
# 当 multiple 设为 false 时的实体选择器输出示例
light.living_room

# 当 multiple 设为 true 时的实体选择器输出示例
- light.living_room
- light.kitchen
```

### 实体选择器示例 <!-- omit from toc -->

下面这个实体选择器只会显示满足以下条件的实体：

* 由 [ZHA](/home-assistant/integrations/zha.md) 集成提供
* 来自[二元传感器](/home-assistant/integrations/binary_sensor.md)域
* 以运动类设备的 device class 进行上报
* 允许选择一个或多个实体

下面是对应的 YAML：

```yaml
entity:
  multiple: true
  filter:
    - integration: zha
      domain: binary_sensor
      device_class: motion
```

<a id="floor-selector"></a>

## 楼层选择器

楼层选择器会显示一个楼层查找器，可根据选择器配置选择楼层。输入值将是楼层 ID；如果 `multiple` 设为 `true`，则返回楼层 ID 列表。

楼层选择器可以根据分配到这些楼层中区域的设备和实体属性来过滤楼层列表。例如，可基于所在区域，将楼层列表限制为仅显示具有 [ZHA](/home-assistant/integrations/zha.md) 集成提供实体的楼层。

在最基础的形式下，此选择器不需要任何选项，此时会显示所有楼层。

![楼层选择器截图](/home-assistant/images/blueprints/selector-floor.png)

```yaml
floor:
```

### Configuration variables for `floor`

device:
description: >
提供 device 选项时，楼层列表会过滤为至少包含一个符合给定条件设备的楼层。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将楼层列表限制为包含该集成域设备的楼层，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
manufacturer:
description: >
设置后，列表只会包含具有指定制造商设备的楼层。
type: string
required: false
model:
description: >
设置后，列表只会包含具有指定型号设备的楼层。
type: string
required: false
model\_id:
description: >
设置后，列表只会包含具有指定 model ID 设备的楼层。
type: string
required: false
entity:
description: >
提供 entity 选项时，列表只会包含至少具有一个符合给定条件实体的楼层。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将楼层列表限制为包含该集成域实体的楼层，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
domain:
description: >
设置后，列表只会包含具有某些[域](/home-assistant/docs/configuration/entities_domains/index.md#domains)实体的楼层，例如 [`light`](/home-assistant/integrations/light.md) 或 [`binary_sensor`](/home-assistant/integrations/binary_sensor.md)。可以是单个字符串，也可以是字符串列表。
type: \[string, list]
required: false
device\_class:
description: >
设置后，列表只会包含具有特定 device class 实体的楼层，例如 `motion` 或 `window`。可以是单个字符串，也可以是字符串列表。
type: \[device\_class, list]
required: false
supported\_features:
description: >
设置后，列表只会包含具有特定 supported feature 实体的楼层，例如 `light.LightEntityFeature.TRANSITION` 或 `climate.ClimateEntityFeature.TARGET_TEMPERATURE`。应为功能列表。
type: list
required: false
multiple:
description: >
允许选择多个楼层。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false

此选择器的输出是楼层 ID；如果 `multiple` 设为 `true`，则输出楼层 ID 列表。

```yaml
# 当 multiple 设为 false 时的楼层选择器输出示例
first_floor

# 当 multiple 设为 true 时的楼层选择器输出示例
- first_floor
- second_floor
```

### 楼层选择器示例 <!-- omit from toc -->

下面这个楼层选择器只会显示具有一个或多个灯或开关实体，且这些实体由 [ZHA](/home-assistant/integrations/zha.md) 集成提供的楼层。

```yaml
floor:
  entity:
    integration: zha
    domain:
      - light
      - switch
```

下面这个示例使用楼层选择器，只会显示具有一个或多个遥控器，且这些遥控器由 [deCONZ](/home-assistant/integrations/deconz.md) 集成提供的楼层。您还可以选择多个楼层。

```yaml
floor:
  multiple: true
  device:
    - integration: deconz
      manufacturer: IKEA of Sweden
      model: TRADFRI remote control
```

<a id="icon-selector"></a>

## 图标选择器

图标选择器会显示一个图标选择器，让您选择图标。

```yaml
icon:
```

### Configuration variables for `entity`

placeholder:
description: 未选择图标时显示的占位图标。
type: string
required: false

此选择器的输出是一个包含所选图标的字符串，例如：`mdi:bell`。

<a id="label-selector"></a>

## 标签选择器

标签选择器会显示一个标签查找器，让您选择标签。输入值是标签 ID；如果 `multiple` 设为 `true`，则返回标签 ID 列表。

![标签选择器截图](/home-assistant/images/blueprints/selector-label.png)

在最基础的形式下，此选择器不需要任何选项，此时会显示所有标签。

```yaml
label:
```

### Configuration variables for `text`

multiple:
description: >
允许选择多个标签。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false

此选择器的输出是标签 ID；如果 `multiple` 设为 `true`，则输出标签 ID 列表。

```yaml
# 当 multiple 设为 false 时的标签选择器输出示例
energy_saving

# 当 multiple 设为 true 时的标签选择器输出示例
- energy_saving
- christmas_decorations
```

<a id="language-selector"></a>

## 语言选择器

语言选择器允许您从语言列表中选择一种语言。

![语言选择器截图](/home-assistant/images/blueprints/selector-language.png)

```yaml
language:
```

### Configuration variables for `entity`

languages:
description: 可供选择的语言列表，应使用 RFC 5646 语言代码。
type: list
default: Home Assistant 前端中可用的语言
required: false
native\_name:
description: >
是否以用户当前语言显示语言名称，还是以该语言自身的名称显示。
type: boolean
default: false
required: false
no\_sort:
description: >
是否按名称排序。设为 true 时，将保留提供的语言顺序。
type: boolean
default: false
required: false

此选择器的输出是 RFC 5646 语言代码。

<a id="location-selector"></a>

## 位置选择器

位置选择器允许您从地图中选择一个位置，并返回匹配的经度和纬度坐标。它还可以选择性支持设置位置半径。

![位置选择器截图](/home-assistant/images/blueprints/selector-location.png)

```yaml
location:
```

### Configuration variables for `entity`

icon:
description: 显示在地图上的可选图标。
type: string
required: false
radius:
description: >
允许选择位置半径。启用后，将以米为单位返回半径。
type: boolean
default: false
required: false

此选择器的输出是一个映射，包含所选位置的纬度和经度，以及启用时返回的半径。例如：

```yaml
latitude: 50.935
longitude: 6.95
radius: 500 # 仅当 radius 设为 true 时提供
```

<a id="media-selector"></a>

## 媒体选择器

媒体选择器功能强大，可让您轻松选择要在媒体设备上播放的媒体。媒体类型很多，例如摄像头、本地媒体、文本转语音、Home Assistant 仪表盘等。

系统会提示您先选择用于播放媒体的设备。选择设备后，媒体选择器只会显示适用于该设备的媒体。

![媒体选择器截图](/home-assistant/images/blueprints/selector-media.png)

如果您希望用户选择媒体设备及其适用媒体，可以在不带任何选项的情况下使用媒体选择器：

```yaml
media:
```

您也可以为媒体选择器添加可选的 `accept` 过滤器，以限制可选择的媒体类型。此时不会要求用户选择设备。

```yaml
media:
  accept:
    - image/*
```

### Configuration variables for `media`

accept:
description: >
用户允许选择的媒体类型列表。
type: list
required: false
multiple:
description: >
允许选择多个媒体项。设为 `true` 时，此选择器的结果将是列表，而不是单个对象。
type: boolean
default: false
required: false

媒体选择器的输出是一个映射，其中包含所选媒体设备以及要播放的媒体信息。还会包含用于前端的 metadata，不应在后端中使用。

输出示例：

```yaml
entity_id: media_player.living_room
media_content_id: media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
media_content_type: provider
metadata:
  title: TTS Message
  thumbnail: https://brands.home-assistant.io/_/cloud/logo.png
  media_class: app
  children_media_class: null
  navigateIds:
    - {}
    - media_content_type: app
      media_content_id: media-source://tts
    - media_content_type: provider
      media_content_id: >-
        media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
```

使用 `accept` 过滤器时的输出示例。请注意，此时不会包含 `entity_id`：

```yaml
media_content_id: media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
media_content_type: provider
metadata:
  title: TTS Message
  thumbnail: https://brands.home-assistant.io/_/cloud/logo.png
  media_class: app
  children_media_class: null
  navigateIds:
    - {}
    - media_content_type: app
      media_content_id: media-source://tts
    - media_content_type: provider
      media_content_id: >-
        media-source://tts/cloud?message=TTS+Message&language=en-US&gender=female
```

当 `multiple` 设为 `true` 时的输出示例（媒体对象列表）：

```yaml
- media_content_id: media-source://media_source/local/image1.jpg
  media_content_type: image/jpeg
  metadata:
    title: image1.jpg
- media_content_id: media-source://media_source/local/image2.jpg
  media_content_type: image/jpeg
  metadata:
    title: image2.jpg
```

<a id="number-selector"></a>

## 数字选择器

数字选择器会显示数字输入框或滑块输入，让用户指定数值。输入值将包含所选数值。

![数字选择器截图](/home-assistant/images/blueprints/selector-number.png)

在用户界面中，输入可以采用滑块模式或数字框模式。这两种模式都可以限制用户输入的最小值和最大值，也可以设置计量单位。

在最基础的形式下，此选择器需要设置最小值和最大值：

```yaml
number:
  min: 0
  max: 100
```

### Configuration variables for `number`

min:
description: 用户可设置的最小数值。
type: \[integer, float]
required: false
max:
description: 用户可设置的最大数值。
type: \[integer, float]
required: false
step:
description: 数值的步长。设为 `"any"` 可允许任意数值。
type: \[integer, float, "any"]
required: false
default: 1
unit\_of\_measurement:
description: 数值所使用的计量单位。
type: string
required: false
mode:
description: 可以是 `box` 或 `slider` 模式。
type: string
required: false
default: slider if min and max are set, otherwise box
translation\_key:
description: >
允许使用某个集成提供的翻译，其中 `translation_key` 是提供 `unit_of_measurement` 字符串翻译的键。更多信息请参阅[后端本地化](https://developers.home-assistant.io/docs/internationalization/core/#selectors)文档。
type: string
required: false

此选择器的输出是一个数字，例如：`42`

### 数字选择器示例 <!-- omit from toc -->

下面这个数字选择器示例允许用户以普通数字输入框输入百分比。

```yaml
number:
  min: 0
  max: 100
  unit_of_measurement: "%"
```

该示例也可以通过滑块实现更直观的形式。这对于让用户选择灯光亮度之类的场景很有帮助。下面这个示例还将亮度设置为每次按 10% 递增。

```yaml
number:
  min: 0
  max: 100
  step: 10
  unit_of_measurement: "%"
  mode: slider
```

<a id="object-selector"></a>

## 对象选择器

对象选择器可用于以 YAML 形式输入任意数据。这对于输入列表和字典很有用，例如用于动作的数据。输入值将包含提供的数据。

在不带任何选项的情况下使用时，选择器接受任何有效的 YAML 内容，例如对象、数组、字符串或其他 YAML 类型。输入框会显示为带语法高亮的编辑器。

![对象选择器截图](/home-assistant/images/blueprints/selector-object.png)

```yaml
object:
```

当指定 `fields` 时，选择器会通过表单强制对象符合该格式。

![对象结构选择器截图](/home-assistant/images/blueprints/selector-object-schema.png)

```yaml
object:
  label_field: name
  description_field: percentage
  multiple: true
  fields:
    name:
      label: 名称
      selector:
        text:
    percentage:
      label: 百分比
      selector:
        number:
          unit_of_measurement: "%"
```

此选择器的输出是一个 YAML 对象。

### Configuration variables for `object`

fields:
description: >
对象字段列表。
type: map
required: false
keys:
label:
description: 字段标签
required: false
type: string
required:
description: 设为 true 时，该字段必须存在。
required: false
default: false
type: boolean
selector:
description: 该字段所使用的选择器。可以是任意可用选择器。
required: true
type: string
label\_field:
description: >
用作标签的字段。默认使用第一个定义的字段。仅在设置了 `fields` 时使用。
type: string
required: false
description\_field:
description: >
用作说明的字段。仅在设置了 `fields` 时使用。
type: string
required: false
translation\_key:
description: >
允许使用某个集成提供的翻译，其中 `translation_key` 是提供选择器选项字符串翻译的键。更多信息请参阅[后端本地化](https://developers.home-assistant.io/docs/internationalization/core/#selectors)文档。
type: string
required: false
multiple:
description: >
允许添加多个对象。设为 `true` 时，此选择器的结果将是列表，而不是单个 YAML 对象。仅在设置了 `fields` 时使用。
type: boolean
required: false
default: false

<a id="qr-code-selector"></a>

## 二维码选择器

二维码选择器会显示一个二维码。它没有返回值。

![二维码选择器截图](/home-assistant/images/blueprints/selector-qr-code.png)

必须配置二维码的数据，也可以选择性设置缩放比例和纠错级别。缩放比例可让二维码变大或变小。

### Configuration variables for `qr_code`

data:
description: 要编码到二维码中的数据。
type: any
required: true
scale:
description: 缩放系数，用于调整二维码大小。
type: integer
required: false
default: 4
error\_correction\_level:
description: 二维码的纠错级别。纠错级别越高，即使二维码部分缺失，也更容易被扫描。可选值为 "low"、"medium"、"quartile" 或 "high"。
type: string
required: false
default: medium

```yaml
qr_code:
  data: "https://home-assistant.io"
  scale: 5
  error_correction_level: quartile
```

<a id="rgb-color-selector"></a>

## RGB 颜色选择器

RGB 颜色选择器允许您在用户界面的颜色选择器中选择颜色，并返回 RGB 颜色值。

![RGB 颜色选择器截图](/home-assistant/images/blueprints/selector-color-rgb.png)

```yaml
color_rgb:
```

此选择器没有其他选项，因此只包含它的键。

此选择器的输出是包含三个 RGB 值的列表，例如：`[255, 0, 0]`。

<a id="select-selector"></a>

## 下拉选择器

下拉选择器会显示一个可选项列表，用户可以从中选择。输入值将包含所选选项的值。一次只能选择一个选项。

![下拉选择器截图](/home-assistant/images/blueprints/selector-select.png)

该选择器需要提供一个选项列表供用户选择。

```yaml
select:
  options:
    - Red
    - Green
    - Blue
```

### Configuration variables for `select`

options:
description: >
用户可选择的选项列表。较小的列表（5 项或更少）会显示为单选按钮；更多项时会显示为下拉列表。
type: list
required: true
multiple:
description: >
允许选择多个选项。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
required: false
default: false
custom\_value:
description: >
允许用户输入并选择自定义值（如果 `multiple` 设为 `true`，则还可以在列出的选项之外添加多个自定义值）。
type: boolean
required: false
default: false
mode:
description: >
可以是 `list`（单选按钮）或 `dropdown`（组合框）模式。未指定时，较小的列表（5 项或更少）会显示为单选按钮；更多项时会显示为下拉列表。如果 `custom_value` 为 `true`，该设置会被忽略，前端将使用 `dropdown` 输入。
type: string
required: false
translation\_key:
description: >
允许使用某个集成提供的翻译，其中 `translation_key` 是提供选择器选项字符串翻译的键。更多信息请参阅[后端本地化](https://developers.home-assistant.io/docs/internationalization/core/#selectors)文档。
type: string
required: false
sort:
description: >
按字母顺序显示选项。
type: boolean
required: false
default: false

另外，也可以使用映射形式提供选项，以便返回与界面显示不同的值。

```yaml
select:
  options:
    - label: Red
      value: r
    - label: Green
      value: g
    - label: Blue
      value: b
```

### Configuration variables for `select_map`

options:
description: >
用户可选择的选项列表。较小的列表（5 项或更少）会显示为单选按钮；更多项时会显示为下拉列表。
type: map
required: true
keys:
label:
description: 该项在 UI 中显示的说明。
required: true
type: string
value:
description: 选择该标签时返回的值。
required: true
type: string

当 `multiple` 为 `false` 时，此选择器的输出是所选选项值的字符串。例如，在最后一个示例中，如果选择 `Green`，则返回 `g`；而在第一个示例中会返回 `Green`。

当 `multiple` 为 `true` 时，此选择器的输出是所选选项值列表。在这种情况下，如果选择了 `Green`，第一个示例会返回 \["Green"]，最后一个示例会返回 \["g"]。

<a id="state-selector"></a>

## 状态选择器

状态选择器会显示某个指定实体的状态列表，您可以从中选择一个或多个状态。

![状态选择器截图](/home-assistant/images/blueprints/selector-state.png)

### Configuration variables for `state`

entity\_id:
description: 可从中选择状态的实体 ID。
type: string
required: false
hide\_states:
description: 要从选项列表中排除的状态
type: list
required: false
multiple:
description: >
允许选择多个状态。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false

此选择器的输出是所选状态值，而不是前端中显示的翻译后或美化后的名称；如果 `multiple` 为 true，则返回状态列表。

例如：`heat_cool`。

<a id="statistic-selector"></a>

## 统计选择器

统计选择器用于选择记录了 Long-term statistics 的实体统计 ID。它可能类似于实体 ID（例如 `sensor.temperature`），也可能是外部统计 ID（例如 `external:temperature`）。

![统计选择器截图](/home-assistant/images/blueprints/selector-statistic.png)

### Configuration variables for `statistic`

multiple:
description: >
设为 true 时，选择器返回统计 ID 列表。
type: boolean
default: false
required: false

此选择器的输出是表示统计 ID 的字符串；如果 `multiple` 设为 `true`，则返回统计 ID 列表。

<a id="target-selector"></a>

## 目标选择器

目标选择器比较特殊，它允许用户为动作选择目标实体、设备或区域。输入值将包含一种特殊的 target 格式，该格式可被动作接受。

可选目标可以根据实体或设备属性进行过滤。只有当某个区域中有实体或设备符合这些属性时，该区域才可作为目标进行选择。

![目标选择器截图](/home-assistant/images/blueprints/selector-target.png)

在最基础的形式下，此选择器不需要任何选项，此时用户可以选择系统中任意可用的实体、设备或区域作为目标。

```yaml
target:
```

### Configuration variables for `target`

entity:
description: >
提供 entity 选项时，目标会限制为符合给定条件的实体。可以是单个对象，也可以是对象列表。
type: list
required: false
keys:
integration:
description: >
可设置为某个集成域。会将目标限制为由该集成域提供的实体，例如 [`zha`](/home-assistant/integrations/zha.md)。
type: string
required: false
domain:
description: >
将目标限制为特定[域](/home-assistant/docs/configuration/entities_domains/index.md#domains)中的实体，例如 [`light`](/home-assistant/integrations/light.md) 或 [`binary_sensor`](/home-assistant/integrations/binary_sensor.md)。可以是单个字符串，也可以是字符串列表。
type: \[string, list]
required: false
device\_class:
description: >
将目标限制为具有特定 device class 的实体，例如 `motion` 或 `window`。可以是单个字符串，也可以是字符串列表。
type: \[device\_class, list]
required: false
supported\_features:
description: >
将目标限制为具有特定 supported feature 的实体，例如 `light.LightEntityFeature.TRANSITION` 或 `climate.ClimateEntityFeature.TARGET_TEMPERATURE`。应为功能列表。有关各实体类型支持功能的列表，请参阅[实体文档](https://developers.home-assistant.io/docs/core/entity)。
type: list
required: false

:::important
目标选择器旨在与脚本序列中的动作 `target` 属性一起使用。例如：

```yaml
actions:
  - action: light.turn_on
    target: !input lights
```

:::

### 目标选择器示例 <!-- omit from toc -->

下面这个目标选择器示例只会显示至少提供一个或多个灯实体，且这些实体由 [ZHA](/home-assistant/integrations/zha.md) 集成提供的目标。

```yaml
target:
  entity:
    - integration: zha
      domain: light
```

<a id="template-selector"></a>

## 模板选择器

模板选择器可用于输入 Jinja2 模板。这对于允许更高级的用户输入很有用。

![模板选择器截图](/home-assistant/images/blueprints/selector-template.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
template:
```

此选择器的输出是模板字符串。

<a id="text-selector"></a>

## 文本选择器

文本选择器可用于输入文本字符串。如果 `multiple` 设为 `true`，也可以输入文本字符串列表。例如，它可用于购物清单之类的场景。

![文本选择器截图](/home-assistant/images/blueprints/selector-text.png)

除非将 `multiline` 设为 `true`，否则此选择器的行为与未指定选择器时完全相同，也就是在用户界面中显示单行文本输入框。

```yaml
text:
```

### Configuration variables for `text`

multiline:
description: 设为 true 时，在用户界面中将输入显示为多行文本框。
type: boolean
default: false
required: false
prefix:
description: 显示在文本输入框前面的可选前缀。
type: string
required: false
suffix:
description: 显示在文本输入框后面的可选后缀。
type: string
required: false
type:
description: >
输入类型。该选项会设置[HTML `type` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)，用于控制浏览器如何显示和验证字段。由于某些类型已由其他选择器处理，因此这里只支持其中一部分：`color`、`date`、`datetime-local`、`email`、`month`、`number`、`password`、`search`、`tel`、`text`、`time`、`url`、`week`。
type: string
default: text
required: false
autocomplete:
description: >
指导浏览器应自动填充哪种类型的信息。该选项会设置 [HTML `autocomplete` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)。任何该属性支持的值都有效。
type: string
required: false
multiple:
description: >
允许添加文本字符串列表。设为 `true` 时，此选择器的结果将是列表，而不是单个字符串。
type: boolean
default: false
required: false

此选择器的输出是单个字符串值。

<a id="theme-selector"></a>

## 主题选择器

主题选择器允许您从 Home Assistant 中已安装的可用主题里进行选择。

![主题选择器截图](/home-assistant/images/blueprints/selector-theme.png)

```yaml
theme:
```

### Configuration variables for `theme`

include\_default:
description: 将 Home Assistant 默认主题包含在列表中。
type: boolean
default: false
required: false

此选择器的输出将包含所选主题，例如：`waves_dark`。

<a id="time-selector"></a>

## 时间选择器

时间选择器会显示一个时间输入框，让您指定一天中的某个时间。

![时间选择器截图](/home-assistant/images/blueprints/selector-time.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
time:
```

此选择器的输出是 24 小时制时间，例如 `23:59:59`。

<a id="trigger-selector"></a>

## 触发器选择器

触发器选择器允许您输入一个或多个触发器。在用户界面中，会显示自动化编辑器的触发器部分。输入值将包含一个触发器列表。

![触发器选择器截图](/home-assistant/images/blueprints/selector-trigger.png)

此选择器没有其他选项，因此只包含它的键。

```yaml
trigger:
```

此选择器的输出是一个触发器列表。例如：

```yaml
# 触发器选择器输出示例
- trigger: numeric_state
  entity_id: "sensor.outside_temperature"
  below: 20
```

### 示例 - 与现有触发器合并

如果触发器需要存在于一个已经定义了默认触发器的蓝图中，并且您还希望合并一个额外的可自定义触发器，则需要在蓝图中使用 `- triggers` 语法。

```yaml
# 触发器选择器示例
input:
  my_trigger_input:
    selector:
      trigger:
triggers:
  - triggers: !input my_trigger_input
  - platform: numeric_state
  [...]
```
