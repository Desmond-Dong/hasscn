# Voice over IP

**VoIP** 集成允许用户通过模拟电话和 VoIP 适配器与 [Assist](/home-assistant/voice_control/index.md) 进行对话。目前，该系统可与 [Grandstream HT801](https://www.amazon.com/dp/B06XW1BQHC) 搭配使用。详细说明请参阅[教程](/home-assistant/voice_control/worlds-most-private-voice-assistant.md)。

作为替代方案，也可以使用 [Grandstream HT802](https://www.amazon.com/Grandstream-GS-HT802-Analog-Telephone-Adapter/dp/B01JH7MYKA/)。它与前面提到的 HT801 基本相同，但有两个电话端口，而 Home Assistant 目前仅支持使用其中一个。

此外，也有用户反馈 Grandstream HT812 可以正常工作。Home Assistant 同样只支持使用两个电话端口中的一个。

如果您在运行 Home Assistant 的设备上还安装了其他 VoIP 软件，可以在配置中设置 **VoIP** 集成监听的端口。对于呼出电话，如有需要，您还可以指定一个 **SIP user** 值，它会被写入发送给电话的 **From** 请求头中。

<p class='img'>
  <img src="/home-assistant/images/integrations/voip/voip_adapter.png" />
  将电话连接到 Home Assistant 需要一个适配器。
</p>

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
