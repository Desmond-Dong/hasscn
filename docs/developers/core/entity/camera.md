---
title: Camera entity
sidebar_label: Camera
---

Camera entity 可以显示 images，还可以选项性地显示 video stream。从 [`homeassistant.components.camera.Camera`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/camera/__init__.py) 派生 platform entity。

## 属性

:::tip
Properties 应该只从内存返回信息，而不要执行 I/O（如网络请求）。请实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name                     | Type                                | Default | Description                                                                                         |
| ------------------------ | ------------------------------------| ------- | --------------------------------------------------------------------------------------------------- |
| brand                    | `str \| None`        | `None`  | Camera 的品牌（manufacturer）。                                                             |
| frame_interval           | `float`                             | 0.5     | Stream 中 frames 之间的间隔。                                                          |
| is_on                    | `bool`                              | `True`  | 指示 camera 是否开启。                                                             |
| is_recording             | `bool`                              | `False` | 指示 camera 是否正在 recording。用于确定 `state`。                           |
| is_streaming             | `bool`                              | `False` | 指示 camera 是否正在 streaming。用于确定 `state`。                           |
| model                    | `str \| None`        | `None`  | Camera 的 model。                                                                            |
| motion_detection_enabled | `bool`                              | `False` | 指示 camera 是否启用了 motion detection。                                      |
| use_stream_for_stills    | `bool`                              | `False` | 确定是否使用 `Stream` 集成来生成 still images                  |

### 状态

State 通过设置上述 properties 来定义。Resulting state 使用 `CameraState` enum 返回以下成员之一。

| Value       | Description                             |
|-------------|-----------------------------------------|
| `RECORDING` | Camera 当前正在 recording。      |
| `STREAMING` | Camera 当前正在 streaming。      |
| `IDLE`      | Camera 当前处于 idle。           |


## 支持的功能

Supported features 通过使用 `CameraEntityFeature` enum 中的值来定义，
并使用按位或（`|`）运算符组合。

| Value    | Description                                  |
| -------- | -------------------------------------------- |
| `ON_OFF` | Device 支持 `turn_on` 和 `turn_off` |
| `STREAM` | Device 支持 streaming                |

## 方法

### 摄像头图像

当传入 width 和 height 时，应在最佳基础上进行 scaling。如果 camera 无法进行 scaling，UI 将回退到在 display 层进行 scaling。

- 返回满足最小 width 和最小 height 的最小 image。

- 在对 image 进行 scaling 时，必须保留 aspect ratio。如果 aspect ratio 与请求的 height 或 width 不同，则返回 image 的 width 和/或 height 预期大于请求值。

- 如果底层 camera 能够对 image 进行 scaling，则传递 width 和 height。

- 如果集成无法对 image 进行 scaling 且返回 jpeg image，则在请求时它会自动由 camera 集成进行 scaling。

```python
class MyCamera(Camera):
    # 实现以下方法之一。

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

### 流源

Stream source 应返回一个 ffmpeg 可用的 URL（例如 RTSP URL）。需要 `CameraEntityFeature.STREAM`。

具有 stream source 的 camera entity 默认使用 `StreamType.HLS` 来告诉 frontend 使用带有 `stream` component 的 HLS feed。该 stream source 也会用于 `stream` 的 recording。

```python
class MyCamera(Camera):

    async def stream_source(self) -> str | None:
        """Return the source of the stream."""

```

Camera entity 渲染 still image 的一种常见方式是将 stream source 传递给 `ffmpeg` component 中的 `async_get_image`。

### WebRTC 流

WebRTC-enabled cameras 可以通过与 Home Assistant frontend 建立直接连接来使用。这种用法需要 `CameraEntityFeature.STREAM`，并且集成必须实现以下两个 methods 以支持原生 WebRTC：
- `async_handle_async_webrtc_offer`：初始化 WebRTC stream。所有异步传入的消息/错误应通过 `send_message` callback 转发到 frontend。
- `async_on_webrtc_candidate`：Frontend 会在发送 offer 后用所有传入的 candidate 调用它。
以下 method 可以选项性地实现：
- `close_webrtc_session`（可选）：Frontend 会在 stream 关闭时调用它。可用于清理资源。

WebRTC streams 不使用 `stream` component，也不支持 recording。
通过实现 WebRTC methods，frontend 假设 camera 仅支持 WebRTC，因此不会回退到 HLS。

```python
class MyCamera(Camera):

    async def async_handle_async_webrtc_offer(
        self, offer_sdp: str, session_id: str, send_message: WebRTCSendMessage
    ) -> None:
        """Handle the async WebRTC offer.

        Async 意味着处理 offer 可能需要一些时间，responses/message
        将通过 send_message callback 发送。
        该方法由具有 CameraEntityFeature.STREAM 的 cameras 使用
        覆盖此方法的集成还必须实现 async_on_webrtc_candidate。

        集成可以使用原生 WebRTC 实现进行覆盖。
        """

    async def async_on_webrtc_candidate(self, session_id: str, candidate: RTCIceCandidate) -> None:
        """Handle a WebRTC candidate."""

    @callback
    def close_webrtc_session(self, session_id: str) -> None:
        """Close a WebRTC session."""
```

### WebRTC 提供商

集成可以使用 `homeassistant.components.camera.webrtc` 中的库，从现有 camera 的 stream source 提供 WebRTC stream。集成可以实现 `CameraWebRTCProvider` 并通过 `async_register_webrtc_provider` 注册它。

### 开启

```python
class MyCamera(Camera):
    # 实现以下方法之一。

    def turn_on(self) -> None:
        """Turn on camera."""

    async def async_turn_on(self) -> None:
        """Turn on camera."""
```

### 关闭

```python
class MyCamera(Camera):
    # 实现以下方法之一。

    def turn_off(self) -> None:
        """Turn off camera."""

    async def async_turn_off(self) -> None:
        """Turn off camera."""
```

### 启用移动侦测

```python
class MyCamera(Camera):
    # 实现以下方法之一。

    def enable_motion_detection(self) -> None:
        """Enable motion detection in the camera."""

    async def async_enable_motion_detection(self) -> None:
        """Enable motion detection in the camera."""
```

### 禁用移动侦测

```python
class MyCamera(Camera):
    # 实现以下方法之一。

    def disable_motion_detection(self) -> None:
        """Disable motion detection in camera."""

    async def async_disable_motion_detection(self) -> None:
        """Disable motion detection in camera."""
```
