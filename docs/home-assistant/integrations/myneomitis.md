---
title: MyNeomitis
description: 使用云 API 将 MyNeomitis 设备（散热器、毛巾架、继电器、地暖）连接到 Home Assistant。
ha_category:
  - Select
ha_release: 2026.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - "@l-pr"
ha_domain: myneomitis
ha_platforms:
  - select
ha_integration_type: hub
---

**MyNeomitis** 集成可将您的 [Axenco](https://www.axenco.com/) MyNeomitis 供暖和能源管理设备连接到 Home Assistant。借助此集成，您可以直接在 Home Assistant 中控制电暖气、毛巾架和地暖等设备。

## 前提条件

- 通过 MYNEOMITIS 应用创建 MyNeomitis 账户。
- 使用该应用将设备添加到账户中。

## 支持的设备

- 带暖风功能的 Eftair 毛巾架
- Ebath 毛巾架
- Estyle 辐射板加热器
- Efluid 散热器
- Myneo Fluid 散热器
- Myneo stat 恒温器
- Myneo Link 智能 Wi-Fi 开关


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
  description: 与您的 MyNeomitis 账户关联的电子邮件地址。
Password:
  description: 您的 MyNeomitis 账户密码。
```

## 使用场景

- 控制温度并更改运行模式。
- 允许您在 Home Assistant 界面中查看和编辑每周计划。
- 允许您监控兼容产品的能耗。

## 支持的功能

**MyNeomitis** 集成提供以下实体：

### Selects

- **Pilot wire mode** (`pilote`)
  - **Description**：通过导控线控制供暖设备的运行模式。
  - **Options**：`Comfort`、`Comfort +`、`Eco`、`Eco -1`、`Eco -2`、`Frost protection`、`Boost`、`Setpoint`、`Standby`、`Auto`
  - **Available for devices**：不带继电器模式的 EWS 设备

- **Switch mode** (`relais`)
  - **Description**：控制智能开关/继电器设备的运行模式。
  - **Options**：`On`、`Off`、`Auto`
  - **Available for devices**：带继电器模式的 EWS 设备

- **Underfloor heating mode** (`ufh`)
  - **Description**：控制地暖以制热模式还是制冷模式运行。
  - **Options**：`Heating`、`Cooling`
  - **Available for devices**：UFH 设备

## 数据更新

**MyNeomitis** 集成会从 Axenco 云 API 接收实时更新。设备状态变化会立即推送到 Home Assistant，无需轮询。

## 移除此集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
