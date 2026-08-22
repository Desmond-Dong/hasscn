---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorImageURL: /img/profile/frenck.png
authorTwitter: frenck
title: Icon 翻译
---

在 Home Assistant 2024.2 中，我们将引入一种为集成提供 icons 的新方式：Icon 翻译。

Icon 翻译的工作方式类似于我们用于 entities 的常规翻译，后者可以将 entity 的 state 或 entity 属性 state 翻译成任何语言。Icon 翻译的工作方式类似，但并不是将 state 翻译成最终用户语言，而是将 state 翻译为一个 icon。

每个集成现在都可以提供一个 `icons.json` 文件，其中包含从 states 到 icons 的映射。以下是一个 Moon `sensor` entity 的示例，它为每个 state 提供不同的 icon：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "default": "mdi:moon",
        "state": {
          "new_moon": "mdi:moon-new",
          "first_quarter": "mdi:moon-first-quarter",
          "full_moon": "mdi:moon-full",
          "last_quarter": "mdi:moon-last-quarter"
        }
      }
    }
  }
}
```

Icon 翻译也支持翻译 entity 属性 states。

[在我们的文档中了解更多关于 icon 翻译的内容](/developers/core/entity#icons)。

## Service 图标

此变更是向后兼容的。entity 现有的 `icon` 属性将继续像以前一样工作。不过，我们建议使用 icon 翻译来替代 `icon` 属性。

此外，集成提供的 services 现在也支持 icons，并可以在相同的 icon 翻译文件中提供。这些 icons 在 Home Assistant UI 中显示 service 时使用，比如在 automation 和 script 编辑器中。以下示例展示了如何为 `light.turn_on` 和 `light.turn_off` services 提供 icons：

```json
{
  "services": {
    "turn_on": "mdi:lightbulb-on",
    "turn_off": "mdi:lightbulb-off"
  }
}
```

[在我们的文档中了解更多关于 service icons 的内容](/developers/dev_101_services#icons)。
