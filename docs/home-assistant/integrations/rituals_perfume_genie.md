---
title: Rituals Perfume Genie
description: 'Rituals Perfume Genie(https://www.rituals.com/perfume-genie-b2b.html) 集成允许您控制并监控已连接到 Rituals 账户的香氛扩散器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2021.3
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
ha_codeowners:
  - '@milanmeu'
  - '@frenck'
  - '@quebulm'
ha_domain: rituals_perfume_genie
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
---
# Rituals Perfume Genie

[Rituals Perfume Genie](https://www.rituals.com/perfume-genie-b2b.html) 集成允许您控制并监控已连接到 Rituals 账户的香氛扩散器。

## 使用场景

- 监控当前设备状态。
- 控制香氛扩散开关和扩散强度。
- 提供香氛盒余量、类型和房间配置等信息。

## 支持的设备

- Rituals Perfume Genie
- Rituals Perfume Genie 2nd Generation
- Rituals Perfume Genie 3rd Generation


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
  description: "用于注册 Rituals Perfume Genie 的电子邮箱地址。"
Password:
  description: "用于注册 Rituals Perfume Genie 的密码。"
```

## 支持的功能

该集成会从每台设备获取数据。
下面是此集成提供的实体总览。

:::important
某些实体仅在电池供电型号上可用。

:::
### 二进制传感器

- Charging state

### 数值实体

- Perfume amount

### 选择实体

- Room size

### 传感器

- Battery percentage
- Fill level
- Perfume label
- WiFi signal

### 开关

- Fan

## 示例

以下示例展示了如何在 Home Assistant 自动化中使用 Rituals Perfume Genie 集成。
这些示例只是起点，您可以据此创建自己的自动化。

### 在指定时间打开 Perfume Genie

以下示例会在 18:00 打开 Perfume Genie。


```yaml
automation:
  - alias: "Start fragrance in evening"
    triggers:
      - trigger: time
        at: "18:00:00"

    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.rituals_perfume_genie_diffuser
```


## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
