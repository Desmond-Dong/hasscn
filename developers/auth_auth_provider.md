# 身份验证提供商

身份验证提供程序负责确认用户的身份。用户通过该提供程序发起的登录流程来证明自己的身份。身份验证提供程序定义了登录方式，并可以向用户询问所需的全部信息，通常包括用户名和密码，也可能包括 2FA 令牌或其他验证方式。

一旦身份验证提供程序确认了用户身份，就会以 `Credentials` 对象的形式将结果提交给 Home Assistant。

## 定义身份验证提供者

:::info
目前仅支持内置身份验证提供程序。未来可能会支持自定义身份验证提供程序。
:::

身份验证提供程序定义在 `homeassistant/auth/providers/<name of provider>.py` 中。身份验证提供程序模块需要实现 `AuthProvider` 类和 `LoginFlow` 类；后者会向用户收集信息，并基于 `data_entry_flow` 执行验证。

完整的身份验证提供程序实现示例请参阅 [insecure\_example.py](https://github.com/home-assistant/core/blob/dev/homeassistant/auth/providers/insecure_example.py)。

身份验证提供程序需要实现 `AuthProvider` 类中的以下方法。

|方法|必需|说明|
| ------ | -------- | ----------- |
|`async def async_login_flow(self)`|是|返回一个登录流程实例，供用户完成身份验证。|
|`async def async_get_or_create_credentials(self, flow_result)`|是|根据登录流程的结果返回一个凭据对象，可以是已有凭据，也可以是新建凭据。|
|`async def async_user_meta_for_credentials(self, credentials)`|否|当 Home Assistant 准备根据 `Credentials` 对象创建用户时调用，可用于补充用户的额外信息。|

身份验证提供程序还需要实现 `LoginFlow` 类中的以下方法。

|方法|必需|说明|
| ------ | -------- | ----------- |
|`async def async_step_init(self, user_input=None)`|是|处理登录表单，详见下文。|

## LoginFlow 的 async\_step\_init

:::info
我们可能会在不久的将来更改此界面。
:::

`LoginFlow` 继承自 `data_entry_flow.FlowHandler`。数据录入流程的第一步固定为 `init`，因此每个流程都必须实现 `async_step_init` 方法。`async_step_init` 的基本模式如下伪代码：

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
