---
title: "Subsonic"
---

# Open Subsonic 提供者 <img src="/assets/icons/subsonic_icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持按照 <a href="https://opensubsonic.netlify.app/" target="_blank" rel="noopener noreferrer">Open Subsonic API 定义</a>工作的音乐服务器。该实现已针对 Gonic 和 Navidrome 进行了测试，但应该适用于任何实现。此组件由 <a href="https://github.com/khers" target="_blank" rel="noopener noreferrer">khers</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 是 |
| 支持的媒体类型 | 艺术家、专辑、曲目、播放列表、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 是 |
| 最高流媒体质量 | 无损 FLAC (24 bit, 192 kHz) |
| 登录方式 | 密码 |

### 其他

- 搜索 Subsonic 目录
- 所有音乐曲目将导入到 MA

## 配置：
您需要向 Music Assistant 提供以下信息：

- <b>用户名。</b> 您希望 Music Assistant 用于访问服务器的账户
- <b>密码。</b> 指定账户的密码
- <b>基础 URL。</b> 以 http:// 或 https:// 开头的服务器 URL（例如 https://music.domain.tld）
- <b>端口。</b> 通常，普通 http 为 80，https 为 443，但可以是任何可以访问服务器的端口
- <b>服务器路径。</b> 要附加到基础 URL 的路径，用于访问 Rest API（例如 mypathroute/ 如果您正在使用路径路由。（除非您知道需要它，否则留空））

### 设置

- <b>启用播客。</b> 此开关控制 Music Assistant 中播客的可用性
- <b>启用旧版验证。</b> 某些 Subsonic 实现需要启用此选项才能验证
- <b>强制播放器提供者跳转。</b> 某些 Subsonic 实现宣传支持跳转但实际上不支持。如果跳转不起作用，请启用此选项
- <b>推荐收藏。</b> 是否将收藏（加星标）的项目作为推荐包含？
- <b>推荐新专辑。</b> 是否将新专辑作为推荐包含？
- <b>推荐最多播放。</b> 是否将最多播放的专辑作为推荐包含？
- <b>推荐限制。</b> 每种启用类型应包含多少个推荐？
- <b>每次服务器请求包含的项目数。</b> 每次服务器请求的页面大小，默认为 200。低带宽连接应考虑降低。可以提高到 500。

## 已知问题 / 说明

- 并非所有服务器实现都接受空字符串作为搜索查询，然而根据 API 文档，这被视为有效输入。如果搜索或曲目枚举失败，请询问您的服务器实现的作者关于处理空查询字符串的问题
- 此提供者使用 https://github.com/khers/py-opensonic 与服务器通信，如果 Music Assistant 中某些功能无法正常工作，请尝试使用该库与您的服务器交互（能否 ping 通？能否获取艺术家和专辑？能否搜索？）
- 此提供者仅支持实现 Open Subsonic API 定义的服务器。要验证您的服务器是否兼容，请使用您用于测试上述连接性的相同设置来访问 getOpenSubsonicExtensions() 端点。如果未实现此端点，MA 无法与您的服务器通信
- 如果您发现 Subsonic 兼容服务器和 Music Assistant 之间显示的内容不匹配，请参阅并贡献 <a href="https://github.com/music-assistant/support/issues/2192" target="_blank" rel="noopener noreferrer">此处以帮助找到解决方案</a>
- 并非所有 Open Subsonic 实现都能很好地处理有多个贡献艺术家的曲目/专辑。如果您在 Music Assistant 中看到奇怪的艺术家，请验证您的实现是否为曲目或专辑上列出的所有艺术家都有艺术家 ID。请参阅 <a href="https://github.com/music-assistant/support/issues/2965" target="_blank" rel="noopener noreferrer">此处</a> 的讨论
- 如果在曲目中跳转时遇到问题，请尝试 subsonic 提供者设置中的`强制播放器提供者跳转`选项
- 可能无法播放 m4a 文件。解决此问题的选项有
    - 不使用此格式
    - 强制 subsonic 服务器在提供所有 m4a 文件之前将其转码为可用的格式
    - 不从 subsonic 服务器提供这些文件
    - 可能可以强制编码器将 moov atom 放在文件开头。这将使文件可播放，但 MA 不对此提供支持
- "不要停止音乐"模式（<a href="https://www.music-assistant.io/usage/#the-queue" target="_blank" rel="noopener noreferrer">此处描述</a>）依赖于您的 subsonic 服务器实现的 <a href="https://opensubsonic.netlify.app/docs/endpoints/getsimilarsongs/" target="_blank" rel="noopener noreferrer">getSimilarSongs</a> 端点。请确保您已配置服务器以使其工作。Gonic 和 Navidrome 都需要添加 Last.fm API 密钥才能提供相似歌曲。请参阅您的 subsonic 服务器的文档。
- 请注意，此提供者仅适用于使用 Open Subsonic API 定义的服务器实现。这意味着它不适用于原始 Subsonic 或其任何分支（如 Airsonic 或 Airsonic-Advanced），除非这些分支也已转向使用 Open Subsonic API 规范。

