---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "对单独文件中的平台翻译的支持将被移除"
---

集成在其 entity 处于其他集成下时为状态提供翻译的方法，例如翻译某个集成的 sensors，在 2022 年 11 月发生了变化，对旧方法的支持将在 Home Assistant Core 2024.5.0 中移除。

一旦 Home Assistant Core 2024.5.0 发布，集成将不能再使用自定义 device class 配合 `strings.<platform name>.json` 文件。取而代之的是，entity 必须设置 `translation_key` 属性，并将该 `translation_key` 包含在集成的 `strings.json` 中。

以下示例 `strings.json` 是针对一个 `translation_key` 属性设置为 `phase` 的 Moon domain `sensor` entity：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "state": {
          "new_moon": "New moon",
          "first_quarter": "First quarter",
          "full_moon": "Full moon",
          "last_quarter": "Last quarter"
        }
      }
    }
  }
}
```

更多详情请参阅 [`translation`](/developers/internationalization/core#state-of-entities) 和 [`entity`](/developers/core/entity#generic-properties) 文档。
