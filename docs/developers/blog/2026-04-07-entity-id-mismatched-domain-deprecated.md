---
author: Artur Pragacz
authorURL: https://github.com/arturpragacz
title: "Domain 不匹配的 Entity IDs 已弃用"
---

直接在 entity 上设置 `entity_id` 的集成现在会被验证，以确保 domain 部分与 platform 的 domain 匹配。例如，`light` entity 必须使用 `light.my_light`，而不能使用 `cover.my_light`。

使用错误 domain 设置 entity ID 会记录一条 deprecation 警告，并且将在 **Home Assistant 2027.5 中停止工作**。

在大多数情况下，集成不应设置 `entity_id`——Home Assistant 会自动生成它。
