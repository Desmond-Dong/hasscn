---
author: John Carr
authorURL: https://github.com/Jc2k
title: "2022.9 的 Bluetooth passive sensor API 变更"
---

对于 Home Assistant Core 2022.9，我们修改了 `PassiveBluetoothProcessorCoordinator` 和 `PassiveBluetoothDataProcessor` bluetooth API，使 `PassiveBluetoothProcessorCoordinator` 负责解析。然后 coordinator 将解析后的数据推送给 `PassiveBluetoothDataProcessor` 实例。

PassiveBluetoothProcessorCoordinator 现在接收一个必填的 update_method 回调，该回调接收 bluetooth advertisements（形式为 BluetoothServiceInfoBleak），并返回应移交给任何订阅的 PassiveBluetoothDataProcessor 的数据：

```python
def my_parser(service_info: BluetoothServiceInfoBleak) -> MyDataClass:
    ...

    return MyDataClass(
        a=some_parsed_data,
        b=some_other_parsed_data,
    )


coordinator = PassiveBluetoothProcessorCoordinator(
    hass,
    _LOGGER,
    address=address,
    mode=BluetoothScanningMode.PASSIVE,
    update_method=my_parser,
)
```

PassiveBluetoothDataProcessor 仍然接收一个 update_method，但它现在接收的不是 BluetoothServiceInfoBleak，而是来自 PassiveBluetoothProcessorCoordinator 的 update_method 返回的数据。它仍然应该像以前一样返回一个 `PassiveBluetoothDataUpdate`：

```python
def sensor_update_to_bluetooth_data_update(
    sensor_update: MyDataClass,
) -> PassiveBluetoothDataUpdate:
    """Convert a sensor update to a bluetooth data update."""
    ...
    return PassiveBluetoothDataUpdate( ... )

processor = PassiveBluetoothDataProcessor(sensor_update_to_bluetooth_data_update)
```

所有内置集成都已完成转换，因此可以查看它们以获取更多示例。

此变更将有助于那些在加载 platform 之前就需要开始解析数据的集成（例如，要加载的 platform 列表取决于 advertisements 中的数据），或者单一 advertisement 驱动多个 platforms 的情况（你不必解析广播两次）。
