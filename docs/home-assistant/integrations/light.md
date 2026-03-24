---
title: Light
description: 关于如何在 Home Assistant 中设置灯光的说明。
ha_category:
  - Light
ha_release: pre 0.7
ha_quality_scale: internal
ha_domain: light
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

**Light** 集成可让你跟踪并控制各种灯泡。请阅读对应灯光硬件的集成文档，了解如何启用它。

:::note Building block integration
This light is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this light building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the light building block offers.
:::

## 灯光实体的状态和属性

灯光实体可以具有以下状态：`on` 或 `off`。可用属性列表取决于具体设备。请参阅对应灯光的集成文档。

<p class='img'>
  <img src='/home-assistant/images/integrations/light/state_light.png' alt='显示三盏灯不同状态的截图：`on`、`off` 或 `unavailable`'>
  三盏灯的不同状态示例：`on`、`off` 或 `unavailable`。
</p>

## 默认开启值

若要设置灯光开启时的默认颜色、亮度和过渡值，请创建自定义 `light_profiles.csv` 文件。该文件通常位于包含 "`configuration.yaml`" 的默认配置文件夹中。

`light_profiles.csv` 必须包含表头，格式如下：

```text
id,x,y,brightness,transition
```

`transition` 字段为可选，可以省略。

要为每盏灯定义默认值，应在其实体标识符后添加 `.default` 后缀。例如，对于 `light.ceiling_2`，`profile` 字段应为 `light.ceiling_2.default`。若要为所有灯定义默认值，可使用标识符 `group.all_lights.default`。单独设置始终优先于 `all_lights` 的默认设置。

:::note
如果灯光实体已经处于 `on` 状态，那么默认配置文件中的亮度只有在动作数据属性 `profile` 中显式调用时才会生效，就像其他命名配置文件一样。除非在动作数据中另有指定，否则 `transition` 属性会应用于所有 `light.turn_on`、`light.toggle` 和 `light.turn_off` 动作。

:::
## 动作 `light.turn_on`

打开一盏灯，或通过 [groups](/home-assistant/integrations/group/) 打开多盏灯。

大多数灯光并不支持所有属性。你可以查阅对应灯光的集成文档获取提示，但通常还是需要自行尝试以确认哪些设置有效。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 否 | 指向灯光 `entity_id` 的字符串或字符串列表。若要指定所有灯，请将 `entity_id` 设为 `all`。 |
| `transition`           | 是 | 表示灯光切换到新状态所需时间的数字，单位为秒。 |
| `profile`              | 是 | 字符串，可为某个[内置配置文件](https://github.com/home-assistant/core/blob/master/homeassistant/components/light/light_profiles.csv)（relax、energize、concentrate、reading）的名称，或当前工作目录 `light_profiles.csv` 中定义的自定义配置文件名称。灯光配置文件定义 xy 颜色、亮度和过渡值（若不需要过渡，可设为 0 或完全省略该列）。如果同时提供了配置文件和亮度，则配置文件中的亮度会被覆盖。 |
| `hs_color`             | 是 | 包含两个浮点数的列表，表示灯光目标颜色的色相和饱和度。色相范围为 0-360，饱和度范围为 0-100。 |
| `xy_color`             | 是 | 包含两个浮点数的列表，表示灯光目标颜色的 xy 值，即两个以逗号分隔的 XY 浮点数。 |
| `rgb_color`            | 是 | 包含三个 0 到 255 整数的列表，表示灯光目标 RGB 颜色，即方括号中的三个以逗号分隔的 RGB 整数。 |
| `rgbw_color`           | 是 | 包含四个 0 到 255 整数的列表，表示灯光目标 RGBW 颜色（红、绿、蓝、白），写在方括号中。不支持 RGBW 的灯会忽略此属性。 |
| `rgbww_color`          | 是 | 包含五个 0 到 255 整数的列表，表示灯光目标 RGBWW 颜色（红、绿、蓝、冷白、暖白），写在方括号中。不支持 RGBWW 的灯会忽略此属性。 |
| `color_temp_kelvin`    | 是 | 以 Kelvin 表示目标色温的整数。 |
| `kelvin`               | 是 | （已弃用）请改用 `color_temp_kelvin`。 |
| `color_temp`           | 是 | （已弃用）也可以用 Mired 表示色温。 |
| `color_name`           | 是 | 人类可读的颜色名称字符串，例如 `blue` 或 `goldenrod`。支持所有 [CSS3 颜色名称](https://www.w3.org/TR/css-color-3/#svg-color)。 |
| `brightness`           | 是 | 0 到 255 之间的整数，用于指定亮度。0 表示关闭，1 为最小亮度，255 为该灯支持的最大亮度。 |
| `brightness_pct`       | 是 | 也可以使用百分比指定亮度（0 到 100 之间的数字）。0 表示关闭，1 为最小亮度，100 为该灯支持的最大亮度。 |
| `brightness_step`      | 是 | 按数值增减亮度，范围应为 -255..255。 |
| `brightness_step_pct`  | 是 | 按百分比增减亮度，范围应为 -100..100。 |
| `white`                | 是 | 设为 `True` 时将灯设置为白光模式。请注意，`white` 没有对应的状态属性，因此 `color_mode` 状态属性会被设为 `white`。 |
| `flash`                | 是 | 让灯闪烁，可设为 `short` 或 `long`。 |
| `effect`               | 是 | 应用某种效果，例如 `colorloop` 或 `random`。 |

:::note
要将属性应用到实体，你需要在配置中加入 `data:`。见下方示例。

:::
```yaml
# configuration.yaml 示例条目
automation:
- alias: "检测到移动时打开灯"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_1
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room
      data:
        brightness: 255
        color_temp_kelvin: 2700
```
```yaml
# 楼梯灯带清晨开启，红色
- alias: "楼梯晨间开启"
  triggers:
    - trigger: time
      at: '05:00'
  actions:
    - action: light.turn_on
      target:
        entity_id: light.ledliststair
      data:
        brightness: 130
        rgb_color: [255,0,0]
```
:::note
如果未发送任何数据，且存在默认配置文件，则会应用该默认配置文件。

:::
## 动作 `light.turn_off`

关闭一盏或多盏灯。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 否 | 指向灯光 `entity_id` 的字符串或字符串列表。若要指定所有灯，请将 `entity_id` 设为 `all`。 |
| `transition`           | 是 | 表示灯光切换到新状态所需时间的整数，单位为秒。 |
| `flash`                | 是 | 让灯闪烁，可设为 `short` 或 `long`。 |

## 动作 `light.toggle`

切换一盏或多盏灯的状态。参数与 [`light.turn_on`](#action-lightturn_on) 动作相同。

*注意*：如果将 `light.toggle` 用于一组灯，它会分别切换每盏灯的状态。如果你希望这些灯被视为单个灯，请改用 [Light Groups](/home-assistant/integrations/group#binary-sensor-light-and-switch-groups)。
