---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: 试用新的 auth 系统
---

在 Home Assistant 0.69 中，我们引入了新的 [authentication API](/developers/auth_index) 的基础设施。我们将从单一的硬编码 API 密码切换到基于 refresh/access token 的认证系统（由 OAuth2 驱动）。

对于 Home Assistant 0.73，我与 [@awarecan] 一起冲刺，确保 auth 系统已达到最低可用产品的水平：

- 用户可以通过内置命令行脚本管理。
- 前端会要求输入用户名和密码进行登录。
- 如果你选择了新系统，API 密码将不再可用。
- 为了不强制与 Home Assistant 生态发生硬性断裂，我们添加了一个临时的 legacy mode，可以重新启用 API 密码支持。该功能未来会被移除。

**该系统尚未准备好供主流用户使用**，我们仍然需要添加 Hass.io 支持以及用户界面，来帮助用户创建第一个用户账户和管理用户。你可以关注（并加入！）待完成的工作[在这里](https://github.com/home-assistant/core/issues?q=is%3Aissue+is%3Aopen+label%3Aauth)。

如果你有兴趣试用，请继续阅读。

<!--truncate-->

## 试用

这要求你运行 Home Assistant 0.73 beta 或更高版本。

第一步是配置 auth provider。我们将配置内置的 `homeassistant` auth provider。该 provider 将是默认的，并将用户安全地存储在 config 目录中。

```yaml
# Example configuration.yaml entry
homeassistant:
  auth_providers:
   - type: homeassistant
   # Uncomment next line if you want to enable legacy API password support
   # - type: legacy_api_password

# Enable the auth component
auth:
```

:::info
在 Home Assistant 0.74 或更高版本中，以下说明已不再必要。
:::

下一步是创建用户。打开终端并导航到 Home Assistant 安装目录。管理用户的脚本内置于 Home Assistant 中，可以使用 `hass --script auth --config /path/to/config` 来调用。

![显示 auth 脚本帮助输出的截图](/img/en/blog/2018-07-experimental-auth/cli.png)

如果你重启 Home Assistant 并访问前端，你将看到一个全新的登录界面。如果你启用了两个 auth provider，你将首先选择使用哪个 auth provider 进行认证。

登录后，前端将存储 access token 和 refresh token。access token 每 30 分钟过期，并且在每次 Home Assistant 重启时也会过期。前端会自动使用存储的 refresh token 获取新的 access token。我们使用 OAuth2 标准来实现这一点。[更多信息请参阅文档](/developers/auth_api)。

[@awarecan]: https://github.com/awarecan