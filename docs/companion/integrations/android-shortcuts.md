---
title: "Android 快捷方式"
id: 'android-shortcuts'
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

Android 应用支持动态和固定[快捷方式](https://developer.android.com/guide/topics/ui/shortcuts)。快捷方式允许用户直接从主屏幕导航到特定的仪表板页面或实体，而无需先启动应用。支持的设备将在[设置](https://my.home-assistant.io/redirect/config/)的伴侣应用下看到管理快捷方式部分。在那里，用户必须提供在启动器中显示的标签（Google 推荐 10 个字符）。还必须提供描述，因为某些启动器可能更喜欢显示它（Google 推荐 25 个字符）。

目前支持 2 种快捷方式类型：仪表板或实体。默认快捷方式类型是仪表板，您必须输入仪表板路径（例如：`/dashboard-name/viewname`、`/lovelace/default_view` 或 `/lovelace-dashboardname/viewname`）才能创建快捷方式。如果您选择了实体，您将看到一个新的实体字段，其中包含来自您的 Home Assistant 服务器的所有实体列表供您选择。选择后，您将能够创建快捷方式。

动态快捷方式在 Android 7.1+ 的设备上受支持。这些快捷方式需要从[设置](https://my.home-assistant.io/redirect/config/)中的伴侣应用添加，以便用户在长按应用图标后可以将其拖到主屏幕上。需要注意的是，Android 只支持在长按菜单下显示 5 个动态快捷方式，但是，大多数启动器只支持显示 4 个。所有 5 个快捷方式都可以更新，也可以从应用长按菜单中删除。

固定快捷方式在 Android 8.0+ 的设备上受支持。这些快捷方式只能从[设置](https://my.home-assistant.io/redirect/config/)中的伴侣应用创建，可以手动拖动或从此屏幕自动添加。它们不会显示在应用长按菜单下，而是直接显示在主屏幕上。用户可以添加的快捷方式数量没有限制。固定快捷方式可以随时更新。