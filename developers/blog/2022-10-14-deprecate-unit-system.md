从 Home Assistant Core 2022.11 开始，`IMPERIAL_SYSTEM` 已弃用，由 `US_CUSTOMARY_SYSTEM` 替代。
单位系统的 `is_metric` 和 `name` 属性同样已弃用，不应再使用。

引用该单位系统或这些属性的自定义集成需要进行调整，改为使用实例检查。

正确做法：

```python
if hass.config.units is METRIC_SYSTEM:
    pass

if hass.config.units is US_CUSTOMARY_SYSTEM:
    pass
```

为避免与未来的单位系统混淆，常量 `CONF_UNIT_SYSTEM_IMPERIAL`
和 `CONF_UNIT_SYSTEM_METRIC` 也已弃用，不应再引用：

* 如果它们曾被用于与单位系统的 `name` 进行比较，
  则现在已不再需要。
* 如果它们曾被用于其他目的，则应改为创建本地常量。
