# MQTT JSON

**MQTT JSON** 集成允许您通过监控 MQTT 主题中的新位置数据来检测在家状态。要使用此平台，您需要为每个设备指定唯一主题。

## 配置

要在您的安装中使用此设备追踪器，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mqtt_json
    devices:
      paulus_oneplus: location/paulus
      annetherese_n4: location/annetherese
```

```yaml
devices:
  description: 设备及其主题的列表。
  required: true
  type: list
qos:
  description: 主题的 QoS 级别。
  required: false
  type: string
```

## 用法

此平台接收包含 GPS 信息的 JSON 格式负载，例如：

```json
{"longitude": 1.0,"gps_accuracy": 60,"latitude": 2.0,"battery_level": 99.9}
```

其中 `longitude` 表示经度，`latitude` 表示纬度，`gps_accuracy` 表示精度（米），`battery_level` 表示发送更新的设备当前电池电量。
`longitude` 和 `latitude` 为必需字段，`gps_accuracy` 和 `battery_level` 为可选字段。
