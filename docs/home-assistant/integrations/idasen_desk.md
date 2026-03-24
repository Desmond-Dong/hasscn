---
title: IKEA Idasen Desk
description: 控制和监控您的 IKEA Idåsen 站立式办公桌。
ha_iot_class: Local Push
ha_config_flow: true
ha_release: '2023.10'
ha_category:
  - Cover
ha_domain: idasen_desk
ha_bluetooth: true
ha_platforms:
  - button
  - cover
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@abmantis'
ha_quality_scale: bronze
---

**IKEA IDÅSEN** 集成允许您将 [IKEA Idåsen](https://www.ikea.com/us/en/cat/idasen-system-47424/) 电动办公桌连接到 Home Assistant，使控制办公桌高度成为可能，还可以监控来自物理控制器的高度变化。

:::tip
将办公桌连接到 Home Assistant 的推荐方式是使用 [ESPHome 蓝牙代理](https://esphome.io/projects/?type=bluetooth)，因为它们提供最佳体验。
  
如果您不使用 ESPHome 蓝牙代理，则需要在集成设置期间保持 `bluetoothctl`（或任何其他蓝牙代理）打开，否则它将无法与办公桌进行身份验证。连接过程也不如 ESPHome 可靠，因此您可能需要重试几次才能成功。这是由于 Home Assistant 使用的第三方蓝牙实现的限制。

此外，如果不使用 ESPHome 蓝牙代理，您可能会遇到办公桌变得不可用的情况，需要在重启 Home Assistant 或重新加载集成后重新配对。要永久配对，请[通过 SSH 访问主机](https://developers.home-assistant.io/docs/operating-system/debugging/#ssh-access-to-the-host)，使用 `bluetoothctl pair <desk-BT-address>` 配对办公桌，并通过 `bluetoothctl devices Paired` 验证它是否列出。如果办公桌未列为已配对，请在办公桌上进入配对模式时重复执行命令几次。


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Home Assistant 将显示可用办公桌地址列表，您只需选择要添加的办公桌。重复此过程可添加多个办公桌。

:::note
如果您看到"未找到未配置的设备"消息，请确保办公桌处于蓝牙配对模式。为此，按住控制器上带有蓝牙标志的小按钮直到它开始闪烁（约 3 秒）。

:::
## 连接/断开按钮

此集成提供两个按钮，用于通过蓝牙连接和断开与办公桌的连接。这些可用于仅在需要时自动连接到办公桌，例如，当可用连接插槽有限时避免保持持续连接。

## 传感器

```yaml
Height:
  description: 办公桌的当前高度，以米为单位。
```

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.