---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "翻译 entity 的 name 和 attributes"
---

现在可以翻译 entity 的 name，且这优于在 Python 实现中硬编码自然语言名称。此外，entity components 提供共享翻译，例如用于 binary sensor device class 的翻译，应使用这些翻译以避免重复翻译相同内容。

此外，frontend 现已完全支持翻译 entity state attributes 的 name 和值。

:::warning
通过 `translation_key` 属性指向翻译目前仅支持具有 `unique_id` 的 entity。

此外，翻译 entity name 要求 `has_entity_name` 属性设置为 `True`。
:::

## 翻译 entity name
以下 `strings.json` 示例适用于 `translation_key` 属性设置为 `thermostat_mode` 的 `sensor` entity：

```json
{
  "entity": {
    "sensor": {
      "thermostat_mode": {
        "name": "Thermostat mode"
      }
    }
  }
}
```

以下 `strings.json` 示例适用于 `translation_key` 属性设置为 `temperature_sensor` 的 `sensor` entity，其中使用了 `sensor` 集成提供的共享翻译：

```json
{
  "entity": {
    "sensor": {
      "temperature_sensor": {
        "name": "[%key:component::sensor::entity_component::temperature::name%]"
      }
    }
  }
}
```

## 翻译 entity attributes
以下 `strings.json` 示例适用于 `translation_key` 属性设置为 `ubercool` 的 `demo` 域 `climate` entity，它包含自定义的 `fan_mode` 和 `swing_mode` 设置：

```json
{
  "entity": {
    "climate": {
      "ubercool": {
        "state_attributes": {
          "fan_mode": {
            "state": {
              "auto_high": "Auto High",
              "auto_low": "Auto Low",
              "on_high": "On High",
              "on_low": "On Low"
            }
          },
          "swing_mode": {
            "state": {
              "1": "1",
              "2": "2",
              "3": "3",
              "auto": "Auto",
              "off": "Off"
            }
          }
        }
      }
    }
  }
}
```

更多详情请参见 [`entity name translation`](/developers/internationalization/core#name-of-entities)、[`entity attribute translation`](/developers/internationalization/core#entity-state-attributes) 和 [`entity`](/developers/core/entity#generic-properties) 文档。