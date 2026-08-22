---
title: "文档描述了可用的 trigger"
sidebar_label: 🥉 docs-triggers
related_rules:
  - docs-actions
  - docs-conditions
---
import RelatedRules from './_includes/related_rules.jsx'

## 理由

集成可以注册 trigger，以提供触发自动化（automation）的额外方式。
这些 trigger 可能比标准 trigger 更难以使用，因此我们希望确保文档描述了它们的作用以及相关参数。
为避免集成文档显得杂乱，我们希望为每个 trigger 设置单独的页面，并从集成文档中链接到该页面。

每个 trigger 页面应包含该 trigger 的作用说明、可用参数列表，以及通过 UI 和 YAML 使用该 trigger 的概述。

## 示例实现

```markdown showLineNumbers
---
title: "二氧化碳水平发生变化"
trigger: air_quality.co2_changed
domain: air_quality
description: "当一个或多个二氧化碳水平发生变化时触发。"
related_triggers:
  - air_quality.co2_crossed_threshold
---

**二氧化碳水平发生变化** trigger 在一个或多个空气质量传感器的二氧化碳（CO2）读数发生显著变化后触发。二氧化碳会在有人居住的房间中由于呼吸、烹饪和取暖而自然积聚。晚上关着门的卧室或午餐后人员密集的会议室，都是 CO2 悄悄上升而不被察觉的典型场所。CO2 升高是最明显的室内空气需要新鲜的信号之一。

想象一下：卧室通风风扇在深夜自动启动，因为 CO2 在你睡觉时升高了，所以你醒来时神清气爽而不是昏沉。使用此 trigger 来自动通风、记录室内空气质量趋势，或在 CO2 发生明显变化时提醒家庭成员打开窗户。

<!-- 必需。渲染标准的"通过用户界面使用此 trigger"标题和介绍。 -->
{% include triggers/ui_header.md %}

要在自动化中使用此 trigger：

1. 前往 {% my automations title="**设置** > **自动化与场景**" %}。
2. 打开现有自动化，或选择 **创建自动化** > **创建新自动化**。
3. 在 **When** 部分，选择 **添加触发器**。
4. 选择你要监控的内容。在 **按目标**（见 [Targets](#targets)）下，选择 CO2 传感器所在的区域（如客厅或卧室）。你也可以选择楼层、设备、具体 entity 或 label。
5. 在该目标显示的 trigger 中，选择 **二氧化碳水平发生变化**。
6. 在 **阈值类型** 下，设置水平变化多少才触发该 trigger。
7. 选择 **保存**。

### UI 中的选项

{% options_ui %}
阈值类型：
  description: 二氧化碳水平需要变化多少才会触发该 trigger。可以是固定数值，也可以引用提供该值的 helper entity。
{% endoptions_ui %}

<!-- 必需。渲染标准的"在 YAML 中使用此 trigger"标题和介绍。 -->
{% include triggers/yaml_header.md %}

在 YAML 中，将此 trigger 引用为 `air_quality.co2_changed`。一个基本示例如下：

{% example %}
trigger: |
  trigger: air_quality.co2_changed
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold: 50
{% endexample %}

每当卧室 CO2 传感器读数变化至少 50 ppm 时，就会触发此 trigger。

### YAML 中的选项

YAML 有时为更复杂的用例提供 UI 中不可用的额外选项。

{% options_yaml %}
threshold:
  description: >
    二氧化碳水平触发前必须变化的最小量。接受一个数值，或对 `input_number`、`number` 或 `sensor` entity 的引用。
  required: true
  type: any
{% endoptions_yaml %}

<!-- 如果该 trigger 支持 targets，请保留此 include。渲染"trigger 的 Targets"部分。 -->
{% include triggers/targets.md %}

## 小贴士

- 室内 CO2 水平通常在约 400 ppm（通风良好）到超过 1,000 ppm（闷热的房间）之间。50 到 100 ppm 的阈值适用于大多数通风自动化。
- 只要变化达到阈值，无论水平上升还是下降，都会触发该 trigger。
- 如果只想在 CO2 朝一个方向越过特定水平时作出响应，请使用 [二氧化碳水平越过阈值](/triggers/air_quality.co2_crossed_threshold/)。

<!-- 必需。渲染"自己动手试试"部分，引导用户测试该 trigger。 -->
{% include triggers/try_it.md %}

<!-- 渲染"更多示例"标题。在其下方添加你的自动化示例。 -->
{% include triggers/more_examples.md %}

### 自动化：卧室 CO2 升高时启动通风

在密闭的卧室中睡觉会令 CO2 在夜间积聚，让你早上醒来时昏沉。此自动化在 CO2 水平发生显著变化时启动卧室通风风扇，保持空气新鲜，让你醒来时精力充沛。

- **Trigger**：二氧化碳水平发生变化
- **目标**：卧室 CO2 传感器
- **阈值类型**：100
- **动作**：打开风扇

{% details "基于 CO2 的卧室通风 YAML 示例" %}

{% example %}
automation: |
  alias: "Ventilate bedroom on CO2 change"
  triggers:
    - trigger: air_quality.co2_changed
      target:
        entity_id: sensor.bedroom_co2
      options:
        threshold: 100
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom_ventilation
{% endexample %}

{% enddetails %}

<!-- 必需。渲染"仍然卡住了？"部分，指向社区支持渠道。 -->
{% include triggers/stuck.md %}

<!-- 如果你在 front matter 中设置了 related_triggers，请保留此 include。渲染"相关 trigger"部分。 -->
{% include triggers/related.md %}
```

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
