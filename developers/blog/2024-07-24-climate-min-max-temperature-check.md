从 Home Assistant Core 2024.8 起，我们为 `ClimateEntity` 提供的温度 action call 实现了验证。

集成不再需要在其自己的设置温度方法（`async_set_temperature`/`set_temperature`）中进行此检查。

然而，集成正确指定 `min_temp` 和 `max_temp` 属性非常重要，否则如果验证失败，用户可能无法设置正确的温度。
同样，处理同时可在 `Celsius` 和 `Fahrenheit` 下运行的设备的集成需要相应地转换其 `min_temp` 和 `max_temp` 值。

### 示例

将设备的原生 min/max 值转换为集成指定的 temperature\_unit。

```python

class MyClimateEntity(ClimateEntity):
    """我的 climate entity 的实现。"""

    @property
    def min_temp(self) -> float:
        """返回最低温度。"""
        return TemperatureConverter.convert(
                self.device.min_temp, UnitOfTemperature.CELSIUS, self.temperature_unit
            )

    @property
    def max_temp(self) -> float:
        """返回最高温度。"""
        return TemperatureConverter.convert(
                self.device.max_temp, UnitOfTemperature.CELSIUS, self.temperature_unit
            )

```
