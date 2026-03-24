---
title: Input text
description: 关于如何将输入文本集成到 Home Assistant 的说明。
ha_category:
  - Automation
  - Helper
ha_release: 0.53
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_text
ha_integration_type: helper
---

**Input text** 集成允许您定义可通过前端控制的值，并可在自动化条件中使用。文本框中保存值的变更会生成状态事件，这些状态事件同样可用作 `automation` 触发器。它也可以配置为密码模式（隐藏文本）。

配置输入文本的首选方式是通过用户界面：前往 **[Settings > Devices & services > Helpers](https://my.home-assistant.io/redirect/helpers/)**。选择添加按钮，然后选择 **[Text](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_text)** 选项。

要通过用户界面添加 **Helpers**，您的 "`configuration.yaml`" 中应包含 `default_config:`。除非您手动删除，否则默认情况下它已经存在。
如果您已从配置中移除了 `default_config:`，则必须先将 `input_text:` 添加到您的 `configuration.yaml` 中，然后才能使用 UI。

它也可以通过 "`configuration.yaml`" 配置：

```yaml
# configuration.yaml 示例条目
input_text:
  text1:
    name: Text 1
    initial: Some Text
  text2:
    name: Text 2
    min: 8
    max: 40
  text3:
    name: Text 3
    pattern: "[a-fA-F0-9]*"
  text4:
    name: Text 4
    mode: password
```

```yaml
  input_text:
    description: 输入的别名。允许多个条目。
    required: true
    type: map
    keys:
      name:
        description: 文本输入的友好名称。
        required: false
        type: string
      min:
        description: 文本值的最小长度。
        required: false
        type: integer
        default: 0
      max:
        description: 文本值的最大长度。255 是实体状态允许的最大字符数。
        required: false
        type: integer
        default: 100
      initial:
        description: Home Assistant 启动时的初始值。
        required: false
        type: string
      icon:
        description: 在前端输入元素前显示的图标。
        required: false
        type: icon
      pattern:
        description: 用于客户端校验的正则表达式模式。
        required: false
        type: string
        default: 空
      mode:
        description: 可指定为 `text` 或 `password`。`password` 类型元素可让用户安全地输入值。
        required: false
        type: string
        default: text
```

### 操作

此集成提供一个用于修改 `input_text` 状态的操作，以及一个可在不重启 Home Assistant 本体的情况下重新加载 `input_text` 配置的操作。

| Action      | Data                      | Description                                       |
| ----------- | ------------------------- | ------------------------------------------------- |
| `set_value` | `value`<br>`entity_id(s)` | 设置特定 `input_text` 实体的值。                  |
| `reload`    |                           | 重新加载 `input_text` 配置                        |

### 恢复状态

如果您为 `initial` 设置了有效值，此集成启动时会使用该值作为状态。否则，它会恢复 Home Assistant 停止前的状态。

### 场景

要在 [Scene](/home-assistant/integrations/scene/) 中设置 input_text 的状态：

```yaml
# configuration.yaml 示例条目
scene:
  - name: Example1
    entities:
      input_text.example: Hello!
```

## 自动化示例

下面是一个在自动化操作中使用 `input_text` 的示例。


```yaml
# 在自动化操作中使用 `input_text` 的 configuration.yaml 示例条目
input_select:
  scene_bedroom:
    name: Scene
    options:
      - Select
      - Concentrate
      - Energize
      - Reading
      - Relax
      - 'OFF'
    initial: "Select"
input_text:
  bedroom:
    name: Brightness
    
automation:
  - alias: "Bedroom Light - Custom"
    triggers:
      - trigger: state
        entity_id: input_select.scene_bedroom
    actions:
      - action: input_text.set_value
        target:
          entity_id: input_text.bedroom
        data:
          value: "{{ states('input_select.scene_bedroom') }}"
```


