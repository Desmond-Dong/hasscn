# Concord232

**Concord232** 集成为支持 RS-232 自动化控制面板接口模块（或内置该模块）的 GE、Interlogix 及其他品牌报警面板提供集成支持。支持的面板包括 Concord 4。

要使用此平台，您需要安装外部 `concord232` 客户端和服务器。服务器必须运行在连接到自动化模块串口的设备上。客户端必须安装在运行 Home Assistant 的机器上。它们通常可以是同一台机器，但并非必须如此。有关设置和测试客户端与服务器的更多详细信息，请参阅 <https://github.com/JasonCarter80/concord232>。

Home Assistant 目前支持以下设备类型：

* [报警控制面板](#alarm-control-panel)
* [二进制传感器](#binary-sensor)

## 报警控制面板

要启用报警控制面板平台，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 示例条目
alarm_control_panel:
  - platform: concord232
```

```yaml
host:
  description: 运行 concord232 服务器进程的主机。
  required: false
  type: string
  default: localhost
port:
  description: 报警面板监听的端口。
  required: false
  type: integer
  default: 5007
code:
  description: 如果已定义，则指定一个代码，用于在前端启用或禁用报警。
  required: false
  type: string
mode:
  description: 如果已定义为 `audible` 或 `silent`，则指定报警面板在居家布防时是否发出声音。
  required: false
  type: string
  default: audible
```

## 二进制传感器

要启用二进制传感器平台，请将以下内容添加到 `configuration.yaml` 中：

```yaml
# `configuration.yaml` 示例条目
binary_sensor:
  - platform: concord232
```

```yaml
host:
  description: 运行 concord232 服务器进程的主机。
  required: false
  type: string
  default: localhost
port:
  description: 报警面板监听的端口。
  required: false
  type: integer
  default: 5007
```
