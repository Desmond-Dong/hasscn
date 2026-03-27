---
title: Hanna
description: 'Hanna 集成通过连接您的 HannaCloud(https://www.hannacloud.com) 账户，从 Hanna Pool Controller(https://www.hannainstruments.be/en/Applicatons-measure-analyze/swimming-po。'
ha_release: 2025.12
ha_category:
  - Sensor
ha_codeowners:
  - '@bestycame'
ha_quality_scale: bronze
ha_domain: hanna
ha_integration_type: hub
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_platforms:
  - sensor
---
# Hanna

**Hanna** 集成通过连接您的 [HannaCloud](https://www.hannacloud.com) 账户，从 [Hanna Pool Controller](https://www.hannainstruments.be/en/Applicatons-measure-analyze/swimming-pool/ph-chlorine-control/systems/) 设备获取数据。

## 支持的设备

已知受此集成支持的设备如下：
-  Hanna Instruments BL122
-  Hanna Instruments BL132

## 前提条件

在添加 Hanna 集成之前，您需要：

- A [HannaCloud](https://www.hannacloud.com) account.
- Your HannaCloud login credentials (email and password).
- A Hanna Pool Controller device that is connected to your HannaCloud account.


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
email:
  description: 您的 HannaCloud 账户邮箱地址。
password:
  description: 与您的 HannaCloud 账户关联的密码
```

## 数据更新

此集成会通过轮询 HannaCloud 账户中的新数值来更新传感器。


## 支持的功能

### 实体

Hanna 集成提供以下实体。

#### 传感器
- **Chlorine flow rate**：监测氯投加速率
- **Chlorine ORP value**：测量氧化还原电位，并将校准数据作为属性提供
- **pH Acid/base flow rate**：监测酸/碱药剂投加速率
- **pH value**：测量 pH 值，并将校准数据作为属性提供
- **Air temperature**：设备上报的空气温度
- **Water temperature**：设备上报的水温


## 故障排除

当前没有此集成的已知常见问题。

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
