---
title: Yeelight
description: 关于如何在 Home Assistant 中设置 Yeelight WiFi 设备的说明。
ha_category:
  - Light
ha_release: 0.32
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@zewelor'
  - '@shenxn'
  - '@starkillerOG'
  - '@alexyao2015'
ha_domain: yeelight
ha_platforms:
  - binary_sensor
  - light
ha_homekit: true
ha_dhcp: true
ha_zeroconf: true
ha_integration_type: device
---

**Yeelight** 集成可让你在 Home Assistant 中控制 Yeelight Wi-Fi 灯泡。

此集成在 Home Assistant 中支持以下设备类型：

- **Light** - 通过 Yeelight 平台支持灯光。
- **Binary sensor** - 通过 Yeelight 平台支持二进制传感器。目前仅支持吸顶灯的夜灯模式传感器。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### Custom effects

自定义效果只能通过 YAML 配置。要开启效果，可使用 [light.turn_on](/home-assistant/integrations/light/#action-lightturn_on) 动作。

可用的过渡类型有 `RGBTransition`、`HSVTransition`、`TemperatureTransition`、`SleepTransition`。

数组值格式如下：

- RGBTransition: [red, green, blue, duration, brightness]，其中 red/green/blue 为 0 到 255 的数值，duration 为毫秒（最小 50），最终亮度为 1-100（%）。
- HSVTransition: [hue, saturation, duration, brightness]，其中 hue 为 0 到 359，saturation 为 0 到 100，duration 为毫秒（最小 50），最终亮度为 1-100（%）。
- TemperatureTransition: [temp, duration, brightness]，其中 temp 为最终色温（1700 到 6500），duration 为毫秒（最小 50），最终亮度为 1-100（%）。
- SleepTransition: [duration]，其中 duration 为效果时长（毫秒，最小 50）。

有关过渡类型及其参数的更多信息，请参阅 [python-yeelight 文档](https://yeelight.readthedocs.io/en/stable/flow.html)。

```yaml
yeelight:
  custom_effects:
    - name: 'Fire Flicker'
      flow_params:
        count: 0
        transitions:
          - TemperatureTransition: [1900, 1000, 80]
          - TemperatureTransition: [1900, 2000, 60]
          - SleepTransition:       [1000]
```

### Full configuration

此示例展示了如何使用可选配置项。

```yaml
# configuration.yaml 示例
yeelight:
  devices:
    192.168.1.25:
      name: Living Room
      transition: 1000
      use_music_mode: true
      save_on_change: true
  custom_effects:
    - name: 'Fire Flicker'
      flow_params:
        count: 0
        transitions:
          - TemperatureTransition: [1900, 1000, 80]
          - TemperatureTransition: [1900, 2000, 60]
          - SleepTransition:       [1000]
```

```yaml
devices:
  required: false
  description: Yeelight 设备列表。
  type: map
  keys:
    host:
      description: 灯泡的主机名或 IP 地址。
      required: true
      type: map
      keys:
        name:
          description: 设备的友好名称。
          required: false
          type: string
        transition:
          description: 平滑过渡时长（毫秒）。
          required: false
          type: integer
          default: 350
        use_music_mode:
          description: 启用音乐模式。
          required: false
          type: boolean
          default: false
        save_on_change:
          description: 当在 Home Assistant 中更改状态时，将灯泡状态保存到其非易失性存储器中。
          required: false
          type: boolean
          default: false
        nightlight_switch_type:
          description: 添加一个额外实体用于控制夜灯模式（仅限支持该功能的型号）。目前仅支持 `light`。将创建两个灯光实体，一个用于普通模式，另一个用于夜灯模式，二者互斥。
          required: false
          type: string
        model:
          description: "Yeelight 型号。可选值为 `mono1`、`color1`、`color2`、`strip1`、`bslamp1`、`ceiling1`、`ceiling2`、`ceiling3`、`ceiling4`、`ceiling10`、`ceiling13`。该设置用于启用型号特定功能，例如特定色温范围。"
          required: false
          type: string
custom_effects:
  description: 要添加的自定义效果列表。请参考下方示例。
  required: false
  type: map
  keys:
    name:
      description: 效果名称。
      required: true
      type: string
    flow_params:
       description: 效果的流参数。
       required: true
       type: map
       keys:
         count:
            description: 此流运行次数（0 表示无限循环）。
           required: false
           type: integer
           default: 0
         action:
             description: 流结束后执行的动作。可选值为 'recover'、'stay'、'off'。
            required: false
            type: string
            default: recover
         transitions:
            description: 该效果的过渡列表，请参阅[示例](#custom-effects)。
           required: true
           type: list
```

### Music mode

默认情况下，灯泡每分钟最多处理 60 次请求。启用音乐模式后可绕过该限制。在音乐模式下，灯泡会主动连接到集成提供的 socket，并尝试保持连接常开，这并不一定适用于所有场景。
**另请注意，音乐模式下的灯泡断开连接后不会将状态更新为 "unavailable"，这可能导致 Home Assistant 出现延迟。如果连接中断，音乐模式下灯泡首次可能不响应 Home Assistant 指令。若遇到此问题，请在前端将灯关闭再打开，通常即可恢复正常。**

### Initial setup

:::important
在尝试通过 Home Assistant 控制灯之前，你需要先在 Yeelight App 中完成灯泡设置（[Android](https://play.google.com/store/apps/details?id=com.yeelight.cherry)、[IOS](https://apps.apple.com/app/id977125608)）。
在灯泡属性中，你需要启用 "LAN Control"（之前称为 "Developer mode"）。LAN Control 可能仅在灯泡安装最新固件后可用。连接灯泡后可在应用中更新固件。
确定灯泡 IP（可通过路由器、软件、ping 等方式）。
目前没有官方方式切换 LAN 模式，不过你可以参考以下方法：
- [Desktop app](https://community.home-assistant.io/t/727360)
- CLI using the python-miio library: [1](https://community.home-assistant.io/t/312174), [2](https://community.home-assistant.io/t/290404)


:::
### Supported models

:::note
此集成已测试可用于以下型号。如果你使用其他型号且运行正常，欢迎反馈。

:::
| Model ID   | Model number | Product name                                     |
|------------|--------------|--------------------------------------------------|
| `mono`     | YLTD03YL     | Yeelight Serene Eye-Friendly Desk Lamp           |
| `mono1`    | YLDP01YL     | LED Bulb (White)                                 |
| ?          | YLDP05YL     | LED Bulb (White) - 2nd generation                |
| `color1`   | YLDP02YL     | LED Bulb (Color)                                 |
| `color1`   | YLDP03YL     | LED Bulb (Color) - E26                           |
| `color2`   | YLDP06YL     | LED Bulb (Color) - 2nd generation                |
| `color4`   | YLDP13YL     | LED Bulb 1S (Color)                              |
| `color4`   | YLDP04YL     | LED Bulb 1S (Color)                              |
| `color6`   | YLDP13AYL    | LED Bulb 1S (Color)                              |
| `colorb`   | YLDP005      | LED Bulb (Color)                                 |
| `colorc`   | YLDP004-A    | GU10 W1 (Color)                                  |
| `strip1`   | YLDD01YL     | Lightstrip (Color)                               |
| `strip1`   | YLDD02YL     | Lightstrip (Color)                               |
| ?          | YLDD04YL     | Lightstrip (Color)                               |
| `strip6`   | YLDD05YL     | Lightstrip (Color)                               |
| `bslamp1`  | MJCTD01YL    | Xiaomi Mijia Bedside Lamp - Wi-Fi Version!       |
| `bslamp1`  | MJCTD02YL    | Xiaomi Mijia Bedside Lamp II                     |
| `RGBW`     | MJDP02YL     | Mi LED smart Lamp - white and color Wi-Fi Version|
| `lamp`     | MJTD02YL     | Xiaomi Mijia Desk Lamp Pro                       |
| `lamp1`    | MJTD01YL     | Xiaomi Mijia Smart LED Desk Lamp (autodiscovery isn't possible because the device doesn't support mDNS due to the small amount of RAM) |
| `lamp9`    | YLCT03YL     | Yeelight Staria Bedside Lamp Pro                 |
| `lamp15`   | YLTD003      | Yeelight LED Screen Light Bar Pro                |
| `ceiling1` | YLXD01YL     | Yeelight Ceiling Light                           |
| `ceiling2` | YLXD03YL     | Yeelight Ceiling Light - Youth Version           |
| ?          | YLXD62YI     | Yeelight Ceiling Light (Jiaoyue 260)             |
| ?, may be `ceiling3` | YLXD04YL     | Yeelight Ceiling Light (Jiaoyue 450)   |
| `ceiling3` | YLXD05YL     | Yeelight Ceiling Light (Jiaoyue 480)             |
| `ceiling4` | YLXD02YL     | Yeelight Ceiling Light (Jiaoyue 650)             |
| `ceiling10`| YLDL01YL     | Yeelight Meteorite Pendant Light                 |
| `ceiling13`| YLXD01YL     | Yeelight LED Ceiling Light                       |
| `ceil26`   | YLXD76YL     | Yeelight Ceiling Light - Updated HomeKit 23w     |
| ?, may be `ceilb` | YLXD013-B    | Yeelight Arwen Ceiling Light 450C         |
| ?, may be `ceilb` | YLXD013-C    | Yeelight Arwen Ceiling Light 550C         |
| `ceilb`    | YLXD013      | Yeelight Arwen Ceiling Light 450S                |

## Actions

### Action: Set mode

`yeelight.set_mode` 动作用于设置运行模式。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | 仅对指定灯光生效。                                                                            |
| `mode`                    |       no | 运行模式。可选值：'last'、'normal'、'rgb'、'hsv'、'color_flow'、'moonlight'。                 |

### Action: Start flow

`yeelight.start_flow` 动作用于启动包含指定过渡的流。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | 仅对指定灯光生效。                                                                            |
| `count`                   |      yes | 流运行次数（0 表示无限循环）。                                                                 |
| `action`                  |      yes | 流结束后执行的动作。可选值为 'recover'、'stay'、'off'。默认 'recover'。                         |
| `transitions`             |       no | 过渡数组。参见[自定义效果](#custom-effects)。                                                  |

### Action: Set color scene

`yeelight.set_color_scene` 动作会将灯设置为指定 RGB 颜色和亮度。若灯处于关闭状态，将自动打开。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `rgb_color`               |       no | A list containing three integers between 0 and 255 representing the RGB color you want the light to be. Three comma-separated integers that represent the color in RGB, within square brackets.|
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action: Set HSV scene

`yeelight.set_hsv_scene` 动作会将灯设置为指定 HSV 颜色和亮度。若灯处于关闭状态，将自动打开。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `hs_color`                |       no | A list containing two floats representing the hue and saturation of the color you want the light to be. Hue is scaled 0-360, and saturation is scaled 0-100.    |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action: Set color temperature scene

`yeelight.set_color_temp_scene` 动作会将灯设置为指定色温。若灯处于关闭状态，将自动打开。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `kelvin`                  |       no | Color temperature in Kelvin.                                                                |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action: Set color flow scene

`yeelight.set_color_flow_scene` 动作用于启动颜色流。与 [yeelight.start_flow](#action-yeelightstart_flow) 的区别是它调用了不同的 Yeelight API。若灯原本关闭，将自动打开。不同固件在处理复杂流时可能存在差异。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `count`                   |      yes | The number of times to run this flow (0 to run forever).                                    |
| `action`                  |      yes | The action to take after the flow stops. Can be 'recover', 'stay', 'off'. Default 'recover' |
| `transitions`             |       no | Array of transitions. See [custom effects](#custom-effects).                                |

### Action: Set auto delay off scene

`yeelight.set_auto_delay_off_scene` 动作会以指定亮度开灯，并设置定时器在指定分钟后自动关灯。若灯处于关闭状态，将自动打开。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `minutes`                 |       no | The minutes to wait before automatically turning the light off.                             |
| `brightness`              |       no | The brightness value to set (1-100).                                                        |

### Action: Set music mode

`yeelight.set_music_mode` 动作用于启用或禁用 music_mode。

| Data attribute    | Optional | Description                                                                                 |
|---------------------------|----------|---------------------------------------------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific lights.                                                                |
| `music_mode`              |       no | Use 'true' or 'false' to enable / disable music_mode.                                       |


## 故障排除

### 设备发现

Yeelight 设备在 SSDP 中使用了非标准搜索参数，因此在 **SSDP/UPnP Browser** 中不可见。

如果你想检查网络中有哪些设备，可使用 [`async-upnp-client` 库](https://pypi.org/project/async-upnp-client/)，然后运行以下命令：
```bash
upnp-client search \
    --target 239.255.255.250 \
    --target_port 1982 \
    --bind 0.0.0.0 \
    --search_target wifi_bulb
```

你也可以查看 **Zeroconf Browser** 或 **DHCP Browser**，它们可以正确发现 Yeelight 设备。
