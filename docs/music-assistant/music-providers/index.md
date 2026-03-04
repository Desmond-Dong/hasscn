---
title: "Music Providers"
---

# 音乐提供者
!<a href="/assets/music-provider-logos.png" target="_blank"><img src="/assets/music-provider-logos.png" alt="Logo Banner" loading="lazy" style="max-width: 100%;" /></a>

有关特定音乐提供者的信息，请参阅相应部分。

一般说明：

- 您必须添加提供者才能访问您的音乐，即使媒体对 HA 可见。
- 如果您删除提供者，将会进行数据库清理，但需要一些时间才能完成。如果一段时间后仍然看到已删除提供者的条目，请尝试重启 MA 以重新触发清理过程。
- 音乐提供者是通过导航到 MA 设置，然后提供者，然后单击添加新提供者来添加的。（在下面的图像中，视图被过滤为只显示音乐提供者 - 这是可选的）

> [!TIP]
> **注意**
>
> 如果发生问题，可能需要再次启动自动链接过程。如果看到看起来相同的专辑或曲目，请导航到专辑或曲目，并在[提供者详情](/music-assistant/ui/#provider-details)部分顶部使用 <img src="/assets/icons/database-search.png" alt="问号" style="width: 20px;"  loading="lazy" /> 图标。这将触发链接过程，应该会导致相同的专辑和曲目合并在一起。

!<a href="/assets/screenshots/add-music-provider.png" target="_blank"><img src="/assets/screenshots/add-music-provider.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 设置

所有音乐提供者都有可以配置的设置。设置页面看起来类似于以下内容。右上角的图标是指向本文档中相关页面的超链接。设置或可配置字段的特定帮助通常可用，通过选择此图标 !<a href="/assets/icons/question-mark.png" target="_blank"><img src="/assets/icons/question-mark.png" alt="问号" loading="lazy" style="max-width: 100%;" /></a> 访问。所有提供者都可以被赋予自定义名称，并在必要时禁用。可以为所有提供者调整日志级别，这可以在高级设置中找到。（除非开发人员要求，否则不要选择 Verbose，因为它可能会产生不利的性能影响）。有关提供者特定设置，请参阅提供者页面。

!<a href="/assets/screenshots/generic-settings.png" target="_blank"><img src="/assets/screenshots/generic-settings.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

## 媒体库导入控制

所有音乐提供者都有控制媒体项目导入的选项，如下图所示。请注意，如果单个曲目在提供者的媒体库中（但其关联专辑不在），并且例如所有导入设置都设置为同步，那么单个曲目将被导入，专辑将在数据库中创建，但所有其他专辑曲目不会被添加。可以使用`导入专辑曲目`开关更改此行为。

有定义每种媒体项目类型何时发生同步的设置。

有一个设置控制是否将添加到 MA 媒体库的内容也添加到提供者媒体库。为清楚起见，将项目添加到 MA 媒体库只会反映在项目的源提供者中。例如，如果您安装了 Deezer 和 Spotify 提供者，并且搜索艺术家，您可能会看到该艺术家列出两次，每个提供者一次。如果您将艺术家添加到 MA 媒体库并启用了同步回功能，则艺术家只会添加到与所选项目关联的提供者中。需要列表视图才能看到提供者图标。

最后，根据安装的提供者，该部分底部可能还有其他与同步相关的选项。有关更多信息，请参阅各个提供者设置。

!<a href="/assets/screenshots/library-import-settings.png" target="_blank"><img src="/assets/screenshots/library-import-settings.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

- <b>将此提供者的媒体库艺术家/专辑/曲目/播放列表/有声读物/播客同步到 Music Assistant。</b> 是否从本地提供者同步所有艺术家/专辑/曲目/播放列表/有声读物/播客。
- <b>导入专辑曲目。</b> 默认情况下，将专辑添加到 Music Assistant 媒体库只导入专辑条目而不是关联的曲目。这种方法允许手动选择要包含的特定曲目。要覆盖此行为，可以启用此配置选项。用户应注意，某些流媒体提供者可能已经默认将所有曲目添加到收藏中来自动化此过程。
- <b>导入播放列表曲目。</b> 默认情况下，将播放列表导入 Music Assistant 只将播放列表本身添加到媒体库。这允许流式传输播放列表，并可以根据需要手动添加单个曲目。此配置选项通过导入所有关联曲目来覆盖特定播放列表的该行为。可以使用区分大小写的播放列表名称或播放列表 URI 进行输入。
- <b>艺术家/专辑/曲目/播放列表/播客/有声读物的自动同步间隔。</b> 可选择各种时间段或可以禁用
- <b>同步回媒体库添加/删除（双向同步）。</b> 此设置确定手动将项目添加到或从 Music Assistant 媒体库中删除时的行为。启用此选项可确保这些操作同步回原始提供者。如果没有同步，从媒体库中删除的项目如果在提供者端仍然存在，可能会在下次自动同步时重新出现。
- <b>从（提供者）同步播客进度。</b> 自动将剧集播放状态从提供者同步到 Music Assistant。在提供者中标记为已播放的剧集将在 MA 中标记为已播放。仅当您同时使用提供者应用和 Music Assistant 进行播客播放时才启用此功能。
- <b>从（提供者）同步有声读物进度。</b> 自动将有声读物进度从提供者同步到 Music Assistant。访问有声读物时，来自提供者应用的进度将同步到 MA。仅当您同时使用提供者应用和 Music Assistant 进行有声读物播放时才启用此功能。

## 摘要

下表提供了所有音乐提供者的一目了然的摘要。绿色勾号表示可用的理想质量或功能。

流媒体质量指示为 [Hi-Res](/music-assistant/player-support/#audio-quality)、<a href="https://www.soundguys.com/high-bitrate-audio-is-overkill-cd-quality-is-still-great-16518/" target="_blank" rel="noopener noreferrer">CD 质量</a> 或有损，以及可用的编解码器和比特率。

最用户友好的登录方式是密码，其次是 <a href="https://en.wikipedia.org/wiki/OAuth" target="_blank" rel="noopener noreferrer">OAuth</a>，然后是 cookie 方法最不理想。

<a href="/assets/music-provider-summary.png" target="_blank"><img src="/assets/music-provider-summary.png" alt="音乐提供者摘要" loading="lazy" /></a>