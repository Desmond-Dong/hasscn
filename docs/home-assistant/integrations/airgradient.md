---
title: AirGradient
description: 'AirGradient integration 将从您的 AirGradient 设备(https://www.airgradient.com/)获取数据。 AirGradient 制造室内和室外空气质量监测器，让您了解空气质量是否健康。它们测量 PM2.5、CO2、TVOC 和 NOx 等指标。'
ha_category:
  - Health
  - Sensor
  - Update
ha_config_flow: true
ha_release: 2024.6
ha_iot_class: Local Polling
ha_codeowners:
  - '@airgradienthq'
  - '@joostlek'
ha_domain: airgradient
ha_platforms:
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_zeroconf: true
works_with:
  - local
ha_quality_scale: platinum
---
# AirGradient

**AirGradient** integration 将从您的 [AirGradient 设备](https://www.airgradient.com/)获取数据。
AirGradient 制造室内和室外空气质量监测器，让您了解空气质量是否健康。它们测量 PM2.5、CO2、TVOC 和 NOx 等指标。软件和硬件都是开源的，允许您自定义或扩展设备功能。

## 用例

- 监控室内和室外空气质量。
- 当 CO2 水平过高时提醒开窗。
- 根据空气质量控制通风系统。

## 支持的设备

- [AirGradient 室内空气质量监测器](https://www.airgradient.com/indoor/)
- [AirGradient 室外空气质量监测器](https://www.airgradient.com/outdoor/)

:::important
为了使设备能够被 Home Assistant 设置或发现，[固件](https://www.airgradient.com/documentation/firmwares)版本应至少为 3.1.1。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "您的 AirGradient 设备的 IP 地址或主机名。"
```

## 支持的功能

以下是此集成提供的实体的完整概述。

### 可用传感器

集成将从每个设备获取数据。支持以下传感器：

- 二氧化碳
- 湿度
- 氮指数
- PM0.3 计数
- PM1 密度
- PM2.5 密度
- PM10 密度
- 原始氮值
- 原始总挥发性有机化合物
- 原始 PM2.5
- 信号强度
- 温度
- 总挥发性有机化合物指数

如果您通过 AirGradient 仪表板控制设备而不是设置为本地控制，许多配置实体可作为传感器用于自动化。
- CO2 自动基线校准天数
- NOx 学习偏移
- 总挥发性有机化合物学习偏移
- LED 条使用的数据
- LED 条亮度
- 显示温度单位
- 显示亮度

### 可用配置实体

集成提供一些配置实体来自定义设备体验。
这些设置仅在配置源设置为本地时可用。
支持以下实体：

- 显示温度单位
- 显示亮度
- LED 条亮度
- 请求 CO2 校准
- 请求 LED 条测试
- 切换与 AirGradient 共享指标
- 配置源
- LED 条使用的数据
- 显示 PM 标准
- CO2 自动基线校准天数
- NOx 学习偏移
- 总挥发性有机化合物学习偏移

### 更新

AirGradient 集成提供一个更新实体，用于检查 AirGradient 设备的固件更新。
要安装更新，设备需要重启。

## 数据更新

此集成使用本地polling，这意味着它通过定期与 AirGradient 设备通信来检查所有实体的变化。

集成将每分钟从设备检索一次数据。

设备更新每小时检查一次。

## 动作

此集成不提供额外的动作。此集成可用的所有动作
都由其各自的实体提供。

## 示例

以下示例展示了如何在 Home Assistant 自动化中使用 AirGradient 集成。这些示例只是起点，您可以
以它们为灵感创建自己的自动化。

### 当 CO2 水平过高时通知

以下示例在 CO2 水平超过 1000 ppm 时向您的移动设备发送通知。


```yaml
automation:
  - alias: "CO2 水平过高时通知"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.airgradient_carbon_dioxide
        above: 1000

    actions:
      - action: notify.mobile_app_your_device
        data:
          title: "高 CO2 水平警报"
          message: >
            CO2 水平过高，为 {{ states('sensor.airgradient_carbon_dioxide') }} ppm。
            请考虑通风。
```


## 已知限制

AirGradient 集成目前有以下限制：
- 更新实体无法自动安装更新。安装更新后，您需要手动重启设备。

## 故障排除

如果您遇到 AirGradient 集成问题，请尝试以下常规故障排除步骤：

1. 确保您的 AirGradient 已开机并正确连接到您的家庭网络。
2. 如果集成显示为不可用，请尝试重启您的 AirGradient 和 Home Assistant。

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.