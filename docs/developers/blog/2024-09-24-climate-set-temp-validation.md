---
author: G Johansson
authorURL: https://github.com/gjohansson-ST
authorImageURL: https://avatars.githubusercontent.com/u/62932417?v=4
authorTwitter: GJohansson
title: "Climate set_temperature 方法新增额外校验"
---

自 Home Assistant Core 2024.10 起，我们增加了对 `set_temperature` 方法参数传递的进一步校验。这意味着集成无需在自己的方法中实现这些校验。

在 2024.10 之前，当 entity 没有设置 `ClimateEntityFeature.TARGET_TEMPERATURE` 时，可以在 action 中设置 `temperature` 参数；当 entity 没有设置 `ClimateEntityFeature.TARGET_TEMPERATURE_RANGE` 时，也可以设置 `target_temp_low`/`target_temp_high` 参数。现在这将不再可行，系统会抛出 `ServiceValidationError`，告知用户在 action 调用中使用了错误的参数。

此外，在设置温度范围时，之前可以将 `target_temp_low` 设置为高于 `target_temp_high` 的值。
现在这将抛出 `ServiceValidationError`，告知用户高值必须高于低值。