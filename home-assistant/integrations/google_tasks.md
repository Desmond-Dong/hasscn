# Google Tasks

**Google Tasks** 集成允许您将 [Google Tasks](https://support.google.com/tasks/answer/7675772) 连接到 Home Assistant。该集成为每个任务列表添加一个[待办事项实体](/home-assistant/integrations/todo.md)，允许您从 **待办事项** 仪表板创建、更新或删除列表中的项目。

您可以在自动化中使用待办事项列表，例如当 Home Assistant 检测到设备电量不足时添加新任务。当与 Home Assistant 语音助手结合使用时，您可以通过说类似 *将清理车库添加到个人任务列表* 之类的话来管理您的 Google Tasks。

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest.md)、[Google Mail](/home-assistant/integrations/google_mail.md) 和大多数其他 Google 集成的凭据相同。
这些与之前为 [Google Calendar](/home-assistant/integrations/google.md) 推荐的 *Device Auth* 凭据不同。

### Scenario 1: You already have credentials

In this case, all you need to do is enable the API:

1. Go to the Google Developers Console [Google Tasks API](https://console.cloud.google.com/apis/enableflow?apiid=tasks.googleapis.com).
2. Confirm the project and select **Enable** for the API.
3. Continue with the steps described in the [Configuration](#configuration) section.

### Scenario 2: You do not have credentials set up yet

In this case, you need to generate a client secret first:

<details>
<summary>To generate client ID and client secret</summary>

This section explains how to generate a client ID and client secret in the [Google Developers Console](https://console.developers.google.com/start/api?id=tasks).

1. First, go to the Google Developers Console to enable [Google Tasks API](https://console.cloud.google.com/apis/enableflow?apiid=tasks.googleapis.com).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable Google Tasks API.
4. Navigate to **APIs & Services** > [Credentials](https://console.cloud.google.com/apis/credentials).
5. In the left sidebar, select **OAuth consent screen**.
6. Complete the app information and create the consent screen.
7. Under **Publishing status** > **Testing**, select **Publish app**.
8. In the left sidebar, select **Clients** and create a **Web application** client.
9. Add `https://my.home-assistant.io/redirect/oauth` to **Authorized redirect URIs** and select **Create**.
10. Copy the **Client ID** and **Client Secret** before closing the dialog.

</details>

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The integration setup then gives you instructions to enter the [Application Credentials](/home-assistant/integrations/application_credentials/index.md) and authorize Home Assistant to connect to Google Tasks.

<details>
<summary>OAuth and device authorization steps</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 支持的功能

### 实体

Google Tasks 集成提供以下实体。

#### 待办事项列表

该集成将为每个任务列表创建一个[待办事项实体](/home-assistant/integrations/todo.md)。
例如，一个名为 *My Tasks* 的 Google Tasks 列表将有一个名为 *My Tasks* 的 Home Assistant 待办事项实体。

Google Task 集成可以创建、更新或删除待办事项列表上的项目。
待办事项实体支持创建、更新和删除待办事项列表上的项目。待办事项项目支持以下字段：

* **项目**：项目是 Google Task 的 *Title* 字段。
* **截止日期**：Google Tasks 的日期字段。Google Tasks 中的时间字段不受 Google Tasks API 支持。
* **描述**：Google Tasks 的 *Details* 字段。
* **状态**：Google Tasks 的 *Completed* 复选框对应于待办事项状态，未选中时为 `needs_action`，选中时为 `completed`。

## 动作

Google Tasks 集成提供待办事项实体支持的所有动作，包括检索、创建、更新和删除待办事项项目的动作以及上述字段。有关更多详细信息，请参阅 [待办事项：动作](/home-assistant/integrations/todo.md#actions) 文档。

## 示例

### 低电量维护

您可以使用 Google Tasks 帮助您自动化电池维护。要解决这个问题，您可以使用此蓝图发送带有电量不足设备的通知。通知包含一个可以向您的 Google Tasks 待办事项列表添加项目的按钮。

[低电量通知与操作](https://community.home-assistant.io/t/653754)

## 数据更新

Google Tasks 集成最初获取一次任务列表，并为每个任务列表创建一个待办事项。每个待办事项的数据通过每 30 分钟轮询一次来刷新。

在 Home Assistant 中对待办事项列表的更新使用 Google Tasks API，更改会立即在 Google Tasks 中反映出来。这也将刷新待办事项列表内容，再次轮询任何新更改。

## 已知限制

有一些已知的 Google Tasks API 限制会影响此集成：

* 仅支持轮询。Google Tasks 中的更新不会立即在 Home Assistant 中反映。
* 仅支持查看或设置任务截止日期。不支持任务截止时间。

## 故障排除

### 无法设置集成

#### 症状："The OAuth client was not found."

尝试配置集成时，Google OAuth 流程显示消息 *The OAuth client was not found* 和 *Error 401: invalid\_client*。

##### 描述

这意味着 Home Assistant 中的应用程序凭据与 Google Cloud 控制台中的 OAuth 凭据不匹配。

##### 解决方法

要解决此问题：

1. 按照[应用程序凭据](/home-assistant/integrations/application_credentials/index.md#deleting-application-credentials)中的说明删除任何现有凭据。
2. 按照上面[前提条件](#prerequisites)中的步骤操作。
3. 按照上面[配置](#configuration)中的步骤操作。

#### 症状："Unable to access the Google API: Tasks API has not been used in project before or it is disabled"

Home Assistant 配置集成失败，错误为 *Unable to access the Google API: Google Tasks API has not been used in project before or it is disabled*。

##### 描述

这意味着 Home Assistant 无法使用 Google Tasks API，因为它未在 Google Cloud Console 中启用。

##### 解决方法

按照上面[前提条件](#prerequisites)中的步骤启用 Google Tasks API。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

系统会询问您是否要移除[应用程序凭据](/home-assistant/integrations/application_credentials/index.md)，如果您不再计划在 Home Assistant 中使用 Google Tasks，可以这样做。您可能还想移除在前提条件中创建的 Google Cloud Console 中的任何凭据，如果它们不再与您的任何其他 Home Assistant 集成一起使用。
