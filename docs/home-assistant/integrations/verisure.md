---
title: Verisure
description: 关于如何将 Verisure 集成到 Home Assistant 的说明。
ha_category:
  - Alarm
  - Binary sensor
  - Camera
  - Hub
  - Lock
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: verisure
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - diagnostics
  - lock
  - sensor
  - switch
ha_config_flow: true
ha_dhcp: true
ha_integration_type: hub
---

Home Assistant 支持接入您的 [Verisure](https://www.verisure.com/) 设备。

Home Assistant 目前支持以下设备类型：

- Alarm
- Camera
- Switch (Smartplug)
- Sensor (Thermometers and Hygrometers)
- Lock
- Binary sensor (Door & Window)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for Verisure, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Verisure are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

## 报警控制面板

Verisure 报警控制面板平台允许您控制 [Verisure](https://www.verisure.com/) 报警系统。

前提是您已经按照上面的说明先设置好 Verisure 集线器。

`changed_by` 属性可让您在[自动化](/home-assistant/getting-started/automation/)中根据是谁布防或撤防了报警系统来执行不同操作。


```yaml
automation:
  - alias: "Alarm status changed"
    triggers:
      - trigger: state
        entity_id: alarm_control_panel.alarm_1
    actions:
      - action: notify.notify
        data:
          message: >
            Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}
```


## 操作

| Service | Description |
| ------- | ----------- |
| disable_autolock | Disables autolock function for a specific lock. |
| enable_autolock | Enables autolock function for a specific lock. |
| smartcam_capture | Capture a new image from a specific smartcam. |

## 二进制传感器

- Ethernet status

## 锁

| method state attribute | Description |
| ------- | ----------- |
| thumb | Lock was locked/unlocked by interior thumb switch |
| star | Lock was locked by exterior star button |
| code | Lock was unlocked by exterior code |
| auto | Lock was locked/unlocked automatically by Verisure rule |
| remote | Lock was locked/unlocked automatically by Verisure App |

## 限制与已知问题

部分用户反馈此集成目前无法在以下国家正常工作：

- France
- Ireland
- Italy
- Spain
- Sweden

## 故障排除

如果您收到类似 *"The code for lock.XXX doesn't match pattern `^\d{0}$`."* 的错误消息，请确认您的代码位数与[配置选项](#options)中定义的位数一致。
