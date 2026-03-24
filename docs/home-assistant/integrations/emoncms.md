---
title: Emoncms
description: 关于如何将 Emoncms 数据源作为传感器集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_release: 0.29
ha_iot_class: Local Polling
ha_domain: emoncms
ha_codeowners:
  - '@borpin'
  - '@alexandrecuer'
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

**Emoncms** 集成为您的本地或云端版 [Emoncms](https://emoncms.org) 中可用的数据源创建传感器。

要将信息从 Home Assistant 写入 Emoncms，您可以使用 [`emoncms_history`](/home-assistant/integrations/emoncms_history) 集成。

## 前提条件

要使用此服务，您需要一个 Emoncms 账户和一个 API 密钥。您可以在本地或云端 Emoncms 账户设置中找到 API 密钥。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: Emoncms 服务器的 URL，以协议（`http` 或 `https`）开头。对于云安装，使用 <https://emoncms.org>（尾随斜杠可选）。对于本地安装，使用您的本地服务器地址（例如 `http://localhost:8080`）。确保服务器可从您的 Home Assistant 实例访问。
API key:
  description: 用于身份验证的 32 字符只读 API 密钥可在 Emoncms 的"My Account > Read Only API Key"下找到。密钥应为十六进制字符串。不需要读写 API 密钥，因为此集成从 Emoncms 读取数据。如果您收到身份验证错误，请验证您已正确复制整个密钥。
```

## Options

To define options for Emoncms, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Emoncms are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

## 传感器

- **能量** 单位 Wh、kWh
- **功率** 单位 W
- **电压** 单位 V
- **电流** 单位 A
- **视在功率** 单位 VA
- **温度** 单位 °C、°F 或 K
- **频率** 单位 Hz
- **压力** 单位 hPa

## 数据更新

此集成每 60 秒从 Emoncms 检索一次数据。

## 故障排除

Emoncms 集成依赖于活动的本地网络或互联网连接来与您的本地或云端版 Emoncms 通信。如果遇到问题，请验证您的连接是否稳定。

## 移除集成

可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.