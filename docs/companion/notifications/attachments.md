---
title: "标准附件"
id: notification-attachments
---

通知可以包含图像、视频或音频文件附件，与通知一起显示。请参阅[支持的媒体表格](#supported-media-types)了解各平台的支持情况。

## 下载

附件是在收到通知时下载到设备的图像、视频或音频文件，并与通知一起显示。当通知未展开时显示缩略图。当通知展开时显示完整大小的附件。

有几个位置可以保存文件，您可以使用 [`camera.snapshot`](https://www.home-assistant.io/integrations/camera#action-snapshot) 操作保存快照。

:::note
附件必须可从互联网访问，但不一定需要无需认证。请参阅下面的来源。
:::

### `media_source`（推荐）

[`media_source` 集成](https://www.home-assistant.io/integrations/media_source)的优势在于访问需要认证头（Home Assistant 会将其提供给伴侣应用）。这意味着内容不会公开可用。

您可以在此集成中使用相对 URL 格式 `/media/local/direct.jpg`。

:::info
磁盘上存储在 `/media/file.jpg` 的文件在通知中表示为 `/media/local/file.jpg`。注意路径中添加了 `local` 部分。
:::

### `www` 文件夹

您需要将图像存储在 Home Assistant [配置目录](https://www.home-assistant.io/docs/configuration/)中的 `www` 文件夹中。这将使图像暴露给互联网，以便您可以在通知中使用它并在任何地方接收它们。

您可以在此集成中使用 URL 格式 `/local/file.jpg`。

:::info
磁盘上存储在 `/www/file.jpg` 的文件在通知中表示为 `/local/file.jpg`。注意路径中的 `local` 部分发生了变化。
:::

## 自动快照

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 用户还可以使用 `/api/camera_proxy/camera.name`，其中 `camera.name` 替换为您希望使用的摄像头实体 ID。

<img src="/companion-assets/apple.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> iOS 用户可以使用[动态附件中的摄像头流](dynamic-content.md#camera-stream)。

:::tip
在 3D Touch 设备上展开通知，只需用力触摸任何通知。在非 3D Touch 设备上，滑动并点击"查看"按钮。
:::

## 图像实体

来自图像实体的图像可以使用 `/api/image_proxy/image.name`，其中 `image.name` 替换为您希望使用的图像实体实体 ID。

## 支持的媒体类型

请确保您的附件符合以下标准，否则将不会显示。

| 附件类型  | 最大文件大小 | 允许的格式 | 支持的平台  |
| :-------: | --------------- | ------------------|------------------------- |
|    图像    | 10 MB    | JPEG, GIF, PNG          | <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android & <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
|   视频   | 50 MB   | MPEG, MPEG2, MPEG4, AVI   | <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android & <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |
|   音频    | 5 MB  | AIFF, WAV, MP3, MPEG4 Audio          | <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> |

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> 版本 2021.5 或更高版本将在打开内容时尝试重新下载超过大小限制的较大文件。

## 参数

您可以使用以下键添加附件。请参阅上面的支持媒体类型。提供的所有 URL 必须可通过互联网访问。

| 键 | 示例值 |
| -- | -- |
| `video` | `/media/local/video.mp4`<br /><br />`https://example.com/video.mp4` |
| `image` | `/media/local/photo.jpg`<br /><br />`https://example.com/image.jpg` |
| `audio` | `/media/local/audio.mp3`<br /><br />`https://example.com/audio.mp3` |

当存在多个值时，将按上表的顺序使用。例如，您可以指定 `audio` 和 `image`，iOS 将选择音频，而 Android 将选择图像。

:::info <img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> &nbsp; 备注:
*   如果您设置了 [`icon_url`](basic.md#notification-icon) 和 `image` 属性，则设备上只会显示图像。
*   如果您设置了 `image` 和 `video` 属性，则设备上只会显示视频。
*   视频将显示为从视频文件捕获的一系列帧。对于时长 < 10 秒的视频效果不佳。
*   GIF 仅在 Android 14+ 的通知栏中才会动画显示。
:::

## 示例操作

```yaml
automation:
  - alias: 通知移动应用附件
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "家里发生了一些事情！"
          data:
            # 绝对 URL 示例
            image: "https://www.home-assistant.io/images/default-social.png"
            # 相对 URL 示例
            image: "/media/local/image.png"
            # 视频同样适用
            video: "/media/local/video.mp4"
            # 音频同样适用
            audio: "/media/local/audio.mp3"
```

## 视觉效果示例

带有图像附件的未展开推送通知：

![带有附件的未展开推送通知。](/companion-assets/ios/attachment.png)

同一通知展开后显示完整大小的图像附件：

![同一通知展开后显示完整大小的附件](/companion-assets/ios/expanded_attachment.png)

## 配置
<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />专属<br />

 [请参阅支持的媒体表格](#supported-media-types)

 您可以使用以下格式自定义通知上的附件：

 ```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: "家里发生了一些事情！"
    data:
      attachment:
        # 隐藏缩略图，仅在长按/3D触摸通知时显示
        hide-thumbnail: true
 ```

-   **url** (*可选*): 用作附件的内容 URL。此 URL *必须*可从互联网访问，或者接收设备必须与托管内容在同一网络上。这将覆盖任何 `image`、`video` 或 `audio` 值。
-   **content-type** (*可选*): 默认情况下，如果提供了 `url`，将检查 URL 的扩展名以确定文件类型，或者从 `image`、`video` 和 `audio` 键的使用中推断。如果没有扩展名/无法确定，您可以手动提供文件扩展名。
-   **hide-thumbnail** (*可选*): 如果设置为 `true`，缩略图将不会显示在通知上。内容只能通过展开查看。
-   **lazy** (*可选*): 需要 <img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" /> v2021.5 或更高版本。如果设置为 `true`，附件不会立即下载，只有在查看通知时才会加载。使用此选项可避免下载明显过大的附件，但如果它们只是偶尔过大，则不应提供此键，因为应用可以同时尝试两种方式。

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" /> Android 专属

 [请参阅支持的媒体表格](#supported-media-types)

- `GIF` 文件类型仅在 Android 14+ 的通知栏中才会动画显示