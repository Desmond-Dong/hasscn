# SAJ Solar Inverter

**SAJ Solar Inverter** 集成会轮询 [SAJ](https://www.saj-electric.com/) 太阳能逆变器，并在 Home Assistant 中将这些数值显示为传感器。

此传感器使用 Web 界面，因此要使用它，您必须能够通过浏览器连接到太阳能逆变器。
并非所有逆变器都支持本地接口。

通过以太网模块连接的逆变器与通过 Wi-Fi 模块连接的逆变器存在差异。
Wi-Fi 模块需要用户名和密码进行身份验证，而以太网模块则不需要。

## 配置

要启用此集成，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
sensor:
  - platform: saj
    host: IP_ADDRESS_OF_DEVICE
```

```yaml
host:
  description: "SAJ 太阳能逆变器的 IP 地址。"
  required: true
  type: string
name:
  description: "SAJ 太阳能逆变器的可选名称。"
  required: false
  type: string
type:
  description: "连接模块类型：`ethernet` 或 `wifi`"
  required: false
  default: ethernet
  type: string
username:
  description: "登录 SAJ 太阳能逆变器所用的用户名（仅在 `type` 为 `wifi` 时使用；如果逆变器仍使用默认凭据 `admin/admin`，可省略）"
  required: false
  type: string
password:
  description: "登录 SAJ 太阳能逆变器所用的密码（仅在 `type` 为 `wifi` 时使用；如果逆变器仍使用默认凭据 `admin/admin`，可省略）"
  required: false
  type: string
```

## 传感器

此集成提供以下传感器：

| name              | Unit | Description |
| ----------------- | ---- | :---------- |
| current\_power     | W    | 逆变器当前产生的功率。 |
| today\_yield       | kWh  | 今日发电量。 |
| today\_time        | h    | 逆变器今日运行时间。 |
| today\_max\_current | W    | 今日最大输出功率。（仅适用于通过以太网模块连接时） |
| total\_yield       | kWh  | 截至目前的总发电量。 |
| total\_time        | h    | 逆变器累计运行时间。 |
| total\_co2\_reduced | kg   | 累计减少的二氧化碳重量。 |
| temperature       | °C   | 逆变器温度。 |
| state             | N/A  | 逆变器实时状态。 |

## Wi-Fi 逆变器完整配置示例

```yaml
sensor:
  - platform: saj
    name: MY_INVERTER_NAME
    host: IP_ADDRESS_OF_DEVICE
    type: wifi
    username: USERNAME
    password: PASSWORD
```
