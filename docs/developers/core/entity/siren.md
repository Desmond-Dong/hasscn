---
title: 海妖实体
description: '警报器实体是一种设备，其主要用途是控制警报器设备，例如门铃或门铃。平台实体派生自homeassistant.components.siren.SirenEntity(https://github.com/home-assistant/home-assistant/blob/master/homeassista。'
sidebar_label: 警笛
---
# 海妖实体

警报器实体是一种设备，其主要用途是控制警报器设备，例如门铃或门铃。平台实体派生自[`homeassistant.components.siren.SirenEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/siren/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据或构建将状态更新推送到实体类实例的机制。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ----------------------- | ------ | ------------------------------------- | --------------------------------------------------------------------------------------- |
| is_on | bool | `None` | 设备是否打开或关闭。 |
| available_tones | list or dict | `NotImplementedError()` | 设备上要传递到 `turn_on` 服务操作的可用提示音的列表或字典。如果提供字典，当用户使用语气的字典值时，它会在传递到集成平台之前转换为相应的字典键。需要 `SUPPORT_TONES` 功能。 |

### 音调

设备可以播放不同的音调。集成负责在支持时提供可用的音调。

### 支持的功能

使用按位或 (`|`) 运算符组合支持的功能常量。

| 名称 | 说明 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SirenEntityFeature.TONES` | 该设备支持不同的提示音（提示音可以传递到 `turn_on` 服务操作）。 |
| `SirenEntityFeature.DURATION` | 设备支持设置提示音的持续时间（该持续时间可以传递给 `turn_on` 服务操作）。 |
| `SirenEntityFeature.VOLUME_SET` | 设备支持设置设备的音量级别（音量级别可以传入 `turn_on` 服务操作）。 |


## 方法

### 打开

可以将三个可选输入参数传递到服务操作调用中，每个参数都由支持的功能标志控制。如果在服务操作调用中提供给定输入参数时未设置相应的标志，则基础平台将在传递给集成之前将其从调用中过滤掉。

| 参数名称 | 数据验证 | 支持的功能标志 |
|----------------	|---------------------------------------	|------------------------	|
| `tone` | `vol.Any(vol.Coerce(int), cv.string)` | `SUPPORT_TONES` |
| `duration` | `cv.positive_int` | `SUPPORT_DURATIONS` |
| `volume_level` | `cv.small_float` | `SUPPORT_VOLUME_SET` |

```python
class MySirenEntity(SirenEntity):
    # Implement one of these methods.

    def turn_on(self, **kwargs) -> None:
        """Turn the device on."""

    async def async_turn_on(self, **kwargs) -> None:
        """Turn the device on."""
```

### 关

```python
class MySirenEntity(SirenEntity):
    # Implement one of these methods.

    def turn_off(self, **kwargs):
        """Turn the device off."""

    async def async_turn_off(self, **kwargs):
        """Turn the device off."""
```