**Google Nest** 集成可让你在 Home Assistant 中接入部分[受支持](https://developers.google.com/nest/device-access/supported-devices)的 Google [Nest](https://store.google.com/us/category/connected_home?) 设备。此集成使用 [Smart Device Management](https://developers.google.com/nest/device-access/api) API 和 Google Cloud Pub/Sub，高效监听设备状态变化和其他事件。有关 SDM API 支持的全部设备，请参阅[支持的设备](https://developers.google.com/nest/device-access/supported-devices)。

Home Assistant 目前支持以下设备类型：

* [气候](#climate)
* [传感器](#传感器)
* [相机](#相机)
* [活动](#活动)

摄像头和门铃使用[自动化和设备触发器](#device-triggers)处理事件，并使用[媒体源](#media-source)在支持的设备上获取媒体图像。SDM API 目前不支持其他设备类型，例如烟雾与一氧化碳报警器或安防系统。

您可以控制向 Home Assistant 公开的信息和功能。您可以为任何特定设备授权单个设备、多个设备或不同级别的功能，例如运动事件、实时流。该集成足够灵活，可以根据您的允许进行调整。

# 前提条件

* 自 2025 年 1 月 23 日起，Nest 设备访问控制台 Pub/Sub 设置流程已更改。 **请确保您使用的是最新版本的 Home Assistant。**

* Nest 智能设备管理 (SDM) API **需要 5 美元费用**。购买前，请确保您的设备[受支持](https://developers.google.com/nest/device-access/supported-devices)。

* SDM API 还与某些 Google 帐号类型或安全设置不兼容，包括 Google Workspace 和高级保护计划。请参阅下面的[已知限制](#known-limitations)。

## 配置

<details>
<summary>重要：请先移除现有 Google 凭据</summary>

如果您之前设置过 Google 集成或 Nest 集成，则应先删除任何现有的 Google 集成凭据，然后再继续。

要移除现有凭据：

1. 前往 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**。
2. 选择右上角的三点菜单 (⋮)。
3. 检查列表中是否已有旧的 Google 或 Nest 集成。
4. 选择对应的 Google/Nest 集成并点击“Delete”将其移除。

这样可以确保 Home Assistant 使用你最新的 Google 集成配置，并避免认证冲突。

</details>

要将 **Nest** 集成添加到 Home Assistant，请使用下面这个 My Home Assistant 按钮：
[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nest)

![安装提示的屏幕截图](/home-assistant/images/integrations/nest/setup_prompt.png)

<details>
<summary>手动配置步骤</summary>

1. 打开你的 Home Assistant 实例。
2. 前往 **[Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/)**。
3. 在右下角点击 **[Add integration](https://my.home-assistant.io/redirect/config_flow_start/?domain=nest)** 按钮。
4. 在列表中选择 **Nest**，然后按照屏幕上的说明继续操作。

</details>

集成设置步骤将引导您完成配置 Google Cloud 项目、设备访问项目的过程，最后将您的帐户链接到 Home Assistant。确保您运行的是最新版本的 Home Assistant。

<details>
<summary>创建并配置云项目 [Cloud Console]</summary>

在本节结束时，您将拥有一个启用了必要 API 的云项目

1. 转到 [Google Cloud Console](https://console.developers.google.com/apis/credentials)。

2. 如果这是您第一次来到这里，您可能需要创建一个新的 Google Cloud 项目。单击“**创建项目**”，然后单击“**新建”
   项目**。
   ![没有现有项目的 API 和服务 Cloud 控制台的屏幕截图](/home-assistant/images/integrations/nest/api_project_needed.png)

3. 为您的云项目命名，然后单击**创建**。

4. 您需要保留您的*云项目 ID* 才能启用订阅以接收来自设备的更新。访问[Cloud Console](https://console.cloud.google.com/home/dashboard)并复制Home Assistant所需的*项目ID*。

![成功截图](/home-assistant/images/integrations/nest/console_project_id.png)

5. 前往 [API 与服务 > 库](https://console.cloud.google.com/apis/library)，您可以在其中启用 API。

6. 从 API 库中搜索 [智能设备管理](https://console.cloud.google.com/apis/library/smartdevicemanagement.googleapis.com)，然后单击 **启用**。

![搜索 SDM API 的屏幕截图](/home-assistant/images/integrations/nest/enable_sdm_api.png)

7. 在 Cloud Console 的 API 库中搜索 [Cloud Pub/Sub API](https://console.developers.google.com/apis/library/pubsub.googleapis.com)，然后点击 **启用**。

您现在已经有了一个云项目，可以在下一部分中使用 OAuth 配置身份验证。

</details>

<details>
<summary>配置 OAuth 同意屏幕 [Cloud Console]</summary>

在本节结束时，您将配置 OAuth 同意屏幕，这是为 Home Assistant 提供访问权限所需的
您的云项目。

1. 转到 [Google API 控制台](https://console.developers.google.com/apis/credentials)。

2. 单击 [OAuth 同意屏幕](https://console.cloud.google.com/apis/credentials/consent) 并进行配置。

3. 选择“**外部**”，然后单击“**创建**”。当您在这里时，您可以点击*让我们知道您的想法*，向 Google 的 OAuth 团队提供有关您为自托管软件配置凭据的体验的任何反馈。他们定期改进此流程，并且似乎很重视反馈。
   ![OAuth 同意屏幕创建的屏幕截图](/home-assistant/images/integrations/nest/oauth_consent_create.png)

4. *应用程序信息*屏幕需要您输入**应用程序名称**和**用户支持电子邮件**，然后在**开发人员联系电子邮件**下再次输入您的电子邮件。仅当您稍后通过 OAuth 流程授权 Home Assistant 访问您的帐户时，才会显示这些信息。单击“**保存并继续**”。省略不必要的信息（例如徽标），以避免 Google 进行额外审查。

5. 在“范围”步骤中，单击“**保存并继续**”。

6. 在“测试用户”步骤中，您需要将您的 Google 帐户（例如，您的 @gmail.com 地址）添加到列表中。单击您的测试帐户上的“保存”，然后单击“保存并继续”以完成同意流程。
   ![OAuth 同意屏幕测试用户的屏幕截图](/home-assistant/images/integrations/nest/oauth_consent_test_users.png)

7. 导航回 *OAuth 同意屏幕*，然后单击 **Publish App** 将 *Publishing status* 设置为 **In Production**。

![OAuth 同意屏幕生产状态的屏幕截图](/home-assistant/images/integrations/nest/oauth_consent_production_status.png)

8. 该警告表示，任何拥有 Google 帐户的用户都可以使用您的*应用程序*，这是指如果有人找到该 URL，您在“应用程序信息”屏幕上输入的字段。这不会泄露您的 Google 帐户或 Nest 数据。

9. 确保状态不是*测试*，否则您将每 7 天注销一次。

</details>

<details>
<summary>配置 OAuth 应用凭据 [Cloud Console]</summary>

在本节结束时，您将获得应用程序凭据设置所需的 OAuth *客户端 ID* 和 *客户端密钥*。

以下步骤使用 *Web 应用程序身份验证* 和 *My Home Assistant* 来处理 Google 严格的 URL 验证规则，例如需要 SSL 和可公开解析的重定向 URL。

1. 导航到 [凭据](https://console.cloud.google.com/apis/credentials) 页面，然后单击 **创建凭据**。
   ![API 和服务云控制台屏幕截图](/home-assistant/images/integrations/nest/create_credentials.png)

2. 从下拉列表中选择 *OAuth 客户端 ID*。
   ![OAuth 客户端 ID 选择的屏幕截图](/home-assistant/images/integrations/nest/oauth_client_id.png)

3. 在应用程序类型中输入*Web 应用程序*。

4. 为您的凭证选择一个名称。

5. 添加 **授权重定向 URI** 最后输入 `https://my.home-assistant.io/redirect/oauth`

6. 单击*创建*以创建凭据。
   ![创建 OAuth 凭据的屏幕截图](/home-assistant/images/integrations/nest/oauth_redirect_uri.png)

7. 现在您应该会看到一条 *OAuth 客户端已创建* 消息。

![OAuth 客户端 ID 和客户端密钥的屏幕截图](/home-assistant/images/integrations/nest/oauth_created.png)

8. 您现在拥有 Home Assistant 所需的 *OAuth 客户端 ID* 和 *OAuth 客户端密钥*。  按照[应用程序凭据说明](/home-assistant/integrations/application_credentials.md) 在 Home Assistant 中添加 *OAuth 客户端 ID* 和 *OAuth 客户端密钥*。

</details>

<details>
<summary>创建设备访问项目 [Device Access Console]</summary>

现在您已经配置了身份验证，您将创建一个 Nest 设备访问项目，该项目*需要 5 美元的费用*。完成后，您将拥有一个*设备访问项目 ID*。

1. 转到[设备访问注册](https://developers.google.com/nest/device-access/registration)页面。

:::note
继续之前，请先阅读页面中的警告信息，包括 Google 帐号类型限制。

:::
2\. 选择按钮 **[转至设备访问控制台](https://console.nest.google.com/device-access/)**。
![设备访问注册屏幕截图](/home-assistant/images/integrations/nest/device_access.png)

3. 勾选“接受服务条款”框，然后选择**继续付款**，您需要支付费用（目前为 5 美元）。
   ![接受条款的屏幕截图](/home-assistant/images/integrations/nest/accept_terms.png)

4. 现在 [设备访问控制台](https://console.nest.google.com/device-access/project-list) 应该可见。选择**创建项目**。

5. 为您的设备访问项目命名并选择**下一步**。
   ![命名项目的屏幕截图](/home-assistant/images/integrations/nest/project_name.png)

6. 接下来，系统将要求您提供在上一步中创建的 **OAuth 客户端 ID**，然后选择 **下一步**。
   ![设备访问控制台 OAuth 客户端 ID 的屏幕截图](/home-assistant/images/integrations/nest/device_access_oauth_client_id.png)

7. 暂时取消选中**启用事件**并**创建项目**。您需要一个 Pub/Sub 主题
   （在下一节中创建）以启用事件。这需要在
   Google Cloud Pub/Sub 控制台，因此我们暂时跳过该步骤，然后返回
   下一节。

8. 您现在拥有 Home Assistant 所需的*设备访问项目 ID*。

</details>

<details>
<summary>启用事件和 Pub/Sub 主题 [Device Access & Cloud Console]</summary>

自 2025 年 1 月 23 日起，Nest 设备访问控制台 Pub/Sub 设置流程已发生更改。 **请确保您使用的是最新版本的 Home Assistant。**。

本节介绍如何使用 Pub/Sub 主题配置设备访问项目
发布您家中设备的事件。家庭助理和设备访问项目必须配置为使用*主题名称*，否则您将不会收到事件。

如果您之前设置过事件，那么您的设备访问项目可能已经为您创建了一个主题，并且您可以使用该主题名称。对于新项目，或者如果您禁用事件，您需要按照以下说明自行创建主题。

1. 转到 [Pub/Sub Google Cloud 控制台](https://console.cloud.google.com/cloudpubsub/topic/list)。

2. Select **Create Topic**.

3. 输入**主题 ID**，例如“home-assistant-nest”。您可以保留默认设置。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/cloud_pubsub_create_topic.png)

4. 选择“**创建**”来创建主题。

5. 您现在拥有设备访问控制台和 Home Assistant 所需的 **主题名称**。包含您的云项目 ID 和 **主题 ID** 的完整**主题名称**，例如“projects/<cloud console id>/topics/home-assistant-nest”。

6. 接下来，您需要授予设备访问控制台发布到您的主题的权限。从 Pub/Sub 主题页面中选择 **添加主体**。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/cloud_pubsub_add_principal.png)

7. 在 **新委托人** 中输入 `sdm-publisher@googlegroups.com`

8. 在 **Pub/Sub** 下的 **选择角色** 中，选择 **Pub/Sub 发布者** 和 **创建**。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/cloud_pubsub_add_principal_role.png)

9. 接下来，您可以配置设备访问控制台以使用此主题。访问[设备访问控制台](https://console.nest.google.com/device-access/)。

10. 选择您之前创建的设备访问项目。它应该显示 Pub/Sub 主题
    作为禁用。如果显示了现有主题，那么您可以将其删除并使用
    您刚刚创建的一个，以避免将它们混淆。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/device_access_topic_disabled.png)

11. 选择 **Pub/Sub 主题** 旁边的 *...*，然后选择 **启用具有 PubSub 主题的事件**。

12. 输入完整的 Pub/Sub **主题名称**，然后选择 **添加并验证**。如果您看到错误，那么
    再次查看前面的步骤并配置主题和权限。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/device_access_validate_pubsub.png)

13. 您已成功配置 Home Assistant 使用的事件和 Pub/Sub 主题。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/device_access_complete.png)

</details>

<details>
<summary>关联 Google 帐号</summary>

在本部分中，您将通过生成*身份验证令牌*来授权 Home Assistant 访问您的帐户。

请参阅下面的[疑难解答](#troubleshooting)，了解解决导致 *无法链接...* 或来自 Google 的 *错误 400* 等错误的常见错误配置的步骤。

1. 在 Home Assistant 中，您应该已经完成​​了设置流程。如果没有，请返回并单击上面的“我的：添加集成”按钮开始设置。集成将要求您提供所有必要的集成配置。

2. 在 Home Assistant 中输入所有配置信息后，将打开一个新选项卡，允许您选择 Google 帐户。这应该与您上面配置的开发者帐户相同。

3. *Google Nest 权限* 屏幕将允许您选择要配置的设备，并允许您从多个家庭中选择设备。您可能想要启用所有功能，但是，您可以省略任何您不想与 Home Assistant 使用的功能。

![Nest权限授权截图](/home-assistant/images/integrations/nest/oauth_approve.png)

4. 您将被重定向到另一个帐户选择页面。

5. 您可能会看到一个警告屏幕，显示“Google 尚未验证此应用程序”，因为您刚刚设置了未经验证的开发人员工作流程。单击*继续*继续。

![OAuth 警告屏幕截图](/home-assistant/images/integrations/nest/oauth_app_verification.png)

6. 然后系统会要求您授予其他权限。单击*允许*。
   ![授予权限截图1](/home-assistant/images/integrations/nest/oauth_grant1.png)
   ![授予权限截图2](/home-assistant/images/integrations/nest/oauth_grant2.png)

7. 确认您想要允许持续访问 Home Assistant。
   ![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/oauth_confirm.png)

8. 现在，您将看到由 *My Home Assistant* 托管的页面，询问您是否愿意 *将帐户链接到 Home Assistant？* 单击 **链接帐户** 继续。

9. 如果一切顺利，您接下来将配置事件和 Pub/Sub 主题。 Nest将尝试
   自动查找由设备访问控制台创建的 Pub/sub 主题
   或由您手动操作。

![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/config_flow_with_topic.png)

10. 如果您看到错误消息 *未找到符合条件的 Pub/Sub 主题，请确保设备访问控制台具有 Pub/Sub 主题。*，然后按照上一节中的步骤启用事件并在另一个浏览器选项卡中创建 Pub/Sub 主题。创建并配置主题后，您可以在此屏幕上按 **提交** 刷新主题列表并继续。

11. Home Assistant 使用*订阅*来订阅在该主题上发布的设备事件。您可以选择在设备访问控制台中创建的订阅，如果您还没有订阅，集成将自动为您创建订阅。
    ![OAuth 确认屏幕截图](/home-assistant/images/integrations/nest/config_flow_subscription.png)

12. 如果一切顺利，您就可以出发了！

![成功截图](/home-assistant/images/integrations/nest/device_access_complete.png)

</details>

## 气候

所有 Google Nest Thermostat 模型都公开为使用 SDM API 中的 [Thermostat Traits](https://developers.google.com/nest/device-access/traits/device/thermostat-hvac) 的“气候”实体。恒温器的状态变化通过 Cloud Pubsub 订阅者报告给 Home Assistant。

给定一个名为“Upstairs”的恒温器，然后使用“climate.upstairs”等名称创建气候实体

:::note
此功能通过以下权限启用：

* *允许家庭助理访问和控制您的恒温器*

:::

## 传感器

所有 Google Nest Thermostat 模型都具有从 SDM API 公开的特征。传感器的初始值在启动时获取，然后使用 Cloud Pubsub 订阅者定期更新。传感器支持以下特征：

* [温度](https://developers.google.com/nest/device-access/traits/device/Temperature)
* [湿度](https://developers.google.com/nest/device-access/traits/device/humidity)

给定一个名为“Upstairs”的恒温器，然后使用“sensor.upstairs\_Temperature”或“sensor.upstairs\_humidity”等名称创建传感器。

:::note
此功能通过以下权限启用：

* *允许家庭助理访问和控制您的恒温器*

:::

## 相机

Home Assistant 支持所有 SDM API 功能。但是，每个摄像头或门铃设备都有一组不同的内置功能。摄像头设备具有以下实时流类型之一：

* **RTSP**：这些设备具有由 Home Assistant Core 提供服务的 HLS 流。这些相机支持服务器端“相机”操作，例如流录制或图像预览。请参阅[低延迟 HLS](/home-assistant/integrations/stream.md#ll-hls)，这是一个减少流延迟的绝佳选项。
* **WebRTC**：这些设备支持浏览器到相机的直接通信和超低延迟流。 [图片概览卡](/home-assistant/dashboards/picture-glance/index.md) 可以在网格中显示实时流，并将*摄像头视图*设置为“实时”（不建议用于电池供电的摄像头）。 *不支持*诸如流录制之类的“相机”操作。

给定一个名为“Front Yard”的相机，然后使用“camera.front\_yard”等名称创建相机。

:::note
此功能通过以下权限启用：

* *允许家庭助理查看并显示您相机的直播*
* *Nest 或 Google Home 应用中的其他权限*。

:::
所有摄像机还公开事件实体以实现自动化。部分相机型号还
支持通过设备触发器捕获媒体（快照或剪辑）。下表总结了每个设备的[支持的 SDM API 功能](https://developers.google.com/nest/device-access/supported-devices)。

| Device                                                                           |    Live stream    |         Event entities / triggers          | Media source<br> for triggers |
| -------------------------------------------------------------------------------- | :---------------: | :--------------------------------: | :------------------------------------: |
| Nest Cam (indoor, wired)<br>Nest Cam (outdoor, battery)                          |      WebRTC       |          Motion<br>Person          |                  N/A                   |
| Nest Cam Indoor<br>Nest Cam IQ Indoor<br>Nest Cam IQ Outdoor<br>Nest Cam Outdoor | RTSP<br>Recording |     Motion<br>Person<br>Sound      |             Snapshot (jpg)             |
| Nest Cam with floodlight                                                         |      WebRTC       |          Motion<br>Person          |                  N/A                   |
| Nest Doorbell (battery)                                                          |      WebRTC       |     Motion<br>Person<br>Chime      |        Clip Preview (mp4, gif)         |
| Nest Doorbell (wired, 1st gen)                                                   | RTSP<br>Recording | Motion<br>Person<br>Sound<br>Chime |             Snapshot (jpg)             |
| Nest Doorbell (wired, 2nd gen)                                                   |      WebRTC       |     Motion<br>Person<br>Chime      |        Clip Preview (mp4, gif)         |
| Nest Hub Max                                                                     | RTSP<br>Recording |   Motion<br>Person<br>Sound<br>    |             Snapshot (jpg)             |

## 事件

所有门铃和摄像头都支持事件实体。有关如何在自动化中使用事件实体的更多信息，请参阅[事件](https://www.home-assistant.io/integrations/event/)集成文档。

根据上述相机功能，有两类可用的事件实体：

* 支持任何事件类型“camera\_motion”、“camera\_person”或“camera\_sound”的摄像机的“motion”
* “门铃”适用于所有作为门铃并支持“doorbell\_chime”事件的摄像机

收到事件消息后，嵌套事件实体会立即更新
无需等待任何媒体被获取。请参阅设备触发器以获取媒体支持。

## 设备触发器

Nest 集成提供[设备触发器](/home-assistant/docs/automation/trigger/index.md#device-triggers) 以在 Home Assistant 中启用自动化。您应该查看 [自动化家庭助理](/home-assistant/getting-started/automation/index.md) 自动化入门指南或 [自动化](/home-assistant/docs/automation/index.md) 文档以了解完整详细信息。

下载与事件关联的任何媒体后，设备触发器将等待触发。使用
无需媒体即可立即通知的事件实体。

[![Open Settings > Automations & scenes in your Home Assistant instance.](https://my.home-assistant.io/badges/automations.svg)](https://my.home-assistant.io/redirect/automations/)

![屏幕截图设备触发器](/home-assistant/images/integrations/nest/device_triggers.png)

<details>
<summary>设备触发器 / 事件负载示例</summary>

这是可用于驱动自动化的设备触发器的“nest\_event”有效负载的示例。

```json
{
    "event_type": "nest_event",
    "data": {
        "device_id": "EXAMPLE_DEVICE_ID",
        "type": "doorbell_chime",
        "timestamp": "2022-01-26T04:56:54.031000+00:00",
        "nest_event_id": "EXAMPLE_EVENT_ID",
        "attachment": {
          "image": "/api/nest/event_media/DEVICE_ID/EVENT_ID/thumbnail",
          "video": "/api/nest/event_media/DEVICE_ID/EVENT_ID",
        }
        "zones": ["Zone 1"],
    },
}
```

* `device_id`：相机的 Home Assistant 设备标识符
* `nest_event_id`：是标识事件的不透明标识符。
* `附件`：如果设备支持快照或剪辑，则可能存在，具体取决于设备的功能。这是可以从媒体源获取媒体的 URL。
* `zones`：触发事件的区域（如果可用）。区域是在 Google Home 应用程序中配置的，但并非所有摄像头都支持。命名区域之外的区域中的事件将是空区域名称。

</details>

继续阅读下面的*媒体源附件*，了解如何将媒体与通知操作结合使用。

:::note
此功能通过以下权限启用：

* *Allow Home Assistant to know when there's a camera event*
* *Allow Home Assistant to know when there's a doorbell event*
* *Other permissions and notification settings in the Nest or Google Home apps*.

:::

## Google Home 应用通知设置

Google Home 应用通知设置不仅控制将哪些通知发送到您的手机，
还包括发布到 Pub/Sub feed 的内容。

例如，如果您启用*仅限外出通知*，Home Assistant 将仅在您的手机离开家时接收事件。

另一件可能不直观的事情是，在设备历史记录中看到该事件并不意味着它已发布到源中。
但是，如果您收到推送通知，则这些设置可能有效。

注意：它们对源的确切设置和效果可能会因相机型号或应用程序版本而异。

如果您仍然没有收到通知，您可以阅读此\[来自 Google 的问题排查指南]<!-- textlint-disable -->
(https://support.google.com/googlenest/answer/9230439#zippy=%2Cyour-camera-detected-something-but-you-didnt-get-a-camera-alert)

<!-- textlint-enable -->

<details>
<summary>Google Home 应用通知设置</summary>

| Google Home App Setting  |                                  Notes                                  |
| ------------------------ | :---------------------------------------------------------------------: |
| Notifications: Push      |            Required for any detection event to be published             |
| Notifications: Away-Only | Events will only be published when a user is detected as away from home |
| Seen: Motion             |              Required for `Motion` events to be published               |
| Seen: Person             |              Required for `Person` events to be published               |

![Google Home 应用通知设置的屏幕截图](/home-assistant/images/integrations/nest/google_home_notification_settings.png)

</details>

## 媒体源

Nest [媒体源](/home-assistant/integrations/media_source.md) 平台允许您浏览最近摄像机事件的剪辑。 Home Assistant 并非旨在成为网络录像机 (NVR) 平台，但支持捕获最近事件的基本支持。

上表描述了哪些设备支持图像快照或 10 帧 mp4 视频剪辑。

### 媒体附件

媒体源 API 可以在[配套应用程序附件](https://companion.home-assistant.io/docs/notifications/notification-attachments) 中用于通知，作为上述设备触发器的操作，例如 *按下门铃*。您需要熟悉相机支持的媒体源以及配套应用程序的媒体功能。

* `/api/nest/event_media/DEVICE_ID/EVENT_ID`：事件媒体，根据相机类型支持图像快照 (jpg) 或剪辑预览 (mp4)。

* `/api/nest/event_media/DEVICE_ID/EVENT_ID/thumbnail`：媒体的缩略图预览，根据相机类型支持图像快照（jpg）或剪辑预览（gif）。

您可以在 [automation](/home-assistant/getting-started/automation/index.md) 中使用 Nest 设备触发器负载字段 `attachment.image` 或 `attachment.video` 从 [actions](/home-assistant/getting-started/automation-action/) 发送通知，如下面的示例所示。

<details>
<summary>操作示例：适用于 Android 或 iOS 的剪辑预览（mp4）附件</summary>

支持与 iOS 一起使用的剪辑预览的相机示例，可以在通知中渲染视频。

```yaml
action: notify.mobile_app_iphone
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
    video: "{{ trigger.event.data.attachment.video }}"
```

</details>

<details>
<summary>操作示例：适用于 Android 或 iOS 的剪辑预览缩略图（gif）</summary>

支持剪辑预览但转码为动画 gif 的相机示例（Android 不呈现视频通知）。

```yaml
action: notify.mobile_app_android
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
```

</details>

<details>
<summary>操作示例：适用于 Android 或 iOS 的快照（jpg）附件</summary>

Android 或 iOS 上支持快照 (jpg) 的相机示例。

```yaml
action: notify.mobile_app
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
```

</details>

:::note
此功能通过以下权限启用：

* *根据您选择从此设备共享的事件，允许家庭助理访问相机视频剪辑*
* *根据您选择从此设备共享的事件，允许 Home Assistant 访问相机快照*
* *Nest 或 Google Home 应用中的其他权限*。

:::

## 已知限制

### Google 帐号类型

Google 帐户使用 SDM API 存在一些限制。有关详细信息，请参阅[设备访问注册](https://developers.google.com/nest/device-access/registration) 文档。

主要限制如下：

* 不支持 Google Workspace 帐户。只能使用消费者帐户（例如 gmail.com）。
* Google 帐户一旦与您的设备访问项目关联，就无法更改。在继续之前，请确保您已登录正确的 Google 帐户。

请记住，5 美元的注册费不可退还。

### Google 高级保护计划

[Google 高级保护计划](https://landing.google.com/intl/en_in/advancedprotection/) 用户会自动屏蔽设备控制所需的“受限”API 范围。

:::important
变通方法：如果你启用了 AP，请创建并使用一个次要的标准 Google 帐号（非 AP）来托管这些设备：

1. 创建一个*不带*高级保护的新 Google 帐户（如果您还没有）。

2. 使用此新帐户在 Google Home 应用中创建新的 **Home**。

3. 从主帐户中删除您的 Nest 设备，然后将它们重新添加到这个新的**主页**。请注意，这可能会删除某些设备保存的视频历史记录或设置。

4. 邀请您的主帐户（有 AP 的帐户）作为 **家庭成员** 到新的 **主页**。这使您可以保留对手机上 Google Home 应用的控制权。

5. 使用新的标准帐号凭据连接 Home Assistant。

:::
\*\[AP]：高级保护计划

### Google Home 应用迁移和相机

将相机迁移到 Google Home 应用会将相机从 RTSP 转换为 WebRTC，这会导致快照功能丢失。此外，还有一个已知问题，即目前尚未发布这些活动的媒体；这已报告给 Nest SDM 团队，这是他们迁移的意外副作用。

### 部分支持温度传感器

SDM API 不支持其他 Nest 温度传感器。 API 报告的温度将从当前配置为主动传感器的任何设备中获取，可以通过手动选择或 Nest 应用中提供的时间表进行调整。如果有多个传感器可用，则仅显示活动传感器的温度。

## 故障排查

### 无法关联 Google 帐号

#### 症状：无法链接到\[项目名称]：如果问题仍然存在，请联系\[项目名称]

##### Description

错误 *无法链接到 \[项目名称]* 通常意味着使用的 *OAuth 客户端 ID* 是
家庭助理 [应用程序凭据](/home-assistant/integrations/application_credentials/index.md) 中不匹配。

##### Resolution

最简单的方法是从 Home Assistant 中删除应用程序凭据，然后进行验证
使用的 *OAuth 客户端 ID* 必须在这三个地方保持一致：

* [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - 请参阅上面的说明以创建新的 Web Auth OAuth 凭据（如果需要）。
* [设备访问项目](https://console.nest.google.com/device-access/project-list) - 设备访问项目的 OAuth 客户端 ID 必须引用 Google Cloud Console 中的 Web Auth OAuth 客户端 ID。
* 确保您在设备访问控制台和 Google Cloud Console 中使用相同的 Google 帐户。例如，仔细检查屏幕右上角的照片和帐户名称。
* [应用程序凭据](/home-assistant/integrations/application_credentials/index.md) - Home Assistant 需要配置相同的凭据。如果现有条目不匹配，请删除它们，然后手动输入或在设置过程中重新输入。

![成功截图](/home-assistant/images/integrations/nest/application_credentials.png)

#### 症状：无法访问合作伙伴信息或无法检索信息

##### Description

显示错误“无法访问合作伙伴信息”或“无法检索信息”
在帐户链接过程中意味着所使用的 Google 帐户无法访问 Google Home。

##### Resolution

* 您可以在 Google Home 应用中整理您的家庭和设备，并跨帐户[共享家庭和设备](https://support.google.com/googlenest/answer/9155535)。确保所使用的帐户有权访问主页。
* 如果您以前有 Nest 帐户，请确保其已成功迁移到 Google 帐户。如果您的 Google Home 有多个成员，请注意，最初设置家庭的个人必须完成将其 Nest 帐户迁移到 Google 帐户，然后您才能与 Home Assistant 建立连接。

#### 症状：错误 400：redirect\_uri\_mismatch

##### Description

此错误 *错误 400：redirect\_uri\_mismatch* 表示您的 OAuth 客户端 ID 未配置为与 *My Home Assistant* 回调 URL 匹配。自您最初设置以来，Home Assistant 的重定向 URL 行为可能已发生变化！

##### Resolution

对于具有默认配置的用户：

* 这应该在错误消息中显示重定向 URI `https://my.home-assistant.io/redirect/oauth`。如果错误消息有不同的 URL，那么您正在运行旧版本的 Home Assistant，需要升级或手动禁用 My Home Assistant（见下文）。

![成功截图](/home-assistant/images/integrations/nest/redirect_uri_mismatch.png)

* 返回 [API 控制台](https://console.developers.google.com/apis/credentials) 并选择您的 *OAuth 2.0 客户端 ID*。
* 将 URL `https://my.home-assistant.io/redirect/oauth` 添加到*授权重定向 URI* 列表中，然后单击 **保存** 并重新开始流程。

![成功截图](/home-assistant/images/integrations/nest/redirect_uris_fix.png)

对于手动禁用 *My Home Assistant* 的用户：

* Google 应用严格的[重定向 URI 验证规则](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation) 以确保您的登录凭据安全。实际上，这意味着您必须*通过 SSL* 和*公共顶级域* 访问 Home Assistant。请参阅有关 [Securing](/home-assistant/docs/configuration/securing/index.md) 的文档，并注意您实际上不需要启用远程访问。

* 如果您的安装上没有[我的家庭助理](/home-assistant/integrations/my.md)，
  您可以使用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI
  相反。

* `<HOME_ASSISTANT_URL>` 必须与配置期间使用的相同/
  认证过程。

#### 症状：出现问题：如果问题仍然存在，请联系此应用程序的开发人员

##### Description

这通常意味着您使用了错误类型的凭据或拥有凭据
帐户之间混淆。

##### Resolution

按照上述说明，确保 [Google Cloud Console](https://console.developers.google.com/apis/credentials) 中的凭据是 *Web 应用程序* 凭据。如果您有多个 Google 帐户登录到当前浏览器会话，则在页面之间切换时 Google 可能会默认使用第一个登录的帐户。为了避免这种情况，请注销其他帐户或使用私人/隐身浏览器窗口，仅登录所需的 Google 帐户。

#### 症状：出现问题，请几分钟后重试

##### Description

根据 Google 的[合作伙伴连接管理器错误参考](https://developers.google.com/nest/device-access/reference/errors/pcm)，此错误涵盖了合作伙伴连接中的所有其他未记录的内部错误。导致此错误的问题之一是 Nest 和 Google Home 应用程序之间的同步问题。

##### Resolution

确认您的 Nest 设备在 Google Home 应用和同一 Home 下的 Nest 应用中可见。如果 Google Home 中缺少它，请在 Nest 应用上创建一个新的虚拟主页，这会触发同步过程。 （这是 Google 支持团队推荐的解决方法）。一旦 Nest 设备在 Google Home 应用中可见，就可以删除虚拟条目。

#### 症状：错误 403：access\_denied 或访问被阻止：home-assistant.io 尚未完成 Google 的验证过程

##### Description

错误 *Error 403: access\_denied* 意味着 OAuth Consent 屏幕可能配置错误，
要么是因为它不允许访问您的 Google 帐户，要么是因为您已输入
触发 Google 验证过程的额外信息。谷歌将要求
当您向品牌页面添加额外信息时进行验证。

#### Resolution

访问 OAuth [验证中心](https://console.cloud.google.com/auth/verification) 并
确认*验证状态*为*不需要验证*。如果验证
需要：

1. 导航至[品牌](https://console.cloud.google.com/auth/branding)页面。
2. 删除不需要的其他字段并保存。请参阅上面的设置说明并
   确保不要输入额外的字段。
3. 返回验证中心，确认状态正确。

此外，您需要按照以下步骤确保受众配置正确：

1. 访问 OAuth [受众](https://console.cloud.google.com/auth/audience) 页面。
2. 确保帐户设置为*在生产中*。

您现在可以重复集成设置和帐户链接步骤。

#### 症状：错误：invalid\_client 无应用程序名称

##### Description

错误 *Error: invalid\_client no application name* 表示 OAuth 同意屏幕尚未
已针对项目进行了完全配置，并且需要其他信息。

#### Resolution

访问 [OAuth 同意屏幕](https://console.developers.google.com/apis/credentials/consent) 并
输入必填字段（应用程序名称、支持电子邮件、开发人员电子邮件），并将其他所有内容保留为默认值。

### 找不到设备

#### 症状：设备未出现在 Home Assistant 中

##### Description

这通常意味着 Home Assistant 无权访问该设备，因为该设备未归还
来自 SDM API。

##### Resolution

您可以在 Nest [合作伙伴连接管理器](https://nestservices.google.com/partnerconnections) 中管理与 Home Assistant 共享的设备和权限。 Home Assistant 会自动更新以反映您所做的任何更改。有关更多详细信息，请参阅 [SDM API 故障排除](https://developers.google.com/nest/device-access/authorize#modify_account_permissions) 文档。

#### 症状：恒温器未出现在 Home Assistant 中或不可用

有报告称，由于 SDM API 中的错误，恒温器可能不会出现或不可用。让 API 重新工作的常见修复方法是尝试以下步骤：

* 重新启动恒温器设备。有关更多详细信息，请参阅[如何重新启动或重置 Nest 恒温器](https://support.google.com/googlenest/answer/9247296)。
* 在官方 Nest 应用程序或 https://home.nest.com 上：将恒温器移至其他房间或假房间/临时房间。
* Home Assistant 会自动更新以反映您所做的任何更改，并将发现 API 中出现的新设备。

#### 症状：禁用 API 时不显示设备

##### Description

当 SDM API 被禁用时，SDM API 可能不会返回授权帐户的设备。

##### Resolution

仔细检查 GCP 是否配置正确并[启用 API](https://developers.google.com/nest/device-access/get-started#set_up_google_cloud_platform)，并在 OAuth 设置流程中至少授权一台设备。如果您在这里遇到问题，那么您可能需要浏览 Google 说明并直接针对 API 发出命令，直到成功取回设备。

### 认证问题

#### 症状：经常需要重新身份验证

##### Description

您可能会被要求比预期更频繁地重新进行身份验证，例如每 7 天一次。这意味着 OAuth 同意屏幕配置错误，或者您的身份验证令牌因其他原因被 Google 撤销。

##### Resolution

* 最可能的原因是 *OAuth 同意屏幕* 默认设置为 *测试*，令牌将在 7 天后过期。
* 按照上述步骤将其设置为*生产*以解决此问题，并再次重新授权您的集成以获得新令牌。
* 您可能还会看到错误消息*invalid\_grant：令牌已过期或撤销*。
* 请参阅 [Google Identity：刷新令牌过期](https://developers.google.com/identity/protocols/oauth2#expiration)，了解有关令牌可能过期的更多原因。

### 集成设置失败

#### 症状：配置错误：无法创建订阅者“订阅/名称”未找到

##### Description

集成无法启动，因为它尝试创建具有订阅的订阅者
在您的 Google 帐户中找不到的名称。默认情况下，Google 发布/订阅订阅将在 31 天不活动后被删除（[参考](https://cloud.google.com/knowledge/kb/pub-sub-subscriptions-disappeared-without-any-deletion-logs-000004170)）。如果发生这种情况，集成将失败，您将在 Home Assistant 日志中看到前面的日志行。

##### Resolution.

要修复该订阅：

1. 转到 [设备访问控制台](https://console.nest.google.com/device-access/project-list) 并重新启用 Pub/Sub 主题。
2. 可能需要重新创建 Nest 集成才能获取新的 Pub/Sub 主题。
3. （可选）为防止将来过期，请转到 [Google Cloud Console Pub/Sub 订阅页面](https://console.cloud.google.com/cloudpubsub/subscription/list) 并将 Nest 创建的 Pub/Sub 订阅编辑为默认不会过期。

### Nest 集成数据问题

#### 症状：未接收到相机运动和人物事件

Nest 集成订阅 Google Pub/sub 订阅以侦听相机运动
或人物事件。 Google Home 应用中的设置还可以控制哪些事件
已发布，因此如果设置不正确，您可能不会收到事件。

#### Resolution

* 确认您已允许 Home Assistant 访问摄像头流，并且在 [合作伙伴连接管理器](https://nestservices.google.com/partnerconnections) 中正确设置了权限。
* 如果您仍然看不到事件，则可能需要调整 Google Home 应用设置。有关详细信息，请参阅 [Google Home 应用通知设置](#google-home-app-notification-settings)。

#### 症状：设备未接收更新信息

##### Description

您可能会看到 Google Home 中的更改出乎意料地没有反映在 Home Assistant 中。 Nest 集成订阅来自 Google Pub/sub 订阅的更新以及陈旧信息的问题
通常表明订阅者配置有问题。

传感器或恒温器温度设置点等内容的更改应立即发布到主题，并在一切配置正确后由家庭助理订阅者接收。

##### Resolution

* 要详细了解 Google Pub/Sub 的工作原理，请参阅[拉取订阅工作流程文档](https://cloud.google.com/pubsub/docs/pull#pull-workflow)。以下部分中的步骤将：

1. 验证 Nest 设备访问控制台是否配置了用于发布消息的 Pub/Sub 主题
2. （可选）验证主题消息发布。这些步骤适用于某些主题配置。
3. 验证Pub/Sub订阅消息路由
4. 验证 Home Assistant 是否正在接收 Pub/Sub 订阅上的消息

* **验证 Nest 设备访问控制台配置**

1.访问[设备访问控制台](https://console.nest.google.com/device-access/project-list)
2.点击Home Assistant设备接入项目
3\. 验证*发布/订阅主题*是否已*启用*。如果没有，请按照集成配置说明进行操作。
4\. 如果 Pub/Sub 主题以 `projects/<您的云项目>/topics/home-assistant-` 开头，则您正在使用由 Home Assistant 创建的主题。您可以按照下一节中的步骤来验证该主题。
5\. 如果 Pub/Sub 主题以 `projects/sdm-prod/topics` 开头，则您正在使用由设备访问控制台创建的主题。这是老方法，但效果完全没问题。您应该跳过下一节。

* **（可选）验证主题消息发布。** 如果使用以 `projects/sdm-prod/topics` 开头的主题名称，请跳过此部分

1. 访问 Pub/Sub 主题 [Cloud Console](https://console.cloud.google.com/cloudpubsub/topic/list)
2. 单击与设备访问控制台配置匹配的 Home Assistant 主题 ID。
3. 查看*订阅*选项卡并确认有订阅 ID。这将在下一节中得到验证。
4. 单击*指标*选项卡并将缩放设置为*6 小时*或*1 天*。
5. 查看*已发布消息计数*。这对设备向主题发布的消息进行计数。如果消息数量不符合您的预期，则表明：
   * 设备连接到 Google 时出现问题：验证设备在 Google Home 应用中是否正常工作。
   * SDM API 的问题：这需要[设备访问支持](https://developers.google.com/nest/device-access/support) 来诊断或解决。

* **验证 Pub/Sub 订阅消息路由**

1. 访问 Pub/Sub 订阅 [Cloud Console](https://console.cloud.google.com/cloudpubsub/subscription/list)
2. 单击 Home Assistant 订阅 ID
3. 确认*主题名称*与上面的 Nest 设备访问控制台中的相同。
4. 查看底部面板中的*Metrics* 选项卡，其中包括：

* *传送指标*：*发布消息计数*显示在路由到订阅的主题上发布的消息。您可能需要向下滚动才能看到这一点。
  * *最早的未确认消息年龄*显示 Home Assistant Nest 集成未完全接收消息。请参阅下一节进行诊断。

5. 单击“消息”选项卡
6. 单击“拉取”以查看收到的有关该主题的消息的示例。这些对应于上一节中可选地通过*已发布消息计数*验证的消息。如果没有发布消息，则表明：

* 订阅配置错误：确认*主题 ID* 与设备访问控制台匹配。如果它们不匹配，请按照集成配置说明来解决此问题。
  * 设备连接到 Google 时出现问题：验证设备在 Google Home 应用中是否正常工作。
  * SDM API 的问题：这需要[设备访问支持](https://developers.google.com/nest/device-access/support) 来诊断或解决。

7. 单击已接收消息的箭头可*查看所有行内容*，以便更轻松地查看已接收消息的完整内容。您可以确认该消息包含您期望看到的信息，并且与下一部分中 Home Assistant 收到的消息相对应。

* **验证家庭助理正在接收消息**

1. 启用 Nest 集成的调试日志。有关说明，请参阅[调试日志和诊断](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。
   2.查看原始日志
2. 成功接收的事件消息将出现在调试日志中，类似于以下内容：

  <details>
<summary>调试日志示例：收到 1 条消息</summary>

```text
2025-11-08 09:15:57.620 DEBUG (MainThread) [google_nest_sdm.streaming_manager] Received 1 messages
2025-11-08 09:15:57.621 DEBUG (MainThread) [google_nest_sdm.event] EventMessage raw_data={'eventId': 'xxxxxx-yyyy-zzzz-aaaa', 'timestamp': '2025-11-08T17:15:56.470930Z', 'resourceUpdate': {'name': 'enterprises/...'}}
2025-11-08 09:15:57.621 DEBUG (MainThread) [google_nest_sdm.device] Processing update xxxxxx-yyyy-zzzz-aaaa @ 2025-11-08 17:15:56.470930+00:00
2025-11-08 09:15:57.621 DEBUG (MainThread) [google_nest_sdm.device] Trait update {'sdm.devices.traits.ThermostatMode': {'mode': 'COOL', 'availableModes': ['HEAT', 'COOL', 'HEATCOOL', 'OFF']}, 'sdm.devices.traits.ThermostatEco': {'availableModes': ['OFF', 'MANUAL_ECO'], 'mode': 'OFF', 'heatCelsius': 4.4444427, 'coolCelsius': 24.444443}, 'sdm.devices.traits.ThermostatTemperatureSetpoint': {'coolCelsius': 25.997345}, 'name': 'enterprises/<project id>/devices/<device_id>'}
2025-11-08 09:17:14.406 DEBUG (MainThread) [google_nest_sdm.subscriber_client] Sending streaming pull request (acking 1 messages)
```

</details>

4. 订阅拉取请求长时间运行，并且每隔几分钟重新连接。这是正常现象，您将看到诸如“流拉取中的 API 错误”和“已建立事件流连接”之类的调试消息。 [拉取订阅工作流程文档](https://cloud.google.com/pubsub/docs/pull#pull-workflow) 更详细地描述了其工作原理。以下调试日志表明订阅连接工作正常。

  <details>
<summary>调试日志示例：事件流连接已建立</summary>

```text
2025-11-08 09:19:50.827 DEBUG (MainThread) [google_nest_sdm.subscriber_client] API error in streaming pull: 503 The service was unable to fulfill your request. Please try again. [code=8a75]
2025-11-08 09:19:50.828 DEBUG (MainThread) [google_nest_sdm.streaming_manager] Disconnected from event stream: API error when streaming iterator: 503 The service was unable to fulfill your request. Please try again. [code=8a75]
2025-11-08 09:19:50.830 DEBUG (MainThread) [google_nest_sdm.streaming_manager] Reconnecting stream in 10.0 seconds
...
2025-11-08 09:20:00.837 DEBUG (MainThread) [google_nest_sdm.subscriber_client] Sending streaming pull request for projects/<your cloud project>/subscriptions/home-assistant-prod
...
2025-11-08 09:20:01.004 DEBUG (MainThread) [google_nest_sdm.streaming_manager] Event stream connection established
2025-11-08 09:20:01.004 DEBUG (MainThread) [google_nest_sdm.subscriber_client] Starting streaming iterator
```

</details>

5. 确认调试日志中“发送流式拉取请求”消息中的订阅 ID 与上面在云控制台中验证的订阅 ID 匹配。如果它们不匹配，请按照集成配置说明来解决此问题。

* 报告 Nest 集成问题时，请提供设备发布的消息等详细信息以及调试日志中的详细信息。

## 移除集成

此集成遵循标准移除流程，不需要额外步骤。

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 并选择该集成卡片。
2. 在设备列表中，选择你想移除的集成实例。
3. 在对应条目旁，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。

删除集成后，你可能还想清理设置过程中添加到 Google 帐号中的未使用信息。可查看本集成的配置说明，了解如何找到已配置的 OAuth 凭据和设备访问项目位置。
