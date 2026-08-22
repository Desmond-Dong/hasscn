# Awair

**Awair** 集成将从您的 [Awair 设备](https://getawair.com) 获取数据。

## 前提条件

### 本地连接（首选）

本地连接时，集成将每 30 秒轮询设备一次。Awair 提供了支持本地 API 的[设备列表](https://support.getawair.com/hc/articles/360049221014#h_01F40FB3ETMR4TZKPVXJNE86HQ)。必须通过 Awair 应用程序按照[这些步骤](https://support.getawair.com/hc/articles/360049221014#h_01F40FBBW5323GBPV7D6XMG4J8)启用此 API。如果您在家中添加新的 Awair 设备，必须再次按照这些步骤操作。

### 通过云端连接

通过云端连接时，数据以 5 分钟间隔汇总。支持所有设备。您需要请求访问 Awair API 并从 Awair [开发者控制台](https://developer.getawair.com/) 获取访问令牌。这是免费的，但获取令牌可能需要长达 24 小时。

此集成每 5 分钟刷新一次，基于每个设备每天 300 次 API 调用的[默认配额](https://docs.developer.getawair.com/?version=latest#tiers--quotas)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 可用传感器

集成将从每个设备获取数据。支持以下传感器：

* 温度
* 湿度
* 绝对湿度
* 露点
* 二氧化碳
* 总挥发性有机化合物
* PM2.5 密度
* PM10 密度
* 噪音水平
* 亮度

并非所有设备都支持所有传感器；请查阅 Awair 的文档以了解您设备上有哪些传感器。对于带有"灰尘"传感器的第一代 Awair 设备，集成将创建相同的 PM2.5 和 PM10 传感器（这反映了传感器的能力 - 它可以检测 PM2.5 和 PM10 之间的灰尘，但无法区分它们）。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
