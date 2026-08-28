# AquaLogic

**AquaLogic** 集成可连接 Hayward/Goldline AquaLogic/ProLogic 泳池控制器。请注意，您需要一个连接到泳池控制器的 RS-485 转以太网适配器。

目前，Home Assistant 支持以下设备类型：

* [传感器](#sensor)
* [开关](#switch)

## 配置

要将 AquaLogic 集成添加到您的系统中，请将以下内容添加到 `configuration.yaml` 文件。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
aqualogic:
  host: IP_ADDRESS
  port: PORT
```

```yaml
host:
  description: 连接到泳池控制器的 RS-485 到以太网适配器的域名或 IP 地址，例如 192.168.1.1。
  required: true
  type: string
port:
  description: RS-485 到以太网适配器提供的端口。
  required: true
  type: integer
```

## 传感器

启用 AquaLogic 集成后，将以下内容添加到 `configuration.yaml` 文件：

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: aqualogic
    monitored_conditions:
      - pool_temp
```

```yaml
monitored_conditions:
  description: 您要监控的项目列表。
  required: false
  default: all
  type: list
  keys:
    air_temp:
      description: 空气温度。
    pool_temp:
      description: 泳池温度。
    spa_temp:
      description: 按摩浴缸温度。
    pool_chlorinator:
      description: 泳池消毒器设置。
    spa_chlorinator:
      description: 按摩浴缸消毒器设置。
    salt_level:
      description: 当前盐含量。
    pump_speed:
      description: 当前泵速度（仅限 Hayward VS 泵）。
    pump_power:
      description: 当前泵功率使用（仅限 Hayward VS 泵）。
    status:
      description: 当前系统状态。
```

## 开关

启用 AquaLogic 集成后，将以下内容添加到 `configuration.yaml` 文件：

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: aqualogic
    monitored_conditions:
      - lights
      - filter
```

```yaml
monitored_conditions:
  description: 您要监控/控制的项目列表。
  required: false
  default: all
  type: list
  keys:
    filter:
      description: 控制过滤泵。
    filter_low_speed:
      description: 控制过滤泵的低速模式（仅限多速泵）。
    lights:
      description: 控制灯光继电器。
    aux_1:
      description: 控制 Aux 1 继电器。
    aux_2:
      description: 控制 Aux 2 继电器。
    aux_3:
      description: 控制 Aux 3 继电器。
    aux_4:
      description: 控制 Aux 4 继电器。
    aux_5:
      description: 控制 Aux 5 继电器。
    aux_6:
      description: 控制 Aux 6 继电器。
    aux_7:
      description: 控制 Aux 7 继电器。
```
