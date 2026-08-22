---
author: Jan Bouwhuis
authorURL: https://github.com/jbouwh
authorImageURL: https://avatars.githubusercontent.com/u/7188918?s=96&v=4
title: 在成功的 re-auth flow 之后始终 reload
---

## 在成功的 reauthentication 之后始终 reload

为了在成功的 reauthentication flow 之后更新并 reload entry，可以使用 helper `async_update_reload_and_abort`。该 helper 的默认行为已经更改。默认情况下，调用该 helper 时 entry 将始终 reload。如果 entry 需要 reauthentication，并不总是需要更新 entry，例如当账户被临时禁用或 API-key 被临时禁止时。

对于在 entry 未更改的情况下不希望 reload 的场景，可以向 helper 传入 `reload_even_if_entry_is_unchanged=False` 参数。

更多有关此 helper 的信息可以在[这里](/developers/core/integration/config_flow#reauthentication)找到。

### 示例

```python
class OAuth2FlowHandler(
    config_entry_oauth2_flow.AbstractOAuth2FlowHandler, domain=DOMAIN
):
    """Config flow to handle OAuth2 authentication."""

    reauth_entry: ConfigEntry | None = None

    async def async_step_reauth(self, user_input=None):
        """在 API 认证错误时执行 reauth。"""
        self.reauth_entry = self.hass.config_entries.async_get_entry(
            self.context["entry_id"]
        )
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(self, user_input=None):
        """通知用户需要 reauth 的对话框。"""
        if user_input is None:
            return self.async_show_form(
                step_id="reauth_confirm",
                data_schema=vol.Schema({}),
            )
        return await self.async_step_user()

    async def async_oauth_create_entry(self, data: dict) -> dict:
        """为 reauth 创建 oauth config entry 或更新现有 entry。"""
        if self.reauth_entry:
            # 仅当 entry 被更新时才 reload
            return self.async_update_reload_and_abort(
                self.reauth_entry,
                data=data,
                reload_even_if_entry_is_unchanged=False,
            )
        return await super().async_oauth_create_entry(data)
```
