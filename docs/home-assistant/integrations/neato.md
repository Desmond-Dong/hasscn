---
title: Neato Botvac
description: "有关如何将 Neato 集成到 Home Assistant 中的说明。"

ha_category:
  - Button
  - Camera
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_domain: neato
ha_platforms:
  - button
  - camera
  - sensor
  - switch
  - vacuum
ha_integration_type: hub
---

The **Neato** integration allows you to control your [Neato Botvac Connected Robots][botvac-connected].

Home Assistant 支持以下平台类型：

- **相机** - 允许您查看最新的清洁地图。
- **传感器** - 允许您查看电池电量。
- **开关** - 允许您启用或禁用计划。
- [**Button**](#button) - 允许您关闭应用程序中可见的警报。
- [**真空**](#真空)

## Prerequisites

访问 [Neato 开发者网络](https://developers.neatorobotics.com/applications) 并创建一个新应用程序。

:::important
您必须输入名称、描述和重定向 URI：

- **名称**：可以是您喜欢的任何名称，例如“家庭助理”。
- **描述**：可以是您喜欢的任何内容，例如“Neato 的家庭助理集成”
- **重定向 URI**：`https://my.home-assistant.io/redirect/oauth`
- **服务条款 URL**：留空
- **隐私政策 URL**：留空

You have to select all three scopes (`public_profile`, `control_robots` and `maps`).

:::
<details>
<summary>I have manually disabled My Home Assistant</summary>


如果您的安装上没有[我的家庭助理](/home-assistant/integrations/my)，
您可以使用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI
相反。

`<HOME_ASSISTANT_URL>` 必须与配置期间使用的相同/
认证过程。

内部示例：`https://192.168.0.2:8123/auth/external/callback`、`https://homeassistant.local:8123/auth/external/callback`。”

请注意，您的实例必须可通过 HTTPS 访问。然而，你的
实例不需要暴露在互联网上。


</details>

## Configuration

To add the **Neato Botvac** hub to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=neato)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=neato).
- From the list, select **Neato Botvac**.
- Follow the instructions on screen to complete the setup.

</details>

集成配置将要求提供上面创建的*客户端 ID* 和*客户端密钥*。有关更多详细信息，请参阅[应用程序凭据](/home-assistant/integrations/application_credentials)。

:::note
After the update to firmware 4.0 (which adds cleaning maps) there is also support for displaying the maps of the Botvac D3 Connected and Botvac D5 Connected robots. More information on how to update can be found [here](https://support.neatorobotics.com/hc/en-us/articles/115004320694-Software-Update-4-0-for-Neato-Botvac-Connected-D3-D5-).

:::
## Button

每个“neato”真空吸尘器都有一个_解除警报_按钮。这可以消除应用程序中可见的警报（例如垃圾箱已满）并防止真空吸尘器开始清洁。

## Vacuum

`neato` 真空平台允许您控制 [Neato Botvac Connected][botvac-connected]。
状态将包含机器人上次清洁会话的属性。

### Actions

目前支持的操作有：

- `开始`
- `暂停`
- `停止`
- `返回基地`
- `定位`
- `clean_spot`

以及特定于集成的特定操作：

- `neato.custom_cleaning`

#### Action: Custom cleaning

`neato.custom_cleaning` 操作开始对您的房子进行自定义清洁。您可以像在移动应用程序中一样设置各种选项（模式、地图使用、导航模式、区域）。

:::note
Not all Botvac models support all the attributes. Only the Neato Botvac D7 supports the `zone` attribute.
Some information about the capabilities might be found on the [Neato Developer Portal](https://developers.neatorobotics.com/api/robot-remote-protocol/housecleaning).

:::
| Data attribute | Optional | Description                                                                                                                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific robot                                                                                                                                                  |
| `mode`                 | yes      | Set the cleaning mode: 1 for eco and 2 for turbo. Defaults to turbo if not set.                                                                                               |
| `navigation`           | yes      | Set the navigation mode: 1 for normal, 2 for extra care, 3 for deep. Defaults to normal if not set. Deep cleaning is only supported on the Botvac D7.                                                                           |
| `category`             | yes      | Whether to use a persistent map or not for cleaning (i.e., No go lines): 2 for no map, 4 for map. Default to using map if not set (and fallback to no map if no map is found). |
| `zone`                 | yes      | Only supported on the Botvac D7. Name of the zone to clean from the Neato app. Use unique names for the zones to avoid the wrong zone from running. Defaults to no zone i.e., complete house cleanup.                                                                  |

[botvac-connected]：https://neatorobotics.com/products

## Troubleshooting

### My robot is unavailable

尝试重新启动真空吸尘器并等待大约 5 分钟，看看它是否不再不可用。如果您仍然遇到问题，请检查 Neato 应用程序并确保您的机器人已连接并正常工作。如果不是，请按照应用程序中的步骤重置您的机器人并为其指定与之前相同的名称，然后重新启动 Home Assistant。

### Home Assistant 未检测到我的机器人

如果有任何警告，请检查您的日志。当出现有关您的机器人离线的消息时，请检查它是否已连接到互联网并可通过应用程序使用。如果出现有关不良响应的消息，请尝试通过您的应用程序重置此机器人。

### 有一个关于错误响应的警告，但一切都按预期进行

您的配置中是否有陈旧的机器人？尝试[查看您的帐户](https://neatorobotics.com) 并删除任何过时的机器人。如果这些警告是关于经常使用的机器人，请报告问题以帮助我们解决此问题。

### 服务器遇到麻烦了

如果您在尝试设置 Neato 后看到此消息，请检查设置是否仍然有效。如果没有，请重试并确保仅启动该过程一次。如果页面已自行打开，请勿单击“打开外部页面”按钮。请耐心等待设置完成。