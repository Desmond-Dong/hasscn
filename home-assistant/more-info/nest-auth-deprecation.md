Nest Home Assistant 集成推荐的主要认证方法称为*桌面*、*已安装应用*或 *OOB* 认证，已于 2022 年 2 月 28 日对新用户弃用，并将于 2022 年 10 月 3 日对所有用户禁用。请参阅 [Google 开发者博客](https://developers.googleblog.com/2022/02/making-oauth-flows-safer.html#disallowed-oob)了解公告详情。

**现有用户必须在 2022 年 10 月 3 日之前升级到 *Web Auth* 凭据。**

## 新用户

新用户可以无问题地使用 *Web Auth* 注册。请按照已更新为使用 *Web Auth* 和使用 Home Assistant `2022.6` 或更新版本的 *My Home Assistant* 重定向 URL 的[文档](https://www.home-assistant.io/integrations/nest/)操作。

## 现有用户：App Auth

如果您之前使用 *App Auth* 成功配置了 Nest 和 Home Assistant，请按照[已弃用的 App Auth 凭据](https://www.home-assistant.io/integrations/nest/#deprecated-app-auth-credentials)的说明操作。

Nest 现在完全通过 UI 使用[应用程序凭据](https://www.home-assistant.io/integrations/application_credentials/)进行配置，配置流程将引导您完成正确创建新凭据的步骤。

您需要在 10 月之前升级到 *Web Auth* 以避免中断。

## 现有用户：Web Auth

使用 *Web Auth* 注册的用户不受 App Auth 弃用的影响。但是，从 `2022.6` 开始，*My Home Assistant* URL 现在是默认的重定向 URL，可能需要在 Google Cloud Console 中更新以避免 `redirect_uri_mismatch`（[更多信息](https://www.home-assistant.io/integrations/nest/#troubleshooting)）。

# 背景

OAuth 带外流程旨在支持无法像 Web 应用程序那样支持重定向 URI 的本机应用程序，这对 Home Assistant 来说很方便，因为终端 Home Assistant 用户很难设置安全 Web 端点所需的 SSL 证书和 DNS。然而，Google 已弃用 OOB 流程，因为它引入了钓鱼风险。新用户不再被允许创建新的桌面认证凭据，现有用户从 2022 年 10 月 3 日起将不再工作。

从 `2022.6` 开始，*Web Auth* OAuth2 流程使用处理 SSL 的 *My Home Assistant* 重定向 URL。这就是允许新用户使用 *Web Auth* 注册的原因，这是新的推荐方法。
