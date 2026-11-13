> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Instituto Português do Mar e Atmosfera (IPMA)

**IPMA** 集成使用 [Instituto Portugues do Mar e Atmosfera](https://www.ipma.pt/) 作为当前和天气预报气象数据的来源。

Home Assistant 目前支持以下设备类型：

- Sensor
  - 您所在位置的火灾风险
  - 您所在地区的紫外线指数
- Weather（当前状态和天气预报）

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

IPMA 同时提&#x4F9B;_&#x6BCF;小时_（72 小时）&#x548C;_&#x6BCF;日_（10 天）天气预报，但您必须在初始设置集成时选择天气实体要公开哪一种预报。
