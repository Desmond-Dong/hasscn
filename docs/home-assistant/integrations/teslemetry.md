---
title: Teslemetry
description: 有关如何将遥测技术集成到 Home Assistant 中的说明。
ha_category:
  - Binary sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: teslemetry
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
ha_quality_scale: silver
---

**Teslemetry** 集成可公开与你的 [Teslemetry](https://teslemetry.com/) 订阅关联的 Tesla 车辆和能源站点中的各种命令与传感器。

## 先决条件

你必须拥有一个已激活订阅的 [Teslemetry](https://teslemetry.com) 账户。

2024 年及之后交付的车辆需要配置[虚拟钥匙](https://teslemetry.com/docs/topics/virtualkey)才能执行某些命令。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

以下是 Teslemetry 集成提供的实体。并非所有实体默认启用，也并非所有值都始终可用。
其中 device tracker 平台的实体需要 `Vehicle location` scope，否则会显示为不可用。

### 车辆

|Domain|Name|Enabled|
|---|---|---|
|Binary sensor|Automatic blind spot camera|No|
|Binary sensor|Automatic emergency braking off|No|
|Binary sensor|Battery heater|No|
|Binary sensor|Blind spot collision warning chime|No|
|Binary sensor|BMS full charge|No|
|Binary sensor|Brake pedal|No|
|Binary sensor|Cabin overheat protection actively cooling|No|
|Binary sensor|Cellular|Yes|
|Binary sensor|Charge cable|Yes|
|Binary sensor|Charge enable request|No|
|Binary sensor|Charge port cold weather mode|No|
|Binary sensor|Charger has multiple phases|No|
|Binary sensor|Dashcam|No|
|Binary sensor|DC DC|No|
|Binary sensor|Defrost for preconditioning|No|
|Binary sensor|Drive rail|No|
|Binary sensor|Driver seat belt|No|
|Binary sensor|Driver seat occupied|No|
|Binary sensor|Emergency lane departure avoidance|No|
|Binary sensor|Europe vehicle|No|
|Binary sensor|Fast charger present|No|
|Binary sensor|Front driver door|Yes|
|Binary sensor|Front driver window|Yes|
|Binary sensor|Front passenger door|Yes|
|Binary sensor|Front passenger window|Yes|
|Binary sensor|GPS state|No|
|Binary sensor|Guest mode enabled|No|
|Binary sensor|Hazard lights|No|
|Binary sensor|High beams|No|
|Binary sensor|Homelink nearby|No|
|Binary sensor|HVAC auto mode|No|
|Binary sensor|High voltage interlock loop fault|No|
|Binary sensor|Located at favorite|Yes|
|Binary sensor|Located at home|Yes|
|Binary sensor|Located at work|Yes|
|Binary sensor|Offroad lightbar|No|
|Binary sensor|Passenger seat belt|No|
|Binary sensor|Pin to drive enabled|No|
|Binary sensor|Preconditioning enabled|No|
|Binary sensor|Preconditioning|No|
|Binary sensor|Rear display HVAC|No|
|Binary sensor|Rear driver door|Yes|
|Binary sensor|Rear driver window|Yes|
|Binary sensor|Rear passenger door|Yes|
|Binary sensor|Rear passenger window|Yes|
|Binary sensor|Remote start|No|
|Binary sensor|Right hand drive|No|
|Binary sensor|Scheduled charging pending|No|
|Binary sensor|Seat vent enabled|No|
|Binary sensor|Service mode|No|
|Binary sensor|Speed limited|No|
|Binary sensor|Status|Yes|
|Binary sensor|Supercharger session trip planner|No|
|Binary sensor|Tire pressure warning front left|No|
|Binary sensor|Tire pressure warning front right|No|
|Binary sensor|Tire pressure warning rear left|No|
|Binary sensor|Tire pressure warning rear right|No|
|Binary sensor|Trip charging|No|
|Binary sensor|User present|Yes|
|Binary sensor|Wi-Fi|Yes|
|Binary sensor|Wiper heat|No|
|Button|Flash lights|Yes|
|Button|HomeLink|Yes|
|Button|Honk horn|Yes|
|Button|Keyless driving|Yes|
|Button|Play fart|Yes|
|Button|Wake|Yes|
|Climate|Cabin overheat protection|Yes|
|Climate|Climate|Yes|
|Cover|Charge port door|Yes|
|Cover|Frunk|Yes|
|Cover|Sunroof|No|
|Cover|Trunk|Yes|
|Cover|Vent windows|Yes|
|Device tracker|Location|Yes|
|Device tracker|Origin|No|
|Device tracker|Route|Yes|
|Lock|Charge cable lock|Yes|
|Lock|Lock|Yes|
|Lock|Speed limit|Yes|
|Media player|Media player|Yes|
|Number|Charge current|Yes|
|Number|Charge limit|Yes|
|Select|Seat heater front left|Yes|
|Select|Seat heater front right|Yes|
|Select|Seat heater rear center|No|
|Select|Seat heater rear left|No|
|Select|Seat heater rear right|No|
|Select|Seat heater third row left|No|
|Select|Seat heater third row right|No|
|Select|Steering wheel heater|Yes|
|Sensor|Battery level|Yes|
|Sensor|Battery range|Yes|
|Sensor|BMS state|No|
|Sensor|Brake pedal position|No|
|Sensor|Brick voltage max|No|
|Sensor|Brick voltage min|No|
|Sensor|Charge cable|No|
|Sensor|Charge energy added|Yes|
|Sensor|Charge rate|Yes|
|Sensor|Charger current|Yes|
|Sensor|Charger power|Yes|
|Sensor|Charger voltage|Yes|
|Sensor|Charging|Yes|
|Sensor|Cruise follow distance|No|
|Sensor|Cruise set speed|No|
|Sensor|Current speed limit|No|
|Sensor|DC charging energy in|No|
|Sensor|DC charging power|No|
|Sensor|Distance to arrival|Yes|
|Sensor|Driver temperature setting|No|
|Sensor|Estimate battery range|No|
|Sensor|Exterior color|No|
|Sensor|Fast charger type|No|
|Sensor|Front drive inverter axle speed|No|
|Sensor|Front drive inverter battery voltage|No|
|Sensor|Front drive inverter heatsink temperature|No|
|Sensor|Front drive inverter motor current|No|
|Sensor|Front drive inverter state|No|
|Sensor|Front drive inverter temperature|No|
|Sensor|Front drive unit actual torque|No|
|Sensor|Front drive unit stator temperature|No|
|Sensor|HVAC power state|No|
|Sensor|Ideal battery range|No|
|Sensor|Inside temperature|Yes|
|Sensor|Left temperature request|No|
|Sensor|Odometer|No|
|Sensor|Outside temperature|Yes|
|Sensor|Passenger temperature setting|No|
|Sensor|Power|No|
|Sensor|Rear drive inverter axle speed|No|
|Sensor|Rear drive inverter battery voltage|No|
|Sensor|Rear drive inverter heatsink temperature|No|
|Sensor|Rear drive inverter motor current|No|
|Sensor|Rear drive inverter state|No|
|Sensor|Rear drive inverter temperature|No|
|Sensor|Rear drive unit actual torque|No|
|Sensor|Rear drive unit stator temperature|No|
|Sensor|Rear left drive inverter axle speed|No|
|Sensor|Rear left drive inverter battery voltage|No|
|Sensor|Rear left drive inverter heatsink temperature|No|
|Sensor|Rear left drive inverter motor current|No|
|Sensor|Rear left drive inverter state|No|
|Sensor|Rear left drive inverter temperature|No|
|Sensor|Rear left drive unit actual torque|No|
|Sensor|Rear left drive unit stator temperature|No|
|Sensor|Rear right drive inverter axle speed|No|
|Sensor|Rear right drive inverter battery voltage|No|
|Sensor|Rear right drive inverter heatsink temperature|No|
|Sensor|Rear right drive inverter motor current|No|
|Sensor|Rear right drive inverter state|No|
|Sensor|Rear right drive inverter temperature|No|
|Sensor|Rear right drive unit actual torque|No|
|Sensor|Rear right drive unit stator temperature|No|
|Sensor|Right temperature request|No|
|Sensor|Roof color|No|
|Sensor|Scheduled charging mode|No|
|Sensor|Scheduled charging start time|No|
|Sensor|Scheduled departure time|No|
|Sensor|Secondary drive unit torque command|No|
|Sensor|Sentry mode|Yes|
|Sensor|Shift state|No|
|Sensor|Speed|No|
|Sensor|State of charge at arrival|No|
|Sensor|Time at arrival|Yes|
|Sensor|Time at full charge|Yes|
|Sensor|Time to arrival|Yes|
|Sensor|Time to full charge|Yes|
|Sensor|Tire pressure front left|No|
|Sensor|Tire pressure front right|No|
|Sensor|Tire pressure last measured front left|No|
|Sensor|Tire pressure last measured front right|No|
|Sensor|Tire pressure last measured rear left|No|
|Sensor|Tire pressure last measured rear right|No|
|Sensor|Tire pressure rear left|No|
|Sensor|Tire pressure rear right|No|
|Sensor|Traffic delay|No|
|Sensor|Usable Battery level|No|
|Sensor|Drive unit torque command|No|
|Switch|Auto seat climate left|Yes|
|Switch|Auto seat climate right|Yes|
|Switch|Auto steering wheel heater|Yes|
|Switch|Charge|Yes|
|Switch|Defrost|Yes|
|Switch|Guest mode|Yes|
|Switch|Sentry mode|Yes|
|Switch|Valet mode|Yes|
|Update|Update|Yes|

### 能源站点

|Domain|Name|Enabled|
|---|---|---|
|Binary sensor|Backup capable|Yes|
|Binary sensor|Grid services active|Yes|
|Binary sensor|Grid services enabled|Yes|
|Binary sensor|Grid status|Yes|
|Binary sensor|Storm watch active|Yes|
|Number|Backup reserve|Yes|
|Number|Off grid reserve|Yes|
|Select|Allow export|Yes|
|Select|Operation mode|Yes|
|Sensor|Battery power|Yes|
|Sensor|Consumer imported from battery|No|
|Sensor|Consumer imported from generator|No|
|Sensor|Consumer imported from grid|No|
|Sensor|Consumer imported from solar|No|
|Sensor|Energy left|Yes|
|Sensor|Generator exported|Yes|
|Sensor|Generator power|No|
|Sensor|Grid exported|Yes|
|Sensor|Grid exported from battery|No|
|Sensor|Grid exported from generator|No|
|Sensor|Grid exported from solar|No|
|Sensor|Grid imported|No|
|Sensor|Grid power|Yes|
|Sensor|Grid services exported|No|
|Sensor|Grid services imported|No|
|Sensor|Grid services power|Yes|
|Sensor|Home usage|Yes|
|Sensor|Island status|Yes|
|Sensor|Load power|Yes|
|Sensor|Percentage charged|Yes|
|Sensor|Solar exported|No|
|Sensor|Solar generated|Yes|
|Sensor|Solar power|Yes|
|Sensor|Total pack energy|No|
|Sensor|Version|Yes|
|Sensor|VPP backup reserve|Yes|
|Switch|Allow charging from grid|Yes|
|Switch|Storm watch|Yes|

### 壁挂充电器

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|

### 元数据

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Teslemetry credits|Yes|

## 动作

Teslemetry 提供多个自定义动作，可直接与 Tesla Fleet API 交互。

### 导航到坐标

`teslemetry.navigation_gps_request`

| Field         | Description                | Example                          |
|---------------|----------------------------|----------------------------------|
| device_id     | 车辆的设备 ID               | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| gps           | 坐标字典                    |                                  |
| gps.latitude  | 纬度（度）                  | -27.9699373                      |
| gps.longitude | 经度（度）                  | 153.4081865                      |
| order         | 该目的地的顺序              | 1                                |

### 设置计划充电

`teslemetry.set_scheduled_charging`

| Field     | Description                           | Example                          |
|-----------|---------------------------------------|----------------------------------|
| device_id | 车辆的设备 ID                          | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable    | 启用或禁用计划充电                     | true                             |
| time      | 开始充电时间（HH:MM）                 | 6:00                             |

### 设置计划出发

`teslemetry.set_scheduled_departure`

| Field                           | Description                               | Example                          |
|---------------------------------|-------------------------------------------|----------------------------------|
| device_id                       | 车辆的设备 ID                              | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable                          | 启用或禁用计划出发                         | true                             |
| preconditioning_enabled         | 启用预处理                                 | true                             |
| preconditioning_weekdays_only   | 仅在工作日启用预处理                        | false                            |
| departure_time                  | 计划出发时间（HH:MM）                      | 6:00                             |
| off_peak_charging_enabled       | 启用错峰充电                               | false                            |
| off_peak_charging_weekdays_only | 仅在工作日启用错峰充电                      | false                            |
| end_off_peak_time               | 期望完成充电时间（HH:MM）                  | 5:00                             |

### 代客模式

`teslemetry.valet_mode`

| Field         | Description                  | Example                          |
|---------------|------------------------------|----------------------------------|
| device_id     | 车辆的设备 ID                | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | 启用或禁用代客模式            | true                             |
| pin           | 4 位 PIN 码                  | 1234                             |

### 限速

`teslemetry.speed_limit`

| Field         | Description                   | Example                          |
|---------------|-------------------------------|----------------------------------|
| device_id     | 车辆的设备 ID                 | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | 启用或禁用限速                | true                             |
| pin           | 4 位 PIN 码                   | 1234                             |

### 分时电价

`teslemetry.time_of_use`

| Field         | Description                  | Example                                                                                                          |
|---------------|------------------------------|------------------------------------------------------------------------------------------------------------------|
| device_id     | 能源站点的设备 ID             | 0d462c0c4c0b064b1a91cdbd1ffcbd31                                                                                 |
| tou_settings  | 分时电价设置                  | 详情请参阅 [Tesla Fleet API 文档](https://developer.tesla.com/docs/fleet-api#time_of_use_settings)               |

## 能源仪表板

Tesla Fleet API 仅为 Powerwall 和 Solar 产品提供功率数据，这意味着它们不能直接用于能源仪表板。

你可以基于 `Battery power` 和 `Grid power` 传感器，使用 [Template Sensor](/home-assistant/integrations/template/) 将正负值拆分为导入与导出值，从而计算能量流。
然后可将 `Load power`、`Solar power` 以及模板传感器通过 [Riemann Sum](/home-assistant/integrations/integration/) 把瞬时功率（kW）转换为累计电量（kWh），
并用于能源仪表板。

## 数据更新

Teslemetry 集成会根据车辆类型和配置，结合流式传输与轮询来获取数据。

### 流式传输

对于大多数现代车辆（不包括 2021 年前的 Model S/X），数据会先从车辆实时流式传输到 Teslemetry，再通过 Server-Sent Events（SSE）流式传输到 Home Assistant。这可提供低延迟的传感器与状态更新。要启用流式传输，需要在车辆侧完成特定配置，可在 [Teslemetry Console](https://teslemetry.com/console) 中管理。

### 轮询

旧款车辆（2021 年前 Model S/X）和能源站点使用云端轮询。

-   **旧款车辆：** 每 60 秒轮询一次。
-   **能源站点：** 每 30 秒轮询一次。

该集成的设计不会为轮询数据而唤醒车辆。车辆休眠期间更新会暂停，直到车辆自然唤醒或被交互唤醒。

## 已知限制

-   **车辆休眠：** 集成不会主动唤醒车辆来获取数据。不过，发送命令（如上锁、解锁、空调控制）会唤醒车辆。
-   **速率限制：** 虽然 Teslemetry 会处理与 Tesla 上游的速率限制，但过于激进的自动化可能因频繁轮询或命令触发临时 API 限制。
-   **虚拟钥匙：** 新款车辆需要[虚拟钥匙](https://teslemetry.com/docs/topics/virtualkey)才能操作。请按照 [Teslemetry Console](https://teslemetry.com/console) 中的说明完成设置。

## 故障排除

### 无效令牌

如果 Teslemetry 认证令牌失效或过期，Home Assistant 会提示你重新认证。通常需要在集成配置流程中重新登录。

### 超时

超时可能由 Home Assistant、Teslemetry、Tesla 或车辆本身之间的连接问题导致（例如车辆所在区域蜂窝信号较差）。这通常是临时现象。若持续超时，请联系 `support@teslemetry.com`。

## 示例

### 常见用例

-   **太阳能充电：** 根据太阳能富余发电量自动调整车辆充电电流或状态，最大化可再生能源利用。
-   **智能预处理：** 使用日历事件或定时触发，在出发前自动预处理车内温度。
-   **车库门自动开启：** 在导航接近家时自动打开车库门。

### 自动化

**基于太阳能发电自动充电**

```yaml
automation:
  - alias: "Charge Tesla from Solar"
    trigger:
      - platform: numeric_state
        entity_id: sensor.home_solar_power
        above: 3000
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.my_tesla_charge
      - action: number.set_value
        target:
          entity_id: number.my_tesla_charge_current
        data:
          value: 16
```

**在日历事件前预处理车辆**

```yaml
automation:
  - alias: "Precondition for Work"
    trigger:
      - platform: calendar
        event: start
        offset: "-00:15:00"
        entity_id: calendar.work
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.my_tesla_climate
```

### 蓝图

**基于导航打开车库门**

使用 distance to arrival 传感器精确判断你何时接近特定地点（如家），并打开车库门或其他 cover 实体。需要你正在导航到目标地点，即使你并不需要路线指引。

```yaml
blueprint:
  name: Teslemetry Garage Door Opener
  author: Brett Adams
  description: Opens a garage door when your Tesla is approaching
  domain: automation
  input:
    distance_to_arrival_entity:
      name: Distance to arrival entity
      selector:
        entity:
          filter:
            - integration: teslemetry
              domain: sensor
              device_class: distance
    distance_to_arrival:
      name: Distance to arrival value to trigger open
      selector:
        number:
          min: 0
          max: 100
          step: any
          mode: box
    route_entity:
      name: Route entity
      selector:
        entity:
          filter:
            - integration: teslemetry
              domain: device_tracker
    route_zone:
      name: Route destination
      selector:
        entity:
          filter:
            - domain: zone
    cover_entity:
      name: Garage door entity
      selector:
        entity:
          filter:
            - domain: cover
trigger:
  - platform: numeric_state
    entity_id:
      - !input distance_to_arrival_entity
    below: !input distance_to_arrival
    above: 0
condition:
  - condition: zone
    entity_id: !input route_entity
    zone: !input route_zone
actions:
  - action: cover.open_cover
    target:
      entity_id: !input cover_entity
mode: restart
```
