# Fixer

**Fixer** 集成将向您显示 [Fixer.io](https://fixer.io/) 的当前汇率，该汇率使用 [European Central Bank (ECB)](https://www.ecb.europa.eu) 的数据。

了解有关可用 [currencies](https://fixer.io/symbols) 的概述。

＃＃ 设置

您需要创建 [API key](https://apilayer.com/marketplace/fixer-api#pricing)。免费帐户仅限欧元作为基础货币，每月允许 100 个请求，每小时更新一次。

＃＃ 配置

要启用此集成，请将以下行添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fixer
    api_key: YOUR_API_KEY
    target: CHF
```

```yaml
api_key:
描述：您的 [Fixer.io](https://fixer.io/) 的 API 密钥。
必填：真实
类型：字符串
目标：
描述：目标货币的符号。
必填：真实
类型：字符串
姓名：
描述：在前端使用的名称。
必填：假
类型：字符串
默认：汇率
```

有关 API 的详细信息可在 [Fixer.io documentation](https://fixer.io/documentation) 中找到。
