# Coinbase

**Coinbase** 集成允许您从 [Coinbase](https://coinbase.com) 访问账户余额和汇率。

您需要从 Coinbase [用户设置](https://www.coinbase.com/settings/api) 的 API 部分获取 API 密钥才能使用此集成。您的 API 密钥和密钥应分别采用 `organizations/XXXXX/apiKeys/XXXXX` 和 `-----BEGIN EC PRIVATE KEY-----\nXXXXXXXXXXXXXXXXX\n-----END EC PRIVATE KEY-----\n` 的格式。创建 API 密钥时，强烈建议确保在 **API 限制** 部分仅勾选 **查看** 框。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API Key:
  description: 您的 Coinbase 生成的 API 密钥，这是必需的。
API Secret:
  description: 您的 Coinbase 生成的 API 密钥，这是必需的。
```

## Options

To define options for Coinbase, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Coinbase are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Wallet balances to report:
  description: 要为其创建账户钱包传感器的货币代码列表。
Exchange rates to report:
  description: 要为其创建汇率传感器的可选货币列表。
Base currency for exchange rate sensors:
  description: 用作汇率传感器货币单位的货币。默认为美元（USD）。
Number of decimal places for exchange rates:
  description: 汇率传感器中计算的小数位数，当 Coinbase 的上游数据缺乏足够精度时，可能返回较少的小数位数，这通常发生在汇率比基础货币大得多的情况下，因此对计算没有显著影响。
```
