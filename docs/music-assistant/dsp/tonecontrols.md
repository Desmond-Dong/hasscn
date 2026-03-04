---
title: DSP Tone Controls
description: DSP 音调控制滤波器的使用和效果说明
---

# 音调控制

音调控制提供简单的频率调整，允许增强或减少发送到播放器的音乐的低音和高音区域。

## 使用方法

有三个控制可用：低音、中音和高音。它们对应于以 100Hz、900Hz 和 9000Hz 为中心的频率范围。通过调整三个滑块可以完成增强或削减这些中心周围的音频信号音量。

## 技术细节

音调控制使用峰值（又称钟形）滤波器类型将基本的三频率[参数均衡器](/music-assistant/dsp/parametriceq/)滤波器应用于音频信号。下图显示将所有三个控制设置为 +4.0dB 的结果效果

!<a href="/assets/screenshots/tone-controls.jpg" target="_blank"><img src="/assets/screenshots/tone-controls.jpg" alt="音调控制" loading="lazy" style="max-width: 100%;" /></a>