---
title: Google Drive
description: '此集成允许您将 Google Drive(https://drive.google.com) 与 Home Assistant 备份连接。设置此集成时，您的 Google Drive 将有一个名为 Home Assistant 的新文件夹，所有备份都将存储在其中。'
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_release: '2025.2'
ha_config_flow: true
ha_domain: google_drive
ha_codeowners:
  - '@tronikos'
ha_integration_type: service
ha_quality_scale: platinum
google_dev_console_link: https://console.developers.google.com/start/api?id=drive
api: Google Drive API
api_link: https://console.developers.google.com/start/api?id=drive
related:
  - docs: /common-tasks/general/#backups
    title: Creating backups in Home Assistant
  - url: https://drive.google.com
    title: Google Drive
  - url: https://console.developers.google.com/start/api?id=drive
    title: Google Developer Console
ha_platforms:
  - diagnostics
  - sensor
---
# Google Drive

此集成允许您将 [Google Drive](https://drive.google.com) 与 Home Assistant 备份连接。设置此集成时，您的 Google Drive 将有一个名为 `Home Assistant` 的新文件夹，所有备份都将存储在其中。要打开此文件夹，请前往 **设置** > **设备与服务** > **Google Drive**，然后选择 **访问**。您可以随时在 Google Drive 中将此文件夹重命名为您喜欢的任何名称。如果您删除该文件夹，只要集成启用，它将自动重新创建。

有关设置说明的视频演示，请观看此视频从 13:50 到 19:20
<lite-youtube videoid="pZlYu9bN72U" videoStartAt="830" videotitle="Automate Your Home Assistant Backups Like A Pro!" posterquality="maxresdefault"></lite-youtube>

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Google Sheets](/home-assistant/integrations/google_sheets)、[Nest](/home-assistant/integrations/nest)、[YouTube](/home-assistant/integrations/youtube) 和 [Google Mail](/home-assistant/integrations/google_mail) 的凭据相同。
这些与之前为 [Google Calendar](/home-assistant/integrations/google) 推荐的 *设备授权* 凭据不同。

### 场景 1：您已有凭据

这种情况下，您只需要启用 API：

1. 前往 Google Developers Console 中的 [Google Drive API](https://console.developers.google.com/start/api?id=drive)。
2. 确认项目后，为 API 选择 **启用**。
3. 继续按照[配置](#configuration)部分中的步骤操作。

### 场景 2：您尚未设置凭据

这种情况下，您需要先生成客户端密钥：

<details>
<summary>生成客户端编号和客户端密钥</summary>

本节说明如何在 [Google Developers Console](https://console.developers.google.com/start/api?id=drive) 中生成客户端 ID 和客户端密钥。

1. First, go to the Google Developers Console to enable [Google Drive API](https://console.developers.google.com/start/api?id=drive).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable Google Drive API.
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

随后，集成设置流程会引导您输入[应用程序凭据](/home-assistant/integrations/application_credentials/)，并授权 Home Assistant 连接到 Google Drive。

<details>
<summary>账户授权步骤</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 传感器
集成提供以下传感器，每 6 小时更新一次：

- **总可用存储空间**：存储限制（如适用）。如果用户有无限存储空间，这将显示为未知。
- **已用存储空间**：所有 Google 服务的总存储使用量。
- **Drive 已用存储空间**：Google Drive 中所有文件的使用量。此实体默认禁用。
- **Drive 回收站已用存储空间**：Google Drive 中已删除文件的使用量。此实体默认禁用。
- **备份总大小**：当前 Home Assistant 安装的所有备份大小之和。

对于属于具有共享存储空间的组织的用户，有关所有服务的可用存储空间和已用存储空间的信息是针对组织的，而不是针对个人用户的。

## 示例

从这些自动化示例开始。

### 当云盘接近存储限制时发送警报

当云盘使用量接近存储限制并需要清理时发送警报。

<details>
<summary>配置示例</summary>


使用以下代码创建自动化。请记得将 `your_email_gmail_com` 替换为您传感器的实际 ID（在 **设置** > **设备与服务** > **实体** 中找到），并将 `notify.mobile_app_your_device` 替换为您的实际通知器。


```yaml
alias: 当 Google 账户接近存储限制时发出警报
description: 当云盘需要清理时向手机发送通知。
triggers:
  - trigger: template
    value_template: >
      {% set used = states('sensor.your_email_gmail_com_used_storage') | float(0) %}
      {% set total = states('sensor.your_email_gmail_com_total_available_storage') | float(0) %}
      {{ used > (total * 0.9) }}
actions:
  - action: notify.mobile_app_your_device
    data:
      title: Google 账户即将满了！
      message: >
        Google 账户已使用 {{ states('sensor.your_email_gmail_com_used_storage') }}GB，共 {{
        states('sensor.your_email_gmail_com_total_available_storage') | float }}GB。
```


</details>

## 移除集成

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择该集成卡片。
2. 在设备列表中，选择您要删除的集成实例。
3. 在该条目旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。

- 如果您移除集成，Google Drive 中的 Home Assistant 文件夹不会自动删除。您必须在 Google Drive 中手动删除它。

## 已知限制

- 集成只能访问它在 Home Assistant 文件夹中创建的文件。它无法访问或修改您 Google Drive 中的任何其他文件。

## 故障排除

如果您的凭据有错误，您可以在 [应用凭据](/home-assistant/integrations/application_credentials/) 用户界面中删除它们。
