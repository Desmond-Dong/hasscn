# Agent DVR

[Agent DVR](https://www.ispyconnect.com/download.aspx/) 是一款适用于 Windows 10、Mac 和 Linux 的免费\* 软件 DVR 解决方案。Agent DVR 作为服务或控制台应用程序运行，可以访问和控制大量第三方摄像头，具有高级运动检测功能，包括用于对象识别的 DeepStack 集成。iSpyConnect 网站提供安全的 (SSL) 远程访问，无需端口转发。

您可以使用服务器的 IP 地址和端口通过集成添加 Agent DVR，例如：`http://192.168.1.3:8090/`。如果您在 Agent DVR 服务器配置中启用了"Protect API"，则可以在 URL 中提供用户名和密码，例如 `http://username:password@192.168.1.3:8090`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
请确保您使用的是 Agent DVR v2.6.1.0 +

:::

## 报警控制面板

报告当前报警状态，可用于布防和撤防系统。

## 动作

加载后，`agent_dvr` 集成将公开可用的动作。`entity_id` 动作属性可以指定一个或多个特定摄像头。

可用动作：
`enable_alerts`、`disable_alerts`、
`start_recording`、`stop_recording`、
`turn_on`、`turn_off`、`toggle`、`enable_motion_detection`、`disable_motion_detection`

### 动作：启用警报 / 禁用警报

`agent_dvr.enable_alerts` 和 `agent_dvr.disable_alerts` 动作用于在 Agent DVR 中启用或禁用设备的警报事件。

数据属性 | 可选 | 描述
-|-|-
`entity_id` | 否 | 实体名称，例如 `camera.living_room_camera`。

### 动作：开始录制 / 停止录制

`agent_dvr.start_recording` 和 `agent_dvr.stop_recording` 动作用于开始或停止设备录制。

数据属性 | 可选 | 描述
-|-|-
`entity_id` | 否 | 实体名称，例如 `camera.living_room_camera`。

### 动作：打开 / 关闭 / 切换

`agent_dvr.turn_on`、`agent_dvr.turn_off` 和 `agent_dvr.toggle` 动作用于在 Agent DVR 中打开、关闭或切换设备启用状态。

数据属性 | 可选 | 描述
-|-|-
`entity_id` | 否 | 实体名称，例如 `camera.living_room_camera`。

## iframe

* 使用网页卡片，您可以直接在 Home Assistant 中嵌入 Agent DVR 查看器。只需将其指向 <https://www.ispyconnect.com/app/>

<p class='img'>
<img src='/home-assistant/images/screenshots/agent_dvr.jpg' />
</p>

\*Agent 提供额外的服务，如安全远程访问（无需端口转发）和云上传，通过订阅服务提供。
