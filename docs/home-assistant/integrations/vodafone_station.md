---
title: Vodafone Station
description: 关于如何将 Vodafone Station 路由器集成到 Home Assistant 的说明。
ha_category:
  - Button
  - Image
  - Presence detection
  - Sensor
  - Switch
ha_release: 2023.9
ha_domain: vodafone_station
ha_config_flow: true
ha_codeowners:
  - '@paoloantinori'
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: platinum
---

**Vodafone Station** 集成允许您控制基于 [Vodafone Station](https://www.vodafone.it/privati/area-supporto/assistenza-dispositivi/vodafone-station.html) 的路由器。

此集成会提供互联网连接状态以及已连接设备的信息。

## 支持的设备

此集成支持以下品牌的型号：Sercomm、Technicolor、UltraHub。

### 已测试型号

此集成已针对以下型号进行测试：

Sercomm:

- Vodafone Power Station (SHG3000)
- Vodafone Power Station WiFi 6 (SHG3060)
- Vodafone WiFi 6 Station (RHG3006)
- Vodafone Gigabox (SHG3000) - supplied by [Vodafone Ireland](https://deviceguides.vodafone.ie/vodafone/gigabox-windows-10/)
- Vodafone H300S

Technicolor:

- Vodafone Power Station (THG3000)
- Vodafone WiFi 6 Station (CGA6444VF)

UltraHub:

- Vodafone Ultra Hub 7 Fibre - FG4278VF


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
  host:
    description: Vodafone Station 路由器的 IP 地址。
  username:
    description: Vodafone Station 路由器的用户名。
  password:
    description: Vodafone Station 路由器的密码。
```

## Options

To define options for Vodafone Station, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Vodafone Station are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
  consider home:
    description: 将已断开连接的设备视为“不在家”前需要经过的秒数。
```

## 支持的功能

Home Assistant 支持以下平台类型：

- **Button** - 重启路由器，以及重连 DSL/光纤/互联网关键连接。
- **Device tracker** - 通过检查已连接设备进行在家检测。
- **Image** - 生成访客 Wi-Fi 的二维码。
- **Sensor** - 提供外部 IP 地址、运行时间、固件、资源占用和网络监测信息。
- **Switch** - 启用或禁用主 Wi-Fi 和访客 Wi-Fi。

## 示例

### 自动化：每晚重连 / 获取新 IP

```yaml
automation:
- alias: "Reconnect Vodafone Station (Fiber)"
  triggers:
    - trigger: time
      at: "05:00:00"
  actions:
    - action: button.press
      target:
        entity_id: button.vodafone_station_xxxx_reconnect_fiber
```

### 自动化：设备离线时发送通知

```yaml
automation:
- alias: "Apple TV disconnect"
  triggers:
    - platform: state
      entity_id: device_tracker.appletv
      to: "not_home"
  actions:
    -  action: notify.mobile_app_phone
       data:
         message: "TV lost network connection"
```

### 自动化：路由器 CPU 使用率过高时发送通知

```yaml
automation:
- alias: "Vodafone Station CPU high cpu usage"
  triggers:
    - platform: numeric_state
      entity_id: sensor.vodafone_station_xxxx_cpu_usage
      above: 80
  actions:
    - action: notify.mobile_app_phone
       data:
         message: "Router CPU above 80%."
```

## 数据更新

默认情况下，此集成每 30 秒从设备 polls 一次数据。

## 其他信息

### Device tracker

**注意**：如果您不想自动跟踪新发现的设备，请禁用该集成的系统选项 `Enable new added entities`。

## 故障排除

### 无法设置设备

#### 症状：“User already logged-in”

尝试设置集成时，表单会显示 “User already logged-in”。

##### 说明

这表示当前已经存在一个已登录的 Vodafone Station 路由器会话。

##### 解决方法

要解决此问题，请退出所有活动会话；如果会话是异常关闭的，请等待路由器会话超时（通常为 60 秒）。

## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
