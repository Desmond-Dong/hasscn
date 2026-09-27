# KWB Easyfire

**KWB Easyfire** 集成可将配备 Comfort3 控制器的 [KWB Easyfire](https://www.kwb.net/produkte/) 颗粒燃料中央供暖设备传感器接入 Home Assistant。

支持通过串口（RS485）直接连接，或通过 telnet 终端服务器连接。串口线必须连接到控制单元的 25 号端口（通常用于外接控制终端）。

由于该串口协议为专有且封闭协议，目前仅支持大多数温度传感器和少量控制继电器，其余功能仍在开发中（请参阅 <https://www.mikrocontroller.net/topic/274137>）。

要启用 KWB Easyfire 集成，请将其添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

通过串口直接连接：

```yaml
# configuration.yaml 示例条目
- platform: kwb
    name: kwb
    device: "/dev/ttyUSB0"
    type: serial
    raw: false
```

使用串口转以太网转换器的 telnet 终端服务器：

```yaml
# configuration.yaml 示例条目
  - platform: kwb
    name: kwb
    host: <ip>
    port: 23
    type: tcp
    raw: false
```

请仔细确认每个配置变量是用于 `TCP` 连接还是 `serial` 连接。

```yaml
raw:
  description: 是否将原始串口输出显示为传感器。
  required: false
  default: false
  type: boolean
name:
  description: 在前端中显示的设备名称。
  required: false
  default: KWB
  type: string
device:
  description: （用于 serial）设备的串口设备路径。
  required: true
  type: string
host:
  description: （用于 tcp）串口服务器的 IP 地址。
  required: true
  type: string
port:
  description: （用于 tcp）串口服务器的 TCP 端口。
  required: true
  type: integer
type:
  description: "传感器类型，可选：`serial` 或 `tcp`。"
  required: true
  type: string
```
