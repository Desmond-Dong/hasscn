---
title: igloohome
description: 集成 igloohome 智能门禁设备。
ha_category:
  - Sensor
ha_release: 2025.2
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@keithle888'
ha_domain: igloohome
ha_platforms:
  - lock
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

**igloohome** 集成可通过 [igloodeveloper API](https://igloocompany.stoplight.io/docs/igloohome-api/1w1cuv56ge5xq-overview) 让 Home Assistant 访问已配对的[智能门禁设备](https://www.igloohome.co/#products)。此集成包括以下功能：

- 对于 [Bridge](https://www.igloohome.co/products/bridge) 用户：
  - 锁定、解锁或打开与 bridge 关联的门锁。
  - 定期更新所有已关联设备的电池电量。

- 对于非 bridge 用户：
  - 定期更新设备上一次已知的电池电量。
    - 电池电量通过 igloohome 移动应用与设备同步功能来更新。

## 先决条件

- 您拥有一个或多个 igloohome 设备，并已将它们配对到某个账户。
- 您使用同一账户订阅了有效的 [iglooaccess](https://access.igloocompany.co/register) 服务。

## 设置

在注册并激活您的 [iglooaccess](https://access.igloocompany.co/register) 账户后：

- [登录](https://access.igloocompany.co/login)。
- 前往 [API access](https://access.igloocompany.co/api-access)。
- 创建一组名为 `Home Assistant` 的凭据。
- 复制 `Client ID` 和 `Client Secret`。
- 妥善保管这些凭据，切勿与他人共享。
- 将此集成添加到您的 Home Assistant 实例。
- 当集成提示时，将 `Client ID` 和 `Client Secret` 分别填入对应字段。
- 集成会检索您账户下的设备，并在 Home Assistant 中为它们创建条目。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Client ID:
  description: "您的 iglooaccess 账户提供的 Client ID。"
  required: true
  type: string
Client secret:
  description: "您的 iglooaccess 账户提供的 Client Secret。"
  required: true
  type: string
```

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 故障排除

一些常见的故障排除步骤：

- 确保您的订阅仍然有效。

### 电池电量未更新

- 如果您使用 bridge，请确保它已关联到正确的设备。
- 如果您没有 bridge，请先使用 igloohome 移动应用同步设备，然后重新加载与该设备关联的配置条目。

### 身份验证问题

- 验证您填写的 [API 凭据](https://access.igloocompany.co/api-access) 是否正确。
- 确保您的 API 凭据没有过期或被撤销。

### 无法锁定/解锁/打开门锁

- 确认 bridge：
  - 已通电
  - 已连接互联网
  - 位于门锁的蓝牙范围内
- 如果您更改了 bridge 与门锁之间的关联关系，请重新加载配置条目。
