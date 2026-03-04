---
title: "语音控制"
---

# 语音控制 <img src="/assets/icons/voice-icon.png" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Home Assistant 对音乐/媒体控制的（意图）支持非常有限，并且不支持通过语音启动音乐播放。虽然这已在计划中添加，但仍有很多关于如何创建一种通用方式来原生提供该支持（与所有媒体播放器集成一起工作）的问题需要研究。

目前，Home Assistant 或 Music Assistant 集成中没有内置支持通过语音启动音乐播放。但不要放弃希望，因为在此期间已创建了一个（社区驱动的）存储库，其中包含添加该支持所需的所有构建块。该存储库可在 https://github.com/music-assistant/voice-support 找到

> [!NOTE]
> 通过 Assist 添加项目时的队列行为将遵循 MA SETTINGS>>CORE>>PLAYER QUEUES CONTROLLER 中的设置。

## 播放媒体操作

Music Assistant 集成允许使用完全本地化的自定义意图来启动播放。已开发蓝图以便轻松入门。如果是蓝图新手，请查看 HA 文档<a href="https://www.home-assistant.io/docs/automation/using_blueprints/" target="_blank" rel="noopener noreferrer">使用自动化蓝图</a>

说明在<a href="https://github.com/music-assistant/voice-support" target="_blank" rel="noopener noreferrer">MA 语音支持存储库</a>中。有完全本地或基于 LLM 的请求识别选项。

## 其他媒体播放器操作

核心 HA 语音意图支持特定播放器或区域的下一首曲目、上一首曲目、暂停、取消暂停和音量。HA 目前不打算添加更多媒体播放器操作，因此您需要使用自定义句子来满足您的任何其他要求。请参阅此<a href="https://github.com/orgs/music-assistant/discussions/2176" target="_blank" rel="noopener noreferrer">讨论了解如何操作</a>。
