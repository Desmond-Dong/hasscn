---
title: "Fully Kiosk"
---

# Fully Kiosk 浏览器 <img src="/assets/icons/fully-kiosk.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持流式传输到运行 Fully Kiosk Browser Android 应用程序的设备

## 功能

- 这是一个基本播放器
- 可以添加多个 Fully Kiosk 浏览器播放器
  
## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)之外，Fully Kiosk 提供者还有以下设置：

- <b>运行 Fully Kiosk 的设备的 IP 地址（或主机名）。</b>
- <b>用于连接到 Fully Kiosk API 的密码。</b>
- <b>用于连接到 Fully Kiosk API 的端口。</b> 默认为 2323
- <b>连接到 Fully Kiosk API 时使用 HTTPS。</b> 默认关闭
- <b>验证 HTTPS 证书。</b> 默认启用
- <b>TLS 证书指纹。</b> 可选的 SHA-256 HEX 指纹。提供时必须与设备证书匹配，并覆盖 `验证 HTTPS 证书` 设置

## 已知问题 / 说明

- 必须手动添加 Fully Kiosk 播放器
- 需要 Fully Kiosk 的<a href="https://www.fully-kiosk.com/#pricing" target="_blank" rel="noopener noreferrer">付费许可证</a>
- 配置时必须添加设备 IP 地址和 Fully Kiosk 密码
- 添加后，如果需要，可以在特定播放器配置中更改设备名称
- 某些设备无法处理 FLAC 流，因此单个播放器设置中的选项允许更改为有损 MP3 编解码器
- 如果在单个播放器设置中启用了[流模式](/music-assistant/faq/tech-info/#track-queueing)，则支持交叉淡入淡出。启用流模式也可能解决播放问题，但可能会有禁用实际物理按钮和/或设备本身显示元数据的副作用
- 此播放器可以通过[通用组](/music-assistant/faq/groups/#universal-groups)分组，但无法实现完美同步。
