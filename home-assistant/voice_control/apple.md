# Apple 设备上的 Assist

## iPhone 上的 Assist

Assist 可用于 iPhone、iPad 和 MacBook。

演示了如何通过 iPhone 15 Pro 的操作按钮和锁定屏幕小组件触发 Assist。

<lite-youtube videoid="AW_eslcO6AU" videotitle="Assist in Companion App for iOS"></lite-youtube>

### 前提条件

* [Home Assistant Companion App](https://companion.home-assistant.io/docs/getting_started/) 已安装
* 已设置好一个 Assistant：可以是[云端](/home-assistant/voice_control/voice_remote_cloud_assistant/index.md)（推荐，性能更好）或[本地](/home-assistant/voice_control/voice_remote_local_assistant/index.md)
* 你想通过 Assist 控制的设备已经[暴露给 Assist](/home-assistant/voice_control/voice_remote_expose_devices/index.md)，并且你已经检查了大部分[最佳实践](/home-assistant/voice_control/best_practices/index.md)

### 在 Home Assistant 中启动 Assist

1. 在手机上打开 Home Assistant。
2. 在右上角选择三点菜单，然后选择 **Assist**。
3. [说出命令](/home-assistant/voice_control/custom_sentences/index.md)。

### 在 iPhone 上通过快捷指令启动 Assist

本节基于 iOS 18 编写。根据你的机型和系统版本，具体步骤可能会有所不同。

要将 Home Assistant Assist 用作语音助手，请按以下步骤操作：

1. 为 **Assist in app** 创建一个快捷指令。
2. 选择以下任一方式来启动 Assist：
   * [通过轻点背面启动 Assist](#to-start-assist-using-a-back-tap)。
   * [通过操作按钮启动 Assist](#to-start-assist-using-the-action-button)。
   * [通过控制中心启动 Assist](#to-start-assist-using-control-center)。
   * [从锁定屏幕启动 Assist](#to-start-assist-from-lock-screen)。
   * [通过语音控制启动 Assist](#to-start-assist-using-voice-control)。
3. [说出命令](/home-assistant/voice_control/custom_sentences/index.md)。

#### To create a shortcut to Assist in App

1. 在手机上打开 **Shortcuts** 应用，然后选择 **New**。
2. 输入 `Home Assistant` 并选择 **Assist in app**。
3. **Choose** 对应的管线。
4. 选择 **Done**。现在你已经拥有一个 **Assist in app** 快捷指令。

#### To start Assist using a back tap

1. 按照 Apple 文档 [Running shortcuts by tapping the back of your iPhone](https://support.apple.com/en-gb/guide/shortcuts/apd897693606/ios) 中的说明，选择 **Assist in app** 快捷指令。
2. 轻点手机背面即可启动 Assist。

#### To start Assist using the Action button

1. 前往 **设置** > **动作 Button**，向下滚动直到看到 **Controls**。
2. 在 **Home Assistant** 下选择 **Assist**。
3. 选择你偏好的管线。
4. 长按操作按钮启动 Assist。

对于控制中心和锁定屏幕：

#### To start Assist using control center

1. 打开控制中心。
2. 长按空白区域并找到 **Home Assistant**。
3. 选择 **Assist**。
4. 当图标出现在控制中心后，再次点击它以选择要使用的管线。

#### To start Assist from Lock Screen

1. 长按锁定屏幕上的空白区域。
2. 在底部两个项目中选择一个你想用 Assist 替换的位置。
3. 移除该项目。
4. 点击它以添加新项目，并在列表中找到 **Home Assistant Assist**。
5. 当图标出现在锁定屏幕后，再点击一次以选择要使用的管线。
6. 或者，你也可以执行相同步骤，在锁屏时钟下方添加一个小组件。

#### To start Assist using Voice Control

iOS 内置了一项名为 **Voice Control** 的辅助功能，可让你完全通过语音命令操作 iPhone。借助 **custom commands**，你可以用自定义唤醒短语触发 **Assist in app** 快捷指令。

例如，你可以创建一条 **"Okay Nabu"** 自定义命令，用来运行 **Assist in app** 快捷指令。

设置方法如下：

1. 前往 **设置** > **Accessibility** > **Voice Control**。
2. 启用 **Voice Control**。
3. 点击 **Customize Commands** > **Create New Command**。
4. 输入你想使用的短语（例如 `Okay Nabu`）。
5. 在 **动作** 下，选择 **Run Shortcut**。
6. 选择你之前创建的 **Assist in app** 快捷指令。
7. 保存该命令。

完成配置后，说出你的自定义短语即可启动 Assist。

:::note
虽然这种方式效果不错，但速度可能不如触发 Siri 或使用硬件按钮快。还请注意，启用 Voice Control 意味着整个系统的语音导航都会处于激活状态，这偶尔可能会意外触发其他命令。
:::

## 调整语言

通过 Siri 触发的快捷指令始终会使用 Siri 当前设置的语言。Assist Button 快捷指令则用于手动触发，可以配置为任意语言。

打开“快捷指令”应用并编辑 Button Assist 快捷指令。引号中的文字会以你的设备语言显示。

* 使用箭头展开 *"Dictate text"* 动作选项，并选择你的语言。
* 使用箭头展开 *"Assist with `Provided Input`"* 选项，并选择你的语言。

:::important
你可以多次导入该按钮快捷指令，为不同语言创建多个版本。当系统询问是否替换现有快捷指令时，请选择 "Keep Both"。
:::

## 多个服务器

如果你配置了多个 Home Assistant 服务器，Assist 快捷指令同样可以使用。默认情况下，它会提示你选择要将命令发送到哪个服务器。这样不够免操作，因此你可以更新快捷指令，让它固定指向某个特定服务器。你需要为每个服务器分别导入一次快捷指令。

打开“快捷指令”应用并编辑每个 Assist 快捷指令。引号中的文字会以你的设备语言显示。

* 使用箭头展开 *"Assist with `Provided Input`"* 动作，并选择你的 Home Assistant 服务器。
