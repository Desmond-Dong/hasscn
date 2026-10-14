# deCONZ

[dresden elektronik](https://www.dresden-elektronik.de) 的 [deCONZ](https://www.dresden-elektronik.de/funk/software/deconz.html) 是一款软件，可与 ConBee/RaspBee Zigbee 网关通信，并公开连接到网关的 Zigbee 设备。

Home Assistant 目前支持以下设备类型：

* [报警控制面板](#报警控制面板)
* [二值传感器](#二值传感器)
* [气候](#气候)
* [遮盖](#遮盖)
* [灯光](#灯光)
* [门锁](#门锁)
* [场景](#场景)
* [传感器](#传感器)
* [警报器](#警报器)
* [开关](#开关)

## 运行 deCONZ 的推荐方式

Home Assistant 应用商店中提供了官方 deCONZ 应用（以前称为 deCONZ 插件）。
否则，请使用[社区容器](https://github.com/deconz-community/deconz-docker)来满足您的 deCONZ 需求。

### 支持的设备

有关支持的设备列表，请参阅 [deCONZ wiki](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices)。

## 先决条件

* 如果 Home Assistant 没有自动发现适配器，并且您手动添加集成，则需要 deCONZ 的主机名和端口。
* 如果您运行的是 Home Assistant 的 deCONZ 应用，您可以在 [**设置** > **应用** > **deCONZ**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_deconz) 页面的应用页面上的 **主机名** 下查看主机名。
  * 例如：`core-deconz`
* 如果建议的端口不起作用，请尝试端口 `40850`。
* 运行独立的 deCONZ 实例（非应用安装）需要在 deCONZ 网关和 Home Assistant 之间进行配对：

  * 要允许 Home Assistant 连接到 deCONZ，请进入 Phoscon UI，选择 **设置** > **网关** > **高级**，然后选择 **认证应用** 按钮。
    * 同样的信息也会在 deCONZ 集成的配置流程中显示。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 调试集成

如果您遇到 deCONZ 或集成的问题，可以向日志添加调试打印。

```yaml
logger:
  default: info
  logs:
    pydeconz: debug
    homeassistant.components.deconz: debug
```

## 故障排除

如果您遇到问题并想报告问题，请始终确保您使用的是最新的 [deCONZ 软件版本](https://github.com/dresden-elektronik/deconz-rest-plugin/releases)和[硬件的最新固件](http://deconz.dresden-elektronik.de/deconz-firmware/?C=M;O=D)。

### 没有状态更新

如果实体的状态仅在集成加载时（重启、重新加载、设置期间）在 Home Assistant 中反映，则您的 deCONZ 实例运行位置可能存在 WebSocket 配置问题。deCONZ 集成使用 deCONZ REST API 提供的 WebSocket 端口。如果您运行的是 deCONZ Docker 容器，请确保它正确配置了 WebSocket 端口，以便 deCONZ 可以报告在容器化环境外暴露的端口。此外，请检查可能阻止通过某些端口进行通信的防火墙规则。

## 设备动作

可用动作：`configure`、`deconz.device_refresh` 和 `deconz.remove_orphaned_entries`。

### 动作 `deconz.configure`

使用 [REST-API](https://dresden-elektronik.github.io/deconz-rest-doc/about_rest/) 设置 deCONZ 中设备的属性。

| 数据属性        | 可选 | 描述                                   |
| ---------------------- | -------- | ------------------------------------------- |
| `field`                | 否       | 表示 deCONZ 中特定设备的字符串。          |
| `entity`               | 否       | 表示 deCONZ 中特定设备的 Home Assistant 实体的字符串。 |
| `data`                 | 否       | 数据是一个 JSON 对象，包含您想要更改的数据。 |

必须提供 `entity` 或 `field`。如果两者都存在，`field` 将被解释为与指定 `entity` 对应的设备路径下的子路径：

```json
{ "field": "/lights/1", "data": {"name": "light2"} }
```

```json
{ "entity": "light.light1", "data": {"name": "light2"} }
```

```json
{ "entity": "light.light1", "field: "/state", "data": {"on": true} }
```

```json
{ "field": "/config", "data": {"permitjoin": 60} }
```

### 动作 `deconz.device_refresh`

刷新 Home Assistant 最近重启后添加到 deCONZ 的设备。

:::note
当添加新传感器时，deCONZ 会自动向 Home Assistant 发送信号，但其他设备此时（deCONZ v2.05.35）必须使用此动作手动添加或重启 Home Assistant。

:::

### 动作 `deconz.remove_orphaned_entries`

从实体和设备注册表中删除不再由 deCONZ 提供的条目。

:::note
建议在 Home Assistant Core 重启后使用此动作，以便 deCONZ 集成正确映射到 deCONZ。

:::

## 遥控设备

遥控器（ZHASwitch 类别）不会作为常规实体公开，而是作为名为 `deconz_event` 的事件公开，带有 `id` 和 `event` 的负载。Id 将是 deCONZ 中的设备名称，Event 将是开关的瞬时状态。

根据设备的不同，负载中可能还包含一些设备特定的属性。对于 Aqara 魔方，将公开额外的 `gesture` 属性。对于 tint 遥控器，负载中将包含 `angle` 和 `xy` 属性。Gesture 用于某些 Aqara 魔方特定事件，如：翻转 90 度、翻转 180 度、顺时针和逆时针旋转。但是，将创建一个传感器实体，显示开关的电池电量，由 deCONZ 报告，命名为 sensor.device\_name\_battery\_level。

开关的典型值，事件代码是 4 个数字，其中第一个和最后一个数字在这里很重要。

| 开关代码 | 描述           |
| ----------- | -------------------- |
| 1XXX        | 按钮 #1 到 #8   |
| XXX1        | 按钮长按         |
| XXX2        | 按钮短按释放 |
| XXX3        | 按钮长按释放  |

例如在 Philips Hue 调光器上，2001 表示长按调亮按钮。

对于 IKEA Tradfri 遥控器，第一位数字表示，1 表示中间按钮，2 表示上，3 表示下，4 表示左，5 表示右（例如，"event: 1002" 表示中间按钮短按释放）。

Aqara 魔方的特定手势：

| 手势 | 描述             |
| ------- | ---------------------- |
| 0       | 唤醒                 |
| 1       | 摇动                |
| 2       | 自由落体             |
| 3       | 翻转 90             |
| 4       | 翻转 180            |
| 5       | 在任意面移动       |
| 6       | 在任意面双击 |
| 7       | 顺时针旋转         |
| 8       | 逆时针旋转 |

### 查找您的事件

前往 [**设置** > **开发者工具** > **事件**](https://my.home-assistant.io/redirect/developer_events/)。在 **监听事件** 部分添加 `deconz_event` 并按 **开始监听**。来自 deCONZ 的所有事件现在将显示，通过在监视日志时按下遥控按钮，应该很容易找到您正在寻找的事件。

### 设备触发器

为了简化在自动化中使用遥控设备，deCONZ 集成将它们公开为设备触发器。这将公开按钮按下和旋转的所有可能变化。支持大多数流行品牌的 Zigbee 遥控器。

#### 请求支持新的设备触发器

如果您有尚未支持的 Zigbee 遥控器，可以通过在 Home Assistant Core GitHub 存储库上创建问题来请求支持。这需要设备型号（可从调试日志中获取）以及动作和按钮事件的映射，例如，Hue 调光遥控器型号 "RWL021"，短按开启 1000。

## 示例

### YAML

#### 用无线调光器增减输入数字

```yaml
automation:
  - alias: "'从调光器切换灯'"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 1002
    actions:
      - action: light.toggle
        target:
          entity_id: light.lamp

  - alias: "从调光器增加灯的亮度"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 2002
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri+30, 249] | min }}

  - alias: "从调光器降低灯的亮度"
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          event: 3002
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
        data:
          brightness: >
            {% set bri = state_attr('light.lamp', 'brightness') | int %}
            {{ [bri-30, 0] | max }}

  - alias: '顺时针旋转魔方时开灯'
    initial_state: "on"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: remote_control_1
          gesture: 7
    actions:
      - action: light.turn_on
        target:
          entity_id: light.lamp
```

#### 通过 Müller Licht tint 遥控器更改颜色

```yaml
automation:
  - alias: "响应色轮变化"
    triggers:
      - trigger: event
        event_type: deconz_event
        event_data:
          id: tint_remote_1
          event: 6002
    actions:
      - action: light.turn_on
        data:
          xy_color:
            - '{{ trigger.event.data.xy.0 }}'
            - '{{ trigger.event.data.xy.1 }}'
          entity_id: light.example_color_light_1
    mode: restart
```

#### 彩色闪烁 - 使用 deconz.configure 的 RGB Philips Hue 灯泡

注意：需要在 Philips Hue 灯泡关闭时指定 `on: true` 才能更改颜色。如果指定了 `on: true`，灯泡在闪烁完成后保持亮起。之前的颜色不会保存或恢复。要对灯光组进行彩色闪烁，请将 `/state` 替换为 `/action` 并将灯光组指定为实体。

```yaml
automation:
  - alias: "门铃移动时闪烁 Hue 灯泡"
    triggers:
      - trigger: state
        entity_id: binary_sensor.doorbell_motion
        to: "on"
    actions:
      - action: deconz.configure
        data:
          entity: light.hue_lamp
          field: /state
          data:
            'on': true
            hue: 65535
            sat: 255
            bri: 255
            alert: "breathe"
      - delay: 00:00:15
      - action: deconz.configure
        data:
          entity: light.hue_lamp
          field: "/state"
          data:
            'on': false
```

## 平台

`entity_id` 名称将为 `platform.device_name`，其中 `device_name` 在 deCONZ 中定义。

### 报警控制面板

物理键盘的实体。可以有 4 种不同模式（`arm_away`、`arm_home`、`arm_night` 或 `disarmed`）。更改状态将从键盘发出声音通知。

设备还公开了一种新的事件类型 `deconz_alarm_event`，反映报警控制面板平台中不支持的信号。
负载包含一个事件（`emergency`、`fire`、`invalid_code` 或 `panic`）。

### 二值传感器

支持以下传感器类型：

* 报警信号
* 火灾/烟雾检测
* 开/关检测
* 存在检测
* 振动检测
* 漏水检测

### 气候

有关配置说明，请参阅 [deCONZ 主集成](/home-assistant/integrations/deconz/index.md)。

气候目前代表恒温器。

请注意，气候平台中的设备标识为传感器，因此有一个手动管理的列表定义哪些"传感器"是气候设备。

### 遮盖

遮盖是通风风门或智能窗帘等设备。

### 风扇

deCONZ 的风扇目前是灯光和风扇装置的组合。

### 灯光

灯光平台保留灯光设备和 deCONZ 灯光组。在 deCONZ 中创建的灯光组将在 Home Assistant 中创建为灯光，命名为 `light.group_name_in_deconz`，允许用户仅通过一次 API 调用控制一组灯光。

### 门锁

门锁是 Danalock Zigbee 锁等设备。

### 场景

`entity_id` 名称将为 `scene.group_scene_name`，其中 `group` 是场景所属的组，以及场景的名称，组和名称都在 deCONZ 中定义。

### 传感器

支持以下传感器类型：

* 空气质量传感器
* 电池传感器
* 消耗传感器
* 日光
* 湿度传感器
* 湿度传感器
* 光照传感器
* 功率传感器
* 气压传感器
* 开关
* 温度传感器

开关不会作为普通实体公开，有关更多详细信息，请参阅 [deCONZ 主集成](/home-assistant/integrations/deconz/index.md)。

#### deCONZ 日光传感器

deCONZ 日光传感器是自版本 2.05.12 起内置在 deCONZ 软件中的特殊传感器。它在 Home Assistant 中表示为名为 sensor.daylight 的传感器。传感器的状态值是对应于日光阶段的字符串（以下描述取自 <https://github.com/mourner/suncalc>，deCONZ 实现基于此）：

| 传感器状态      | 描述                                                              |
| ------------- | ------------------------------------------------------------------------ |
| sunrise\_start | 日出（太阳上边缘出现在地平线上）                     |
| sunrise\_end   | 日出结束（太阳下边缘接触地平线）                |
| golden\_hour\_1 | 早晨黄金时刻（柔和光线，摄影的最佳时间）          |
| solar\_noon    | 正午（太阳处于最高位置）                              |
| golden\_hour\_2 | 傍晚黄金时刻                                                      |
| sunset\_start  | 日落开始（太阳下边缘接触地平线）               |
| sunset\_end    | 日落（太阳消失在地平线以下，傍晚民用黄昏开始） |
| dusk          | 黄昏（傍晚航海黄昏开始）                                  |
| nautical\_dusk | 航海黄昏（傍晚天文黄昏开始）                     |
| night\_start   | 夜晚开始（足够暗，适合天文观测）                 |
| nadir         | 天底（夜晚最暗时刻，太阳处于最低位置）   |
| night\_end     | 夜晚结束（早晨天文黄昏开始）                        |
| nautical\_dawn | 航海黎明（早晨航海黄昏开始）                         |
| dawn          | 黎明（早晨航海黄昏结束，早晨民用黄昏开始）     |

传感器还有一个名为"daylight"的属性，当传感器状态为 `golden_hour_1`、`solar_noon` 或 `golden_hour_2` 时，该属性的值为 `true`，否则为 `false`。

这些状态可用作自动化中的触发器（例如，当某个日光阶段开始或结束时触发）或条件（例如，仅在某个日光阶段触发）。

请注意，deCONZ 日光传感器在 Home Assistant 中默认禁用。您可以通过进入 Home Assistant UI 中的 deCONZ 控制器设备手动启用它。

### 警报器

控制声音设备，并可限制信号应响多长时间。

### 开关

开关是电源插头等设备。

`entity_id` 名称将为 `switch.device_name`，其中 `device_name` 在 deCONZ 中定义。
