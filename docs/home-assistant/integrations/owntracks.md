---
title: OwnTracks
description: 关于如何在 Home Assistant 中使用 OwnTracks 跟踪设备的说明。
ha_category:
  - Presence detection
ha_iot_class: Local Push
ha_release: 0.7.4
ha_config_flow: true
ha_domain: owntracks
ha_platforms:
  - device_tracker
ha_integration_type: service
---

[OwnTracks](https://owntracks.org/) 是一款免费开源的 iOS 和 Android 应用程序，允许您跟踪您的位置并将其直接发送到 Home Assistant。可以通过 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)** 设置 OwnTracks。

默认情况下，集成通过 HTTP 监听来自 OwnTracks 的传入消息。如果 Home Assistant 配置为使用 MQTT，它将监听 MQTT 消息。当通过 HTTP 提交位置时，Home Assistant 会返回所有 [人员](/home-assistant/integrations/person/) 的最后已知位置。他们的位置将显示在 OwnTracks 应用中。

## 配置

1. 要在 Home Assistant 中设置 OwnTracks，请转到 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**。
2. 添加 **OwnTracks** 集成。
   - 这将为您提供 **Webhook** URL 以及在移动设备配置期间使用的 **加密密钥**（见下文）。

### 配置应用 - Android

1. 安装 [OwnTracks](https://play.google.com/store/apps/details?id=org.owntracks.android) Android 应用程序。
   - 如果您需要不含 Google Play Services 的 OwnTracks 版本，"OSS" 版本可在[此处](https://github.com/owntracks/android/releases)获取。

2. 在应用中，打开侧边栏并选择 **Preferences**，然后选择 **Connection**。
3. 更改以下设置：

   - **Mode**：HTTP
   - **Host**：`<设置集成时提供给您的 URL>`
   - **Identification**：
     - **Username**：`<用户名>`：您可以为 OwnTracks 编造一个。
     - **Password**：可以留空。
     - **Device ID**：`<设备名称>`：帮助您记住哪个设备用于 OwnTracks 的内容。
     - **Tracker ID**：`<xx>` 两个字符的跟踪器 ID。（可以留空）

4. 您的跟踪器设备将在 Home Assistant 中被称为 `<Username>_<Device name>`。如果您输入了 Tracker ID，`tid` 属性将设置为该 ID。

### 配置应用 - iOS

1. [安装 OwnTracks iOS 应用程序。](https://apps.apple.com/app/id692424691)
2. 在 OwnTracks 应用中，点击左上角的 (i) 并选择 **Settings**。
3. 更改以下设置：

   - **Mode**：HTTP
   - **URL**：`<设置集成时提供给您的 URL>`
   - 打开身份验证
   - **User ID**：`<您的名字>`。您可以为 OwnTracks 编造一个。

## 高级配置

OwnTracks 允许用户通过在 "`configuration.yaml`" 中添加部分来设置高级配置。

```yaml
# Example configuration.yaml entry
owntracks:
```

```yaml
max_gps_accuracy:
  description: 有时 OwnTracks 可能报告精度非常低（几公里）的 GPS 位置。这可能会在您的 Home Assistant 安装中触发错误的区域判定。使用此参数，您可以过滤这些 GPS 报告。数字必须以米为单位。例如，如果您输入 200，只有精度为 200 米的 GPS 报告才会被考虑。
  required: false
  type: integer
waypoints:
  description: "OwnTracks 用户可以定义[航点](https://owntracks.org/booklet/features/waypoints/)（也称为区域），其精神类似于 Home Assistant 区域。如果此配置变量为 `true`，则列在 `waypoint_whitelist` 中的 OwnTracks 用户可以从设备导出航点。Home Assistant 将导入这些航点作为区域定义。"
  required: false
  default: true
  type: boolean
waypoint_whitelist:
  description: "可以从 OwnTracks 向 Home Assistant 导出航点的用户名列表（如 [OwnTracks](/home-assistant/integrations/owntracks) 所定义）。这将是 Base Topic Name 的 `username` 部分（例如 owntracks/username/iPhone）。"
  required: false
  default: 所有通过 OwnTracks 连接到 Home Assistant 的用户。
  type: list
secret:
  description: "[负载加密密钥](https://owntracks.org/booklet/features/encrypt/)。这在与第三方不受信任的服务器或公共服务器（任何人都可以订阅任何主题）通信时很有用。默认情况下，负载被假定为未加密（尽管 Home Assistant 与服务器之间的通信可能仍然加密）。此功能需要存在 `libsodium` 库。"
  required: false
  type: string
mqtt_topic:
  description: 订阅 MQTT 实例上 OwnTracks 更新的主题。
  required: false
  default: owntracks/#
  type: string
events_only:
  description: Home Assistant 将忽略所有位置更新，仅依赖地理围栏进入/离开事件。
  required: false
  type: boolean
  default: false
region_mapping:
  description: "将 OwnTracks 应用中配置的区域名称重新映射到 Home Assistant 区域的字典。如果您有多个家庭或 Home Assistant 实例，并希望将不同的标签映射到 'home'，请使用此选项。`key: value` 将 OwnTracks 区域 `key` 映射到 Home Assistant 区域 `value`。"
  required: false
  type: list
```

`owntracks` 平台的完整配置示例如下所示：

```yaml
# Example configuration.yaml entry
owntracks:
  max_gps_accuracy: 200
  waypoints: true
  mqtt_topic: "owntracks/#"
  events_only: true
  waypoint_whitelist:
    - jon
    - ram
  region_mapping:
    cabin: home
    office: work
```

## 使用 OwnTracks 区域

OwnTracks 可以跟踪区域，并向 Home Assistant 发送区域进入和退出信息。为此，请在 OwnTracks 应用中设置一个区域。确保在 Home Assistant 区域中使用相同的名称。在为区域添加坐标时，请注意 OwnTracks 中 **Radius** 使用的单位是*米*。有关更多信息，请参阅 [OwnTracks 文档](https://owntracks.org/booklet/guide/waypoints/)。

Home Assistant 使用进入和离开消息来设置您的区域位置。当您进入时，您的位置将被设置到区域的中心。当您在区域内时，来自 OwnTracks 的位置更新将被忽略。

当您退出区域时，Home Assistant 将开始使用位置更新再次跟踪您。为确保 Home Assistant 正确退出区域（它根据您的 GPS 坐标计算），您可能希望将 HA 中的区域半径设置为比 OwnTracks 区域半径稍小。

## 使用 OwnTracks 区域 - 使用 iBeacon 强制 OwnTracks 更新

:::note
OwnTracks v2.0.0 移除了对 Android 上 iBeacon 的支持。

:::
当以通常的*显著变化模式*运行时（这对手机电池友好），OwnTracks 有时不会像您希望的那样快速更新您的到达区域位置。如果您想在回家时触发自动化，这可能很烦人。您可以使用 iBeacon 改善这种情况。

iBeacon 是简单的蓝牙设备，发送"我在这里"的消息。iOS 和某些 Android 设备支持它们。OwnTracks 在[这里](https://owntracks.org/booklet/guide/beacons/)有更多说明。

当您进入 iBeacon 区域时，OwnTracks 将向 HA 发送 `region enter` 消息，如上所述。因此，如果您想在到达家时触发事件，可以在前门外放置一个 iBeacon。如果您设置一个名为 `home` 的 OwnTracks iBeacon 区域，那么靠近信标将触发向 HA 的更新，将您的区域设置为 `home`。

当您退出 iBeacon 区域时，HA 将切换回使用 GPS 来确定您的位置。根据您的区域大小和 GPS 位置的准确性，这可能会更改您的 HA 区域。

有时 OwnTracks 会与 iBeacon 断开连接几秒钟。如果您以 `-` 开头命名您的信标，OwnTracks 将等待更长时间才决定它已退出信标区域。HA 在将 OwnTracks 区域与区域匹配时将忽略 `-`。因此，如果您将 OwnTracks 区域命名为 `-home`，HA 将将其识别为 `home`，但您将拥有更稳定的 iBeacon 连接。

## 使用 OwnTracks iBeacon 跟踪设备

iBeacon 不需要是固定的。您可以将一个放在钥匙扣上，或放在车里。

当您的手机看到一个它知道的移动 iBeacon 时，它会告诉 HA 该 iBeacon 的位置。如果您在连接到 iBeacon 时移动手机，HA 将更新 iBeacon 的位置。但当您的手机失去连接时，HA 将停止更新 iBeacon 位置。

要将移动 iBeacon 与 HA 一起使用，您只需设置一个与您的区域名称不匹配的区域。如果 HA 看到与区域名称不匹配的 iBeacon 区域的进入事件（例如 `keys`），它将开始跟踪它，调用设备 `device_tracker.beacon_keys`）。

这允许您为无法自我跟踪的设备编写区域自动化（例如，*如果我离开房子但钥匙还在家里，请提醒我*）。另一个例子是*如果我的车到家，打开大门*。

## 同时使用移动和固定 iBeacon

您可以同时使用两种类型的 iBeacon，因此如果您有一个区域 `drive`，其 iBeacon 区域名为 `-drive`，并且您带着名为 `-car` 的移动 iBeacon 到家，那么 `device_tracker.beacon_car` 将被设置为 `drive` 状态。

## 将 OwnTracks 航点导入为区域

默认情况下，任何连接到 Home Assistant 的 OwnTracks 用户都可以导出其航点定义（从 *Export - Export to Endpoint* 菜单项），然后将其转换为 Home Assistant 中的区域定义。区域将被命名为 `<user>-<device> - <region name>:<region uuid>`。此功能可以通过 2 种方式控制：

1. 配置变量 `waypoints` 可以设置为 `false`，这将禁用所有用户导入航点。
2. 配置变量 `waypoint_whitelist` 可以包含允许导入航点的用户列表。