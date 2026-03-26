---
title: "该文档描述了所提供的可以使用的服务操作"
---

## 推理

集成可以注册服务操作以提供标准实体无法提供的功能。
这些服务操作可能比标准服务操作更难使用，因此我们希望确保文档描述了它们的作用以及参数是什么。

## 实施示例

```markdown showLineNumbers
## Actions

The integration provides the following actions.

### Action: Get schedule

The `my_integration.get_schedule` service is used to fetch a schedule from the integration.

- **Data attribute**: `config_entry_id`
    - **Description**: The ID of the config entry to get the schedule from.
    - **Optional**: No
```

## 例外情况

这条规则没有例外。
