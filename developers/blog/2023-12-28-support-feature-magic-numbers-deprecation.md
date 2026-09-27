自 Home Assistant Core 2024.1 起，所有用于 supported features 的 magic numbers 用法均已被弃用，并且每个 entity platform 都提供了一个 `EntityFeature` enum 来替代它们。

将有一年的弃用期，magic numbers 将在 2025.1 中停止工作，以确保所有自定义集成作者有时间进行调整。

这适用于以下 platform：

* **Alarm Control Panel**

  请改用新的 [`AlarmControlPanelEntityFeature`](/developers/core/entity/alarm-control-panel.md#supported-features) enum。

* **Camera**

  请改用新的 [`CameraEntityFeature`](/developers/core/entity/camera.md#supported-features) enum。

* **Cover**

  请改用新的 [`CoverEntityFeature`](/developers/core/entity/cover.md#supported-features) enum。

* **Climate**

  请改用新的 [`ClimateEntityFeature`](/developers/core/entity/climate.md#supported-features) enum。

* **Humidifier**

  请改用新的 [`HumidifierEntityFeature`](/developers/core/entity/humidifier.md#supported-features) enum。

* **Fan**

  请改用新的 [`FanEntityFeature`](/developers/core/entity/fan.md#supported-features) enum。

* **Light**

  请改用新的 [`LightEntityFeature`](/developers/core/entity/light.md#supported-features) enum。

* **Lock**

  请改用新的 [`LockEntityFeature`](/developers/core/entity/lock.md#supported-features) enum。

* **Media Player**

  请改用新的 [`MediaPlayerEntityFeature`](/developers/core/entity/media-player.md#supported-features) enum。

* **Remote**

  请改用新的 [`RemoteEntityFeature`](/developers/core/entity/remote.md#supported-features) enum。

* **Siren**

  请改用新的 [`SirenEntityFeature`](/developers/core/entity/siren.md#supported-features) enum。

* **Vacuum**

  请改用新的 [`VacuumEntityFeature`](/developers/core/entity/vacuum.md#supported-features) enum。

* **Water Heater**

  请改用新的 [`WaterHeaterEntityFeature`](/developers/core/entity/water-heater.md#supported-features) enum。
