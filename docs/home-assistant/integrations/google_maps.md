---
title: Google Maps
description: 'Google Maps 集成允许您使用 Google Maps 位置共享(https://myaccount.google.com/locationsharing) 的非官方 API 检测存在。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 0.67
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_domain: google_maps
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Google Maps

**Google Maps** 集成允许您使用 [Google Maps 位置共享](https://myaccount.google.com/locationsharing) 的非官方 API 检测存在。

## 设置

您需要两个 Google 账户。账户 A 是必须设置为与账户 B 共享其位置的账户。账户 B 用于获取您设备的位置，并将连接到此集成。

1. 您首先需要在手机上的 Google Maps 应用程序中设置共享账户 A 的位置。与账户 B 共享您的位置。您可以在[此处](https://support.google.com/accounts?p=location_sharing)找到更多信息。
2. 接下来，您需要在登录账户 B 的同时从 Google 获取有效的 cookie。使用 PC 上的 Firefox 或 Chrome 登录 [Google Maps](https://www.google.com/maps)，使用账户 B 的凭据。确保使用 `.com` TLD（例如 maps.google.com），否则 cookie 将无法提供有效的会话。正确认证后，您可以使用 Firefox 的 [Export cookies](https://addons.mozilla.org/en-US/firefox/addon/export-cookies-txt/?src=search)（确保"Prefix HttpOnly cookies"未选中）或 Chrome/Chromium 的 [get_cookies.txt locally](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) 检索 cookie。
3. 将 cookie 文件保存到您的 Home Assistant 配置目录，使用以下名称：`.google_maps_location_sharing.cookies.` 后跟新 Google 账户（账户 B）的 slug 化用户名。
   - 例如：如果您的电子邮件地址是 `location.tracker@gmail.com`，文件名将是：`.google_maps_location_sharing.cookies.location_tracker_gmail_com`。

### 现有位置共享用户注意事项

如果您已经有其他人共享其位置给您的现有账户 A，并且不希望要求他们也与新账户 B 共享位置。只需重复上述步骤为账户 A 从 Google 获取有效的 cookie。然后将两个账户都添加到设备跟踪器配置中（不要忘记包含多个 cookie 文件，每个添加到集成的账户一个）。

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: google_maps
    username: "ACCOUNT_A_EMAIL"
  - platform: google_maps
    username: "ACCOUNT_B_EMAIL"
```

:::note
如果使用多个账户，您的设备可能会出现两次。但是，从账户 A 返回的参数不包括 `battery_level` 或 `entity_picture` 的值。这些参数将出现在账户 B 的设备跟踪器实体中。因此，请忽略缺少这些参数的设备跟踪器实体。

:::
## 配置

要将 Google Maps 位置共享集成到 Home Assistant 中，请将以下部分添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: google_maps
    username: "YOUR_EMAIL"
```

启用后，重启后通过此集成发现的设备将列在您配置目录中的 `known_devices.yaml` 文件中。

它们将使用类似 `google_maps_<numeric_id>` 的标识符创建。要能够正确跟踪实体，您必须将 `track` 属性设置为 `true`。

```yaml
username:
  description: 有权访问您共享位置的 Google 账户的电子邮件地址。
  required: true
  type: string
max_gps_accuracy:
   description: 有时 Google Maps 可能报告 GPS 位置的精度非常低（几公里）。这可能会触发错误的区域。使用此参数，您可以过滤这些错误的 GPS 报告。数字必须以米为单位。例如，如果您输入 200，只有精度在 200 以下的 GPS 报告才会被考虑 - 如果未指定，默认为 100km。
   required: false
   type: float
scan_interval:
  description: 检查位置更新的频率（秒）。
  required: false
  default: 60
  type: integer
```

:::note
从版本 0.97 开始，您的配置中不再需要 Google 密码。从早期版本升级的用户只需从配置文件中删除密码条目（用户名仍然需要）并重启 Home Assistant。之前生成的 cookie 文件应该仍然有效，并将允许跟踪器正常继续工作，直到 cookie 失效。

:::
