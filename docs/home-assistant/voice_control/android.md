---
title: Android 上的 Assist
---

## Android 手机上的 Assist

你可以通过 [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) 在 Android 手机和平板上使用 Assist。

### 前提条件

- [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) 已安装
- 已设置好一个 Assistant：可以是[云端](/home-assistant/voice_control/voice_remote_cloud_assistant/)（推荐，性能更好）或[本地](/home-assistant/voice_control/voice_remote_local_assistant/)
- 你想通过 Assist 控制的设备已经[暴露给 Assist](/home-assistant/voice_control/voice_remote_expose_devices/)，并且你已经检查了大部分[最佳实践](/home-assistant/voice_control/best_practices/)

### 在 Home Assistant 中启动 Assist

1. 在手机上打开 Home Assistant。
2. 在右上角选择三点菜单，然后选择 **Assist**。
3. [说出命令](/home-assistant/voice_control/custom_sentences/)。

### 将 Home Assistant Assist 设置为默认语音助手应用

要在 Android 手机上将 Home Assistant Assist 设置为默认语音助手应用，请按以下步骤操作：

1. 在 Android 手机上打开 **Home Assistant** 应用。
2. 前往 **设置** > **Companion app**。
3. 选择 **Assist for Android**。
4. 选择 **Set as default**。
5. 在打开的系统设置中，选择 **Default digital 语音助手 app**。
   - 在某些 Android 版本中，这一项可能叫作 **Voice Assistant** 或 **Assist app**。
6. 选择 **Home Assistant**。
7. 返回 **Home Assistant** 应用。现在你应该会看到 **Assist** 已成为默认语音助手。
8. 使用启动语音助手的手势来启动 Assist。具体手势会因 Android 版本不同而不同：
   - 从左下角向上滑动。
   - 长按电源键。
   - 按住主页按钮（底部的方形按钮）。
9. 你现在也可以从锁定屏幕启动 Assist。
   <lite-youtube videoid="8TsutVHj7LQ" videotitle="Use Home Assistant from anywhere on Android"></lite-youtube>

要免提激活 Assist，请[启用唤醒词检测](#enabling-wake-word-detection-on-android)。

### 关于 Android 上的唤醒词检测

唤醒词检测允许你通过说出像 "Hey Jarvis" 或 "Hey Nabu" 这样的唤醒词来免提激活 Assist。你的 Android 设备会使用 [microWakeWord](/home-assistant/voice_control/about_wake_word/#about-on-devices-wake-word-processing-microwakeword) 在本地处理唤醒词，这意味着你的音频会保持私密，在检测到唤醒词之前不会发送到 Home Assistant。

:::important
唤醒词检测会持续监听音频以识别唤醒词，这会明显影响电池续航。建议在不需要时关闭唤醒词检测，或者[从 Home Assistant 远程控制它](#controlling-wake-word-detection-from-home-assistant)，只在需要时开启。
:::

:::note
Android 上的唤醒词检测比 "Ok Google" 更耗电，因为 Google Assistant 在受支持设备上可以使用专用的低功耗硬件进行唤醒词检测。遗憾的是，Google 并未向第三方应用开发者开放这类专用硬件，因此像 Home Assistant 这样的应用只能依赖标准音频处理，而这需要让 CPU 始终保持运行，从而更耗电。这一平台限制意味着第三方语音助手无法达到 Google 内置语音助手那样的电池效率。
:::

唤醒词检测完全在你的 Android 设备上运行，这意味着即使没有有效的互联网连接，它也能工作（不过执行命令仍然需要连接到你的 Home Assistant 实例）。当多个设备同时检测到同一个唤醒词时（例如另一台 Android 手机或 Voice Preview Edition），只有最先捕获到唤醒词的设备会保持 Assist 会话开启，其他设备会自动取消自己的会话。

### 在 Android 上启用唤醒词检测

:::note
Android 上的唤醒词检测仍处于实验阶段。

如果应用变得无响应或无法正常打开，请取消将 Home Assistant 设为默认数字语音助手，以关闭唤醒词检测：

- 在 Android 手机上，前往 **设置** > **Apps** > **Default apps** > **Digital 语音助手 app**，然后选择其他语音助手或 **None**。
- 如果遇到问题，请在 [GitHub 上提交 issue](https://github.com/home-assistant/android/issues)，以便团队排查。
  :::

要在 Android 设备上启用唤醒词检测，请按以下步骤操作：

#### 前提条件

- Home Assistant Companion App 版本 2026.2.3 或更高版本
- 已将 Assist 设置为[默认语音助手应用](#setting-up-home-assistant-assist-as-default-语音助手-app)
- [Home Assistant Cloud](/home-assistant/voice_control/voice_remote_cloud_assistant/) 或手动配置的[本地 Assist 管线](/home-assistant/voice_control/voice_remote_local_assistant)

#### 启用唤醒词检测

1. 在 Android 手机上打开 **Home Assistant** 应用。
2. 前往 **设置** > **Companion app**。
3. 打开 **Assist for Android**。
4. 启用 **Wake word detection**。
5. 从可用选项中选择一个唤醒词：
   - Hey Nabu
   - Hey Jarvis
   - Hey Mycroft
     **结果**：启用后，即使设备已锁定或应用在后台，唤醒词检测也能工作。
6. 要在 Android 上使用 Assist，请说出你选择的唤醒词，等待开始聆听的提示音后，再说出命令。

#### 从 Home Assistant 控制唤醒词检测

你可以从 Home Assistant 远程开启或关闭唤醒词检测。这对于只在你在家时，或只在特定时间启用唤醒词检测以节省电量的自动化很有用。

使用 `command_wake_word_detection` 命令并配合 `turn_on` 或 `turn_off` 来控制唤醒词检测。关于如何向配套应用发送命令的详细信息，请参阅[通知命令文档](https://companion.home-assistant.io/docs/notifications/notification-commands/)。

### 在多个 Home Assistant 服务器之间使用 Assist

一旦 Assist 被设置为你手机上的默认数字语音助手，你就可以在多个服务器之间使用它。例如，当你还维护着别人家中的 Home Assistant 实例时，这会很有用。

1. 确保你已在这些 Home Assistant 服务器上设置好语音助手。
2. 确保这些服务器已经添加到配套应用中。
   - 在 Android 手机上，前往 **设置** > **Companion app** 并选择 **Add server**。
   - 从列表中选择额外的服务器。
3. 使用启动语音助手的手势来启动 Assist。具体手势会因版本不同而不同。
   - 从左下角向上滑动。
   - 长按电源键。
   - 按住主页按钮（底部的方形按钮）。
4. 打开语音助手下拉菜单。

   ![Using Assist with multiple servers](/home-assistant/images/assist/android_multi-server_01.png)

5. 选择你想要对话的实例中的语音助手。
   - 说出你的命令。

### 通过快捷方式使用 Assist

1. 在手机上打开 **Widgets** 面板。
2. 从列表中选择 **Home Assistant**。
3. 长按 **Assist** 图标并将其拖到主屏幕上。
4. 选择服务器和语音助手。
5. 如果你希望能够使用语音控制，请启用 **Start listening** 开关。
6. 对于你想连接的每个服务器重复此过程，例如当你需要支持别人家的系统时。

## Wear OS 上的 Assist

通过 Android 的 [Home Assistant Companion App](https://companion.home-assistant.io/) 和 “Assist” 磁贴，你也可以在 Wear OS 上使用 Assist。

<lite-youtube videoid="Dr_ZCbt8w5k" videotitle="Assist on Wear OS"></lite-youtube>

### 在 Wear OS 上设置 Assist

根据你的 Wear OS 版本不同，设置 Assist 的方式可能会有所不同。

1. 在手表上[安装配套应用](https://companion.home-assistant.io/docs/getting_started/)并连接到 Home Assistant 后，Assist 会自动出现在 **Apps screen** 中。

   ![Assist app](/home-assistant/images/assist/wearos_assist_app.png)

2. 若要添加 Assist 磁贴，请在 Wear OS 应用中前往 **Tiles** 区域，选择 **Add tile** > **Assist**。

   ![Conversation tile](/home-assistant/images/assist/android_tile.png)

### 将 Assist 添加到表盘

1. 在手机上打开 **Watch** 应用并选择 **Watch faces**。
2. 请确保你选择的表盘支持 complication（小型快捷图标）。
3. 点击 **Edit**。
4. 在 **Complications** 部分，选择其中一个槽位并选择 **Assist**。
   - 如果你是刚刚添加 Home Assistant 应用，Assist 可能暂时还不会显示。
   - 重启手表后，在 **Complications** 下应能看到一组 Home Assistant 图标。
5. 保存更改。现在你应该会在表盘上看到 Assist complication。

   ![Assist complication](/home-assistant/images/assist/android_watch_5.png)

### 在 Wear OS 上使用 Assist

1. 在手表上打开 Assist。

   - 例如，向左滑动直到看到 **Assist** 按钮。

   ![Assist button](/home-assistant/images/assist/android_watch_1.png)

2. 点击 **Assist** 后，等待显示 **How can I assist?**，并等待麦克风开始脉动。

   ![How can I assist](/home-assistant/images/assist/android_watch_2.png)

3. 说出你的命令。

   ![Assist speak your command](/home-assistant/images/assist/android_watch_3.png)

4. 如需更换语音助手，点击当前语音助手（上图中为 **Home Assistant Cloud**）。

   - 从列表中选择语音助手。

   ![List of assistants](/home-assistant/images/assist/android_watch_6.png)

### 在 Wear OS 手表上将 Home Assistant Assist 设置为默认语音助手应用

本流程基于 Wear OS 4.0 编写。具体步骤可能会因手表型号和软件版本而有所不同。

要将 Home Assistant Assist 设为默认语音助手应用，请按以下步骤操作：

1. 在手表上，前往 **Apps screen** 并选择齿轮图标 `[mdi:cog-outline]`。
2. 前往 **Apps** > **Choose default apps** > **Digital 语音助手 app**。
3. 从列表中选择 **Home Assistant**。
4. 返回上一级后，在 **Default app** 下现在应显示 **HA: Assist**。
5. 在某些手表上，你现在可以通过按下表冠键来启动 Assist。
   - 如果不起作用，你也可以手动将 Assist 分配给某个按钮。
6. 现在使用对应按键并说出命令。

### 为 Assist 分配按钮

根据你的手表型号，你可以将 Assist 分配给某个按钮，这样就能通过长按或双击直接启动它。

1. 在手表上，前往 **设置** > **Advances features** > **Customize keys**。
2. 分配一个按键：

   - 若要使用双击，点击 **Home key** > **Double press**。在应用列表中选择 **HA: Assist**。
   - 在 Galaxy watch 上，如果 Assist 已设为默认，你可以使用长按。点击 **Home key**，然后点击 **press and hold**。选择 **Assistant**。

     - 接着长按 Home 键，并在选择列表中选择 **HA: Assist**。
     - 选择 **Always**。

     ![List of assistants](/home-assistant/images/assist/android_watch_7.png)

3. 现在使用对应按键并说出命令。
