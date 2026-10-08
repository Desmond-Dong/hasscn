# CityBikes

**CityBikes** 集成监控选定区域内共享单车站点的自行车可用性。数据由 [CityBikes](https://citybik.es/#about) 提供，支持世界各地的共享单车系统。

## 配置

要启用它，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry (using radius)
sensor:
  - platform: citybikes
    radius: 200
```

```yaml
name:
  description: 此组被监控站点的基本名称。此组中每个被监控站点的实体 ID 将以此基本名称为前缀，此外还有网络 ID。
  required: false
  type: string
network:
  description: 要轮询的共享单车系统的名称。
  required: false
  default: 默认为在被监控位置运营的系统。
  type: string
latitude:
  description: 位置的纬度，自行车站点将围绕此位置进行监控。
  required: false
  default: 默认为您的 `configuration.yaml` 文件中的纬度。
  type: string
longitude:
  description: 位置的经度，自行车站点将围绕此位置进行监控。
  required: false
  default: 默认为您的 `configuration.yaml` 文件中的经度。
  type: string
radius:
  description: 被监控位置周围的半径（以米或英尺为单位，取决于 Home Assistant 配置）。只有距离小于此距离的站点才会被监控。`radius` 或 `stations` 必需。
  required: false
  type: integer
stations:
  description: 要监控的特定站点列表。列表应包含站点 `ID` 或 `UID`，可从 CityBikes API 获取。`radius` 或 `stations` 必需。
  required: false
  type: list
```

## 示例

其他配置示例：

```yaml
# Example configuration.yaml entry (using a list of stations)
sensor:
  - platform: citybikes
    name: Work Stations
    stations:
      - 123
      - 145
      - 436
```
