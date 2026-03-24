---
title: 世界上最私密的语音助手
---

本教程将指导您把旧的固定电话改造成世界上最私密的语音助手。拿起听筒，您就可以和智能家居对话、发出命令并获得回复。

<lite-youtube videoid="0YJzLIMrnGk" videotitle="使用模拟电话控制 Home Assistant"></lite-youtube>

<a id="about-the-analog-phone"></a>

## 所需材料

- 已安装 Home Assistant Operating System 的 Home Assistant 2023.5 或更高版本。如果您尚未安装 Home Assistant，请参考[安装页面](/home-assistant/installation/)
- 一部带有 RJ11 接口的[模拟电话](#about-the-analog-phone)
- 一个模拟电话适配器
  [Grandstream HT801](https://www.amazon.com/dp/B06XW1BQHC)
  - 包含 5 V 电源适配器和一根以太网线
- 一根用于连接电话与 Grandstream 的 RJ11 电话线
- [云端助手流水线](/home-assistant/voice_control/voice_remote_cloud_assistant/) 或手动配置的[本地助手流水线](/home-assistant/voice_control/voice_remote_local_assistant/)

## 设置 Grandstream

1. 将电话上的 RJ11 线连接到 Grandstream 上的绿色接口。
   ![Grandstream HT801 接口](/home-assistant/images/assist/grandstream-ht801-interfaces.png)
2. 将 Grandstream 接入您的网络：
   - 将以太网线插入蓝色接口，并连接到路由器。
3. 启动 Grandstream。
   - 接通电源。
   - 启动完成后，电源和以太网的两个 LED 会常亮蓝色，电话 LED 不会亮起。
4. 确认 Grandstream 的 IP 地址。
   - 如果您的电话有星号 * 键，可以让电话直接播报自己的 IP 地址：
      - 按下 ***（连续按三次星号键），然后等待听到 *Enter the menu option*。
      - 按下 02，电话就会播报自己的 IP 地址。
   - 如果您的电话没有星号 * 键，请登录路由器查找该 IP 地址。
5. 在浏览器中输入该 IP 地址，并登录 Grandstream 的 *Device Configuration* 管理页面。
   - 默认凭据如下：
     - **Username**: `admin`
     - **Password**: `admin`
   ![登录 Grandstream](/home-assistant/images/assist/grandstream_login.png)
6. 打开 **FXS Port** 选项卡，并在 **Offhook Auto-Dial** 字段中按以下格式输入 Home Assistant 的 IP 地址：
   - \*47192\*168\*1\*100\*5060
   ![为自动拨号定义 IP](/home-assistant/images/assist/grandstream_autodial.png)
   - 注意：请将 192\*168\*1\*100\* 替换为您的 Home Assistant 实例 IP 地址。
   - 在页面底部选择 **Apply**。
   ![为自动拨号定义 IP](/home-assistant/images/assist/grandstream_apply.png)
   - *Offhook Auto-Dial* 表示您一拿起电话，它就会直接呼叫 Home Assistant，无需手动拨号。

## 在 Home Assistant 中设置电话

1. 在 Home Assistant 中，前往 [**设置** > **设备与服务** > **添加集成**](https://my.home-assistant.io/redirect/config_flow_start/?domain=voip)，然后添加 **Voice over IP** 集成。
   ![Voice over IP 集成](/home-assistant/images/assist/voip_install.png)
2. 当您看到该集成后，拿起电话。
   - 现在您应该会听到这样一段语音：*This is your smart home speaking. Your phone is connected, but you must configure it within Home Assistant.*
   - 此时，该集成中应该已经出现一个设备和若干实体。
   ![包含设备和实体的 Voice over IP 集成](/home-assistant/images/assist/voip_device_available.png)
   - 如果听不到语音，请尝试这些[故障排除步骤](/home-assistant/voice_control/worlds-most-private-voice-assistant/#troubleshoot-grandstream)。
3. 允许呼叫。
   - 默认情况下，新设备的来电会被阻止，因为语音命令可能会控制门锁、车库门等敏感设备。
   - 在 **Voice over IP** 集成中，选择 **设备** 链接。
   - 要允许这部电话控制您的智能家居，请在 **配置** 下启用 **Allow calls**。
   ![Voice over IP 集成 - Allow calls](/home-assistant/images/assist/voip_configuration.png)
4. 恭喜！您已经让模拟电话可以配合 Home Assistant 使用。现在拿起电话，就可以控制设备了。
   - 说出一条[受支持的语音命令](/home-assistant/voice_control/builtin_sentences/)。例如，*关闭厨房的灯*。
   - 您也可以提问，例如：
     - *前门锁上了吗？*
     - *客厅里有哪些灯是开着的？*
   - 请确保您使用的是在 Home Assistant 中定义的区域名称。如果您的房间名为 *bathroom*，那么 *打开 bath 的灯* 这种说法将无法工作。
   - 如果命令不受支持，可以[添加您自己的命令](/home-assistant/integrations/conversation/)。

## 使用 OpenAI 集成为语音助手添加个性

<lite-youtube videoid="eLx8_NAqptk" videotitle="使用 OpenAI 集成为语音助手添加个性"></lite-youtube>

如果您想复现这个示例，请按以下步骤操作：

注意：此流程需要一个 OpenAI 账户。如果您只是想运行示例，免费试用即可，无需填写信用卡信息。

1. [创建 Mario 个性](/home-assistant/voice_control/assist_create_open_ai_personality/)。
2. 在 **Voice over IP** 集成中，进入 **配置**，选择您刚刚创建的 Mario 助手。

      ![VoIP：选择 OpenAI](/home-assistant/images/assist/assistant-openai-mario-03.png)
3. 完成后，拿起电话，向 Mario 提问即可。
4. 您也可以为其他 OpenAI 个性重复此流程。您可以按需添加任意数量的 OpenAI Conversation 集成。
   - 如果要添加新个性，您需要创建新的 API 密钥，然后使用该密钥再添加一个新的 OpenAI Conversation 集成。

<a id="troubleshoot-grandstream"></a>

## Grandstream 故障排除

### 测试呼叫无法工作

如果您无法呼叫 Home Assistant，请检查 Grandstream 设备网页界面中的以下设置。

1. 在 **FXS Port** 选项卡中，检查 **Preferred Vocoder** 列表。
   - 请确保其中一个选项设置为 **OPUS**：
   ![Vocoder OPUS 选项](/home-assistant/images/assist/grandstream_vocoder.png)
2. 在 **OPUS Payload type** 下，确认值为 `123`。这是默认值。
   ![Vocoder OPUS payload type](/home-assistant/images/assist/grandstream_opus_payload.png)
3. 在页面底部选择 **Apply**。
4. 再次拿起电话，检查是否能听到语音。

### Voice over IP 集成不再工作

**现象**

您曾经可以通过电话控制 Home Assistant，但现在不行了。拿起电话时没有任何声音播放。
[调试信息](/home-assistant/voice_control/troubleshooting#查看调试信息)中也没有任何运行记录。

**可能的解决方法**

1. 登录 Grandstream 的 *Device Configuration* 管理页面。
2. 在 **Status** 页面中，检查您拿起电话后，**Hook** 状态是否会从 **On Hook** 变为 **In Use**。
   ![检查 Grandstream 状态](/home-assistant/images/assist/grandstream-troubleshoot-10.png)
   - 这个页面响应比较慢。刷新页面后，请稍等片刻再挂断电话。
3. 如果状态没有变化，请重启 Grandstream，然后再次尝试呼叫 Home Assistant。

## 其他故障排除步骤

如果仍然没有按预期工作：

- 请查看 [Assist 的通用故障排除部分](/home-assistant/voice_control/troubleshooting)

## 关于模拟电话

任何带有 RJ11 接口的模拟固定电话都可以使用。

视频中 TheFes 使用的电话是 *Heemaf type 1955*，它曾由荷兰电话公司 PTT 使用。

制作本教程时使用的电话是一台 1953 年的 [Autophon AG *Tischstation Mod.29 HF-TR*](https://www.radiomuseum.org/r/autophon_tischstation_mod29_hf_tr.html)。
![Autophon AG 的 Tischstation Mod.29 模拟电话](/home-assistant/images/assist/autophon-mod-29.jpg)
