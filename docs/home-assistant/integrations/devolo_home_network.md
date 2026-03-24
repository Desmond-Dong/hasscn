---
title: devolo Home Network
description: 关于如何将 devolo Home Network 设备与 Home Assistant 集成的说明。
ha_category:
  - Binary sensor
  - Button
  - Image
  - Presence detection
  - Sensor
  - Switch
  - Update
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_network
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: silver
---

**devolo Home Network** 集成允许您监控和控制您的 [devolo](https://www.devolo.global) PLC 网络。根据您添加到 Home Assistant 的设备，可能有不同的用例。大致上，您可以将设备分为 Wi-Fi 和非 Wi-Fi 设备。非 Wi-Fi 设备在监控 PLC 网络方面或多或少有限。但是，Wi-Fi 设备可以帮助进行存在检测和访客 Wi-Fi 的远程控制。有关详细信息，请继续阅读[实体](#entities)并查看[支持的设备](#supported-devolo-devices)。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP address:
  description: "您的 devolo Home Network 设备的 IP 地址。可以在设备仪表板上的 devolo Home Network App 中找到。"
```

## 实体

目前，Home Assistant 中支持以下实体。

### 二值传感器

- 设备连接到路由器
  - 每 5 分钟更新
  - 默认禁用，因为它通常很少更改

### 按钮

- 通过让 PLC 设备的 LED 闪烁 2 分钟来识别它
- 在 PLC 设备上开始配对
- 重启设备
- 启动 WPS

### 图像

- 您的访客 Wi-Fi 凭据的二维码
  - 如果检测到更改，每 15 秒更新
  - 默认启用

### 存在检测

- 检测连接到主 Wi-Fi 或访客 Wi-Fi 的设备的存在
  - 每 15 秒更新
  - 自动添加新设备为禁用实体，除非通过系统选项禁用

### 传感器

- 连接的 Wi-Fi 客户端数量
  - 每 15 秒更新
  - 默认启用
- 邻居 Wi-Fi 网络数量
  - 每 5 分钟更新
  - 默认禁用，因为运行时间较长
- 同一 PLC 网络中的 PLC 设备数量
  - 每 5 分钟更新
  - 默认禁用，因为它通常很少更改
- PLC PHY 速率
  - 每 5 分钟更新
  - 连接到路由器的设备的 PHY 速率默认启用。所有其他设备之间的 PHY 速率默认禁用。
- 设备上次重启
  - 每 15 秒更新
  - 默认禁用，因为对大多数用户来说兴趣较低。

### 开关

- 开启/关闭访客 Wi-Fi
  - 默认启用
- 开启/关闭设备 LED
  - 默认启用

### 更新

- 更新设备的固件。
  - 默认启用，但只有在设备上启用定期检查时才会给出结果。

## 支持的 devolo 设备

支持的 devolo 设备列表取决于设备固件和设备功能。以下设备在运行固件 5.6.0 时进行了测试：

- Magic 2 WiFi 6 next
- Magic 2 WiFi 6
- Magic 2 WiFi next
- Magic 2 WiFi 2-1
- Magic 1 WiFi mini
- Magic 1 WiFi 2-1
- WiFi 6 Repeater 5400
- WiFi 6 Repeater 3000
- WiFi Repeater+ ac
- dLAN 1200+ WiFi ac
- dLAN 550+ Wifi
- dLAN 550 WiFi

自固件 7.10 起，只要支持相应的实体，以下没有 Wi-Fi 的设备也可以使用：

- Magic 2 LAN triple
- Magic 2 DinRail
- Magic 2 LAN 1-1
- Magic 1 LAN 1-1
- Gigabridge

## 已知限制

此集成仅支持使用 devolo Home Network App 使用的 API。设备网站通常提供额外功能。但是，这些功能无法通过 API 使用，因此在 devolo 将其添加到 API 之前无法支持。

## 故障排除

### Gigabridge

devolo Gigabridge 是唯一带有默认密码的设备。但是，似乎在出厂默认状态下，密码适用于设备网站但不适用于 API。如果您通过网站给设备设置新密码，它将同时应用于两者，集成开始工作。即使再次使用相同的密码也有效。

## 自动化示例

### 配对丢失时重启 PLC 设备

PLC 网络有时不稳定。要恢复网络状态，如果 PLC 设备数量低于预期，有时重新启动连接到路由器的 PLC 设备是个好主意。如果您应用此自动化，请记住设备可能处于待机状态。在此示例中，预期设备数量为 3。


```yaml
alias: "PLC Feeder Restart"
description: "如果 PLC 设备数量意外低，则重启连接到路由器的设备"
triggers:
  - trigger: numeric_state
    entity_id:
      - sensor.devolo_001_connected_plc_devices  # 替换为您设备的传感器
    for:
      hours: 0
      minutes: 10
      seconds: 0
    below: 3
actions:
  - action: button.press
    target:
      entity_id: button.devolo_001_restart_device  # 替换为您设备的按钮
```


### 数据速率下降时通知

电线上的噪声会显著干扰 PLC 数据速率。接近下降时的通知可以帮助识别导致下降的操作。以下示例以 25% 为阈值。


```yaml
alias: "PLC data rate"
description: "PLC 数据速率下降超过 25%"
triggers:
  - entity_id:
      - sensor.devolo_001_plc_downlink_phy_rate_devolo_002  # 替换为您设备的传感器
      - sensor.devolo_001_plc_uplink_phy_rate_devolo_002
    trigger: state
conditions:
  - condition: template
    value_template: >-
      # 检查新值是否小于前一个值的 75%
      {{ (trigger.to_state.state|float / trigger.from_state.state|float) < 0.75 }}
actions:
  - action: notify.mobile_app_pixel_4a
    data:
      message: >-
        {{ trigger.to_state.name }} 的 PLC 数据速率下降到 {{
        trigger.to_state.state }}
        {{trigger.to_state.attributes.unit_of_measurement}}
      title: PLC 数据速率下降
```


### 基于时间启用访客 Wi-Fi

您可能只想在白天开放访客 Wi-Fi，而在晚上关闭它。


```yaml
alias: "Toggle guest Wi-Fi"
description: "开启和关闭访客 Wi-Fi"
triggers:
  - trigger: time
    at: 
    - "08:00:00"
    - "17:00:00"
actions:
  - action: switch.toggle
    target:
      entity_id: switch.devolo_001_enable_guest_wifi  # 替换为您设备的开关
```


## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.