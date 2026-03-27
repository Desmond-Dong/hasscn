---
title: "从用户输入中识别意图"
description: '语音助手的核心在于意图识别。意图识别会尝试从用户输入中提取用户想表达的意图。随后，Home Assistant 会执行对应的意图。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "简介"
---
# 从用户输入中识别意图

语音助手的核心在于意图识别。意图识别会尝试从用户输入中提取用户想表达的意图。随后，Home Assistant 会执行对应的意图。

Home Assistant 的意图识别由 [hassil](https://github.com/home-assistant/hassil) 提供支持。Hassil 通过将用户输入与句子模板进行匹配来识别意图。

句子模板是包含 slots（数据占位符）的一类句子，并支持多种语法，从而让单个模板能够匹配大量相似句子。

> `(turn | switch) on [the] {area} lights`

这个示例句子模板既能匹配 `turn on kitchen lights`，也能匹配 `switch on the kitchen lights`。在这两种情况下，它都会提取额外数据 `area`，其值为 `kitchen`。

在 Home Assistant 中，我们将句子模板收集在 [GitHub](https://github.com/home-assistant/intents) 上。该仓库的目标是为每种语言，以及 Home Assistant 中每个[受支持的意图](/developers/intent_builtin)，收录用户可能说出的句子。

