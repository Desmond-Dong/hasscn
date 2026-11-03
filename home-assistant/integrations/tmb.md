# Transports Metropolitans de Barcelona

**Transports Metropolitans de Barcelona** 集成使用 [iBus 服务](https://www.tmb.cat/en/barcelona/tmb-ibus)，为您提供特定站点下一班公交车的预计到站时间，单位为分钟。

## 前提条件

您必须在 [developer.tmb.cat](https://developer.tmb.cat/account/applications/public/new) 上创建一个应用，才能获取所需的 `app_id` 和 `app_key` 值。

## 配置

按如下示例将这些数据添加到 `configuration.yaml` 文件中：

```yaml
# Example configuration.yaml entry
sensor:
- platform: tmb
  app_id: !secret tmb_app_id
  app_key: !secret tmb_app_key
  stops:
    - line: V25
      stop: 3258
```

```yaml
app_id:
  description: 您的 TMB APP 标识符。
  required: true
  type: string
app_key:
  description: 您的 TMB APP 密钥。
  required: true
  type: string
stops:
  description: 要跟踪的公交站列表。
  required: false
  type: list
  keys:
    line:
      description: 要跟踪的线路标识符。
      required: true
      type: string
    stop:
      description: 站点标识符。
      required: true
      type: integer
    name:
      description: 您想用于标识该站点的名称。
      required: false
      type: string
      default: "LINE - STOP"
```

此数据由 [TMB](https://tmb.cat/) 提供。
