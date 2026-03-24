---
title: "MQTT Lock"
description: "关于如何将 MQTT 锁集成到 Home Assistant 的说明。"
ha_category:
  - Lock
ha_release: 0.15
ha_iot_class: Configurable
ha_domain: mqtt
---

**MQTT Lock** 集成可让你控制支持 MQTT 的门锁。

## Configuration

理想情况下，MQTT 设备会提供 `state_topic` 来发布状态变化。如果这些消息以 `RETAIN` 标志发布，MQTT 锁在订阅后会立即收到状态更新，并以正确状态启动。否则，锁的初始状态将为 `false` / 未上锁。

当没有 `state_topic` 时，锁会以乐观模式运行。在此模式下，锁会在每次命令后立即改变状态。否则，锁会等待设备返回状态确认（来自 `state_topic` 的消息）。

即使提供了状态主题，也可以强制启用乐观模式。如果锁运行不正确，可以尝试启用它。

门锁必须支持 `lock` 和 `unlock`。门锁也可以选择支持 `open`（例如除了门闩外还要打开锁舌），此时需要在配置中设置 `payload_open`。如果门锁处于乐观模式，处理 `open` 命令时会将状态改为 `unlocked`。

如果电机报告卡住，MQTT 锁还可以上报中间状态 `unlocking`、`locking` 或 `jammed`。

要在你的安装中使用 MQTT 锁，请[将 MQTT 设备作为子条目添加](/home-assistant/integrations/mqtt/#configuration)，或将以下内容添加到你的 `configuration.yaml` 文件。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
mqtt:
  - lock:
      command_topic: "home/frontdoor/set"
```

此外，更高级的方式是通过 [MQTT discovery](/home-assistant/integrations/mqtt/#mqtt-discovery) 进行设置。

```yaml
availability:
  description: 用于订阅可用性（在线/离线）更新的 MQTT 主题列表。不得与 `availability_topic` 同时使用。
  required: false
  type: list
  keys:
    payload_available:
      description: 表示可用状态的有效载荷。
      required: false
      type: string
      default: online
    payload_not_available:
      description: 表示不可用状态的有效载荷。
      required: false
      type: string
      default: offline
    topic:
      description: 用于订阅可用性（在线/离线）更新的 MQTT 主题。
      required: true
      type: string
    value_template:
      description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `topic` 中提取设备可用性。为判断设备是否可用，会将模板结果与 `payload_available` 和 `payload_not_available` 比较。"
      required: false
      type: template
availability_mode:
  description: 配置了 `availability` 时，此项用于控制将实体设为 `available` 所需的条件。可选值为 `all`、`any` 和 `latest`。若设为 `all`，则必须在所有已配置的可用性主题上收到 `payload_available` 后，实体才会标记为在线。若设为 `any`，则只需在至少一个已配置的可用性主题上收到 `payload_available`。若设为 `latest`，则以任一已配置可用性主题最近收到的 `payload_available` 或 `payload_not_available` 为准。
  required: false
  type: string
  default: latest
availability_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `availability_topic` 中提取设备可用性。为判断设备是否可用，会将模板结果与 `payload_available` 和 `payload_not_available` 比较。"
  required: false
  type: template
availability_topic:
  description: 用于订阅可用性（在线/离线）更新的 MQTT 主题。不得与 `availability` 同时使用。
  required: false
  type: string
code_format:
  description: 在对 MQTT 锁执行 `open`、`lock` 或 `unlock` 动作时，用于校验输入代码的正则表达式。
  required: false
  type: string
command_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-command-templates-with-mqtt)，用于生成发送到 `command_topic` 的有效载荷。锁命令模板接受 `value` 和 `code` 两个参数。`value` 参数将包含为 `payload_open`、`payload_lock` 或 `payload_unlock` 配置的值。`code` 参数会在执行 MQTT 锁的 `open`、`lock` 或 `unlock` 动作时设置；如果未传入代码，则为 `None`。
  required: false
  type: template
command_topic:
  description: 用于发布命令以更改门锁状态的 MQTT 主题。
  required: true
  type: string
default_entity_id:
  description: 使用 `default_entity_id` 而不是名称来自动生成实体 ID。例如 `lock.foobar`。在未使用 `unique_id` 的情况下，如果该实体 ID 可用，重启或重新加载时实体 ID 会更新。如果实体 ID 已存在，则会在末尾附加数字后创建。与 `unique_id` 一起使用时，`default_entity_id` 仅在实体首次添加时使用。设置后，如果实体被删除并重新添加，将覆盖用户自定义的实体 ID。
  required: false
  type: string
device:
  description: '此锁所属设备的信息，用于将其关联到[设备注册表](https://developers.home-assistant.io/docs/en/device_registry_index.html)。仅在设置了 [`unique_id`](#unique_id) 时生效。必须提供 identifiers 或 connections 其中之一以标识设备。'
  required: false
  type: map
  keys:
    configuration_url:
      description: '可用于管理此设备配置的网页链接。可以是 `http://`、`https://` 或内部 `homeassistant://` URL。'
      required: false
      type: string
    connections:
      description: '设备与外部世界连接信息的列表，格式为元组列表 `[connection_type, connection_identifier]`。例如网卡的 MAC 地址：`"connections": [["mac", "02:5b:26:a8:dc:12"]]`。'
      required: false
      type: list
    hw_version:
      description: 设备的硬件版本。
      required: false
      type: string
    identifiers:
      description: '可唯一标识设备的 ID 列表。例如序列号。'
      required: false
      type: [string, list]
    manufacturer:
      description: '设备制造商。'
      required: false
      type: string
    model:
      description: '设备型号。'
      required: false
      type: string
    model_id:
      description: 设备的型号标识符。
      required: false
      type: string
    name:
      description: '设备名称。'
      required: false
      type: string
    serial_number:
      description: "设备序列号。"
      required: false
      type: string
    suggested_area:
      description: '如果设备尚未分配区域，建议一个区域。'
      required: false
      type: string
    sw_version:
      description: '设备固件版本。'
      required: false
      type: string
    via_device:
      description: '在此设备与 Home Assistant 之间路由消息的设备标识符。此类设备例如集线器，或子设备的父设备。该信息用于在 Home Assistant 中显示设备拓扑。'
      required: false
      type: string
enabled_by_default:
  description: 定义实体首次添加时是否启用的标志。
  required: false
  type: boolean
  default: true
encoding:
  description: 接收和发布消息的有效载荷编码。设为 `""` 可禁用对传入有效载荷的解码。
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: 实体的[类别](https://developers.home-assistant.io/docs/core/entity#generic-properties)。
  required: false
  type: string
entity_picture:
  description: "实体图片 URL。"
  required: false
  type: string
icon:
  description: "实体的[图标](/home-assistant/docs/configuration/customizing-devices/#icon)。"
  required: false
  type: icon
json_attributes_template:
  description: "定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从 `json_attributes_topic` 收到的消息中提取 JSON 字典。使用示例可参见 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-template-configuration) 文档。"
  required: false
  type: template
json_attributes_topic:
  description: 用于订阅 JSON 字典有效载荷的 MQTT 主题，并将其设置为传感器属性。使用示例可参见 [MQTT sensor](/home-assistant/integrations/sensor.mqtt/#json-attributes-topic-configuration) 文档。
  required: false
  type: string
name:
  description: 门锁名称。如果只需要设备名称，可设为 `null`。
  required: false
  type: string
  default: MQTT Lock
optimistic:
  description: 定义锁是否以乐观模式运行的标志。
  required: false
  type: boolean
  default: "`true` if no `state_topic` defined, else `false`."
payload_available:
  description: 表示可用状态的有效载荷。
  required: false
  type: string
  default: online
payload_lock:
  description: 发送给门锁以执行上锁的有效载荷。
  required: false
  type: string
  default: LOCK
payload_not_available:
  description: 表示不可用状态的有效载荷。
  required: false
  type: string
  default: offline
payload_unlock:
  description: 发送给门锁以执行解锁的有效载荷。
  required: false
  type: string
  default: UNLOCK
payload_open:
  description: 发送给门锁以执行开启的有效载荷。
  required: false
  type: string
payload_reset:
  description: 在 `state_topic` 收到时可将状态重置为 `unknown` 的特殊有效载荷。
  required: false
  type: string
  default: '"None"'
platform:
  description: 必须为 `lock`。仅可用于且必须用于 [MQTT 自动发现设备消息](/home-assistant/integrations/mqtt/#device-discovery-payload)。
  required: true
  type: string
qos:
  description: 接收和发布消息时使用的最大 QoS 级别。
  required: false
  type: integer
  default: 0
retain:
  description: 发布消息是否应启用 retain 标志。
  required: false
  type: boolean
  default: false
state_jammed:
  description: 门锁卡住时发送到 `state_topic` 的有效载荷。
  required: false
  type: string
  default: JAMMED
state_locked:
  description: 门锁已上锁时发送到 `state_topic` 的有效载荷。
  required: false
  type: string
  default: LOCKED
state_locking:
  description: 门锁正在上锁时发送到 `state_topic` 的有效载荷。
  required: false
  type: string
  default: LOCKING
state_topic:
  description: 用于订阅状态更新的 MQTT 主题。可接受由 `state_jammed`、`state_locked`、`state_unlocked`、`state_locking` 或 `state_unlocking` 配置的状态。`"None"` 有效载荷会将状态重置为 `unknown`。空有效载荷会被忽略。
  required: false
  type: string
state_unlocked:
  description: 门锁已解锁时发送到 `state_topic` 的有效载荷。
  required: false
  type: string
  default: UNLOCKED
state_unlocking:
  description: 门锁正在解锁时发送到 `state_topic` 的有效载荷。
  required: false
  type: string
  default: UNLOCKING
unique_id:
  description: 唯一标识此门锁的 ID。如果两个门锁使用相同的唯一 ID，Home Assistant 会抛出异常。与基于设备的发现一起使用时为必填。
  required: false
  type: string
value_template:
  description: 定义一个[模板](/home-assistant/docs/configuration/templating/#using-value-templates-with-mqtt)，用于从有效载荷中提取状态值。
  required: false
  type: template
```

:::important
Make sure that your topics match exactly. `some-topic/` and `some-topic` are different topics.

:::
## Examples

In this section you will find some real-life examples of how to use this lock.

### Full configuration

The example below shows a full configuration for a MQTT lock.


```yaml
# Example configuration.yaml entry
mqtt:
  - lock:
      name: Frontdoor
      state_topic: "home-assistant/frontdoor/state"
      code_format: "^\\d{4}$"
      command_topic: "home-assistant/frontdoor/set"
      command_template: '{ "action": "{{ value }}", "code":"{{ code }}" }'
      payload_lock: "LOCK"
      payload_unlock: "UNLOCK"
      state_locked: "LOCK"
      state_unlocked: "UNLOCK"
      state_locking: "LOCKING"
      state_unlocking: "UNLOCKING"
      state_jammed: "MOTOR_JAMMED"
      state_ok: "MOTOR_OK"
      optimistic: false
      qos: 1
      retain: true
      value_template: "{{ value.x }}"
```


Keep an eye on retaining messages to keep the state as you don't want to unlock your door by accident when you restart something.

For a check you can use the command line tools `mosquitto_pub` shipped with `mosquitto` to send MQTT messages. This allows you to operate your lock manually:

```bash
mosquitto_pub -h 127.0.0.1 -t home-assistant/frontdoor/set -m "LOCK"
```
