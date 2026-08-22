---
title: "Light entity"
sidebar_label: "Light"
---

Light entity 控制 light source 的 brightness、hue 和 saturation color value、white value、color temperature 和 effect。从 [`homeassistant.components.light.LightEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/light/__init__.py) 派生 platform entities。

## 属性

| Name | Type | Default | Description
| ---- | ---- | ---- | ----
| brightness            | `int \| None`                            | `None` | 该 light 的 brightness，范围在 1..255 之间
| color_mode            | `ColorMode \| None`                      | `None` | Light 的 color mode。返回的 color mode 必须存在于 `supported_color_modes` property 中，除非 light 正在渲染 effect。
| color_temp_kelvin     | `int \| None`                            | `None` | CT color value（单位为 K）。当 light 的 color mode 设为 `ColorMode.COLOR_TEMP` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。
| effect                | `str \| None`                            | `None` | 当前的 effect。如果 light 支持 effect 且当前未渲染任何 effect，则应为 `EFFECT_OFF`。
| effect_list           | `list[str] \| None`                      | `None` | 支持的 effect 列表。
| hs_color              | `tuple[float, float] \| None`            | `None` | Hue 和 saturation color value（float, float）。当 light 的 color mode 设为 `ColorMode.HS` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。
| is_on                 | `bool \| None`                           | `None` | Light entity 是否开启。
| max_color_temp_kelvin | `int \| None`                            | `None` | 该 light 支持的最冷 color_temp_kelvin。
| min_color_temp_kelvin | `int \| None`                            | `None` | 该 light 支持的最暖 color_temp_kelvin。
| rgb_color             | `tuple[int, int, int] \| None`           | `None` | RGB color value（int, int, int）。当 light 的 color mode 设为 `ColorMode.RGB` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。
| rgbw_color            | `tuple[int, int, int, int] \| None`      | `None` | RGBW color value（int, int, int, int）。当 light 的 color mode 设为 `ColorMode.RGBW` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。
| rgbww_color           | `tuple[int, int, int, int, int] \| None` | `None` | RGBWW color value（int, int, int, int, int）。当 light 的 color mode 设为 `ColorMode.RGBWW` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。
| supported_color_modes | `set[ColorMode] \| None`                 | `None` | 标志支持的 color modes。
| xy_color              | `tuple[float, float] \| None`            | `None` | XY color value（float, float）。当 light 的 color mode 设为 `ColorMode.XY` 时，此 property 会复制到 light 的 state attribute 中，否则忽略。

## 颜色模式

Light 必须同时实现 `color_mode` 和 `supported_color_modes`。Supported color modes 通过使用 `ColorMode` 枚举中的值来定义，`color_mode` 必须设为 `supported_color_modes` 中列出的 modes 之一。

设置 `supported_color_modes` 是必需的。未设置它的 light 在写入 state 时会引发 error。

可用的 color modes 有：

| Value | Description
|----------|-----------------------
| `ColorMode.UNKNOWN` | Light 的 color mode 未知。
| `ColorMode.ONOFF` | Light 可以开启或关闭。如果 light 支持此 mode，它必须是唯一支持的 mode。
| `ColorMode.BRIGHTNESS` | Light 可以 dim。如果 light 支持此 mode，它必须是唯一支持的 mode。
| `ColorMode.COLOR_TEMP` | Light 可以 dim，且其 color temperature 出现在 state 中。
| `ColorMode.HS` | Light 可以 dim，且其 color 可以调整。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 的 color 可以通过 `hs_color` 参数设置，通过 `hs_color` property 读取。`hs_color` 是 (h, s) tuple（不含 brightness）。
| `ColorMode.RGB` | Light 可以 dim，且其 color 可以调整。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 的 color 可以通过 `rgb_color` 参数设置，通过 `rgb_color` property 读取。`rgb_color` 是 (r, g, b) tuple（未按 brightness 归一化）。
| `ColorMode.RGBW` | Light 可以 dim，且其 color 可以调整。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 的 color 可以通过 `rgbw_color` 参数设置，通过 `rgbw_color` property 读取。`rgbw_color` 是 (r, g, b, w) tuple（未按 brightness 归一化）。
| `ColorMode.RGBWW` | Light 可以 dim，且其 color 可以调整。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 的 color 可以通过 `rgbww_color` 参数设置，通过 `rgbww_color` property 读取。`rgbww_color` 是 (r, g, b, cw, ww) tuple（未按 brightness 归一化）。
| `ColorMode.WHITE` | Light 可以 dim，且其 color 可以调整。此外，Light 可以设为 white mode。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 可以通过使用 `white` 参数（值为期望的 brightness）设为 white mode。注意，没有 `white` property。如果 `brightness` 和 `white` 都出现在 service action call 中，`white` 参数将更新为 `brightness` 的值。如果支持此 mode，light *必须*同时支持 `ColorMode.HS`、`ColorMode.RGB`、`ColorMode.RGBW`、`ColorMode.RGBWW` 或 `ColorMode.XY` 中的至少一种，且*不能*支持 `ColorMode.COLOR_TEMP`。
| `ColorMode.XY` | Light 可以 dim，且其 color 可以调整。Light 的 brightness 可以通过 `brightness` 参数设置，通过 `brightness` property 读取。Light 的 color 可以通过 `xy_color` 参数设置，通过 `xy_color` property 读取。`xy_color` 是 (x, y) tuple。

注意，在 color modes `ColorMode.RGB`、`ColorMode.RGBW` 和 `ColorMode.RGBWW` 中，`brightness` property 和 color 中都包含 brightness 信息。例如，如果 light 的 brightness 是 128 且 light 的 color 是 (192, 64, 32)，light 的整体 brightness 为：128/255 * max(192, 64, 32)/255 = 38%。

如果 light 处于 `ColorMode.HS`、`ColorMode.RGB` 或 `ColorMode.XY` mode，light 的 state attribute 将包含用 `hs`、`rgb` 和 `xy` color 格式表示的 light color。注意，当 light 处于 `ColorMode.RGB` mode 时，`hs` 和 `xy` state attributes 仅保留 `rgb` color 的 chromaticity，因为 `hs` 和 `xy` pair 不包含 brightness 信息。

如果 light 处于 `ColorMode.RGBW` 或 `ColorMode.RGBWW` mode，light 的 state attribute 将包含用 `hs`、`rgb` 和 `xy` color 格式表示的 light color。Color 转换是通过将 white channel 加到 color 上来近似完成的。

### 白色颜色模式

有两种 white color modes：`ColorMode.COLOR_TEMP` 和 `ColorMode.WHITE`。两种 mode 的区别在于 `ColorMode.WHITE` 不允许调整 color temperature，而 `ColorMode.COLOR_TEMP` 允许调整 color temperature。

具有可调整 color temperature 的 lamp 通常由至少两组 LED 实现，具有不同的 color temperature，通常是一组 warm-white LED 和一组 cold-white LED。
具有不可调整 color temperature 的 light 通常只有一组 white LED。

### 渲染 effect 时的 color mode

在渲染 effect 时，应根据 effect 支持的调整来设置 `color_mode`。如果 effect 不支持任何调整，`color_mode` 应设为 `ColorMode.ONOFF`。
如果 effect 允许调整 brightness，`color_mode` 应设为 `ColorMode.BRIGHTNESS`。

在渲染 effect 时，允许将 `color_mode` 设为比 `supported_color_mode` property 指示的更 restrictive 的 mode：
 - 支持 color 的 light 在由 effect 控制时可以将其 color_mode 设为 `ColorMode.ONOFF` 或 `ColorMode.BRIGHTNESS`
 - 支持 brightness 的 light 在由 effect 控制时可以将其 color_mode 设为 `ColorMode.ONOFF`

## 支持的功能

Supported features 通过使用 `LightEntityFeature` 枚举中的值来定义，
并使用按位或（`|`）运算符组合。

| Value        | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `EFFECT`     | 控制 light source 显示的 effect。 |
| `FLASH`      | 控制 light source 显示的 flash 持续时间。 |
| `TRANSITION` | 控制 color 和 effect 之间 transition 的持续时间。 |

## 方法

### 开启 light device

```python
class MyLightEntity(LightEntity):
    def turn_on(self, **kwargs: Any) -> None:
        """Turn the device on."""

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn device on."""
```

注意，传递给 `async_turn_on` method 时没有 `color_mode`，而是只允许单个 color attribute。
保证 integration 在 `turn_on` call 中只会收到单个 color attribute，并且根据 light 的 `supported_color_modes` property，保证它被 light 支持。为确保这一点，如果 light 不支持相应的 color mode，service action call 中的 color 会在调用 entity 的 `async_turn_on` method 之前进行转换：

| Color type   | Translation
|--------------|-----------------------
| color_temp | 如果不支持则从 service action call 中移除，如果 light 支持则转换为 `hs_color`、`rgb_color`、`rgbw_color`、`rgbww_color` 或 `xy_color`。
| hs_color | 如果不支持则从 service action call 中移除，如果 light 支持则转换为 `rgb_color`、`rgbw_color`、`rgbww_color` 或 `xy_color`。
| rgb_color | 如果不支持则从 service action call 中移除，如果 light 支持则转换为 `rgbw_color`、`rgbww_color`、`hs_color` 或 `xy_color`。
| rgbw_color | 如果不支持则从 service action call 中移除。
| rgbww_color | 如果不支持则从 service action call 中移除。
| xy_color | 如果不支持则从 service action call 中移除，如果 light 支持则转换为 `hs_color`、`rgb_color`、`rgbw_color` 或 `rgbww_color`。

:::tip Scaling brightness

Home Assistant 包含用于 scale brightness 的 utility。

如果 light 支持 brightness，有时 brightness value 需要 scaling：

```python
from homeassistant.util.color import value_to_brightness

BRIGHTNESS_SCALE = (1, 1023)

...

    @property
    def brightness(self) -> int | None:
        """Return the current brightness."""
        return value_to_brightness(BRIGHTNESS_SCALE, self._device.brightness)

```

将 brightness scale 到 device range：

```python
from homeassistant.util.color import brightness_to_value
BRIGHTNESS_SCALE = (1, 1023)

...

class MyLightEntity(LightEntity):
    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn device on."""

        ...

        value_in_range = math.ceil(brightness_to_value(BRIGHTNESS_SCALE, kwargs[ATTR_BRIGHTNESS]))

:::

### 关闭 light device

```python
class MyLightEntity(LightEntity):
    def turn_off(self, **kwargs: Any) -> None:
        """Turn the device off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn device off."""
```
