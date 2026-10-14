# 入门 - Home Assistant Cloud

在使用 Assist 之前，您需要先完成配置。

使用 Assist 最简单、最高效的方式，是直接使用 Home Assistant Cloud 内置的语音提供程序，包括语音转文本和文本转语音。本页将介绍具体做法。

如果您想设置完全本地化的语音助手，请改为参考本地助手的设置流程。

## 设置云端 Assist 流水线

如果您想获得最快的语音助手处理体验，请按照以下步骤操作：

1. 如果您还没有启用，请先[启用 Home Assistant Cloud](https://www.nabucasa.com/config/)。

2. 连接到 Home Assistant Cloud 后，系统会自动为您创建一个语音助手。
   * 该语音助手会根据您的 Home Assistant 用户地区设置来使用相应的语音转文本和文本转语音引擎。

3. 如需查看设置，请前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)，然后在 **Assist** 下选择 **Home Assistant Cloud**。
   ![选择 Home Assistant Cloud 语音助手](/home-assistant/images/assist/assistants_ha_cloud.png)

   * **故障排除**：如果这里没有显示任何助手，说明您没有使用[默认配置](/home-assistant/integrations/default_config.md)。这种情况下，您需要在 `configuration.yaml` 文件中添加以下内容：

     ```yaml
     # Example configuration.yaml entry
     assist_pipeline:
     ```

4. 如果预定义的语言设置符合您的需求，请跳过下一步。

5. 如果您想修改设置：
   * 您可以更改名称，使用任何对您有意义的名称。
   * 如果预定义语言不符合您的需求，请选择您想使用的语言。
   * 在 **对话代理** 下，选择 **Home Assistant**。
   * 在 **语音转文本** 下，选择您说话时使用的语言。
   * 在 **文本转语音** 下，选择 Assist 对您说话时使用的语言。
   * 根据语言不同，您可能还可以选择不同的语言变体。

6. 完成后，您就可以对设备说话，设备也会使用您设置的语言进行回应。

## 后续步骤

配置完成后，您就可以开始使用 Assist 了。现在，您可以通过您的设备与它对话，比如 [Android](/home-assistant/voice_control/android/index.md)、[iOS](/home-assistant/voice_control/apple/index.md)，或 [Voice Preview Edition](https://support.nabucasa.com/hc/en-us/categories/24451727188125-Home-Assistant-Voice-Preview-Edition)。

如果想获得更好的语音交互体验，别忘了查看[最佳实践](/home-assistant/voice_control/best_practices/index.md)。
