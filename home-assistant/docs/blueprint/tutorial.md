# 创建自动化蓝图

:::tip
虽然本教程仅展示如何创建自动化蓝图，但脚本也以同样的方式支持蓝图。
:::

## 创建自动化蓝图

在本教程中，我们将创建一个基于运动传感器控制灯光的自动化蓝图。我们将通过提取现有的自动化并将其转换为蓝图来实现。

### 前提条件

* 本教程假设您了解以下主题：
  * [编辑配置文件](/home-assistant/docs/configuration/index.md)
* [YAML](/home-assistant/docs/configuration/yaml/index.md)，特别是[自动化中使用的 YAML](/home-assistant/docs/automation/yaml/index.md)
  * [脚本](/home-assistant/docs/scripts/index.md)

### 创建自动化

要创建蓝图，我们首先需要一个可正常工作的自动化。
在本教程中，我们使用一个简单的自动化。转换复杂自动化的过程并无不同。

我们将在本教程中使用的自动化基于运动传感器控制灯光：

```yaml
triggers:
  - trigger: state
    entity_id: binary_sensor.motion_kitchen

actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target:
      entity_id: light.kitchen
```

`trigger` 对象可使用的选项列在[自动化触发器变量](/home-assistant/docs/automation/templating/index.md#available-trigger-data)下。
在此示例中，使用了[状态触发器](/home-assistant/docs/automation/templating/index.md#state)。
`turn_on` 和 `turn_off` 是 [`homeassistant` 动作](/home-assistant/docs/scripts/perform-actions/index.md#homeassistant-actions)。它们不绑定到特定域。您可以在灯光、开关和其他域上使用它们。

### 创建蓝图文件

自动化蓝图是 YAML 文件（扩展名为 `.yaml`），存放在 `<config>/blueprints/automation/` 文件夹中。您可以在此文件夹中创建任意数量的子目录。

为了开始使用我们的蓝图，我们将复制上述自动化 YAML 并以名称 `motion_light_tutorial.yaml` 保存在该目录中。

#### 添加基本蓝图元数据

Home Assistant 需要了解蓝图的信息。这通过添加 `blueprint:` 部分来实现。它应包含其所属集成的 `domain`（`automation`）和 `name`（蓝图的名称）。您还可以选择为蓝图添加 `description`（描述）。

将此添加到文件顶部：

```yaml
blueprint:
  name: 运动灯光教程
  description: 根据检测到的运动来打开灯光
  domain: automation
```

#### 将可配置部分定义为输入

现在我们必须决定要使哪些步骤可配置。我们希望使其尽可能可重用，同时不失去其基于运动传感器控制灯光的初衷。

蓝图中可配置的部分称为[输入](/home-assistant/docs/blueprint/schema/index.md#blueprint-inputs)。为了使运动传感器实体可配置，我们将实体 ID 替换为自定义 YAML 标签 `!input`。此 YAML 标签必须与输入名称结合使用：

```yaml
triggers:
  - trigger: state
    entity_id: !input motion_sensor
```

对于灯光，我们可以提供更多的灵活性。我们希望允许用户能够定义任何设备或区域作为目标。动作中的 `target` 属性可以包含对区域、设备和/或实体的引用，这就是我们将使用的内容。

输入不限于字符串。它们也可以包含复杂对象。因此，在这种情况下，我们将整个 `target` 标记为输入：

```yaml
actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target: !input target_light
```

#### 将输入添加到元数据

所有标记为输入的部分都需要添加到元数据中。至少我们要添加它们在自动化中使用的名称：

```yaml
blueprint:
  name: 运动灯光教程
  description: 根据检测到的运动来打开灯光
  domain: automation
  input:
    motion_sensor:
    target_light:
```

有关蓝图输入的更多信息，请参阅[蓝图模式文档](/home-assistant/docs/blueprint/schema/index.md#input)

## 通过 `configuration.yaml` 使用您的蓝图

添加了最基本的元数据后，您的蓝图就可以使用了。

打开您的 **`configuration.yaml`** 并添加以下内容：

```yaml
automation tutorial:
  use_blueprint:
    path: motion_light_tutorial.yaml
    input:
      motion_sensor: binary_sensor.kitchen
      target_light:
        entity_id: light.kitchen
```

重载自动化，您的新自动化应该会出现。由于我们配置的值与原始自动化完全相同，它们应该以完全相同的方式工作。

## 改进输入

如果容易看出每个字段的用途，蓝图就更容易使用。

### 为输入添加用户友好的名称

我们可以通过为输入添加名称和描述来改善这种体验：

```yaml
blueprint:
  name: 运动灯光教程
  description: 根据检测到的运动来打开灯光
  domain: automation
  input:
    motion_sensor:
      name: 运动传感器
      description: 此传感器将与灯光保持同步。
    target_light:
      name: 灯光
      description: 需要保持同步的灯光。
```

### 描述输入

我们的蓝图目前没有描述输入应包含什么内容。没有这些信息，Home Assistant 将为用户提供一个空文本框。

为了让 Home Assistant 能够提供更多帮助，我们将使用[选择器](/home-assistant/docs/blueprint/selectors/index.md)。选择器描述了一种类型，可用于帮助用户选择匹配的值。

运动传感器实体的选择器应该描述我们需要来自二元传感器域且具有设备类 `motion` 的实体。

目标灯光的选择器应该描述我们要以灯光实体为目标。

```yaml
blueprint:
  name: 运动灯光教程
  domain: automation
  input:
    motion_sensor:
      name: 运动传感器
      description: 此传感器将与灯光保持同步。
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: motion
    target_light:
      name: 灯光
      description: 需要保持同步的灯光。
      selector:
        target:
          entity:
            - domain: light
```

通过将蓝图限制为仅处理灯光和运动传感器，我们获得了几个好处：界面将能够把建议值限制为灯光和运动传感器，而不是所有设备。它还允许用户选择一个区域来控制其中的灯光。

## 最终蓝图

在我们添加了所有步骤后，我们的蓝图将如下所示：

```yaml
blueprint:
  name: 运动灯光教程
  description: 根据检测到的运动来打开灯光
  domain: automation
  input:
    motion_sensor:
      name: 运动传感器
      description: 此传感器将与灯光保持同步。
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: motion
    target_light:
      name: 灯光
      description: 需要保持同步的灯光。
      selector:
        target:
          entity:
            - domain: light

triggers:
  - trigger: state
    entity_id: !input motion_sensor

actions:
  - action: >
      {% if trigger.to_state.state == "on" %}
        light.turn_on
      {% else %}
        light.turn_off
      {% endif %}
    target: !input target_light
```

## 通过界面使用蓝图

1. 要通过界面配置您的蓝图，请前往[**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprints/)。
2. 找到 **运动灯光教程** 蓝图并选择 **创建自动化**。

:::important
不要忘记在更改蓝图后重载自动化，以便界面和自动化集成获取最新的蓝图更改。
:::

![蓝图界面截图](/home-assistant/images/blueprints/tutorial-ui.png)

## 视频教程

此视频教程解释了如何创建一个在光照值低于特定阈值时根据运动切换灯光的蓝图。

<lite-youtube videoid="ZxxxZ9Vci3I" videotitle="Home Assistant 蓝图教程" posterquality="maxresdefault"></lite-youtube>

## 分享蓝图

最后一步是与其他人分享此蓝图。在本教程中，我们将在 GitHub Gists 上分享它。

### 非正式分享

在本教程中，我们将在 GitHub Gists 上分享它。如果您不想将蓝图发布给更多受众，这是一个不错的选择。

1. 前往 [GitHub Gists](https://gist.github.com/)
   * **Gist 描述**：蓝图教程
   * **包含扩展名的文件名**：`motion_light_tutorial.yaml`
   * **内容** 为蓝图文件的内容。
2. 选择 **创建 Gist**。
3. 要与其他人分享您的蓝图，请复制您新 Gist 的 URL。他们可以通过前往[**设置** > **自动化与场景** > **蓝图**](https://my.home-assistant.io/redirect/blueprint_import/)并选择 **导入蓝图** 来导入它。
4. 庆祝一下！为您欢呼。您创建了第一个蓝图并帮助了社区中的某个人。

### 在蓝图交流区分享

如果您遵循[发布规则和格式](/home-assistant/get-blueprints)，您可以在 Home Assistant 蓝图交流论坛上分享您的蓝图。此选项面向广大 Home Assistant 社区开放，但仅建议用于您的原创蓝图。请不要将本教程发布到蓝图交流区，而是把它作为将来发布您真正蓝图时的一个选项。
