---
title: MusicCast 播放器提供者
description: MusicCast 播放器提供者说明
---

# MusicCast <img src="/assets/icons/musiccast-icon.svg" alt="预览图片" style="width: 70px; float: right;"  loading="lazy" />

Music Assistant 支持 <a href="https://au.yamaha.com/en/products/contents/audio_visual/musiccast/index.html" target="_blank" rel="noopener noreferrer">MusicCast</a> 设备。由 <a href="https://github.com/fmunkes" target="_blank" rel="noopener noreferrer">Fabian Munkes</a> 贡献和维护

## 功能

- MusicCast 设备由 Music Assistant 自动检测
- MusicCast 设备在分组时将完美同步播放
- 支持交叉淡入淡出和元数据
- 可以指定播放器离开组时切换到的源
- 如果播放器正在播放非 MA 内容，MA 将显示元数据
- 可以选择 MusicCast 设备的源

## 设置

除了[单个播放器设置](/music-assistant/settings/individual-player/)之外，MusicCast 提供者在`通用设置`部分中还有针对支持多区域设备的一些独特设置

- <b>离开组时切换到此非网络源。</b> 播放器在离开组时必须切换输入。此选项定义选择哪个输入。建议选择一个未使用的源，以便在输入切换时不会发生意外的声音输出
- <b>离开组时关闭区域。</b> 切换定义播放器离开组时的电源行为
- <b>完全禁用区域处理。</b> 如果播放切换到另一个源，这将禁用自动源更改。建议首先尝试在禁用此切换的情况下使用提供者。但是，如果在播放期间遇到问题，请将其打开。此设置仅在多区域播放器上可用

## 已知问题 / 说明

- 支持的设备是 2015 年左右及之后的设备
- 如果设备有多个区域（即主区域 + 最多 3 个其他区域），则只能流式传输到其中一个区域。但是，如果流式传输到主区域，其他区域可以加入该播放器。这是 Yamaha 设备的限制。一次只能有一个网络连接，因此一次只能有一个网络输入处于活动状态。这意味着当设备离开组时，MA 必须选择不同的非网络源。这也意味着尝试使用`选择源`选项设置两个不同的网络源将导致意外行为
- 主区域无法成功加入非主区域。尝试这样做将导致意外行为
- 当对多个具有多个区域的设备进行分组，并且希望加入设备中的两个或更多区域时，必须首先添加加入设备的主区域，然后才能加入非主区域。如果只想对另一个设备的单个区域进行分组，则可以随时进行
- HA 集成和 MA 集成可以一起使用，但不建议这样做，因为会不必要地创建重复的播放器实体
- 如果接收器在跳过时切换输入源，请尝试在播放器设置中禁用区域处理
