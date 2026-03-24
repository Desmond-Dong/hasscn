---
title: Firefly III
description: 关于如何将 Firefly III 与 Home Assistant 集成的说明。
ha_category:
  - Finance
  - Sensor
ha_release: '2025.11'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: firefly_iii
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

**Firefly III** 集成用作 [Firefly III API](https://api-docs.firefly-iii.org/) 的接口。
Firefly III 是一个免费的开源个人财务管理器。它包含完整的交易管理系统、预算、类别和报告。您可以通过 Firefly III 提供的多种选项轻松导入交易。它甚至包含一个规则引擎来自动化和帮助组织您的记账。

## 前提条件

在 Home Assistant 中配置 Firefly III 之前，您需要准备几件事：

- 已安装 Firefly III 并拥有管理员权限的用户
- 访问令牌

按照以下步骤创建 Firefly III 个人访问令牌：

1. 登录到您的 Firefly III 实例。
2. 要创建访问令牌，请按照 [Firefly III 文档](https://docs.firefly-iii.org/how-to/firefly-iii/features/api/#personal-access-tokens)中的步骤操作。
3. 复制生成的访问令牌并将其存储在安全的地方，您将在后续步骤中需要它。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

目前 Home Assistant 支持以下设备类型：

- 传感器 - 用于监控账户、类别及其余额。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

移除集成后，请考虑删除 Firefly III 访问令牌。