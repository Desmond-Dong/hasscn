---
title: "意图"
sidebar_label: "介绍"
---

一个 intent 是对用户意图的描述。Intents 由用户的操作生成，例如让 Amazon Echo 打开一盏灯。

<a href='https://docs.google.com/drawings/d/1i9AsOQNCBCaeM14QwEglZizV0lZiWKHZgroZc9izB0E/edit'>
  <img class='invertDark'
    src='/img/en/intents/overview.png'
    alt='Architectural overview of intents in Home Assistant'
  />
</a>

Intents 由接收来自外部源/服务的 intents 的 components fire。Conversation、Alexa、API.ai 和 Snips 目前都在提供 intents。

任何 component 都可以处理 intents。这使得开发者可以轻松地一次性与所有 voice assistants 集成。

Intents 使用 `homeassistant.helpers.intent.Intent` 类实现。它包含以下属性：

| Name          | Type           | Description                                                                 |
|---------------|----------------|-----------------------------------------------------------------------------|
| `hass`        | Home Assistant | fire 该 intent 的 Home Assistant 实例。                                      |
| `platform`    | string         | fire 该 intent 的 platform                                                    |
| `intent_type` | string         | 该 intent 的类型（名称）                                                     |
| `slots`       | dictionary     | 包含以 slot name 为 key 的 slot 值。                                         |
| `text_input`  | string         | 可选。发起该 intent 的原始文本输入。                                         |
| `language`    | string         | 可选。文本输入的语言（默认为配置的语言）。                                   |

Slots dictionary 值的说明。

| Name  | Type     | Description        |
|-------|----------|--------------------|
| Value | anything | 该 slot 的值。     |
