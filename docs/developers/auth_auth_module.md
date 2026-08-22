---
title: "多因素认证模块"
---

多因素认证模块与[认证提供程序](auth_auth_provider.md)结合使用，以提供完全可配置的认证框架。每个 MFA 模块可以提供一种多因素认证功能。用户可以启用多个 mfa 模块，但在登录过程中只能选择一个模块。

## 定义 mfa auth module

:::info
我们目前仅支持内置的 mfa auth module。对自定义 auth module 的支持将来可能会推出。
:::

多因素 Auth 模块定义在 `homeassistant/auth/mfa_modules/<模块名称>.py` 中。Auth 模块需要提供 `MultiFactorAuthModule` 类的实现。

有关完全实现的 auth module 示例，请参见 [insecure_example.py](https://github.com/home-assistant/core/blob/dev/homeassistant/auth/mfa_modules/insecure_example.py)。

多因素 Auth 模块应扩展 `MultiFactorAuthModule` 类的以下方法。

| 方法 | 必填 | 描述
| ------ | -------- | -----------
| `@property def input_schema(self)` | 是 | 返回定义用户输入表单的 schema。
| `async def async_setup_flow(self, user_id)` | 是 | 返回一个 SetupFlow 来处理设置流程。
| `async def async_setup_user(self, user_id, setup_data)` | 是 | 为用户设置此 auth module。
| `async def async_depose_user(self, user_id)` | 是 | 从此 auth module 中移除用户信息。
| `async def async_is_user_setup(self, user_id)` | 是 | 返回用户是否已设置。
| `async def async_validate(self, user_id, user_input)` | 是 | 给定 user_id 和用户输入，返回验证结果。
| `async def async_initialize_login_mfa_step(self, user_id)` | 否 | 将在显示登录流程的 mfa 步骤之前调用一次。这不是 MFA 模块的初始化，而是登录流程中 mfa 步骤的初始化。

## 设置流程（Setup flow）

在用户使用多因素 auth module 之前，必须启用或设置它。所有可用模块将列在用户个人资料页面中，用户可以启用他/她想使用的模块。设置数据录入流程将引导用户完成必要的步骤。

每个 MFA 模块都需要实现一个从 `mfa_modules.SetupFlow` 扩展的设置流程处理器（如果只需要一个简单设置步骤，可以直接使用 `SetupFlow`）。例如对于 Google Authenticator（TOTP，基于时间的一次性密码）模块，流程需要是：

- 生成一个密钥并将其存储在设置流程实例上
- 通过 `async_show_form` 返回一个描述中包含二维码的表单（通过 `description_placeholders` 以 base64 注入）
- 用户扫描二维码并输入代码以验证扫描正确且时钟已同步
- TOTP 模块保存密钥和用户_id，模块为用户启用

## 工作流程（Workflow）

<img class='invertDark' src='/img/en/auth/mfa_workflow.png'
  alt='多因素认证工作流程' />

<!--
Source: https://drive.google.com/file/d/12_nANmOYnOdqM56BND01nPjJmGXe-M9a/view
-->

## 配置示例

```yaml
# configuration.xml
homeassistant:
  auth_providers:
    - type: homeassistant
    - type: legacy_api_password
  auth_mfa_modules:
    - type: totp
    - type: insecure_example
      users: [{'user_id': 'a_32_bytes_length_user_id', 'pin': '123456'}]
```

在这个示例中，用户将首先从 `homeassistant` 或 `legacy_api_password` auth provider 中选择。对于 `homeassistant` auth provider，用户将首先输入用户名/密码，如果该用户同时启用了 `totp` 和 `insecure_example`，则用户需要选择一个 auth module，然后根据选择输入 Google Authenticator 代码或输入 pin 代码。

:::tip
`insecure_example` 仅用于演示目的，请勿在生产环境中使用。
:::

## 验证会话（Validation session）

与 auth provider 不同，auth module 使用 session 来管理验证。在 auth provider 验证之后，mfa module 将创建一个验证会话，包含过期时间和来自 auth provider 验证结果的 user_id。多因素 auth module 不仅验证用户输入，还验证 session 是否未过期。验证会话数据存储在你的配置目录中。
