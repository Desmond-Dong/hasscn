### 变更摘要

2022 年 10 月，Home Assistant 将首选色温单位从 mired 迁移到了 kelvin。

在 [2024 年 2 月](/developers/blog/2024-02-12-light-color-mode-mandatory.md)，Home Assistant 要求显式提供 `supported_color_modes` 和 `color_mode` 属性（触发了对传统 fallback color mode 支持的弃用）。

在 [2024 年 12 月](/developers/blog/2024-12-14-kelvin-preferred-color-temperature-unit.md)，Home Assistant 要求显式支持 Kelvin（触发了对 mired 支持的弃用）。

现在是清理遗留代码并移除相应属性、常量和属性的时候了：

* 移除已弃用的 `ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS`、`ATTR_MAX_MIREDS`、`ATTR_KELVIN`、`COLOR_MODE_***` 和 `SUPPORT_***` 常量
* 移除已弃用的 state 属性 `ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS` 和 `ATTR_MAX_MIREDS`
* 移除 `light.turn_on` 服务调用中对 `ATTR_KELVIN` 和 `ATTR_COLOR_TEMP` 参数的已弃用支持
* 移除 entity 中对 `LightEntity.color_temp`、`LightEntity.min_mireds` 和 `LightEntity.max_mireds` 属性的已弃用支持
* 移除 entity 中对 `LightEntity._attr_color_temp`、`LightEntity._attr_min_mireds` 和 `LightEntity._attr_max_mireds` 简写属性的已弃用支持

此外，未提供有效的 `supported_color_modes` 和 `color_mode` 属性将不再可行，并会引发错误。

### 示例

#### 自定义最小/最大色温

```python
class MyLight(LightEntity):
    """Representation of a light."""

    # 旧
    # _attr_min_mireds = 200 # 5000K
    # _attr_max_mireds = 400 # 2500K

    # 新
    _attr_min_color_temp_kelvin = 2500 # 400 mireds
    _attr_max_color_temp_kelvin = 5000 # 200 mireds
```

#### 默认最小/最大色温

```python
from homeassistant.components.light import DEFAULT_MAX_KELVIN, DEFAULT_MIN_KELVIN

class MyLight(LightEntity):
    """Representation of a light."""

    # 旧方式无需设置 _attr_min_mireds / _attr_max_mireds
    # 新方式需要显式设置默认值
    _attr_min_color_temp_kelvin = DEFAULT_MIN_KELVIN
    _attr_max_color_temp_kelvin = DEFAULT_MAX_KELVIN
```

#### 动态最小/最大色温

```python
from homeassistant.util import color as color_util

class MyLight(LightEntity):
    """Representation of a light."""

    # 旧
    # def min_mireds(self) -> int:
    #     """Return the coldest color_temp that this light supports."""
    #     return device.coldest_temperature
    #
    # def max_mireds(self) -> int:
    #     """Return the warmest color_temp that this light supports."""
    #     return device.warmest_temperature

    # 新
    def min_color_temp_kelvin(self) -> int:
        """Return the warmest color_temp that this light supports."""
        return color_util.color_temperature_mired_to_kelvin(device.warmest_temperature)

    def max_color_temp_kelvin(self) -> int:
        """Return the coldest color_temp that this light supports."""
        return color_util.color_temperature_mired_to_kelvin(device.coldest_temperature)
```

#### 在服务调用中检查色温

```python
from homeassistant.components.light import ATTR_COLOR_TEMP_KELVIN
from homeassistant.util import color as color_util

class MyLight(LightEntity):
    """Representation of a light."""
    def turn_on(self, **kwargs: Any) -> None:
        """Turn on the light."""
        # 旧
        # if ATTR_COLOR_TEMP in kwargs:
        #     color_temp_mired = kwargs[ATTR_COLOR_TEMP]
        #     color_temp_kelvin = color_util.color_temperature_mired_to_kelvin(color_temp_mired)

        # 旧
        # if ATTR_KELVIN in kwargs:
        #     color_temp_kelvin = kwargs[ATTR_KELVIN]
        #     color_temp_mired = color_util.color_temperature_kelvin_to_mired(color_temp_kelvin)

        # 新
        if ATTR_COLOR_TEMP_KELVIN in kwargs:
            color_temp_kelvin = kwargs[ATTR_COLOR_TEMP_KELVIN]
            color_temp_mired = color_util.color_temperature_kelvin_to_mired(color_temp_kelvin)
```

### 背景信息

* [关于 Kelvin 温度的社区讨论](https://community.home-assistant.io/t/wth-is-light-temperature-not-in-kelvin/467449/6)
* [Core PR #79591: 迁移到 Kelvin](https://github.com/home-assistant/core/pull/79591)
* [Architecture discussion #564](https://github.com/home-assistant/architecture/discussions/564)
* [Color modes 文档](/developers/core/entity/light.md#color-modes)
