# IRM KMI Weather Belgium

**Royal Meteorological Institute of Belgium** 集成将来自 [IRM KMI (meteo.be)](https://www.meteo.be) 的天气数据接入 Home Assistant。

虽然提供方来自比利时，但数据可用于比利时 🇧🇪、卢森堡 🇱🇺 和荷兰 🇳🇱。

此集成提供的数据来自其[移动应用](https://www.meteo.be/en/info/faq/products-services/the-rmi-weather-app)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Location:
    description: "您想获取天气数据的位置。"
```

## Options

To define options for IRM KMI Weather Belgium, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of IRM KMI Weather Belgium are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Language:
    description: "覆盖文本天气预报使用的 Home Assistant 语言。如果 Home Assistant 当前语言不受比利时皇家气象研究所支持，这会很有帮助。"
```

## 支持的功能

此集成提供一个天气实体，以及[天气预报服务](https://www.home-assistant.io/integrations/weather/#action-weatherget_forecasts)。

## 限制

1. 天气提供方有时会为同一天给出两种天气状况（见下图）。出现这种情况时，此集成只会采用第一种天气状况。 <br/> <img src="/home-assistant/images/integrations/irm_kmi/monday.png" height="150" alt="Example of two weather conditions">

2. 不显示 14 天趋势。

3. 该提供方仅提供比利时、卢森堡和荷兰的数据。

## 数据更新

默认情况下，此集成每 7 分钟 polls 一次天气数据。

## 移除集成

此集成遵循标准集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
