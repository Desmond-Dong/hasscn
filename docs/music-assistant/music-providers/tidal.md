---
title: "Tidal"
---

# Tidal 提供者 <img src="/assets/icons/tidal-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://tidal.com" target="_blank" rel="noopener noreferrer">Tidal</a>。由 <a href="https://github.com/jozefKruszynski" target="_blank" rel="noopener noreferrer">jozefKruszynski</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 是 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 无损 FLAC (24 bit, 192 kHz) |
| 登录方式 | OAuth |

### 其他

- 搜索 Tidal 目录
- 您 Tidal 媒体库中的项目将在 Music Assistant 中标记为"收藏"
- 从 Music Assistant 界面将项目标记为"收藏"也会在 Tidal 中将其标记为收藏
- 播放时，将选择最高质量的 FLAC HiFi 版本
- 可以添加多个 Tidal 账户

## 配置

在配置中，有一系列步骤必须按顺序完成。从页面顶部开始向下操作。

<a href="/assets/screenshots/tidal-config.png" target="_blank"><img src="/assets/screenshots/tidal-config.png" alt="Tidal 配置" style="width: 800px;"  loading="lazy" /></a>

1. 单击第一个按钮，您将被重定向到 Tidal 登录页面，登录后您将看到一个错误页面，这是正常的。

    <a href="/assets/screenshots/oops-page.png" target="_blank"><img src="/assets/screenshots/oops-page.png" alt="Oops 页面" style="width: 800px;"  loading="lazy" /></a>

2. 复制 Oops 错误页面地址栏中的完整 URL 并将其插入配置屏幕

3. 单击最后一个按钮完成设置

### 设置

- <b>Tidal 质量设置。</b> 选项有 `Max [默认]` 或 `High`。Max 最高可达 24-bit, 192 kHz，High 最高可达 16-bit, 44.1 kHz。

## 已知问题 / 说明

- 如果授权过程卡住，请尝试不同的浏览器。可能是授权弹出窗口被阻止了
- 如果通常使用"使用 Google 继续"登录，则需要一个变通方法，因为 MA 用于验证的登录页面上不显示此选项。在这种情况下，使用浏览器正常登录 Tidal。在同一个浏览器中通过 MA 启动验证过程。应该会看到使用现有登录的提示。接受后应该会出现上述第 1 步中提到的错误页面。从该点开始，继续执行上述第 2 步和第 3 步。

