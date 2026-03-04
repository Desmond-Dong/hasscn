---
title: "Roku Media Assistant"
---

# Roku Media Assistant <img src="/assets/icons/roku-media-assistant-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Media Assistant 是一个实用程序，允许您通过深层链接在 Roku 设备上流式传输/播放本地和托管的媒体。更多信息（包括示例和文档）可以在 <a href="https://medievalapple.net/Media-Assistant" target="_blank" rel="noopener noreferrer">Media Assistant 网站</a>上找到。

## 功能

- Roku 由 Music Assistant 自动检测
- 支持使用物理按钮播放/暂停
- 音频质量为无损 48 kHz/16-bit

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)之外，Roku Media Assistant 提供者还有以下高级设置。

<b>允许自动 Roku 发现</b>默认启用，并启用 Roku 设备的自动发现。

<b>Media Assistant 的 App ID</b> 仅在 Media Assistant 应用程序被侧载到设备上时使用。

## 配置

> [!NOTE]
> 您的 Roku 必须在 Roku OS V9.1 或更高版本上才能安装 Media Assistant App（该应用程序仅在最低 OS V13.0 上测试过）。

1. 从 Roku Channel Store 安装 Media Assistant 应用程序或将其侧载到您的 Roku 上。
- Roku Channel Store 链接 (https://channelstore.roku.com/details/625f8ef7740dff93df7d85fc510303b4/media-assistant)
- 侧载链接 (https://github.com/MedievalApple/Media-Assistant)
2. 如果您侧载了应用程序，则需要将高级 >> `Media Assistant 的 App ID` 中的播放器提供者设置更改为 `dev`。
3. 在较新的 Roku OS 版本上，为了让 Music Assistant 与 Roku 通信，您必须确保启用移动应用程序控制。要检查这一点，请转到 Roku 的设置并导航到（Settings >> System >> Advanced system settings >> Control by mobile apps >> Network access）并检查 `Network access` 是否设置为 `Enabled`。

## 已知问题 / 说明

- 用于跳过的物理按钮不起作用
- Roku 不支持音频交叉淡入淡出。如果需要交叉淡入淡出和/或完全无间隙支持，请在播放器的高级设置中启用 `Flow mode`。启用 `Flow mode` 可能会解决播放问题，但显示的剩余时间将丢失

## 尚未支持
- 目前必须在设备上控制音量。
