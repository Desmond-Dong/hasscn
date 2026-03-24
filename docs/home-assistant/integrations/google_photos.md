---
title: Google Photos
description: 关于如何在 Home Assistant 中使用 Google Photos 的说明。
ha_category:
  - Media source
ha_iot_class: Cloud Polling
ha_release: '2024.10'
ha_config_flow: true
ha_domain: google_photos
ha_codeowners:
  - '@allenporter'
ha_integration_type: service
related:
  - docs: /integrations/media_source
    title: Media source integration documentation
  - url: https://photos.google.com/
    title: Google Photos
  - url: https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com
    title: Google Developers Console
---

**Google Photos** 集成允许您使用 Home Assistant 将照片上传到您的 [Google Photos](https://photos.google.com/)。该集成添加了用于上传照片的动作和[媒体源](/home-assistant/integrations/media_source)来查看或投射由 Home Assistant 上传的内容。此集成不会让 Home Assistant 访问您的整个 Google Photos 媒体库。

## 前提条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Google 账户。
这些凭据与 [Nest](/home-assistant/integrations/nest)、[Google Tasks](/home-assistant/integrations/google_tasks) 和 [Google Mail](/home-assistant/integrations/google_mail) 的凭据相同。
这些与之前为 [Google Calendar](/home-assistant/integrations/google) 推荐的 *设备授权* 凭据不同。

如果您已经设置了正确的凭据，可以执行步骤 1，然后跳到下面说明中的步骤 13。

<details>
<summary>生成客户端 ID 和客户端密钥</summary>


本节介绍如何在 [Google 开发者控制台](https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com) 上生成客户端 ID 和客户端密钥。

1. 首先，前往 Google 开发者控制台启用 [Google Photos Library API](https://console.cloud.google.com/apis/library/photoslibrary.googleapis.com)
2. 向导会要求您选择一个项目来管理您的应用程序。选择一个项目并选择 **继续**。
3. 验证您的 Google Photos Library API 已启用并选择 **转到凭据**。
4. 导航到 **API 和服务**（左侧边栏）> [凭据](https://console.cloud.google.com/apis/credentials)。
5. 点击屏幕左侧的字段 **OAuth 同意屏幕**。
6. 选择 **外部** 并 **创建**。
7. 将 **应用名称**（请求同意的应用程序名称）设置为您想要的任何名称，例如 *Home Assistant*。
8. 然后您需要选择一个 **支持电子邮件**。为此，从下拉菜单中选择您的电子邮件地址。
9. 最后您需要完成 **开发者联系信息** 部分。为此，输入您的电子邮件地址（与上面相同即可）。
10. 滚动到底部并选择 **保存并继续**。您不必填写其他任何内容，否则可能会启用额外的审核。
11. 然后您将自动进入 **作用域** 页面。您不需要在这里添加任何作用域，所以选择 **保存并继续** 进入 **可选信息** 页面。您不需要在 **可选信息** 页面添加任何内容，所以选择 **保存并继续**，这将带您进入 **摘要** 页面。选择 **返回仪表板**。
12. 再次选择 **OAuth 同意屏幕** 并将 **发布状态** 设置为 **正式版**。否则，您的凭据将每 7 天过期一次。
13. 确保 **发布状态** 设置为正式版。
14. 选择屏幕左侧菜单中的 **凭据**，然后选择 **创建凭据**（屏幕顶部），然后选择 **OAuth 客户端 ID**。
15. 将应用程序类型设置为 **Web 应用程序**并为这组凭据命名（如"Home Assistant 凭据"）。
16. 将 `https://my.home-assistant.io/redirect/oauth` 添加到 **授权重定向 URI**，然后选择 **创建**。这不是占位符，而是必须使用的 URI。
17. 然后您将看到一个弹出窗口，显示 **OAuth 客户端已创建**，显示 **您的客户端 ID** 和 **您的客户端密钥**。记下这些（例如，将它们复制并粘贴到文本编辑器中），因为您很快会需要它们。记下这些字符串后，选择 **确定**。如果您需要在任何时候再次找到这些凭据，请导航到 **API 和服务** > **凭据**，您将在 **OAuth 2.0 客户端 ID** 下看到 **Home Assistant 凭据**（或您在上一步中命名的任何名称）。要查看 **客户端 ID** 和 **客户端密钥**，请选择铅笔图标。这将带您进入这些凭据的设置页面，信息将位于页面右侧。
18. 再次检查 **Google Photos Library API** 是否已自动启用。为此，从菜单中选择 **库**，然后搜索 **Google Photos Library API**。如果已启用，您将看到 **API 已启用** 旁边有一个绿色勾号。如果未启用，请启用它。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成设置接下来会为您提供说明，以输入[应用凭据](/home-assistant/integrations/application_credentials/)（OAuth 客户端 ID 和客户端密钥）并授权 Home Assistant 访问您的 Google Photos。

<details>
<summary>OAuth 和设备授权步骤</summary>


1. 继续执行选择您要授权的账户的步骤。

2. **注意**：您可能会收到一条消息，告诉您该应用程序尚未经过验证，您需要确认才能继续。

3. 您现在可以看到您授权 Home Assistant 访问的内容详情，底部有两个选项。选择 **继续**。请记住，这是授予对您私人照片库的敏感访问权限。

4. 页面现在将显示 **将账户链接到 Home Assistant？**，注意 **您的实例 URL**。如果不正确，请参阅 [My Home Assistant](/home-assistant/integrations/my)。如果一切看起来正确，选择 **链接账户**。

5. 您可以关闭窗口，返回 Home Assistant，您应该会看到 Home Assistant 的 **成功！** 消息。


</details>


### 动作：上传

`google_photos.upload` 动作允许您将照片从 Home Assistant 上传到 Google Photos。

<details>
<summary>上传动作详情</summary>


| 数据属性 | 可选 | 描述 | 示例 |
| ---------------------- | -------- | ----------- | --------|
| `filename` | 否 | 要上传的图像路径。 | /mnt/image.jpg |
| `album` | 否 | 作为上传内容目标位置的相册名称。 | 伦敦假期 |
| `config_entry_id` | 否 | Google Photos 配置条目的 ID。 | a1bee602deade2b09bc522749bbce48e |


</details>


## 故障排除

如果您的凭据有错误，您可以在 [应用凭据](/home-assistant/integrations/application_credentials/) 用户界面中删除它们。