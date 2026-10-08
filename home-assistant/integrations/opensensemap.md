# openSenseMap

**openSenseMap** 集成会查询 [openSenseMap.org](https://opensensemap.org/) 的开放数据 API，以监控空气质量传感器站。

## 设置

要获取站点的 ID，您需要在 [openSense 地图](https://opensensemap.org/) 上选择它，并在浏览器的地址栏中找到它。它是 URL 的最后一部分，例如 `5b450e565dc1ec001bf7cd1d` <https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d>。

## 手动配置

要启用此 integration，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
air_quality:
  - platform: opensensemap
    station_id: STATION_ID
```

```yaml
station_id:
  description: 要监控的站点的 ID。
  required: true
  type: string
name:
  description: 在前端使用的传感器名称。
  required: false
  default: 站点名称
  type: string
```
