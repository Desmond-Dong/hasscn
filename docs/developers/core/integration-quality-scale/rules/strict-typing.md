---
title: "严格打字"
related_rules:
  - runtime-data
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

Python 是一种动态类型语言，这可能是许多错误的根源。
通过使用类型提示，您可以及早发现错误并避免引入它们。

类型提示由 mypy（Python 的静态类型检查器）检查。
由于 Python 中键入的工作方式，并且类型提示在 Python 中是可选的，因此 mypy 将仅检查它知道带有类型注释的代码。
为了改进这一点，我们建议完全键入您的库并使您的库符合 PEP-561。
这意味着您需要将 `py.typed` 文件添加到您的库中。
该文件告诉 mypy 您的库已完全类型化，之后它可以从您的库中读取类型提示。

在 Home Assistant 代码库中，您可以将集成添加到 [`.strict-typing`](https://github.com/home-assistant/core/blob/dev/.strict-typing) 文件，这将为您的集成启用严格的类型检查。

:::warning
如果集成实现 `runtime-data`，则需要使用自定义类型的 `MyIntegrationConfigEntry`，并且必须始终使用。
:::

## 其他资源

要了解有关 `py.typed` 文件的更多信息，请参阅 [PEP-561](https://peps.python.org/pep-0561/)。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
