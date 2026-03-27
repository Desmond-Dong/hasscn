---
title: Ness Alarm
description: 'The Ness Alarm integration allows Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home。'

ha_category:
  - Alarm
  - Binary sensor
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@nickw444'
  - '@poshy163'
ha_domain: ness_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
ha_config_flow: true
---
# Ness Alarm

The **Ness Alarm** integration allows Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through an IP232 module that must be connected to the alarm.

Home Assistant 目前支持以下设备类型：

- 二进制传感器：报告区域状态
- 报警控制面板：报告报警状态，并可用于布防/撤防系统

该模块通过 [Ness D8x/D16x ASCII 协议](https://ia802202.us.archive.org/16/items/ness-d-8x-d-16x-serial-interface.-ascii-protocol/Ness%20D8x%20D16x%20Serial%20Interface.%20ASCII%20Protocol.pdf) 进行通信。

## Prerequisites

作为 IP232 模块安装过程的一部分，需要使用正确的设置来配置设备。从 [iComms 手册](https://ness.zendesk.com/hc/en-us/articles/360021989074-iComms-Manual) 中，有 3 个基本步骤：

1. 将 IP232 模块设置为正确的波特率 (9600)。
2. 确保设备在 DHCP 分配的或静态 IP 地址上的连接。
3. 设置报警面板以允许串行控制。在 D8x/D16x 面板上，可通过将“P 199 E”、“1E”至“6E”设置为“ON”（6E 仅在 v6 面板及更高版本上可用）来启用。

如果步骤 1 和 2 中的设置不正确，集成将无法与设备正常通信。如果步骤 3 中的“P 199 E”配置不正确，则事件发生时数据将不会发送到集成。

:::important
Incorrect configuration of these settings will prevent the integration from functioning properly.

:::
## Configuration

To add the **Ness Alarm** integration to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ness_alarm)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=ness_alarm).
- From the list, select **Ness Alarm**.
- Follow the instructions on screen to complete the setup.

</details>

```yaml
Host:
  description: "The hostname or IP address of the IP232 module on your home network."
Port:
  description: "The port on which the IP232 module listens for clients."
Infer arming state:
  description: "Infer the disarmed arming state only via system status events. This works around a bug with some panels (`<v5.8`) which emit `update.status = []` when they are armed."
```

### Managing zones

添加区域可让您监控家中的各个区域，例如门、窗和运动传感器。每个区域在 Home Assistant 中显示为二进制传感器。

After setting up the integration, you can add zones through the UI:

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. Find the **Ness Alarm** integration and select **Configure**.
3. Select **Add zone** to add a new zone.
4. Enter the zone number (1-32) and select the zone type (device class).
5. The zone will appear as a separate device in Home Assistant.

You can reconfigure a zone's device class at any time by selecting the zone's configure button.

## Actions

### Action `aux`

Trigger an aux output.  This requires PCB version 7.8 or higher.

| Data attribute | Optional | Description                                                                                                                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output_id`            | No       | The aux output you wish to change.  A number from 1-8.                                                                                                              |
| `state`                | Yes      | The On/Off State, represented as true/false. Default is true.  If P14xE 8E is enabled then a value of true will pulse output x for the time specified in P14(x+4)E. |

### Action `panic`

Trigger a panic

| Data attribute | Optional | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| `code`                 | No       | The user code to use to trigger the panic. |
