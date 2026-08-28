集成为其 entity（例如传感器的）state 提供翻译的方法已经改变。

集成不应再将自定义 device class 与 `strings.<platform name>.json` 文件一起使用。相反，entity 应在自身上设置 `translation_key` 属性，并在集成的 `strings.json` 中包含该 `translation_key`。

:::warning
通过 `translation_key` 属性指向翻译目前仅支持具有 `unique_id` 的 entity。
:::

以下 `strings.json` 示例适用于 `translation_key` 属性设置为 `phase` 的 Moon 域 `sensor` entity：

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

更多详情请参见 [`translation`](/developers/internationalization/core.md#state-of-entities) 和 [`entity`](/developers/core/entity.md#generic-properties) 文档。
