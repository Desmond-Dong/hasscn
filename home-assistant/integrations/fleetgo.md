# FleetGO

**FleetGO** 集成允许您将配备 [FleetGO](https://fleetgo.com) 硬件的车辆集成到 Home Assistant 中。它可以让您查看车辆的某些详细信息，还可以在地图上显示您的车辆。

## 设置

要使用此集成，您需要一个 **API 密钥** 和 **API 密钥密码**，可以通过联系 [info@fleetgo.com](mailto:info@fleetgo.com?subject=API%20Key) 获取。

## 配置

要在您的系统中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: fleetgo
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    username: YOUR_FLEETGO_USERNAME
    password: YOUR_FLEETGO_PASSWORD
    include:
        - LICENSE_PLATE
```

```yaml
client_id:
  description: 用于连接 FleetGO API 的客户端 ID。
  required: true
  type: string
client_secret:
  description: 用于连接 FleetGO API 的客户端密钥。
  required: true
  type: string
username:
  description: 您的 FleetGO 用户名。
  required: true
  type: string
password:
  description: 您的 FleetGO 密码。
  required: true
  type: string
include:
  description: 要包含的车牌列表，如果未指定，将添加所有车辆。
  required: false
  type: list
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/index.md)。

## 可用属性

| 属性           | 描述                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| latitude            | 您车辆的纬度                                                                                                       |
| longitude           | 您车辆的经度                                                                                                      |
| altitude            | 您车辆的海拔高度                                                                                                           |
| id                  | 用于识别您车辆的标识符                                                                                           |
| make                | 车辆品牌                                                                                                            |
| model               | 您车辆的型号                                                                                                              |
| license\_plate       | 车牌号码                                                                                                               |
| active              | 发动机当前是否处于活动状态                                                                                           |
| odo                 | 里程表读数（公里）                                                                                                         |
| speed               | 您车辆的当前速度（公里/小时）                                                                                         |
| last\_seen           | 您车辆上次与 API 通信的日期和时间                                                                 |
| fuel\_level          | 车辆燃油油位 \[1]                                                                                                      |
| malfunction\_light   | 是否有任何故障灯亮起 \[1]                                                                                             |
| coolant\_temperature | 冷却液温度 \[1]                                                                                                     |
| power\_voltage       | 硬件测量的电源电压 \[1]                                                                                         |
| distance\_from\_home  | 您车辆距离 Home Assistant 家庭位置有多远                                                             |
| current\_max\_speed   | 设备当前所在道路的最高限速（如可用）                                                            |
| current\_address     | 包含设备当前所在地址信息的对象。解析为设备坐标最近的地址。 |

\[1] 仅在某些车型和硬件版本上可用。
