---
title: "文档描述了集成所有的配置选项"
sidebar_label: 🥈 docs-configuration-parameters
---

## 原理说明

集成可以提供 options flow，允许用户更改集成的配置。
本规则确保所有配置选项都被文档化，以便用户了解每个选项的作用以及如何使用它。

## 示例实现

以下示例针对一个具有多个配置选项、使用 `configuration_basic` 标签的集成。

```markdown showLineNumbers
{% include integrations/option_flow.md %}

{% configuration_basic %}
国家代码：
  description: 您可以指定显示在摄像头中的国家代码（NL 或 BE）。
时间范围：
  description: 降水预测传感器向前查看的分钟数（最小 5，最大 120）。
{% endconfiguration_basic %}

```

## 例外情况

本规则没有例外。
