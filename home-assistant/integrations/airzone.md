> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Airzone

此 integration 与 [Airzone 暖通分区系统](https://www.airzone.es/en/) 的本地 API 进行交互。

典型的 Airzone 设备每个暖通系统有一&#x4E2A;_&#x7236;区域_（主温控器），这是唯一可以更改暖通模式的区域。其余的&#x662F;_&#x5B50;区域_，只能启用或禁用暖通并调整该特定区域的所需温度。

请注意，多个暖通系统可以连接到同一个 Airzone WebServer。在这种情况下，每个暖通系统将有一&#x4E2A;_&#x7236;区域_，每个暖通系统也可能&#x6709;_&#x5B50;区域_。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "网络 IP 地址"
Port:
  description: "网络端口"
ID:
  description: "Airzone 系统 ID（仅当您的设备不支持系统 ID 0 时才需要）"
```

## 二值传感器

对于每个 Airzone 系统（暖通机器），将创建以&#x4E0B;_&#x4E8C;值传感器_：

| 条件       | 描述        |
| :------- | :-------- |
| problems | 系统有错误或警告。 |

对于每个 Airzone 区域（温控器），将创建以&#x4E0B;_&#x4E8C;值传感器_：

| 条件           | 描述        |
| :----------- | :-------- |
| air_demand   | 暖通正在运行。   |
| battery_low  | 温控器电池警告。  |
| floor_demand | 地暖正在运行。   |
| problems     | 区域有错误或警告。 |

## 温控

对于每个 Airzone 区域（温控器），将创建一&#x4E2A;_&#x6E29;控实体_。

**暖通模式只能&#x5728;_&#x7236;区&#x57DF;_&#x4E0A;更改。**

_子区&#x57DF;_&#x53EA;能启用/禁用在相&#x5E94;_&#x7236;区&#x57DF;_&#x4E0A;选择的当前暖通模式。尝试&#x5728;_&#x5B50;区&#x57DF;_&#x4E0A;更改暖通模式将导致 Home Assistant 错误。

## 选择器

对于每个 Airzone 系统（暖通机器），将创建以&#x4E0B;_&#x9009;择器_：

| 条件      | 描述      |
| :------ | :------ |
| Q-Adapt | 气流控制算法。 |

对于每个 Airzone 区域（温控器），将创建以&#x4E0B;_&#x9009;择器_：

| 条件         | 描述        |
| :--------- | :-------- |
| Cold Angle | 制冷时的格栅角度。 |
| Heat Angle | 加热时的格栅角度。 |
| Sleep      | 自动睡眠的分钟数。 |

## 传感器

对于 Airzone 生活热水，将创建以&#x4E0B;_&#x4F20;感器_：

| 条件          | 描述        |
| :---------- | :-------- |
| temperature | 当前生活热水温度。 |

对于 Airzone WebServer，将创建以&#x4E0B;_&#x4F20;感器_：

| 条件   | 描述         |
| :--- | :--------- |
| rssi | WiFi 信号强度。 |

对于每个 Airzone 区域（温控器），将创建以&#x4E0B;_&#x4F20;感器_：

| 条件              | 描述           |
| :-------------- | :----------- |
| battery         | 当前区域温控器电池。   |
| humidity        | 当前区域相对湿度。    |
| temperature     | 当前区域温度。      |
| signal_strength | 当前区域温控器信号强度。 |

## 开关

对于每个 Airzone 区域（温控器），将创建一&#x4E2A;_&#x5F00;关实体_。

## 热水器

如果支持，将为每个 Airzone 设备创建一&#x4E2A;_&#x70ED;水器实体_。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
