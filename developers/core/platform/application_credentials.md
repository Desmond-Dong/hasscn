集成可以支持 [通过 OAuth2 配置](/developers/core/integration/config_flow.md#configuration-via-oauth2)，允许用户链接其账户。集成可以添加 `application_credentials.py` 文件并实现下面描述的功能。

OAuth2 需要在应用程序和 provider 之间共享的凭据。在 Home Assistant 中，集成特定的 OAuth2 凭据通过一种或多种方法提供：

* *本地 OAuth 与 Application Credentials 组件*：用户与云 provider 创建自己的凭据，通常作为 application 开发者操作，然后将凭据注册到 Home Assistant 和集成中。此方法对所有支持 OAuth2 的集成是*必需的*。
* *Cloud Account Linking 与 Cloud 组件*：Nabu Casa 与云 provider 注册凭据，提供无缝的用户体验。此方法提供无缝的用户体验，是*推荐的*（[更多信息](/developers/core/integration/config_flow.md#configuration-via-oauth2)）。

## 添加支持

集成通过在 `manifest.json` 中添加对 `application_credentials` 组件的依赖来支持 application credentials：

```json
{
  ...
  "dependencies": ["application_credentials"],
  ...
}
```

然后在集成文件夹中添加名为 `application_credentials.py` 的文件，并实现以下内容：

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

### AuthorizationServer

`AuthorizationServer` 表示集成使用的 [OAuth2 授权服务器](https://datatracker.ietf.org/doc/html/rfc6749)。

| Name          | Type |                                                                                                    | Description |
| ------------- | ---- | -------------------------------------------------------------------------------------------------- | ----------- |
| authorize\_url | str  | **必需** | 用户在配置流程中被重定向到的 OAuth 授权 URL。 |
| token\_url     | str  | **必需** | 用于获取 access token 的 URL。                                           |

### 自定义 OAuth2 实现

集成也可以在 `application_credentials.py` 中提供自定义的 `AbstractOAuth2Implementation`，如下所示：

```python
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_entry_oauth2_flow
from homeassistant.components.application_credentials import AuthImplementation, AuthorizationServer, ClientCredential


class OAuth2Impl(AuthImplementation):
    """Custom OAuth2 implementation."""
    # ... 覆盖 AbstractOAuth2Implementation 细节

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

### 支持 PKCE 的授权流程

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
        client_secret=credential.client_secret, # 可选，默认 `""`
        code_verifier_length=128 # 可选
    )
```

## 导入 YAML 凭据

以前接受 YAML 凭据的集成可以使用 application credentials 集成提供的 import API `async_import_client_credential` 导入凭据。

以下是来自一个以前接受 YAML 凭据的集成的示例：

```python
from homeassistant.components.application_credentials import (
    ClientCredential,
    async_import_client_credential,
)

# 集成的示例 configuration.yaml schema
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

新集成不应在 configuration.yaml 中接受凭据，因为用户可以在 Application Credentials 用户界面中输入凭据。

### ClientCredential

`ClientCredential` 表示由用户提供的 client 凭据。

| Name          | Type |                                                                           | Description |
| ------------- | ---- | ------------------------------------------------------------------------- | ----------- |
| client\_id     | str  | **必需** | 用户提供的 OAuth Client ID。     |
| client\_secret | str  | **必需** | 用户提供的 OAuth Client Secret。 |

## 翻译

Application Credentials 的 translations 在组件翻译文件 `strings.json` 的 `application_credentials` key 下定义。例如：

```json
{
    "application_credentials": {
        "description": "导航到 [developer console]({console_url}) 创建凭据，然后在下方输入。",
    }
}
```

你还可以可选地添加 description placeholder keys，通过在 `application_credentials.py` 中添加新方法来将占位符添加到消息中，如下所示：

```python
from homeassistant.core import HomeAssistant

async def async_get_description_placeholders(hass: HomeAssistant) -> dict[str, str]:
    """Return description placeholders for the credentials dialog."""
    return {
        "console_url": "https://example.com/developer/console",
    }
```

在本地开发时，你需要运行 `python3 -m script.translations develop` 才能看到对 `strings.json` 所做的更改。[更多关于翻译 Home Assistant 的信息。](translations.md)
