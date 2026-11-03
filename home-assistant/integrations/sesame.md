# Sesame Smart Lock

**Sesame Smart Lock** 集成可让您控制由 CANDY HOUSE, Inc. 生产的 [Sesame](https://candyhouse.co/) 智能锁。

## Sesame 智能锁版本

此处文档介绍的集成仅适用于最初版的 Sesame Lock。

Sesame Smart Lock 第 5 代和 Hub 第 3 代于 2025 年发布，它们应改用 Matter 集成接入 Home Assistant。

## 配置

您的 Sesame 需要与单独购买的独立 [Wi-Fi Access Point](https://candyhouse.co/collections/frontpage/products/wi-fi-access-point) 配对。

您还需要在 [my.candyhouse.co](https://my.candyhouse.co/#/credentials) 生成 API 密钥。

当您通过上述方式之一启用远程访问，并在 Sesame 应用中为该锁的设置启用 `Integration - cloud` 选项后，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
lock:
  - platform: sesame
    api_key: YOUR_SESAME_API_KEY
```

```yaml
api_key:
  description: 您的 Sesame 账户 API 密钥。
  required: true
  type: string
```
