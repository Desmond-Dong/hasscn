在 Home Assistant `2024.11` 中，我们为大多数摄像头添加了 WebRTC。为了支持它，我们需要重构并改进 camera entity。
今天我们要宣布，在即将到来的 Home Assistant `2024.12` 版本中，以下方法已被 deprecated，并将在 Home Assistant `2025.6` 版本中移除：

* `frontend_stream_type` 属性将被移除。从 `2024.11` 起，Home Assistant 将通过检查 camera entity 是否实现了原生 WebRTC 方法来识别前端 stream 类型（[#130932](https://github.com/home-assistant/core/pull/130932)）。卡片开发者可以使用新的 websocket 命令 `camera/capabilities` 来获取前端 stream 类型。

* `async_handle_web_rtc_offer` 方法将被移除。请使用 `async_handle_async_webrtc_offer` 和 async WebRTC signaling 方式（[#131285](https://github.com/home-assistant/core/pull/131285)）。

* `async_register_rtsp_to_web_rtc_provider` 方法已被 deprecated。请使用 `async_register_webrtc_provider`，它提供了更大的灵活性并支持 async WebRTC signaling 方式（[#131462](https://github.com/home-assistant/core/pull/131462)）。

更多关于替代方案的详情请参阅 [camera entity 文档](/developers/core/entity/camera.md)。
