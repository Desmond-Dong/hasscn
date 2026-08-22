---
title: "实体实现了 icon translations"
sidebar_label: 🥇 icon-translations
related_rules:
  - entity-translations
  - entity-device-class
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

在过去，图标（icons）是集成状态（state）的一部分。
这其实并不是必需的，因为它们通常是静态的，或者具有固定的一组状态。

为了减轻状态机（state machine）的负担，引入了 icon translations。
这个功能的名称听起来有些奇怪，因为它并不是要翻译图标本身，而是通过 translation key 来引用图标。
Icon translations 背后的想法是：由集成在一个文件中定义图标，然后由前端使用该文件来显示图标。
此外，这还为状态属性（state attribute）的不同值添加了图标支持，例如气候实体（climate entity）可能的预设模式（preset modes）。

:::info
请注意，实体也可以从 device class 获取图标。
如果实体的上下文与 device class 完全相同，我们不应覆盖该图标，以保持集成之间的一致性。
例如，PM2.5 传感器实体将不会获得自定义图标，因为 device class 已经在相同的上下文中提供了图标。
:::

## 示例实现

### 基于状态的图标

在这个示例中，我们定义一个具有 translation key 的传感器实体。
在 `icons.json` 文件中，我们为传感器实体定义图标，并为状态 `high` 定义一个状态图标。
因此，当实体状态为 `high` 时，将显示图标 `mdi:tree-outline`；否则将显示 `mdi:tree`。

`sensor.py`

```python {5} showLineNumbers
class MySensor(SensorEntity):
    """Representation of a sensor."""

    _attr_has_entity_name = True
    _attr_translation_key = "tree_pollen"
```

`icons.json`

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

对于数值型实体，您可以定义根据数值范围变化的图标。该功能消除了集成代码中自定义逻辑的需求，并提供了一致的可视化方式来表示不同的传感器值。

基于范围的 icon translations 特别适用于：
- 电池电量指示器
- 信号强度计
- 温度传感器
- 空气质量指示器
- 填充液位传感器

#### 配置

在 `icons.json` 文件中，按升序定义各范围及其对应的图标：

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

系统会选择与小于或等于实体当前数值状态的最高范围值相关联的图标。例如，使用上述配置时：

- 值为 15 将显示 `mdi:battery-10` 图标（15 大于 10 但小于 20）
- 值为 45 将显示 `mdi:battery-40` 图标（45 大于 40 但小于 50）
- 值为 100 将显示 `mdi:battery` 图标（100 等于定义的最高范围值）
- 值为 5 将显示 `mdi:battery-outline` 图标（5 大于 0 但小于 10）
- 值为 -10 将显示 `mdi:battery-unknown` 默认图标（值在定义的范围之外）
- 值为 120 将显示 `mdi:battery` 图标（任何超出最后一个定义的范围条目 100 的值，都将使用该最终范围值所对应的图标）

在实现基于范围的图标时，请注意：

- 范围值必须为数值，并且必须按升序定义
- 支持整数（"0"、"100"）和小数（"0.5"、"99.9"）范围值
- 给定状态的图标是从小于或等于实体当前值的最高范围值中选出的
- 在以下情况下使用默认图标：
  - 实体的状态值落在所有定义范围之外
  - 实体不可用
  - 实体的状态无法解析为有效数字
- 如果在同一个 translation key 中同时定义了基于状态的图标和基于范围的图标，则基于状态的图标优先于基于范围的图标
- 定义的范围数量没有限制，但请考虑性能和可读性

## 补充资料

更多有关 icon translations 的信息，请参阅 [entity](/developers/core/entity#icon-translations) 文档。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
