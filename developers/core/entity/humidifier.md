Humidifier 实体是主要用途为控制湿度的设备，即加湿器或除湿器。从 [`homeassistant.components.humidifier.HumidifierEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/humidifier/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称                    | 类型                                           | 默认值                               | 描述                                        |
| ----------------------- | ---------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| action                  | `HumidifierAction \| None`      | `None`                                | 返回设备的当前状态。          |
| available\_modes         | `list[str] \| None`             | **MODES 必填**                 | 可用的模式。需要 `HumidifierEntityFeature.MODES`。     |
| current\_humidity        | `float \| None`                   | `None`                                | 设备测量的当前湿度。       |
| device\_class            | `HumidifierDeviceClass \| None` | `None`                                | hygrostat 的类型                                  |
| is\_on                   | `bool \| None`                  | `None`                                | 设备是开启还是关闭。                   |
| max\_humidity            | `float`                                          | `DEFAULT_MAX_HUMIDITY`（值 == 100） | 最大湿度。                              |
| min\_humidity            | `float`                                          | `DEFAULT_MIN_HUMIDITY`（值 == 0）   | 最小湿度。                              |
| mode                    | `str \| None`                   | **必填**                          | 当前活动的模式。需要 `HumidifierEntityFeature.MODES`。 |
| target\_humidity         | `float \| None`                   | `None`                                | 设备试图达到的目标湿度。 |
| target\_humidity\_step    | `float \| None`                   | `None`                                | 目标湿度可增加或减少的步长。 |

### 可用的 device class

| 常量                             | 描述                                |
| ------------------------------------ | ------------------------------------------ |
| `HumidifierDeviceClass.DEHUMIDIFIER` | 除湿器                             |
| `HumidifierDeviceClass.HUMIDIFIER`   | 加湿器                               |

### 模式

设备可以有不同的操作模式，并希望向用户展示。它们可以被视为预设或某些设备状态，针对特殊条件具有缩减或增强的功能，即"auto"或"baby"。有几个内置模式会提供翻译，但如果自定义模式能更好地表示设备，也允许添加自定义模式。

| 名称           | 描述                              |
| -------------- | ---------------------------------------  |
| `MODE_NORMAL`  | 无预设激活，正常运行    |
| `MODE_ECO`     | 设备正在运行节能模式  |
| `MODE_AWAY`    | 设备处于 away 模式                   |
| `MODE_BOOST`   | 设备将所有阀门完全打开            |
| `MODE_COMFORT` | 设备处于舒适模式                |
| `MODE_HOME`    | 设备处于 home 模式                   |
| `MODE_SLEEP`   | 设备为睡眠做好了准备             |
| `MODE_AUTO`    | 设备自动控制湿度 |
| `MODE_BABY`    | 设备正在为婴儿优化  |

## 支持的功能

支持的功能通过使用 `HumidifierEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值   | 描述                          |
| ------- | ------------------------------------ |
| `MODES` | 设备支持不同的模式。 |

## 动作

`action` 属性可以返回设备的当前操作状态，即正在加湿还是空闲。这是一个信息性属性。请注意，当设备关闭时，`action` 属性（如果存在）将自动替换为"off"。另请注意，将 `action` 设置为 `off` 不会替代 `is_on` 属性。

`HumidifierAction` 的当前值：

| 名称          | 描述                                |
| ------------- | ------------------------------------------ |
| `HUMIDIFYING` | 设备当前正在加湿。       |
| `DRYING`      | 设备当前正在除湿。     |
| `IDLE`        | 设备已开启但目前未活动。 |
| `OFF`         | 设备已关闭。                |

## 方法

### 设置模式

```python
class MyHumidifierEntity(HumidifierEntity):
    # 实现以下方法之一。

    def set_mode(self, mode: str) -> None:
        """Set new target preset mode."""

    async def async_set_mode(self, mode: str) -> None:
        """Set new target preset mode."""
```

### 设置湿度

如果当前模式不允许调整目标湿度，设备应在此调用时自动更改其模式，以使其成为可能。

```python
class MyHumidifierEntity(HumidifierEntity):
    # 实现以下方法之一。

    def set_humidity(self, humidity: int) -> None:
        """Set new target humidity."""

    async def async_set_humidity(self, humidity: int) -> None:
        """Set new target humidity."""
```

### 开启

```python
class MyHumidifierEntity(HumidifierEntity):
    # 实现以下方法之一。

    def turn_on(self, **kwargs: Any) -> None:
        """Turn the device on."""

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the device on."""
```

### 关闭

```python
class MyHumidifierEntity(HumidifierEntity):
    # 实现以下方法之一。

    def turn_off(self, **kwargs: Any) -> None:
        """Turn the device off."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the device off."""
```
