---
title: 相机实体
description: '相机实体可以显示图像，也可以显示视频流。平台实体派生自homeassistant.components.camera.Camera(https://github.com/home-assistant/core/blob/dev/homeassistant/components/camera/init.py)。'
sidebar_label: 相机
---
# 相机实体

相机实体可以显示图像，也可以显示视频流。平台实体派生自[`homeassistant.components.camera.Camera`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/camera/__init__.py)。

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称 | 类型 | 默认值 | 说明 |
| ------------------------ | ------------------------------------| ------- | --------------------------------------------------------------------------------------------------- |
| brand | <code>str &#124; None</code> | `None` | 相机的品牌（制造商）。 |
| frame_interval | `float` | 0.5 | 流的帧之间的间隔。 |
| is_on | `bool` | `True` | 指示相机是否打开。 |
| is_recording | `bool` | `False` | 指示摄像机是否正在录制。用于确定 `state`。 |
| is_streaming | `bool` | `False` | 指示相机是否正在流式传输。用于确定 `state`。 |
| model | <code>str &#124; None</code> | `None` | 相机的型号。 |
| motion_detection_enabled | `bool` | `False` | 指示摄像机是否启用运动检测。 |
| use_stream_for_stills | `bool` | `False` | 确定是否使用 `Stream` 集成来生成静止图像 |

### 状态

状态是通过设置上面的属性来定义的。结果状态使用 `CameraState` 枚举返回以下成员之一。

| 值 | 说明 |
|-------------|-----------------------------------------|
| `RECORDING` | 摄像机当前正在录制。 |
| `STREAMING` | 摄像机当前正在进行流式传输。 |
| `IDLE` | 相机当前处于空闲状态。 |


## 支持的功能

支持的功能通过使用 `CameraEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------- | -------------------------------------------- |
| `ON_OFF` | 该设备支持 `turn_on` 和 `turn_off` |
| `STREAM` | 该设备支持流式传输 |

## 方法

### 相机图像

当宽度和高度被传递时，应尽力进行缩放。如果相机无法进行缩放，UI 将回退到显示层缩放。

- 返回满足最小宽度和最小高度的最小图像。

- 缩放图像时，必须保留纵横比。如果长宽比与请求的高度或宽度不同，则预计返回图像的宽度和/或高度将大于请求的宽度和/或高度。

- 如果底层相机能够缩放图像，则传递宽度和高度。

- 如果集成无法缩放图像并返回 jpeg 图像，则相机集成将在请求时自动缩放图像。

```python
class MyCamera(Camera):
    # Implement one of these methods.

    def camera_image(
        self, width: int | None = None, height: int | None = None
    ) -> bytes | None:
        """Return bytes of camera image."""
        raise NotImplementedError()

    async def async_camera_image(
        self, width: int | None = None, height: int | None = None
    ) -> bytes | None:
        """Return bytes of camera image."""

```

### 码流来源

流源应返回 ffmpeg 可用的 url（例如 RTSP url）。需要 `CameraEntityFeature.STREAM`。

默认情况下，具有流源的相机实体使用 `StreamType.HLS` 告诉前端将 HLS feed 与 `stream` 组件一起使用。该码流源也将与 `stream` 一起使用进行录制。

```python
class MyCamera(Camera):

    async def stream_source(self) -> str | None:
        """Return the source of the stream."""

```

相机实体渲染相机静态图像的常见方法是将流源传递给 `ffmpeg` 组件中的 `async_get_image`。

### WebRTC 流

支持 WebRTC 的摄像头可以通过与 Home Assistant 前端建立直接连接来使用。此用法需要 `CameraEntityFeature.STREAM`，并且集成必须实现以下两种方法来支持原生 WebRTC：
- `async_handle_async_webrtc_offer`：初始化 WebRTC 流。异步传入的任何消息/错误都应使用 `send_message` 回调转发到前端。
- `async_on_webrtc_candidate`：发送报价后，前端将与任何进来的候选人一起调用它。
可以选择实现以下方法：
- `close_webrtc_session`（可选）：前端将在流关闭时调用它。可以用来清理东西。

WebRTC 流不使用 `stream` 组件，并且不支持录制。
通过实现 WebRTC 方法，前端假设相机仅支持 WebRTC，因此不会退回到 HLS。

```python
class MyCamera(Camera):

    async def async_handle_async_webrtc_offer(
        self, offer_sdp: str, session_id: str, send_message: WebRTCSendMessage
    ) -> None:
        """Handle the async WebRTC offer.

        Async means that it could take some time to process the offer and responses/message
        will be sent with the send_message callback.
        This method is used by cameras with CameraEntityFeature.STREAM
        An integration overriding this method must also implement async_on_webrtc_candidate.

        Integrations can override with a native WebRTC implementation.
        """

    async def async_on_webrtc_candidate(self, session_id: str, candidate: RTCIceCandidate) -> None:
        """Handle a WebRTC candidate."""

    @callback
    def close_webrtc_session(self, session_id: str) -> None:
        """Close a WebRTC session."""
```

### WebRTC 提供商

集成可以使用 `homeassistant.components.camera.webrtc` 中的库从现有摄像机的流源提供 WebRTC 流。一个
集成可以实现 `CameraWebRTCProvider` 并将其注册到 `async_register_webrtc_provider`。

### 打开

```python
class MyCamera(Camera):
    # Implement one of these methods.

    def turn_on(self) -> None:
        """Turn on camera."""

    async def async_turn_on(self) -> None:
        """Turn on camera."""
```

### 关

```python
class MyCamera(Camera):
    # Implement one of these methods.

    def turn_off(self) -> None:
        """Turn off camera."""

    async def async_turn_off(self) -> None:
        """Turn off camera."""
```

### 启用运动检测

```python
class MyCamera(Camera):
    # Implement one of these methods.

    def enable_motion_detection(self) -> None:
        """Enable motion detection in the camera."""

    async def async_enable_motion_detection(self) -> None:
        """Enable motion detection in the camera."""
```

### 禁用运动检测

```python
class MyCamera(Camera):
    # Implement one of these methods.

    def disable_motion_detection(self) -> None:
        """Disable motion detection in camera."""

    async def async_disable_motion_detection(self) -> None:
        """Disable motion detection in camera."""
```
