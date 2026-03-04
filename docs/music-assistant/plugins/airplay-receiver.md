---
title: AirPlay Receiver 插件
description: AirPlay Receiver 插件的功能和说明
---

# AirPlay Receiver <img src="/assets/icons/airplay-receiver-icon.svg" alt="预览图片" style="width: 70px; float: right;" loading="lazy" />

Music Assistant 可以为任何 MA 播放器添加 <a href="https://www.apple.com/au/airplay/" target="_blank" rel="noopener noreferrer">AirPlay Receiver</a> 音频支持。

> [!NOTE]
> 此插件仍处于早期开发阶段。功能有限，可能存在 bug

## 功能

- 允许任何 MA 播放器在其他支持 AirPlay 的应用程序中显示为 AirPlay 设备
- 任何 MA 播放器都可以被暴露，包括群组

## 配置

要使每个播放器显示为 AirPlay 目标，需要在 MA 提供者设置中为每个播放器单独添加此插件。

## 已知问题 / 说明

- 要使用 AirPlay，所有设备必须连接到同一网络
- 由于缓冲的原因，播放、暂停和恢复时大约 5 秒的延迟是正常的
- 不支持使用 HA 媒体播放器作为 `已连接的 Music Assistant 播放器`
