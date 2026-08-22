---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: "弃用所有 supported features 的 magic numbers"
---

自 Home Assistant Core 2024.1 起，所有用于 supported features 的 magic numbers 用法均已被弃用，并且每个 entity platform 都提供了一个 `EntityFeature` enum 来替代它们。

将有一年的弃用期，magic numbers 将在 2025.1 中停止工作，以确保所有自定义集成作者有时间进行调整。

这适用于以下 platform：

- **Alarm Control Panel**

  请改用新的 [`AlarmControlPanelEntityFeature`](/developers/core/entity/alarm-control-panel#supported-features) enum。

- **Camera**

  请改用新的 [`CameraEntityFeature`](/developers/core/entity/camera#supported-features) enum。

- **Cover**

  请改用新的 [`CoverEntityFeature`](/developers/core/entity/cover#supported-features) enum。

- **Climate**

  请改用新的 [`ClimateEntityFeature`](/developers/core/entity/climate#supported-features) enum。

- **Humidifier**

  请改用新的 [`HumidifierEntityFeature`](/developers/core/entity/humidifier#supported-features) enum。

- **Fan**

  请改用新的 [`FanEntityFeature`](/developers/core/entity/fan#supported-features) enum。

- **Light**

  请改用新的 [`LightEntityFeature`](/developers/core/entity/light#supported-features) enum。

- **Lock**

  请改用新的 [`LockEntityFeature`](/developers/core/entity/lock#supported-features) enum。

- **Media Player**

  请改用新的 [`MediaPlayerEntityFeature`](/developers/core/entity/media-player#supported-features) enum。

- **Remote**

  请改用新的 [`RemoteEntityFeature`](/developers/core/entity/remote#supported-features) enum。

- **Siren**

  请改用新的 [`SirenEntityFeature`](/developers/core/entity/siren#supported-features) enum。

- **Vacuum**

  请改用新的 [`VacuumEntityFeature`](/developers/core/entity/vacuum#supported-features) enum。

- **Water Heater**

  请改用新的 [`WaterHeaterEntityFeature`](/developers/core/entity/water-heater#supported-features) enum。
