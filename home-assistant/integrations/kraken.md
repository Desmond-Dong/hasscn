# Kraken

**Kraken** 集成可让您监控 [kraken.com](https://www.kraken.com/) 上的汇率。

可交易资产对列表请参阅 [Kraken 支持文章](https://support.kraken.com/articles/kraken-markets)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for Kraken, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Kraken are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Update interval:
  description: "两次更新之间的秒数"
Tracked Asset Pairs:
  description: "选择您要跟踪的资产。此列表会根据 kraken.com 上可交易的资产自动更新。"
```
