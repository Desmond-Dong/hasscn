---
title: "该文档描述了所有集成配置选项"
description: '集成可以提供选项流以允许用户更改集成配置。 此规则确保记录所有配置选项，以便用户可以了解每个选项的作用以及如何使用它。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 该文档描述了所有集成配置选项

## 推理

集成可以提供选项流以允许用户更改集成配置。
此规则确保记录所有配置选项，以便用户可以了解每个选项的作用以及如何使用它。

## 实施示例

以下示例使用 `configuration_basic` 标签与多个配置选项集成。

```markdown showLineNumbers
{% include integrations/option_flow.md %}

{% configuration_basic %}
Country code:
  description: You can specify the country code (NL or BE) of the country to display on the camera.
Timeframe:
  description: Minutes to look ahead for precipitation forecast sensors (minimum 5, maximum 120).
{% endconfiguration_basic %}

```

## 例外情况

这条规则没有例外。
