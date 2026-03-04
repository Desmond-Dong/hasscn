---
title: "Deezer"
---

# Deezer 提供者 <img src="/assets/icons/deezer-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>。由 <a href="https://github.com/arctixdev" target="_blank" rel="noopener noreferrer">arctixdev</a> 和 <a href="https://github.com/micha91" target="_blank" rel="noopener noreferrer">micha91</a> 贡献和维护。

> [!TIP]
> **注意**
>
> - 由于 Deezer 的服务条款，仅支持 HiFi/Premium/Family 账户
> - 从 Deezer 同步所有项目需要一些时间是正常的

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体  | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 无损 FLAC (44.1 kHz / 16 bit) |
| 登录方式 | OAuth + Cookie |

### 其他

- 搜索 Deezer 目录
- 您 Deezer 收藏中的项目将导入到 MA 媒体库，并在 MA 中自动标记为"收藏"
- 如果您将 Deezer 中的项目添加到 MA 媒体库，则 Deezer 中不会有任何变化，除非您也将其标记为收藏（此时该项目将添加到 Deezer 收藏）
- 完全支持艺术家、专辑、曲目和播放列表元数据
- 可以创建播放列表，以及在现有播放列表中添加和删除曲目
- 在 Deezer 中记录播放的曲目

## 配置

Deezer 的验证通过 Access 和 ARL Token 完成。不幸的是，Deezer 不正式支持第三方登录，因此您需要获取自己的 ARL Token。说明是以 Chrome 编写的：

1. 在 MA 设置中选择添加音乐提供者，然后选择 DEEZER。
2. 按`验证`按钮启动验证过程
3. 在弹出窗口中登录 Deezer
4. 登录后，MA 设置页面将自动填充 ACCESS TOKEN，但现在需要手动获取 ARL TOKEN
5. 在另一个浏览器选项卡中导航到 <a href="https://deezer.com/" target="_blank" rel="noopener noreferrer">https://deezer.com/</a>
6. 右键单击浏览器窗口并选择检查。将打开一个新窗口
7. 单击"Application"选项卡。您可能需要展开窗口或单击 `>>` 按钮
8. 在 Storage > Cookies 下，单击"https://www.deezer.com"并找到名为"arl"的条目
   <a href="/assets/screenshots/deezer-arl.png" target="_blank"><img src="/assets/screenshots/deezer-arl.png" alt="预览图片" loading="lazy" /></a>
9. 复制 cookie 值并在 Music Assistant 中将其用作 ARL TOKEN

**如果不起作用，请确保您：**

- 与 Music Assistant 在同一网络上
- 可以使用其 IP 地址访问 Music Assistant
- 拥有 Hifi/Premium/Family 账户
- 使用最新版本的 Music Assistant
- 尝试不同的浏览器

## 尚不支持
- 播客
- 完整的推荐/flow 功能

特别感谢 <a href="https://GitHub.com/browniebroke/deezer-python" target="_blank" rel="noopener noreferrer">Deezer-python</a>，由 <a href="https://github.com/browniebloke" target="_blank" rel="noopener noreferrer">browniebroke</a> 制作。没有它，这会花费更长的时间。

