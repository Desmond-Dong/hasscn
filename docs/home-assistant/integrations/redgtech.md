---
title: Redgtech
description: 'Redgtech 集成可将您的 Redgtech(https://redgtech.com.br/) 智能开关接入 Home Assistant。Redgtech 是巴西的智能家居品牌，生产连接云端的开关和继电器。通过此集成，您可以直接在 Home Assistant 中控制和监控 Redgtech 开关。'
ha_category:
  - Switch
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jonhsady'
  - '@luan-nvg'
ha_domain: redgtech
ha_platforms:
  - switch
ha_integration_type: service
ha_quality_scale: bronze
---
# Redgtech

**Redgtech** 集成可将您的 [Redgtech](https://redgtech.com.br/) 智能开关接入 Home Assistant。Redgtech 是巴西的智能家居品牌，生产连接云端的开关和继电器。通过此集成，您可以直接在 Home Assistant 中控制和监控 Redgtech 开关。

## 先决条件

1. 如果您还没有 **Redgtech** 账户，请先创建一个。
2. 使用 Redgtech 应用将设备添加到账户中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email:
  description: 与 Redgtech 账户关联的电子邮箱地址。
Password:
  description: 您的 Redgtech 账户密码。
```

## 支持的功能

### 开关

**Redgtech** 集成为您 Redgtech 账户中的每个智能开关提供一个开关实体。每个开关实体都支持开和关。

## 数据更新

**Redgtech** 集成每 15 秒通过 polls Redgtech 云 API 获取一次设备状态。需要时，集成会自动处理令牌续期，因此您无需手动重新认证。

## 故障排除

### 集成无法连接

请确保您的互联网连接正常，并且 Redgtech 设备在 Redgtech 应用中可见且可控制。如果不是，请检查设备的供电和网络连接。

### 设置后设备未显示

请确保您的设备已在 Redgtech 应用中正确配置，并且 Redgtech 账户对这些设备具有访问权限。如果设备仍未显示，请尝试移除并重新添加该集成。

### 认证错误

请确认您的邮箱地址和密码正确，且 Redgtech 账户处于有效状态。您可以通过登录 Redgtech 应用来验证凭据。

## 删除集成

此集成遵循标准删除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
