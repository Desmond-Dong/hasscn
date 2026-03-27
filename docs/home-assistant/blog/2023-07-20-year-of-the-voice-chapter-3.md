---
title: '语音之年 - 第 3 章：随时待命'
description: '<p<img src=''/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/social.png'' class=''no-shadow'' /</p。 本页属于 Home Assistant 中文博客与更新记录。'
---
# 语音之年 - 第 3 章：随时待命

<p><img src='/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/social.png' class='no-shadow' /></p>

今年是 Home Assistant 的[语音之年]。我们在 2023 年的目标，是让用户能够用自己的语言控制 Home Assistant。今天，我们要发布今年的第三个里程碑：第 3 章。

在[第 1 章]中，我们专注于意图，也就是你想做什么。如今，Home Assistant 社区已经把常见的智能家居命令和响应翻译成了[50 种语言]，离 Home Assistant 所支持的 62 种语言又更近了一步。

在[第 2 章]中，我们引入了语音转文字和文字转语音。这让你能够通过浏览器、[ESPHome]，甚至[模拟电话]与自己的智能家居进行对话和收听反馈。

来到第 3 章，我们把 [Assist] 的完整能力带给了安装 Home Assistant Companion 应用的数百万活跃 Android 设备。你有 Android 手机、平板或手表吗？把 Assist 设为你的默认数字助理，只需按一下就能和 Home Assistant 对话！

<lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

<lite-youtube videoid="5b7nqGZyeVU" videotitle="Use Assist natively on your Android watch"></lite-youtube>

_如果你想观看这篇博客文章的视频演示版，包括现场演示，请查看[我们的直播录像][live-stream]_ 

[语音之年]: https://www.home-assistant.io/博客/2022/12/20/year-of-voice/
[第 1 章]: https://www.home-assistant.io/博客/2023/01/26/year-of-the-voice-chapter-1/
[第 2 章]: https://www.home-assistant.io/博客/2023/04/27/year-of-the-voice-chapter-2/
[50 种语言]: https://ohf-voice.github.io/intents/
[live-stream]: https://youtube.com/live/sXzItFksYFA?feature=share
[Assist]: /voice_control/
[ESPHome]: /voice_control/thirteen-usd-voice-remote/
[模拟电话]: /voice_control/worlds-most-private-voice-assistant/

<!--more-->

## Android 原生 Assist

从第 3 章开始，[Home Assistant Companion 应用]已原生支持 Assist。借助这次更新，超过一百万台使用 Home Assistant 的 Android 设备都可以获得 Assist 的完整能力。你可以直接在应用中选择 Assist 按钮，然后通过手机与智能家居对话：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/phone-ha.jpg" alt="Screenshot of Assist in HA Companion app" style="max-height: 550px;" />
Android 上的 Assist 已内建于 Android 应用中，并使用 Home Assistant 的语音转文字能力。
</p>

有 [Home Assistant Cloud 订阅]吗？现在你可以在世界任何地方通过语音控制你的智能家居，同时依然保护隐私。[支持多个 Home Assistant 服务器]，所以你也可以轻松连到父母家里的系统：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/multi-server.png" alt="Screenshot of Assist picking a voice assistant" style="max-height: 550px;" />
从你已配置的任意 Home Assistant 实例中选择一个语音助理。
</p>

[支持多个 Home Assistant 服务器]: /voice_control/android/#using-assist-with-multiple-home-assistant-servers

### 默认数字助理

如果没必要，为什么还要先打开应用？把 Home Assistant 设为你的[默认数字助理应用]！现在，长按 Home 键或电源键就能立即唤出 Assist：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/phone.jpg" alt="Screenshot of Assist activated on the home screen" style="max-height: 550px;" />
无需打开 Home Assistant 应用，就能在 Android 的任何位置启动 Assist。
</p>

你甚至可以直接从锁屏界面激活 Assist：

<lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

你可以在 Android 中找到这个设置：**设置** > **应用** > **默认应用**，或者选择 Home Assistant Companion 设置中的提示。

[Home Assistant Companion 应用]: https://companion.home-assistant.io/
[Home Assistant Cloud 订阅]: https://www.nabucasa.com/
[默认数字助理应用]: /voice_control/android/#setting-up-home-assistant-assist-as-default-assistant-app-on-an-android-phone

## Wear OS 原生 Assist

我们也没有忘记手表！Wear OS 设备现在同样可以原生[使用 Assist]：

<lite-youtube videoid="5b7nqGZyeVU" videotitle="Use Assist natively on your Android watch"></lite-youtube>

文字转语音的响应会直接从手表播放出来，让你无需查看屏幕确认，直接听就可以。

和手机一样，你也可以把 Home Assistant 设为[手表的默认数字助理]。现在按下表冠或长按手表按钮，就能调出 Assist！

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/watch.png" alt="Screenshot of native Assist on Wear OS" style="max-height: 250px;" />
Wear OS 原生 Assist。
</p>

[使用 Assist]: /voice_control/android/#assist-on-wear-os
[手表的默认数字助理]: /voice_control/android/#setting-up-home-assistant-assist-as-default-assistant-app-on-a-wear-os-watch

## 句子触发器

虽然[自定义句子]早已是 Assist 的一部分，但以前必须手动编辑 YAML。现在有了新的[句子触发器]，你可以直接在 UI 中添加自定义句子：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/sentence-trigger.png" alt="句子触发器创建界面截图" />
在自动化编辑器中配置你自己的句子，以触发任意动作
</p>

这些句子的优先级高于内置命令，并且可以在 Assist 可用的任何地方生效。还支持一些基础的[模板语法]，比如把句子中的某些部分标记为可选。

[自定义句子]: /voice_control/custom_sentences/
[句子触发器]: /voice_control/custom_sentences/#adding-a-custom-sentence-to-触发器-an-自动化
[模板语法]: https://开发者.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax

## Assist 调试工具

Home Assistant 社区正在努力翻译[常见智能家居命令]。为了帮助贡献者，我们新增了一个[“Assist”开发者工具]，让你无需真正执行命令就能测试句子：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/sentence-debug.png" alt="Assist 开发者工具截图" />
使用 Assist 开发者工具测试句子理解结果。
</p>

对于每条测试命令或查询，你都可以看到：

- 会触发哪个[意图]以及对应的槽位值
- 会定位到哪些实体
- 每个目标实体是否匹配成功（仅查询类语句）

[常见智能家居命令]: https://github.com/home-assistant/intents/
[意图]: https://开发者.home-assistant.io/docs/intent_builtin
[“Assist”开发者工具]: /voice_control/troubleshooting/#test-a-sentence-per-assistant-without-voice-while-executing-the-commands

## Piper 社区语音

[Piper] 是 Nabu Casa 创建的文字转语音系统，专为在树莓派 4 上本地运行而设计。自从它在第 2 章中亮相以来，Piper 已在开源社区以及[学术界]中被广泛采用，并且[迅速发展]。

<p class='img'>
<img style='width: 80%' src='/home-assistant/images/assist/piper-logo.svg' alt='Piper logo' class='no-shadow'>
</p>

即将在 Home Assistant 2023.8 中发布的[Piper 加载项]将支持 23 种语言和超过 70 种不同声音。其中还包括 Home Assistant 社区贡献的 7 个全新[语音数据集]所提供的声音。这些数据集由 Nabu Casa 收集并捐赠到公共领域，以支持当前和未来的文字转语音研究。

你可以在[自动化中使用 Piper]时用它来播报文字转语音通知，或者把它作为你的声音来[设置完全本地化的助理]。

[Piper]: https://github.com/rhasspy/piper/
[迅速发展]: https://building.open-home.io/piper-is-our-new-voice-for-the-open-home/
[Piper 加载项]: https://github.com/home-assistant/addons/blob/master/piper/README.md
[学术界]: https://www.techrxiv.org/articles/preprint/Image_Captioning_for_the_Visually_Impaired_and_Blind_A_Recipe_for_Low-Resource_Languages/22133894
[语音数据集]: https://github.com/NabuCasa/voice-datasets/
[自动化中使用 Piper]: /voice_control/using_tts_in_automation/
[设置完全本地化的助理]: /voice_control/voice_remote_local_assistant/

## 全新的 ESPHome 语音模式

<a href="https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit"><img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/atom_echo.png" alt="ATOM Echo Smart Speaker from M5Stack" style='width:96px;float:right;margin-left:8px;'/></a>

借助售价 13 美元的 [ATOM Echo] 这类硬件，在第 2 章里我们已经可以[使用 ESPHome 创建按键通话式语音助理]。

使用最新版 ESPHome，你可以按下按钮开始说话，并让 Home Assistant 检测语音命令何时结束。现在也提供连续模式，让你能够像使用模拟电话一样，与 Assist 进行多轮对话。

```yaml
voice_assistant:
  microphone: ...
  speaker: ...

binary_sensor:
  - platform: gpio
    pin: ...
    on_click:
      - if:
          condition: voice_assistant.is_running
          then:
            - voice_assistant.stop:
          else:
            - voice_assistant.start_continuous:
```

[ESPHome 语音助理文档](https://esphome.io/components/voice_assistant.html#click-to-converse)

### 静音检测

ESPHome 的新语音模式会使用 Home Assistant 来检测每条语音命令的结束。在你的设备配置中，现在可以通过“结束说话检测”调整需要多长时间的静音才算说完：

<p class='img'>
<img src="/home-assistant/images/blog/2023-07-20-year-of-the-voice-chapter-3/esphome_config.png" alt="为你的 ESPHome 语音助理配置静音检测" />
ESPHome 语音助理提供两个配置实体，可用于在 Home Assistant 中自动化其行为。
</p>

[ATOM Echo]: https://shop.m5stack.com/products/atom-echo-smart-speaker-dev-kit
[使用 ESPHome 创建按键通话式语音助理]: /voice_control/thirteen-usd-voice-remote/

## 下次见

第 3 章就到这里！非常感谢 [Joris Pelgröm] 在 Android 应用上的工作，也感谢众多 Assist 贡献者。
和往常一样，也感谢 [Nabu Casa](https://www.nabucasa.com) 以及所有 Home Assistant Cloud 订阅者，是你们让这一切成为可能。

如果你想资助我们在语音方向上的工作，以及 Home Assistant、ESPHome、Z-Wave JS 和其他相关项目的后续开发，欢迎订阅 [Home Assistant Cloud](https://www.nabucasa.com)。

### 唤醒词去哪了？

在语音之年进行了三个章节之后，Home Assistant 用户和创作者传达的信息已经非常明确：我们希望 Assist 拥有唤醒词！

在第 4 章中，我们的重点将是交付唤醒词检测的基础能力。作为[开放家庭]的一部分，这项基础能力将继续遵循我们的价值观：隐私、选择权和可持续性。敬请期待！

[Joris Pelgröm]: https://github.com/jpelgrom
[开放家庭]: https://www.home-assistant.io/博客/2021/12/23/the-open-home/

_本页中的部分链接为联盟链接，通过这些链接进行的购买将为 Home Assistant 项目提供支持。_
