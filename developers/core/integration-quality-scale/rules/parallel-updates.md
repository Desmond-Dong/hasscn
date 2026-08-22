## 原因

某些设备或服务不擅长同时接收大量请求。
为了避免这种情况，Home Assistant 内置了一项限制同时发送给某个设备或服务的请求数量的功能。

该限制将同时应用于实体更新和 action 调用。

我们建议显式设置并行更新数量，并将其视为良好实践。

## 示例实现

在下面的示例中，我们将并行更新数量设置为 1。
这意味着如果 sensor platform 上有多个实体，它们将被逐个更新。
如果不需要限制并行更新数量，可以将其设置为 0。

`sensor.py`

```python {1} showLineNumbers
PARALLEL_UPDATES = 1

class MySensor(SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        ...
```

### 使用 coordinator 时

使用 coordinator 时，数据更新已经集中处理。
这意味着对于只读 platform（`binary_sensor`、`sensor`、`device_tracker`、`event`），可以设置 `PARALLEL_UPDATES = 0`，此时只需考虑 action 调用是否需要设置合适的并行更新数量。

:::note

coordinator 仅集中处理入站数据更新；它不会限制出站 action 调用。
这意味着即使对于使用 coordinator 的 platform，你仍然需要为包含 action 的 platform 考虑合适的并行更新数量（例如，切换 `switch` 或打开 `light`）。

:::

`sensor.py`

```python {1,2} showLineNumbers
# Coordinator is used to centralize the data updates
PARALLEL_UPDATES = 0

class MySensor(CoordinatorEntity, SensorEntity):
    """Representation of a sensor."""

    def __init__(self, device: Device) -> None:
        """Initialize the sensor."""
        ...
```

## 更多资源

关于请求并行性的更多信息，请查阅[相关文档](/developers/integration_fetching_data.md#request-parallelism)。

## 例外

本规则没有例外。
