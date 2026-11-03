# Speech-to-text (STT)

语音转文本（STT）实体允许其他集成或应用将语音数据流发送到 STT API，并返回文本结果。

:::note Building block integration
This speech-to-text (stt) is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this speech-to-text (stt) building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the speech-to-text (stt) building block offers.
:::

## 语音转文本实体的状态

每个语音转文本实体都会记录其上一次被用来处理语音的时间戳。

此外，该实体还可以具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。
