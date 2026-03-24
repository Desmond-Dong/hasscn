---
title: Iperf3
description: 关于如何在 Home Assistant 中使用 Iperf3 测量网络带宽的说明。
ha_category:
  - Sensor
  - System monitor
ha_release: 0.71
ha_iot_class: Local Polling
ha_codeowners:
  - '@rohankapoorcom'
ha_domain: iperf3
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Iperf3** 集成允许您针对私有或公共 [Iperf3](https://software.es.net/iperf/index.html) 服务器测量网络带宽性能。

启用此集成后，会自动为下方列出的监控条件创建 Iperf3 传感器。默认情况下，它每小时运行一次。您可以在配置中定义 `scan_interval`，以更改 Iperf3 测试的更新频率。

## 设置

此集成要求您的操作系统中已安装 `iperf3` 命令。安装说明请参阅 [Iperf3 官方文档](https://software.es.net/iperf/obtaining.html)。

## 配置

要将 `iperf3` 传感器添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

每小时整点运行一次（默认）：

```yaml
# configuration.yaml 示例条目
iperf3:
  hosts:
    - host: iperf.he.net
```

```yaml
  monitored_conditions:
    description: 在前端显示的传感器。
    required: false
    type: list
    keys:
      download:
        description: 下载速度（Mbit/s）。
      upload:
        description: 上传速度（Mbit/s）。
  hosts:
    description: 用于执行测试的 Iperf3 服务器列表。
    required: true
    type: list
  scan_interval:
    description: "两次更新之间的最短时间间隔。支持的格式包括：`scan_interval: 'HH:MM:SS'`、`scan_interval: 'HH:MM'`，以及时间段字典（见下方示例）。"
    required: false
    default: 60 minutes
    type: time
  manual:
    description: "使用 `true` 或 `false` 开启或关闭手动模式。手动模式会禁用计划测试。"
    required: false
    type: boolean
    default: false
```

配置变量（host）：

```yaml
  host:
    description: 用于测试的 Iperf3 服务器名称或 IP 地址。
    required: true
    type: string
  port:
    description: Iperf3 运行所在的端口。
    required: false
    default: 5201
    type: integer
  duration:
    description: 指定测试持续时间，单位为秒。默认值为 10，有效范围为 5 到 10。
    required: false
    default: 10
    type: integer
  parallel:
    description: 指定连接到服务器的并发流数量。默认值为 1，有效范围为 1 到 20。
    default: 1
    type: integer
  protocol:
    description: 指定测试使用的协议。默认值为 TCP，有效值为 TCP 或 UDP。如果您的 Iperf3 服务器位于互联网中，建议使用 TCP 而不是 UDP。如果协议设置为 UDP，由于其特性和数据包重传问题，传感器可能不会更新。
    required: false
    default: tcp
    type: string
```

### 时间段字典示例

```yaml
scan_interval:
  # 这些字段中至少要指定一个
  days: 0
  hours: 0
  minutes: 3
  seconds: 30
  milliseconds: 0
```

您可以在[这里](https://iperf.fr/iperf-servers.php)找到公共 Iperf3 服务器列表。您也可以使用 [mlabbe/iperf3](https://hub.docker.com/r/mlabbe/iperf3/) Docker 镜像启动自己的 Iperf3 服务器，或直接参考 `iperf3` 命令的 man 手册。

可通过设置 `scan_interval` 的值来调整测试自动触发的频率。

并发流在某些情况下会有帮助。由于 TCP 会尽量保持公平且保守，您可以考虑提高 `parallel` 属性的值。请谨慎使用该值，并参阅 Iperf3 的 man 手册了解更多信息。

您可以使用 `sensor.iperf3_update` 操作手动触发所有传感器的测速。Iperf3 也有自己的操作，可对特定实体执行测速。

## 操作

加载后，`iperf3` 集成会公开一个操作（`iperf3.speedtest`），可按需调用以执行测速。如果您启用了手动模式，这会很有用。

| Data attribute | Description |
| --- | --- |
| `host` | 指向 `configuration.yaml` 中已配置 `host` 的字符串。否则，将对所有已配置的主机运行测试。 |

操作数据示例：

```json
{"host": "192.168.0.121"}
```
