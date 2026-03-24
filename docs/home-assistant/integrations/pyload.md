---
title: pyLoad
description: 关于如何将 pyLoad 下载管理器与 Home Assistant 集成的说明。
ha_category:
  - Downloading
ha_release: 0.58
ha_iot_class: Local Polling
ha_domain: pyload
ha_codeowners:
  - '@tr4nt0r'
ha_platforms:
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
ha_config_flow: true
ha_quality_scale: platinum
---

The [**pyLoad**](https://pyload.net/) integration enables monitoring your downloads directly in Home Assistant. This integration provides various sensors to keep track of your download activities and allows creating automations based on the sensor information, alongside button and switch controls for performing specific tasks such as aborting downloads and managing file restarts.

## 关于 pyLoad

**pyLoad** is an open-source download manager designed for always-on devices like home servers, NAS systems, and routers. It supports various file hosts, container formats, and web standards, enabling fully automated, unattended downloads. With its web interface, pyLoad allows for easy remote management from any device.

## 此集成的使用方式

The **pyLoad** integration allows you to monitor and control your downloads directly from Home Assistant. Here are some ways you can use it:

- **Track active downloads** – Send a notification when all downloads are complete or if the queue is empty.
- **Free space alerts** – Set up an automation to alert you when disk space is low, ensuring downloads don’t fail due to storage issues.
- **Pause downloads** – Automatically pause downloads when streaming or gaming to avoid bandwidth congestion, then resume them later.

## 先决条件

To set up the pyLoad integration, you must have a running pyLoad instance on your home server, NAS, or any other device. An always-on device is recommended. Ensure that pyLoad's web interface is accessible for Home Assistant.

If you haven't set up pyLoad yet, an easy way to get it up and running is by installing the [pyLoad-ng app for Home Assistant](https://github.com/tr4nt0r/pyload-ng).

- During the setup process in Home Assistant, you will need:
  - pyLoad account credentials – A valid *username* and *password* to authenticate with pyLoad.
  - The full URL of your pyLoad web interface, including the protocol (HTTP or HTTPS), hostname or IP address, port (pyLoad uses 8000 by default), and any path prefix if applicable.

:::note
The account used for integration must either be an admin account or one with at least the following permissions: `DELETE`, `STATUS`, `LIST`, and `MODIFY`. You can set up and manage users and permissions under **Settings -> Users** in the pyLoad web interface.


:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
URL:
  description: "The full URL of the pyLoad web interface, including the protocol (HTTP or HTTPS), hostname or IP address, port, and any path prefix if applicable. Example: `https://example.com:8000/path`"
Verify SSL certificate:
  description: "If checked, the SSL certificate will be validated to ensure a secure connection."
Username:
  description: "The username used to access the pyLoad instance."
Password:
  description: "The password associated with the pyLoad account."
```

## 传感器

- **Speed**: Monitors the current download speed.
- **Active downloads**: Indicates the number of files pyLoad is actively downloading
- **Downloads in queue**: Shows the number of downloads currently in the queue.
- **Finished downloads**: Indicates the number of completed downloads.
- **Free space**: Shows the available disk space in the download directory.

## 按钮

- **Abort all running downloads**: Aborts all currently running downloads.
- **Delete finished files/packages**: Deletes all finished files and packages.
- **Restart all failed files/packages**: Restarts all failed downloads.
- **Restart pyLoad core**: Restarts the pyLoad core.

## 开关

- **Pause/Resume Queue**: Pauses or resumes the download queue. When paused, active downloads will continue, but new downloads in the queue will not start.
- **Auto-reconnect**: If configured, enables pyLoad to automatically reconnect the internet connection.

## 自动化示例

可参考以下自动化示例快速开始。

### 磁盘空间不足时暂停下载

This automation will pause new downloads when your available disk space falls below 5 GB.

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Monitor pyLoad download queue"
description: "当磁盘空间不足时暂停新的下载。"
triggers:
  - trigger: numeric_state
    entity_id: sensor.pyload_free_space
    below: 5000000000  # Trigger when free space drops below 5 GB (in bytes)
actions:
  - action: switch.turn_off
    target:
      entity_id: switch.pyload_pause_resume_queue
  - action: notify.persistent_notification
    data:
      message: "Free space is low, pausing pyLoad queue."
mode: single
```


</details>

### 观看 Netflix 时停止 pyLoad 下载

This automation halts all active pyLoad downloads when watching Netflix on your media player.

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Halt pyLoad downloads when watching Netflix"
description: "Halt all pyLoad downloads when Netflix streaming starts on the media player."
triggers:
- trigger: state
  entity_id: media_player.android_tv
  to: playing
conditions:
- condition: state
  entity_id: media_player.android_tv
  attribute: app_id
  state: com.netflix.ninja
actions:
- action: button.press
  target:
    entity_id: button.pyload_abort_all_running_downloads
- action: notify.persistent_notification
  data:
    message: "pyLoad downloads have been halted because Netflix streaming started."
mode: single
```


</details>

## 数据更新

This integration polls your **pyLoad** instance every 20 seconds. If you prefer a different update frequency, you can define a **custom polling interval** — see [Defining a custom polling interval](/home-assistant/common-tasks/general/#defining-a-custom-polling-interval) for details.

## 已知限制

- **Paused downloads**: When the download queue is paused, active downloads will continue, but new downloads in the queue will not start until the queue is resumed.
- **Halt all downloads**: To completely halt downloading, use the `Abort all running downloads` action. The `Restart failed files/packages` action will also resume any aborted downloads.

## 故障排除

In any case, when reporting an issue, please enable [debug logging](/home-assistant/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue reoccurs, stop the debug logging again (*download of debug log file will start automatically*). Further, if still possible, please also download the [diagnostics](/home-assistant/integrations/diagnostics) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## 删除集成

This integration can be removed by following these steps:

### 从 Home Assistant 中删除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
