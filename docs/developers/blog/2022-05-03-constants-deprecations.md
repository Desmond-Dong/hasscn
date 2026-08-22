---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorTwitter: frenck
title: "2022.5 的常量弃用"
---

对于 Home Assistant Core 2022.5，我们弃用了许多常量并用 enums 替换它们。

所有 `SUPPORT_*` 常量已被弃用，并在[之前发布的博文](/developers/blog/2022-04-02-support-constants-deprecation)中进行了总结。

此外，以下常量已被弃用：

- **Alarm Control Panel**

  已弃用的常量：

  - `FORMAT_TEXT`
  - `FORMAT_NUMBER`

  请改用新的 [`CodeFormat`](/developers/core/entity/alarm-control-panel#code-formats) enum。

- **Camera**

  已弃用的常量：

  - `STREAM_TYPE_HLS`
  - `STREAM_TYPE_WEB_RTC`

  请改用新的 [`StreamType`](/developers/core/entity/camera#properties) enum。

- **Climate**

  已弃用的常量：

  - `CURRENT_HVAC_COOL`
  - `CURRENT_HVAC_DRY`
  - `CURRENT_HVAC_FAN`
  - `CURRENT_HVAC_HEAT`
  - `CURRENT_HVAC_IDLE`
  - `CURRENT_HVAC_OFF`
  - `HVAC_MODE_AUTO`
  - `HVAC_MODE_COOL`
  - `HVAC_MODE_DRY`
  - `HVAC_MODE_FAN_ONLY`
  - `HVAC_MODE_HEAT_COOL`
  - `HVAC_MODE_HEAT`
  - `HVAC_MODE_OFF`

  请改用新的 [`HVACAction`](/developers/core/entity/climate#hvac-action) 和 [`HVACMode`](/developers/core/entity/climate#hvac-modes) enums。

- **Light**

  已弃用的常量：

  - `COLOR_MODE_UNKNOWN`
  - `COLOR_MODE_ONOFF`
  - `COLOR_MODE_BRIGHTNESS`
  - `COLOR_MODE_COLOR_TEMP`
  - `COLOR_MODE_HS`
  - `COLOR_MODE_XY`
  - `COLOR_MODE_RGB`
  - `COLOR_MODE_RGBW`
  - `COLOR_MODE_RGBWW`
  - `COLOR_MODE_WHITE`

  请改用新的 [`ColorMode`](/developers/core/entity/light#color-modes) enum。
