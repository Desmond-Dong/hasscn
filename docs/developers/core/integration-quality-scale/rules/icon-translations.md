---
title: "实体实现图标翻译"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - entity-translations
  - entity-device-class
---
# 实体实现图标翻译

import RelatedRules from './_includes/related_rules.jsx'

## 推理

在过去，图标是集成状态的一部分。
这并不是真正必要的，因为它们通常要么是静态的，要么具有一组固定的状态。

为了减轻状态机的负担，引入了图标翻译。
该功能的名称听起来很奇怪，因为它不是翻译图标本身，而是通过翻译键引用图标。
图标翻译背后的想法是集成在文件中定义图标，然后前端使用该文件来显示图标。
这还增加了对状态属性值的不同图标的支持，例如气候实体可能的预设模式。

:::info
请注意，实体还可以从设备类获取图标。
如果实体的上下文与设备类完全相同，我们不应该覆盖此图标以保持集成之间的一致性。
例如，PM2.5 传感器实体不会获得自定义图标，因为设备类已在相同上下文中提供它。
:::

## 实施示例

### 基于状态的图标

在此示例中，我们定义带有翻译键的传感器实体。
在 `icons.json` 文件中，我们定义传感器实体的图标和状态 `high` 的状态图标。
因此，当实体的状态为`high`时，我们将显示图标`mdi:tree-outline`，否则我们将显示`mdi:tree`。

ZZ保护0ZZ

```python {5} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True
    _attr_translation_key = "tree_pollen"
```

ZZ保护0ZZ

```json
{
  "entity": {
    "sensor": {
      "tree_pollen": {
        "default": "mdi:tree",
        "state": {
          "high": "mdi:tree-outline"
        }
      }
    }
  }
}
```

### 基于范围的图标

对于数字实体，您可以定义根据数字范围而变化的图标。此功能消除了集成代码中自定义逻辑的需要，并提供了一致的方式来直观地表示不同的传感器值。

基于范围的图标翻译对于以下情况特别有用:
- 电池电量指示器
- 信号强度计
- 温度传感器
- 空气质量指标
- 液位传感器

#### 配置

在 `icons.json` 文件中，按升序定义范围及其相应的图标:

```json
{
  "entity": {
    "sensor": {
      "battery_level": {
        "default": "mdi:battery-unknown",
        "range": {
          "0": "mdi:battery-outline",
          "10": "mdi:battery-10",
          "20": "mdi:battery-20",
          "30": "mdi:battery-30",
          "40": "mdi:battery-40",
          "50": "mdi:battery-50",
          "60": "mdi:battery-60",
          "70": "mdi:battery-70",
          "80": "mdi:battery-80",
          "90": "mdi:battery-90",
          "100": "mdi:battery"
        }
      }
    }
  }
}
```

系统选择与小于或等于实体当前数字状态的最高范围值关联的图标。例如上面的配置:

- 值为 15 将显示 `mdi:battery-10` 图标（15 大于 10 但小于 20）
- 值为 45 将显示 `mdi:battery-40` 图标（45 大于 40 但小于 50）
- 值为 100 将显示 `mdi:battery` 图标（100 等于最高定义范围）
- 值为 5 将显示 `mdi:battery-outline` 图标（5 大于 0 但小于 10）
- 值为 -10 将显示 `mdi:battery-unknown` 默认图标（值超出定义范围）
- 值为 120 将显示 `mdi:battery` 图标（任何超过最后定义的范围条目 100 的值都将使用与该最终范围值关联的图标）

实现基于范围的图标时:

- 范围值必须是数字并且必须按升序定义
- 支持整数（“0”、“100”）和小数（“0.5”、“99.9”）范围值
- 给定状态的图标是从小于或等于实体当前值的最高范围值中选择的
- 在以下情况下使用默认图标:
  - 实体的状态值超出所有定义的范围
  - 该实体不可用
  - 实体的状态无法解析为有效数字
- 如果在同一翻译键中定义了基于状态的图标和基于范围的图标，则基于状态的图标优先于基于范围的图标
- 您可以定义的范围数量没有限制，但要考虑性能和可读性

## 其他资源

有关图标翻译的更多信息，请查看 [entity](/developers/core/entity#icon-translations) 文档。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
