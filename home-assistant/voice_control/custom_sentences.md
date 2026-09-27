# 添加自定义语句以触发自动化

您可以通过扩展现有[意图](https://开发者.home-assistant.io/docs/intent_builtin/)或创建新意图，向意图识别器添加自己的语句。您还可以为现有意图[自定义响应](/home-assistant/voice_control/custom_sentences_yaml.md#customizing-responses)。

## 前提条件

### 前提条件

您需要一个可正常工作的 Assist 配置。如果尚未完成，请查看 [Assist 起始页面](/home-assistant/voice_control/index.md)来完成您的设置。

### 添加自定义语句以触发自动化

这是开始使用自定义语句触发自动化的最简单方法。

1. 在 **[设置 > 自动化与场景](https://my.home-assistant.io/redirect/automation/)** 页面，点击右下角的 **创建自动化**。

2. 在 **触发器** 下拉菜单中，选择 **语句**。

3. 输入一个或多个您想要触发自动化的语句。
   * 不要使用标点符号。
   * 您可以添加多个语句，它们都会触发该自动化。
     ![添加自定义语句](/home-assistant/images/assist/sentence_trigger_01.png)

4. 要添加自定义响应，选择 **添加动作**。滚动到底部并选择 **其他动作**。
   * 然后，选择 **设置对话响应**。
     ![设置对话响应](/home-assistant/images/assist/assist_set-conversation-response.png)

5. 在文本字段中，输入您希望 Assist 说出的响应，然后选择 **保存**。

   ![输入响应文本](/home-assistant/images/assist/assist_set-conversation-response_02.png)

   * 您也可以使用[通配符](/home-assistant/docs/automation/trigger/index.md#sentence-wildcards)。例如，触发器：

     ```yaml
     play {album} by {artist}
     ```

     可以有以下响应：

     ```yaml
     Playing  by 
     ```

   * 更多详情，请参阅[对话响应脚本动作](/home-assistant/docs/scripts/index.md#respond-to-a-conversation)。

6. 要测试自动化，请前往 **概览**，在右上角打开 Assist。
   * 输入其中一个语句。

7. 如果没有成功，请查看[故障排除](/home-assistant/voice_control/troubleshooting/index.md)部分。
   * 其中一个原因可能是您要控制的设备尚未向 Assist 公开。

8. 拿起您的语音控制设备，说出自定义语句。
   * 您的自动化现在应该被触发了。

### 在配置文件中设置自定义语句

要在配置文件中设置自定义语句，请遵循[此教程](/home-assistant/voice_control/custom_sentences_yaml/index.md)。

## 相关设备和安装教程

* [13美元的 Home Assistant 语音助手](/home-assistant/voice_control/thirteen-usd-voice-remote/index.md)
* [S3-BOX-3 语音助手](/home-assistant/voice_control/s3_box_voice_assistant/index.md)
* [适用于 Apple 的 Assist](/home-assistant/voice_control/apple/index.md)
* [适用于 Android 的 Assist](/home-assistant/voice_control/android/index.md)
