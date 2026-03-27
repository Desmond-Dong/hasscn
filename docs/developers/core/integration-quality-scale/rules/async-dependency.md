---
title: "依赖是异步的"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - inject-websession
---
# 依赖是异步的

import RelatedRules from './_includes/related_rules.jsx'

## 推理

Home Assistant 与 asyncio 高效配合使用，可处理任务。
为了避免在 asyncio 事件循环和其他线程之间切换上下文（这会降低性能），理想情况下，您的库还应该使用 asyncio。

这不仅会导致系统更加高效，而且代码也更加整洁。

## 其他资源

有关如何创建库的更多信息，请参阅 [documentation](/developers/api_lib_index)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>