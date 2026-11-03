# Push

**Push** 集成允许您将通过 HTTP POST 发送到 Home Assistant 的图像作为摄像头接入。因此，外部应用、守护进程或脚本可以通过 Home Assistant “推流” 图像。

Push Camera 还可以选择**缓冲**一定数量的图像，在事件记录完成后生成检测到运动的动画。

新事件到来时会清空旧图像，不同事件之间通过一个可配置的**超时**进行区分。

## 与 motionEye 集成

例如，`push` 摄像头可以与 [motionEye](https://github.com/motioneye-project/motioneye/wiki) 搭配使用。motionEye 是 motion 守护进程的 Web 前端，通常配置&#x4E3A;***仅在检测到运动时***&#x4FDD;存或录制文件。它提供了一个钩子，可在图像保存时运行命令，您可以结合 cURL 将运动检测图像发送到 `push` 摄像头，如下所示：

在 motionEye 中，前往 **File Storage -> Run A Command** 并输入：

```bash
curl -X POST -F "image=@%f" http://my.hass.server.com:8123/api/webhook/my_custom_webhook_id
# inserting a backslash in the middle of "webhook" stops Motion to move the command to a webhook
```

您还可以在 **Still Images -> Capture Mode** 中选择 **Motion Triggered**，让 motionEye 仅保存由运动触发的图像。其他偏好设置可在 **Motion Detection** 下调整。

在这种设置下，您可以使用如下配置让 push 摄像头持续回放最近一次由运动触发的事件：

```yaml
camera:
  - platform: push
    name: MotionEye Outdoor
    buffer: 3
    timeout: 5
    webhook_id: my_custom_webhook_id
```

## 配置

要在您的安装中启用此摄像头，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# `configuration.yaml` 配置示例
camera:
  - platform: push
    name: My Push Camera
    webhook_id: my_custom_webhook_id
```

```yaml
name:
  description: 您希望为摄像头指定的名称。
  required: false
  type: string
  default: Push Camera
buffer:
  description: 每个事件要缓冲的图像数量。请谨慎设置，过大的缓冲区会占用大量系统内存。
  required: false
  type: string
  default: 1
timeout:
  description: 超过该时间后，事件会被视为已结束。
  required: false
  type: time
  default: 5 seconds
webhook_id:
  description: 用户提供的字符串，作为摄像头标识符和访问控制，应尽量使用较长的字符串（超过 8 个字符）。
  required: true
  type: string
field:
  description: 包含图像文件的 HTTP POST 字段。
  required: false
  type: string
  default: image
```
