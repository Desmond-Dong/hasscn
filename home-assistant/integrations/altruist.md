# Altruist

**Altruist** 集成将 Home Assistant 连接到 [空气质量传感器 "Altruist"](https://robonomics.network/devices/altruist/) —— 一种专为去中心化环境监测而设计的设备。它通过 HTTP 从传感器捕获噪音、灰尘和温度数据，使其成为 Home Assistant 中本地可用的实体。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP Address:
  description: "您的 Altruist 设备的本地 IP 地址。"
```

## 可用传感器

该集成将从每个设备获取数据。支持以下传感器：

* 湿度
* 温度
* 大气压力
* PM2.5 密度
* PM10 密度
* 环境噪音水平
* 二氧化碳 (CO2) 水平
* 总挥发性有机化合物 (TVOC)
* 环境辐射水平
* Wi-Fi 信号强度

## 移除集成

此集成遵循标准集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
