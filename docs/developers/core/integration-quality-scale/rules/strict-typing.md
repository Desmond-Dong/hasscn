---
title: "严格类型标注"
sidebar_label: 🏆 strict-typing
related_rules:
  - runtime-data
---
import RelatedRules from './_includes/related_rules.jsx'

## 原因

Python 是一种动态类型语言，这可能是许多 bug 的来源。
通过使用类型标注，你可以在早期发现 bug 并避免引入它们。

类型标注由 mypy 进行检查，mypy 是一个 Python 静态类型检查器。
由于 Python 的类型机制以及类型标注在 Python 中是可选的，mypy 只会检查已知已进行类型标注的代码。
为了改进这一点，我们建议完整地为你的库添加类型标注，并使其符合 PEP-561 规范。
这意味着你需要在库中添加一个 `py.typed` 文件。
该文件告诉 mypy 你的库是完全类型标注的，此后 mypy 就可以从你的库中读取类型标注。

在 Home Assistant 代码库中，你可以将你的集成添加到 [`.strict-typing`](https://github.com/home-assistant/core/blob/dev/.strict-typing) 文件中，这将为你集成启用严格的类型检查。

:::warning
如果集成实现了 `runtime-data`，则必须使用自定义类型标注的 `MyIntegrationConfigEntry`，并在全局范围内使用。
:::

## 更多资源

要了解更多关于 `py.typed` 文件的信息，请参见 [PEP-561](https://peps.python.org/pep-0561/)。

## 例外

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
