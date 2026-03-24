---
title: Fitbit
description: 关于如何在 Home Assistant 中集成 Fitbit 设备的说明。
ha_category:
  - Health
ha_iot_class: Cloud Polling
ha_release: 0.19
ha_domain: fitbit
ha_platforms:
  - sensor
ha_integration_type: service
ha_codeowners:
  - '@allenporter'
ha_config_flow: true
---

**Fitbit** 集成允许您将 [Fitbit](https://fitbit.com/) 的数据暴露给 Home Assistant。

## 先决条件

您需要配置开发者凭据以允许 Home Assistant 访问您的 Fitbit 账户。

<details>
<summary>生成客户端 ID 和客户端密钥</summary>


1. 您的 Fitbit 账户必须在 [Fitbit 开发者门户](https://dev.fitbit.com)注册为开发者账户，并拥有已验证的电子邮件地址。 
2. 访问[注册应用程序](https://dev.fitbit.com/apps/new)。
3. 输入您选择的**应用程序名称**，例如 **Home Assistant**。
4. 由于我们正在创建一个*个人*注册，必须填写**描述**、**应用程序网站 URL**、**组织**等的详细信息。但是，内容并不重要，稍后只会在授权页面上向您显示。
5. 将 **OAuth 2.0 应用程序类型**设置为**个人**。
6. 在**重定向 URL** 下，添加 `https://my.home-assistant.io/redirect/oauth`。
7. 您可以将**默认访问类型**保留为**只读**。
8. 阅读服务条款，勾选复选框，然后选择**注册**。
9. 然后您将看到已注册应用程序的页面，显示 **OAuth 2.0 客户端 ID** 和**客户端密钥**。记下这些（例如，将它们复制并粘贴到文本编辑器中），因为您稍后会需要它们。您随时可以通过**管理我的应用程序**选项卡重新访问此页面。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成设置接下来会为您提供说明，以输入[应用程序凭据](/home-assistant/integrations/application_credentials/)（OAuth 客户端 ID 和客户端密钥）并授权 Home Assistant 访问您的 Fitbit 账户。

<details>
<summary>OAuth 和授权步骤</summary>


1. 继续执行选择您要授权的账户的步骤。
2. 系统将要求您授予对 Fitbit 账户中特定数据的访问权限。
3. 为了让 Home Assistant 理解您的账户，选择**个人资料**。
4. 所有其他数据都是可选的。Home Assistant 将根据您选择的信息创建实体。例如，如果您允许访问**活动和运动**，那么 Home Assistant 将创建与活动相关的传感器，如 `sensor.step`。 
5. 页面现在将显示**将账户链接到 Home Assistant？**，注意**您的实例 URL**。如果不正确，请参阅 [My Home Assistant](/home-assistant/integrations/my)。如果一切正常，选择**链接账户**。
6. 您可以关闭窗口，返回 Home Assistant，您应该会看到 Home Assistant 的**成功！**消息。


</details>

## 附加信息

请注意，Fitbit 的速率限制非常低，每用户每小时 150 次。时钟在整点重置（意味着不是滚动的 60 分钟）。没有办法绕过这些限制。由于速率限制，传感器仅每 30 分钟更新一次。您可以通过重新启动 Home Assistant 手动触发更新。请记住，每个传感器使用 1 次请求。

传感器将使用的单位系统基于您在 Fitbit 个人资料中设置的国家/地区。

## 故障排除

### 重置损坏或不正确的配置

如果 Fitbit 集成最初配置不正确，简单地删除并重新添加集成可能不够。删除集成时，Home Assistant 会询问是否应保留或删除现有的应用程序凭据。

如果您选择保留它们，之前存储的（可能不正确的）凭据将在下次设置尝试期间继续自动使用，这可能导致重复的连接失败。

要完全重置配置，还必须删除存储的应用程序凭据（请参阅[删除应用程序凭据](/home-assistant/integrations/application_credentials/#deleting-application-credentials)）。

### 授权后"连接失败"

#### 症状

在某些情况下，授权似乎成功，但 Home Assistant 在从 Fitbit 重定向返回后返回 `Connection failed` 错误。

Home Assistant Core 日志通常显示消息 `Failed to fetch user profile for Fitbit API: Error from Fitbit API`。

#### 描述

这通常是由于缺少权限导致的。Fitbit 集成需要**个人资料**范围。如果授权期间未启用**个人资料**，Home Assistant 无法获取用户个人资料，设置将失败。

#### 解决方案

1. 在 Fitbit 权限设置中，启用**个人资料**。
2. 重复授权步骤。