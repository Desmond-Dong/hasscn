# Google Mail

**Google Mail** 集成允许您将 [Google Mail](https://mail.google.com) 连接到 Home Assistant。该集成添加了一个动作，允许您设置电子邮件自动回复，用于度假时。还添加了一个 `notify` 动作，允许您起草或发送纯文本电子邮件。

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest.md)、[Google Sheets](/home-assistant/integrations/google_sheets.md) 和 [YouTube](/home-assistant/integrations/youtube.md) 的凭据相同。
这些与之前为 [Google Calendar](/home-assistant/integrations/google.md) 推荐的 *Device Auth* 凭据不同。

### Scenario 1: You already have credentials

In this case, all you need to do is enable the API:

1. Go to the Google Developers Console [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com).
2. Confirm the project and select **Enable** for the API.
3. Continue with the steps described in the [Configuration](#configuration) section.

### Scenario 2: You do not have credentials set up yet

In this case, you need to generate a client secret first:

<details>
<summary>To generate client ID and client secret</summary>

This section explains how to generate a client ID and client secret in the [Google Developers Console](https://console.cloud.google.com/apis/library/gmail.googleapis.com).

1. First, go to the Google Developers Console to enable [Gmail API](https://console.cloud.google.com/apis/library/gmail.googleapis.com).
2. Select **Create project**, enter a project name, and select **Create**.
3. Enable Gmail API.
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

The integration setup then gives you instructions to enter the [Application Credentials](/home-assistant/integrations/application_credentials/index.md) and authorize Home Assistant to connect to Google Mail.

<details>
<summary>OAuth and device authorization steps</summary>

1. Continue through the steps of selecting the account you want to authorize.
2. You may get a message telling you that the app has not been verified and that you need to acknowledge it to proceed.
3. Review what Home Assistant is requesting access to, then select **Continue**.
4. When the page displays **Link account to Home Assistant?**, confirm that **Your instance URL** is correct, then select **Link Account**.
5. You can close the window and return to Home Assistant, where you should see a **Success!** message.

</details>

## 故障排除

如果您的凭据出现错误，可以在[应用程序凭据](/home-assistant/integrations/application_credentials/index.md)用户界面中删除它们。

### 动作：设置假期

`google_mail.set_vacation` 动作允许您设置假期选项。

<details>
<summary>创建事件动作详情</summary>

| 数据属性 | 可选 | 描述 | 示例 |
| ---------------------- | -------- | ----------- | --------|
| `enabled` | 是 | 关闭此项以结束假期回复。 | True
| `title` | 否 | 电子邮件的主题。 | Vacation
| `message` | 是 | 电子邮件正文。 | I am on vacation.
| `plain_text` | 否 | 选择以纯文本或 HTML 发送消息。 | True
| `restrict_contacts` | 否 | 限制自动回复仅发送给联系人。 | True
| `restrict_domain` | 否 | 限制自动回复仅发送给域内。这仅影响 GSuite 账户。 | False
| `start` | 否 | 假期第一天。 | 11-20-2022
| `end` | 否 | 假期最后一天。 | 11-26-2022

</details>

添加的 `notify` 服务将以您在同意屏幕上选择的电子邮件地址命名。例如，名为 "example@gmail.com" 的电子邮件地址将显示为 `notify.example_gmail_com`。

### Google Mail 通知动作数据

以下属性可以放置在动作的 `data` 键中以实现扩展功能：

| 属性              | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `cc`               |      是 | 抄送收件人列表。
| `bcc`                   |      是 | 密送收件人列表。
| `from`                   |      是 | 默认为当前认证用户。通常仅适用于 GSuite 账户，其中用户具有共享邮箱的代理访问权限。
| `send`                 |      是 | 默认为 true。设置为 false 以创建草稿。在这种情况下不需要收件人。
| `alias_from`           |      是 | 将显示给收件人的名称，而不是用户电子邮件。如果要使用此选项，必须设置 `from`。 |

### 示例

这是发送电子邮件的完整服务调用：

```yaml
action: notify.example_gmail_com
data:
  message: "test"
  title: "test email"
  target:
    - "example2@gmail.com"
  data:
    cc:
      - "example3@gmail.com"
    bcc:
      - "example4@gmail.com"
    from: "example@gmail.com"
    alias_from: "Example alias"
```

### 视频教程

此视频教程说明了如何在 Home Assistant 中设置 Gmail，以及如何创建仪表板和自动化来发送电子邮件和切换您的外出通知。

<lite-youtube videoid="IHKliqSFZvM" videotitle="How To send e-mail PERFECTLY using Gmail in Home Assistant - Tutorial" posterquality="maxresdefault"></lite-youtube>
