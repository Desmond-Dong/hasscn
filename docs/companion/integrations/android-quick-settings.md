---
title: "Android 快速设置"
id: 'android-quick-settings'
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /><br />

Android 应用支持快速设置[磁贴](https://developer.android.com/reference/android/service/quicksettings/TileService)，允许您从通知下拉菜单快速执行脚本/场景、按下（输入）按钮或切换支持的域。您可以完全自定义这些磁贴的外观，并可以按您认为合适的方式重新排列它们。此功能适用于运行 Android 7.0+ 的设备。要开始使用，请导航到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理磁贴。

应用目前提供最多 40 个磁贴供设置。每个磁贴必须设置标签，在 Android 10 或更高版本上可以选择设置子标签。选择标签和实体后，您将能够更新磁贴数据。更新后，磁贴就可以使用了：编辑设备的快速设置面板，并将 Home Assistant 磁贴从磁贴列表拖到活动部分。

添加磁贴后，状态、标签和图标将更新以反映实体的状态和磁贴设置。当您选择磁贴时，您会看到磁贴短暂亮起，同时应用调用服务器。如果成功，磁贴将返回显示实体的状态，如果失败，磁贴将变为禁用状态并显示错误消息。

支持以下域：

*  `automation` 切换
*  `button` 按下
*  `cover` 切换
*  `fan` 切换
*  `humidifier` 切换
*  `input_boolean` 切换
*  `input_button` 按下
*  `light` 切换
*  `lock` 锁定/解锁
*  `media_player` 切换
*  `remote` 切换
*  `siren` 切换
*  `scene` 开启场景
*  `script` 开启脚本
*  `switch` 切换

可选的附加设置：

* 磁贴默认使用实体图标。点击图标可为磁贴使用不同的图标。
* 可以启用点击时振动，以便在点击磁贴时振动一次，如果操作失败则振动两次。
* 可以启用需要解锁设备，以便仅在设备解锁时才允许与磁贴交互。