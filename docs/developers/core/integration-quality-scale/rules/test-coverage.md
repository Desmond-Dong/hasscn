---
title: "所有集成模块的测试覆盖率超过 95%"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - config-flow-test-coverage
---
# 所有集成模块的测试覆盖率超过 95%

import RelatedRules from './_includes/related_rules.jsx'

## 推理

由于我们支持许多不同的集成，因此我们并没有所有设备或服务都可用于实际测试。
为了确保我们不会破坏任何东西，在接受代码更改时，我们需要对所有集成模块进行良好的测试覆盖率。
这可以防止引入错误和回归。

它还允许新开发人员了解代码库并进行更改，而不会破坏任何现有用例。

## 其他资源

有关测试以及如何计算测试覆盖率的更多信息，请参阅 [Testing your code](/developers/development_testing) 页面。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>