---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorTwitter: frenck
title: "弃用所有 SUPPORT_* 常量"
---

从 Home Assistant Core 2022.5 开始，所有 `SUPPORT_*` 常量已被弃用，
每个 entity platform 都提供了一个 `EntityFeature` enum 来替代它们。

这适用于以下 platform：

- **Alarm Control Panel**

  已弃用的 supported feature 常量：

  - `SUPPORT_ALARM_ARM_AWAY`
  - `SUPPORT_ALARM_ARM_CUSTOM_BYPASS`
  - `SUPPORT_ALARM_ARM_HOME`
  - `SUPPORT_ALARM_ARM_NIGHT`
  - `SUPPORT_ALARM_ARM_VACATION`
  - `SUPPORT_ALARM_TRIGGER`

  请改用新的 [`AlarmControlPanelEntityFeature`](/developers/core/entity/alarm-control-panel#supported-features) enum。

- **Camera**

  已弃用的 supported feature 常量：

  - `SUPPORT_ON_OFF`
  - `SUPPORT_STREAM`

  请改用新的 [`CameraEntityFeature`](/developers/core/entity/camera#supported-features) enum。

- **Cover**

  已弃用的 supported feature 常量：

  - `SUPPORT_OPEN`
  - `SUPPORT_CLOSE`
  - `SUPPORT_SET_POSITION`
  - `SUPPORT_STOP`
  - `SUPPORT_OPEN_TILT`
  - `SUPPORT_CLOSE_TILT`
  - `SUPPORT_STOP_TILT`
  - `SUPPORT_SET_TILT_POSITION`

  请改用新的 [`CoverEntityFeature`](/developers/core/entity/cover#supported-features) enum。

- **Climate**

  已弃用的 supported feature 常量：

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_TARGET_TEMPERATURE_RANGE`
  - `SUPPORT_TARGET_HUMIDITY`
  - `SUPPORT_FAN_MODE`
  - `SUPPORT_PRESET_MODE`
  - `SUPPORT_SWING_MODE`
  - `SUPPORT_AUX_HEAT`

  请改用新的 [`ClimateEntityFeature`](/developers/core/entity/climate#supported-features) enum。

- **Humidifier**

  已弃用的 supported feature 常量：

  - `SUPPORT_MODES`

  请改用新的 [`HumidifierEntityFeature`](/developers/core/entity/humidifier#supported-features) enum。

- **Fan**

  已弃用的 supported feature 常量：

  - `SUPPORT_SET_SPEED`
  - `SUPPORT_OSCILLATE`
  - `SUPPORT_DIRECTION`
  - `SUPPORT_PRESET_MODE`

  请改用新的 [`FanEntityFeature`](/developers/core/entity/fan#supported-features) enum。

- **Light**

  已弃用的 supported feature 常量：

  - `SUPPORT_EFFECT`
  - `SUPPORT_FLASH`
  - `SUPPORT_TRANSITION`

  请改用新的 [`LightEntityFeature`](/developers/core/entity/light#supported-features) enum。

  注意，以下 light 常量此前已被弃用，
  因此 `LightEntityFeature` 没有为它们提供替代项。

  - `SUPPORT_BRIGHTNESS`
  - `SUPPORT_COLOR_TEMP`
  - `SUPPORT_COLOR`
  - `SUPPORT_WHITE_VALUE`

  这些情况应迁移到[新的 color modes](/developers/core/entity/light#color-modes)。

- **Lock**

  已弃用的 supported feature 常量：

  - `SUPPORT_OPEN`

  请改用新的 [`LockEntityFeature`](/developers/core/entity/lock#supported-features) enum。

- **Media Player**

  已弃用的 supported feature 常量：

  - `SUPPORT_PAUSE`
  - `SUPPORT_SEEK`
  - `SUPPORT_VOLUME_SET`
  - `SUPPORT_VOLUME_MUTE`
  - `SUPPORT_PREVIOUS_TRACK`
  - `SUPPORT_NEXT_TRACK`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PLAY_MEDIA`
  - `SUPPORT_VOLUME_STEP`
  - `SUPPORT_SELECT_SOURCE`
  - `SUPPORT_STOP`
  - `SUPPORT_CLEAR_PLAYLIST`
  - `SUPPORT_PLAY`
  - `SUPPORT_SHUFFLE_SET`
  - `SUPPORT_SELECT_SOUND_MODE`
  - `SUPPORT_BROWSE_MEDIA`
  - `SUPPORT_REPEAT_SET`
  - `SUPPORT_GROUPING`

  请改用新的 [`MediaPlayerEntityFeature`](/developers/core/entity/media-player#supported-features) enum。

- **Remote**

  已弃用的 supported feature 常量：

  - `SUPPORT_LEARN_COMMAND`
  - `SUPPORT_DELETE_COMMAND`
  - `SUPPORT_ACTIVITY`

  请改用新的 [`RemoteEntityFeature`](/developers/core/entity/remote#supported-features) enum。

- **Siren**

  已弃用的 supported feature 常量：

  - `SUPPORT_DURATION`
  - `SUPPORT_TONES`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_VOLUME_SET`

  请改用新的 [`SirenEntityFeature`](/developers/core/entity/siren#supported-features) enum。

- **Vacuum**

  已弃用的 supported feature 常量：

  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PAUSE`
  - `SUPPORT_STOP`
  - `SUPPORT_RETURN_HOME`
  - `SUPPORT_FAN_SPEED`
  - `SUPPORT_BATTERY`
  - `SUPPORT_STATUS`
  - `SUPPORT_SEND_COMMAND`
  - `SUPPORT_LOCATE`
  - `SUPPORT_CLEAN_SPOT`
  - `SUPPORT_MAP`
  - `SUPPORT_STATE`
  - `SUPPORT_START`

  请改用新的 [`VacuumEntityFeature`](/developers/core/entity/vacuum#supported-features) enum。

- **Water Heater**

  已弃用的 supported feature 常量：

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_OPERATION_MODE`
  - `SUPPORT_AWAY_MODE`

  请改用新的 [`WaterHeaterEntityFeature`](/developers/core/entity/water-heater#supported-features) enum。
