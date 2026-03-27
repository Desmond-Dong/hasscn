---
title: Assist 故障排除
description: '本节列出了一些可帮助您排查 Assist 问题的步骤。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Assist 故障排除

本节列出了一些可帮助您排查 Assist 问题的步骤。

## 查看调试信息

1. 前往 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/)。
2. 在助手列表中打开您的助手，并在对话框中选择 **调试**。
![打开调试对话框](/home-assistant/images/assist/assistant-debug-03.png)
3. 在页面顶部的下拉菜单中，选择您想查看的那次运行。
![调试语音转文本](/home-assistant/images/assist/assistant-debug-02.png)

## 按语言测试句子：不通过语音，也不执行命令

如果您想测试某句话在特定语言下是否可用，但又不想真正执行命令，请使用 **开发者工具** 中的句子解析器。

1. 前往 [**设置** > **开发者工具** > **Assist**](https://my.home-assistant.io/redirect/developer_assist/)。
2. 在句子解析器中选择语言，并输入您想测试的句子。
3. 调试工具会显示以下内容：
   - 触发的意图
   - 被定位到的实体
   - 这些目标实体中哪些成功匹配
![打开 Assist 开发者工具句子解析器](/home-assistant/images/assist/assistant-debug-06.png)

## 按助手测试句子：不通过语音，但会执行命令

如果您想测试一句话在某个特定助手中是否可用，并且希望实际执行命令，请使用 **调试** 视图中的句子解析器。

1. [打开调试视图](#查看调试信息)。
2. 在右上角选择图标。
![打开流水线调试对话框](/home-assistant/images/assist/assistant-debug-04.png)
3. 选择您要测试的助手。
4. 选择 **运行文本流水线**。
![打开流水线调试对话框](/home-assistant/images/assist/assistant-debug-pipeline-01.png)
5. 输入您想测试的短语，然后选择 **运行**。
![打开流水线调试对话框](/home-assistant/images/assist/assistant-debug-pipeline-02.png)
6. 检查是否成功。
![打开流水线调试对话框](/home-assistant/images/assist/assistant-debug-pipeline-03.png)
   - 如果短语无法工作，请尝试其他表达方式。例如，如果 *关闭厨房的灯* 不工作，可以试试：*关闭厨房里的灯*。
   - 检查您的短语是否[受支持](/home-assistant/voice_control/builtin_sentences/)。
   - 请确保您使用的是 Home Assistant 中定义的区域名称。如果您的房间名为 *bathroom*，那么 *打开 bath 的灯* 这类说法就不会生效。

## 我看不到任何助手

如果您在 [**设置** > **语音助手**](https://my.home-assistant.io/redirect/voice_assistants/) 下看不到任何助手，说明您没有使用默认配置。下图展示了 **Assist** 部分应有的样子。

![语音助手页面中的 Assist 部分](/home-assistant/images/assist/assist-assistants-page.png)

如果完全没有 **Assist** 这一部分，您需要在 `configuration.yaml` 文件中添加以下内容：

   ```yaml
   # Example configuration.yaml entry
   assist_pipeline:
   ```

## Assist 无法理解我关于天气预报的问题

下面的示例展示了查询天气时常见的问题。虽然部分步骤与天气实体有关，但其基本原理同样适用于其他实体。

1. 请确保您已安装[天气服务](/home-assistant/integrations/#weather)。
   - 默认情况下会安装 [Met.no](/home-assistant/integrations/met/)。
2. 请确保您已为要查询的位置创建对应的实体。
   - 例如，如果您想查询柏林的天气，请添加一个柏林的天气实体。
  
      ![创建天气实体](/home-assistant/images/assist/metno_weather_entity.png)
3. 请确保该实体已暴露给 Assist：
   - 前往 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/)，选择该位置对应的天气实体。
   - 在打开的详情视图中，选择齿轮 `[mdi:cog-outline]`，然后选择 **语音助手**。
  
      ![选择语音助手](/home-assistant/images/assist/weather_entity_voice_assistant.png)

    - 确保该实体已暴露给 Assist。
  
      ![将实体暴露给 Assist](/home-assistant/images/assist/expose_entity_dialog.png)

4. 与 Assist 对话时，请确保使用精确的实体名称。
   - 如需查看实体名称，请检查 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/) 下的列表。
   - 例如，如果实体名叫 *Forecast Berlin*，您就必须说“forecast Berlin 的天气怎么样”。
   - 如果您只说“Berlin 的天气怎么样”，Assist 就无法识别。
   - 如果您想使用 Berlin 而不是 *Forecast Berlin*，可以为实体创建别名。
     - 您可以根据需要创建任意数量的别名。

      ![为实体名称创建别名](/home-assistant/images/assist/assist_create_alias.png)
5. 如果您有多个天气预报实体，却只问“今天天气怎么样”，Assist 总是会返回最先添加的那个地点的数据。目前还无法更改这一行为。

## 我没有收到语音回复

我的语音助手能听懂并处理命令，但没有语音回复。

语音回复由 Home Assistant 中受支持的文本转语音引擎生成。
随后，语音助手设备会从 Home Assistant 获取音频文件并播放出来。

### 本地网络设置

要让这个获取过程正常工作，Home Assistant 必须把自己的 URL 告诉设备。
如果您的网络结构较复杂，或者您过去修改过这项设置，传递出去的 URL 可能会不正确。

要修复这个 URL，请按以下步骤操作：

1. 在[您的用户资料](https://my.home-assistant.io/redirect/profile/)中启用 **高级模式**。
2. 前往 [**设置** > **系统** > **网络**](https://my.home-assistant.io/redirect/network/)。
3. 将本地网络 Home Assistant URL 改为一个本地可访问且指向 Home Assistant 的地址。
   - 对大多数用户来说，推荐使用 **自动** 选项。
   ![本地网络 URL 设置](/home-assistant/images/assist/local_url.png)

### 缺少 Media Source

如果您使用 YAML 配置，并且没有启用 `default_config:`，请确保配置中包含 `media_source:`。

## 调整设备的 Assist 音频配置

如果您怀疑背景噪声或扬声器音量有问题，有时可以通过调整语音助手设备（例如 S32-S3-BOX-3）的降噪和增益等设置来改善效果。

### 调整设备的 Assist 音频配置

1. 请确保您已安装 ESPHome 应用（旧称加载项）：
   - 前往 [**设置** > **应用** > **安装应用**](https://my.home-assistant.io/redirect/supervisor_store/)。
   - 如果尚未安装 **ESPHome**，请先安装。
2. 启动 ESPHome 应用，然后选择 **打开 Web UI**。
3. 将您的设备接管到 ESPHome 应用中：
   - ESPHome 应用启动后，您会看到设备显示为 **已发现**。
   - 选择 **接管**。
   - 出现提示后，输入本地 2.4 GHz Wi-Fi 网络的凭据，然后选择 **接管**。

4. 如果您看到此设备有可用更新的通知，请选择 **更新**。
5. 请确保您可以访问配置文件。
   - 如果您不确定该使用哪种方式，可以[安装 File editor 应用](/home-assistant/common-tasks/os/#installing-and-using-the-file-editor-app)。
   - 在 File Editor 配置中，请确保 **Enforce basepath** 选项已关闭。
6. 编辑通用配置以启用调试模式：
   - 打开 `config` 文件夹中的 `configuration.yaml` 文件。
   - 输入以下内容：

      ```yaml
      assist_pipeline:
         debug_recording_dir: /share/assist_pipeline
      ```

7. 保存更改并重启 Home Assistant。
8. 前往 `/share/assist_pipeline`。
   - 对于您发出的每条语音命令，这里都会生成一个子文件夹，其中包含 `.wav` 格式的音频文件。
9. 收听您想分析的音频文件。
10. 打开配置文件：
    - 在 ESPHome 应用中，选择您的设备，然后选择 **编辑**。
    - 这样您就可以编辑该设备的配置文件。
11. 如果要添加用于调整降噪和音量的配置段，请加入以下内容：

      ```yaml
      voice_assistant:
         noise_suppression_level: 3
         auto_gain: 31dBFS
         volume_multiplier: 10.0
      ```

12. 调整设置：
    - 如果音频噪声过大，请提高 `noise_suppression_level`，最大值为 4。
    - 如果音频过小，请提高 `auto_gain`（最大 31）或 `volume_multiplier`（没有上限，但过高最终会导致失真）。
13. 请注意：收集调试录音会占用磁盘空间。
    - 找到合适的配置后，请删除这些音频文件所在的文件夹。
    - 然后在 `configuration.yaml` 中删除 `assist_pipeline` 条目，并重启 Home Assistant。
