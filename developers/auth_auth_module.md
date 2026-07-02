# 多因素身份验证模块

多因素身份验证模块与[身份验证提供程序](/developers/auth_auth_provider.md)共同构成一套完全可配置的身份验证框架。每个 MFA 模块提供一种多因素身份验证方式。用户可以启用多个 MFA 模块，但在一次登录流程中只能选择其中一个模块。

## 定义 MFA auth 模块

:::info
目前仅支持内置的 MFA 身份验证模块。未来可能会支持自定义身份验证模块。
:::

多因素身份验证模块定义在 `homeassistant/auth/mfa_modules/<name of module>.py` 中。auth 模块需要实现 `MultiFactorAuthModule` 类。

完整的身份验证模块实现示例请参阅 [insecure\_example.py](https://github.com/home-assistant/core/blob/dev/homeassistant/auth/mfa_modules/insecure_example.py)。

多因素身份验证模块需要实现 `MultiFactorAuthModule` 类中的以下方法。

|方法|必需|说明|
| ------ | -------- | ----------- |
|`@property def input_schema(self)`|是|返回用于用户输入表单的 schema。|
|`async def async_setup_flow(self, user_id)`|是|返回一个 `SetupFlow`，用于处理设置流程。|
|`async def async_setup_user(self, user_id, setup_data)`|是|为用户启用此 auth 模块。|
|`async def async_depose_user(self, user_id)`|是|移除此 auth 模块中与用户相关的信息。|
|`async def async_is_user_setup(self, user_id)`|是|返回用户是否已完成设置。|
|`async def async_validate(self, user_id, user_input)`|是|根据 `user_id` 和用户输入返回验证结果。|
|`async def async_initialize_login_mfa_step(self, user_id)`|否|在显示登录流程中的 MFA 步骤前调用一次。它初始化的是登录流程中的 MFA 步骤，而不是整个 MFA 模块。|

## 设置流程

在用户能够使用某个 MFA 模块之前，必须先启用或完成设置。所有可用模块都会列在用户个人资料页面中，用户可以启用自己想使用的模块。设置流程会通过数据录入流程引导用户完成必要步骤。

每个 MFA 模块都需要实现一个继承自 `mfa_modules.SetupFlow` 的设置流程处理器（如果只需要一个简单的设置步骤，也可以直接使用 `SetupFlow`）。例如，对于 Google Authenticator（TOTP，基于时间的一次性密码）模块，流程通常如下：

* 生成 secret，并将其保存在设置流程实例中
* 返回 `async_show_form`，并在描述中包含二维码（通过 `description_placeholders` 注入 base64 数据）
* 用户扫描二维码后输入验证码，以确认扫描成功且时钟已同步
* 保存与 `user_id` 关联的 TOTP 模块配置，从而为该用户启用此模块

## 工作流程

<img class='invertDark' src='/developers/img/en/auth/mfa_workflow.png'
alt='多因素身份验证工作流程'/>

<!--
来源：https://drive.google.com/file/d/12_nANmOYnOdqM56BND01nPjJmGXe-M9a/view
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

在此示例中，用户首先需要在 `homeassistant` 和 `legacy_api_password` 两种身份验证提供程序之间进行选择。若选择 `homeassistant` 身份验证提供程序，用户会先输入用户名和密码；如果该用户同时启用了 `totp` 和 `insecure_example`，则还需要再选择一个 MFA 模块，并根据所选模块输入 Google Authenticator 验证码或 PIN 码。

:::tip
`insecure_example` 仅用于演示，请勿在生产环境中使用。
:::

## 验证会话

与 auth 提供程序不同，auth 模块通过会话来管理验证过程。身份验证提供程序完成验证后，MFA 模块会创建一个验证会话，其中包含过期时间以及身份验证提供程序返回结果中的 `user_id`。多因素身份验证模块不仅会校验用户输入，还会检查验证会话是否已过期。验证会话数据会存储在配置目录中。
