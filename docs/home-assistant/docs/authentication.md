---
title: 认证
description: Home Assistant 认证文档。
---

认证系统用于保护对 Home Assistant 的访问。

## 登录界面

您会看到登录界面，要求您输入用户名和密码。

<img src='/home-assistant/images/docs/authentication/login-outside-local-network.png' alt='Screenshot of the login screen, when logging in from within the local network' style='border: 0;box-shadow: none;'>

## 用户账户

当您首次启动 Home Assistant 时，系统会创建 _所有者_ 用户账户。该账户拥有一些特殊权限，可以：

- 创建和管理其他用户账户。
- 管理集成和其他设置（即将推出）。

:::warning
目前，其他用户账户将拥有与所有者账户相同的访问权限。未来，非所有者账户将能够应用限制。
:::

:::note
如果您想管理用户，且您是所有者但在主配置菜单中看不到“用户”选项，请确保已在您的个人资料中为该用户启用 **高级模式**。
:::

### 您的账户资料

登录后，您可以通过点击侧边栏最底部的圆形图标，在 [**用户资料**](https://my.home-assistant.io/redirect/profile/) 页面查看您账户的详细信息。

<img src='/home-assistant/images/docs/authentication/profile.png' alt='Screenshot of the profile page' style='border: 0;box-shadow: none;'>

您可以：

- 更改密码。
- 启用或禁用 [多因素认证](/home-assistant/docs/authentication/multi-factor-auth/)。
- 删除 **刷新令牌**。这些令牌会在您从设备登录时创建。如果您想强制该设备登出，可以删除它们。
- 创建 [长期访问令牌](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token)，以便脚本可以安全地与 Home Assistant 交互。
- 设置语言和其他区域设置。
- 登出 Home Assistant。

:::note
未使用的刷新令牌将被自动删除。如果刷新令牌在 90 天内未用于登录，则被视为未使用。如果您需要一个永久令牌，我们建议使用 [长期访问令牌](https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token)。
:::

### 保护您的登录安全

_请务必选择一个安全的密码！_ 未来某个时候，您可能想要从本地网络外部访问 Home Assistant。这意味着您也会暴露在随机黑客的攻击之下。请像对待家门钥匙一样对待您的密码。

作为额外的安全级别，您可以启用 [多因素认证](/home-assistant/docs/authentication/multi-factor-auth/)。

## 向 Home Assistant 添加人员

如果您拥有管理员权限，可以 [向 Home Assistant 添加人员](/home-assistant/integrations/person/#adding-a-person-to-home-assistant) 并为他们创建用户账户。

## 更改显示名称或用户名

要了解如何更改显示名称或用户名，请参阅 [设置基本信息](/home-assistant/docs/configuration/basic/)。

## 其他认证方式

Home Assistant 提供多种认证方式。请参阅 [认证提供商](/home-assistant/docs/authentication/providers/) 部分。

## 故障排除

### 来自 `127.0.0.1` 的认证失败

如果您看到来自 `127.0.0.1` 的认证失败，并且您正在使用 `nmap` 设备追踪器，您应当[将 Home Assistant 的 IP 地址排除在扫描之外](/home-assistant/integrations/nmap_tracker#exclude)。

### Bearer 令牌警告

在新的认证系统下，当提供了[旧版 API 密码](/home-assistant/docs/authentication/providers/#legacy-api-password)，但未在 Home Assistant 中配置时，您会看到以下警告日志：

```text
WARNING (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

如果您看到此消息，需要在您的 `http:` configuration中添加 [`api_password`](/home-assistant/integrations/http/#api_password)。

### Bearer 令牌信息消息

如果您看到以下内容，这是给集成开发者的消息，用来提示他们需要更新与 Home Assistant 的认证方式。作为最终用户，您不需要执行任何操作：

```text
INFO (MainThread) [homeassistant.components.http.auth] You need to use a bearer token to access /blah/blah from 192.0.2.4
```

### 遗忘所有者密码

如果您丢失了与所有者账户关联的密码，您需要 [启动新的引导流程](/home-assistant/docs/locked_out/#to-prepare-the-system-to-start-a-new-onboarding-process)。

### 错误：无效的客户端 ID 或重定向 URL

<img src='/home-assistant/images/docs/authentication/error-invalid-client-id.png' alt='Screenshot of error: invalid client id or redirect url'>

您必须使用域名而不是 IP 地址来远程访问 Home Assistant，否则您将在登录表单上收到 `Error: invalid client id or redirect url` 错误。但是，您可以在家庭网络中使用 IP 地址访问 Home Assistant。

这是因为我们只允许在您的 IP 地址是内部网络地址（如 `192.168.0.1`）或回环地址（如 `127.0.0.1`）时使用 IP 地址作为客户端 ID。

如果您的 Home Assistant 实例没有有效的域名，您可以修改计算机上的 `hosts` 文件来伪造一个。
在 Linux 上编辑 `/etc/hosts` 文件，并添加以下条目：

```text
12.34.56.78 homeassistant.home
```

将 `12.34.56.78` 替换为您 Home Assistant 的公网 IP 地址。

这将允许您在 `http://homeassistant.home:8123/` 打开 Home Assistant。

### 卡在加载数据

某些广告拦截软件（如 Wipr）也会阻止 WebSockets。如果您卡在加载数据界面，请尝试禁用广告拦截器。
