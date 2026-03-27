---
title: 光实体
description: '灯光实体控制光源的亮度、色调和饱和度颜色值、白色值、色温和效果。平台实体派生自homeassistant.components.light.LightEntity(https://github.com/home-assistant/core/blob/dev/homeassistant/components/。'
sidebar_label: 光
---
# 光实体

灯光实体控制光源的亮度、色调和饱和度颜色值、白色值、色温和效果。平台实体派生自[`homeassistant.components.light.LightEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/light/__init__.py)。

## 特性

| 名称 | 类型 | 默认值 | 说明
| ---- | ---- | ---- | ----
| brightness | <code>int &#124; None</code> | `None` | 该灯的亮度在 1..255 之间
| color_mode | <code>ColorMode &#124; None</code> | `None` | 灯光的颜色模式。返回的颜色模式必须存在于 `supported_color_modes` 属性中，除非灯光正在渲染效果。
| color_temp_kelvin | <code>int &#124; None</code> | `None` | K 中的 CT 颜色值。当灯光的颜色模式设置为 `ColorMode.COLOR_TEMP` 时，此属性将被复制到灯光的状态属性，否则将被忽略。
| effect | <code>str &#124; None</code> | `None` | 目前的效果。如果灯光支持效果且当前未渲染任何效果，则应为 `EFFECT_OFF`。
| effect_list | <code>list[str] &#124; None</code> | `None` | 支持的效果列表。
| hs_color | <code>tuple[float, float] &#124; None</code> | `None` | 色调和饱和度颜色值（float、float）。当灯光的颜色模式设置为 `ColorMode.HS` 时，此属性将被复制到灯光的状态属性，否则将被忽略。
| is_on | <code>bool &#124; None</code> | `None` | 光实体是否亮起。
| max_color_temp_kelvin | <code>int &#124; None</code> | `None` | 该灯支持的最冷 color_temp_kelvin。
| min_color_temp_kelvin | <code>int &#124; None</code> | `None` | 该灯支持的最暖 color_temp_kelvin。
| rgb_color | <code>tuple[int, int, int] &#124; None</code> | `None` | rgb 颜色值（int、int、int）。当灯光的颜色模式设置为 `ColorMode.RGB` 时，此属性将被复制到灯光的状态属性，否则将被忽略。
| rgbw_color | <code>tuple[int, int, int, int] &#124; None</code> | `None` | rgbw 颜色值（int、int、int、int）。当灯光的颜色模式设置为 `ColorMode.RGBW` 时，此属性将被复制到灯光的状态属性，否则将被忽略。
| rgbww_color | <code>tuple[int, int, int, int, int] &#124; None</code> | `None` | rgbww 颜色值（int、int、int、int、int）。当灯光的颜色模式设置为 `ColorMode.RGBWW` 时，此属性将被复制到灯光的状态属性，否则将被忽略。
| supported_color_modes | <code>set[ColorMode] &#124; None</code> | `None` | 标记支持的颜色模式。
| xy_color | <code>tuple[float, float] &#124; None</code> | `None` | xy 颜色值（浮点型、浮点型）。当灯光的颜色模式设置为 `ColorMode.XY` 时，此属性将被复制到灯光的状态属性，否则将被忽略。

## 色彩模式

新集成必须同时实现 `color_mode` 和 `supported_color_modes`。如果集成升级为支持颜色模式，则应同时实现 `color_mode` 和 `supported_color_modes`。

支持的颜色模式是通过使用 `ColorMode` 枚举中的值来定义的。

如果灯光未实现 `supported_color_modes`，则 `LightEntity` 将尝试根据 `supported_features` 属性中已弃用的标志来推断它：

 - 从一个空集开始
 - 如果设置了 `SUPPORT_COLOR_TEMP`，则添加 `ColorMode.COLOR_TEMP`
 - 如果设置了 `SUPPORT_COLOR`，则添加 `ColorMode.HS`
 - 如果设置了 `SUPPORT_WHITE_VALUE`，则添加 `ColorMode.RGBW`
 - 如果设置了 `SUPPORT_BRIGHTNESS` 并且尚未添加颜色模式，请添加 `ColorMode.BRIGHTNESS`
 - 如果尚未添加颜色模式，请添加 `ColorMode.ONOFF`

如果灯光未实现 `color_mode`，`LightEntity` 将尝试根据设置的属性和 `None` 的属性来推断它：

- 如果 `supported_color_modes` 包含 `ColorMode.RGBW` 并且 `white_value` 和 `hs_color` 都不为 None：`ColorMode.RGBW`
- 否则，如果 `supported_color_modes` 包含 `ColorMode.HS` 并且 `hs_color` 不为 None：`ColorMode.HS`
- 否则，如果 `supported_color_modes` 包含 `ColorMode.COLOR_TEMP` 并且 `color_temp` 不为 None：`ColorMode.COLOR_TEMP`
- 否则，如果 `supported_color_modes` 包含 `ColorMode.BRIGHTNESS` 并且 `brightness` 不为 None：`ColorMode.BRIGHTNESS`
- 否则如果 `supported_color_modes` 包含 `ColorMode.ONOFF`: `ColorMode.ONOFF`
- 其他：ColorMode.UNKNOWN

| 值 | 说明
|----------|-----------------------
| `ColorMode.UNKNOWN` | 灯光的颜色模式未知。
| `ColorMode.ONOFF` | 灯可以打开或关闭。如果灯光支持，此模式必须是唯一支持的模式。
| `ColorMode.BRIGHTNESS` | 灯光可以调暗。如果灯光支持，此模式必须是唯一支持的模式。
| `ColorMode.COLOR_TEMP` | 灯光可以调暗并且其色温存在于状态中。
| `ColorMode.HS` | 灯光可以调暗，颜色也可以调整。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。灯光的颜色可以使用 `hs_color` 参数设置并通过 `hs_color` 属性读取。 `hs_color` 是一个 (h, s) 元组（无亮度）。
| `ColorMode.RGB` | 灯光可以调暗，颜色也可以调整。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。灯光的颜色可以使用 `rgb_color` 参数设置并通过 `rgb_color` 属性读取。 `rgb_color` 是一个 (r, g, b) 元组（未标准化亮度）。
| `ColorMode.RGBW` | 灯光可以调暗，颜色也可以调整。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。灯光的颜色可以使用 `rgbw_color` 参数设置并通过 `rgbw_color` 属性读取。 `rgbw_color` 是一个 (r, g, b, w) 元组（未标准化亮度）。
| `ColorMode.RGBWW` | 灯光可以调暗，颜色也可以调整。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。灯光的颜色可以使用 `rgbww_color` 参数设置并通过 `rgbww_color` 属性读取。 `rgbww_color` 是一个 (r, g, b, cw, ww) 元组（未标准化亮度）。
| `ColorMode.WHITE` | 灯光可以调暗，颜色也可以调整。此外，灯光可以设置为白色模式。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。可以使用 `white` 参数将灯光设置为白色模式，并将所需的亮度作为值。请注意，没有 `white` 属性。如果服务操作调用中同时存在 `brighthness` 和 `white`，则 `white` 参数将更新为 `brightness` 的值。如果支持此模式，则灯*必须*还支持 `ColorMode.HS`、`ColorMode.RGB`、`ColorMode.RGBW`、`ColorMode.RGBWW` 或 `ColorMode.XY` 中的至少一种，并且*不得*支持 `ColorMode.COLOR_TEMP`。
| `ColorMode.XY` | 灯光可以调暗，颜色也可以调整。灯光的亮度可以使用 `brightness` 参数设置并通过 `brightness` 属性读取。灯光的颜色可以使用 `xy_color` 参数设置并通过 `xy_color` 属性读取。 `xy_color` 是一个 (x, y) 元组。

请注意，在颜色模式 `ColorMode.RGB`、`ColorMode.RGBW` 和 `ColorMode.RGBWW` 中，灯光的 `brightness` 属性和颜色中都有亮度信息。例如，如果灯光的亮度为 128，灯光的颜色为 (192, 64, 32)，则灯光的整体亮度为：128/255 * max(192, 64, 32)/255 = 38%。

如果灯光处于 `ColorMode.HS`、`ColorMode.RGB` 或 `ColorMode.XY` 模式，则灯光的状态属性将包含以 `hs`、`rgb` 和 `xy` 颜色格式表示的灯光颜色。请注意，当灯光处于 `ColorMode.RGB` 模式时，`hs` 和 `xy` 状态属性仅保存 `rgb` 颜色的色度，因为 `hs` 和 `xy` 对不保存亮度信息。

如果灯光处于 `ColorMode.RGBW` 或 `ColorMode.RGBWW` 模式，则灯光的状态属性将包含以 `hs`、`rgb` 和 `xy` 颜色格式表示的灯光颜色。颜色转换是通过将白色通道添加到颜色中来完成的近似值。

### 白色模式

有两种白色模式：`ColorMode.COLOR_TEMP` 和 `ColorMode.WHITE`。两种模式之间的区别在于 `ColorMode.WHITE` 不允许调整色温，而 `ColorMode.COLOR_TEMP` 允许调整色温。

色温可调的灯通常由至少两组具有不同色温的LED来实现，通常是一组暖白光LED和一组冷白光LED。
色温不可调节的灯通常只有一组白色 LED。

### 渲染效果时的颜色模式

渲染效果时，`color_mode`应根据支持的调整进行设置
影响。如果效果不支持任何调整，则 `color_mode` 应设置为 `ColorMode.ONOFF`。
如果效果允许调节亮度，则`color_mode`应设置为`ColorMode.BRIGHTNESS`。

渲染效果时，可以将 `color_mode` 设置为比颜色模式更严格的模式
由 `supported_color_mode` 属性表示：
 - 当受效果控制时，支持颜色的灯光可以将 color_mode 设置为 `ColorMode.ONOFF` 或 `ColorMode.BRIGHTNESS`
 - 支持亮度的灯光在受效果控制时可以将 color_mode 设置为 `ColorMode.ONOFF`

## 支持的功能

支持的功能通过使用 `LightEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------------ | -------------------------------------------------------------- |
| `EFFECT` | 控制光源显示的效果 |
| `FLASH` | 控制光源显示闪光的持续时间 |
| `TRANSITION` | 控制颜色和效果之间过渡的持续时间 |

## 方法

### 打开灯光设备

```python
class MyLightEntity(LightEntity):
    def turn_on(self, **kwargs):
        """Turn the device on."""

    async def async_turn_on(self, **kwargs):
        """Turn device on."""
```

请注意，没有 `color_mode` 传递给 `async_turn_on` 方法，而是只允许单个颜色属性。
确保集成仅在 `turn_on` 调用中接收单一颜色属性，根据灯光的 `supported_color_modes` 属性保证该灯光支持该颜色属性。为了确保这一点，如果灯光不支持相应的颜色模式，则在调用实体的 `async_turn_on` 方法之前，将转换服务操作调用中的颜色：

| 颜色类型 | 转换
|--------------|-----------------------
| color_temp | 如果不支持，将从服务操作调用中删除，如果灯光支持，则转换为 `hs_color`、`rgb_color`、`rgbw_color`、`rgbww_color` 或 `xy_color`。
| hs_color | 如果不支持，将从服务操作调用中删除，如果灯光支持，则转换为 `rgb_color`、`rgbw_color`、`rgbww_color` 或 `xy_color`。
| rgb_color | 如果不支持，将从服务操作调用中删除，如果灯光支持，则转换为 `rgbw_color`、`rgbww_color`、`hs_color` 或 `xy_color`。
| rgbw_color | 如果不支持，将从服务操作调用中删除。
| rgbww_color | 如果不支持，将从服务操作调用中删除。
| xy_color | 如果不支持，将从服务操作调用中删除，如果灯光支持，则转换为 `hs_color`、`rgb_color`、`rgbw_color` 或 `rgbww_color`。

:::tip 缩放亮度

Home Assistant 包含一个调节亮度的实用程序。

如果灯光支持亮度，有时亮度值需要缩放：

```python
from homeassistant.util.color import value_to_brightness

BRIGHTNESS_SCALE = (1, 1023)

...

    @property
    def brightness(self) -> Optional[int]:
        """Return the current brightness."""
        return value_to_brightness(BRIGHTNESS_SCALE, self._device.brightness)

```

要将亮度缩放到设备范围：

```python
from homeassistant.util.color import brightness_to_value
BRIGHTNESS_SCALE = (1, 1023)

...

class MyLightEntity(LightEntity):
    async def async_turn_on(self, **kwargs) -> None:
        """Turn device on."""

        ...

        value_in_range = math.ceil(brightness_to_value(BRIGHTNESS_SCALE, kwargs[ATTR_BRIGHTNESS]))

:::

### Turn Off Light Device

```python
类 MyLightEntity(LightEntity):
defturn_off(self, **kwargs):
“”“关闭设备。”“”

异步 def async_turn_off(self, **kwargs):
“”“关闭设备。”“”
```