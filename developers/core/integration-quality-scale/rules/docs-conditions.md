import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

集成可以注册 condition，以提供触发自动化（automation）的额外方式。
这些 condition 可能比标准 condition 更难以使用，因此我们希望确保文档描述了它们的作用以及相关参数。
为避免集成文档显得杂乱，我们希望为每个 condition 设置单独的页面，并从集成文档中链接到该页面。

每个 condition 页面应包含该 condition 的作用说明、可用参数列表，以及通过 UI 和 YAML 使用该 condition 的概述。

## 示例实现

```markdown showLineNumbers
---
title: "检测到一氧化碳"
condition: air_quality.is_co_detected
domain: air_quality
description: "测试是否有一个或多个一氧化碳传感器正在检测一氧化碳。"
related_conditions:
  - air_quality.is_co_cleared
  - air_quality.is_co_value
---

**检测到一氧化碳** 条件在一个或多个一氧化碳传感器主动检测到一氧化碳（CO）时通过。由于一氧化碳无色无味，传感器是确认其存在的唯一途径。将本条件添加到自动化中，可确保安全措施（如触发警报、启动通风或发送紧急通知）仅在危险被确认时才执行。这能避免传感器短暂闪烁引发的误报，并将响应聚焦于真实威胁。

<!-- 必需。渲染标准的"通过用户界面使用此条件"标题和介绍。 -->
{% include conditions/ui_header.md %}

要在自动化中使用此条件：

1. 前往 {% my automations title="**设置** > **自动化与场景**" %}。
2. 打开现有自动化，或选择 **创建自动化** > **创建新自动化**。
3. 在 **And if** 部分，选择 **添加条件**。
4. 选择你要检查的内容。在 **按目标**（见 [Targets](#targets)）下，选择一氧化碳传感器所在的区域（如厨房或车库）。你也可以选择楼层、设备、具体 entity 或 label。
5. 在该目标显示的条件中，选择 **检测到一氧化碳**。
6. 在 **条件通过条件**（见 [Behavior](#behavior-with-multiple-targets)）下，选择 **任一** 或 **全部**，以控制在针对多个传感器时检查的行为。
7. 选择 **保存**。

### UI 中的选项

{% options_ui %}
条件通过条件：
  description: 当针对多个传感器时，控制结果如何组合。选择 **任一** 在至少一个目标传感器检测到大一氧化碳时通过，或选择 **全部** 仅在每个目标传感器都检测到大一氧化碳时通过。
{% endoptions_ui %}

<!-- 必需。渲染标准的"在 YAML 中使用此条件"标题和介绍。 -->
{% include conditions/yaml_header.md %}

在 YAML 中，将此条件引用为 `air_quality.is_co_detected`。一个基本示例如下：

{% example %}
condition: |
  condition: air_quality.is_co_detected
  target:
    entity_id: binary_sensor.hallway_co
{% endexample %}

当走廊一氧化碳传感器当前正在检测 CO 时，此条件通过。

### YAML 中的选项

YAML 有时为更复杂的用例提供 UI 中不可用的额外选项。

{% options_yaml %}
behavior:
  description: >
    当针对多个传感器时，控制结果如何组合。接受 `all` 或 `any`。
  required: true
  type: string
  default: any
{% endoptions_yaml %}

<!-- 如果该条件支持 targets，请保留此 include。渲染"条件的 Targets"部分。 -->
{% include conditions/targets.md %}

<!-- 如果该条件支持多个 target，请保留此 include。渲染"条件通过条件"选项引用的"多个 target 下的行为"部分。 -->
{% include conditions/behavior.md %}

## 小贴士

- 不可用（`unavailable`）或状态未知（`unknown`）的传感器不算作检测到。使用 **任一** 行为时，它们会被跳过。使用 **全部** 行为时，如果每个目标传感器都不可用，则该条件失败。
- 要检查是否不再检测到大一氧化碳，请使用 [大一氧化碳已清除](/conditions/air_quality.is_co_cleared/)。
- 要检查实际 CO 浓度而非仅仅二元检测结果，请使用 [大一氧化碳数值](/conditions/air_quality.is_co_value/)。

<!-- 必需。渲染"自己动手试试"部分，引导用户测试该条件。 -->
{% include conditions/try_it.md %}

<!-- 渲染"更多示例"标题。在其下方添加你的自动化示例。 -->
{% include conditions/more_examples.md %}

### 自动化：在 CO 事件期间有人到家时提醒家人

如果家人外出期间室内 CO 积聚，第一个回家的人需要在进门之前收到警告。此自动化在有人进入家 zone 时触发，并检查走廊 CO 传感器是否仍在检测大一氧化碳。如果是，则发送紧急通知提醒他们待在室外并拨打紧急电话。

- **触发器**：进入 Zone
  - **目标**：Frenck（`person.frenck`）
  - **Zone**：Home（`zone.home`）
- **条件**：检测到一氧化碳
  - **目标**：走廊 CO 传感器
  - **条件通过条件**：任一
- **动作**：发送通知消息
  - **目标**：My Device（`notify.my_device`）

{% details "到家时 CO 警告的 YAML 示例" %}

{% example %}
automation: |
  alias: "CO warning on arrival home"
  triggers:
    - trigger: zone.entered
      target:
        entity_id: person.frenck
      options:
        zone: zone.home
  conditions:
    - condition: air_quality.is_co_detected
      target:
        entity_id: binary_sensor.hallway_co
      options:
        behavior: any
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Carbon monoxide detected at home"
        message: >
          The hallway CO sensor is detecting carbon
          monoxide. Stay outside and call emergency services.
{% endexample %}

{% enddetails %}

<!-- 必需。渲染"仍然卡住了？"部分，指向社区支持渠道。 -->
{% include conditions/stuck.md %}

<!-- 如果你在 front matter 中设置了 related_conditions，请保留此 include。渲染"相关条件"部分。 -->
{% include conditions/related.md %}
```

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
