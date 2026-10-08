Siren 实体是主要用途为控制 siren 设备（如门铃或铃声）的设备。从 [`homeassistant.components.siren.SirenEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/siren/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据，或构建一种机制将状态更新推送到实体类实例。
:::

| 名称                    | 类型   | 默认值                               | 描述                                                                             |
| ----------------------- | ------ | ------------------------------------- | --------------------------------------------------------------------------------------- |
| is\_on                   | bool           | `None`                                | 设备是开启还是关闭。                                                        |
| available\_tones         | list 或 dict   | `NotImplementedError()`               | 设备上可用的 tones 列表或字典，传递给 `turn_on` 服务操作。如果提供字典，当用户使用 tone 的 dict 值时，它在传递给集成平台之前会转换为对应的 dict 键。需要 `SirenEntityFeature.TONES` 功能。           |

### 音调

设备可以有不同的 tones。集成在支持时负责提供可用的 tones。

### 支持的功能

支持的功能常量使用按位或（`|`）运算符进行组合。

| 名称                      | 描述                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SirenEntityFeature.TURN_ON`         | 设备可以通过 `turn_on` 服务操作开启。                                                              |
| `SirenEntityFeature.TURN_OFF`        | 设备可以通过 `turn_off` 服务操作关闭。                                                            |
| `SirenEntityFeature.TONES`           | 设备支持不同的 tones（tone 可以传入 `turn_on` 服务操作）。                                |
| `SirenEntityFeature.DURATION`        | 设备支持为 tone 设置持续时间（duration 可以传入 `turn_on` 服务操作）。            |
| `SirenEntityFeature.VOLUME_SET`      | 设备支持设置设备的音量级别（volume level 可以传入 `turn_on` 服务操作）。 |

## 方法

### 开启

`turn_on` 服务操作需要 `SirenEntityFeature.TURN_ON` 功能。

有三个可选输入参数可以传入服务操作调用，每个由支持的功能标志门控。如果在服务操作调用中提供某个输入参数时相应的标志未设置，基础平台将在传递给集成之前从调用中过滤掉它。

| 参数名称       | 数据验证                       	| 支持的功能标志        |
|----------------	|---------------------------------------	|-------------------------------  |
| `tone`         	| `vol.Any(vol.Coerce(int), cv.string)` 	| `SirenEntityFeature.TONES`      |
| `duration`     	| `cv.positive_int`                     	| `SirenEntityFeature.DURATION`   |
| `volume_level` 	| `cv.small_float`                      	| `SirenEntityFeature.VOLUME_SET` |

```python
class MySirenEntity(SirenEntity):
    # 实现以下方法之一。

    def turn_on(self, **kwargs: Any) -> None:
        """Turn the device on."""

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the device on."""
```

### 关闭

`turn_off` 服务操作需要 `SirenEntityFeature.TURN_OFF` 功能。

```python
class MySirenEntity(SirenEntity):
    # 实现以下方法之一。

    def turn_off(self, **kwargs: Any) -> None:
        """Turn the device off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the device off."""
```
