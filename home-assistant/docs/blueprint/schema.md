# 关于蓝图架构

## 蓝图架构

蓝图架构目前根据其域支持三种类型的架构：[`automation`](/home-assistant/docs/automation/yaml/index.md)；`script`；以及 [`template`](/home-assistant/integrations/template/index.md#using-blueprints)。

蓝图的配置架构由两部分组成：

1. 蓝图的高级元数据：名称、域以及（可选的）用户需要提供的任何输入。
2. 蓝图所描述的域的架构。

第一部分称为*蓝图架构*。它包含蓝图的元数据。

蓝图所需的最低元数据是其名称和域。在其最基本的形式中，蓝图如下所示：

```yaml
blueprint:
  name: 示例蓝图
  domain: automation
```

虽然这是一个有效的蓝图，但它并不是很有用。

第二部分取决于其域，即蓝图的类型。例如，当为自动化创建蓝图时，[automation](/home-assistant/docs/automation/yaml/index.md)的完整架构适用。

以下是完整的蓝图架构：

name:
description: 蓝图的名称。保持简短且具有描述性。
type: string
required: true
description:
description: >
蓝图的描述。虽然是可选的，但强烈推荐填写此字段。描述蓝图的功能以及蓝图所需的输入。描述可以包含 [Markdown](https://commonmark.org/help/)。
type: string
required: false
domain:
description: >
此蓝图使用的域。目前仅支持三种类型：
[`automation`](/home-assistant/docs/automation/yaml/index.md)、`script` 和 [`template`](/home-assistant/integrations/template/index.md#using-blueprints)。
type: string
required: true
author:
description: 蓝图作者的名称。
type: string
required: false
homeassistant:
description: >
蓝图成功运行所需的 Home Assistant 版本。
type: map
required: false
keys:
min\_version:
description: >
使用蓝图所需的最低 Home Assistant 版本，格式为 *major*.*minor*.*patch*（所有部分都是必需的）。例如，`2022.4.0`。如果蓝图使用了近期版本引入的功能，设置此值非常重要，以避免出现问题。
type: string
required: false
input:
description: >
定义的用户输入或分段的字典。这些是蓝图的消费者可以通过 YAML 定义或通过 UI 中的配置表单提供的输入字段。分段提供了一种在视觉上将一组相关输入分组的方法（见下文）。
type: map
required: false

### 蓝图输入

蓝图可以从用户那里接受一个或多个输入，但不要求任何输入。

这些输入可以是任何类型（字符串、布尔值、列表、映射）。它们可以有默认值，并提供一个[选择器](/home-assistant/docs/blueprint/selectors/index.md)，以确保在用户界面中显示匹配的输入字段。

蓝图输入具有以下配置：

name:
description: 输入字段的名称。
type: string
required: false
description:
description: >
输入字段的简短描述。保持简短且具有描述性。描述可以包含 [Markdown](https://commonmark.org/help/)。
type: string
required: false
selector:
description: >
用于此输入的[选择器](/home-assistant/docs/blueprint/selectors/index.md)。选择器定义了输入在前端 UI 中的显示方式。
type: selector
required: false
default:
description: >
此输入的默认值，以防蓝图用户未提供输入。
type: any
required: false

每个输入字段都可以在蓝图元数据之外使用 `!input` 自定义 YAML 标签加上其名称来引用。

以下示例展示了一个带有单个输入的最简*蓝图架构*：

```yaml
blueprint:
  name: 示例蓝图
  description: 展示输入项的示例
  domain: automation
  input:
    my_input:
      name: 示例输入
```

在上面的示例中，`my_input` 是输入的标识符。可以使用 `!input my_input` 自定义标签来引用它。

在此示例中，没有提供 [`selector`](/home-assistant/docs/blueprint/selectors/index.md)。在用户界面中，将向用户显示一个文本输入字段。然后由用户自行决定在该处输入什么内容。带有[选择器](/home-assistant/docs/blueprint/selectors/index.md)的蓝图更易于使用。

蓝图可以有任意数量的输入。

### 蓝图输入分段

可以在主 `input` 键下添加一个或多个输入分段。每个分段在视觉上对该分段中的输入进行分组，允许添加可选描述，并可选择性地折叠这些输入。请注意，分段仅影响用户填写蓝图时输入的显示方式。输入必须具有唯一的名称，并直接通过其名称引用；而不是通过分段和名称引用。

分段与输入的区别在于该分段中是否存在额外的 `input` 键。

输入分段是 2024.6.0 版本的新功能。如果使用输入分段，请将蓝图的 `min_version` 设置为至少此版本。否则，蓝图将在旧版本上产生错误。有关更多详细信息，请参阅[此部分](/home-assistant/docs/blueprint/schema/index.md#min_version)。

输入分段的完整配置如下：

name:
description: 分段的名称。如果省略，则使用分段的键名。
type: string
required: false
icon:
description: 显示在分段名称旁边的图标。
type: string
required: false
description:
description: >
此分段的可选描述，将显示在分段的顶部。描述可以包含 [Markdown](https://commonmark.org/help/)。
type: string
required: false
collapsed:
description: 如果为 `true`，则分段默认折叠。适用于可选或不太重要的输入。所有折叠的输入在被隐藏之前也必须定义 `default`。
type: boolean
default: false
required: false
input:
description: >
此分段内定义的用户输入字典。
type: map
required: true

以下示例展示了一个带有分段中某些输入的*蓝图架构*：

```yaml
blueprint:
  name: 示例分段蓝图
  description: 展示分段的示例
  input:
    base_input:
      name: 不在分段中的输入
    my_section:
      name: 我的分段
      icon: mdi:cog
      description: 这些选项用于控制此蓝图的特定功能
      input:
        my_input:
          name: 示例输入
        my_input_2:
          name: 第二个示例输入
```

### 模板中的蓝图输入

输入作为自定义 YAML 标签可用，但不能作为模板变量使用。要在模板中使用蓝图输入，首先需要将其公开为[脚本级变量](/home-assistant/integrations/script/index.md#configuration-variables)或在[变量脚本步骤](/home-assistant/docs/scripts/index.md#variables)中。

```yaml
variables:
  # 将输入 my_input 作为脚本级变量可用
  my_input: !input my_input
```

### 蓝图示例

[内置蓝图][blueprint-built-in]是了解蓝图如何工作的绝佳示例。

以下是内置的移动感应灯光自动化蓝图。注意 blueprint 键下的*蓝图架构*后面跟着其域架构。在此示例中，是自动化架构。

```yaml
blueprint:
  name: 运动触发灯光
  description: 检测到运动时打开灯光。
  domain: automation
  input:
    motion_entity:
      name: 运动传感器
      selector:
        entity:
          filter:
            device_class: motion
            domain: binary_sensor
    light_target:
      name: 灯光
      selector:
        target:
          entity:
            domain: light
    no_motion_wait:
      name: 等待时间
      description: 在最后一次检测到运动后，灯光保持开启的时长。
      default: 120
      selector:
        number:
          min: 0
          max: 3600
          unit_of_measurement: seconds

# 如果在延迟期间检测到运动，
# 我们将重新启动脚本。
mode: restart
max_exceeded: silent

triggers:
  - trigger: state
    entity_id: !input motion_entity
    from: "off"
    to: "on"

actions:
  - action: light.turn_on
    target: !input light_target
  - wait_for_trigger:
      - trigger: state
        entity_id: !input motion_entity
        from: "on"
        to: "off"
  - delay: !input no_motion_wait
  - action: light.turn_off
    target: !input light_target
```

[blueprint-built-in]: https://github.com/home-assistant/core/tree/dev/homeassistant/components/automation/blueprints
