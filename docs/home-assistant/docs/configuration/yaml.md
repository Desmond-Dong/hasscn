---
title: YAML 语法
description: 关于 Home Assistant 配置中使用的 YAML 语法的详细说明。
---

Home Assistant 使用 [YAML](https://yaml.org/) 语法进行配置。虽然大多数集成可以通过用户界面进行配置，但有些集成需要您编辑 [`configuration.yaml`](/home-assistant/docs/configuration/) 文件来指定其设置。

## YAML 风格指南

本页面简要介绍了 Home Assistant 中使用的 YAML 语法。如需更详细的说明和更多示例，请参阅 [Home Assistant 开发者 YAML 风格指南](https://developers.home-assistant.io/docs/documenting/yaml-style-guide/)。

## 第一个示例

以下 YAML 示例假设您想要使用 [pushbullet 平台](/home-assistant/integrations/pushbullet) 设置 [notify 集成](/home-assistant/integrations/notify)。

```yaml
notify:
  platform: pushbullet
  api_key: "o.1234abcd"
  name: pushbullet
```

- **集成** 提供某些功能的核心逻辑（例如 `notify` 提供发送通知功能）。
- **平台** 与特定软件或硬件平台建立连接（例如 `pushbullet` 与 pushbullet.com 的服务配合使用）。

YAML 语法的基础是包含键值对的块集合和映射。集合中的每个项目以 `-` 开头，而映射的格式为 `key: value`。这有点类似于哈希表，或者更具体地说是 Python 中的字典。这些也可以嵌套。**请注意，如果您指定了重复的键，将使用该键的最后一个值**。

## YAML 中的缩进

在 YAML 中，缩进对于指定关系非常重要。缩进的行嵌套在比其高一级的行中。在上面的示例中，`platform: pushbullet` 是 `notify` 集成的一个属性（嵌套在其中）。

如果您不使用等宽字体的编辑器，正确的缩进可能会很棘手。不允许使用制表符进行缩进。惯例是每个缩进级别使用 2 个空格。

## 注释

`#` 后面的文本字符串是注释。系统会忽略它们。注释用通俗的语言解释特定代码块应该做什么。为了未来的您或其他查看该文件的人。

### 带注释和嵌套的示例

下一个示例展示了一个 [input_select](/home-assistant/integrations/input_select) 集成，它使用块集合来表示选项值。
其他属性（如 `name:`）使用映射指定。请注意，第二行只有 `threat:`，同一行上没有值。在这里，`threat` 是 input_select 的名称。它的值是嵌套在其下方的所有内容。

```yaml
input_select:
  threat:
    name: "Threat level"
    # A collection is used for options
    options:
      - 0
      - 1
      - 2
      - 3
    initial: 0
```

### 嵌套映射示例

以下示例展示了在映射中嵌套映射集合。在 Home Assistant 中，这将创建两个传感器，它们都使用 MQTT 平台，但其 `state_topic` 的值不同（MQTT 传感器使用的属性之一）。

```yaml
sensor:
  - platform: mqtt
    state_topic: "sensor/topic"
  - platform: mqtt
    state_topic: "sensor2/topic"
```

## 包含值

### 环境变量

在 **Home Assistant Core** 安装中，您可以使用 `!env_var` 包含系统环境变量中的值。
请注意，这仅适用于 **Home Assistant Core** 安装，在可以指定这些变量的情况下。
建议普通 Home Assistant 用户改用 `!include` 语句。

```yaml
example:
  password: !env_var PASSWORD
```

#### 默认值

如果未设置环境变量，您可以回退到默认值。

```yaml
example:
  password: !env_var PASSWORD default_password
```

### 包含整个文件

为了提高可读性，您可以使用 `!include` 语法将某些域从主配置文件中分离出来。

```yaml
light: !include lights.yaml
```

有关此功能的更多信息，请参阅[拆分配置](/home-assistant/docs/configuration/splitting_configuration/)。

## 常见问题

### found character '\t'

如果您看到以下消息：

```text
found character '\t' that cannot start any token
```

这意味着您错误地输入了制表符，而不是空格。

### 大小写

Home Assistant 区分大小写，`'on'` 状态与 `'On'` 或 `'ON'` 不同。同样，`group.Doors` 实体与 `group.doors` 不同。

如果您遇到问题，请在 *开发者工具* 下的 dev-state 菜单中检查 Home Assistant 报告的大小写。

### 布尔值

YAML 将 `Y`、`true`、`Yes`、`ON` 都视为 `true`，将 `n`、`FALSE`、`No`、`off` 视为 `false`。这意味着如果您想将实体的状态设置为 `on`，您*必须*用引号将其引用为 `'on'`，否则它将被转换为将状态设置为 true。这同样适用于 `off`。

不引用值可能会产生如下错误：

```text
not a valid value for dictionary value @ data
```

## 验证 YAML 语法

由于所有这些缩进和规则，很容易犯错。检查 YAML 语法是否正确（验证）的最佳方法取决于您使用的编辑器。我们无法在此列出所有方法。

- 如果您直接在 Home Assistant 中编辑文件，请参阅：[验证配置](/home-assistant/docs/configuration/#validating-the-configuration)