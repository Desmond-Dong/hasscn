---
title: 文件系统提供商
description: 文件系统播放器提供商的功能、配置、问题等更多信息
---

# 文件系统提供商 <img src="/assets/icons/localfiles-icon.png" alt="Preview image" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 完全支持读取磁盘或远程服务器上的本地音乐文件，并将其目录到库中，允许播放到 Music Assistant 支持的所有播放器提供商。

当 MA 中也有流媒体提供商可用时，链接只会在该流媒体提供商的"库"中找到相同项目时发生。然而，在各种视图中或通过全局搜索可以看到其他音轨和专辑，然后可以单独添加到 MA 库中。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体   | 是 |
| 支持的媒体类型 | 艺术家、专辑、音轨、播放列表、有声读物、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 是 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最大流媒体质量 | 无损 FLAC 192 kHz, 24 bit |
| 登录方式 | 密码或无 |

### 其他

- 可以搜索音轨
- 本地音乐自动包含在 MA 库中
- 文件默认不被收藏。如果取消选择"收藏"筛选器（心形），可以看到所有项目。然后可以根据需要收藏项目
- 如果同时连接了流媒体提供商，则媒体将自动链接并从这些流媒体提供商补充信息
- 播放时，当音轨跨提供商（或在同一提供商内）链接时，自动使用最高质量版本
- 可以添加多个文件系统提供商

## 配置

必须为音乐、有声读物和播宯添加单独的提供商。

**音频文件在运行 Music Assistant 服务器的磁盘/文件夹上**

如果文件存储在运行 Music Assistant 的设备上，例如 Home Assistant OS 中的 `/media` 文件夹，应选择文件系统（本地磁盘）提供商，然后提供文件路径。

> [!NOTE]
> 对于 Home Assistant OS，只能访问 `/media` 文件夹。Docker 用户可以挂载自己的文件夹路径。无法将文件夹从 Home Assistant 挂载到 `/media` 路径。

**音频文件在远程共享上，如 NAS 或其他（SMB/CIFS）服务器**

Music Assistant 支持 SMB（也称为 samba 或 CIFS）共享和 DFS。选择音乐提供商"文件系统（远程共享）"并配置服务器的（完全限定域名）主机名（或 IP 地址）、共享名称和可选的任何子文件夹。

### 设置

除了上述配置提供商的设置外，此提供商还有其他可用设置（注意某些选项将根据选择的内容类型变灰）：

- <b>媒体文件夹中的内容类型。</b> 此设置定义提供商的内容类型，对于正确识别音乐、有声读物和播客是必需的
- <b>音轨缺少 Albumartist ID3 标签时的操作。</b> 首先[正确标记文件](#tagging-files)。MA 需要定义专辑艺术家，以便将项目正确添加到数据库。此设置定义如何处理缺少此信息的音轨，而不是跳过它们。默认情况下，将使用 `Various Artists`，但其他可用选项是 `Track Artist` 和 `Folder name (if possible)`。
- <b>忽略专辑文件夹中包含专辑音轨的播放列表。</b> 某些用户每个专辑有一个播放列表。对于大型收藏，这会导致播放列表视图无法使用。为避免这种情况，此设置默认启用，将导致提供商根文件夹下超过一级的播放列表被忽略
- <b>将此提供商的库艺术家/专辑同步到 Music Assistant。</b> 是否从本地提供商同步所有艺术家/专辑。
- <b>将音轨/文件导入 Music Assistant 库。</b> 定义是否需要导入音轨/文件。不导入库时，仍可以使用浏览功能手动浏览音轨。请注意，将音轨添加到 Music Assistant 库时，音轨艺术家和专辑也将始终导入
- <b>将播放列表（m3u 文件）导入 Music Assistant 库。</b> 定义是否需要导入播放列表（m3u 文件）。不导入库时，仍可以使用浏览功能手动浏览。
- <b>将播客/有声读物导入 Music Assistant 库。</b> 定义是否需要导入播客/有声读物。不导入库时，仍可以使用浏览功能手动浏览项目。
- <b>艺术家/专辑/音轨/播放列表/播客/有声读物的自动同步间隔。</b> 可选择各种时间段或也可以禁用
- <b>SMB 版本。</b> 要使用的 SMB 协议版本。建议使用 SMB 3.0 或更高版本以获得更好的性能和安全性。使用自动让系统协商。选项有 `Auto`、`SMB 1.0`、`SMB 2.0`、`SMB 2.1`、`SMB 3.0 [default]` 和 `SMB 3.1.1`
- <b>缓存模式。</b> 缓存模式影响性能和一致性。'Loose' 为读取密集型工作负载提供更好的性能，推荐用于音乐库。选项有 `Strict`、`Loose (Recommended) [default]` 和 `None`

## 已知问题 / 注意事项

- 需要对共享的写入权限才能编辑或创建本地存储的播放列表。如果只授予读取权限，播放列表仍可保存到 MA 内置提供商
- 使用远程共享连接时，请注意不建议使用 SMB1（非常旧）。如果连接持续失败，请查看 NAS 设置看是否可以禁用 SMB1
- 使用以下命名约定命名本地艺术作品
    - 艺术家缩略图： folder.jpg 或 artist.jpg（或 png）
    - 专辑缩略图： folder.jpg 或 cover.jpg（或 png）
    - 同人画（用作横幅背景）： fanart.jpg（或 png）
    - Logo（用于艺术家视图）： logo.png
- 艺术家缩略图、同人画和 Logo 应位于艺术家名称的文件夹中。专辑缩略图应位于专辑名称的文件夹中或其下的光盘文件夹中。有关艺术作品文件类型的更多信息请参阅 https://kodi.wiki/view/Artwork_types
- 嵌入的专辑缩略图将从音频文件中提取。但是，通过提供单个本地艺术作品文件与在所有文件中嵌入相同的艺术作品相比，可以提高性能并节省磁盘空间

> [!TIP]
> **本地艺术作品是最佳选择**
>
> 在同一专辑的每个音轨上使用嵌入图像对磁盘空间和性能都不理想。在专辑文件夹中使用单个 folder.jpg 代替

- 需要下载的艺术作品将在后台非常缓慢地完成。可以通过从视图顶部横幅的 ⋮ 菜单中选择"更新元数据"来强制下载
- 本地音轨和专辑将链接到任何提供商（本地或流媒体）上的相同音轨或专辑。请注意，相同不仅仅是名称相同。会审查标签以确定是否确实是完全相同的音轨。没有标签信息时，MA 将尝试根据其拥有的其他信息（如艺术家名称、专辑和音轨长度）识别相同音轨。但是，糟糕的标签信息可能导致糟糕的匹配
- 默认启用的设置允许跳过根目录（通常是专辑文件夹）下超过一级的播放列表。这是首选的，因为这些播放列表（通常是文件夹中的所有专辑音轨）在 MA 中没有作用，而且会混乱播放列表视图。过多的播放列表可能会对 MA 体验的其他部分产生负面影响
- 以下划线开头的文件夹将被忽略
- 支持包含歌词的文本文件。这些文件必须与音轨文件名相同且在同一文件夹中，但使用 `.lrc` 文件扩展名。歌词将在播放开始时加载
- 为最大限度地减少问题，文件夹应遵循 /artist/album 结构，文件夹名称应与艺术家和专辑名称匹配，并删除任何非法字符（例如 AC/DC 应在 ACDC 文件夹中）
- 放入随机结构的文件将被导入，但无法从文件夹名称检索其他数据，可能会发生其他问题
- 未标记的有声读物文件必须每本书放在一个文件夹中
  
## 标记文件 

> [!NOTE]
> 由于内核限制，SMB/CIFS 网络共享上的文件夹或文件名不支持表情符号和其他特殊字符。这些字符的项目将在库同步期间跳过。

- 所有音频文件包含正确且最好是广泛的标签信息非常重要。标记越全面，使用 MA 时结果越好。请注意以下内容：
    - 通用标签支持： Music Assistant 解析行业标准格式的元数据，包括 MP3 的 ID3（v1/v2）、FLAC/Ogg/Opus 的 Vorbis Comments、M4A 的 MP4 Atoms 和 APEv2 标签
    - 主要事实来源： 嵌入标签被视为艺术家、专辑和音轨名称的确定来源。外部元数据提供商（如 MusicBrainz 或 Fanart.tv）仅用于补充缺失信息，如高分辨率艺术作品或艺术家简介
    - 跨平台链接： MA 使用 MusicBrainz ID（MBID）和 ISRC 代码等高级标签将本地文件与 Spotify 或 Tidal 等流媒体服务上的匹配音轨无缝链接
    - 艺术作品处理： 支持文件内的嵌入艺术作品和本地基于文件夹的图像（如 folder.jpg 或 artist.png）
    - 推荐标记工具： 为了在 Music Assistant 中获得最佳结果，强烈建议使用 <a href="https://picard.musicbrainz.org" target="_blank" rel="noopener noreferrer">MusicBrainz Picard</a> 确保文件包含库链接所需的特定 ID。其他程序如 <a href="https://www.mp3tag.de/en/" target="_blank" rel="noopener noreferrer">Mp3Tag</a> 通常也基于 Musicbrainz 目录，只要包含 [MA 使用的标签](#tags-used-by-ma) 表中显示的标签就可以工作

- 标签必须有多个项目，用分号分隔（这是唯一支持的标签分隔符）。在 Picard 中，这是选项 >> 标签 >> ID3 中的一个选项
- MA 需要设置 Album Artist 标签。如果未设置该标签，则扫描提供商时这些音轨的处理取决于本地提供商的 `音轨缺少 Albumartist ID3 标签时的操作` 设置
- Music Assistant 完全信任您提供的标签，只从元数据提供商抓取额外信息，让您完全掌控。
- Music Assistant 支持嵌入艺术作品和存储在 Artist \ Album 通用文件夹结构中的艺术作品，也支持带有增强元数据的 `.nfo` 文件
- 对于多光盘专辑，建议（但不要求）在专辑名称文件夹下添加名为"Disc 1"、"Disc 2"等的文件夹。专辑艺术作品可以添加到顶级专辑文件夹或光盘文件夹中
- 如果 disc 标签中没有添加任何内容，则显示屏中不会显示光盘编号

!<a href="/assets/screenshots/no-disc-tag.png" target="_blank"><img src="/assets/screenshots/no-disc-tag.png" alt="image" loading="lazy" style="max-width: 100%;" /></a>

- 为最大限度地减少 MA 的问题，应遵循 <a href="https://kodi.wiki/view/Music_tagging" target="_blank" rel="noopener noreferrer">Kodi 指南</a>。该页面上的几乎所有提示、技巧和建议都适用于 MA，如果完全遵循，用户体验会更好

### 多艺术家音轨

对于有多个艺术家的音轨，MA 支持几种方法：

1. ARTISTS 标签（推荐） - 一个专门的多值字段，分别列出每个艺术家。这是最可靠的方法。
2. 多个 ARTIST 字段 - 对于 FLAC/OGG/Opus 文件，Vorbis comment 规范允许有多个 ARTIST 字段（每个艺术家一个）。MA 会读取所有这些字段。
3. ARTIST 标签解析 - 如果以上都不存在，MA 将尝试使用常见的分隔符（featuring、feat.、ft.、& 等）分割 ARTIST 字符串。MusicBrainz Artist ID 有助于确定预期的艺术家数量。

通常，确保 MusicBrainz Artist ID 与 ARTIST（或 ARTISTS）标签一致 - 每个艺术家一个 ID。
  
### MA 使用的标签

<a href="/assets/tag-usage.png"><img src="/assets/tag-usage.png" alt="Preview image" style="width: 800px;"  loading="lazy" /></a>

左列对应于 <a href="https://picard-docs.musicbrainz.org/downloads/MusicBrainz_Picard_Tag_Map.html" target="_blank" rel="noopener noreferrer">MusicBrainz Picard Tag Mapping</a> 表中显示的标签名称。然后参考正在标记的文件格式的适当标签名称

### 手动调整标签

> [!WARNING]
> 以下内容应视为高级内容。手动更改标签可能会在出错时对 MA 库产生不良影响。此外，提供商之间的匹配可能不会发生或可能错误发生

通常最好不要更改 Picard 标签。但是，有些人不同意 Musicbrainz 的观点，即<a href="https://musicbrainz.org/doc/Style/Recording#Recordings_with_different_mastering" target="_blank" rel="noopener noreferrer">重制版与原始录音相同</a>。要区分这些，可以按如下方式编辑标签：

- 删除 MusicBrainz Release ID 和 Recording ID
- 保留 MusicBrainz Artist ID
- 删除 ISRC（因为它也用作音轨的强标识符）
- 删除 barcode（因为它也用作专辑的强标识符）
- 因为没有特定版本的标签，所以将版本放在标题的括号中。例如，Great Song (Vinyl Rip)

