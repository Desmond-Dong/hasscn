# 从仪表盘启动 Assist

如果您以 kiosk 模式使用 Home Assistant，例如把平板安装在墙上，那么右上角的 Assist 图标可能无法访问。这种情况下，您可以使用仪表盘按钮来启动 Assist。

## 前提条件

* 您已经设置好了[本地助手](/home-assistant/voice_control/voice_remote_local_assistant/index.md)或[云端助手](/home-assistant/voice_control/voice_remote_cloud_assistant/index.md)
* 您已将想通过 Assist 控制的设备[暴露给 Assist](/home-assistant/voice_control/voice_remote_expose_devices/index.md)

## 向仪表盘添加 Assist 按钮

1. 在您的仪表盘中，选择 **添加卡片**，然后选择 **按钮** 卡片。
2. 清空 **实体** 字段。
3. 为卡片命名，例如 *Assist - listen*。
4. 选择一个图标，例如 `mdi:account-tie-voice`。
5. 在 **操作** 下拉菜单中，选择 **Assist**。
6. 在 **Assist** 下拉菜单中，选择您想使用的助手，例如 **Home Assistant Cloud**。
   * 您可以选择任何已经设置好的助手。
   * 如果您有多个不同语言的助手，也可以为每种语言分别添加一个按钮。
7. 如果您希望通过语音使用 Assist，请启用 **开始监听**。
   * 如果您只想输入文字而不使用语音，则无需启用监听。
8. **保存** 新的按钮卡片。
