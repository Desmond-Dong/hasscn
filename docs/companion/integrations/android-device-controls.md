---
title: "Android 设备控制"
id: 'android-device-controls'
---


<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 应用将自动集成到运行 Android 11 或更高版本且支持此功能的设备上的[智能家居设备控制](https://developer.android.com/guide/topics/ui/device-control)功能。所需的是您能够登录应用并远程使用它。

要开始使用，请在您的设备上打开设备控制。您会在哪里找到它们取决于设备制造商和 Android 版本，一些常见的地方是：在快速设置面板中、在通知抽屉中或在电源菜单中。点击"添加控制"并选择 Home Assistant 应用。下面列出的所有域都可以添加到设备控制面板中。

点击磁贴将其打开或关闭。某些域还允许您通过在磁贴上前后滑动手指来增加或减少范围。

支持以下域：

*  `automation` 开/关
*  `button` 按下
*  `camera` 快照图像（仅在 Android 12 或更高版本上支持）
*  `climate` 温度滑块，循环切换模式
*  `cover` 打开/关闭
*  `fan` 开/关，速度滑块
*  `humidifier` 开/关
*  `input_boolean` 开/关
*  `input_button` 按下
*  `input_number` 数字控制滑块
*  `light` 开/关，亮度控制滑块
*  `lock` 锁定/解锁
*  `media_player` 播放/暂停，音量控制滑块
*  `number` 数字控制滑块
*  `remote` 开/关
*  `scene` 开启场景
*  `script` 开启脚本
*  `siren` 开/关
*  `switch` 开/关
*  `vacuum` 启动/返回或开/关，取决于吸尘器类型

## 锁定时使用

在 Android 11 上，您可以在设备锁定时使用添加的控件。

在 Android 12 上，您不能在设备锁定时使用添加的控件。

在 Android 13 及更高版本上，您可以控制在设备锁定时使用添加的控件。首先，确保您已在系统设置中启用了锁定时使用设备控制的选项（设置应用 > 显示 > 锁定屏幕）。现在您可以在设备锁定时使用添加的控件！如果您想更改特定控件或实体的设置，请打开 Home Assistant 并转到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理设备控制。

## 使用仪表板代替内置控件

从 Android 14 开始，在支持的设备上，您还可以在使用设备控制功能时显示 Home Assistant 仪表板而不是内置控件。两种模式各有优势：内置控件易于使用，允许您管理每个实体的锁定设置并并排控制多个服务器，而仪表板支持所有 Home Assistant 功能并允许完全自定义控件以满足您的需求。上面的文档描述了内置控件。

要在模式之间切换，请打开应用并转到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理设备控制，然后选择"内置"或"仪表板"。选择仪表板后，您还可以输入要使用的仪表板路径（例如：`/lovelace/default_view` 或 `/lovelace-dashboardname/viewname`）以使用与默认不同的仪表板。

:::info
从内置设备控件切换到仪表板时：如果您之前使用过内置设备控件，您可能需要在显示仪表板之前删除所有控件。
:::

## 将多个服务器拆分为单独的页面

如果您在伴侣应用中登录了多个服务器，您可以将这些服务器拆分为单独的"结构"。这将使每个服务器的控件显示在设备控制内的不同页面上（就像您有其他应用输入到设备控制一样）。

默认情况下这是禁用的，但如果您希望启用它，您必须在应用中添加了多个服务器。要启用它，请打开应用并转到[设置](https://my.home-assistant.io/redirect/config/) > 伴侣应用 > 管理设备控制，然后切换"将多个服务器拆分为设备控制内的单独页面"。您可能需要删除并重新添加设备控制，以便在设备控制中显示拆分。