你是否在为自己的 entity integrations 实现 entities 时，曾经疑惑过为什么必须扩展 `BinarySensorDevice` 而不是 `BinarySensorEntity`？不用再疑惑了，因为我们在 Home Assistant 0.110 中通过重命名所有名称中错误包含 Device 的类解决了这个问题。旧类仍然存在，但使用时将记录警告。

Home Assistant 中的所有 integrations 都已升级。Custom component 作者需要自己进行迁移。你可以使用以下代码片段在保持向后兼容的同时进行迁移：

```python
try:
    from homeassistant.components.binary_sensor import BinarySensorEntity
except ImportError:
    from homeassistant.components.binary_sensor import BinarySensorDevice as BinarySensorEntity
```

以下类已被重命名：

| 旧类名       | 新类名       |
| -------------------- | -------------------- |
| `BinarySensorDevice` | `BinarySensorEntity` |
| `MediaPlayerDevice`  | `MediaPlayerEntity`  |
| `LockDevice`         | `LockEntity`         |
| `ClimateDevice`      | `ClimateEntity`      |
| `CoverDevice`        | `CoverEntity`        |
| `VacuumDevice`       | `VacuumEntity`       |
| `RemoteDevice`       | `RemoteEntity`       |
| `Light`              | `LightEntity`        |
| `SwitchDevice`       | `SwitchEntity`       |
| `WaterHeaterDevice`  | `WaterHeaterEntity`  |
