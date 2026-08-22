---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "Entity 命名变更"
---

Entity 命名发生了以下变更：
- 将 entity 标记为 device 的单一主要功能现在需要通过显式将 entity 的 `name` 属性设置为 `None` 来完成，通过不设置 `name` 属性来隐式将 entity 标记为 device 的单一主要功能已不再支持。
- 某些平台的未命名 entity 现在会根据其 device class 获得默认名称，这包括 `binary_sensor`、`button`、`number` 和 `sensor` entity。

更多详情请参见 [entity 命名文档](/developers/core/entity#entity-naming)。