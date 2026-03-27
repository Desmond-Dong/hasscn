---
title: Input boolean
description: 'Input boolean 辅助集成允许您定义可通过用户界面控制的布尔值，并可在自动化的条件中使用。例如，可以通过在条件中使用它们来禁用或启用某些自动化。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Automation
  - Helper
ha_release: 0.11
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: input_boolean
ha_integration_type: helper
---
# Input boolean

**Input boolean** 辅助集成允许您定义可通过用户界面控制的布尔值，并可在自动化的条件中使用。例如，可以通过在条件中使用它们来禁用或启用某些自动化。

## 配置

配置输入布尔辅助工具的首选方式是通过用户界面，在那里它们被称为切换辅助工具。要添加一个，请转到 **[设置 > 设备与服务 > 辅助工具](https://my.home-assistant.io/redirect/helpers/)** 并点击添加按钮；然后选择 **[切换](https://my.home-assistant.io/redirect/config_flow_start/?domain=input_boolean)** 选项。

要通过用户界面添加 **辅助工具**，您的 "`configuration.yaml`" 中应该有 `default_config:`，除非您删除了它，否则默认情况下它应该已经存在。如果您从配置中删除了 `default_config:`，必须先将 `input_boolean:` 添加到您的 "`configuration.yaml`" 中，然后才能使用 UI。

输入布尔值也可以通过 "`configuration.yaml`" 文件配置：

```yaml
  input_boolean:
    description: 输入的别名。允许多个条目。
    required: true
    type: map
    keys:
      name:
        description: 输入的友好名称。
        required: false
        type: string
      initial:
        description: Home Assistant 启动时的初始值。
        required: false
        type: boolean
        default: 如果可用，恢复之前的值
      icon:
        description: 在前端输入元素前显示的图标。
        required: false
        type: icon
```

```yaml
# 示例 configuration.yaml 条目
input_boolean:
  notify_home:
    name: 有人到家时通知
    icon: mdi:car
```

## 动作

此集成提供以下动作来修改 `input_boolean` 的状态，以及一个无需重启 Home Assistant 本身即可重新加载配置的动作。

| 动作     | 数据                           | 描述                                                 |
| ---------- | ------------------------------ | ----------------------------------------------------------- |
| `turn_on`  | `entity_id(s)`<br>`area_id(s)` | 将特定 `input_boolean` 实体的值设置为 `on`  |
| `turn_off` | `entity_id(s)`<br>`area_id(s)` | 将特定 `input_boolean` 实体的值设置为 `off` |
| `toggle`   | `entity_id(s)`<br>`area_id(s)` | 切换特定 `input_boolean` 实体的值       |
| `reload`   |                                | 重新加载 `input_boolean` 配置                        |

### 恢复状态

如果您为 `initial` 设置了一个有效值，此集成将以设置为该值的状态启动。否则，它将恢复 Home Assistant 停止之前的状态；如果没有可恢复的状态 - 则设置 `off` 值。

## 自动化示例

这是一个使用上述 `input_boolean` 的自动化示例。此动作仅在 `input_boolean` 为 on 时发生。

```yaml
automation:
  alias: "到家"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_garage
      to: "on"
  conditions:
    - condition: state
      entity_id: input_boolean.notify_home
      state: "on"
  actions:
    - action: notify.pushbullet
      data:
        title: ""
        message: "亲爱的，我到家了！"
```

您还可以通过在自动化动作中使用 `input_boolean.turn_on`、`input_boolean.turn_off` 或 `input_boolean.toggle` 来设置或更改 `input_boolean` 的状态。

```yaml
action: input_boolean.turn_on
target:
  entity_id: input_boolean.notify_home
```