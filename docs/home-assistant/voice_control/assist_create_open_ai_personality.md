---
title: 使用 AI 创建个性
---

你可以通过 AI 对话代理为语音助手赋予个性。

## 在 Assist 中结合 AI，具体能做什么？

- 选择你喜欢的 LLM 提供商，本地或云端都可以，只要它提供对话代理即可。
- 根据提示词选择一个个性设定。
- 获得带有你定义角色风格的回复。
- 执行 Home Assistant 意图（如打开/关闭灯光等），前提是 Assist 已按照我们的[最佳实践](/home-assistant/voice_control/best_practices)正确配置。

看看这段 1 分钟短片，了解 Assist 如何借助 AI 控制智能家居。

<lite-youtube videoid="KXoIpwKsekY" videotitle="Demo of using Assist with an AI to control your smart home!"></lite-youtube>

## 有哪些可用的 LLM 提供商？

基于 LLM 的代理在不断演进，而 Home Assistant 已支持其中的大多数。如果你想更深入了解如何为自己的设置选择最佳方案，可以查看[这份对比研究](https://github.com/allenporter/home-assistant-datasets/tree/main/reports)。

Home Assistant 同时支持由 [Open AI](/home-assistant/integrations/openai_conversation/) 或 [Anthropic](/home-assistant/integrations/anthropic/) 提供的云端代理，以及由 [Ollama](/home-assistant/integrations/ollama) 提供的本地代理。

## 前提条件

- 已根据我们的[最佳实践](/home-assistant/voice_control/best_practices)配置好 Home Assistant 和 Assist。
- 拥有你所选 LLM 提供商对话代理的账户。如果只是想测试流程，可以在 Open AI 创建免费账户。
- 如果使用本地 LLM 方案，你需要先安装好模型。

### 使用基于 LLM 的对话代理创建语音助手个性

1. 前往 [**设置** > **设备 & 服务**](https://my.home-assistant.io/redirect/integrations/) 并 **Add 集成**，找到你的 LLM 提供商，并使用 API 密钥完成设置。
   - 如果使用 Ollama 这类本地代理提供商，你需要配置代理已安装位置的本地 URL。此时请遵循对应的[集成建议](/home-assistant/integrations/ollama)。
2. 前往 **设置 > 语音助手 > Add 语音助手**。为其命名，并从 AI 可用选项中选择一个对话代理。本示例使用 Anthropic，所选代理为 Claude。

    ![Add Claude agent to Assist](/home-assistant/images/assist/add-claude-to-assist.png)

3. 请留意你的 Text-to-speech 和 Speech-to-text 配置。这些部分不由 AI 处理，应保持为你希望 Assist 使用的配置。
4. 配置该代理（点击代理名称旁边的齿轮图标）。

   - 在 **Prompt template** 字段中，输入一段提示词，让 AI 扮演某个角色。例如：
       `You are Super Mario from Mario Bros. Be funny.`
   - 定义该语音助手是否被允许控制你家中的设备。
     - **No control**：你可以与代理对话，但它不能控制设备。
     - **Assist**：你可以与代理对话，它也可以控制设备。例如，它可以打开灯光。
       - Assist 只能控制那些已[暴露](/home-assistant/voice_control/voice_remote_expose_devices/)给它的设备。
             ![Agent with recommended model 设置](/home-assistant/images/assist/agent-recommended-model-settings.png)

   - 创建好 Assist 代理后，你可以前往 **语音助手**，在该个性条目的三点菜单中，设置是否让 Home Assistant 的模型优先响应，也就是让 Assist 优先在本地处理命令。
             ![Fallback 切换](/home-assistant/images/assist/fallback-assist-toggle.png)

      - 如果保留该选项，只要某个意图可以由 Home Assistant 回答，就会优先由它回答。这样回复不会带有角色个性，但会更快、更高效（因为无需经过 LLM）。如果你可以接受有时不是 AI 角色回复，只希望灯光等设备更快响应，这是推荐选项。
      - 如果取消该选项，所有意图都会交给代理处理。这适合不太在意效率、但希望代理始终保持角色设定的场景（例如你的 Assist 个性是 Santa Claus）。
5. 你可以取消勾选 Recommended model 设置，然后点击 Submit，这会解锁更多自定义项。以 OpenAI 为例，可在[这里](/home-assistant/integrations/openai_conversation/#model)查看其他设置的简要说明。
6. 你可以直接在语音助手面板中测试该代理，在代理菜单中选择 Start a conversation。它会像在任何语音硬件上一样控制你的 Home Assistant 并进行回复。

7. 如果你需要排查 LLM 提供商相关问题，请在我们的[集成文档](/home-assistant/integrations)中查看对应 AI 的具体说明。

## 教程：使用 OpenAI 设置 Assist

这是来自 Home Assistant 发布 Party 2024.6 直播的分步教程，包含一些背景信息。

<lite-youtube videoid="xMFC8yaVtpI" videoStartAt="176" videotitle="Home Assistant 发布 Party 2024.6"></lite-youtube>

## 在你的设备上使用 AI 语音助手

要了解如何在设备上使用 AI 语音助手，请根据你打算用来交互的硬件，参考以下教程之一：

- [ESP32-S3-BOX 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/)
- [$13 语音助手 using ATOM Echo](/home-assistant/voice_control/thirteen-usd-voice-remote/)
- [Assist on Android](/home-assistant/voice_control/android/)
- [Assist on Apple](/home-assistant/voice_control/apple/)

## 演示

看看这个与 AI Mario 个性的对话演示。

<lite-youtube videoid="eLx8_NAqptk" videotitle="Give your 语音助手 personality using the OpenAI 集成"></lite-youtube>
