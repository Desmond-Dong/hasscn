---
author: Abílio Costa
authorURL: https://github.com/abmantis
title: "翻译 measurement 单位"
---

Home Assistant 2024.12 将支持对自定义 measurement 单位的翻译。在此之前，这些单位都是在各自的集成中硬编码的。

与 entity 名称一样，集成只需在 entity 定义上设置 `translation_key`，并在 `strings.json` 文件中提供单位名称（使用新的 `unit_of_measurement` key）：

```json
{
  "entity": {
    "sensor": {
      "subscribers_count": {
        "unit_of_measurement": "subscribers"
      },
    }
  }
}
```

详情请参阅我们的 [backend localization 文档](/developers/internationalization/core#unit-of-measurement-of-entities)。