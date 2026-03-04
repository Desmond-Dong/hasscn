---
title: "Beta 测试：构建之间的清理"
id: 'resetting'
---

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 参与过 2.0 版本 Beta 测试的用户可能经历了许多构建，并获得了一些现在已经冗余的传感器。<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> 安装了 [Play Store Beta 构建](https://play.google.com/apps/testing/io.homeassistant.companion.android) 的 Android 用户也可能发现他们需要重新开始一个新的集成来清理问题。以下步骤将允许您从 Home Assistant 实例中彻底删除以前构建的所有痕迹，并重新开始运行。

:::tip
在大多数情况下，可以通过从 Home Assistant 中删除相关的"Mobile App"集成来完全删除 Home Assistant 和伴侣应用之间的连接。这可以在"配置"中找到，然后是"集成"。完成此操作后，您可以从设备上卸载伴侣应用，并（如果需要）重新安装。如果您有 Apple Watch，值得在重新安装之前检查 Home Assistant 伴侣应用是否已从您的 Watch 上卸载。
:::

如果上述方法不起作用，您可以按照以下步骤从 Home Assistant 中完全删除伴侣应用的所有痕迹。这些步骤假设您在 Beta 期间只使用了一台设备，或者希望从所有设备中删除以前 Beta 构建的所有痕迹。

0.  **备份您的 Home Assistant。不要跳过此步骤！**
1.  转到 Home Assistant 配置页面上的[集成](https://my.home-assistant.io/redirect/integrations/)。
2.  选择 Mobile App: `<设备 ID>`（其中设备 ID 是您设备的名称）。
3.  通过点击右上角的垃圾桶删除集成。如果在上一个页面有多个 Mobile App 条目，请对每个条目重复此步骤。
4.  返回 Home Assistant 配置页面并打开[实体注册表](https://my.home-assistant.io/redirect/entities/)。
5.  删除右侧列出 `mobile_app` 的所有条目，此步骤可能不需要，因为它们可能已经在上面的步骤 3 之后被删除。
6.  使用您喜欢的方法编辑 Home Assistant 实例上的文件，打开 `.storage` 文件夹并删除 `mobile_app` 文件。
7.  打开 `known_devices.yaml` 并删除（可能是最后一个）由 32 个字符的唯一 ID 组成的条目，代表您设备的 `device_tracker`。此步骤可能不需要，因为该实体可能已经在上面的步骤 3 之后被删除。
8.  重启 Home Assistant。
9.  从您的设备中删除 Home Assistant 应用。如果您有 Apple Watch，请在 Watch 应用中检查 Home Assistant 伴侣应用是否也已从中卸载。
10. 从 TestFlight（Beta 测试期间）、AppStore、Google Play Store 或 Firebase 重新安装 Home Assistant 应用。
11. 打开应用并按照设置过程操作。