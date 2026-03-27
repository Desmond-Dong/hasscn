---
title: LIFX
description: 'LIFX 集成会在 Home Assistant 的网络配置(/home-assistant/integrations/network)中已启用的每个网络上，自动发现 LIFX(https://www.lifx.com) 灯具。如果某些 LIFX 灯没有被自动发现，您可以按照下面的配置步骤。'
ha_category:
  - Button
  - Light
ha_iot_class: Local Polling
ha_release: 0.81
ha_config_flow: true
ha_domain: lifx
ha_homekit: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - light
  - select
  - sensor
ha_integration_type: device
ha_dhcp: true
ha_codeowners:
  - '@Djelibeybi'
---
# LIFX

**LIFX** 集成会在 Home Assistant 的[网络配置](/home-assistant/integrations/network)中已启用的每个网络上，自动发现 [LIFX](https://www.lifx.com) 灯具。如果某些 LIFX 灯没有被自动发现，您可以按照下面的配置步骤，在用户界面中逐个手动添加。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 设置状态

LIFX 灯即使在关闭状态下，也允许修改颜色和亮度。这样一来，您就可以在白天预先控制灯光，使其在接收到开启事件时（例如来自运动传感器或外部按钮）立即以正确设置亮起。

普通的 `light.turn_on` 调用无法做到这一点，因为它总会将电源打开。因此，LIFX 提供了专用的 `set_state` 操作，可在不影响当前电源状态的情况下更改颜色。

### 操作：设置状态

`lifx.set_state` 操作用于将灯光切换到新状态。

| 数据属性 | 说明 |
| ---------------------- | ----------- |
| `entity_id` | 指向灯光 `entity_id` 的字符串或字符串列表。使用 `entity_id: all` 可作用于全部。 |
| `transition` | 灯光淡入到新状态所需的时长（秒）。 |
| `zones` | 要影响的分区编号整数列表。详见下方 **Calculating zones to affect**。 |
| `power` | 打开灯光（`True`）或关闭灯光（`False`）。留空则保持当前电源状态。 |
| `...` | 使用 [`light.turn_on`](/home-assistant/integrations/light/#action-lightturn_on) 中的 `color_name`、`brightness` 等参数来指定新状态。 |

#### 计算要影响的分区

LIFX Z 和 LIFX Lightstrip 每个分段都有 8 个分区。单个控制器最多可连接 10 个分段，因此最大分区数为 80。

LIFX Beam 每个分段有 10 个分区，每个转角件有 1 个分区。单个控制器最多可连接 8 个分段和 2 个转角件，因此最大分区数为 82。

所有设备的分区编号都从 0 开始。这意味着 `lifx.set_state` 操作中 `zones` 属性的取值范围，对于 LIFX Z 和 Lightstrip 是 0 到 79，对于 LIFX Beam 是 0 到 81。

## 设置 HEV 循环状态

您可以使用 `set_hev_cycle_state` 操作来控制 LIFX Clean 灯泡中的 HEV LED。该操作可以使用灯泡中配置的默认时长，或在执行时指定自定义时长，以启动或停止一个 HEV（或称 “Clean”）循环。如果执行该操作时指定了不兼容的灯泡，Home Assistant 会返回或记录错误。

要判断当前是否正在运行 HEV 循环，Home Assistant 会为所有支持 HEV 的灯泡提供一个 Clean Cycle 二进制传感器。您可以用它在 HEV 循环开始或停止时触发自动化。为减少网络负载，HEV 循环状态仅每 10 秒检查一次，因此该传感器可能不会立即更新。

### 操作：设置 HEV 循环状态

`lifx.set_hev_cycle_state` 操作用于在 LIFX Clean 灯泡上启动或停止 HEV（或 “Clean”）循环。

| 数据属性 | 说明 |
| ---------------------- | ----------- |
| `entity_id` | 指向 LIFX Clean 灯泡 `entity_id` 的字符串或字符串列表。 |
| `power` | 启动 HEV 循环（`True`）或停止循环（`False`）。 |
| `duration` | HEV 循环时长（秒）。如果省略，则使用默认的两小时（7200 秒）。 |

## 传感器

以下传感器会根据 LIFX 型号提供：

| 传感器 | 说明 |
| ------ | ----------- |
| Clean cycle | 表示 LIFX Clean 灯泡上是否正在进行 HEV 循环 |
| Infrared brightness | 控制 LIFX Nightvision 灯泡上的红外亮度强度 |
| RSSI | 表示任意 LIFX 灯泡当前的 WiFi 信号强度（默认禁用） |

请注意，这些传感器仅每 30 秒更新一次，因此如果状态是在 Home Assistant 外部发生变化，可能不会立即反映当前状态。

## 主题

Home Assistant 为 LIFX 矩阵灯和多分区灯提供了一组预定义主题，每个主题都旨在模拟 LIFX 手机应用中同名主题的效果。

如果要交互式应用主题，请使用设备配置界面中的主题选择下拉框。

如果要在自动化中应用主题，请使用 `select.select_option` 操作。调用 `lifx.effect_move` 操作时也可以应用主题。更多细节请参阅下方 **Light effects** 部分，其中还包括如何为该效果设置自定义主题。

The following themes are available: `autumn`, `blissful`, `bias_lighting`, `calaveras`, `cheerful`, `christmas`, `dream`, `energizing`, `epic`, `evening`, `exciting`, `fantasy`, `focusing`, `gentle`, `halloween`, `hanukkah`, `holly`, `hygge`, `independence`, `intense`, `love`, `kwanzaa`, `mellow`, `party`, `peaceful`, `powerful`, `proud`, `pumpkin`, `relaxing`, `romance`, `santa`, `serene`, `shamrock`, `soothing`, `spacey`, `sports`, `spring`, `stardust`, `thanksgiving`, `tranquil`, `warming`, `zombie`.

### 操作：绘制主题

`lifx.paint_theme` 操作可以绘制上面列出的某个预定义主题，或者您也可以指定自定义调色板来创建自己的主题。您的调色板必须至少包含两种颜色，每种颜色都要以一个包含四个整数值的列表表示，顺序依次为 hue、saturation、brightness 和 kelvin。每个值的允许范围见下文。

如果同时提供 `palette` 和 `theme`，则 `palette` 会覆盖 `theme`。如果两者都未提供，则默认使用 `exciting` 主题。

| 数据属性 | 说明 |
| ---------------------- | ----------- |
| `palette` | （可选，会覆盖 `theme`）由 2 到 16 种颜色组成的列表，每种颜色都是一个值列表，依次表示 hue（0-360）、saturation（0-100）、brightness（0-100）和 kelvin（1500-9000）。每种颜色都必须提供这四个值。 |
| `theme` | （可选，会被 `palette` 覆盖）要绘制到目标灯光上的主题名称。可用主题列表见上文。 |
| `transition` | （可选，默认：1 秒）将主题绘制到目标灯光上的过渡时长（秒）。 |
| `power_on` | （可选，默认：True）设为 `False` 可防止在绘制主题前先打开灯光。 |


## 灯光效果

LIFX 平台支持多种软件控制的灯光效果以及若干硬件效果。您可以通过普通 [`light.turn_on`](/home-assistant/integrations/light/#action-lightturn_on) 操作中的 `effect` 属性，使用默认选项启动这些效果，例如：

```yaml
automation:
  - alias: "..."
    triggers:
      # ...
    actions:
      - action: light.turn_on
        target:
          entity_id: light.office, light.kitchen
        data:
          effect: lifx_effect_pulse
```

不过，如果您想完全控制某个灯光效果，则需要使用其专用操作，例如：

```yaml
script:
  colorloop_start:
    alias: "Start colorloop"
    sequence:
      - action: lifx.effect_colorloop
        target:
          entity_id: group.livingroom
        data:
          brightness: 255
          period: 10
          spread: 30
          change: 35
```

### 硬件效果

Flame（`lifx.effect_flame`）、Morph（`lifx.effect_morph`）、Sky（`lifx.effect_sky`）和 Move（`lifx.effect_move`）效果属于硬件效果，仅适用于特定 LIFX 设备。Flame 和 Morph 可用于 LIFX Tile、Candle、Path、Spot 与 Ceiling，而 Sky 仅可用于 Ceiling。Move 效果则需要 LIFX Z、Lightstrip、Beam、Neon 或 String。

所有硬件效果都可以在不考虑设备当前电源状态的情况下停止或启动，但每个操作的默认行为都是在启动效果时先打开设备。将该操作的 `power_on` 属性设为 `false` 可覆盖此默认行为。

所有可用灯光效果及其选项如下。

### 操作：Pulse 效果

`lifx.effect_pulse` 操作用于运行一种软件闪烁效果：先切换到某种颜色，再切换回来。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.
| `color_name` | A color name such as `red` or `green`.
| `rgb_color` | A list containing three integers representing the RGB color you want the light to be.
| `brightness` | Integer between 1 and 255 for how bright the color should be.
| `brightness_pct` | Alternative to `brightness`. Specify in percent between 1 and 100 for how bright the color should be.
| `period` | The duration of a single pulse (in seconds).
| `cycles` | The total number of pulses.
| `mode` | The way to change between colors. Valid modes: `blink` (default - direct transition to new color for 'period' time with original color between cycles), `breathe` (color fade transition to new color and back to original), `ping` (short pulse of new color), `strobe` (light turns off between color changes), `solid`(light does not return to original color between cycles).
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### 操作：Colorloop 效果

`lifx.effect_colorloop` 操作用于运行一种软件效果，使颜色沿色轮持续循环变化。所有参与的灯光会协同保持相近（但不完全相同）的颜色。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.
| `brightness` | Number between 1 and 255 indicating the brightness of the effect. Leave this out to maintain the current brightness of each participating light.
| `brightness_pct` | Alternative to `brightness`. Specify in percent between 1 and 100 how bright each participating light should be.
| `saturation_min` | Number between 1 and 100 indicating the minimum saturation of the colors in the loop. Leave this out to use the default of 80%.
| `saturation_max` | Number between 1 and 100 indicating the maximum saturation of the colors in the loop. Leave this out to use the default of 100%.
| `period` | Duration (in seconds) between starting a new color change.
| `transition` | Duration (in seconds) where lights are actively changing color.
| `change` | Hue movement per period, in degrees on a color wheel (ranges from 0 to 359).
| `spread` | Maximum color difference between participating lights, in degrees on a color wheel (ranges from 0 to 359).
| `power_on` | Set this to False to skip the effect on lights that are turned off (defaults to True).

### 操作：Flame 效果

`lifx.effect_flame` 操作用于在 LIFX 矩阵设备上运行硬件火焰效果。默认情况下会先打开设备，但可以通过将 `power_on` 设为 `false` 来覆盖。`speed` 属性用于控制火焰速度。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of matrix lights.
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 1s, max: 25s)
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true)

### 操作：Morph 效果

`lifx.effect_morph` 操作用于在 LIFX 矩阵设备上运行硬件 Morph 效果，让彩色光斑在设备上流动。`speed` 属性用于控制运动速度。

您必须为该效果提供 `palette` 或 `theme`，但不能同时提供两者。`palette` 属性允许您选择效果使用的颜色，而 `theme` 属性允许您选择与 LIFX 手机应用中一致的某个预配置主题。

默认情况下，设备会先被打开，但可以通过将 `power_on` 设为 `false` 来覆盖。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of matrix lights. |
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 1s, max: 25s) |
| `palette` | A list of at least 2 and at most 16 HSBK values to use for this effect (optional, overrides theme). |
| `theme` | The theme to use for the effect. See above for a list of available themes (optional, overridden by palette). |
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true) |

### 操作：Sky 效果

`lifx.effect_sky` 操作用于在 LIFX Ceiling 设备上运行硬件 Sky 效果，在设备上呈现动态天空场景。该效果可模拟三种不同类型的天空：Sunrise、Sunset 和 Clouds。

每种天空类型使用的默认值和调色板，都与 LIFX 手机应用保持一致。

| Data attribute | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `entity_id`            | String or list of strings containing the `entity_id` of one or more Ceiling devices |
| `speed` | Duration in seconds for the effect to complete (optional, min: 1s, max: 86400s, default: 50s)      |
| `palette` | A list of 6 colors to use for this effect (optional, see below for details)                      |
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true)               |
| `sky_type` | Either "Sunrise", "Sunset" or "Clouds"                                                          |
| `cloud_saturation_min` | The minimum cloud saturation for the Cloud sky type (optional, default: 50)         |
| `cloud_saturation_max` | The maximum cloud saturation for the Cloud sky type (optional, default: 180)        |

Sky 效果的调色板由三种天空类型共用。要使用自定义调色板，您必须按以下顺序指定全部六个颜色值，每个颜色都包含 hue（0-360）、saturation（0-100）、brightness（0-100）和 kelvin（1500-9000），以修改该效果：

1. Sky：当使用 Clouds 天空类型时的背景天空颜色。灯上的所有像素都会被设置为该颜色，而“云朵”则通过对像素应用不同范围的饱和度值来形成。
2. Night sky：在 Sunrise 或 Sunset 天空类型中，当太阳尚未可见时天空的起始（或结束）颜色。Sunrise 类型会先让整盏灯完全显示这种颜色，然后淡入更亮的颜色，再开始升起“太阳”；Sunset 则是其反向过程。
3. Dawn sky：太阳刚开始出现时的天空颜色。灯光会从 “night sky” 颜色逐渐过渡到这个颜色。
4. Dawn sun：太阳刚开始出现时的颜色。此时背景仍是上面的 “dawn sky”，但太阳已经开始以偏暖的颜色升起。
5. Full sun：太阳覆盖整盏灯时的颜色。随着太阳升起，颜色会从 “dawn sun” 逐渐变化为这个 “full sun” 颜色。背景仍保持 “dawn sky”，但会被明亮的太阳颜色冲淡。
6. Final sun：效果结束时完整太阳的颜色。当太阳已经上升并覆盖整盏灯后，还会经历一个逐渐淡入更冷、更明亮日光的阶段，这就是 “final sun” 颜色。

例如，以下 YAML 会以 Sunrise 天空类型触发 Sky 效果，持续 5 分钟，并使用与 LIFX 手机应用相同的调色板：

```yaml
action: lifx.effect_sky
target:
  entity_id: light.lifx_ceiling
data:
  power_on: true
  speed: 600
  sky_type: Sunrise
  cloud_saturation_min: 50
  cloud_saturation_max: 180
  palette:
    - [200, 100, 100, 3500]  # Sky: blue
    - [241, 100, 1, 3500]  # Night sky: dark purple
    - [189, 100, 8, 3500]  # Dawn sky: dark blue
    - [40, 100, 100, 3500]  # Dawn sun: warm white
    - [40, 50, 100, 3500]  # Full sun: medium white
    - [40, 0, 100, 6500]  # Final sun: cool white
```

### 操作：Move 效果

`lifx.effect_move` 操作用于在 LIFX 多分区设备上运行硬件 Move 效果，使设备当前颜色沿某个方向移动。动画的方向和速度分别由 `direction` 和 `speed` 属性控制。您可以在效果运行期间使用 `lifx.set_state` 操作来更改效果颜色。

如果设备上的所有 LED 都设置为相同颜色，则该效果不会可见；不支持的设备会忽略此效果。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of multizone lights. |
| `speed` | Duration in seconds for the effect to travel the length of the device (min: 0.1s, max: 60s) |
| `direction` | The direction in which the effect will travel, either "right" or "left" (default: right) |
| `theme` | The theme to use for the effect. See above for a list of available themes (optional). |
| `power_on` | Whether to turn the light on before starting the effect (optional, default: true) |

### 操作：停止效果

`lifx.effect_stop` 操作用于执行一个“无效果”的效果，从而停止当前正在运行的任何软件或硬件效果。

| Data attribute | Description |
| ---------------------- | ----------- |
| `entity_id` | String or list of strings that point at `entity_id`s of lights. Use `entity_id: all` to target all.

## 红外亮度

Home Assistant 会为 LIFX Night Vision 灯泡自动创建一个 Infrared Brightness 配置实体。更改该实体的状态会改变灯泡上 LED 的红外亮度。

## 按钮

LIFX 按钮平台会为每个 LIFX 设备创建两个按钮。

### 识别按钮

识别按钮会让灯泡以最大亮度闪烁三次，然后恢复到之前的状态。要成功识别，灯泡必须已通电并已在 Home Assistant 中完成配置。

### 重启按钮

重启按钮会让灯泡以与物理断电重启完全相同的方式重新启动，因此特别适合用于触发灯泡重新发起 DHCP 请求。

## HomeKit Accessory Protocol

大多数 LIFX 设备都通过 HomeKit Accessory Protocol (HAP) 支持 Apple HomeKit。如果某个 LIFX 设备尚未通过 Apple iOS 或 macOS 设备原生添加到 HomeKit，则可以使用支持 HAP 的 [HomeKit Controller](/home-assistant/integrations/homekit_controller) 集成，将其与 Home Assistant 配对。

这使得那些不受 LIFX 集成支持的 LIFX 设备也能在 Home Assistant 中使用。关于如何控制 LIFX Switch，请参阅下文详细说明。

目前，LIFX 集成必须每隔几秒轮询一次设备；相比之下，[HomeKit Controller](/home-assistant/integrations/homekit_controller) 集成则提供推送更新、加密通信，以及显著更少的网络流量。

如果不希望使用某种控制协议的发现结果，可以在 UI 中将其忽略。对于支持 HAP 的 LIFX 设备，如果尚未通过 Apple iOS 或 macOS 设备添加到原生 HomeKit，则会同时被这两种方式发现。您也可以为同一设备同时配置 LIFX 集成和 HomeKit Controller 集成，从而在 Home Assistant 中通过两种协议同时控制它。

## LIFX 开关

LIFX 集成不支持 LIFX Switch。不过，对于运行 [3.90 固件](https://support.lifx.com/en_us/switch-3-90-update-rk4zYiXVq) 或更高版本的 LIFX Switch，可以改用 [HomeKit Controller](/home-assistant/integrations/homekit_controller) 集成。

在将 Switch 接入 Home Assistant 之前，请先按照 LIFX 文档获取 HomeKit 代码，因为集成过程中会用到它。

使用 [HomeKit Controller](/home-assistant/integrations/homekit_controller) 集成时，LIFX Switch 上的每个按钮都会被发现为一个[无状态开关](/home-assistant/integrations/homekit_controller#stateless-switches-and-sensors)，因此不会作为实体显示在 Home Assistant 中。

如果某个继电器被配置为连接到非 LIFX 设备，它则会作为普通开关显示在 Home Assistant 中。

## 发现故障排除

### 灯具

基于 LIFX 和 HomeKit 的 LIFX 灯泡发现，依赖于 Home Assistant 拥有一个连接到与 LIFX 灯泡相同子网的[网络接口](/home-assistant/integrations/network)。如果您使用的是一个与 Home Assistant 不直接相连的隔离 IoT 网络，请使用上文所述的手动配置方法来绕过自动发现。

如果您有多个网络接口，请确保与 LIFX 灯泡所在子网相连的接口已在 Home Assistant 的[网络配置](/home-assistant/integrations/network)中启用。

### 开关

如果您的开关没有被自动发现，或者在配置过程中收到 “_Cannot add pairing as device can no longer be found_” 错误，请[重启您的 LIFX Switch](https://support.lifx.com/troubleshooting-switch-Hk6RWujLd)，因为它们只会在 15 分钟内广播 HomeKit 兼容信息。
