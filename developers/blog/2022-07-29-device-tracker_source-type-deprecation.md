对于 Home Assistant Core 2022.9，我们弃用了 `device_tracker` 的 `SOURCE_TYPE_*` 常量。
请改用新的 [`SourceType`](/developers/core/entity/device-tracker.md) enum。

已弃用的常量：

* `SOURCE_TYPE_GPS`
* `SOURCE_TYPE_ROUTER`
* `SOURCE_TYPE_BLUETOOTH`
* `SOURCE_TYPE_BLUETOOTH_LE`
