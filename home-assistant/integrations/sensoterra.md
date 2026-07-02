# Sensoterra

此集成通过 HTTPS 使用公开的 [Sensoterra Customer API](https://monitor.sensoterra.com/api/v3/)，与您的 [Sensoterra](https://sensoterra.com) 土壤湿度探针通信。

## 前提条件

您可以在 Sensoterra.com 购买土壤湿度探针。请在 Sensoterra 应用中创建免费账户并注册您的探针。Sensoterra Home Assistant 集成需要使用您的凭据来获取令牌，以访问探针数据。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

此集成会为每个探针提供以下传感器：

* 土壤湿度（体积含水率百分比或 SI 单位）
* 温度（摄氏度）
* LoRaWAN 信号强度（RSSI 级别）
* 电池电量（约为 100%、50% 或 10%）
* 最近一次上线时间戳

通常，土壤湿度探针每小时测量一次。Home Assistant 集成会每 15 分钟轮询一次这些数据。
