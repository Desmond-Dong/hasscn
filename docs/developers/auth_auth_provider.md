---
title: "认证提供程序"
---

认证提供程序确认用户的身份。用户通过 auth provider 的登录流程来证明其身份。Auth provider 定义登录流程，并要求用户提供所需的所有信息。这通常是用户名和密码，但也可以包括 2FA token 或其他挑战。

一旦认证提供程序确认了用户的身份，它将以 Credentials 对象的形式将其传递给 Home Assistant。

## 定义 auth provider

:::info
我们目前仅支持内置的 auth provider。对自定义 auth provider 的支持将来可能会推出。
:::

Auth 提供程序定义在 `homeassistant/auth/providers/<提供程序名称>.py` 中。Auth 提供程序模块需要提供 `AuthProvider` 类和 `LoginFlow` 类的实现，它根据 `data_entry_flow` 向用户询问信息并对其进行验证。

有关完全实现的 auth provider 示例，请参见 [insecure_example.py](https://github.com/home-assistant/core/blob/dev/homeassistant/auth/providers/insecure_example.py)。

Auth 提供程序应扩展 `AuthProvider` 类的以下方法。

| 方法 | 必填 | 描述
| ------ | -------- | -----------
| async def async_login_flow(self, context: AuthFlowContext \| None) | 是 | 返回一个登录流程实例，供用户进行身份识别。
| async def async_get_or_create_credentials(self, flow_result) | 是 | 给定登录流程的结果，返回一个 credentials 对象。它可以是现有的或新的。
| async def async_user_meta_for_credentials(credentials) | 否 | 回调，当 Home Assistant 将从 Credentials 对象创建用户时调用。可用于为用户填充额外字段。

Auth 提供程序应扩展 `LoginFlow` 类的以下方法。

| 方法 | 必填 | 描述
| ------ | -------- | -----------
| async def async_step_init(self, user_input=None) | 是 | 处理登录表单，更多详细信息见下文。

## LoginFlow 的 async_step_init

:::info
我们可能在未来不久更改此接口。
:::

`LoginFlow` 继承自 `data_entry_flow.FlowHandler`。数据录入流程的第一步硬编码为 `init`，因此每个流程都必须实现 `async_step_init` 方法。`async_step_init` 的模式类似于以下伪代码：

```python
async def async_step_init(self, user_input=None):
    if user_input is None:
        return self.async_show_form(
            step_id="init", data_schema="some schema to construct ui form"
        )
    if is_invalid(user_input):
        return self.async_show_form(step_id="init", errors=errors)
    return await self.async_finish(user_input)
```
