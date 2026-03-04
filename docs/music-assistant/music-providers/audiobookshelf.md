---
title: "Audiobookshelf"
---

# audiobookshelf 提供者 <img src="/assets/icons/audiobookshelf-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://www.audiobookshelf.org/" target="_blank" rel="noopener noreferrer">audiobookshelf</a>。由 <a href="https://github.com/fmunkes" target="_blank" rel="noopener noreferrer">Fabian Munkes</a> 贡献和维护。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体   | 是 |
| 支持的媒体类型 | 有声读物、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 是 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | 192kHz 24 bit |
| 登录方式 | 密码或 Token |

### 其他

- 填充所提供用户可访问的所有库中的有声读物
- 填充所提供用户可访问的所有库中的播客
- 浏览功能具有以下结构：

```
        Library_Name_A (有声读物)
            Authors
                Author_1
                    Series_1
                    Audiobook_1
                    Audiobook_2
                Author_2
                    Audiobook_3
            Narrators
                Narrator_1
                    Audiobook_1
                    Audiobook_2
            Series
                Series_1
                    Audiobook_1
                    Audiobook_2
                Series_2
                    Audiobook_3
                    Audiobook_4
            Collections
                Collection_1
                    Audiobook_1
                    Audiobook_2
                Collection_2
                    Audiobook_3
                    Audiobook_4
            Audiobooks
                Audiobook_1
                Audiobook_2
        Library_Name_B (播客)
            Podcast_1
            Podcast_2
```

- 有声读物搜索功能支持搜索作者和朗读者
- 进度双向同步，并在播放前获取
- **已知**库中播客/有声读物元数据的事件驱动更新：
    - 如果 MA 正在运行，更改会立即反映到 MA 数据库
    - 新添加和刚刚删除的项目也会立即反映
    - 但是：如果 MA 在 ABS 数据库发生更改时关闭，则只有在触发正常提供者同步时才会同步这些更改
- 支持单文件和多文件有声读物
- 在[主页视图](/music-assistant/ui/#view---home)上支持推荐

## 配置

设置此提供者需要以下内容：

- <b>服务器。</b> Audiobookshelf 实例的服务器 URL（例如 `https://abs.domain.tld/` 或 `http://192.168.1.4:13378/` 用于本地服务器）。
- 无 <a href="https://www.audiobookshelf.org/guides/oidc_authentication/" target="_blank" rel="noopener noreferrer">OIDC</a> 的验证：
    - <b>用户名。</b> Audiobookshelf 用户的用户名
    - <b>密码。</b> 此用户的密码

> [!NOTE]
> 用户必须是 user、admin 或 root 类型。Guest 用户既未测试也不受支持

- 如果配置了 <a href="https://www.audiobookshelf.org/guides/oidc_authentication/" target="_blank" rel="noopener noreferrer">OIDC</a>：
    - 2.26 版本之前，<b>使用 Token 而不是用户/密码。</b> 在指定字段中添加 token。此 token 可以由管理员用户在 ABS 设置 -> 用户中为任何用户获取
    - 从 2.26 版本开始，audiobookshelf 内部使用 JWT token 系统。可以为外部应用程序创建永久 API 密钥。请按照 https://www.audiobookshelf.org/guides/api-keys/ 的 audiobookshelf 文档创建此类 API 密钥

> [!NOTE]
> 如果您插入旧的 legacy token，一旦这些 token 从 ABS 中移除，您的提供者将不再工作。

### 多用户环境

audiobookshelf 提供者可以为不同用户设置多次。
要实现与 MA 用户的单个媒体项目进度的正确同步，请参阅[用户管理](/music-assistant/settings/user-management/#filter-progress-multi-user)。

### 高级设置

- <b>验证 SSL。</b> 启用以验证 SSL/TLS 连接的证书。默认开启
- <b>隐藏空播客。</b> 同步时可以跳过尚未下载剧集的播客

## 已知问题 / 说明

- 多文件有声读物：UI 将显示 PCM 作为源文件格式（因为这是内部使用的），而不是有声读物的实际文件格式
- 目前针对 ABS >= 2.19.0 进行测试
- 首先出现任何问题时，请确保服务器正在运行 <a href="https://github.com/advplyr/audiobookshelf/releases" target="_blank" rel="noopener noreferrer">最新版本的 audiobookshelf 软件</a>

## 尚不支持

- 播放列表
- 编辑提供者功能
- 创建/删除新库（即不是已知库中的媒体项目）不会以事件驱动方式反映。相反，请使用正常同步