---
title: "从用户输入识别意图"
sidebar_label: "简介"
---

语音助手的演变围绕 intent recognition（意图识别）展开。Intent recognition 尝试从用户的输入中提取用户的意图。该意图（一种数据格式）随后将由 Home Assistant 执行。

Home Assistant 的 intent recognition 由 [hassil](https://github.com/home-assistant/hassil) 提供支持。Hassil 通过将用户输入与 sentence templates（句子模板）进行匹配来识别 intents。

Sentence template 是一种包含 slots（即数据的占位符）的句子，并支持各种语法，允许单个 template 匹配大量相似的句子。

> `(turn | switch) on [the] {area} lights`

这个示例 sentence template 既能匹配 `turn on kitchen lights`，也能匹配 `switch on the kitchen lights`。在两种情况下，它都会提取额外数据 `area` 并设为 `kitchen`。

在 Home Assistant 中，我们将 sentence templates 收集在 [GitHub](https://github.com/home-assistant/intents) 上。该仓库旨在针对每种语言和 Home Assistant 中的每个 [supported intent](../../intent_builtin)，包含用户可能会说的各种句子。
