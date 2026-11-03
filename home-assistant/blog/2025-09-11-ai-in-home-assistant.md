# 构建由 AI 驱动的本地智能家居

<img src='/home-assistant/images/blog/2025-09-ai/art.webp' style='border: 0;box-shadow: none;' alt="Building the AI-powered local smart home">

去年，我们提出了[智能家居中的 AI 愿景](/home-assistant/blog/2024/06/07/ai-agents-for-the-smart-home/)，这为 Home Assistant 中的 AI 实验打开了大门。在那次更新中，我们让各种本地和云端 AI 工具更容易接入，并提供了使用它们来控制和自动化家庭的方法。如今一年过去，AI 领域发生了很多变化，而我们的社区也确保了 Home Assistant 始终站在前沿。

我们抢在大科技公司之前，让 AI 真正对家庭场景有用。我们做到这一点的方式，是把是否以及如何使用 AI 的控制权完全交给社区，让 AI 成为家庭中的强大\_工具\_，而不是接管你家庭的一切。我们的社区正在利用 AI 独特的能力，比如图像识别或内容总结，同时也能把它排除在那些他们不希望 AI 介入的关键任务之外。最棒的是，这一切都可以在本地运行，完全不需要让数据离开你的家！

此外，如果用户不想在家里使用 AI，那也是他们的选择，他们完全可以不启用这些功能。真心希望大科技公司也能采取如此克制的做法，不过从他们最近几场发布会来看，我并不抱太大希望。

在过去一年里，我们添加了许多新的 AI 功能，并让它们能直接通过 Home Assistant 的用户界面轻松使用。我们也一直紧跟 AI 领域的发展，采用最新标准来接入比以往更多的模型和工具。同时，我们还在持续对本地和云端模型进行基准测试，帮助用户判断什么最适合自己。继续读下去，看看有哪些新内容，也许你能教会你的智能家居一些很酷的新招数。

<p class="img">
    <lite-youtube videoid="iZ-JdpxEx3o" videotitle="Multiple commands with Ollama"></lite-youtube>
    本地 AI 正让家庭控制变得更加自然
</p>

特别感谢我们的 AI 社区贡献者团队：<br>
[@AllenPorter](https://github.com/allenporter)、[@shulyaka](https://github.com/shulyaka)、[@tronikos](https://github.com/tronikos)、[@IvanLH](https://github.com/IvanLH)、[@Joostlek](https://github.com/Joostlek)！

<!--more-->

## 用 AI 强化语音控制

在 AI 还没火起来之前，我们就已经在做语音助手了。2023 年，我们开启了[语音之年](/home-assistant/blog/2022/12/20/year-of-voice/)。从那时起，我们一直朝着打造一个本地、开放且注重隐私的语音助手目标前进。AI 热潮到来后，我们也迅速将其集成进来。

如今，用户可以与任何已接入 Home Assistant 的大型语言模型（LLM）对话，无论它是在云端，还是通过像 [Ollama](/home-assistant/integrations/ollama/index.md) 这样的服务在本地运行。[Assist](/home-assistant/voice_control/index.md) 是我们自研的非 AI 语音助手代理，重点处理一套预定义的家庭控制命令，而 AI 则让你能提出更开放的问题。你可以让它总结那些你[暴露给 Assist 的](/home-assistant/voice_control/voice_remote_expose_devices/index.md) 智能家居传感器正在发生什么，或者回答一些知识问答。你甚至还可以[给 LLM 设定人格](/home-assistant/voice_control/assist_create_open_ai_personality/index.md)！

用户也可以借助 AI 的力量，用\_自己习惯的方式\_说话，因为 LLM 在理解话语背后的意图方面要强得多。默认情况下，Assist 会先处理命令；只有它无法理解的问题或命令，才会发送给你配置好的 AI。举例来说，*“打开厨房灯”* 可以由 Assist 处理，而 *“厨房里有点暗，你能帮忙吗？”* 则可以交给 AI。这样既加快了简单命令的响应速度，也让语音助手更可持续。

过去一年中的另一个强大改进，是代理之间可以共享上下文。因此，你的 Assist 代理可以把最近的命令共享给你所选的 AI 代理。这种共享上下文让你可以先说 *“把牛奶加入购物清单”*，由 Assist 执行；接着只要再说 *“再加上大米”*，AI 代理就能理解这些命令是关联的，并据此继续处理。

<p class="img">
    <lite-youtube videoid="mLtFUG4YG1A" videotitle="Current state of conversational AI - September 2025"></lite-youtube>
    这里有一段非常棒的演示视频，展示了 JLo 的 AI 智能家居以及这些新功能的实际效果
</p>

另一个很实用的改进，是让对话可以继续进行：如果 LLM 反过来问你问题，你的 Assist 硬件会继续监听你的回答。比如你说“有点暗”，它可能会问你是否想打开一些灯，而你可以直接告诉它继续执行。我们甚至比其他语音助手更进一步：现在你可以让 Home Assistant 主动发起对话。例如，你可以设置一个自动化，在检测到车库门开着时，询问你是否要把它关上（当然，这个场景即使不用 AI，也可以通过一个非常巧妙的 [Blueprint](https://my.home-assistant.io/redirect/blueprint_import?blueprint_url=https%3A%2F%2Fwww.home-assistant.io%2Fblueprints%2Fblog%2F2025-07%2Fask_yes_no_question.yaml) 来实现）。

AI 还推动我们彻底重做了文本转语音（TTS）系统，以便利用 LLM 的流式响应。虽然本地 AI 模型可能较慢，但我们用了一个简单技巧，把延迟变得几乎难以察觉。现在，无论是 [Piper](https://github.com/OHF-Voice/piper1-gpl)（我们的本地 TTS）还是 [Home Assistant Cloud](/home-assistant/cloud/index.md) TTS，只要 LLM 生成出前几个词，就能立即开始生成音频，使语音响应速度提升到原来的十倍。

**提示词：“给我讲一个关于青蛙的长故事”**

| **设置** | **开始说话所需时间** |
| -------------------- | -------------------------- |
| 云端，非流式 | 6.62 秒 |
| 云端，流式 | 0.51 秒（快 13 倍） |
| Piper，非流式 | 5.31 秒 |
| Piper，流式 | 0.56 秒（快 9.5 倍） |

*Ollama gemma3:4b 运行于 RTX 3090，Piper 运行于 i5 平台*

## 与 AI 搭配的优秀硬件

人们已经做出了很多很酷的语音硬件，从座机电话到会说话的小机器人都有，但过于 DIY 始终是入门门槛。为了让每个人都能使用我们的语音助手，我们发布了 [Home Assistant Voice Preview Edition](/home-assistant/blog/2024/12/19/voice-preview-edition-the-era-of-open-voice/)。这是一个简单且价格亲民的方式，帮助你体验 Home Assistant Voice。它小巧的机身中却集成了非常强大的音频处理硬件。如果你之前还在犹豫要不要尝试语音，它确实是[最好的入门方式](/home-assistant/voice-pe/)。

<p class="img">
    <img src="/home-assistant/images/blog/2025-09-ai/voice-pe.webp" style='border: 0;box-shadow: none;' alt="Home Assistant Voice Preview Edition">
    Voice Preview Edition 不仅开放而强大，看起来和摸起来也都很棒！
</p>

现在，通过我们的 [Voice Assistants](https://my.home-assistant.io/redirect/voice_assistants/) 设置页面，你比以往任何时候都更容易让 Assist 硬件与 LLM 协同工作，甚至还能为每台设备分配不同的 LLM。LLM 可以识别自己所在的房间和其中的设备，使回答更贴近场景。Assist 原本就是控制家中设备的绝佳方式，而有了 AI，它能做的就更多了。

## AI 驱动的建议

[上个月](/home-assistant/blog/2025/08/06/release-20258/)，Home Assistant 推出了一个新的可选加入功能，让你在使用 Home Assistant 构建自动化时借助 AI 的力量。目标是缩短从一片空白到实现完整想法之间的距离。

现在，在保存自动化或脚本时，用户可以使用新的 Suggest 按钮：<img src="/home-assistant/images/blog/2025-09-ai/suggest.webp" style='border: 0;box-shadow: none;'>。点击后，它会将你的自动化配置、现有自动化标题以及标签一起发送给 AI，为新的自动化建议名称、描述、分类和标签。接下来的几个月里，我们还会继续探索还有哪些功能能从 AI 建议中受益。

<div class="contain nb">
    <img src="/home-assistant/images/blog/2025-09-ai/suggest-button.webp" alt="A rename modal open with the new Suggest button top right">
</div>

要启用此功能，你需要完成两个步骤。首先，你需要配置一个能提供 [*AI Tasks* 实体](/home-assistant/integrations/index.md?cat=ai) 的集成。若想使用本地 AI，可以配置 Ollama；你也可以使用 Google、OpenAI 或 Anthropic 这类云端 AI。配置完成后，前往 **系统** > **常规** 下新的 [AI Task 偏好设置面板](https://my.home-assistant.io/redirect/config_ai_task/)，选择一个 AI Task 实体为界面中的建议功能提供支持。如果你没有配置 AI Tasks 实体，Suggest 按钮就不会显示。

<div class="contain nb">
    <img src="/home-assistant/images/blog/2025-09-ai/ai-suggestions.webp" alt="The AI Suggestions setting within Home Assistant">
</div>

## AI Tasks 真正把事情做完

启用 [AI Tasks](/home-assistant/integrations/ai_task/index.md) 的意义，不只是快速为自动化生成标签和总结；它真正的超能力，是让 AI 能在模板、脚本和自动化中被轻松使用。AI Tasks 允许其他代码调用 AI 生成数据，还支持附加文件，并定义你希望它以什么格式输出数据，比如 JSON schema。

我们都见过社区里那些令人惊叹的作品：有人利用 AI 图像识别与分析来[检测空闲停车位](https://www.reddit.com/r/homeassistant/comments/1lytyv9/parking_spot_detection/)，或者[统计鸡舍里有多少只鸡](https://houndhillhomestead.com/google-gemini-powered-goose-coop-door/)。现在，AI Tasks 很可能让你在 Home Assistant 中也能轻松做到这些，而不需要复杂脚本、额外插件或 HACS 集成。

下面是一个模板实体的示例，它通过简短直接的指令统计视频画面中的鸡只数量。

```yaml
template:
 - triggers:
     - trigger: homeassistant
       event: start
     - trigger: time_pattern
       minutes: "/5"
   actions:
     - action: ai_task.generate_data
       data:
         task_name: Count chickens
         instructions: >-
           This is the inside of my coop. How many birds (chickens, geese, and
           ducks) are inside the coop?
         structure:
           birds:
             selector:
               number:
         attachments:
           media_content_id: media-source://camera/camera.chicken_coop
           media_content_type: image/jpeg
       response_variable: result
   sensor:
     - name: "Chickens"
       state: ""
       state_class: total
```

这个模板会把摄像头快照发送给 AI，并要求它分析画面中发生了什么。它还定义了输出必须始终是一个数字，因为我们希望把这项信息在 Home Assistant 中进一步使用。所有这些都被封装在一个模板实体里，并每 5 分钟自动更新一次。AI Task 也可以嵌入到自动化、脚本，或任何能够执行动作的地方。

<div class="contain">
    <img src="/home-assistant/images/blog/2025-09-ai/activity.webp" alt="Activity view in Home Assistant of the doorbell image analyzed by AI Tasks">
    一个自动化会触发 AI Task，以识别摄像头中引发运动检测的对象。
</div>

最后，用户还可以设置默认的 AI Task 实体。这样一来，在创建 AI 自动化时就不必每次都手动指定实体 ID。它还让你只需一次点击，就能把所有使用 AI Tasks 的内容迁移到最新模型上。这也使得分享依赖 AI Tasks 的蓝图变得更加容易，比如这个在检测到运动时分析摄像头快照的蓝图。

## MCP 打开了全新的世界

[Model Context Protocol](/home-assistant/integrations/mcp/index.md)（MCP）是一层很薄的协议，让 LLM 可以接入\_任何东西\_。在这个规范刚公布时，我们就迅速跟进并把它集成进了 Home Assistant。实际上，这些服务器让 Home Assistant 的 Assist 对话代理获得了各种全新工具。你可以连接一些 MCP 服务器，让 Assist 获取最新新闻、你的待办事项，甚至接入一个整理黑胶唱片收藏的服务器，从而进行更丰富的对话（例如：*“Okay Nabu，我有哪些 Replacements 专辑？哪些还不在我的 Vinyl-to-Purchase 列表里？”*）。

反过来，你也可以[把 Home Assistant 变成一个 MCP 服务器](/home-assistant/integrations/mcp_server/index.md)，让 AI 系统访问你家中的信息。比如，你可以构建一个特别擅长创建 Home Assistant 自动化的本地 AI，并让它获取你所有实体名称和可用动作。MCP 正在获得越来越广泛的支持，目前已经有不少优秀的云端和自托管解决方案可用。

## 如何选择模型

现在可选的模型非常多，很难知道从哪里开始。幸运的是，Home Assistant 的 AI 大师 [@AllenPorter](https://github.com/allenporter) 在这里帮你。他整理了一份非常实用的 [Home LLM Leaderboard](https://github.com/allenporter/home-assistant-datasets/tree/main/reports)。这份数据集收录了他对云端与本地 LLM 选项的大量测试，甚至还包含一些让小型本地 LLM 也有机会一战的测试（参见 [assist-mini](https://github.com/allenporter/home-assistant-datasets/tree/main/reports#assist-mini)）。

目前，排行榜显示几家大型云服务商的最新模型彼此差距已经很小，而使用 8GB 或更多显存的近期本地模型也几乎能跟上节奏。过去，大多数模型之间差距很大；而现在，几乎很难选错。

这尤其有帮助，因为随着 [OpenRouter](/home-assistant/integrations/open_router.md) 的加入，Home Assistant 中 LLM 的选择几乎呈指数级增长。OpenRouter 为 LLM 提供了统一接口，让用户在 Home Assistant 中能访问 400 多个新模型，并且从第一天起就支持 AI Tasks。我们现在真的是选择太多了。

## 未来属于开放与开源

Home Assistant 是开放的。我们相信，你应该掌控自己的数据，也掌控自己的智能家居，全部都是。通过本地 LLM 和我们构建 Home Assistant 的方式，这种选择也延伸到了 AI 领域，同时依然保护你的隐私。

更关键的是，我们把这一切都做成了开源。我们由社区驱动，并与社区一起完成这些工作。Open Home Foundation 没有投资人，不需要向任何人负责，除了我们的用户。我们的工作资金来自硬件销售和 [Home Assistant Cloud](/home-assistant/cloud/index.md) 订阅，这让我们能够把所构建的一切技术都免费且开放地提供出来。
