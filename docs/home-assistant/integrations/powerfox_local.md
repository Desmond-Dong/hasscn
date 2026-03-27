---
title: Powerfox Local
description: 'The Powerfox Local integration allows you to gather data from your Poweropti(https://shop.powerfox.energy/collections/frontpage) device directly over your。'

ha_category:
  - Energy
  - Sensor
ha_release: 2026.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@klaasnicolaas'
ha_domain: powerfox_local
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
ha_zeroconf: true
---
# Powerfox Local

The **Powerfox Local** integration allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) device directly over your local network, without relying on the Powerfox cloud API.

[Powerfox](https://www.powerfox.energy/) 是一家德国公司，提供用于读取电、水、燃气和热能的智能电表 (Poweropti)。这种集成直接与本地网络上的设备通信，提供更快的更新，并且不依赖于互联网连接或 Powerfox 云服务。

:::note
此集成仅支持**电表**。如果您需要支持水表、燃气表或热量表，或者希望使用 Powerfox 云 API，请参阅 [Powerfox](/home-assistant/integrations/powerfox) 集成。

:::
## 先决条件

- 需要订阅 **powerfox PRO 服务**才能使用本地界面。 PRO 服务可以在 [powerfox Shop](https://shop.powerfox.energy/) 购买。
- 您的 Poweropti 设备必须运行 **固件版本 v2.02.07 或更高版本**。

## 支持的设备

本地接口可用于以下 Poweropti 型号：

- PA 201901
- PA 201902
- PB 202001（poweropti+）

## 配置

要将 **Powerfox Local** 设备添加到 Home Assistant 实例，请使用此 My 按钮：

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=powerfox_local)

Home Assistant 可以自动发现 Powerfox Local。如果发现实例，它会显示为**已发现**，并可立即完成设置。

<details>
<summary>手动配置步骤</summary>

- 打开您的 Home Assistant 实例。
- 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
- 在右下角选择 [**添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=powerfox_local)。
- 在列表中选择 **Powerfox Local**。
- 按照屏幕提示完成设置。

</details>

### 配置参数

```yaml
Host:
  description: The hostname or IP address of your Poweropti device on your local network.
API key:
  description: The API key of your Poweropti device. The default value is the 12-character device ID printed on the label of the device (for example, `1097bd725557`).
```

## 自动发现

如果您的 Poweropti 设备与 Home Assistant 位于同一网络上，它将通过 mDNS/Zeroconf 自动发现。您只需确认设置即可。无需手动输入主机或 API 密钥。

## 数据更新

该集成每 5 秒轮询一次 Poweropti 设备，并提供实时测量数据。

## 操作

此集成不提供额外的操作。

## 示例

### 当用电量激增时收到警报

使用此自动化功能可以密切关注用电量的突然峰值。当 Poweropti 传感器报告功率超过 4 kW 并持续两分钟时，Home Assistant 会发送通知，以便您可以快速做出反应（例如关闭大负载）。

<details>
<summary>YAML 自动化示例</summary>


```yaml
alias: "Powerfox high usage alert"
description: "Notify me when the Poweropti meter reports sustained high power draw."
triggers:
  - trigger: numeric_state
    entity_id: sensor.poweropti_power
    above: 4000
    for:
      minutes: 2
actions:
  - action: notify.mobile_app_phone
    data:
      title: "High consumption detected"
      message: "Poweropti currently reports {{ states('sensor.poweropti_power') }} W."
```


</details>

将阈值和“通知”目标替换为安装中存在的实体。

## 支持的功能

Powerfox Local 平台提供可在[能源仪表板](/home-assistant/energy) 中使用的传感器。

### 电表

它将创建以下传感器：

- **功率 (W)**：当前测量的有功功率。
- **能源使用量 (Wh)**：自安装以来使用的总能源。
- **能源使用量 - 高电价 (Wh)**：高电价下的能源使用量。
- **能源使用 - 低关税 (Wh)**：低关税下的能源使用。
- **能量返回（Wh）**：返回电网的能量。

## 故障排除

<details>
<summary>无法连接到设备</summary>


1. 确保 Poweropti 设备已开机并连接到与 Home Assistant 相同的网络。 
2. 验证主机（IP 地址或主机名）和 API 密钥是否正确。 
   - 默认 API 密钥是打印在设备标签上的 12 个字符的设备 ID。


</details>

<details>
<summary>401 未授权错误</summary>


本地界面仅适用于有效的 **powerfox PRO 服务** 订阅。

1. 验证您的设备是否已在 Powerfox 应用程序或商店中激活 PRO 服务。 
2. 另外，请确保您设备的固件版本为 *v2.02.07 或更高版本*。


</details>

## 删除集成

此集成遵循标准集成删除。不需要额外的步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择要删除的集成实例。
3. 在该条目旁选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。
