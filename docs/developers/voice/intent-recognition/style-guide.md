---
title: Response Style Guide
---

本文档描述 responses 的 style guide。

## 简洁明了

Responses 应简洁明了，不应包含不必要的信息。

- 如果命令针对单个设备，不要在 response 中重复 entity 的名称。
- 如果命令针对一个 area，不要在 response 中重复该 area 或其 entities 的名称。
- 如果命令请求列出 entities，数量在 4 个或以下时全部列出；否则列出前 3 个并说 "+ 2 more"。

可读性很重要，因此在需要时使用下方代码来生成 "+ 2 more" 样式的句子。不要自行创建变体。

```jinja
{% if query.matched %}
  {% set match = query.matched | map(attribute="name") | sort | list %}
  {% if match | length > 4 %}
    Yes, {{ match[:3] | join(", ") }} and {{ (match | length - 3) }} more
  {%- else -%}
    Yes,
    {% for name in match -%}
      {% if not loop.first and not loop.last %}, {% elif loop.last and not loop.first %} and {% endif -%}
      {{ name }}
    {%- endfor -%}
  {% endif %}
{% else %}
  No
{% endif %}
```

## 使用正确的时态

Responses 应使用现在时。例如，使用 "The light is on"，而不是 "The light was on"。

## 使用正确的语态

Responses 应使用主动语态。例如，使用 "The light is on"，而不是 "The light is being turned on"。此处的例外是 `cover` domain，因为其操作需要相当长的时间才能完成。
