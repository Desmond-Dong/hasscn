---
title: Lutron Homeworks
description: 关于如何在 Home Assistant 中使用 Lutron Homeworks Series 4 & 8 的说明。
ha_category:
  - Binary sensor
  - Button
  - Hub
  - Light
ha_release: 0.85
ha_iot_class: Local Push
ha_domain: homeworks
ha_platforms:
  - binary_sensor
  - button
  - light
ha_integration_type: hub
ha_config_flow: true
---

[Lutron](https://www.lutron.com/) 是一家美国照明控制公司。Lutron Homeworks Series 4 和 8 系统相对较旧（约 2003 年），并使用 RS-232 与家庭自动化系统通信。Home Assistant 中的 `homeworks` 集成负责与这些系统的主控制器通信，通信通过以太网转串口转换器（例如 NPort）进行。

目前仅支持 Homeworks 系统的一部分功能，即灯光和键盘。

Lutron 多年来推出了许多系统，每种系统都有其独特的接口协议。Homeworks 系统有三种：QS、Series 4 和 8，以及 original。此平台仅适用于 Series 4 和 8。另有 [lutron](/home-assistant/integrations/lutron/) 集成用于处理 Lutron RadioRA 2 系统。

Homeworks 键盘按钮是瞬时开关。按钮按下后即释放，因此没有持续的“状态”。按钮会产生 `homeworks_button_press` 和 `homeworks_button_release` 事件。这些事件包含被按下按钮的 "id"、"name" 和 "button"。"id" 从 "name" 派生，"button" 是键盘上的按钮编号（从 1 开始）。您还可以添加二元传感器实体来表示键盘 LED 是否点亮，并添加按钮实体来触发绑定到某个键盘按钮的动作。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

用于从控制器自动提取设备信息的协议没有公开文档。因此灯光和键盘需要手动添加，这可以在添加集成后通过配置完成。

## Actions

### Action: Send command

`homeworks.send_command` 动作用于向 Lutron Homeworks 控制器发送自定义命令。

| Data attribute | Optional | Example                 | Description                                         |
| ---------------------- | -------- | ----------------------- | --------------------------------------------------- |
| `controller_id`        | No       | `homeworks`             | 要将命令发送到的控制器。 |
| `command`              | No       | `KBP, [02:08:02:01], 1` | 要发送的命令。可以是单条命令，也可以是命令列表。除[控制器支持的命令](https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf)外，还支持特殊命令 `DELAY <ms>`，其中 ms 为等待的毫秒数。 |

#### Sending a list of commands 

以下示例展示了如何先发送 `KBP`，等待 0.5 秒，再发送 `KBR`，以模拟持续半秒的键盘按键动作。

```yaml
action: homeworks.send_command
data:
  controller_id: "homeworks"
  command:
    - "KBP, [02:08:02:01], 1"
    - "DELAY 500"
    - "KBR, [02:08:02:01], 1"
```
