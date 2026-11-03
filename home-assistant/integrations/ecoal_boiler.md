# eSterownik eCoal.pl Boiler

**eSterownik eCoal.pl Boiler** 集成是由 [esterownik.pl eCoal boiler controller](https://esterownik.pl/nasze-produkty/ecoal) 管理的泵和传感器的基础。

## 配置

要在您的安装中使用 eCoal 泵或传感器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
ecoal_boiler:
  host: YOUR_IP_ADDRESS
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  switches:
    monitored_conditions:
      - central_heating_pump
      - central_heating_pump2
  sensors:
    monitored_conditions:
      - outdoor_temp
      - indoor_temp
```

```yaml
host:
  description: eCoal 控制器的 IP 地址或主机名。
  required: true
  type: string
username:
  description: 用于连接控制器的登录名。
  required: false
  default: admin
  type: string
password:
  description: 用户名的密码。
  required: false
  default: admin
  type: string
switches:
  description: 开关相关配置选项
  required: false
  type: map
  keys:
    monitored_conditions:
      description: 控制器可用的开关源
      required: false
      type: list
      default: 全部（`central_heating_pump`、`central_heating_pump2`、`domestic_hot_water_pump`）
sensors:
  description: 传感器相关配置选项
  required: false
  type: map
  keys:
    monitored_conditions:
      description: 控制器可用的传感器源
      required: false
      type: list
      default: 全部（`outdoor_temp`、`indoor_temp`、`indoor2_temp`、`domestic_hot_water_temp`、`target_domestic_hot_water_temp`、
                    `feedwater_in_temp`、`feedwater_out_temp`、`target_feedwater_temp`、
                    `fuel_feeder_temp`、`exhaust_temp`）
```
