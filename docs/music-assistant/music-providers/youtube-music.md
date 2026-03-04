---
title: "YouTube Music"
---

# YouTube Music 提供者 <img src="/assets/icons/ytm-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 Youtube Music。由 <a href="https://github.com/MarvinSchenkel" target="_blank" rel="noopener noreferrer">MarvinSchenkel</a> 贡献和维护。

> [!WARNING]
> **免责声明**
>
> 请注意，Youtube 不提供官方 API 来检索数据和流。这意味着一切都是基于尽力而为的原则构建的。使用此提供者时会出现意外行为。因此，如果您有其他流媒体提供者，您可能会发现使用那个比这个更方便。

> [!NOTE]
> 不支持免费账户。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 否 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 有损，AAC (256kbps) |
| 登录方式 | Token + Cookie |

### 其他
- 搜索 YouTube Music 目录
- 播放时会选择 Youtube Music 中可用的最高流媒体质量（类似于在 Web 应用中配置"high"）

## 配置

自 2024 年 11 月起，Google 已从 YT Music 中移除了 OAuth 验证。这意味着使用这种（有些繁琐的）cookie 验证方法是让 YT Music 工作的**唯一**方式。

> [!NOTE]
> Cookie 一段时间后会过期。这意味着如果 YT Music 停止工作并且您在 MA 日志中看到 `401: Unauthorized` 或 `Unable to fetch PO Token for web_music client`，您需要再次运行此过程。使用此 <a href="https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies" target="_blank" rel="noopener noreferrer">方法获取 cookie</a> 可以最大化 cookie 寿命。

> [!NOTE]
> 如果使用家庭账户，则为 MA 设置一个专用账户将有助于最大化 cookie 寿命。
    
### 获取 Cookies
YouTube 作为安全措施会在打开的 YouTube 浏览器选项卡上频繁轮换账户 cookie。要导出能持续工作的 cookie，您需要以某种方式导出 cookie，使其永远不会被轮换。一种方法是通过隐私浏览/无痕窗口。

- 在无痕窗口的浏览器中打开 <a href="http://music.youtube.com/" target="_blank">YT Music</a>。
- 通过 View -> Developer -> Developer Tools 打开开发者工具。请注意，根据您的浏览器，这可能有不同的名称。它应该打开一个类似这样的窗口：
<a href="/assets/screenshots/ytmusic-developer-tools.png" target="_blank"><img src="/assets/screenshots/ytmusic-developer-tools.png" alt="开发工具" loading="lazy" /></a>

- 导航到"Network"选项卡
- 在过滤栏中，输入"/browse"。如果没有显示结果，请重新加载页面。
- 现在导航到 YT Music 中需要验证的页面，例如您的媒体库播放列表之一
- 表格中将显示一个请求：

<a href="/assets/screenshots/ytmusic-auth-request.png" target="_blank"><img src="/assets/screenshots/ytmusic-auth-request.png" alt="验证请求" loading="lazy" /></a>

- 单击该请求并确保您在"Headers"选项卡上
- 找到名为"Request Headers"的部分
- 找到名为"Cookie"的项目并复制**值**。复制精确的值**非常**重要。仔细检查不要在值的开头/结尾包含任何额外的空格或字符
<a href="/assets/screenshots/ytmusic-cookie-value.png" target="_blank"><img src="/assets/screenshots/ytmusic-cookie-value.png" alt="Cookie 值" loading="lazy" /></a>

### 安装 PO Token 插件
自 2025 年 3 月起，Google 实施了一种称为"PO Tokens"（来源证明）的新安全机制。如果没有有效的 PO Token，Music Assistant 将无法解析您音乐的流 URL。幸运的是，我们可以为您自动生成这个，但您需要为此安装一个插件（也可作为 Docker 镜像使用）。

- 在 Home Assistant 中，转到 Settings > Add-ons > Add-on Store
- 向下滚动到"Music Assistant"部分
- 有一个名为"YT Music PO Token Generator"的新插件
- 安装此插件并确保在 Music Assistant 中添加 YT Music 提供者之前启动它

> [!NOTE]
> 如果您自己托管 Music Assistant，可以<a href="https://github.com/Brainicism/bgutil-ytdlp-pot-provider" target="_blank" rel="noopener noreferrer">在此处</a>下载 PO Token 服务器的 Docker 文件，但您必须运行 MA 当前支持的版本，即 1.2.1。安装正确的版本并运行它，然后返回 Music Assistant 并在配置 YT Music 提供者时添加 PO Token 服务器的 URL。

### 配置提供者 
- 导航到"设置"
- 在音乐提供者下，单击"添加新"，选择"Youtube Music"并按如下方式填写通用设置部分中的字段：
    - <b>用户名。</b> 使用您的 gmail 地址或使用品牌账户（参见[品牌账户](#using-brand-accounts)）
    - <b>登录 Cookie。</b> 粘贴上面获取的值
    - <b>PO Token 服务器 URL。</b> 如果在与 MA App 相同的主机上作为 App 运行 PO 服务器，请将此设置保留为默认值。如果单独运行 PO Token 服务器，请相应调整 IP 地址和端口
- 单击"保存"

> [!CAUTION]
> **保存时出错**
>
> 如果保存后看到 `__Secure-3PAPISID`，这意味着 cookie 不是来自验证请求。导航到 YT Music 中更多需要验证的页面（例如您的媒体库）。要确认已获取正确的 cookie，请将其粘贴到文本编辑器中并搜索"__Secure-3PAPISID"。如果在获取具有此值的 cookie 时遇到困难，请尝试不同的浏览器。

## 使用品牌账户
品牌账户是存在于您主 Google 账户下的子账户。如果您想使用品牌账户登录，您需要找到您的品牌账户 ID。

- 转到 <a href="https://myaccount.google.com/" target="_blank">https://myaccount.google.com/</a>
- 从右上角菜单中，选择您的品牌账户
- 查看 URL 并复制 21 位数字
- 在设置提供者时在"用户名"字段中使用此数字

## 已知问题 / 说明

- 此提供者模拟 YouTube Music。不要期望看到与使用 YouTube 时相同的搜索结果
- 专辑曲目列表中不支持光盘号和曲目号。目前，光盘号始终为 0，曲目号是 Youtube Music 返回曲目的顺序号。这通常会给出所需的结果，但可能会打乱多光盘专辑的顺序
- 是否选择播放音乐视频完全取决于您正在播放的内容。如果您在媒体库中保存了特定专辑，那么该确切版本将显示在 MA 中，因此您将拥有专辑版本。但是，如果您在播放列表上启动电台，则 Youtube Music 会决定在"动态电台"播放列表中播放哪些歌曲，其中可能包含视频
- 上传的音乐在播放列表中时应该能够找到。如果只是搜索单个曲目，可能找不到，因为这些上传的歌曲通常没有正确的元数据。通过 MA 的 UI 很难找到它们
- 使用此提供者时可能会出现一些低质量的封面图片。YTM 在提供缩略图方面非常不一致。当检索播放列表或专辑时，曲目的缩略图通常所有歌曲都是低质量的。但是，当播放单个曲目时，应显示 HQ 版本。此提供者尝试通过加载下一个排队曲目的详细信息来解决专辑和播放列表的问题，但仍可能会遇到一些低质量的专辑封面
- 默认情况下，只有喜欢的音乐和"稍后收听的剧集"播放列表会添加到 YTM 媒体库，因此会出现在 MA 中。要在 MA 媒体库中看到其他个人播放列表，您必须进入 YT Music Web 应用并将这些个人播放列表添加到您的媒体库