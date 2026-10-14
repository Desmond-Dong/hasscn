import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

集成可以注册 service action，以提供标准 entity 无法实现的功能。
这些 service action 可能比标准 service action 更难以使用，因此我们希望确保文档描述了它们的作用以及相关参数。

## 示例实现

```markdown showLineNumbers
## 操作

该集成提供以下 action。

### Action：获取日程

`my_integration.get_schedule` service 用于从集成获取日程。

- **Data 属性**：`config_entry_id`
    - **说明**：要获取日程的 config entry 的 ID。
    - **可选**：否
```

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
