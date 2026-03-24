---
title: Anthropic
description: 关于将 Anthropic Claude 与 Home Assistant 集成的说明
ha_category:
  - Voice
ha_release: 2024.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Shulyaka'
ha_domain: anthropic
ha_integration_type: service
ha_platforms:
  - conversation
related:
  - docs: /voice_control/voice_remote_expose_devices/
    title: Exposing entities to Assist
  - docs: /voice_control/assist_create_open_ai_personality/
    title: Create an AI personality
  - url: https://console.anthropic.com/settings/keys
    title: Anthropic API key
  - url: https://www.anthropic.com
    title: Anthropic
  - url: https://claude.ai
    title: Claude
ha_quality_scale: bronze
---

**Anthropic** 集成在 Home Assistant 中添加了一个由 [Anthropic](https://www.anthropic.com) 提供支持的对话代理，例如 Claude 3.5 Sonnet。

控制 Home Assistant 是通过向 AI 提供 Home Assistant 的 Assist API 访问权限来完成的。您可以从 [暴露实体页面](https://my.home-assistant.io/redirect/voice_assistants/) 控制它可以访问哪些设备和实体。AI 可以为您提供有关设备的信息并控制它们。

法律声明：欢迎个人和爱好者将 Anthropic API 用于[个人用途](https://support.anthropic.com/en/articles/8987200-can-i-use-the-claude-api-for-individual-use)，但请注意，无论您是个人还是代表公司，API 的使用均受其[商业服务条款](https://www.anthropic.com/legal/commercial-terms)约束。

## 前提条件

- 此集成需要 API 密钥才能使用，[您可以在这里生成。](https://console.anthropic.com/settings/keys)。 
- 这是一项付费服务，我们建议您密切监控您在 [Anthropic 门户](https://console.anthropic.com/settings/cost)中的费用。

### 生成 API 密钥

Anthropic API 密钥用于验证对 Anthropic API 的请求。要生成 API 密钥，请执行以下步骤：

1. 登录 [Anthropic 门户](https://console.anthropic.com)或注册账户。
2. 在[计划页面](https://console.anthropic.com/settings/plans)使用有效的信用卡启用计费。
3. 访问 [API 密钥页面](https://console.anthropic.com/settings/keys)获取您将用于配置集成的 API 密钥。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API key:
  description: "来自 Anthropic 的 API 密钥，用于身份验证。"
```

## Options

To define options for Anthropic, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Anthropic are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

该集成提供以下类型的子条目：

- [对话](/home-assistant/integrations/conversation/)
- [AI 任务](/home-assistant/integrations/ai_task/)

```yaml
Instructions:
  description: 关于 AI 如何响应您请求的指令。使用 [Home Assistant 模板](/home-assistant/docs/configuration/templating/)编写。
Control Home Assistant:
  description: 是否允许模型与 Home Assistant 交互。它只能控制或提供有关[暴露](/home-assistant/voice_control/voice_remote_expose_devices/)给它的实体的信息。
Recommended settings:
  description: 如果启用，将选择推荐的模型和设置。
```

如果您选择不使用推荐设置，可以配置以下选项：

```yaml
Model:
  description: 将完成您提示的模型。有关更多详细信息和选项，请参阅[模型](https://docs.anthropic.com/en/docs/about-claude/models#model-names)。
Maximum Tokens to Return in Response:
  description: 停止前生成的最大令牌数。请注意，我们的模型可能会在达到此最大值之前停止。此参数仅指定要生成的绝对最大令牌数。不同模型对此参数有不同的最大值。有关详细信息，请参阅[模型](https://docs.anthropic.com/en/docs/models-overview)。
Temperature:
  description: 注入响应的随机性量。对于分析/多项选择，使用接近 `0.0` 的 `temperature`，对于创意和生成任务，使用接近 `1.0` 的值。请注意，即使 `temperature` 为 `0.0`，结果也不会完全确定。如果启用了扩展思考（见下文），则忽略此参数。
Thinking budget:
  description: 对于支持[扩展思考](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)的模型（如 Claude 3.7 Sonnet），此参数确定允许 Claude 用于其内部推理过程的最大令牌数。更大的预算可以通过对复杂问题进行更彻底的分析来提高响应质量，尽管 Claude 可能不会使用分配的整个预算，特别是在 32K 以上的范围。Anthropic 建议从最小值开始，逐步增加思考预算，以找到 Claude 在您的用例中表现良好的最佳范围。更高的令牌数可能使您实现更全面和细致的推理，但也可能出现收益递减的情况。由于推理过程需要额外的处理，请做好响应时间可能更长的准备。该值必须始终小于指定的 `最大令牌数`。如果值低于 `1024`，则禁用扩展思考。如果模型不支持扩展思考，则忽略此参数。
Thinking effort:
  description: 较新的模型（从 Claude 4.6 开始）使用 [effort](https://platform.claude.com/docs/en/build-with-claude/effort) 参数而不是思考预算来控制 Claude 在响应时使用的令牌数，在响应彻底性和令牌效率之间进行权衡。
Code execution:
  description: 启用服务器端[代码执行工具](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)。使用此工具，模型可以在安全的沙盒环境中分析数据、执行复杂计算、运行系统命令，包括编写代码。
Enable web search:
  description: 启用服务器端[网络搜索工具](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool)以直接访问实时网络内容，使其能够用超出其知识截止日期的最新信息回答问题。请注意，此工具有自己的[定价](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool#usage-and-pricing)。
Maximum web searches:
  description: 限制每个用户请求可以执行的网络搜索次数。一旦达到限制，在该对话期间将不再执行额外的搜索。
Include home location:
  description: 该参数允许您根据 Home Assistant 位置本地化搜索结果。
```

## 用例

该集成提供由 Anthropic API 驱动的 `conversation` 和 `ai_task` 实体。有关更多详细信息和示例，请参阅相应的集成：

- [对话](/home-assistant/integrations/conversation/)
- [AI 任务](/home-assistant/integrations/ai_task/)

## 已知限制

此集成不与[句子触发器](/home-assistant/docs/automation/trigger/#sentence-trigger)集成。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.