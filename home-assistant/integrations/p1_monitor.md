# P1 Monitor

**P1 Monitor** 集成允许您从 [P1 Monitor](https://www.ztatz.nl/p1-monitor/) 设备收集数据并在 Home Assistant 中使用。

P1 Monitor 是一款可以安装在 Raspberry Pi 或其他基于 Linux 的系统上的软件。它通过串口 (P1) 从您的智能电表读取数据，例如您的能源消耗，以及燃气表或水表的数据。

:::note
如果您没有使用 **P1 Monitor** 软件，那么您很可能需要的是 [DSMR Smart Meter](/home-assistant/integrations/dsmr/index.md) 集成，它可以直接连接兼容 DSMR 的智能电表。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 您的 P1 Monitor 实例的 IP 地址或主机名。
Port:
  description: 您的 P1 Monitor 实例的端口号。默认端口是 `80`。
```

## 数据更新

该集成会每 5 秒轮询一次您的 P1 Monitor 实例，以更新 Home Assistant 中的数据。

## 传感器

P1 Monitor 平台主要提供可在 [能源仪表板](/home-assistant/energy) 中使用的传感器。

### 智能电表

用于读取能源消耗/回馈的电表读数、当前功率消耗，以及您当前所处的费率时段。

* 燃气消耗量（m3）
* 功率消耗 / 发电量（W）
* 低/高费率能源消耗量（kWh）
* 低/高费率能源回馈量（kWh）
* 能源费率时段（低 / 高）

:::note
默认情况下，燃气消耗实体处于禁用状态。如需使用，您需要手动启用它。

:::

### 相位

可分别查看各相位的电压、电流以及功率消耗/发电量。

* L1/2/3 相电压（V）
* L1/2/3 相电流（A）
* L1/2/3 相功率消耗（W）
* L1/2/3 相发电功率（W）

### 水表

:::important
如需使用水表，您至少需要运行 **1.1.0** 版本的 P1 Monitor。

:::
可查看每日用水量、总用水量以及已计数的脉冲数量。

* 用水量 - 当日（升）
* 用水量 - 总计（m3）
* 脉冲计数

### 设置

您可以在 Home Assistant 中使用 P1 Monitor 里设置的费率进行计算。

* 燃气单价
* 低/高费率能源消耗单价
* 低/高费率能源回馈单价

## 删除集成

此集成遵循标准的集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
