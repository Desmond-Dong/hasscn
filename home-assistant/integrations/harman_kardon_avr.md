# Harman Kardon AVR

**Harman Kardon AVR** 集成允许您从 Home Assistant 控制 Harman Kardon 网络接收器。

支持的设备：

* Harman Kardon AVR-151S
* 其他 Harman Kardon AVR 接收器（未测试）

要将 Harman Kardon 网络接收器添加到您的系统中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
media_player:
  - platform: harman_kardon_avr
    host: IP_ADDRESS
```

```yaml
host:
  description: 设备的 IP 地址，例如 192.168.1.32。
  required: true
  type: string
name:
  description: 设备名称。如果未设置，则使用 Harman Kardon AVR。
  required: false
  default: Harman Kardon AVR
  type: string
port:
  description: 与接收器通信的端口。如果未设置，则使用 10025。
  required: false
  default: 10025
  type: integer
```

几点说明：

* 最新固件会在一定时间后自动关闭 AVR。此时 AVR 在网络上不再可用，因此"开机"命令将不起作用。
* AVR 没有端点来确定音量、静音、播放等状态，因此如果使用遥控器，Home Assistant 将不知道设备的新状态。
