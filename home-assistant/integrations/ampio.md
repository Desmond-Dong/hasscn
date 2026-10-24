# Ampio Smart Smog System

**Ampio** 集成将查询 [ampio.pl](http://smog.ampio.pl/) 的开放数据 API 来监控空气质量传感器站。

## 设置

要获取站点 ID，您需要直接联系 Ampio。

## 手动配置

要启用此平台，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
air_quality:
  - platform: ampio
    station_id: STATION_ID
```

```yaml
station_id:
  description: 要监控的站点 ID。
  required: true
  type: string
name:
  description: 在前端使用的传感器名称。
  required: false
  default: 站点名称
  type: string
```
