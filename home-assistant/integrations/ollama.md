# Ollama

The **Ollama** integration adds a conversation agent in Home Assistant powered by a local [Ollama](https://ollama.com/) server.

Controlling Home Assistant is an experimental feature that provides the AI access to the Assist API of Home Assistant. You can control what devices and entities it can access from the [exposed entities page](https://my.home-assistant.io/redirect/voice_assistants/). The AI is able to provide you information about your devices and control them.

此集成不与[句子触发器](/home-assistant/docs/automation/trigger/index.md#sentence-trigger)集成。

此集成需要外部 Ollama 服务器，该服务器适用于 macOS、Linux 和 Windows。按照[下载说明](https://ollama.com/download)安装服务器。安装后，将 Ollama 配置为[可通过网络访问](https://github.com/ollama/ollama/blob/main/docs/faq.mdx#how-can-i-expose-ollama-on-my-network)。

## Configuration

To add the **Ollama** service to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=ollama)

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=ollama).
* From the list, select **Ollama**.
* Follow the instructions on screen to complete the setup.

</details>

## Options

To define options for Ollama, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Ollama are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
URL:
  description: The URL of the external Ollama server, such as `http://localhost:11434`.
Model:
  description: Name of the [Ollama model](https://ollama.com/library) to use, such as `mistral` or `llama2:13b`. Models will be automatically downloaded during setup.
Instructions:
  description: AI 如何响应您的请求的指令。它使用 [Home Assistant 模板](/home-assistant/docs/configuration/templating/)编写。
Control Home Assistant:
  description: If the model is allowed to interact with Home Assistant. It can only control or provide information about entities that are [exposed](/home-assistant/voice_control/voice_remote_expose_devices/) to it. This feature is considered experimental and see [Controlling Home Assistant](#controlling-home-assistant) below for details on model limitations.
Context window size:
  description: "The context window size is the number of tokens the model can take as input. Home Assistant defaults to 8k, which is larger than the default value in Ollama Server (2k), and you may adjust it based on the maximum context size of the specific model used. A larger value will better support larger homes with more entities, and smaller values may lower Ollama server RAM usage."
Max history messages:
  description: Maximum number of messages to keep for each conversation (0 = no limit). Limiting this value will cause older messages in a conversation to be dropped.
Keep alive:
  description: Duration in seconds for the Ollama host to keep the model in memory after receiving a message (-1 = no limit, 0 = no retention). Default value is -1.
Think before responding:
  description: If the AI should think about its response before responding. This will cause the AI to take longer to respond, but may result in better responses. Default value is `false`. Thinking is not supported by all models and displaying thinking content is not supported by frontend clients yet.
```

## Controlling Home Assistant

如果您想使用 Home Assistant 尝试本地 LLM，我们建议公开少于 25 个实体。请注意，较小的模型比较大的模型更容易出错。

只有支持[工具](https://ollama.com/search?c=tools)的机型才能控制Home Assistant。

较小的模型在控制时可能无法[可靠地维持对话](https://llama.meta.com/docs/model-cards-and-prompt-formats/llama3_1/#llama-3.1-instruct)
家庭助理已启用。但是，您可以使用多个 Ollama 配置
共享相同的模型，但使用不同的提示：

* 添加 Ollama 集成，无需启用 Home Assistant 的控制。你可以使用
  该对话代理进行对话。
* 添加额外的 Ollama 集成，使用相同的模型，实现对 Home Assistant 的控制。
  您可以使用此对话代理来控制 Home Assistant。
