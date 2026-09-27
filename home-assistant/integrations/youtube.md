# YouTube

**YouTube** 集成可让您将 YouTube 频道连接到 Home Assistant。

对于您添加的每个频道，此集成都将创建以下传感器：

* 观看次数
* 订阅者数量
* 最新上传的视频

## 前提条件

要配置此集成，您需要拥有一个 YouTube 频道。
如需了解如何创建频道，请参阅 [YouTube 文档](https://support.google.com/youtube/answer/1646861)。

您需要配置开发者凭据，以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest.md)、[Google Mail](/home-assistant/integrations/google_mail.md) 和 [Google Sheets](/home-assistant/integrations/google_sheets.md) 使用的是同一组。
它们与 [Google Calendar](/home-assistant/integrations/google.md) 使用的凭据不同。

### 场景 1：您已有凭据

这种情况下，您只需要启用 API：

1. 前往 Google Developers Console 中的 [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=home-assistant-17698)。
2. 确认项目后，为 API 选择 **启用**。
3. 继续按照[配置](#configuration)部分中的步骤操作。

### 场景 2：您尚未设置凭据

这种情况下，您需要先生成客户端密钥：

<details>
<summary>生成客户端编号和客户端密钥</summary>

本节说明如何在 [Google Developers Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com) 中生成客户端 ID 和客户端密钥。

1. First, go to the Google Developers Console to enable [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=home-assistant-17698).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable YouTube Data API v3.
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

随后，集成设置流程会引导您输入[应用程序凭据](/home-assistant/integrations/application_credentials/index.md)，并授权 Home Assistant 连接到 YouTube。

<details>
<summary>账户授权步骤</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### 从 Home Assistant 中移除集成实例

1. 前往 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)，然后选择该集成卡片。
2. 在设备列表中，选择您要删除的集成实例。
3. 在该条目旁边，选择三点菜单 `[mdi:dots-vertical]`，然后选择 **删除**。
