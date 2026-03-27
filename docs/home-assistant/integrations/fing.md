---
title: Fing
description: 'Fing 集成允许 Home Assistant 检索有关本地网络上设备的详细信息。Fing(https://www.fing.com/) 帮助家庭用户和 IT 专业人员监控、保护和了解他们的网络，使用直观的工具使连接管理变得简单有效。 通过 Local。'
ha_release: '2025.11'
ha_category:
  - Presence detection
ha_platforms:
  - device_tracker
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Lorenzo-Gasparini'
ha_domain: fing
ha_integration_type: service
ha_quality_scale: bronze
---
# Fing

**Fing** 集成允许 Home Assistant 检索有关本地网络上设备的详细信息。[Fing](https://www.fing.com/) 帮助家庭用户和 IT 专业人员监控、保护和了解他们的网络，使用直观的工具使连接管理变得简单有效。
通过 [Local API](https://www.fing.com/developers/local-api/) 连接，Fing 自动构建和同步设备清单以检测在线状态并触发自动化。

## 前提条件

- 确保在您的 Fing Agent（[Fing Agent](https://www.fing.com/agent/)、Fingbox 或 [Fing Desktop](https://www.fing.com/desktop/)）上启用了 [Local API](https://www.fing.com/developers/local-api/)。
- 您需要 Fing Agent 的 IP 地址、端口和 API 密钥来完成设置。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 故障排除

如果您在 **Fing 集成** 方面遇到问题，请尝试以下方法：

- 确认 Fing Agent 正在运行并且可以在您的网络上访问。
- 验证 Home Assistant 中配置的 IP 地址和端口是否与您的 Fing Agent 的实际设置匹配。
- 确保您的 Local API 版本为 **1.1.0** 或更高。

## 移除集成

您可以按照标准的 Home Assistant 程序移除此集成。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，如果您不再计划使用 Fing Local API，可以在网络上禁用它。