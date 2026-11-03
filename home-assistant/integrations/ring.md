# Ring

**Ring** 集成允许您在 Home Assistant 中控制 [Ring.com](https://ring.com/) 门铃、Stick Up Cam、Chime 和对讲设备。

## 集成用途

Ring 集成可以完成很多事情，例如根据日程或事件开关设备、查看摄像头实时画面，以及手动或通过自动化控制设备配置。

## 先决条件

您需要先通过 Ring 应用完成新购设备的初始化，这要求您在 [Ring.com](https://ring.com/) 或官方应用中创建 Ring 账户。
之后，您将使用 Ring 账户凭据在 Home Assistant 中登录 Ring 云服务。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
  description: |
    Your Ring account username.
Password:
  description: |
    Your Ring account password.
2fa:
  description: |
    Account verification code via the method selected in your Ring account settings.
```

## 支持的设备

目前在 Home Assistant 中支持以下设备类型：

* **Doorbells**: Doorbell, Doorbell 2, Doorbell 3, Doorbell 3 Plus, Doorbell 4, Doorbell Pro, Doorbell Pro 2, Doorbell Elite, Doorbell Wired, Battery Doorbell, Doorbell (2nd Gen), Peephole Cam
* **Stickup cams**: Floodlight Cam, Floodlight Cam Pro, Floodlight Cam Plus, Indoor Cam, Indoor Cam (2nd Gen), Spotlight Cam Battery, Spotlight Cam Wired, Spotlight Cam Plus, Spotlight Cam Pro, Stick Up Cam, Stick Up Battery, Stick Up Wired, Stick Up Cam (3rd Gen)
* **Chimes**: Chime, Chime Pro
* **Intercoms**: Intercom

## 支持的功能

### 二进制传感器

当发生移动侦测、门铃响起或对讲解锁事件时，二进制传感器会在开和关之间切换。

二进制传感器正在被 event 实体替代，您应在 2025.4.0 版本前将相关自动化迁移到 event 实体。

### 按钮

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用按钮平台。目前支持通过对讲开门。

### 摄像头

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用摄像头平台。
目前支持门铃和 Stick Up 摄像头。
会提供两个摄像头实体：`live_view` 和 `last_recording`。
`last_recording` 默认禁用。

:::important
请注意，从 `last_recording` 摄像头下载和播放 Ring 视频需要 Ring Protect 套餐。

:::

### 事件

event 实体会捕获门铃响铃、移动警报和对讲解锁等事件。

### 传感器

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用传感器平台。目前支持电池电量和 Wi-Fi 信号。

音量传感器正在被 number 实体替代，后者允许直接设置音量。您应在 2025.4.0 版本前将使用音量传感器的自动化迁移到 number 实体。

### 警笛

* 为每个支持警笛的摄像头添加一个 siren 实体。请注意，警笛只会开启 30 秒，随后自动关闭。
* 为 chime 添加一个 siren 实体以播放测试声音。

### 开关

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用开关平台。

* Motion detection - 为摄像头开启或关闭移动侦测。
* In-home chime - 开关连接到 Ring 门铃的机械或数字门铃铃声。

### 灯光

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用灯光平台。对于每个支持灯光的摄像头（例如泛光灯摄像头），都会添加一个灯光实体。

### 数值实体

启用 [Ring 集成](/home-assistant/integrations/ring.md)后，您就可以使用 number 平台。
目前支持显示和设置门铃/chime 铃声音量、对讲语音音量和对讲麦克风音量。

## 数据更新

Ring 云 API 每 60 秒会被 polled 一次以获取数据更新。当您通过 Home Assistant 做出更改时（例如开启移动侦测），设备状态会立即更新，而无需等待下一次 poll。
Ring 集成不会在本地直接连接设备，所有通信都通过云端进行。

## 已知限制

### 双向音频

目前不支持在摄像头实时画面中使用双向音频。

### 最后录像

要查看最后录像实体，您需要拥有 Ring 订阅。

### 多重警报

某些设备型号会为一次门铃响铃事件发送两条警报。
未来版本中，此集成将为此提供解决方案。

## 故障排除

### 实时事件稳定性

Home Assistant 需要能够向外连接 TCP 5228 端口，才能接入 Ring 的实时事件服务。
请确保您的防火墙和网络配置允许该连接。

如果实时事件无法正常工作，请按以下步骤排查。

#### 步骤 1

Ring 警报问题可能是由于您的 Ring 账户中已认证设备过多导致的。在 2023.12.0 之前的版本中，Home Assistant 的 Ring 集成每次重启都会在 [ring.com](https://account.ring.com/account/control-center/authorized-devices) 的 `Control Center` 里 `Authorized Client Devices` 中注册一个新条目。

:::important
清理设备时：

1. 仅删除以 `ring-doorbell:HomeAssistant` 或 `Python` 开头的条目。
2. 不要删除您的手机或其他 Ring 应用对应的条目。
3. 如果设备太多无法逐个删除，可以使用 **Remove all devices** 选项，但之后您需要重新授权所有设备。

:::

#### 步骤 2

如果完成步骤 1 后问题仍然存在，请尝试为 Home Assistant Ring 集成实例生成一个新的唯一 ID。
为此，请在该集成条目上点击三点 `[mdi:dots-vertical]` 菜单，并选择 **Reconfigure**。
在按照步骤 1 清理多余的 `Authorized Client Devices` 之前，不要执行此步骤，否则只会使重新配置后的条目失效。

#### 步骤 3

如果完成步骤 1 和 2 后警报仍然无效，请尝试切换 Motion Warning 设置：

1. 前往 [ring.com](https://ring.com) 并登录。
2. 选择您的设备。
3. 进入 **Device Settings**。
4. 找到 **Motion Warning** 开关。
5. 将其关闭并等待 30 秒。
6. 再重新打开。

这一方法已成功帮助许多用户恢复警报功能。

## 示例

### 自动化思路

* 离家时（通过地理围栏）为室内摄像头开启移动侦测，回家时关闭。
* 当门铃响起时，在某个设备上开始播放实时画面。
* 当您在花园里时，提高数字 chime 的音量。

### 设置门铃提醒

您可以在 Home Assistant UI 中设置自动化。

1. 在 **Entity triggers** 下找到正确的 **event** 实体。
2. 在 **From** 中选择 **Any state (ignoring attribute changes)**。
3. 然后在 **Notifications** 下添加 **Send notification** 操作。

这样会生成类似如下的 YAML：

```yaml
alias: Doorbell alerts
description: ""
triggers:
  - trigger: state
    entity_id:
      - event.front_door_ding
    from: null
conditions: []
actions:
  - device_id: internalhadeviceid
    domain: mobile_app
    type: notify
    message: Front door ding
    title: Front door ding
mode: single
```

### 保存 Ring Door Bell 捕获的视频

您可以结合使用 [downloader](/home-assistant/integrations/downloader.md) 与 [automation](/home-assistant/integrations/automation.md) 或 [python\_script](/home-assistant/integrations/python_script.md)，将 Ring Door Bell 捕获的最新视频保存到本地。
首先，在配置中启用 [downloader](/home-assistant/integrations/downloader.md) 集成，将以下内容添加到 `configuration.yaml`。

```yaml
downloader:
  download_dir: downloads
```

然后，您可以结合自己系统中的实体使用以下自动化，它会将视频文件保存到 `<config>/downloads/<camera_name>/<camera_name>.mp4`：

```yaml
automation:
  alias: "Save the video when the doorbell is pushed"
  triggers:
  - trigger: state
    entity_id: event.front_doorbell_ding
    from: null
  actions:
  - delay:
    hours: 0
    minutes: 5
    seconds: 0
    milliseconds: 0
  - action: downloader.download_file
    data:
      overwrite: true
      url: "{{ state_attr('camera.front_door_last_recording', 'video_url') }}"
      subdir: "{{state_attr('camera.front_door_last_recording', 'friendly_name')}}"
      filename: "{{state_attr('camera.front_door_last_recording', 'friendly_name')}}.mp4"
```

您可以根据需要调整子目录和文件名。例如，可以为下载文件加入日期、时间和扩展名：

```yaml
    data:
      url: "{{ state_attr('camera.front_door_last_recording', 'video_url') }}"
      subdir: "{{ state_attr('camera.front_door_last_recording', 'friendly_name') }}/{{ now().strftime('%Y.%m') }}"
      filename: "{{ now().strftime('%Y-%m-%d-at-%H-%M-%S') }}.mp4"
```

上述修改会将视频保存到 `<config>/downloads/<camera_name>/YYYY-MM/YYYY-MM-DD-at-HH-MM-SS.mp4`。您可以根据本地化格式调整日期格式。

如果您想使用 `python_script`，请先在 "`configuration.yaml`" 文件中启用它：

```yaml
python_script:
```

之后，您可以使用以下 `python_script` 来保存视频文件：

```python
# obtain ring doorbell camera object
# replace the camera.front_door by your camera entity
ring_cam = hass.states.get("camera.front_door_last_recording")

subdir_name = f"ring_{ring_cam.attributes.get('friendly_name')}"

# get video URL
data = {
    "url": ring_cam.attributes.get("video_url"),
    "subdir": subdir_name,
    "filename": ring_cam.attributes.get("friendly_name"),
}

# call downloader integration to save the video
hass.services.call("downloader", "download_file", data)
```

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
