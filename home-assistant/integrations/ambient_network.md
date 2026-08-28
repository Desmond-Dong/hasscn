# Ambient Weather Network

**Ambient Weather Network** 集成通过 [Ambient Weather Network](https://ambientweather.net) 获取本地气象站信息。

与 [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/) 集成类似，此集成从单个气象站收集传感器数据。然而，与 [Ambient Weather Station](https://www.home-assistant.io/integrations/ambient_station/) 集成不同 —— 后者仅允许所有者从其拥有的气象站获取数据 —— 此集成直接从 <https://ambientweather.net> 获取公共数据，无需 API 密钥，但数据集有所减少（例如，不包括室内传感器）。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
