# UniFi Protect

**UniFi Protect** 集成可支持从运行在 UniFi OS Console 上、由 [Ubiquiti Networks, inc.](https://www.ui.com/) 提供的 [UniFi Protect 应用](https://ui.com/camera-security)中获取摄像头视频流和传感器数据。

## 前置要求

### 硬件支持

此集成支持所有可运行 UniFi Protect 的 UniFi OS Console。

### 软件支持

UniFi Protect 所要求的**最低**软件版本为 `v6.0.0`。如果你的版本更旧，在尝试设置此集成时会报错。

### 不支持 EA 版本

:::important
**Home Assistant 不支持 Early Access 和 Release Candidate 版本。**

使用 UniFi Protect 或 UniFi OS 的 Early Access / Release Candidate 版本，很可能会导致你的 UniFi Protect 集成意外失效。如果你选择加入 Early Access 或 Release Candidate 发布通道，而 Home Assistant 中因此出现问题，那么通常需要等到该版本进入正式 Stable 发布通道后，才可期望其正常工作。

你可以提交 Early Access（EA）相关问题报告，实际上这也有助于尽早预警潜在兼容性问题。不过请务必理解：
这并不意味着所有来自 EA 通道的报告都会被立即修复。请在提交新问题前，先仔细检查是否已有与你问题相关的未关闭或已关闭 issue / pull request。
同时，请确保你的报告可以复现，并包含所有必要上下文：始终提供 Protect 版本；如果问题与特定摄像头有关，也请注明其型号。条件允许时，也请附上相关错误日志片段。

:::

### 本地用户

你需要在 UniFi OS Console 中创建一个本地用户用于登录。Ubiquiti SSO 云用户**无法**使用。
建议使用 Administrator 或具备完整读写权限的用户，以便充分发挥该集成的功能，
但这并非硬性要求。创建出的实体会根据你所使用用户的权限自动进行调整。

1. 登录 UniFi OS 设备上的 *Local Portal*，然后点击 *Users*。\
   **注意**：这一步**必须**直接通过 IP 地址访问 UniFi OS 完成（例如 *192.168.1.1*），不能通过 `unifi.ui.com` 或 UniFi Protect 应用进行。
2. 在左侧菜单进入 **Admins & Users**，选择 **Admins** 标签页，或直接访问 \[IP address]/admins/（例如 *192.168.1.1/admins/*）。
3. 点击右上角的 **+**，然后选择 **Add Admin**。
4. 选择 **Restrict to local access only**，并输入新的 *username* 和 *password*。
5. 为 *Protect* 角色选择 **Full Management**。
6. 点击右下角的 **Add**。

![UniFi OS User Creation](/home-assistant/images/integrations/unifiprotect/user.png)

除了用户名和密码外，你现在还需要为 Home Assistant 创建一个 API 密钥。

1. 使用管理员账号登录 UniFi OS 设备上的 *Local Portal*。
2. 进入 **Settings** > **Control Plane** > **Integrations**。
3. 为 API 密钥输入一个新名称，例如 `Home Assistant`。
4. 选择 **Create API Key** 并复制生成的密钥。
5. 在 Home Assistant 中设置 UniFi Protect 集成时，使用该 API 密钥以及你的用户名和密码。

:::tip
目前，创建 API 密钥要求你以管理员身份登录。

:::

### 摄像头流

此集成使用 RTSP(S) 流作为实时画面来源，因此需要在每台摄像头上启用该功能，才能确保你可在 Home Assistant 中观看视频流。该功能可能默认已开启，但仍建议手动确认。检查和启用方法如下：

1. 打开 UniFi Protect 并点击 *Devices*。
2. 选择你要确认可在 UniFi Protect 中推流的摄像头。
3. 点击右上角的 *Settings* 标签页。
4. 展开靠下方的 *Share* *Livestream* 部分。
5. 在可用流中至少启用一个。默认启用的是分辨率最高的流。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 设备支持

所有已知的 UniFi Protect 设备都应受支持。每台 UniFi Protect 设备都会在不同实体平台下添加多种实体。

:::note
**权限**：下面关于可用于 Home Assistant 实例的功能说明，默认假设你对每台设备都拥有完整写权限。如果你使用的用户对某些设备权限受限，那么你会看到更少的实体，并且在很多情况下，获得的是只读传感器，而不是可编辑的 switch/select/number 实体。

:::

### UniFi Protect 摄像头

:::note
**智能检测**：以下摄像头支持智能检测：

* 所有 “AI” 系列摄像头，包括 [AI 360](https://store.ui.com/collections/unifi-protect/products/unifi-protect-ai-360) 和 [AI Bullet](https://store.ui.com/collections/unifi-protect/products/uvc-ai-bullet)。
* 所有 “G4” 系列摄像头，包括 [G4 Doorbell](https://store.ui.com/collections/unifi-protect/products/uvc-g4-doorbell)、[G4 Bullet](https://store.ui.com/collections/unifi-protect/products/uvc-g4-bullet)、[G4 Pro](https://store.ui.com/collections/unifi-protect/products/uvc-g4-pro) 和 [G4 Instant](https://store.ui.com/collections/unifi-protect/products/camera-g4-instant)。

G3 系列摄像头\_不支持\_智能检测。

:::
每台 UniFi Protect 摄像头在 Home Assistant 中都会对应一个设备，并具有以下内容：

* **Camera** - 每个摄像头的每个通道及 RTSP(S) 组合都会创建一个摄像头实体（最多 7 个）。默认仅启用分辨率最高的 RTSPS 摄像头实体。
  * 如果你的摄像头是 G4 Doorbell Pro，还会额外为包裹摄像头添加一个摄像头实体。无论该通道是否启用了 RTSPS，包裹摄像头实体都\_不支持\_流媒体播放。这是因为包裹摄像头的 FPS 很低，无法兼容 HLS 流媒体。
* **Media Player** - 如果摄像头带有扬声器，你将获得一个媒体播放器实体，可将音频播放到摄像头扬声器。任何可被 FFmpeg 播放的音频文件 URI 都可播放到扬声器上，包括通过 [TTS Say 操作](/home-assistant/integrations/tts/index.md#action-say)。
* **Privacy Mode** - 如果摄像头支持隐私遮罩，则会提供一个配置开关来切换“隐私模式”，该模式会禁用录像、麦克风，并在整个画面上覆盖黑色隐私区域。
* **Sensors** - 传感器包括 `Is Dark`、`Motion Detected`、检测对象传感器（如果摄像头支持智能检测）以及 `Doorbell Chime`（如果摄像头带有铃声器）。还会添加多个诊断传感器，包括运行时间、网络连接统计和存储统计。门铃设备还会提供 `Voltage` 传感器，用于排查电气问题。
  * 摄像头支持的每一种智能检测都会对应一个检测对象传感器，另有一个组合传感器用于表示是否检测到\_任意\_对象。
* **Device Configuration** - 摄像头会根据其支持的功能提供多种配置控件。目前包括：
  * 用于 `Chime Type`、`Zoom Level`、`Microphone Sensitivity` 和 `WDR Level` 的滑块
  * 用于 `Overlay Information`、`Smart Detections` 类型、`Status Light`、`HDR`、`High FPS` 模式、`System Sounds` 的开关
  * 门铃 `LCD Screen` 的文本和选择配置，可用于设置自定义消息或使用预设消息
* **Button** - 每台摄像头设备都会添加一个默认禁用的按钮实体，可用于重启摄像头设备。

#### PTZ 摄像头

如果你的摄像头支持 <abbr title="pan, tilt, and zoom">PTZ</abbr>，还可使用以下附加实体和功能：

* **PTZ patrol** - 一个 select 实体，可让你启动或停止在 UniFi Protect 中配置的巡航。其状态会反映当前激活的巡航。选择 **Stopped** 可停止当前巡航。
* **PTZ presets** - 使用 [PTZ 转到预设位操作](#action-ptz-go-to-preset)（`unifiprotect.ptz_goto_preset`）可将 PTZ 摄像头移动到已保存的预设位置，包括 home 位置。预设位必须先在 UniFi Protect 应用中配置。

### UniFi Protect 泛光灯

每个 UniFi Protect 泛光灯在 Home Assistant 中都会对应一个设备，并具有以下内容：

* **Light** - 每个泛光灯设备都会添加一个灯光实体，可用于开关灯光并调节亮度。
* **Sensors** - 会提供来自泛光灯设备数据的传感器，包括 `Is Dark` 和 `Motion Detected`。
* **Device Configuration** - 泛光灯会提供 PIR 运动灵敏度、检测到运动后的自动关闭时长，以及 `Status Light` 开关等配置控件。
* **Button** - 每个泛光灯设备都会添加一个默认禁用的按钮实体，可用于重启泛光灯设备。

### UniFi Protect 智能传感器

UniFi Protect 智能传感器与普通传感器略有不同。它们属于多合一传感器，可作为接触传感器（门/窗）、运动探测器、光照传感器、湿度传感器、温度传感器、警报声音传感器和/或漏水探测器。每项传感功能都可动态启用或禁用。被禁用的传感器会标记为 `unavailable`。

* **Sensors** - 智能传感器设备的每项主要功能都会提供相应传感器：
  * **Contact** - 如果安装类型设置为 `Door`、`Window` 或 `Garage`，则会提供接触传感器。
  * **Motion Detection** - 如果安装类型不是 `Leak` 且已启用运动检测，则会提供运动检测传感器。
  * **Light Level** - 如果安装类型不是 `Leak` 且已启用光照传感器，则会提供光照传感器。
  * **Humidity** - 如果安装类型不是 `Leak` 且已启用湿度传感器，则会提供湿度传感器。
  * **Temperature** - 如果安装类型不是 `Leak` 且已启用温度传感器，则会提供温度传感器。
  * **Alarm Sound** - 如果安装类型不是 `Leak` 且已启用警报声音传感器，则会提供警报传感器。`Alarm Sound` 传感器的值可以是 `none`、`smoke` 和 `co`。随着 UniFi Protect 支持识别更多警报，后续可能会自动增加更多取值。
  * **Tamper** - 用于检测防拆的二进制传感器。
* **Device Configuration** - 智能传感器会提供 `Status Light`、启用/禁用所有主要传感器、选择 `Paired Camera` 以及更改安装类型等配置控件。
* **Button** - 提供一个用于清除防拆状态的按钮实体，以及一个默认禁用的设备重启按钮。

#### 防拆传感器

防拆传感器一旦触发，会持续保持激活状态，直到手动清除。可使用一个按钮实体来清除防拆状态。

### UniFi Protect 查看器

每个 UniFi Protect 查看器在 Home Assistant 中都会对应一个设备，并具有以下内容：

* **Liveview Select** - 每个查看器设备都会添加一个 select 控件，用于选择查看器上显示的 liveview。
* **Button** - 每个查看器设备都会添加一个默认禁用的按钮实体，可用于重启查看器设备。

### UniFi Protect DoorLock

每个 UniFi Protect 门锁在 Home Assistant 中都会对应一个设备，并具有以下内容：

* **Lock** - 会添加一个锁控件，用于锁定和解锁门锁设备。
* **Device Configuration** - 门锁会提供 `Auto-Lock Timeout`、选择 `Paired Camera` 以及 `Status Light` 开关等配置控件。
* **Button** - 每个门锁设备都会添加一个默认禁用的按钮实体，可用于重启门锁设备。

### UniFi Protect Smart Chime

每个 UniFi Protect 智能门铃铃声器在 Home Assistant 中都会对应一个设备，并具有以下内容：

* **Button** - 每个智能铃声器设备都会提供一个按钮用于手动触发铃声，另外还会添加一个默认禁用的按钮用于重启设备。
* **Device Configuration** - 智能铃声器会提供一个音量滑块用于调节铃声音量，以及一个记录上次响铃时间的传感器。

### NVR

你的主 UniFi Protect NVR 设备还会提供多个诊断传感器，可用于跟踪 UniFi Protect 系统状态：

* **Disk Health**：NVR 中安装的每块磁盘都会有一个磁盘健康传感器。这些是简单的好/坏状态传感器，其顺序不保证与 UniFi OS 中显示的顺序一致。不过状态属性中会提供磁盘型号，以帮助你对应到具体磁盘。
* **Utilization and Storage Sensors**：还会添加多个传感器，用于显示运行时间、硬件利用率以及磁盘上视频分布等细节。

## 媒体源

系统会为你的 UniFi Protect 摄像头提供媒体源，以便获取视频片段和事件缩略图。

### 媒体浏览器

该媒体源分为 5 个文件夹/层级：

1. NVR Console Selector - 仅当你拥有多个 Protect NVR Console 时才会出现。可用于选择要查看事件的 NVR Console。
2. Camera Selector - 可选择查看所有摄像头的事件，或仅查看某个特定摄像头的事件。
3. Event Selector - 可选择查看所有事件，或仅查看某一特定事件类型。
4. Time Selector - 按指定时间范围筛选事件：
   * 最近 24 小时
   * 最近 7 天
   * 最近 30 天
   * 按录制开始后的月份查看 - 选择某个月后，可查看整个月或某个具体日期
5. Event Selector - 选择要播放的具体事件

由于媒体浏览器不支持分页或过滤，所有事件都必须加载到内存中。因此，默认一次最多加载 10,000 条事件。如果事件数量被截断，界面中会显示为 `10000 (TRUNCATED)`。你可以在配置条目选项中调高或调低可加载事件数的上限。

### 媒体标识符

以下是可用于解析媒体的标识符。由于事件不一定映射到某个 Home Assistant 实体，因此这里所有 ID 都指 UniFi Protect 的 ID，而不是 Home Assistant 的 ID。

| Identifier Format                | Description            |
| -------------------------------- | ---------------------- |
| `{nvr_id}:event:{event_id}`      | 指定事件的 MP4 视频片段 |
| `{nvr_id}:eventthumb:{event_id}` | 指定事件的 JPEG 缩略图  |

## 操作

### 操作：添加门铃文本

`unifiprotect.add_doorbell_text` 操作用于为门铃添加新的自定义消息。

| Data attribute | Optional | Description                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances. |
| `message`              | No       | New custom message to add for Doorbells. Must be less than 30 characters.                                   |

### 操作：移除门铃文本

`unifiprotect.remove_doorbell_text` 操作用于移除门铃现有的自定义消息。

| Data attribute | Optional | Description                                                                                                 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Any device from the UniFi Protect instance you want to change. In case you have multiple Protect instances. |
| `message`              | No       | Existing custom message to remove for Doorbells.                                                            |

### 操作：设置铃声器配对门铃

`unifiprotect.set_chime_paired_doorbells` 操作用于设置与智能铃声器配对的门铃。

| Data attribute | Optional | Description                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | The device ID of the Chime you want to pair or unpair doorbells to.                                     |
| `doorbells`            | Yes      | A target selector for any number of doorbells you want to pair to the chime. No value means unpair all. |

### 操作：移除隐私区域

`unifiprotect.remove_privacy_zone` 操作用于从摄像头中移除一个隐私区域。

| Data attribute | Optional | Description                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `device_id`            | No       | Camera you want to remove privacy zone from.                                                            |
| `name`                 | No       | The name of the zone to remove.                                                                         |

### 操作：PTZ 转到预设位

`unifiprotect.ptz_goto_preset` 操作用于将 <abbr title="pan, tilt, and zoom">PTZ</abbr> 摄像头移动到已保存的预设位置。

| Data attribute | Optional | Description                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `device_id`    | No       | The device ID of the PTZ camera you want to move.                                              |
| `preset`       | No       | The name of the preset position to move to. Use `Home` for the home position.                  |

#### 用法示例

```yaml
action: unifiprotect.ptz_goto_preset
data:
  device_id: your_device_id_here
  preset: "Home"
```

### 操作：获取用户钥匙串信息

`unifiprotect.get_user_keyring_info` 操作用于获取某个 UniFi Protect 实例的钥匙串信息。

| Data attribute | Optional | Description                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `device_id`    | No       | Any device from the UniFi Protect instance you want to retrieve keyring information for.                    |

#### 用法示例

```yaml
action: unifiprotect.get_user_keyring_info
data:
  device_id: your_device_id_here
```

响应中会包含一个用户列表，其中包括用户全名、状态以及关联的密钥（指纹或 NFC）。

#### 响应示例

```yaml
users:
  - full_name: User One
    user_status: ACTIVE
    ulp_id: d23e27e0-a32a-41e5-9424-be646330c2d5
    keys: []
  - full_name: User Two
    user_status: ACTIVE
    ulp_id: a243ffdb-3ab2-4186-b2fe-0b53ccb29f24
    keys:
      - key_type: nfc
        nfc_id: ABCDEF12
      - key_type: fingerprint
        fingerprint_id: "1"
```

## 视图

该集成提供了四个代理视图，用于通过 Home Assistant 实例代理媒体内容。这样你就可以在 Home Assistant 环境中访问缩略图和视频片段，而无需暴露 UniFi Protect NVR Console。与媒体标识符一样，这里的所有 ID 都是 UniFi Protect ID，因为根据你的集成配置方式，它们未必能映射到具体的 Home Assistant 实体。

这些 URL 很适合用于发送通知。如果在自动化或 [notify 操作](/home-assistant/integrations/notify/index.md) 中使用，Home Assistant 会自动为这些 URL 签名，使其可安全用于外部访问。

四个代理 API 端点 URL：

`/api/unifiprotect/thumbnail/{nvr_id}/{event_id}`

* 代理来自 UniFi Protect 的 JPEG 事件缩略图。

`/api/unifiprotect/video/{nvr_id}/{event_id}`

* 代理来自 UniFi Protect 的指定事件 MP4 视频片段。要获取视频，该事件必须已经结束；如果事件仍在进行中，请使用下方定义的摄像头端点。

`/api/unifiprotect/snapshot/{nvr_id}/{camera_id}/{timestamp}`

* 代理来自 UniFi Protect 的指定摄像头在给定时间戳下的 JPEG 图像。`timestamp` 必须为 [ISO 8601 格式](https://www.iso.org/iso-8601-date-and-time-format.html)。

`/api/unifiprotect/video/{nvr_id}/{camera_id}/{start}/{end}`

* 代理来自 UniFi Protect 的指定摄像头 MP4 视频片段。`start` 和 `end` 必须为 [ISO 8601 格式](https://www.iso.org/iso-8601-date-and-time-format.html)。

`nvr_id` 可以是你的 NVR 的 UniFi Protect ID，也可以是 UniFi Protect 集成的配置条目 ID。`camera_id` 可以是摄像头的 UniFi Protect ID，也可以是由 UniFi Protect 集成提供、且可反向解析为某台 UniFi Protect 摄像头的任意实体 ID（例如某个检测对象传感器的实体 ID）。

查找 `nvr_id`、`camera_id`、`start` 和 `end` 的最简单方法，是在媒体浏览器中查看 UniFi Protect 的某个视频。如果你在浏览器新标签页中打开视频，就能在 URL 中看到这些值。`start` 时间通常接近传感器开始检测到运动时该事件的 `last_changed` 时间戳；`end` 时间则接近传感器停止检测到运动时该事件的 `last_changed` 时间戳。类似地，如需查看图片的 `event_id`，可前往 [**设置** > **开发者工具** > **状态**](https://my.home-assistant.io/redirect/developer_states/)，找到传感器开始检测运动时对应的事件。

### 带缩略图的通知自动化示例

此示例会在检测到运动时发送一条带摄像头缩略图的通知。短暂延迟可确保在通知发送前缩略图已可用。

```yaml
alias: "Motion detection with image"
description: "当检测到运动时发送带有相机快照的通知。"
triggers:
  - entity_id: binary_sensor.g4_instant_motion # Replace with your camera entity
    trigger: state
    from: off
    to: on
actions:
  - delay:
      seconds: 2
  - data:
      message: "Motion detected"
      data:
        image: >-
          /api/unifiprotect/thumbnail/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.to_state.attributes.event_id }}
    action: notify.mobile_app_your_device # Replace with your notification target
```

### 带视频的通知自动化示例

```yaml
alias: "Security: Camera Motion Notification"
description: "Sends a notification with video upon motion detection."
triggers:
  - entity_id:
      - binary_sensor.g5_bullet_motion # Replace with your camera entity
    trigger: state
    from: "on"
    to: "off"
actions:
  - data:
      message: "Motion detected at Camera XXX"
      data:
        image: >-
          /api/unifiprotect/thumbnail/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.from_state.attributes.event_id }}
        video: >-
          /api/unifiprotect/video/{{ config_entry_id(trigger.entity_id) }}/{{ trigger.from_state.attributes.event_id }}
    action: notify.mobile_app_your_device # Replace with your notification target
mode: single
max_exceeded: silent
```

在发送通知前，等待运动传感器从 `on` 变为 `off` 非常重要。这样可确保事件已经结束且视频可访问；否则你拿到的可能不是视频链接，而是错误。

:::note
iOS Companion App 不支持通过本地 URL 附加视频。图片可使用相对路径，但视频附件需要使用外部可访问的 URL，或采用其他传递方式。

:::

## 事件实体支持

UniFi Protect 集成支持由已连接设备触发的多种事件类型。以下是各受支持事件类型的说明：

### 门铃响铃事件

* **事件名称**：Doorbell
* **事件属性**：
  * **event\_type**：`doorbell`
  * **event\_id**：用于标识门铃事件的唯一 ID。
* **说明**：当有人按下门铃时会触发此事件。它会提供一个 `event_id`，可用于获取相关媒体，例如事件缩略图。比如，当发生响铃时，你可以使用 `event.g4_doorbell_pro_doorbell` 获取该事件的缩略图。

#### G4 门铃响铃触发自动化示例

```yaml
alias: G4 Doorbell Ring Triggered Automation
description: Automation that triggers when the G4 Doorbell Pro rings
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_doorbell # Replace with your doorbell entity
    trigger: event
conditions:
  - condition: template
    value_template: |
      {{ 'ring' in trigger.event.data.new_state.attributes.event_types }}
actions:
  - data:
      message: Someone is at the door!
      title: Doorbell Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

此条件是必需的，以防通知被 `unknown` 类型的事件触发，例如在重启期间。

### NFC 卡扫描事件

* **事件名称**：NFC
* **事件属性**：
  * **event\_type**：`scanned`
  * **event\_id**：用于标识 NFC 卡扫描事件的唯一 ID。
  * **nfc\_id**：被扫描 NFC 卡的 ID。
* **说明**：当在兼容设备（例如智能门铃）上扫描 NFC 卡时，会触发此事件。事件中会包含被扫描卡片的 `nfc_id` 等信息。

#### G4 门铃 NFC 扫描自动化示例

```yaml
alias: G4 Doorbell NFC Scanned Automation
description: >-
  Automation that triggers when a specific NFC card is scanned on the G4
  Doorbell Pro
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_nfc  # Replace with your doorbell entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {{ 
         not trigger.event.data.old_state.attributes.get('restored', false) and
         not trigger.event.data.old_state.state == 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'scanned' and
         trigger.event.data.new_state.attributes.nfc_id in ['ABCDEF1234', 'OTHER_ALLOWED_ID']
       }}
actions:
  - data:
      message: >-
        The NFC card with ID {{ trigger.event.data.new_state.attributes.nfc_id }} has been scanned at the doorbell.
      title: NFC Scan Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

你可以使用 [操作 `unifiprotect.get_user_keyring_info`](#action-unifiprotectget_user_keyring_info) 获取 `nfc_id`。

:::warning
处理 NFC 扫描时，请务必校验扫描到的 ID。未知 NFC 卡同样会触发扫描事件。此外，此事件是在开发者当时无法获取官方 UniFi 卡的前提下，基于第三方卡开发的。对于第三方卡，扫描依赖于卡片序列号。虽然这种方式并不少见，但需要注意的是，卡片序列号通常并不被视为安全标识，并且较容易被复制。当设备在 Home Assistant 中变为 unavailable 后又恢复可用时，可能会发生重复事件处理。这一状态变化不是集成本身的问题，但在将设备用于开门等操作时尤其需要加以考虑。

:::

### 指纹识别事件

* **事件名称**：Fingerprint
* **事件属性**：
  * **event\_type**：`identified` 或 `not_identified`
  * **event\_id**：用于标识指纹事件的唯一 ID。
  * **ulp\_id**：用于识别人员的 ID。如果未找到匹配的指纹，`ulp_id` 将为空，且 `event_type` 会是 `not_identified`。
* **说明**：当兼容设备扫描到指纹时，会触发此事件。如果指纹被识别，事件会提供一个 `ulp_id`，表示内部用户 ID。如果指纹未被识别，`event_type` 会设为 `not_identified`，且不会提供 `ulp_id`。

你可以使用 [操作 `unifiprotect.get_user_keyring_info`](#action-unifiprotectget_user_keyring_info) 获取 `ulp_id`。

#### G4 门铃指纹识别自动化示例

```yaml
alias: G4 Doorbell Fingerprint Identified Automation
description: Automation that triggers when a fingerprint is successfully identified on the G4 Doorbell Pro
trigger:
  - platform: event
    event_type: state_changed
    event_data:
      entity_id: event.g4_doorbell_pro_poe_fingerprint # Replace with your doorbell entity
condition:
  - condition: template
    value_template: >
      {{ 
         not trigger.event.data.old_state.attributes.get('restored', false) and
         not trigger.event.data.old_state.state == 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'identified' and
         (trigger.event.data.new_state.attributes.ulp_id|default('')) != '' and
         trigger.event.data.new_state.attributes.ulp_id in ['ALLOWED_ID1', 'ALLOWED_ID2']
       }}
actions:
  - action: notify.mobile_app_your_device # Replace with your notification target
    data:
      message: "Fingerprint identified with ID: {{ trigger.event.data.new_state.attributes.ulp_id }}"
      title: "Fingerprint Scan Notification"
```

:::warning
与 NFC 类似，当指纹被识别和未被识别时都会触发事件。不过与 NFC 不同的是，在当前实现中，如果指纹未知，事件中不会包含指纹 ID。当设备在 Home Assistant 中变为 unavailable 后又恢复可用时，可能会发生重复事件处理。这一状态变化不是集成本身的问题，但在将设备用于解锁门等操作时尤其需要加以考虑。

:::

### 车辆检测事件

* **事件名称**：Vehicle
* **事件属性**：
  * **event\_type**：`detected`
  * **event\_id**：用于标识车辆检测事件的唯一 ID。
  * **thumbnail\_count**：此事件收到的缩略图数量。
  * **confidence**：检测置信度分数（0-100，可选）。
  * **clock\_best\_wall**：最佳检测帧的时间戳，采用 ISO 8601 格式（可选）。
  * **license\_plate**：检测到的车牌（可选，需要车牌识别功能）。
  * **attributes**：来自 UniFi Protect 的附加检测元数据（可选），包括：
    * **trackerId**：检测到车辆的内部追踪 ID。
    * **vehicleType**：检测到的车辆类型（例如 car、truck 或 bus）及其置信度分数。
    * **color**：检测到的车辆颜色及其置信度分数。
    * **zone**：检测到该车辆的区域 ID 列表。
* **说明**：当支持智能检测的摄像头检测到车辆时，会触发此事件。与其他会立即触发的事件类型不同，车辆检测会延迟 3 秒触发，以便等待更优质的缩略图和车牌识别（LPR）数据到达。该延迟可确保 Home Assistant 在事件触发前拿到置信度最高的 LPR 缩略图数据。

#### 车辆检测的工作方式

车辆检测事件采用延迟触发机制，以优化数据质量：

1. 当检测到车辆时，摄像头会通过 WebSocket 开始发送缩略图数据。
2. 系统会启动一个 3 秒计时器，等待更多缩略图到达。
3. 如果同一事件收到了新的缩略图，计时器会重置为 3 秒。
4. 计时结束后，系统会根据以下优先级选择最佳可用缩略图并触发事件：
   * 车牌检测结果（最高优先级）
   * 置信度分数（越高越好）
   * 时间戳（越新越好）
5. 如果在计时器尚未结束时又开始了新的车辆事件，旧事件会立即触发，然后为新事件重新启动一个计时器。
6. 在少数情况下，如果 UniFi Protect 在事件已触发后又发送了更新数据，系统会用新信息额外触发一次事件。

#### 要求

* 支持智能检测的摄像头（`feature_flags.has_smart_detect = true`）
* 必须在摄像头上启用车辆检测
* 车牌识别功能为可选

#### 车辆检测自动化示例

```yaml
alias: Vehicle Detected at Driveway
description: Automation that triggers when any vehicle is detected
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.driveway_camera_vehicle # Replace with your camera entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {{ 
         trigger.event.data.old_state is not none and
         not trigger.event.data.old_state.attributes.get('restored', false) and
         trigger.event.data.old_state.state != 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'detected'
       }}
actions:
  - data:
      message: >-
        Vehicle detected{% if trigger.event.data.new_state.attributes.confidence is defined %} with {{ trigger.event.data.new_state.attributes.confidence }}% confidence{% endif %}.
        {% if trigger.event.data.new_state.attributes.license_plate is defined %}
        License plate: {{ trigger.event.data.new_state.attributes.license_plate }}
        {% endif %}
      title: Vehicle Detection
    action: notify.mobile_app_your_device # Replace with your notification target
```

#### 特定车牌自动化示例

```yaml
alias: Garage Door Open for Known Vehicle
description: Opens garage door when a specific license plate is detected
triggers:
  - event_type: state_changed
    event_data:
      entity_id: event.driveway_camera_vehicle # Replace with your camera entity
    trigger: event
conditions:
  - condition: template
    value_template: >
      {{ 
         trigger.event.data.old_state is not none and
         not trigger.event.data.old_state.attributes.get('restored', false) and
         trigger.event.data.old_state.state != 'unavailable' and
         trigger.event.data.new_state is not none and
         trigger.event.data.new_state.attributes.event_type == 'detected' and
         trigger.event.data.new_state.attributes.license_plate in ['ABC123', 'XYZ789']
       }}
actions:
  - action: cover.open
    target:
      entity_id: cover.garage_door
  - data:
      message: >-
        Garage door opened for vehicle {{ trigger.event.data.new_state.attributes.license_plate }}.
      title: Garage Door Notification
    action: notify.mobile_app_your_device # Replace with your notification target
```

:::note
即使未检测到车牌，车辆检测事件也会被触发。只有当车牌识别成功识别出车牌时，`license_plate` 属性才会出现。3 秒延迟可确保如果 LPR 数据可用，它会被包含在事件中。

:::
:::warning
车牌识别可能会被多种来源触发，包括包含车牌图像的图片或印刷材料。在基于车牌检测创建自动化时务必谨慎，尤其是打开车库门或解锁大门等安全敏感操作。建议加入额外验证方式或时间限制，以防止误触发。请自行承担使用风险。

:::

## 故障排查

### 视频流延迟

stream 集成的默认设置通常会带来 5-15 秒甚至更高的延迟。你可以通过启用 [stream 集成中的 LL-HLS](/home-assistant/integrations/stream/index.md#ll-hls) 将延迟降低到 1-3 秒。你还应在 Home Assistant 前面加一个支持 HTTP/2 的反向代理，以便进行连接池复用。如果不加反向代理，在同时查看过多摄像头流时，你可能会看到 `Waiting for WebSocket...` 消息。一种实现方式是使用官方 NGINX Proxy Add-on：

[![Open Add-on in your Home Assistant instance.](https://my.home-assistant.io/badges/supervisor_addon.svg)](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_nginx_proxy)

### 无法向扬声器播放音频

与许多其他功能不同，向扬声器播放音频要求 Home Assistant 能直接访问你的摄像头，具体来说需要通过 `tcp/7004` 端口。你可以[启用调试日志](/home-assistant/docs/configuration/troubleshooting/index.md#enabling-debug-logging)，系统会输出将要执行的完整 FFmpeg 命令以及 FFmpeg 输出内容，以帮助你排查为何音频未能播放到设备上。

### 查看器的 Liveview 选项缺失或未更新

由于这些选项会导出给语音助手使用，目前主控制 select 还不支持动态选项。你在 UniFi Protect 中新增、删除或修改 Liveview 后，必须重启 Home Assistant，查看器中才会显示新的选项。

### 出现 `404 - Reason: Not Found` 或 `502 - Reason: Bad Gateway` 的 NvrError

如果你在认证或获取数据时遇到 `NvrError... 404 - Reason: Not Found`，很可能是你的 UniFi Protect 应用已经崩溃。UniFi Protect 在 UniFi OS 上以受监管方式运行（类似 Home Assistant OS + Home Assistant Core）。对于一个本不应返回 404 的 URL 却得到 404，通常意味着 UniFi Protect 可能没有在运行。你可以检查磁盘健康状态，或进一步调试 UniFi Protect，以找出崩溃原因。

同样地，`502 Bad Gateway` 也说明你的 UniFi Protect 应用可能没有在运行。

```log
uiprotect.NvrError: Fetching Camera List failed: 404 - Reason: Not Found
```
