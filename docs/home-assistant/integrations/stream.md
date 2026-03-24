---
title: 流媒体
description: 有关如何在 Home Assistant 中集成直播的说明。
ha_category:
  - Other
ha_release: '0.90'
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@hunterjm'
  - '@uvjustin'
  - '@allenporter'
ha_domain: stream
ha_platforms:
  - diagnostics
ha_integration_type: system
---

**流媒体**集成为通过 Home Assistant 代理实时视频流提供了一种方式。大多数用户不需要配置任何内容，也不需要直接与此集成交互，因为它是供[摄像头集成](/home-assistant/integrations/camera)使用的内部集成。

## 配置

`stream` 集成会由 `default_config` 自动加载，并由支持它的摄像头平台启用。如果你使用了 `default_config`，则不需要在 `configuration.yaml` 中单独添加条目。如果**没有**使用 `default_config`，请将 `stream` 集成添加到 `configuration.yaml` 中以启用它。

配置示例：

```yaml
# 在不使用默认配置时启用 stream 集成
stream:
```

你还可以配置一些额外选项。如果设置了这些选项，则每次加载流媒体集成时都会使用它们。

```yaml
ll_hls:
  description: 允许禁用低延迟 HLS（LL-HLS）
  required: false
  type: boolean
  default: true
segment_duration:
  description: 每个 HLS 分段的持续时间，单位为秒（介于 2 到 10 之间）
  type: float
  required: false
  default: 6
part_duration:
  description: 每个分段内部片段的持续时间，单位为秒（介于 0.2 到 1.5 之间）
  type: float
  required: false
  default: 1
```

## LL-HLS - 低延迟 HLS

LL-HLS 可以减少流媒体的启动时间和延迟，但它对时序和网络有较严格的要求，并且会打开额外的浏览器连接。为了避免触及浏览器限制，强烈建议使用 HTTP/2 代理（如 NGINX 或 haproxy），以利用请求流水线。LL-HLS 默认启用，但如果未使用 HTTP/2，当打开的流过多时，Home Assistant 前端会回退到常规 HLS。

你还可以在 `configuration.yaml` 中进一步调整 LL-HLS 设置，因为根据你的网络环境、摄像头类型，以及它们是本地还是云端设备，不同参数可能会带来更好或更差的表现。

配置示例：

```yaml
# LL-HLS 的 configuration.yaml 配置示例。
stream:
  ll_hls: true
  part_duration: 0.75
  segment_duration: 6
```


## 技术细节

该集成目前支持将 H.264 和 H.265 源流代理为 HLS（以及 LL-HLS）协议。

请注意，虽然 H.265 可在 Android 和 iOS 上使用，但它在许多浏览器中无法工作。这是浏览器的限制，不是 Home Assistant 的问题。Safari 原生支持 H.265；在 Windows 上安装了 “HEVC Video Extensions” 后，Edge 也可以播放 H.265。Chrome 104 及以上版本在使用 `--enable-features=PlatformHEVCDecoderSupport` 选项启动时也可能可以工作。

要测试浏览器对 HEVC 的支持情况，请使用 [caniuse.com 的 “Unprefixed tests”](https://tests.caniuse.com/?feat=hevc) 或带有 HEVC HLS 流的 [hls.js 演示应用](https://hls-js.netlify.app/demo/?src=https%3A%2F%2Fbitmovin-a.akamaihd.net%2Fcontent%2Fdataset%2Fmulti-codec%2Fhevc%2Fstream_fmp4.m3u8)。如果你的浏览器支持 H.265，那里的视频应该可以播放。不要依赖 [https://www.caniuse.com](https://www.caniuse.com) 图表或 [https://html5test.com](https://html5test.com) 网站，因为它们并不准确。

`stream` 集成支持 AAC 和 MP3 音频。不支持 PCM 编解码器，例如 G.711、G.723、G.726 和 G.729。
