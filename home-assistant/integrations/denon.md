# Denon Network Receivers

**Denon Network Receivers** integration 允许您从 Home Assistant 控制 Denon 网络接收器。您的设备可能由 [Denon AVR] 平台支持。

支持的设备：

* Denon DRA-N5
* Denon RCD-N8（未经测试）
* Denon RCD-N9（部分支持）
* 带有集成网络支持的 Denon AVR 接收器（部分支持）

要将 Denon 网络接收器添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

## Telnet 平台

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: denon
    host: IP_ADDRESS
```

```yaml
host:
  description: "设备的 IP 地址。例如：192.168.1.32"
  required: true
  type: string
name:
  description: 设备的名称
  required: false
  type: string
```

平台 denon 的几点注意事项：

* 接收器只处理一个 telnet 连接并拒绝其他连接。
* 注意音量。100% 甚至 50% 都非常大声。
* 为了能够唤醒接收器，请在接收器设置中激活 "remote" 设置。
* 支持播放和暂停，不支持切换。
* 无法实现快进，因为 UI 发送绝对位置。只能通过模拟按键进行快进。

[Denon AVR]: /integrations/denonavr/
