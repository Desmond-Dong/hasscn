# Nederlandse Spoorwegen (NS)

The **Nederlandse Spoorwegen (NS)** integration provides real-time information about Dutch train schedules using the [NS API](https://apiportal.ns.nl/). This integration allows you to monitor departure times, delays, and travel information for your regular routes.

## Prerequisites

要使用此集成，您需要来自 NS API 门户的 API 密钥。

### Obtaining an API Key

1. 在[NS API Portal](https://apiportal.ns.nl/)上创建一个帐户。
2. 请求“Reisinformatie” API 的 API 密钥，该 API 是“Ns-App”产品的一部分。

## Configuration

To add the **Nederlandse Spoorwegen (NS)** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nederlandse_spoorwegen)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nederlandse_spoorwegen).
* From the list, select **Nederlandse Spoorwegen (NS)**.
* Follow the instructions on screen to complete the setup.

</details>

### Managing routes

添加集成后，您可以管理您的旅行路线：

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. Find the **Nederlandse Spoorwegen** integration.
3. Click **Configure**.
4. Add or remove routes as needed.

该集成在 UI 中提供了电台选择器，因此您无需手动查找电台代码。只需在路线配置期间从下拉菜单中搜索并选择您的出发站和到达站即可。

## 搜索特定列车与下一趟列车

默认行为（不指定时间）为您提供符合您的路线标准（从、到、途经车站）的下一趟可用火车的信息。

当您在路线配置期间指定出发时间时，集成会过滤行程以仅显示在指定时间或之后出发的行程。此基于时间的过滤器仅比较时间部分（例如 17:00），忽略日期，因此它全天连续工作。

当您想要专注于日常日程中的特定部分时，这非常有用。例如：

* 将早上通勤列车的时间设置为“08:00”
* 将时间设置为“17:00”，仅看到晚上回家的火车
* 当您对定期发车感兴趣时，避免乘坐很早的火车

传感器自动处理日间转换。如果当前时间超过了您配置的时间，它将显示明天该时间或之后的第一次行程。这可确保您始终看到与您的日程安排相符的相关即将到来的行程，而传感器不会变得不可用。

## Data source

这些数据由 Nederlandse Spoorwegen 通过其官方 API 提供，确保提供有关列车时刻表、延误和服务中断的高质量和最新信息。

## Troubleshooting

### Authentication errors

如果遇到身份验证错误：

* 验证您的 API 密钥是否正确。
* 确保您的 NS API 订阅处于活动状态。
* 检查您是否使用了正确的 API (Reisinformatie API)。

### Removing the integration

此集成遵循标准集成删除。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

与集成相关的所有实体和数据都将被删除。
