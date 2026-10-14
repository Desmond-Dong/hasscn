# 语音篇章 11：多语言助手来了

<img src='/home-assistant/images/blog/2025-10-voice-chapter-11/art.webp' style='border: 0;box-shadow: none;' alt="Voice Chapter 11: multilingual assistants are here">

欢迎来到语音篇章 11 🎉。这是我们的[长期系列](/home-assistant/blog/categories/assist/)，会持续分享 Open Voice 的关键进展。在这一篇中，我们会告诉你，我们的助手如今如何能同时用多种语言控制家中的更多设备，而且不会说个没完。更棒的是，我们支持的语言列表再次扩大，还加入了几种连大科技公司语音助手都不支持的语言。欢迎在 10 月 29 日周三的[直播](https://www.youtube.com/watch?v=sIkguv0NEQI)中和我们一起深入了解这一篇章。已经过去了几个月，我们一直在积蓄语音能力，现在终于有很多内容可说了，那就开始吧！<!--more-->

## 多语言助手

我们在 2023 年[语音之年](/home-assistant/blog/2022/12/20/year-of-voice/)最初设定的目标，是“让用户能够用自己的语言控制 Home Assistant”。我们已经朝这个目标前进了很远，也大幅扩展了语言支持。我们还提供了多种方式，让用户可以根据自己语言的最佳支持情况，自定义语音助手管线，无论这些服务是本地运行还是运行在自己选择的云端。可如果你家里本来就同时说两种语言呢？

一段时间以来，用户已经可以在 Home Assistant 中为不同语言创建 [Assist](/home-assistant/voice_control/index.md) 语音助手管线，但要在这些不同管线之间交互，通常要么需要多台语音卫星设备（每种语言一台），要么需要某种自动化来[触发并切换语言](https://www.youtube.com/live/ZgoaoTpIhm8?t=3902)。

现在，就连我们支持的最小型语音卫星硬件，也已经可以运行[多个唤醒词](/home-assistant/blog/2024/06/26/voice-chapter-7/#3x-wake-words-and-2x-accuracy)。因此，从 2025.10 开始，我们加入了在每台 Assist 卫星设备上配置**最多两个唤醒词**和语音助手管线的支持！这让双语家庭能够更直接地为不同语言分配不同唤醒词。例如，“Okay Nabu” 可以启动英语语音管线，而 “Hey Jarvis” 则可用于法语。

多个唤醒词和多条管线也可以用于其他目的。想把本地语音助手和云端语音助手分开？没问题！你可以把 “Okay Nabu” 分配给一个完全本地化的管线，使用我们自己的 [Speech-to-Phrase](/home-assistant/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) 和 [Piper](https://github.com/home-assistant/addons/blob/master/piper/DOCS.md)。这条管线虽然只适合基础语音命令，但不需要任何东西运行在 Home Assistant 服务器之外。同时，你可以把 “Hey Jarvis” 分配给另一条使用 Home Assistant Cloud 与 LLM 等外部服务的管线，用于回答问题或执行复杂动作。

我们也非常想听听，你打算如何在家中使用多个唤醒词和语音助手！

## 没有 AI 的语音

现在全世界都沉浸在给万物加 AI 的热潮中——[而我们也确实没少分享自己在 AI 上做的酷东西](/home-assistant/blog/2025/09/11/ai-in-home-assistant/)。虽然让语音助手由 AI / LLM 驱动，会带来更强的灵活性和能力，但它同样有代价：要么付费使用 OpenAI、Google 之类的云服务，要么花大价钱购买硬件并消耗更多电力来运行 Ollama 这样的本地模型。我们在 AI 还没成为潮流之前就开始构建自己的语音助手，因此它从一开始就不是以 AI 为前提设计的。对于那些希望家中完全不引入 AI 的用户，我们也在持续推进完善的语音体验——坚持[AI 必须是可选而非必需](https://newsletter.openhomefoundation.org/ai-is-optional-privacy-isnt/)一直是我们的原则。

[Assist](/home-assistant/voice_control/index.md)，也就是我们内置的语音助手，即使不依赖 AI，也已经可以做很多很酷的事！它支持[数十种语言中的大量语音命令](/home-assistant/voice_control/builtin_sentences/index.md)，例如：

* 打开或关闭灯光及其他设备
* 打开、关闭、上锁、解锁门、窗、百叶等
* 调整灯光亮度和颜色
* 运行脚本并激活场景
* 控制媒体播放器并调节音量
* 通过 [Music Assistant](/home-assistant/integrations/music_assistant/index.md) 在支持的媒体播放器上播放音乐
* 启动、停止或暂停多个计时器，并可附带名称
* 向待办清单添加或完成项目
* 延迟执行命令（例如“5 分钟后关灯”）
* ……以及更多！

想加入你自己的语音命令？你可以快速为自动化添加[自定义句子](/home-assistant/voice_control/custom_sentences/index.md)，把任意动作与自定义响应结合起来。

最简单的入门方式，就是使用 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/)，这是一款体积小巧、易于上手的语音助手硬件。搭配 [Home Assistant Cloud 订阅](/home-assistant/cloud/index.md)，任意 Home Assistant 系统都可以快速处理语音命令，因为我们的隐私友好型云服务会负责语音转文字（把你的语音转成文本）以及文字转语音（把 Home Assistant 的回复重新变成语音）。整个过程都不依赖 LLM，同时还能支持 Home Assistant 的开发 😎。

对于希望把所有语音处理都放在本地的用户，我们也同时提供语音转文字和文字转语音插件：

* [Whisper](https://github.com/home-assistant/addons/blob/master/whisper/DOCS.md) 是一个强大的语音转文字系统，提供[多种不同尺寸的模型，对硬件要求也不同](https://github.com/openai/whisper#available-models-and-languages)
* [Speech-to-Phrase](/home-assistant/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) 是我们的语音转文字系统，以灵活性换取速度
* [Piper](https://github.com/home-assistant/addons/blob/master/piper/DOCS.md) 是我们快速的神经网络文字转语音系统，具备[广泛的语言支持](https://rhasspy.github.io/piper-samples/)

所有这些加在一起，已经足以说明：即使完全不引入 AI，我们也能做到很多事情，尽管 AI 确实可以做出[一些非常惊人的效果](https://youtu.be/mLtFUG4YG1A)。而通过这篇文章中介绍的多语言助手、改进的句子匹配，以及自动化中主动提问能力，我们还会继续缩小这之间的差距。

### 更多 intent

Intent 是语音命令与 Home Assistant 中正确动作之间的连接层，用来真正完成某件事。虽然最终结果通常很简单，比如打开一盏灯，但 intent 设计的目标其实是提供一层“理解你的意思再执行”的抽象，而不只是最底层的动作调用。在前一节中，我们列举了 intent 可以支持的语音命令种类，从开灯到添加待办事项。过去三年里，我们一直在逐步为其增加新的、更复杂的 intent。

最近，我们又新增了 3 个 intent，让 Assist 更加好用。现在控制媒体播放器时，你可以通过语音设置**相对**音量，比如“把音量调大一点”或“把电视音量降低 25%”。这补充了原有的音量 intent，后者用于设置绝对音量，比如“把电视音量设为 50%”。

其次，现在你也可以用百分比来设置风扇速度。例如，“把书桌风扇速度设为 50%”，或者甚至直接说“把风扇设为 50%”，让它作用于当前区域内的所有风扇。只要记得先[暴露](/home-assistant/voice_control/voice_remote_expose_devices/index.md)你希望 Assist 能控制的风扇即可。

最后，你现在甚至可以告诉孩子们“离草坪远点”，因为你的机器人马上要去割草了！借助 [lawn\_mower](/home-assistant/integrations/lawn_mower.md) 集成，你的语音助手现在已经能理解“去割草”或“停止割草机”这类命令。配合已有的智能吸尘器语音控制指令，你可能真的再也不用亲自动手去维持家里整洁了。

### 主动提问

*设想一下：* 你下班回家，刚走进客厅，语音助手就问你想听什么类型的音乐，好在做晚饭时播放。音乐开始后，它又提醒你车库门还开着，并询问你是否要把它关上。晚饭后，你坐在沙发上休息时，它又告诉你外面的气温已经低于空调设定值，并询问是否要关闭空调、打开窗户。

*你大概会觉得，这种魔法肯定需要强大的 LLM 才能实现吧？* 其实借助 [Ask Question 动作](/home-assistant/integrations/assist_satellite/index.md#action-assist_satelliteask_question)，这一切都可以在本地通过 Assist 和几个自动化来完成！

<div class="contain">
    <img src="/home-assistant/images/blog/2025-10-voice-chapter-11/automation.webp" alt="Ask Question LLM in action" style="width:100%;max-width:unset;">
</div>

在自动化中，[Ask Question](/home-assistant/blog/2025/07/02/release-20257/#let-assist-ask-the-questions) 动作允许你在某台语音卫星上播报一条消息，对用户回答进行匹配，并根据匹配结果执行不同动作。回答可以是开放式的，比如一个歌手或音乐类型；但如果你把可选回答限制在一定范围内，就可以使用完全本地的 [Speech-to-Phrase](/home-assistant/blog/2025/02/13/voice-chapter-9-speech-to-phrase/) 来完成语音识别，而不需要互联网连接。

## 改进的句子匹配

Assist 的设计目标，是能在树莓派 4 这类硬件上，以完全离线的方式，为多种语言提供快速响应。它的工作原理，是将语音命令文本与句子模板进行匹配，比如“打开 {name}”或“关闭 {area} 里的灯”。这种方法速度快，也很容易[翻译成多种语言](https://github.com/home-assistant/intents/)，但缺点是有时不够灵活，容易导致熟悉的“抱歉，我没有听懂”或者其他错误。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-10-voice-chapter-11/sentence-matching.webp" alt="Conversation with sentence matching" style="width:100%;max-width:420px;">
</div>

从 [Home Assistant 2025.9](/home-assistant/blog/2025/09/03/release-20259/) 开始，我们加入了一个改进版的“模糊匹配器”，它更擅长处理额外词汇以及对已支持语音命令的不同说法。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-10-voice-chapter-11/fuzzy-matching.webp" alt="Conversation with fuzzy matcher" style="width:100%;max-width:420px;">
</div>

模糊匹配器是基于现有句子模板预训练的，因此未来我们可以把它推广到所有已支持的语言。不过在初始阶段，它仅适用于英语，我们也正在研究如何以最佳方式将其扩展到其他语言。

## 非语言确认

在你说完语音命令后，Assist 通常会给出一句简短确认，比如“已打开灯光”或“亮度已设置”。这会让你知道它理解了命令并执行了对应动作。不过，如果你和语音助手正处在同一个房间，这样的确认其实有些重复，因为你已经能看到或听到动作生效了。

从 [Home Assistant 2025.10](/home-assistant/blog/2025/10/01/release-202510/) 开始，Assist 会检测该语音命令触发的动作是否都发生在与卫星设备相同的区域内。如果是，它就不再播放完整的语音确认，而会改为播放一声简短的“哔”声。除了更简洁以外，这也能提醒你：此次语音命令只影响了当前区域。

在使用 LLM 的语音助手管线中，我们不会启用非语言确认，因为用户可能在提示词中设置了专门指令，比如“请用海盗口吻回答”，我们可不想剥夺你们听到有趣回应的权利，伙计们 🏴‍☠️。

## 文本转语音流式输出

大型语言模型（LLM）的回复往往特别长，而我们很快意识到，这暴露了 Home Assistant 文本转语音（TTS）实现中的一个薄弱点。在过去很长时间里，Home Assistant 中的 TTS 都要求先把完整回复全部生成出来，随后才开始播放音频。这意味着面对多段式的 LLM 回答时，尤其是使用 Piper 这种本地 TTS 系统时，等待时间会非常明显。

要解决这个问题，就必须对 TTS 架构进行重构，以支持**流式处理**。我们不再等待整段音频全部合成完成后再播放，而是让 Home Assistant 中的 TTS 服务能够处理分块文本输入和分块音频输出。随着 LLM 持续流式输出文本片段，TTS 服务可以同步合成音频片段，并立即开始播放。

为了展示流式处理的好处，我们让 LLM [“讲一个关于青蛙的长故事”](/home-assistant/blog/2025/09/11/ai-in-home-assistant/#:~:text=Prompt%3A%20%E2%80%9CTell%20me%20a%20long%20story%20about%20a%20frog%E2%80%9D)，并测量从发出请求到开始出声所用的时间。在不开启流式处理时，Home Assistant Cloud 和 Piper 都需要 5 秒以上才开始回应！这么长的时间，足够让你怀疑语音助手是不是根本没听见 😄。而在启用流式处理后，这两种 TTS 服务都只需大约半秒就能开始说话，延迟提升约 10 倍！

## 新的 Piper 语音

Piper 作为我们自研的文本转语音工具，也在持续成长，并新增了多种语言支持！这些新语音都基于公开可用的语音数据集训练而成，现在已经可在 [Piper 插件](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_piper) 中使用：

* Daniela（阿根廷西班牙语）
* Pratham、Priyamvada、Rohan（印地语）
* News TTS（印尼语）
* Maya、Padmavathi、Venkatesh（泰卢固语）

想知道这些新语音听起来怎么样？你可以在[示例页面](https://rhasspy.github.io/piper-samples/)试听所有可用的 Piper 声音，甚至还能免费[直接在浏览器里运行 Piper](https://rhasspy.github.io/piper-samples/demo.html)。

如果你的语言还没有被 Piper 支持，或者你不喜欢当前语言已有的声音，我们也一直在寻找愿意贡献声音的志愿者！欢迎通过 <voice@openhomefoundation.org> 与我们联系。

## 总结

在过去三年里，我们在 Home Assistant Voice 的硬件与软件两端都取得了巨大进展。如今，用户在语音方案上拥有了丰富选择：从完全本地化，到利用最先进 AI 为智能家居赋能，都由你决定。我们在 AI 上探索的可贵之处在于：背后没有追求回报的投资人、没有泡沫资金，也没有“割韭菜”操作。我们做这一切，都是为了你——我们的社区。我们是在做长期的事情，而是否拥抱这项技术、还是干脆远离这波热潮，也始终应该由你来决定。

语音领域中大量更高级的工作，只有在社区支持下才有可能实现，尤其是那些订阅了 [Home Assistant Cloud](/home-assistant/cloud/index.md) 或购买了 [Home Assistant Voice Preview Edition](/home-assistant/voice-pe/) 的用户（这两者也都是开启语音体验的绝佳方式）。
