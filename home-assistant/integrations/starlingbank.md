# Starling Bank

**Starling Bank** 集成允许您在 Home Assistant 中以传感器形式监控账户余额数据。

* 余额紧张时关灯？
* 达到储蓄目标时播放一首歌？
* 进入透支时触发警报？

您可在 [Starling Bank 官网](https://www.starlingbank.com/)了解更多信息。关于其 API 的信息可在其[开发者网站](https://developer.starlingbank.com/)查看。

## 访问令牌

拥有自己的 Starling 银行账户后，您还需要在[这里](https://developer.starlingbank.com/signup)注册一个 Starling 开发者账户。您不需要进行实际开发，但需要获取一个 `Personal Access Token`，以便该集成访问您的账户余额。

:::note
您可以通过此令牌控制授予的访问权限。该集成只需要非常基础的权限（见下文）。

:::
注册完成后：

1. 将您的个人 Starling Bank 账户连接到开发者账户。前往开发者账户的 [Personal Access Page](https://developer.starlingbank.com/personal)。
2. 按照说明生成二维码，并在 Starling 手机应用中扫码，以授权并将银行账户关联到开发者账户。
3. 前往开发者账户的 [Personal Access Section](https://developer.starlingbank.com/personal/token)。
4. 点击 `Create Token`。
5. 为令牌命名，例如 `Home Assistant`。
6. 勾选 `account:read` 和 `balance:read` 权限，其余权限可不勾选。
7. 点击 `Create`，并记录新创建的令牌，后续 Home Assistant 配置时会用到。

## 配置

要在您的安装中添加 Starling 账户余额传感器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: starlingbank
    accounts:
      - access_token: YOUR_PERSONAL_ACCESS_TOKEN
```

```yaml
accounts:
  description: Starling 账户列表。允许您监控多个 Starling 账户。
  required: true
  type: list
name:
  description: 账户的友好名称。
  required: false
  type: string
  default: Starling
sandbox:
  description: 用于测试。如果您使用的是 Starling 沙盒账户的访问令牌，请设为 true。
  required: false
  default: false
  type: boolean
access_token:
  description: 您的个人访问令牌。
  required: true
  type: string
balance_types:
  description: 选择监控已清算余额或有效余额（或两者都监控）。
  required: false
  type: list
  default: Both balance types will be monitored.
  keys:
    cleared_balance:
      description: 不包含未完成交易。
    effective_balance:
      description: 包含未完成交易。
```
