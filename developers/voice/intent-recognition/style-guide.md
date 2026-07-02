# 响应风格指南

本文档描述响应的风格指南。

## 保持简洁

响应应简洁明了，直奔主题，不应包含不必要的信息。

* 如果命令针对单个设备，不要在响应中重复实体名称。
* 如果命令针对某个区域，不要在响应中重复区域名称或其中的实体名称。
* 如果命令要求列出实体，数量不超过 4 个时全部列出；否则列出前 3 个并说明 "+ 2 more"。

可读性很重要，因此在需要时请使用下面的代码生成 "+ 2 more" 风格的句子。不要自行创建变体。

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

响应应使用一般现在时。例如，应使用 "The light is on"，而不是 "The light was on"。

## 使用正确的语态

响应应使用主动语态。例如，应使用 "The light is on"，而不是 "The light is being turned on"。这里的例外是 `cover` domain，因为其动作通常需要较长时间才能完成。
