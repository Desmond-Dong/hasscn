---
title: "所有集成模块的测试覆盖率超过 95%"
sidebar_label: 🥈 test-coverage
related_rules:
  - config-flow-test-coverage
---
import RelatedRules from './_includes/related_rules.jsx'

## 原因

由于我们支持大量的不同集成，我们并非拥有每一个设备或服务来进行手动测试。
为确保在接受代码更改时不会破坏任何功能，我们需要对所有集成模块有良好的测试覆盖率。
这可以防止 bug 和回归的引入。

这也让新开发者能够理解代码库，并在不破坏任何现有用例的情况下进行更改。

## 更多资源

关于测试以及如何计算测试覆盖率的更多信息，请参见[Testing your code](/developers/development_testing)页面。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
