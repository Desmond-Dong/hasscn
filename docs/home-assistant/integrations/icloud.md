---
title: Apple iCloud
description: 关于如何使用 iCloud 在 Home Assistant 中跟踪设备的说明。
ha_category:
  - Presence detection
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '0.10'
ha_config_flow: true
ha_codeowners:
  - '@Quentame'
  - '@nzapponi'
ha_domain: icloud
ha_platforms:
  - device_tracker
  - sensor
ha_integration_type: hub
---

**Apple iCloud** 集成允许您使用 [iCloud](https://www.icloud.com/) 服务检测存在。iCloud 允许用户在 iOS 设备上跟踪其位置。

目前 Home Assistant 支持以下平台：

- [设备跟踪器](#设备跟踪器)
- [传感器](#传感器)

它要求您的设备已注册 [查找](https://www.apple.com/icloud/find-my/) 服务。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::warning
如果集成配置不当，您可能会收到来自 Apple 的重复电子邮件和通知，说明有人已登录您的账户。如果发生这种情况，请在 iOS 设备上选择 `不允许`，并在提示时重新配置集成凭据。

对于通知，按"允许"，然后"确定"。

:::
为了防止过度耗电，对每个设备使用动态间隔，而不是对链接到一个账户的所有设备使用固定间隔。动态间隔基于设备的当前区域、到家的距离和设备的电池电量。

## 双重认证

:::important
您需要使用[应用专用密码](https://support.apple.com/102654)来设置此集成。

:::
## 故障排除

删除集成的配置（很可能在 `/config/.storage/icloud` 中），然后重试。

## 平台

### 设备跟踪器

iCloud 集成将跟踪您的 iCloud 账户上的可用设备。

### 传感器

iCloud 集成将为您的 iCloud 账户上可用的每个 iCloud 设备添加电池传感器。

## 动作

有 4 个可用动作：

### 动作：更新

`icloud.update` 动作请求更新某个 iDevice 或链接到 iCloud 账户的所有设备。该请求将导致新的 Home Assistant [state_changed](/home-assistant/docs/configuration/events/#event-state_changed) 事件描述当前 iPhone 位置。它可以在需要手动位置更新时用于自动化中，例如，当门打开时检查是否有人在家。

### 动作：播放声音

`icloud.play_sound` 动作在您的 iDevice 上播放丢失的 iPhone 声音。即使您处于"静音"或"勿扰"模式，它仍会响铃。

| 数据属性    | 可选 | 描述                                             |
|---------------------------|----------|---------------------------------------------------------|
| `account`                 |       否 | iCloud 账户的电子邮件地址                    |
| `device_name`             |       否 | 友好的设备名称，如 Bob 的 iPhone            |

### 动作：显示消息

`icloud.display_message` 动作在您的 iDevice 上显示消息。它也可以让您的设备响铃。

### 动作：丢失设备

`icloud.lost_device` 动作将您的 iDevice 置于"丢失"模式（仅限兼容设备）。您必须提供带有后缀[国家代码](https://en.wikipedia.org/wiki/List_of_country_calling_codes)的电话号码和一条消息。