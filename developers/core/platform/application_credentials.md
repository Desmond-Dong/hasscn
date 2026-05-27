# 应用凭证

集成可以支持[通过 OAuth2 进行配置](/developers/config_entries_config_flow_handler.md#configuration-via-oauth2)，让
用户关联他们的账号。集成可以添加 `application_credentials.py` 文件，并实现下文介绍的功能。

OAuth2 需要在应用与提供方之间共享的凭证。在 Home Assistant 中，可以通过一种或多种方式为特定集成提供 OAuth2 凭证：

* *带应用凭证组件的本地 OAuth*：用户通常以应用开发者的身份在云服务提供商处创建自己的凭证，然后在 Home Assistant 中为该集成注册这些凭证。所有支持 OAuth2 的集成都必须支持这种方式。
* *通过云组件关联云账号*：Nabu Casa 会向云服务提供商注册凭证，从而提供更顺畅的用户体验。推荐采用这种方式（[更多信息](/developers/config_entries_config_flow_handler.md#configuration-via-oauth2)）。

## 添加支持

集成可通过在 `manifest.json` 中添加对 `application_credentials` 组件的依赖来支持应用凭证：

```json
{
  ...
  "dependencies": ["application_credentials"],
  ...
}
```

然后在集成目录中添加名为 `application_credentials.py` 的文件，并实现以下内容：

```python
from homeassistant.core import HomeAssistant
from homeassistant.components.application_credentials import AuthorizationServer


async def async_get_authorization_server(hass: HomeAssistant) -> AuthorizationServer:
    """Return authorization server."""
    return AuthorizationServer(
        authorize_url="https://example.com/auth",
        token_url="https://example.com/oauth2/v4/token"
    )
```

### 授权服务器

`AuthorizationServer` 表示集成所使用的 [OAuth2 授权服务器](https://datatracker.ietf.org/doc/html/rfc6749)。

|名称|类型|是否必填|说明|
| ------------- | ---- | -------- | ----------- |
|`authorize_url`|`str`|**必填**|配置流程中将用户重定向到的 OAuth 授权 URL。|
|`token_url`|`str`|**必填**|用于获取访问令牌的 URL。|

### 自定义 OAuth2 实现

集成也可以在 `application_credentials.py` 中提供自定义 `AbstractOAuth2Implementation`，如下所示：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_entry_oauth2_flow
from homeassistant.components.application_credentials import AuthImplementation, AuthorizationServer, ClientCredential


class OAuth2Impl(AuthImplementation):
    """Custom OAuth2 implementation."""
    # ... Override AbstractOAuth2Implementation details

async def async_get_auth_implementation(
    hass: HomeAssistant, auth_domain: str, credential: ClientCredential
) -> config_entry_oauth2_flow.AbstractOAuth2Implementation:
    """Return auth implementation for a custom auth implementation."""
    return OAuth2Impl(
        hass,
        auth_domain,
        credential,
        AuthorizationServer(
            authorize_url="https://example.com/auth",
            token_url="https://example.com/oauth2/v4/token"
        )
    )
```

### 具有 PKCE 支持的授权流程

如果你想支持 [PKCE](https://www.rfc-editor.org/rfc/rfc7636)，可以在 `application_credentials.py` 中返回 `LocalOAuth2ImplementationWithPkce`，如下所示：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers.config_entry_oauth2_flow import AbstractOAuth2Implementation, LocalOAuth2ImplementationWithPkce
from homeassistant.components.application_credentials import AuthImplementation, ClientCredential


async def async_get_auth_implementation(
    hass: HomeAssistant, auth_domain: str, credential: ClientCredential
) -> AbstractOAuth2Implementation:
    """Return auth implementation for a custom auth implementation."""
    return LocalOAuth2ImplementationWithPkce(
        hass,
        auth_domain,
        credential.client_id,
        authorize_url="https://example.com/auth",
        token_url="https://example.com/oauth2/v4/token",
        client_secret=credential.client_secret, # optional `""` is default
        code_verifier_length=128 # optional
    )
```

## 导入 YAML 凭证

集成可以导入凭证。对于使用应用凭证的集成，可通过导入 API `async_import_client_credential` 接受来自 YAML 的凭证。

以下是一个接受 YAML 凭证的集成示例：

```python
from homeassistant.components.application_credentials import (
    ClientCredential,
    async_import_client_credential,
)

# Example configuration.yaml schema for an integration
CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Required(CONF_CLIENT_ID): cv.string,
                vol.Required(CONF_CLIENT_SECRET): cv.string,
            }
        )
    },
)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the component."""
    if DOMAIN not in config:
        return True

    await async_import_client_credential(
        hass,
        DOMAIN,
        ClientCredential(
            config[DOMAIN][CONF_CLIENT_ID],
            config[DOMAIN][CONF_CLIENT_SECRET],
        ),
    )
```

新的集成不应再通过 `configuration.yaml` 接受用户提供的凭证。
应改为让用户在应用凭证界面中输入凭证。

### 客户凭证

`ClientCredential` 表示用户提供的客户端凭证。

|名称|类型|是否必填|说明|
| ------------- | ---- | -------- | ----------- |
|`client_id`|`str`|**必填**|用户提供的 OAuth 客户端 ID。|
|`client_secret`|`str`|**必填**|用户提供的 OAuth 客户端密钥。|

## 翻译

应用凭证相关的翻译定义在组件翻译文件 `strings.json` 的 `application_credentials` 键下。例如：

```json
{
    "application_credentials": {
        "description": "前往 [developer console]({console_url}) 创建凭证，然后在下方输入。",
    }
}
```

你也可以在 `application_credentials.py` 中添加新方法，以提供描述文本中的占位符键。如下所示：

```python
from homeassistant.core import HomeAssistant

async def async_get_description_placeholders(hass: HomeAssistant) -> dict[str, str]:
    """Return description placeholders for the credentials dialog."""
    return {
        "console_url": "https://example.com/developer/console",
    }
```

在本地开发时，你需要运行 `python3 -m script.translations develop`，才能看到对 `strings.json` 的修改效果。更多信息请参阅[翻译 Home Assistant](/developers/translations.md)。
