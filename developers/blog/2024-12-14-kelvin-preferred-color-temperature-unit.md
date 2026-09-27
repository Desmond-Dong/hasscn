### 变更摘要

2022 年 10 月，Home Assistant 将首选 color temperature 单位从 mired 迁移到了 kelvin。

现在时候到了，我们需要为相应的 attributes、constants 和 properties 添加 deprecation warnings：

* 弃用 state 和 capability attributes：`ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS` 和 `ATTR_MAX_MIREDS`
* 弃用 `light.turn_on` service call 中的常量 `ATTR_KELVIN` 和 `ATTR_COLOR_TEMP`
* 弃用 properties：`LightEntity.color_temp`、`LightEntity.min_mireds` 和 `LightEntity.max_mireds`
* 弃用相应的 attributes：`LightEntity._attr_color_temp`、`LightEntity._attr_min_mired` 和 `LightEntity._attr_max_mired`

### 示例

#### 自定义最小/最大 color temperature

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

#### 默认最小/最大 color temperature

```python
from homeassistant.components.light import DEFAULT_MAX_KELVIN, DEFAULT_MIN_KELVIN

class MyLight(LightEntity):
    """Representation of a light."""

    # 旧无需设置 _attr_min_mireds / _attr_max_mireds
    # 新需要显式设置默认值
    _attr_min_color_temp_kelvin = DEFAULT_MIN_KELVIN
    _attr_max_color_temp_kelvin = DEFAULT_MAX_KELVIN
```

#### 动态最小/最大 color temperature

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

#### Service 调用

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
* [架构讨论 #564](https://github.com/home-assistant/architecture/discussions/564)
