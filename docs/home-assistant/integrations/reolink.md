---
title: Reolink
description: 有关如何将 Reolink 设备（NVR/摄像头）集成到 Home Assistant 的说明。
ha_category:
  - Camera
  - Doorbell
  - Media source
  - Update
ha_iot_class: Local Push
ha_release: 2023.1
ha_domain: reolink
ha_codeowners:
  - '@starkillerOG'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - light
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_integration_type: hub
ha_dhcp: true
ha_quality_scale: platinum
related:
  - docs: /dashboards/picture-glance/#creating-a-card-to-control-the-camera
    title: 在仪表板中控制摄像头
  - url: https://reolink.com/
    title: Reolink 产品页面
works_with:
  - local
---

**Reolink** 集成可让您在 Home Assistant 中控制 [Reolink](https://reolink.com/) NVR 或摄像头。Reolink 摄像头以本地存储著称，无需云订阅或云账号即可使用。设备可在局域网内完全本地运行，优先保障隐私。即使阻断 Reolink 设备的互联网访问，Home Assistant 集成以及 Reolink app/client 仍可照常工作。Reolink 摄像头在白天与夜间都能提供清晰画质，且价格相对亲民。摄像头内置 SD 卡可进行本地录像，选配的 Reolink NVR/Hub 则可在室内提供更大的录像容量。从本文档中的实体列表也可看出，Reolink 摄像头具备高度可配置性，并与 Home Assistant 深度集成。

该集成已获 Reolink 官方授权，由 @StarkillerOG 作为主要开发者，并基于 Reolink 官方资源支持构建。

## 先决条件

全新的 Reolink 摄像头需要先接入网络并完成初始化。初始化过程中需要设置摄像头登录凭据。详细步骤请参阅[初始设置](#初始设置)。

- 为保证该集成正常运行，Reolink 设备上需要使用具有管理员权限的账号。
- Reolink 设备密码仅可包含字符 `a-z, A-Z, 0-9 or @$*~_-+=!?.,:;'()[]`。其他特殊字符会导致本集成使用的视频流出现编码问题，因此不受支持。若密码中包含不兼容的特殊字符，集成会提示您修改密码。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "Reolink 设备的主机名或 IP 地址，例如 '192.168.1.25'。您可在路由器中查看，或在 Reolink app 的 **Settings** > **Device**（顶部图标）> **Networkinformation** > **IP-address** 中查看。通常设备会被自动发现，无需手动填写。"
Username:
  description: "用于登录 Reolink 设备本机的用户名，不是 Reolink 云账号。"
Password:
  description: "用于登录 Reolink 设备本机的密码，不是 Reolink 云账号。"
```

## Options

To define options for Reolink, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Reolink are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Protocol:
  description: 可在 <abbr title="real-time streaming protocol">RTSP</abbr>、<abbr title="real-time messaging protocol">RTMP</abbr> 或 <abbr title="flash video">FLV</abbr> 流协议之间切换。<abbr title="real-time streaming protocol">RTSP</abbr> 支持 4K（h265 编码）视频流，而 <abbr title="real-time messaging protocol">RTMP</abbr> 与 <abbr title="flash video">FLV</abbr> 不支持。<abbr title="flash video">FLV</abbr> 对摄像头资源占用最低。
```

## 本文档实体名称后的星号（*）

如果下方列出的实体名称后带有星号（*），表示该实体默认禁用。要使用该实体，请先[启用实体](/home-assistant/common-tasks/general/#enabling-entities)。

## 数据更新：本文档实体名称后的加号（+）

如果下方列出的实体名称后带有加号（+），表示该实体支持推送更新，状态变化几乎可实时反映。
为保证冗余，所有实体状态也会通过轮询更新。对于连接到 NVR/Hub 的摄像头，轮询间隔为每台摄像头 10 秒，且总间隔最少 60 秒。对于直连摄像头，轮询间隔为 60 秒。对于没有加号（+）的实体，轮询是唯一更新方式，因此设备状态变化在 Home Assistant 中可能会有一定延迟。
固件更新实体是一个例外，其轮询间隔为每 24 小时一次。
电池摄像头是另一个例外：大多数实体仍然每 60 秒 polls 一次。但会导致摄像头从休眠中唤醒的实体，只会在以下事件发生时轮询：

- 摄像头自行唤醒（PIR 事件），且距离上次更新已超过 1 小时。
- 摄像头超过 6 小时未唤醒。
- 所有电池摄像头超过 12 小时未在同一时间处于唤醒状态。

如需执行所有实体的完整更新（这会唤醒同一 hub/NVR 下的所有电池摄像头），可对某台摄像头的任一 Reolink 实体（例如移动检测二进制传感器）调用 `homeassistant.update_entity` 操作。

## 支持的功能

### 摄像头视频流

该集成会创建多个摄像头实体，不同流类型对应不同分辨率：

- Fluent（低分辨率）
- Balanced*（中等分辨率）
- Clear*（高分辨率，资源占用较高）
- Snapshots Fluent*（低分辨率）
- Snapshots Clear*（高分辨率）

Fluent 流摄像头实体默认启用，其他流默认禁用。
Snapshots 流通过连续图片快照实现极低延迟，但帧率也会很低；当 RTMP/RTSP/FLV 视频流延迟过高时可考虑使用。
双镜头摄像头会为第二个镜头提供额外视频流。

### 二进制传感器

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下二进制传感器：

- 移动检测++
- 访客++（门铃按压）
- AI 人员检测++
- AI 车辆检测++
- AI 自行车检测+
- AI 宠物检测++
- AI 动物检测++
- AI 人脸检测++
- AI 包裹检测++
- AI 婴儿哭声检测+（声音检测）
- AI 越线人员+（最多 3 条线）
- AI 越线车辆+（最多 3 条线）
- AI 越线动物+（最多 3 条线）
- AI 入侵人员+（最多 3 个区域）
- AI 入侵车辆+（最多 3 个区域）
- AI 入侵动物+（最多 3 个区域）
- AI 逗留人员+（最多 3 个区域）
- AI 逗留车辆+（最多 3 个区域）
- AI 逗留动物+（最多 3 个区域）
- AI 物品遗留+（最多 3 个区域）
- AI 物品带走+（最多 3 个区域）
- IO 输入+
- 睡眠状态+

\++ 这些传感器会按优先顺序使用以下 4 种方式接收事件：TCP push、ONVIF push、ONVIF long polling、fast polling（每 5 秒）。
其中 TCP push 延迟最低，fast polling 延迟最高。集成会自动选择检测到可用且最快的方法，较慢的方法不会启用。
为保证冗余，这些传感器也会与其他实体一起每 60 秒轮询一次。
如需进一步降低延迟，请参阅[降低移动事件延迟](#reducing-latency-of-motion-events)。

对于 **crossline**、**intrusion**、**linger**、**item forgotten** 和 **item taken** 实体，需要先在 Reolink app 中配置线/区域（**Settings** > **Detection alarm** > **Smart event detection**）。在 Reolink app 中最多可添加 3 条线/3 个区域，并可分别启用或禁用人员/车辆/动物检测。更改后 60 秒内，对应实体会自动出现在 Home Assistant 中。

### 数值实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下数值实体：

- 光学变焦控制+
- 对焦控制+
- 泛光灯开启亮度*+
- 泛光灯事件亮度*+
- 红外灯亮度
- 泛光灯事件点亮时长*
- 泛光灯事件闪烁时长*
- 音量（摄像头）
- 语音音量（摄像头）
- 门铃音量（摄像头）
- 警报音量（Home Hub）
- 消息音量（Home Hub）
- Chime 音量
- Chime 静音时长
- 音频降噪*
- 返回守卫位时长
- 移动灵敏度
- PIR 灵敏度
- PIR 间隔*
- AI 人脸灵敏度
- AI 人员灵敏度
- AI 车辆灵敏度
- AI 自行车灵敏度
- AI 包裹灵敏度
- AI 宠物灵敏度
- AI 动物灵敏度
- AI 越线灵敏度+（最多 3 条线）
- AI 入侵灵敏度+（最多 3 个区域）
- AI 逗留灵敏度+（最多 3 个区域）
- AI 物品遗留灵敏度+（最多 3 个区域）
- AI 物品带走灵敏度+（最多 3 个区域）
- AI 人脸延迟*
- AI 人员延迟*
- AI 车辆延迟*
- AI 自行车延迟*
- AI 包裹延迟*
- AI 宠物延迟*
- AI 动物延迟*
- AI 入侵延迟+（最多 3 个区域）
- AI 逗留延迟+（最多 3 个区域）
- AI 物品遗留延迟+（最多 3 个区域）
- AI 物品带走延迟+（最多 3 个区域）
- 婴儿哭声灵敏度
- 自动快捷回复延迟
- 自动追踪左限位
- 自动追踪右限位
- 自动追踪消失时间
- 自动追踪停止时间
- 日夜切换阈值*
- 图像亮度*+（默认 128）
- 图像对比度*+（默认 128）
- 图像饱和度*+（默认 128）
- 图像锐度*+（默认 128）
- 图像色调*+（默认 128）
- 预录制时长*
- 预录制停止电量阈值*

**Floodlight turn on brightness** 用于控制泛光灯在由摄像头内部逻辑开启时（参见 **Floodlight mode** 选择实体），或通过 **Floodlight** 灯光实体开启时的亮度。
**Floodlight event brightness** 用于控制泛光灯在摄像头检测到事件（例如人员或车辆）后自动开启时的亮度，参见 **Floodlight event mode** 实体。

若 **Floodlight event mode** 不处于 `on` 状态，**Floodlight event on time** 会显示为 `unknown`。
若 **Floodlight event mode** 不处于 `flash` 状态，**Floodlight event flash time** 会显示为 `unknown`。

当摄像头在 **Guard return time** 设定的秒数内没有发生移动，且未检测到人员/宠物/动物/车辆，同时 **Guard return** 开关为 ON 时，摄像头会自动回到守卫位。

当 Reolink 门铃被按下时，若 **Auto quick reply message** 未设为 off，系统会在 **Auto quick reply time** 秒后播放 **Auto quick reply message** 选择实体中设置的快捷回复。

如果启用了 **Auto tracking** 开关实体，当目标从画面中消失，或在 **Auto track disappear time**/**Auto track stop time** 内停止移动时，摄像头会回到原始位置。

**Day night switch threshold** 用于决定摄像头在何种光照水平下从 **Color** 切换到 **Black & white**。该值仅在 **Day night mode** 选择为 **Auto** 时生效。

### 按钮实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下按钮实体：

- <abbr title="pan, tilt, and zoom">PTZ</abbr> 停止
- PTZ 左
- PTZ 右
- PTZ 上
- PTZ 下
- PTZ 左上*
- PTZ 左下*
- PTZ 右上*
- PTZ 右下*
- PTZ 校准
- PTZ 放大*
- PTZ 缩小*
- PTZ 持续旋转*
- 返回守卫位
- 将当前位置设为守卫位
- 重启*

**PTZ left**、**right**、**up**、**down**、**left up**、**left down**、**right up**、**right down**、**zoom in** 和 **zoom out** 会持续将摄像头朝对应方向移动，直到调用 **PTZ stop** 或达到硬件极限。
**PTZ continuous rotation** 会让摄像头持续旋转，直到调用 **PTZ stop**，或者再次调用 **PTZ continuous rotation**。

**Guard set current position** 会将当前位置设为新的守卫位。

#### 操作 `reolink.ptz_move`

某些 Reolink <abbr title="pan, tilt, and zoom">PTZ</abbr> 摄像头支持以不同速度移动。对于这些摄像头，可以将 `reolink.ptz_move` 操作与 **PTZ left**、**right**、**up**、**down**、**zoom in** 或 **zoom out** 实体配合使用，以指定速度属性。如果在 `reolink.ptz_move` 操作的 **targets** 下 **Choose entity** 中看不到某台摄像头的 <abbr title="pan, tilt, and zoom">PTZ</abbr> 按钮实体，则表示该摄像头不支持自定义 <abbr title="pan, tilt, and zoom">PTZ</abbr> 速度。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | 否       | 要控制的 Reolink <abbr title="pan, tilt, and zoom">PTZ</abbr> 按钮实体名称。例如 `button.trackmix_ptz_left`。 |
| `speed`                | 否       | <abbr title="pan, tilt, and zoom">PTZ</abbr> 移动速度。例如 `10`。 |

### 选择实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下选择实体：

- 泛光灯模式（Off、Auto、On at night、Schedule、Adaptive、Auto adaptive）
- 泛光灯事件模式（Off、On、Flash）
- 日夜模式+（Auto、Color、Black&White）
- <abbr title="pan, tilt, and zoom">PTZ</abbr> preset
- 播放快捷回复消息
- 自动快捷回复消息
- 自动追踪方式（Digital、Digital first、Pan/Tilt first）
- 门铃 LED（Stay off、Auto、Auto & always on at night）
- HDR*（Off、On、Auto）
- Binning 模式*（Off、On、Auto）
- 图像曝光模式*（Auto、Low noise、Anti-smearing、Manual）
- Clear 帧率*
- Fluent 帧率*
- Clear 码率*
- Fluent 码率*
- Chime 移动铃声
- Chime 人形铃声
- Chime 宠物铃声
- Chime 车辆铃声
- Chime 访客铃声
- Hub 警报铃声
- Hub 访客铃声
- Hub 场景模式（Off、Disarmed、Home、Away）
- 录像打包时间
- 预录制帧率*
- 录像后持续时间
- Clear 编码*（h264、h265）
- Fluent 编码*（h264、h265）

可在 Reolink app/windows/web 客户端中设置 **PTZ preset** 位置，预设名称会在集成启动时加载到 Home Assistant 中。新增预设位置后，请重启 Reolink 集成。

**Play quick reply messages** / **Auto quick reply messages** 可在 Reolink 手机应用中录制，并同时指定名称。新的或更新后的快捷回复消息会在集成启动时加载到 Home Assistant 中。新增快捷回复消息后，请重启 Reolink 集成。

**Hub scene modes** 可在 Reolink app/client 中设置。场景名称会在集成启动时加载到 Home Assistant 中。新增自定义场景后，请重启 Reolink 集成。

#### 操作 `reolink.play_chime`

要在 Reolink chime 上播放铃声，可使用 `reolink.play_chime` 操作。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `device_id`            | 否       | 要控制的 Reolink Chime 设备 ID 列表。例如 `- 12a34b56c7d8ef9ghijklm0n1op2345q`。 |
| `ringtone`             | 否       | 要播放的铃声。例如 `operetta`。 |

### 警笛实体

如果摄像头或 Hub 支持警笛，则会创建一个警笛实体。
调用警笛开启操作后，警笛会持续响起，直到调用关闭操作为止。

某些摄像头型号在发送关闭命令后，到声音停止之间可能有最长 5 秒的延迟。警笛开启操作支持设置音量和持续时间（这种情况下无需再额外调用关闭操作）。

### 开关实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下开关实体：

- 夜视模式下红外灯
- 录制音频
- 事件触发警笛
- 自动追踪
- 自动对焦
- 返回守卫位
- PTZ 巡航（开始/停止）
- 门铃按键声音
- 录像
- 手动录像+
- 预录制
- 监控规则
- 隐私模式+
- 隐私遮罩
- 推送通知
- Hub 事件铃声
- 事件邮件通知
- FTP 上传
- PIR 启用*
- PIR 降低误报*
- Chime LED
- 硬接线门铃启用*

当 **Privacy mode** 为 ON 时，几乎所有其他实体都会不可用，因为摄像头会关闭 API 和视频流。当 **Privacy mode** 关闭后，所有实体会重新可用。编写自动化时请考虑这一点；在通过其他实体修改摄像头设置前，请先确保 **Privacy mode** 为 OFF。

只有在 Reolink app/client 中的 **settings**（齿轮图标）> **Display** > **Privacy Mask** 配置了隐私遮罩后，才会添加 **Privacy mask** 开关。添加隐私遮罩后，需要在 Home Assistant 中重新加载 Reolink 集成，**Privacy mask** 开关才会显示出来。

当 **Infrared lights in night mode** 实体设为 OFF 时，红外 LED 将始终关闭。当其设为 ON 时，红外 LED 会在摄像头进入夜视模式时开启。更多信息请参阅 **Day night mode** 选择实体。

对于 NVR，**Record**、**Push**、**Hub ringtone on event**、**Email** 和 **FTP** 会在 NVR 设备下提供全局开关，同时在摄像头设备下为 NVR 的每个通道提供单独开关。只有当全局开关和对应通道开关都启用时，该功能才会对该通道生效（Reolink app/client 中也是同样逻辑）。

只有满足以下条件时，手机才会收到 **Push** 通知：
- Home Assistant 中的 **Push notifications** 开关为 ON。
- 对于 NVR，全局开关和通道开关都为 ON。
- 该手机在 Reolink App 中的 Push-notification 已开启。

Reolink app 中的 Push-notification 设置独立于 Home Assistant，也独立于其他连接到同一摄像头手机上的设置。Reolink 这样设计，是为了让您可以按手机分别控制是否接收推送通知。

必须先在 Reolink [app](https://support.reolink.com/hc/en-us/articles/360008746833/)/[windows](https://support.reolink.com/hc/en-us/articles/900003738126/)/web 客户端中配置 **PTZ patrol** 位置。若未配置任何位置，则不会添加 PTZ patrol 实体。首次添加巡航位置后，需要重启 Reolink 集成。

**Manual record** 开关会在 10 分钟后自动关闭。因此，录像会在手动录像开关关闭时，或 10 分钟到达时结束。

轮询 **Hardwired chime enabled** 开关状态时，可能会让硬接线门铃因型号不同而发出轻微抖动声。因此，该开关的状态只会被轮询一次（约在集成启动 1 分钟后）。启动时出现抖动声只会发生在您启用了该开关的情况下。

### 灯光实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下灯光实体：

- 泛光灯+
- 状态 LED

当 **floodlight** 实体为 ON 时，泛光灯会始终保持开启；当为 OFF 时，则由摄像头内部的泛光灯模式（Off、Auto、Schedule）控制，参见 **Floodlight mode** 选择实体。

### 传感器实体

根据摄像头支持的功能（[参见 Reolink.com 上对应型号的规格](#tested-models)），会添加以下传感器实体：

- 人员类型+（man、woman）
- 动物类型+（dog、cat）
- 车辆类型+（sedan、SUV、pickup truck、motorcycle）
- PTZ 水平位置+
- PTZ 俯仰位置+
- 日夜状态+（color、black and white、color with floodlight）
- Wi-Fi 信号*
- CPU 使用率*
- HDD/SD 存储*
- 电池百分比+
- 电池温度*+
- 电池状态*+（discharging、charging、charge complete）

### 更新实体

集成提供了一个更新实体，每 24 小时检查一次固件更新。
更新会同时通过摄像头 API 和 [Reolink 下载中心](https://reolink.com/download-center/) 进行检查。
因此，Home Assistant 中的更新实体有时能够发现并安装来自 [Reolink 下载中心](https://reolink.com/download-center/) 的固件更新，而 Reolink app/windows/web 客户端却不一定能发现该更新。

### 用于播放录像的媒体浏览器

如果摄像头支持录制到 SD 卡或 NVR/Hub（[参见 Reolink.com 上对应型号的规格](#tested-models)），Reolink 集成会提供一个媒体浏览器，用于访问摄像头录制的视频。
在侧边栏中选择 “Media” > “Reolink”，然后选择您想查看录像的 **camera**。您还可以选择高或低 **resolution** 视频流，并选择录像 **date**。之后会显示当天所有可用的视频文件。
在 Home Assistant 中可以查看最多 1 个月内的录像。

## 已测试型号

下方列表中加粗的型号已通过 **Works with Home Assistant** 计划认证。

### 已测试的直连型号

以下型号已经过测试，并确认可直接连接 Home Assistant：

- C1 Pro*
- C2 Pro*
- [CX410](https://reolink.com/product/cx410/)
- [CX810](https://reolink.com/product/cx810/)
- [E1](https://reolink.com/product/e1/)
- [E1 Pro](https://reolink.com/product/e1-pro/)
- [E1 Zoom](https://reolink.com/product/e1-zoom/)
- [E1 Outdoor](https://reolink.com/product/e1-outdoor/)
- [E1 Outdoor PoE](https://reolink.com/product/e1-outdoor-poe/)
- [E1 Outdoor Pro](https://reolink.com/product/e1-outdoor-pro/)
- [E331](https://reolink.com/product/e331/)
- [Elite Floodlight WiFi](https://reolink.com/product/elite-floodlight-wifi/)（需要市电供电，通过 USB 供电时无法接入）
- [FE-P](https://reolink.com/product/fe-p/)（视频流仅支持 “fisheye” 或 “5-in-1” 视图，不支持 “dual panoramic”、“quad”、“cylindrical”、“defished” 或 “hemispheric” 视图）
- [FE-W](https://reolink.com/product/fe-w/)（视频流仅支持 “fisheye” 或 “5-in-1” 视图，不支持 “dual panoramic”、“quad”、“cylindrical”、“defished” 或 “hemispheric” 视图）
- [Lumus Pro](https://reolink.com/product/lumus-pro/)
- RLC-410*
- [RLC-410W](https://reolink.com/product/rlc-410w/)
- RLC-411*
- RLC-420*
- RLC-423*
- [RLC-510A](https://reolink.com/product/rlc-510a/)
- RLC-511*
- RLC-511W*
- [RLC-511WA](https://reolink.com/product/rlc-511wa/)*
- RLC-520*
- [RLC-520A](https://reolink.com/product/rlc-520a/)
- RLC-522*
- [RLC-810A](https://reolink.com/product/rlc-810a/)
- [RLC-810WA](https://reolink.com/product/rlc-810wa/)
- [RLC-811A](https://reolink.com/product/rlc-811a/)
- [RLC-81MA](https://reolink.com/product/rlc-81ma/)
- [RLC-81PA](https://reolink.com/product/rlc-81pa/)
- [RLC-820A](https://reolink.com/product/rlc-820a/)
- [RLC-822A](https://reolink.com/product/rlc-822a/)
- [RLC-823A](https://reolink.com/product/rlc-823a/)
- **[RLC-823S2](https://reolink.com/product/rlc-823s2/)**
- [RLC-830A](https://reolink.com/product/rlc-830a/)
- [RLC-833A](https://reolink.com/product/rlc-833a/)
- [RLC-840A](https://reolink.com/product/rlc-840a/)
- [RLC-843A](https://reolink.com/product/rlc-843a/)
- [RLC-1212A](https://reolink.com/product/rlc-1212a/)
- **[RLC-1224A](https://reolink.com/product/rlc-1224a/)**
- [RLN8-410 NVR](https://reolink.com/product/rln8-410/)
- [RLN16-410 NVR](https://reolink.com/product/rln16-410/)
- [RLN36 NVR](https://reolink.com/product/rln36/)
- [RLN12W NVR](https://reolink.com/product/rln12w/)
- [NVS8 NVR](https://reolink.com/product/nvs8/)（RLN8 的零售版）
- [NVS16 NVR](https://reolink.com/product/nvs16/)（RLN16 的零售版）
- [RP-PCB8MZ](https://reolink.com/product/rp-pcb8mz/)
- [Reolink Chime](https://reolink.com/product/reolink-chime/)（连接到门铃或 Home Hub 时）
- [Reolink Duo WiFi](https://reolink.com/product/reolink-duo-wifi-v1/)
- [Reolink Duo 2 WiFi](https://reolink.com/product/reolink-duo-wifi/)
- **[Reolink Duo 3 PoE](https://reolink.com/product/reolink-duo-3-poe/)**
- [Reolink Duo 3V PoE](https://reolink.com/product/reolink-duo-3v-poe/)
- Reolink Duo Floodlight（[PoE](https://reolink.com/product/reolink-duo-floodlight-poe/) 和 [Wi-Fi](https://reolink.com/product/reolink-duo-floodlight-wifi/)）
- [Reolink Elite WiFi](https://reolink.com/product/elite-wifi/)
- [Reolink Floodlight PoE and Wi-Fi*](https://reolink.com/product/reolink-floodlight/)
- [Reolink Home Hub](https://reolink.com/product/reolink-home-hub/)
- [Reolink Home Hub Pro](https://reolink.com/product/reolink-home-hub-pro/)
- [Reolink Lumus](https://reolink.com/product/reolink-lumus/)
- **[Reolink TrackMix PoE](https://reolink.com/product/reolink-trackmix-poe/)**
- [Reolink TrackMix Wi-Fi](https://reolink.com/product/reolink-trackmix-wifi/)
- Reolink Video Doorbell（[PoE Black](https://reolink.com/product/reolink-video-doorbell/)、[PoE White](https://reolink.com/product/reolink-video-doorbell/)）
- **Reolink Video Doorbell（[Wi-Fi Black](https://reolink.com/product/reolink-video-doorbell-wifi/)、[Wi-Fi White](https://reolink.com/product/reolink-video-doorbell-wifi/)）**

*这些型号已经停产且不再销售，但仍会继续支持 Home Assistant。

### 已测试的电池供电型号

电池供电的 Reolink 摄像头可以借助 [Reolink Home Hub](https://reolink.com/product/reolink-home-hub/) 或 NVR 与 Home Assistant 配合使用。Home Hub/NVR 会作为电池摄像头与 Home Assistant 之间的桥接设备，从而节省电池寿命。电池摄像头的大多数功能都能像普通供电摄像头一样使用。在 Home Assistant 中查看摄像头视频流时，会使电池摄像头在查看期间保持唤醒，从而消耗电量。因此，请避免将该视频流放在会被持续查看的仪表板上，例如墙面面板仪表板。您可以通过检查 "Sleep status" 实体是否会在电池摄像头未被主动使用时变为 "Sleeping" 来确认运行是否正常。

以下 Hub/NVR 已经过测试，并确认可在 Home Assistant 中与电池供电型号配合使用：

- **[Reolink Home Hub](https://reolink.com/product/reolink-home-hub/)**
- [Reolink Home Hub Pro](https://reolink.com/product/reolink-home-hub-pro/)
- [RLN8-410 NVR](https://reolink.com/product/rln8-410/)（仅硬件版本 N7MB01、N3MB01、N2MB02 或 H3MB18。硬件版本 H3MB02 和 H3MB16 自 2022 年以来未获得固件更新）
- [RLN16-410 NVR](https://reolink.com/product/rln16-410/)（仅硬件版本 N6MB01 或 H3MB18。硬件版本 H3MB02 自 2022 年以来未获得固件更新）
- [RLN36 NVR](https://reolink.com/product/rln36/)
- [NVS8 NVR](https://reolink.com/product/nvs8/)（RLN8 的零售版）
- [NVS16 NVR](https://reolink.com/product/nvs16/)（RLN16 的零售版）

以下电池供电型号已经过测试，并确认可通过 Reolink Home Hub/NVR 正常工作：

- [Argus 3 Pro](https://reolink.com/product/argus-3-pro/)
- [Argus 4 Pro](https://reolink.com/product/argus-4-pro/)
- [Argus Eco](https://reolink.com/product/argus-eco/)
- [Argus Eco Ultra](https://reolink.com/product/argus-eco-ultra/)
- [Argus PT](https://reolink.com/product/argus-pt/)
- **[Argus Track](https://reolink.com/product/argus-track/)**
- [Reolink Altas](https://reolink.com/product/reolink-altas/)
- [Reolink Altas PT Ultra](https://reolink.com/product/altas-pt-ultra/)
- **[Reolink Doorbell Battery](https://reolink.com/product/reolink-doorbell-battery/)**

Reolink 还提供了[一份更完整的电池摄像头型号列表](https://support.reolink.com/hc/en-us/articles/32379509281561-Reolink-Home-Hub-Compatibility/)，这些型号与 Home Hub 兼容，并且理论上应可与 Home Assistant 配合使用。

### 仅兼容 NVR/Home Hub 的型号

以下型号缺少 HTTP Web 服务器 API，因此无法直接与此集成配合使用。
不过，这些摄像头仍可通过已连接到 Home Assistant 的 NVR 或 Home Hub 与此集成协同工作。

- B400*
- B500*
- B500W*
- B800*
- B800W*
- B1200*
- D400*
- D500*
- D800*
- D1200*

*这些型号仅以包含 NVR 的套装形式销售。

### 不兼容型号

Reolink LTE 摄像头不支持此集成。

- Reolink Go Plus
- Reolink Go PT Plus
- Reolink Go PT Ultra
- Reolink Go Ranger PT
- Reolink Go Ultra
- Reolink TrackMix LTE
- Reolink TrackMix LTE Plus

## 初始设置

### 1. 初始化并配置摄像头凭据

全新的 Reolink 摄像头需要先接入网络并完成初始化。在初始化过程中，需要为摄像头设置登录凭据。
可通过以下几种方式完成：

#### 通过 app/client 连接 Reolink

推荐方式是使用 [Reolink 手机应用、Windows 或 Mac 客户端](https://reolink.com/software-and-manual/)，然后按照屏幕提示操作。

#### 通过 Web 浏览器连接 Reolink

如果您的摄像头带有 LAN 端口（大多数 Wi-Fi 摄像头也都有 LAN 端口）：

   1. 先使用网线将摄像头接入网络。
   2. 找到摄像头的 IP 地址（例如在路由器中查看），然后在浏览器中访问该地址。
   3. 按照屏幕提示先设置凭据（在 Home Assistant 中也请使用相同凭据）。
   4. 如果是 Wi-Fi 摄像头：
      - 前往 **settings**（齿轮图标）> **Network**，填写您的 Wi-Fi SSID 和密码。
        - 如果您同时有 2.4 GHz 和 5 GHz 网络，请查看摄像头用户指南以确认支持的频段。
      - 完成后即可断开网线，摄像头会自动切换到 Wi-Fi 连接。

#### 二维码

您也可以使用自制二维码连接 Wi-Fi 摄像头。连接成功后，请继续按照 **Web browser** 小节中的说明操作。
请使用 ISO-8859-1 字符编码（不是 UTF-8）并使用以下 XML 字符串生成二维码：

    <QR><S>ssid</S><P>password</P><C>last4</C></QR>

其中 `ssid` 和 `password` 请填写您的 Wi-Fi 网络信息。
`last4` 指摄像头机身（通常在底部）印刷二维码的最后 4 位数字。
通常这些数字会直接印在二维码下方。您也可以扫描二维码并提取最后 4 位数字。

然后在摄像头对准二维码的情况下给它通电。初始化、读取二维码并连接到 Wi-Fi 大约需要一分钟。

### 2. 在 Home Assistant 中添加集成

使用您在步骤 1 中设置的凭据，在 Home Assistant 中完成 Reolink 集成设置。

## 删除集成

### 删除直连摄像头/NVR/Home Hub

要删除直连摄像头/NVR/Home Hub，可以按以下步骤移除集成：

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

这也会一并将连接到该 NVR/Home Hub 的所有摄像头和 chime 从 Home Assistant 中移除。

### 从 NVR/Home Hub 中移除摄像头

要从 NVR/Home Hub 中移除摄像头，可按以下步骤删除设备：

1. 如果摄像头是直接通过 PoE 连接到 NVR，请先物理拔掉它与 NVR 之间的网线。
2. 然后按照 [NVR 说明](https://support.reolink.com/hc/en-us/articles/900003769346-How-to-delete-offline-camera-information-on-Channel-Management-Page-via-Reolink-NVR-New-UI-/) 或 [Home Hub 说明](https://support.reolink.com/hc/en-us/articles/33883674141977-How-to-Change-Camera-Order-Remove-Device-from-Reolink-Home-Hub/) 从 NVR/Home Hub 中移除摄像头。
3. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
4. 在集成条目列表中，选择您要移除摄像头的 NVR/Home Hub 集成实例下方的 **x devices**。
5. 在设备列表中选择要移除的摄像头。
6. 在 **Device info** 下方点击三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。

### 移除 chime

要将 chime 从门铃中移除，可按以下步骤删除 chime：

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在集成条目列表中，选择您要移除 chime 的 Doorbell/NVR/Home Hub 集成实例下方的 **x devices**。
3. 在设备列表中选择要移除的 chime。
4. 在 **Device info** 下方点击三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。

这也会在 Reolink app/client 中解除 chime 与门铃的配对。因此，门铃按下时，chime 将不再响铃。

## 示例

### 在仪表板中显示摄像头

在仪表板中显示摄像头的一种方式是使用 picture glance 卡片。
例如，您可以在卡片上放置方向按钮来[控制摄像头](/home-assistant/dashboards/picture-glance/#creating-a-card-to-control-the-camera)。

### 发送富通知

当有人按下 Reolink 门铃，或 Reolink 摄像头检测到移动、人员等事件时，您可以在手机上收到富通知。

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__small_notification.jpg' alt='Screenshot: Small phone notification'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__big_notification.jpg' alt='Screenshot: Expanded phone notification'>
</p>

<details>
<summary>富通知教程</summary>


先决条件：

- 此 [Reolink 集成](#configuration)
- [Android 或 iOS Companion App](https://companion.home-assistant.io/docs/getting_started#setting-up)
- [Home Assistant 远程访问](https://www.home-assistant.io/docs/configuration/remote/)。即使没有远程访问，您也能收到纯文本通知；但若想在通知中看到摄像头图像（富通知），手机必须能够访问 Home Assistant。若手机与 Home Assistant 位于同一网络中，则即使没有远程访问，富通知也始终可用。

1. 要接收这种富通知，我们需要在 Home Assistant 中创建一个自动化。前往 [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/)，选择 **Create automation** > **Create new automation**。

![Settings button](/home-assistant/images/integrations/reolink/rich_notification__settings.png)
![Automations & scenes button](/home-assistant/images/integrations/reolink/rich_notification__automations_and_scenes.png)
![Create automation button](/home-assistant/images/integrations/reolink/rich_notification__create_automation.png)

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__new_automation.png' alt='Screenshot: new automation'>
</p>

2. 在 **When** 下选择：**Add trigger** > **Entity** > **State**。

![Add trigger](/home-assistant/images/integrations/reolink/rich_notification__add_trigger.png)
![Entity](/home-assistant/images/integrations/reolink/rich_notification__entity.png)
![State](/home-assistant/images/integrations/reolink/rich_notification__state.png)

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__new_trigger.png' alt='Screenshot: new trigger'>
</p>

  然后在 **Entity** 下，从下拉列表中选择与您希望接收富通知的摄像头事件相对应的二进制传感器。对于 Reolink 集成，可选项包括：

    - binary_sensor.*camera name*_motion
    - binary_sensor.*camera name*_person
    - binary_sensor.*camera name*_vehicle
    - binary_sensor.*camera name*_pet
    - binary_sensor.*camera name*_animal
    - binary_sensor.*camera name*_visitor (doorbell press)
    - binary_sensor.*camera name*_package

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__entity_select.png' alt='Screenshot: Entity select'>
</p>

  请注意，这些实体名称会按您为 Home Assistant 配置的语言进行翻译。您可以直接输入以搜索全部实体。如果您想针对人员检测、车辆检测等多个摄像头事件发送同一条消息，也可以添加多个触发器。您还可以为不同事件创建多条自动化并发送不同消息。这里我们选择的是门铃按下对应的 visitor 检测：

3. 在 **To** 下选择事件被检测到时的状态：visitor 选择 **On**，其他传感器选择 **Detected**：

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__state_select.png' alt='Screenshot: State select'>
</p>

4. 在 **And if** 下，您可以**可选地**限制通知发送条件。

- 例如，只在您不在家时发送。若您在设置 companion app 时允许位置跟踪，应用会根据手机 GPS 提供一个 device_tracker 实体。这里我们以此为例，但您可以根据需要添加任意数量的条件：

  选择 **+ Add Condition** > **Entity** > **State**。然后在 **Entity** 下选择您手机的 device_tracker 实体，并在 **State** 下选择 **Home**。

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__device_tracker_condition.png' alt='Screenshot: Device tracker condition'>
</p>

- 如果您想通过冷却时间限制通知发送频率，可以使用以下模板条件：

  再次选择 **Add Condition** > **Other conditions** > **Template**。然后在 **Value template** 中输入以下内容：


```yaml
{{as_timestamp(now()) - as_timestamp(state_attr('automation.reolink_push', 'last_triggered'), 0) > 30}}
```


  其中 `automation.reolink_push` 是该自动化的名称，会在步骤 7 中设置；`30` 则是以秒为单位的冷却时间。

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__cooldown_time_condition.png' alt='Screenshot: cooldown time condition'>
</p>

5. 在 **Then do** 下，选择 **Add Action** > **Camera** > **Take snapshot**。

![Add action button](/home-assistant/images/integrations/reolink/rich_notification__add_action.png)
![Camera button](/home-assistant/images/integrations/reolink/rich_notification__camera.png)
![Take snapshot button](/home-assistant/images/integrations/reolink/rich_notification__take_snapshot.png)

  在 **Targets** 下选择 **Choose entity**，然后选择您想将图像附加到通知中的摄像头。

![Choose entity button](/home-assistant/images/integrations/reolink/rich_notification__chose_entity.png)
![Select Fluent camera](/home-assistant/images/integrations/reolink/rich_notification__select_fluent_camera.png)

  在 **Filename** 中填写 `/media/reolink_snapshot/last_snapshot_doorbell.jpg`。前面的 `/media/` 是绝对必要的，这样手机在收到通知时才能访问已保存的图片。其后的目录和文件名可以自行调整，只要在步骤 6 中填写相同文件名即可。

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__screenshot_take_snapshot.png' alt='Screenshot: take snapshot'>
</p>

6. 再添加一个操作：选择 **Add Action** > **Notifications** > **Send a notification via mobile_app_<phone name>**。

![Add action button](/home-assistant/images/integrations/reolink/rich_notification__add_action.png)
![Notifications button](/home-assistant/images/integrations/reolink/rich_notification__notifications.png)
![Send a notification via mobile app](/home-assistant/images/integrations/reolink/rich_notification__send_to_mobile_button.png)

  在 **message** 中输入您想在通知中接收到的文本。例如 “Someone rang the doorbell”。
  如果您想为通知添加标题，请选择 **title** 选项。例如，如果有多个摄像头会发送通知，可以将标题设为摄像头名称：`Doorbell`。
  选择 **data** 选项，并填写 `image: /media/local/reolink_snapshot/last_snapshot_doorbell.jpg`。请注意，步骤 5 中文件名前缀的 `/media/` 在这里需要改为 `/media/local/`，其余文件名部分则必须与步骤 5 保持一致。

<p class='img'>
  <img src='/home-assistant/images/integrations/reolink/rich_notification__send_to_mobile.png' alt='Screenshot: send notification'>
</p>

  您还可以进一步个性化通知，甚至控制在手机上点击通知时会发生什么；[更多说明见此](https://companion.home-assistant.io/docs/notifications/notifications-basic/)。

7. 选择 **Save**，为自动化命名，例如 `doorbell notification`，然后再次选择 **save**。

![Save](/home-assistant/images/integrations/reolink/rich_notification__save.png)

  这样就设置完成了。按一下门铃，您应该就能在手机上看到通知。请记得，只有满足 **And if** 中设置的条件时，您才会收到通知。


</details>

### 自动化思路

- 当摄像头检测到人员、车辆或动物时，打开附近的（室外）灯光，以提升夜间图像清晰度。
- 当您回家时（例如基于地理围栏）关闭通知和录像，离家后再重新开启。
- 自动暂停富通知一段时间。

<details>
<summary>自动暂停富通知教程</summary>


**目标**：完成本教程后，您将在仪表板上拥有一个下拉框，可选择不同的暂停时长来临时关闭通知。倒计时结束后，通知会自动恢复。效果如下：

![Overview of end result](/home-assistant/images/integrations/reolink/auto_pause__overview.png)

1. 先前往 **Settings** > **Devices & services** > **Helpers** > **+ Create Helper** > **Dropdown** 创建下拉框。
   - 先决定您想提供多少个暂停时长选项。
   - 按下图把这些选项都添加到下拉框中。
   - 第一项需要是 "Notifications active"（或相近表述），用于表示通知开启状态。
   - 您可以添加任意数量的时间选项，也可以自定义任意时长，比如 22 分钟、2 小时。

    ![Dropdown](/home-assistant/images/integrations/reolink/auto_pause__dropdown.png)

2. 接下来，同样在 **Helpers** 中创建一个 **Timer**。
   - 时长保持全 0，并勾选 **Restore state and time**。

     ![Timer](/home-assistant/images/integrations/reolink/auto_pause__timer.png)

3. 现在创建一个新的自动化。
   - 在 **When** 中选择 **+ Add Trigger** > **Entity** > **State**，实体选择刚创建的下拉框，**From** 选择 "Notifications active"（或您设置的第一项名称）。

   ![Automation When dropdown](/home-assistant/images/integrations/reolink/auto_pause__automation_when.png)

4. 再添加一个触发器：**+ Add Trigger** > **Entity** > **State**，实体选择刚创建的计时器，**To** 选择 "Idle"。
   - 然后打开该触发器右侧的三点菜单 `[mdi:dots-vertical]`，选择 **Edit ID**，在 **Trigger ID** 中输入 "TIMER DONE"。

    ![Automation When timer](/home-assistant/images/integrations/reolink/auto_pause__automation_when_timer.png)

5. **And if** 保持为空。在 **Then do** 中选择 **add building block**，再选择 **Choose**。
   - 这里需要创建的分支数量 = 下拉框的时间选项数量 + 1（用于重置下拉框）。
   - 先创建用于重置下拉框的分支，并确保它位于第一项。
   - 在 **Option 1** 下选择 **+ Add Condition** > **Other conditions** > **Triggered by**。
   - 勾选 "TIMER DONE"。

    ![Automation Triggered by](/home-assistant/images/integrations/reolink/auto_pause__automation_triggered_by.png)

6. 在这个 **Option 1** 下添加动作，动作类型选择 **Select**，然后选择 **First**。
   - 实体选择您的下拉框。
   - 这样在计时器结束后，下拉框会自动回到第一项。
   - 这会让通知自动化重新生效。

    ![Automation Select first](/home-assistant/images/integrations/reolink/auto_pause__automation_select_first.png)

7. 现在设置第一个“暂停通知时长”分支。
   - 在 **Option 2** 下选择 **+ Add Condition** > **Entity** > **State**。
   - **Entity** 选下拉框，**State** 选择第一个暂停时长选项。

   ![Automation Choose](/home-assistant/images/integrations/reolink/auto_pause__automation_choose.png)

8. 在 **+ Add Action** 中选择 **Helpers** > **Timer** > **Start**，并选择您的计时器实体。
   - 勾选 duration，并填入与该选项对应的时长，格式为 `HH:MM:SS`。

    ![Automation Start timer](/home-assistant/images/integrations/reolink/auto_pause__automation_start_timer.png)

9. 接下来只需把 Option 2 复制为与下拉框时间选项数量一致。
   - 每个复制出的分支只需要修改两处：下拉框对应的 **State**（时长选项）以及计时器时长。
   - 可以通过每个分支右侧的三点菜单 `[mdi:dots-vertical]` 快速复制。

10. 最后，将这个功能应用到实际自动化中。
    - 打开您的富通知自动化（或任何想支持“暂停控制”的自动化），添加一个条件。
    - 例如在 **And if** 中选择 **+ Add condition** > **Entity** > **State**，实体选择该下拉框，状态选择第一项 "Notifications Active"。

    ![Condition](/home-assistant/images/integrations/reolink/auto_pause__condition.png)

11. 把下拉框和计时器都添加到仪表板后，就完成了。
    - 下图是“暂停通知”运行中的效果。
    - 若要提前结束，可直接打开计时器并选择 finish。计时器会立即变为 idle，自动化也会把下拉框重置回通知开启状态。

    ![Result when running](/home-assistant/images/integrations/reolink/auto_pause__result_when_running.png)


</details>

- 当有人按下门铃时，在全屋音箱（Echo Dot/Google Home/智能中枢）上播放铃声。
- 当门铃被按下时暂停电视，并在电视上显示通知标记（仅当电视已开启时）。
- 仅在不在家（地理围栏）时播放 Reolink 门铃的快捷回复语音。
- 当某个摄像头/运动传感器检测到事件时，唤醒附近其他电池摄像头并开始录像。
- 当某个摄像头检测到人员、车辆或动物时，联动开启附近其他摄像头的补光灯或警笛。
- 当某个摄像头检测到人员/车辆/动物时，使用 <abbr title="pan, tilt, and zoom">PTZ</abbr> 预设位让其他 <abbr title="pan, tilt, and zoom">PTZ</abbr> 摄像头转向该方向。
- 使用 <abbr title="pan, tilt, and zoom">PTZ</abbr> 预设位和快照操作，制作不同方向的延时序列。
- 根据日出日落时间，或（室外）灯光状态，切换日夜模式（Color / IR Black&White），而不是依赖摄像头内置光照传感器。
- 根据时间和/或在家状态（地理围栏）自动调整摄像头音量。
- 检测到人员/车辆/动物时，提高摄像头帧率和最大码率；1 分钟无检测后再降低。这样可节省存储空间，在 24/7 录像场景下延长保存时长，同时保持事件期间的画质。
- 当摄像头检测到人员时，按顺序并带延时开启靠窗室内灯光，营造“家里有人”的效果。
- 当有人按门铃时，在墙面面板、平板或 Google Home 显示屏上全屏显示摄像头画面。
- 根据日出日落切换摄像头 HDR 模式。
- 创建一个 input boolean helper，一键关闭所有摄像头通知，并在 1 小时后自动重新开启。

## 已知限制

- Reolink Home Assistant 集成暂不支持双向音频或文本转语音（Text-to-speech）。
- 4K 摄像头流通常使用 H265 编码，而浏览器（Chrome/Firefox/Edge/Safari 等）对 H265 的播放支持仍较有限。因此，4K 的 Clear 流在部分浏览器或部分 Home Assistant Companion App 手机端可能无法播放。默认启用的是低分辨率的 Fluent 摄像头实体，Fluent 使用 H264 编码，可在几乎所有浏览器和手机上播放。

## 故障排查

### 无法设置集成

- 旧版固件不会暴露集成运行所需的必要信息。请先将摄像头更新到[最新固件](https://reolink.com/download-center/)后再配置集成。注意，Reolink app/windows/web 客户端里的自动更新或检查更新，常常不会显示最新版本，因此请以在线 [Reolink 下载中心](https://reolink.com/download-center/)为准。
- 在浏览器中测试是否可以通过 IP 访问摄像头：`https://<your-camera-ip>`。若无法访问，请在 [Reolink 手机应用、Windows 或 Mac 客户端](https://reolink.com/software-and-manual/)中确认至少启用了一个 HTTP/HTTPS 端口：手机端路径是 **Settings** > **top camera model box** > **Network Information** > **Advanced**，PC 端路径是 **Settings** > **Network** > **Advanced** > **Port Settings**。更多信息请参阅 Reolink 的[附加说明](https://support.reolink.com/hc/en-us/articles/900000621783-How-to-Set-up-Reolink-Ports-Settings/)。
- 某些摄像头型号需要启用 RTMP 端口，HTTP(S) 端口才能正常工作。如果您在已启用 HTTP/HTTPS 端口的情况下仍出现 `Cannot connect to host` 错误，请同时启用 RTMP 端口。
- 若启用 HTTP/HTTPS 端口后，集成和浏览器仍都无法连接摄像头，可尝试在摄像头上新建一个用户账号；该方法在部分场景下可解决问题。
- Home Assistant 设备与 Reolink 设备之间使用 VLAN 或其他网络隔离是可行的，但配置不当时也容易出问题。请确保未阻断 HTTP（80）、HTTPS（443）、RTMP（1935）、RTSP（554）、ONVIF（8000）和 TCP（9000）通信。排查问题时，建议先将 Reolink 设备临时移到与 Home Assistant 相同的 VLAN，并取消二者之间的网络限制，确认问题是否消失。

### 实体间歇性变为 unavailable

- 请注意，当 **Privacy mode** 设为 ON 时，几乎所有实体（包括移动/AI 检测和视频流）都会变为 unavailable。请先查看 **Privacy mode** 实体历史，确认是否是此原因。
- 建议在路由器中为 Reolink 摄像头/NVR 绑定静态 IP，以避免 IP 变化导致的临时连接问题。
- 不要在 Reolink 设备本机里设置静态 IP。请保持 **Settings** > **Network** > **Network Information** > **Set Up** 下的 **Connection Type** 为 **DHCP**。若在设备中改为 **static**，已知会触发异常 DHCP 请求，导致 Home Assistant 使用错误 IP，从而出现连接问题。该问题源于 Reolink 固件：即使设置了静态 IP，设备仍会持续发送 DHCP 请求。
- Reolink 摄像头可承载的并发连接数量有限。若同时使用 Frigate、Blue Iris、Scrypted 等第三方软件，或同时启用 ONVIF 集成，摄像头可能会断开部分连接，导致实体短暂 unavailable。尤其当这些连接来自与 Home Assistant 相同的主机（同一 IP）时，摄像头更容易混淆并丢弃其中一个连接。若您遇到此问题，请先临时关闭其他连接（如 Frigate）进行验证。若确认为此原因，可尝试把第三方软件迁移到另一台主机（不同 IP），通常能改善问题。也可以尝试在 Home Assistant 和/或第三方软件中改用 <abbr title="flash video">FLV</abbr> 协议，该协议对摄像头资源占用更低。
- 如果 Reolink 实体只是短时间变为 unavailable，可能是摄像头请求过载导致短暂掉线。请先检查集成是否已使用 `ONVIF push`，而不是 `ONVIF long polling`（资源占用较高）或 `Fast polling`（资源占用很高），详见[降低移动事件延迟](#reducing-latency-of-motion-events)。此外，可尝试切换到资源占用最低的 <abbr title="flash video">FLV</abbr> 流协议，详见[选项](#options)。

### 电池耗电过快

Reolink Home Assistant 集成理论上只会每 6 小时唤醒一次电池摄像头（持续几秒），或在电池摄像头自行唤醒时进行数据更新（最多每小时一次）。这通常不会明显影响续航。您可以通过 **Sleep status** 实体确认是否工作正常。不过，以下因素会显著增加耗电：

- 请确认所有电池摄像头实体都关闭了 **Preload camera stream**：路径为 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) > Reolink 集成卡片 > **x devices** > 选择电池摄像头 > 选择摄像头流（对所有启用流都要检查）> 齿轮图标 `[mdi:cog-outline]`。开启 Preload camera stream 会长期保持活动视频流，导致摄像头持续唤醒并快速耗电。
- 请确认 **Manual Record** 开关为关闭状态。该开关开启时，摄像头会持续唤醒并录像，频繁使用会明显增加耗电。
- 使用电池摄像头实体的 **Automations** 可能会唤醒摄像头。修改设置或请求快照会让电池摄像头唤醒 10-30 秒。若自动化触发过于频繁，也会造成额外耗电。
- 已知某些用于仪表板看流的 **Custom cards** 会让电池摄像头持续唤醒，从而加速耗电。
- 当您打开包含 Reolink 电池摄像头 picture-entity 卡片的 **dashboard** 时，摄像头会被唤醒以提供最新快照和/或视频流。因此建议将这些卡片放在单独的仪表板/标签页中，仅在确实需要查看时再进入。

### 视频流或录像无法播放

- 大多数 Reolink 摄像头为了节省存储和带宽，会在高分辨率录像与 Clear 流中使用 H265 编码。并非所有浏览器或应用都支持 H265 播放，因此高分辨率录像和/或 Clear 流可能无法在您的所有终端上正常播放。若要确认摄像头使用的是 H264 还是 H265，请[下载诊断文本文件](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)，并在文本中查找 `"encoding main": "h265"\"h264"`。低分辨率录像与 Fluent 流始终使用 H264，因此通常不会受此问题影响。

### 降低移动事件延迟 {#reducing-latency-of-motion-events}

相比 ONVIF long polling，TCP push 和 ONVIF push 会让移动/AI 二进制传感器状态变化更快一些。
另外，TCP push 和 ONVIF push 对摄像头资源占用也低于 ONVIF long polling 或 fast polling，因此通常连接问题更少。
TCP push 没有额外要求；但 ONVIF push 有一些网络配置前提：

- Reolink 设备无法把 ONVIF 移动事件推送到 HTTPS 地址（SSL）。
因此，请在 [网络设置](https://my.home-assistant.io/redirect/network/) 的 **Home Assistant URL** 中配置一个 Home Assistant 可访问的（本地）HTTP 地址。
例如可填写 `http://192.168.1.10:8123`，其中 `192.168.1.10` 是 Home Assistant 设备的 IP。

- 由于需要 HTTP 地址，Reolink push 与全局 SSL 证书不兼容。
因此，请确认在 [`configuration.yaml` 的 HTTP 配置](/home-assistant/integrations/http/#ssl_certificate)中未启用全局 SSL 证书。
如果您仍希望外网连接强制使用 SSL，可改用 [NGINX 插件](https://github.com/home-assistant/addons/tree/master/nginx_proxy) 或 [NGINX Proxy Manager 插件](https://github.com/hassio-addons/addon-nginx-proxy-manager)来实现，而不是启用全局 SSL。

若要确认 Reolink 集成当前使用的是 `TCP push`、`ONVIF push`、`ONVIF long polling` 还是 `Fast polling`，请[下载诊断文本文件](/home-assistant/docs/configuration/troubleshooting/#download-diagnostics)，并在文本中查找 `"event connection": "TCP push"\"ONVIF push"\"ONVIF long polling"\"Fast polling"`。
