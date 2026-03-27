---
title: Fully Kiosk Browser
description: 'Fully Kiosk Browser(https://www.fully-kiosk.com) 是一款功能强大的 Android 设备信息亭浏览器。它提供多种用于监控和控制 Android 设备的功能。通过此集成，您可以在 Home Assistant 中控制设备并查看其状态。'
ha_category:
  - Binary sensor
  - Camera
  - Notifications
  - Sensor
  - Switch
ha_release: 2022.9
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@cgarwood'
ha_domain: fully_kiosk
ha_platforms:
  - binary_sensor
  - button
  - camera
  - diagnostics
  - image
  - media_player
  - notify
  - number
  - sensor
  - switch
ha_integration_type: device
ha_dhcp: true
ha_quality_scale: bronze
---
# Fully Kiosk Browser

[Fully Kiosk Browser](https://www.fully-kiosk.com) 是一款功能强大的 Android 设备信息亭浏览器。它提供多种用于监控和控制 Android 设备的功能。通过此集成，您可以在 Home Assistant 中控制设备并查看其状态。

## 要求

此集成要求您在 Fully Kiosk Browser 应用中启用 Fully Remote Admin 功能。该功能需要付费的 Fully Plus 许可证。您可以免费试用，但 Fully Kiosk Browser 会在设备上显示水印。

您需要知道设备的 IP 地址，以及您在 Fully Kiosk Browser 应用中设置的 Fully Remote Admin 密码。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: 您设备的 IP 地址或主机名。
Password:
  description: 来自 Fully Kiosk Browser 应用的 Fully Remote Admin 密码。
Uses an SSL certificate:
  description: Fully Kiosk Browser 是否已配置为在连接时使用 SSL 证书。
Verify SSL certificate:
  description: 连接到 Fully Kiosk Browser 时是否验证 SSL 证书。若使用自签名证书，应关闭此项。
```

## 功能

以下内容可作为传感器使用：

- 设备是否已接通电源
- 信息亭模式是否启用
- 电池电量
- 当前页面
- 当前前台应用
- 设备可用存储空间
- 设备可用内存

可用控制项包括：

- 将 Fully Kiosk 切换到前台
- 将 Fully Kiosk 切换到后台
- 加载起始 URL
- 重启 Fully Kiosk Browser 应用
- 重启设备（需要 root）
- 打开或关闭维护模式
- 锁定或解锁信息亭模式
- 打开或关闭移动侦测
- 打开或关闭屏保
- 设置屏保计时器
- 设置屏保亮度
- 打开或关闭屏幕
- 设置熄屏计时器
- 设置屏幕亮度
- 播放和停止媒体文件
- 设置设备音量
- 清除 Fully Kiosk Browser 缓存

以下内容可作为摄像头实体使用：

- 摄像头（仅当 **Motion detection** 设为 **On** 时，摄像头才能在 Fully Kiosk 中工作）。

以下内容可作为图像实体使用：

- 屏幕截图

以下通知实体可用于 `notify.send_message` 动作：

- 文本转语音
- 覆盖消息

:::note
Fully Kiosk Browser 应用不会返回设备音量或媒体播放状态，因此我们无法显示当前音量级别或播放状态。

:::
## 动作

**动作 `load_url`**

您可以使用 `fully_kiosk.load_url` 动作让平板打开指定 URL。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `device_id` | 是 | 要加载该 URL 的设备 ID（或设备 ID 列表） |
| `url` | 是 | 要加载的 URL |

示例：

```yaml
action: fully_kiosk.load_url
data:
  url: "https://home-assistant.io"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

**动作 `set_config`**

您可以使用 `fully_kiosk.set_config` 动作修改 Fully Kiosk Browser 的多种配置参数。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `device_id` | 否 | 要应用配置的设备 ID（或设备 ID 列表） |
| `key` | 否 | 配置参数键名。可用键名列表可在 Fully Kiosk Browser 远程管理面板中选择 **Show keys** 查看 |
| `value` | 否 | 要设置的配置参数值 |

示例：

```yaml
action: fully_kiosk.set_config
data:
  key: "startURL"
  value: "https://home-assistant.io"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

**动作 `start_application`**

您可以使用 `fully_kiosk.start_application` 动作让平板启动指定应用。

| 数据属性 | 可选 | 说明 |
| -------- | ---- | ---- |
| `device_id` | 是 | 要启动应用的设备 ID（或设备 ID 列表） |
| `application` | 是 | 要启动应用的包名 |

示例：

```yaml
action: fully_kiosk.start_application
data:
  application: "de.ozerov.fully"
target:
  device_id: a674c90eca95eca91f6020415de07713
```

## 移除集成

此集成遵循标准的集成移除流程，不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
