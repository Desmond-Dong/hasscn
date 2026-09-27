# Powerfox Cloud

The **Powerfox Cloud** integration allows you to gather data from your [Poweropti](https://shop.powerfox.energy/collections/frontpage) devices, by using their cloud API and fetching the data in Home Assistant.

[Powerfox](https://www.powerfox.energy/) 是一家德国公司，提供用于读取电、水、燃气和热能的智能电表 (Poweropti)。他们拥有自己的云平台，您可以在其中监控设备的使用情况并深入了解能源消耗。

Powerfox FLOW 设备通过每日/每小时报告端点提供测量结果，而其他设备则提供实时数据。

:::note
如果您拥有 **PA 201901**、**PA 201902** 或 **PB 202001**（poweropti+），并且希望在不依赖云端的情况下本地轮询设备，请参阅 [Powerfox Local](/home-assistant/integrations/powerfox_local.md) 集成。

:::

## 配置

要将 **Powerfox Cloud** 集线器添加到 Home Assistant 实例，请使用此 My 按钮：

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=powerfox)

Home Assistant 可以自动发现 Powerfox Cloud。如果发现实例，它会显示为**已发现**，并可立即完成设置。

<details>
<summary>手动配置步骤</summary>

* 打开您的 Home Assistant 实例。
* 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
* 在右下角选择 [**添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=powerfox)。
* 在列表中选择 **Powerfox Cloud**。
* 按照屏幕提示完成设置。

</details>

### 配置参数

```yaml
Email:
  description: The email address of your Powerfox account.
Password:
  description: The password of your Powerfox account.
```

## Poweropti 设备

目前并非所有 Poweropti 设备都受支持。检查下面的列表，看看您的设备是否支持此集成。如果您的设备尚不受支持，请创建[功能请求](/home-assistant/help/)。

| Device                | Type        | Supported  |
| --------------------- | ----------- | ---------- |
| PA 201901 / PA 201902 | Power meter | Yes        |
| PB 202001             | Power meter | Yes        |
| WA 201902             | Water meter | Yes        |
| Powerfox FLOW         | Gas meter   | Yes (report) |
| HA 201902             | Heat meter  | Yes        |

## 数据更新

该集成每 10 秒轮询一次 Powerfox 云。电表、热量表和水表返回实时快照。 Powerfox FLOW 依赖于每小时/每日报告端点。协调器仍每 10 秒轮询一次，但每当 Powerfox 在报告中发布新块时，值就会刷新。

## 操作

此集成不提供额外的操作。

## 示例

### 当用电量激增时收到警报

使用此自动化功能可以密切关注用电量的突然峰值。当 Powerfox 传感器报告功率超过 4 kW 并持续两分钟时，Home Assistant 会发送通知，以便您可以快速做出反应（例如关闭大负载）。

<details>
<summary>YAML 自动化示例</summary>

```yaml
alias: "Powerfox high usage alert"
description: "Notify me when the Powerfox meter reports sustained high power draw."
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
      message: "Powerfox currently reports {{ states('sensor.poweropti_power') }} W."
```

</details>

将阈值和“通知”目标替换为安装中存在的实体。

## 支持的功能

Powerfox 平台主要提供可在[能源仪表板](/home-assistant/energy) 中使用的传感器。

### 电表

它将创建以下传感器：

* **功率 (W)**：测量的有功功率。
* **能源使用量（kWh）**：自安装以来使用了多少能源。
* **能源使用 - 低电价（kWh）**：低电价的能源使用。
* **能源使用 - 高电价（kWh）**：高电价的能源使用。
* **返回的能量（kWh）**：返回到电网的能量。

:::note
The energy tariff sensors are only available if your Poweropti device supports it.

:::

### 水表

它将创建以下传感器：

* **冷水（立方米）**：使用了多少冷水。
* **温水（立方米）**：使用了多少温水。

### 热量表

它将创建以下传感器：

* **总能量（kWh）**：使用了多少能量。
* **Delta 能量 (kWh)**：自上次更新以来使用了多少能量。
* **总体积（立方米）**：使用了多少水。
* **Delta 体积（立方米）**：自上次更新以来使用了多少水。

### Powerfox FLOW 燃气表

FLOW 数据通过 Powerfox 报告端点公开，并提供每日/每小时汇总。集成创建：

* **今日燃气消耗量（立方米）**：今天消耗了多少燃气。
* **今日燃气消耗能量（kWh）**：今天消耗了多少燃气能量。
* **当前燃气消耗量（立方米）**：当前燃气消耗率。
* **当前燃气消耗能量（kWh）**：当前燃气消耗能量率。
* **今日天然气成本（欧元）**：今日天然气总成本（需要 Powerfox 应用程序中的费率）。
* **今日最低消耗量（立方米）**：今天迄今为止观察到的最低每小时消耗量。
* **今日最大消耗量（立方米）**：今天迄今为止观察到的每小时最高消耗量。
* **今日平均消耗量（立方米）**：今天迄今为止观察到的平均每小时消耗量。
* **今日最低消耗能源（kWh）**：今天迄今为止观察到的最低每小时能源消耗。
* **今日最大消耗能源（kWh）**：今天迄今为止观察到的最高每小时能源消耗。
* **今日平均消耗能源（kWh）**：今天迄今为止观察到的平均每小时能源消耗。
* **今日最高天然气成本（欧元）**：今天迄今为止观察到的最高每小时天然气成本。

默认情况下，实体注册表中禁用基于能量的变体。如果您在 Powerfox 中配置了天然气到千瓦时的转换，请启用它们。

## 故障排除

<details>
<summary>费用传感器始终为 0</summary>

只有在 Powerfox 应用中配置了费率时，Powerfox 才会返回货币字段。请先在 Powerfox 应用中设置费率，然后等待下一份报告；一旦 API 提供这些字段，Home Assistant 中的传感器就会显示对应数据。

</details>

## 删除集成

此集成遵循标准集成删除。不需要额外的步骤。

### 从 Home Assistant 中删除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择要删除的集成实例。
3. 在该条目旁选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。
