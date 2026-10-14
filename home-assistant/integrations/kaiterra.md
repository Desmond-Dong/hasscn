# Kaiterra

**Kaiterra** 集成可让您通过 [Kaiterra REST API](https://dev.kaiterra.com/) 查看 Laser Egg 或 Sensedge 设备的读数。

要使用此集成，您需要先在 [Kaiterra dashboard](https://dashboard.kaiterra.cn/) 注册账号、登记设备，然后在 `Settings -> Profile -> Developer` 下创建 API 密钥。

## 配置

要在您的安装中启用 `kaiterra`，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
kaiterra:
  api_key: YOUR_API_KEY
  devices:
    - device_id: YOUR_DEVICE_ID
      type: YOUR_DEVICE_TYPE
```

```yaml
api_key:
  description: 您从 Kaiterra Dashboard 获取的个人 API 密钥。
  required: true
  type: string
aqi_standard:
  description: 空气质量指数标准。可用值为 `us`、`in`、`cn`。
  required: false
  type: string
  default: us
scan_interval:
  description: 轮询传感器状态变化的间隔，单位为秒。
  required: false
  type: integer
  default: 30
preferred_units:
  description: 首选单位列表。列表中的可用值为 `x`、`%`、`C`、`F`、`mg/m³`、`µg/m³`、`ppm`、`ppb`。
  required: false
  type: list
devices:
  description: 您要读取数据的设备列表。
  required: true
  type: list
  keys:
    device_id:
      description: 您要监控的设备 UUID。可在 Kaiterra Dashboard 中找到。
      required: true
      type: string
    type:
      description: 设备类型。可用值为 `laseregg` 和 `sensedge`。
      required: true
      type: string
    name:
      description: 设备的自定义名称。
      required: false
      type: string
```
