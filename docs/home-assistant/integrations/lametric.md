---
title: LaMetric
description: 'LaMetric TIME(https://lametric.com/) 是一款智能时钟，可用于访问应用、收听网络广播以及显示通知。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Button
  - Notifications
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Local Polling
ha_release: 0.49
ha_codeowners:
  - '@robbiet480'
  - '@frenck'
  - '@bachya'
ha_domain: lametric
ha_platforms:
  - button
  - diagnostics
  - notify
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
ha_config_flow: true
ha_ssdp: true
ha_dhcp: true
---
# LaMetric

[LaMetric TIME](https://lametric.com/) 是一款智能时钟，可用于访问应用、收听网络广播以及显示通知。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 操作

LaMetric 集成提供了可与 LaMetric 设备交互的操作。
例如，这些操作可以在自动化中使用。

### 操作：图表

[`lametric.chart`](https://my.home-assistant.io/redirect/developer_call_service/?service=lametric.chart)
操作会在你的 LaMetric 设备上显示图表。

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=lametric.chart)

### `lametric.chart` 的配置变量
device_id:
  description: The ID of the device to send the message to.
  required: true
  type: string
data:
  description: The data points in the chart, as a list of numbers. For example `[1, 2, 3, 2, 1]`.
  required: true
  type: list
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string

### 操作：消息

[`lametric.message`](https://my.home-assistant.io/redirect/developer_call_service/?service=lametric.message)
操作会向你的 LaMetric 设备发送消息。这些消息还可以附带图标和声音。

[![Open **Settings** > **Developer tools** > **Actions** in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=lametric.message)

### `lametric.message` 的配置变量
device_id:
  description: The ID of the device to send the message to.
  required: true
  type: string
message:
  description: The message to send to the LaMetric device.
  required: true
  type: string
icon:
  description: "The ID of an icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: info
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string

## 通知

你可以通过 [通知](/home-assistant/integrations/notify) 集成向 LaMetric 设备发送通知。

添加到 Home Assistant 的每台 LaMetric 设备都会拥有自己的
`notify.` 操作。操作名称与设备在 LaMetric 账户中显示的名称对应。
例如，如果你的设备名为 "My LaMetric"，对应操作就是 `notify.my_lametric`。

针对 LaMetric 设备执行通知操作时，还可以使用以下可选附加参数：

### `notification` 的配置变量
icon:
  description: "The ID of an icon or animation. List of all icons available at [https://developer.lametric.com/icons](https://developer.lametric.com/icons)."
  required: false
  type: string
cycles:
  description: "Defines how long the notification will be displayed. Set to `0` to require manual dismissal."
  required: false
  type: integer
  default: 1
priority:
  description: "Defines the priority of the notification. Allowed values are `info`, `warning`, and `critical`."
  required: false
  type: string
  default: warning
icon_type:
  description: "Defines the nature of notification. Allowed values are `none`, `info`, and `alert`."
  required: false
  type: string
  default: none
sound:
  description: "Defines the sound of the notification. Allowed are listed [below](#list-of-notification-sounds)."
  required: false
  type: string
  default: none

## 示例

如需添加通知声音、图标、循环次数或覆盖优先级，可参考以下示例：

```yaml
- alias: "Send notification on arrival at school"
  triggers:
    - trigger: state
      entity_id: device_tracker.tom_mobile
      from: "not_home"
      to: "school"
  actions:
    - action: notify.my_lametric
      data:
        message: "Tom has arrived at school!"
        data:
          sound: "notification"
          icon: "51"
          cycles: 0
          priority: "critical"
          icon_type: "info"
```

## 通知声音列表

以下通知声音可与 `notify` 操作中的 `sound` 参数配合使用：

- `alarm1`
- `alarm10`
- `alarm11`
- `alarm12`
- `alarm13`
- `alarm2`
- `alarm3`
- `alarm4`
- `alarm5`
- `alarm6`
- `alarm7`
- `alarm8`
- `alarm9`
- `bicycle`
- `car`
- `cash`
- `cat`
- `dog`
- `dog2`
- `energy`
- `knock-knock`
- `letter_email`
- `lose1`
- `lose2`
- `negative1`
- `negative2`
- `negative3`
- `negative4`
- `negative5`
- `notification`
- `notification2`
- `notification3`
- `notification4`
- `open_door`
- `positive1`
- `positive2`
- `positive3`
- `positive4`
- `positive5`
- `positive6`
- `statistic`
- `thunder`
- `water1`
- `water2`
- `win`
- `win2`
- `wind_short`
- `wind`

## 手动配置自动导入

如果你不想使用 Home Assistant 账户关联服务，也可以手动设置 LaMetric 应用。

不过请注意：目前在集成设置过程中直接选择“Enter manually”会更简单；这样同样可以绕过账户关联服务，也不需要完成下面的全部步骤。

如果你仍希望自行创建 LaMetric 应用来导入设备，请按以下步骤操作：

1. 使用你的 LaMetric 设备账户登录 [developer.lametric.com](https://developer.lametric.com)。
2. 点击 Create 按钮，并选择 [Notification](https://developer.lametric.com/applications/createsource) 应用。
3. 填写表单。这些字段基本上填写任意内容即可，只要不留空：
   - App Name: Home Assistant
   - Description: Home Assistant
   - Redirect URI: `https://my.home-assistant.io/redirect/oauth`
   - Privacy Policy: `http://localhost/`
   - 勾选 `basic` 和 `read_devices` 权限
   - 点击 Save
4. 页面会跳转到你的 [Notification Apps list](https://developer.lametric.com/applications/sources)，
   点击 "Home Assistant"，复制你的 client ID 和 Client Secret。

然后，你可以将这些凭据添加到 [应用凭据](/home-assistant/integrations/application_credentials/)，再设置该集成。

<details>
<summary>我已手动禁用 My Home Assistant</summary>


如果你的安装中没有启用 [My Home Assistant](/home-assistant/integrations/my)，可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置/认证流程中使用的地址保持一致。

内网示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。


</details>

## 故障排查

### 亮度无法达到 100%

当 LaMetric 通过电脑的 USB 端口供电时，亮度会受到限制。
如需获得完整亮度，请使用合适的 USB 充电器供电。
