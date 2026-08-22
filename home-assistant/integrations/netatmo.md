# Netatmo

The **Netatmo** integration is the main integration to integrate all Netatmo related platforms.

Home Assistant 目前支持以下设备类型：

* [二进制传感器](#binary-sensor)
* [按钮](#按钮)
* [相机](#相机)
* [气候](#climate)
* [封面](#封面)
* [粉丝](#粉丝)
* [光](#光)
* [传感器](#传感器)
* [开关](#开关)
* [Webhook 事件](#webhook-events)

## Configuration

To add the **Netatmo** hub to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=netatmo)

Netatmo can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=netatmo).
* From the list, select **Netatmo**.
* Follow the instructions on screen to complete the setup.

</details>

### 集成的额外配置

Netatmo 公共气象站的配置由前端提供。输入Netatmo集成并按“配置”，然后为新区域设置“区域名称”。

在该对话框中，可以创建、编辑和删除公共天气传感器。对于每个区域，必须设置唯一的名称以及要覆盖的区域以及是否显示平均值、最大值或最小值。

要编辑现有区域，请输入其名称并按照对话框进行操作。

默认情况下，打开的实体*设备类别*（例如“门”、“窗”）显示为与 Netatmo 配置的最佳匹配。当 Home Assistant 中没有匹配的设备类别时，您可以手动更改其图标（例如“家具”的“mdi:cupboard”）以更好地匹配真实设备。

## Binary sensor

二进制传感器平台显示 [Netatmo 智能家庭气象站](https://www.netatmo.com/smart-weather-station) 的连接实体。
它还将 [Netatmo 智能门窗传感器](https://www.netatmo.com/smart-door-and-window-sensors) 公开为*开放*二进制传感器（打开/关闭），并提供额外的连接实体。

## Button

“netatmo”按钮传感器平台支持将兼容百叶窗移动到首选位置。
并非所有封面都支持此功能，并且我们无法自动确定该功能，因此默认情况下禁用这些实体。

## Camera

“netatmo”摄像头平台正在使用 [Netatmo 智能室内](https://www.netatmo.com/smart-indoor-camera)、[室外](https://www.netatmo.com/smart-outdoor-camera) 和 [Netatmo 智能视频门铃](https://www.netatmo.com/smart-video-doorbell) 摄像头提供的信息。此集成允许您查看摄像机创建的当前实时流（例外：视频门铃）。

Home Assistant 云链接模式（在集成中配置）目前不支持门铃。请使用 [Netatmo 开发帐户](#development--testing-with-your-own-client-id)。请注意：如果您已经创建了 Netatmo 集成，则必须将其删除并使用 Netatmo 开发帐户进行配置，如上一个链接中所述。然后您将看到带有摄像头传感器的智能门铃设备。

## Climate

“netatmo”恒温器平台正在使用 [Netatmo 智能恒温器](https://www.netatmo.com/product/energy/thermostat)、[智能调节恒温器](https://www.netatmo.com/smart-modulate-thermostat) 和 [Netatmo 智能散热器阀](https://www.netatmo.com/additional-smart-radiator-valve) 提供的信息。此集成允许您查看当前温度并控制设定点。

## Cover

“netatmo”覆盖平台为 Bubendorff 百叶窗提供支持。

## Fan

“netatmo”风扇平台为罗格朗集中通风控制提供支持。

## Light

“netatmo”灯光平台正在使用 [Netatmo 智能户外](https://www.netatmo.com/smart-outdoor-camera) 摄像头提供的信息，并且需要一个活动的 Webhook。此集成允许您打开/关闭泛光灯。
它还提供对 Legrand/BTicino 调光器的支持。

## Sensor

“netatmo”传感器平台正在使用 [Netatmo 智能家居气象站](https://www.netatmo.com/smart-weather-station) 提供的信息
[Netatmo 智能室内空气质量监测器](https://www.netatmo.com/smart-indoor-air-quality-monitor) 设备或 [Netatmo 公共气象站](https://weathermap.netatmo.com/)。

## Switch

“netatmo”交换机平台提供对 Legrand/BTicino 交换机和电源插头的支持。

## Actions

### 操作：设置室外摄像机灯光模式

`netatmo.set_camera_light_mode` 操作设置室外摄像机灯光模式。

| Data attribute | Required | Description                |
| ---------------------- | -------- | -------------------------- |
| `camera_light_mode`    | Yes      | Outdoor camera light mode. |

### 行动：设定时间表

“netatmo.set\_schedule”操作设置加热计划。

| Data attribute | Required | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `schedule_name`        | Yes      | The name of the schedule to activate. |

### 操作：设置带有结束日期和时间的预设模式

`netatmo.set_preset_mode_with_end_datetime` 操作设置 Netatmo 气候设备的预设模式。预设模式必须与 Netatmo 配置的预设模式匹配。

| Data attribute | Required | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `preset_mode`          | Yes      | Climate preset mode such as Schedule, Away, or Frost Guard. |
| `end_datetime`         | Yes      | Date & time until which the preset will be active.          |

### 操作：设置温度和结束日期和时间

`netatmo.set_Temperature_with_end_datetime` 操作设置 Netatmo 气候设备的目标温度以及结束日期和时间。

| Data attribute | Required | Description                                              |
| ---------------------- | -------- | -------------------------------------------------------- |
| `target_temperature`   | Yes      | The target temperature for the device.                   |
| `end_datetime`         | Yes      | Date & time the target temperature will be active until. |

### 操作：设置温度和时间段

`netatmo.set_Temperature_with_time_period` 操作设置 Netatmo 气候设备的目标温度以及应用该目标温度的时间段。

| Data attribute | Required | Description                                                 |
| ---------------------- | -------- | ----------------------------------------------------------- |
| `target_temperature`   | Yes      | The target temperature for the device.                      |
| `time_period`          | Yes      | Time period during which the target temperature is applied. |

### 操作：清除温度设置

“netatmo.clear\_Temperature\_setting”操作可清除 Netatmo 气候设备的所有温度设置，将其恢复为当前预设或计划。

### 行动：将人员设置为在家中

`netatmo.set_persons_home` 操作将人员列表设置为在家。人员姓名必须与 Netatmo 智能室内摄像机已知的姓名相匹配。

| Data attribute | Required | Description    |
| ---------------------- | -------- | -------------- |
| `persons`              | Yes      | List of names. |

### 行动：让人走开

`netatmo.set_person_away` 操作将一个人离开。如果没有设置人员，房屋将被标记为空。人员姓名必须与 Netatmo 智能室内摄像机已知的姓名相匹配。

| Data attribute | Required | Description    |
| ---------------------- | -------- | -------------- |
| `person`               | Yes      | Person's name. |

### 操作：注册 webhook 并取消注册 webhook

`netatmo.register_webhook` 和 `netatmo.unregister_webhook` 操作手动注册和取消注册 Webhook。

## Webhook Events

Netatmo 后端使用 Webhooks 向 Home Assistant 发送即时事件，从而提高大多数设备的响应能力，[Netatmo 智能家居气象站](https://www.netatmo.com/smart-weather-station) 除外，
[Netatmo 智能室内空气质量监测器](https://www.netatmo.com/smart-indoor-air-quality-monitor) 或 [Netatmo 公共气象站](https://weathermap.netatmo.com/)。

:::warning
Netatmo webhook events have known issues with Home Assistant Cloud Link.
It is therefore recommended to use [an individual development account](#development--testing-with-your-own-client-id).

:::
为了能够从 [Netatmo](https://www.netatmo.com/) 接收事件，您的 Home Assistant 实例需要可以通过端口“443”从网络访问。要实现此目的，您可以使用 Nabu Casa 帐户或例如 Duck DNS（[Home Assistant instructions](/home-assistant/addons/duckdns/)）。您还需要在 Home Assistant [配置](/home-assistant/integrations/homeassistant/index.md#allowlist_external_urls) 中配置外部 URL。

来自 Netatmo 的事件将作为 Home Assistant 中的事件提供，并作为“netatmo\_event”及其数据被触发。您可以使用这些事件来触发自动化。

您可以在[官方 Netatmo API 文档](https://dev.netatmo.com/apidocumentation/security#events) 中找到可用的事件类型。

Example:

```yaml
# Example automation for webhooks based Netatmo events
- alias: "Netatmo event example"
  description: "Count all events pushed by the Netatmo API"
  triggers:
    - trigger: event
      event_type: netatmo_event
  actions:
    - action: counter.increment
      entity_id: counter.event_counter
```

Example:

```yaml
# Example automation for Netatmo Welcome
- alias: "Motion at home"
  description: "Motion detected at home"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: movement
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: "Netatmo event"
```

Example:

```yaml
# Example automation for Netatmo Presence
- alias: "Motion at home"
  description: "Motion detected at home"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: human # other possible types: animal, vehicle
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}  
          at {{ trigger.event.data["data"]["home_name"] }}
        title: Netatmo event
```

Example:

```yaml
# Example automation
- alias: "Door or window open or movement"
  description: "Notifies which door or window is open or was moved"
  triggers:
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_open
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_big_move
    - trigger: event
      event_type: netatmo_event
      event_data:
        type: tag_small_move
  actions:
    - action: persistent_notification.create
      data:
        message: >
          {{ trigger.event.data["data"]["message"] }}
        title: "Netatmo event"
```

## 使用您自己的客户端 ID 进行开发/测试

要使用您自己的开发凭据启用 Netatmo 集成，您必须
在 [Netatmo 开发人员页面](https://dev.netatmo.com/) 中声明一个新应用程序。

使用您的常规 Netatmo 帐户中的用户名和密码登录。

:::important
In your Netatmo Application configuration, do not enter a 'redirect URI' or a 'webhook URI'.  The 'webhook URI' is automatically registered by this integration based on the external URL configured in the Home Assistant [configuration](/home-assistant/integrations/homeassistant/index.md#editing-the-general-settings-in-yaml).

:::
请参阅[应用程序凭据](/home-assistant/integrations/application_credentials.md)，了解有关如何配置 *客户端 ID* 和 *客户端密钥* 的说明，然后通过集成页面启用 Netatmo。

菜单：**设置** > **设备和服务**。

单击“+”号添加集成，然后单击 **Netatmo**。
完成配置流程后，Netatmo 集成将可用。

在此过程中，您必须选择新的应用程序凭据名称。

## Troubleshooting

### 接收事件

To confirm your Home Assistant instance is receiving events via webhooks, you can listen to `netatmo_event` in [**Settings** > **Developer tools** > **Events**](https://my.home-assistant.io/redirect/developer_events/).

### Light

如果指示灯显示不可用，则问题通常是 Webhook 被 Netatmo 禁止。要解决[取消注册](#un-register-webhooks) webhook 的问题，请转至 [Netatmo 开发人员页面](https://dev.netatmo.com/) 取消禁止您的 webhook，然后[注册](#un-register-webhooks) webhook。
