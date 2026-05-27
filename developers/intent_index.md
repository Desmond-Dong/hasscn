# 意图

意图是对用户意图的描述。意图由用户操作产生，例如要求 Amazon Echo 打开一盏灯。

<a href='https://docs.google.com/drawings/d/1i9AsOQNCBCaeM14QwEglZizV0lZiWKHZgroZc9izB0E/edit'>
  <img class='invertDark'
    src='/developers/img/en/intents/overview.png'
    alt='Home Assistant 中意图的架构概览'
  />
</a>

意图由从外部来源/服务接收意图的组件触发。目前 conversation、Alexa、API.ai 和 Snips 都可以作为意图来源。

任何组件都可以处理意图。这让开发者能够非常轻松地一次性接入所有语音助手。

意图通过 `homeassistant.helpers.intent.Intent` 类实现。它包含以下属性：

| Name          | Type           | Description |
|---------------|----------------|-------------|
| `hass`        | Home Assistant | 触发该意图的 Home Assistant 实例。 |
| `platform`    | string         | 触发该意图的平台 |
| `intent_type` | string         | 意图的类型（名称） |
| `slots`       | dictionary     | 包含以 slot 名称为键的 slot 值。 |
| `text_input`  | string         | 可选。触发该意图的原始文本输入。 |
| `language`    | string         | 可选。文本输入的语言（默认使用已配置语言）。 |

slots 字典中的值说明如下。

| Name  | Type     | Description |
|-------|----------|-------------|
| Value | anything | slot 的值。 |
