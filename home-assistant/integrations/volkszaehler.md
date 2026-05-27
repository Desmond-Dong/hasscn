# Volkszaehler

**Volkszaehler** 集成会使用 [Volkszaehler](https://wiki.volkszaehler.org/) API 提供的系统信息。

## 配置

要启用 Volkszaehler 集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例
sensor:
  - platform: volkszaehler
    uuid: DEVICE_UUID
```

```yaml
uuid:
  description: 要跟踪的设备 UUID。
  required: true
  type: string
host:
  description: 运行 Volkszaehler 的主机 IP 地址。
  required: false
  type: string
  default: localhost
port:
  description: Volkszaehler 监听的端口。
  required: false
  type: integer
  default: 80
name:
  description: 传感器名称前缀。
  required: false
  type: string
  default: Volkszaehler
monitored_conditions:
  description: 要监控的项目。
  required: false
  type: list
  default: average
  keys:
    average:
      description: 平均功率。
    consumption:
      description: 功耗。
    max:
      description: 最大功率。
    min:
      description: 最小功率。
```

## 完整示例

```yaml
# configuration.yaml 示例
sensor:
  - platform: volkszaehler
    host: demo.volkszaehler.org
    uuid: "57acbef0-88a9-11e4-934f-6b0f9ecd95a8"
    monitored_conditions:
      - average
      - consumption
      - min
      - max
```
