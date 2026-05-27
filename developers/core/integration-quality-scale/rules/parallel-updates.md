# 指定并行更新数

## 推理

某些设备或服务不喜欢同时接收大量请求。
为了避免这种情况，Home Assistant 有一个内置功能来限制同时发送到设备或服务的请求数量。

这将应用于实体更新和操作调用。

我们认为明确设置并行更新的数量是一个很好的做法。

## 实施示例

在下面的示例中，我们将并行更新数设置为 1。
这意味着如果传感器平台上的实体较多，它们将一一更新。
如果不需要限制并行更新数量，可以设置为0。

ZZ保护0ZZ

```python {1} showLineNumbers
PARALLEL_UPDATES = 1

class MySensor(SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        ...
```

### 使用协调器时

使用协调器时，您已经集中了数据更新。
这意味着您可以为只读平台设置 `PARALLEL_UPDATES = 0`（`binary_sensor`、`sensor`、`device_tracker`、`event`）
并且只有操作调用才需要考虑设置适当数量的并行更新。

ZZ保护0ZZ

```python {1,2} showLineNumbers
# Coordinator is used to centralize the data updates
PARALLEL_UPDATES = 0

class MySensor(CoordinatorEntity, SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        ...
```

## 其他资源

有关请求并行性的更多信息，请检查 [documentation](/developers/integration_fetching_data.md#request-parallelism) 。

## 例外情况

这条规则没有例外。
