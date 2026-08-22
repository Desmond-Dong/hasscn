# Sharp Aquos TV

**Sharp Aquos TV** 集成可让您控制 [Sharp Aquos TV](https://global.sharp/aquos/index.html)。

首次连接电视时，您需要在电视上确认 Home Assistant 的访问请求，以允许通信。

## 配置

要将电视添加到您的系统中，请将以下内容添加到 `configuration.yaml` 文件。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: aquostv
    host: 192.168.0.10
```

```yaml
host:
  description: Sharp Aquos TV 的 IP/主机名，例如 `192.168.0.10`。
  required: true
  type: string
port:
  description: Sharp Aquos TV 的端口。
  required: false
  default: 10002
  type: integer
username:
  description: Sharp Aquos TV 的用户名。
  required: false
  default: admin
  type: string
password:
  description: Sharp Aquos TV 的密码。
  required: false
  default: password
  type: string
name:
  description: 您想要给 Sharp Aquos TV 的名称。
  required: false
  type: string
power_on_enabled:
  description: 启用后，您可以通过 Home Assistant 打开电视。
  required: false
  default: false
  type: boolean
```

:::important
当您将 **power\_on\_enabled** 设置为 `true` 时，首次仍需使用遥控器开机一次。
完成后，您就可以通过 Home Assistant 开机。
另外，当 **power\_on\_enabled** 为 `true` 时，关机后电视上的 Aquos 标志会保持常亮，电视可能会消耗更多电量。

:::

## 目前已知支持的型号

* LC-40LE830U
* LC-40CFE6242E（无音量控制，未完全测试但能够轮询状态）
* LC-46LE830U
* LC-52LE830U
* LC-60LE830U
* LC-60LE635（无音量控制）
* LC-52LE925UN
* LC-60LE925UN
* LC-60LE857U
* LC-60EQ10U
* LC-60SQ15U
* LC-50US40（无音量控制，未完全测试）
* LC-70LE650U
* LC-70LE747E（无音量控制）
* LC-60LE650U
* LC-80LE632U

如果您的型号不在列表中，欢迎测试。如果一切正常，请将其添加到 [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/aquostv.markdown) 的支持列表中。
