# 声音之年 - 第 5 章

<p><img src='/home-assistant/images/blog/2023-12-13-year-of-the-voice-chapter-5/social.png' class='no-shadow' /></p>

我们已经来到 Home Assistant \[声音之年] 的终章！我们在 2023 年的目标，是让用户能用自己的语言，通过语音来控制 Home Assistant。

在 2023 年初，Home Assistant 还只能针对部分设备提供基础的英文文本控制。到了年末，用户已经可以使用 50 多种语言，通过各种设备用语音控制智能家居并提出问题，包括：

* 任何带麦克风的 [ESPHome] 设备
* Android 手机、平板电脑和智能手表
* 老式模拟电话（[配合适配器使用][phone-教程]）

Home Assistant 用户现在可以通过自由组合语音“管线”中的不同组件，创建多个语音助手。Home Assistant Cloud 订阅者会自动获得 130 多种语言和方言的高质量语音组件。与此同时，我们也提供完全本地化的组件，比如 [Piper] 文本转语音系统，让你可以实现 100% 离线语音控制。

在\[第 4 章]中，我们借助 [openWakeWord] 项目，把唤醒词处理直接带入了 Home Assistant。这使得像 [M5 ATOM Echo Development Kit][m5-教程] 这样的小型语音卫星设备，可以通过把音频流发送到 Home Assistant 服务器来卸载唤醒词检测任务。社区也一直在积极训练各种[自定义唤醒词][community-wake-words]，让每个人都能拥有更独特的语音体验。

在 2023 年最后一章中，我们扩展了可用语音命令的类型，新增了天气、温度和待办事项列表。语音卫星现在还能感知自己所在的区域，同时也带来了更多软硬件选择。

节日快乐！

<p class='img'>
<lite-youtube videoid="erf7HqTwCGs" videotitle="ESP32-S3-Box running Assist"></lite-youtube>
运行在 ESP32-S3-BOX 上的 Assist。
</p>

<!--more-->

## S3-BOX-3

Espressif 最近发布了 [ESP32-S3-BOX-3]，它是已停产的 ESP32-S3-BOX（以及 “lite” 版本）的升级款。这套“AIoT”开发套件包含一个 ESP32-S3 芯片、双麦克风、小型扬声器和一块屏幕。包装内还附带多个扩展底座，提供 USB-C 电源接口和 GPIO 引脚，方便扩展设备能力。

<p class='img'>
<lite-youtube videoid="73QhFefsbbc" videotitle="Assist on the ESP32-S3-Box with custom artwork"></lite-youtube>
运行在 ESP32-S3-BOX 上、带自定义界面的 Assist。
</p>

[ESPHome] 团队一直在努力为 S3-BOX-3 增加支持，其中也包括自定义显示内容的能力！可以查看 [S3-BOX-3 教程][s3-box-教程] 开始体验。

<p class='img'>
<lite-youtube videoid="HQQfaXTbhvc" videotitle="The Frenck-en Box-3"></lite-youtube>
让 Frenck 作为你的语音助手陪你一起过节。
</p>

## 更多语音命令

早在\[第 1 章]中，我们就加入了以下语音命令支持：

* 打开和关闭灯光及其他设备
* 打开和关闭门、窗等
* 设置灯光亮度和颜色
* 向购物清单中添加项目
* 提问，比如某个区域里有哪些窗户处于开启状态

在第 5 章中，我们将这份列表扩展为：

* 向 **待办事项列表** 添加项目 - *"add take out the garbage to my task list"*
* 获取 **室内温度** - *"what's the temperature?"*
* 获取当前 **天气** 情况 - *"what's the weather like?"*
* **取消** 语音卫星唤醒后的操作 - *"never mind"*

请确保你已经\[公开]了希望 [Assist] 访问的设备，并且它们的命名足够清晰。如果你希望用更适合语音表达的方式来称呼某个设备，也可以随时添加一个\[别名]。例如，给天气实体添加一个名为 “Berlin” 的别名后，你就可以说 *"what's the weather like in Berlin?"*。

## 区域感知

语音卫星可以部署在家中的各个位置，因此在理解像 *"turn on the lights"* 这样的命令时，考虑它所在的区域就很重要了。现在，这条命令会打开语音卫星所在区域内的所有灯光，而 *"turn off the lights"* 则会执行相反操作。当然，你仍然可以通过明确指定区域来控制其他区域的灯光，比如：*"turn on the lights in the bedroom"*。

<p class='img'>
<lite-youtube videoid="pvEe0kVWFNE" videotitle="Area Awareness"></lite-youtube>
语音卫星会利用自己所在的区域信息。
</p>

这是语音卫星理解自身 *上下文* 并据此调整行为的一个小开始。

## 改进 Raspberry Pi 语音卫星

到目前为止，基于 Raspberry Pi 的语音卫星一直使用 Home Assistant 的 websocket API。这带来了一些限制，比如必须使用 API 令牌、无法知道语音卫星所在区域，也无法在 Home Assistant 的 UI 中进行配置。

我们扩展了 [Wyoming 集成][wyoming]，使其可以直接与[远程语音卫星][wyoming-satellite]通信。这些语音卫星会被自动发现，并且可以像基于 ESPHome 的卫星一样进行配置，包括设置所属区域和语音管线。

目前支持多种语音卫星模式，包括：

* **始终流式传输** - 语音卫星把所有音频都发送到 Home Assistant
* **检测到语音后再传输** - 仅在检测到说话时发送音频
* **本地唤醒词** - 仅在本地检测到唤醒词时发送音频

音频清理，比如自动增益控制和降噪，可以在 Home Assistant 中完成，也可以在语音卫星端完成。一台 [Raspberry Pi Zero 2 W][rpi-zero-2w] 已经有足够的性能来完成本地音频清理和唤醒词检测，让你可以部署多个语音卫星而不会给 Home Assistant 服务器带来太大压力。把你的旧 Raspberry Pi 再利用起来，开始智能家居语音控制之旅吧！

<p class='img'>
<img src='/home-assistant/images/blog/2023-12-13-year-of-the-voice-chapter-5/raspberry_pi_zero2w.png'>
Raspberry Pi Zero 2 W（建议零售价：15 美元）。
</p>

## 敬请期待

虽然声音之年即将落幕，但 Home Assistant 中的语音能力才刚刚起步！我，Mike “The Voice” Hansen，接下来会继续在 Nabu Casa 推进 Home Assistant 的语音与自然语言能力，让它变得更强。

在明年的路线图上，我们计划推进的事项包括：在 S3-BOX-3 上实现本地唤醒词检测，以及与 GPT 这类大语言模型（LLM）集成。我们也仍在寻找理想的语音卫星硬件：价格便宜、音频效果出色，并且还能在本地运行开源唤醒词模型。

## 感谢

感谢 Home Assistant 社区订阅 [Home Assistant Cloud][nabucasa]，支持声音之年，以及 Home Assistant、ESPHome 和其它项目的整体开发。

也感谢我们的语言负责人们，把语句支持扩展到各种不同语言。

<p class='img'>
<img src='/home-assistant/images/blog/2023-12-13-year-of-the-voice-chapter-5/ha-support.png' alt="感谢你支持 Home Assistant 项目">
</p>

[Year of the Voice]: /博客/2022/12/20/year-of-voice/

[Chapter 1]: /博客/2023/01/26/year-of-the-voice-chapter-1/

[Chapter 4]: /博客/2023/10/20/year-of-the-voice-chapter-4/

[Assist]: /voice_control/

[exposed]: /voice_control/voice_remote_expose_devices/

[alias]: /voice_control/aliases

[wyoming]: https://github.com/rhasspy/wyoming

[openWakeWord]: https://github.com/dscripka/openWakeWord

[Piper]: https://github.com/rhasspy/piper/

[community-wake-words]: https://github.com/fwartner/home-assistant-wakewords-collection

[ESP32-S3-BOX-3]: https://www.espressif.com/en/news/ESP32-S3-BOX-3

[wyoming]: /integrations/wyoming

[wyoming-satellite]: https://github.com/rhasspy/wyoming-satellite

[rpi-zero-2w]: https://www.raspberrypi.com/products/raspberry-pi-zero-2-w/

[s3-box-教程]: /voice_control/s3_box_voice_assistant/

[ESPHome]: https://esphome.io

[nabucasa]: https://www.nabucasa.com

[phone-教程]: https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/

[m5-教程]: /voice_control/thirteen-usd-voice-remote/
