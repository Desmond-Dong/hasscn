---
title: 加湿器实体
sidebar_label: 加湿器
---

加湿器实体是一种主要目的是控制湿度的设备，即加湿器或除湿器。平台实体派生自[`homeassistant.components.humidifier.HumidifierEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/humidifier/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----------------------- | ---------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| action | <code>HumidifierAction &#124; None</code> | `None` | 返回设备的当前状态。 |
| available_modes | <code>list[str] &#124; None</code> | **Required by MODES** | 可用的模式。需要 `SUPPORT_MODES`。 |
| current_humidity | <code>float &#124; None</code> | `None` | 设备测量的当前湿度。 |
| device_class | <code>HumidifierDeviceClass &#124; None</code> | `None` | 恒湿器类型 |
| is_on | <code>bool &#124; None</code> | `None` | 设备是否打开或关闭。 |
| max_humidity | `float` | `DEFAULT_MAX_HUMIDITY` (value == 100) | 最大湿度。 |
| min_humidity | `float` | `DEFAULT_MIN_HUMIDITY` (value == 0) | 最低湿度。 |
| mode | <code>str &#124; None</code> | **Required** | 当前活动模式。需要 `SUPPORT_MODES`。 |
| target_humidity | <code>float &#124; None</code> | `None` | 设备试图达到的目标湿度。 |
| target_humidity_step | <code>float &#124; None</code> | `None` | 可以增加或减少目标湿度支持的步长。 |

### 可用设备类别

| 常量 | 说明 |
| ------------------------------------ | ------------------------------------------ |
| `HumidifierDeviceClass.DEHUMIDIFIER` | 除湿机一台 |
| `HumidifierDeviceClass.HUMIDIFIER` | 加湿器一个 |


### 模式

设备可以具有可能想要向用户显示的不同操作模式。它们可以被视为预设或某些设备状态，针对特殊条件（即“自动”或“婴儿”）减少或增强了功能。有几种内置模式可以提供翻译，但如果可以更好地代表设备，您也可以添加自定义模式。

| 名称 | 说明 |
| -------------- | ---------------------------------------  |
| `MODE_NORMAL` | 没有激活预设，正常运行 |
| `MODE_ECO` | 设备正在运行节能模式 |
| `MODE_AWAY` | 设备处于离开模式 |
| `MODE_BOOST` | 装置将所有阀门全开 |
| `MODE_COMFORT` | 设备处于舒适模式 |
| `MODE_HOME` | 设备处于家庭模式 |
| `MODE_SLEEP` | 设备已准备好睡眠 |
| `MODE_AUTO` | 设备自行控制湿度 |
| `MODE_BABY` | 设备正在尝试针对婴儿进行优化 |

## 支持的功能

支持的功能通过使用 `HumidifierEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| ------- | ------------------------------------ |
| `MODES` | 该设备支持不同的模式。 |

## 行动

`action` 属性可以返回设备的当前操作状态，无论是加湿还是空闲。这是一个信息属性。请注意，当设备关闭时，`action` 属性（如果存在）将自动替换为“off”。另请注意，将 `action` 设置为 `off` 不会替换 `is_on` 属性。

`HumidifierAction` 的当前值：

| 名称 | 说明 |
| ------------- | ------------------------------------------ |
| `HUMIDIFYING` | 设备当前正在加湿。 |
| `DRYING` | 设备当前正在除湿。 |
| `IDLE` | 该设备已打开但目前未处于活动状态。 |
| `OFF` | 设备已关闭。 |

## 方法

### 设置模式

```python
class MyHumidifierEntity(HumidifierEntity):
    # Implement one of these methods.

    def set_mode(self, mode):
        """Set new target preset mode."""

    async def async_set_mode(self, mode):
        """Set new target preset mode."""
```

### 设置湿度

如果当前模式不允许调整目标湿度，则设备应自动将其模式更改为在此调用时可以调整的模式。

```python
class MyHumidifierEntity(HumidifierEntity):
    # Implement one of these methods.

    def set_humidity(self, humidity):
        """Set new target humidity."""

    async def async_set_humidity(self, humidity):
        """Set new target humidity."""
```

### 打开

```python
class MyHumidifierEntity(HumidifierEntity):
    # Implement one of these methods.

    def turn_on(self, **kwargs):
        """Turn the device on."""

    async def async_turn_on(self, **kwargs):
        """Turn the device on."""
```

### 关

```python
class MyHumidifierEntity(HumidifierEntity):
    # Implement one of these methods.

    def turn_off(self, **kwargs):
        """Turn the device off."""

    async def async_turn_off(self, **kwargs):
        """Turn the device off."""
```