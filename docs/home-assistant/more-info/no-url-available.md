---
title: 无可用 URL
description: '当 Home Assistant 向您显示"无可用 URL"消息时，您可能正在尝试设置或配置需要链接您的账户的集成。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 无可用 URL

当 Home Assistant 向您显示"无可用 URL"消息时，您可能正在尝试设置或配置需要链接您的账户的集成。

## 发生了什么

用于链接此类账户的身份验证方法称为 OAuth2，这是一种现代且更常见的系统链接方式，通过数据提供方登录。

这意味着 Home Assistant 将重定向您到提供方进行登录。登录成功后，第三方提供方将重定向回您的 Home Assistant 实例。

为了让第三方能够在身份验证后将您重定向/链接回 Home Assistant，Home Assistant 需要告知第三方应用程序用于访问 Home Assistant 的 URL / 重定向回的 URL。遗憾的是，如果出现"无可用 URL"错误，Home Assistant 无法确定该 URL。

## 如何解决

Home Assistant 将尝试找到您当前在浏览器中使用的 URL，将其用作身份验证的重定向 URL。但是，只有在配置中已知该 URL 时，Home Assistant 才能确定它。

有多种选项可以考虑：

### 使用 Nabu Casa Home Assistant Cloud

如果您拥有 Nabu Casa 的 [Home Assistant Cloud](https://support.nabucasa.com/hc/en-us/categories/24734619902749)，解决此问题的最简单方法是通过远程 URL 访问您的 Home Assistant 实例。

前往 [**设置** > **Home Assistant Cloud**](https://my.home-assistant.io/redirect/cloud/)。

通过远程 URL 访问您的实例。现在您可以正常设置集成，而不会收到"无可用 URL"消息。

### 通过 IP 地址使用您的实例

如果您在家庭网络中，可以使用实例的 IP 地址访问您的实例。

例如，`https://192.168.1.2:8123`

将 IP 替换为您的 Home Assistant 实例的 IP 地址。如果您不知道此地址，也可以跳过此步骤并尝试下一个解决方案。

现在您可以正常设置集成，而不会收到无可用 URL 消息。

### 配置实例 URL

另一个好的解决方案是在 Home Assistant 中配置 Home Assistant 实例 URL。通过让 Home Assistant 知道您用于访问它的 URL，Home Assistant 将能够在类似情况下处理此问题。

请注意，您需要在用户个人资料中启用高级模式才能进行此设置。

前往 [**设置** > **系统** > **网络**](https://my.home-assistant.io/redirect/network/)。

在此页面上，有两个可以解决此问题的字段：**本地网络**和**互联网**。

- **本地网络**：当您**在家**并连接到家庭网络时，在浏览器中输入的 URL。例如，`http://homeassistant.local:8123`
- **互联网**：当您**不在家**并通过互联网访问时，在浏览器中输入的 URL。例如，`https://example.duckdns.org`

一些额外说明：

- 请勿在任何这些字段中使用 Nabu Casa 远程 UI URL。远程访问将自动正确处理。
- 如果您使用的地址在"在家"和"不在家"情况下相同，建议仅使用**外部 URL** 字段。
- 内部 URL 最好不要使用 SSL（含有 `https://`），因为这可能会导致投射到媒体设备时出现问题。
- 如果您的 Home Assistant 实例没有外部地址，请将该字段留空。
- 确保您提供的 URL 与浏览器用于访问实例的真实地址匹配。许多流行的浏览器会隐藏 www 子域名；如果您尝试配置 `http://foo.bar`，但实际上您在 `http://www.foo.bar`，OAuth 将失败，您将收到此错误。您始终可以通过在地址栏中粘贴 `javascript:alert(document.location)` 并按回车来检查实际域名。

设置 URL 后，点击保存。无需重启 Home Assistant，您的更改会立即生效。

现在您可以正常设置集成，而不会收到无可用 URL 消息。
