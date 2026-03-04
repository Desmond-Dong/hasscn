---
title: "Internet Archive"
---


# Internet Archive 提供者 <img src="/assets/icons/internet-archive-logo.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 Internet Archive。此组件由 <a href="https://github.com/ozgav" target="_blank" rel="noopener noreferrer">Gavin</a> 贡献和维护。

此提供者让 Music Assistant 用户免费访问数百万音频录音，包括现场音乐会、历史内容、LibriVox 有声读物以及来自 Internet Archive 的稀有档案材料。

## 功能

|           |                     |
|:-----------------------|:---------------------:|
| 免费订阅 | 是 |
| 自托管本地媒体 | 否 |
| 支持的媒体类型 | 艺术家、专辑、曲目、有声读物、播客 |
| 支持[推荐](/music-assistant/ui/#view-home) | 否 |
| 支持歌词 | 否 |
| [电台模式](/music-assistant/ui/#track-menu) | 否 |
| 最高流媒体质量 | FLAC (16 bit, 44.1 kHz) |
| 登录方式 | 无 |

### 其他

- 搜索所有 Internet Archive 音频内容
- 艺术家浏览，包含专辑和热门曲目
- 完整专辑曲目列表，支持单独曲目播放
- 有声读物流式传输，支持章节导航
- LibriVox 有声读物库浏览

## 配置：
- 在配置中，您只需单击保存按钮。

## 已知问题 / 说明

- 海量的音频文件和次优的分类意味着通常需要狭窄的搜索词才能找到感兴趣的项目
- Internet Archive "项目"通常会被创建为专辑。例如，现场音乐会将作为专辑创建在艺术家下
- Internet Archive "项目"中的单个文件通常会被映射为曲目
- Internet Archive "创建者"将被映射为艺术家
- 使用元数据启发式方法对内容进行分类，以便项目被正确分类为音乐或有声读物
- 结果有上限。搜索每次查询最多返回 200 个项目（Internet Archive API 限制）
- 搜索针对音乐和有声读物进行了优化，但是，其他音频内容可能会出现在结果中
- "曲目"搜索实际上返回最多下载的录音/音乐会
- 提供者尝试过滤掉这些，但完整的音乐会可能会显示为单独的"曲目"
- 支持有声读物，但用户只能在章节之间跳转，不能在章节内跳转
- 此免费服务没有优化的 API 调用，浏览和搜索时可能会遇到延迟。使用长期缓存来加速后续查看
- 请记住，文件命名不一致，并不总是有清晰的标题，相同的标题可以用于不同的项目
- 音频质量差异很大