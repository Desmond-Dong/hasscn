---
title: "Python库：身份验证"
sidebar_label: 验证
---

此页面适用于用于集成第三方 API 的通用 Python 库开发。若要与 Home Assistant 的 API 交互，请参阅 [Home Assistant REST API 文档](/developers/api/rest)。

库中的身份验证部分负责获取凭据并发送已认证的请求。它不应了解请求内容本身。

身份验证有多种形式，但通常会在每个请求中附带带有访问令牌的 `authorization` 标头。访问令牌通常是一串随机的字母和数字。

您的库应能够获取身份验证令牌、在需要时刷新令牌，并使用这些凭据发出请求。它不应负责存储身份验证数据。

由于身份验证数据将由开发者存储，因此以可 JSON 序列化的格式返回这些数据非常重要。建议使用仅包含原始类型（`str`、`float`、`int`）的 `dict`。

如果您的 API 可能部署在多个位置，则身份验证类应允许开发者指定 API 地址。

## 异步示例

Python 允许开发者编写同步或异步代码（通过 `asyncio`）。Home Assistant 采用异步架构，但也可以使用同步库。我们更推荐异步库。

如果您正在编写异步库，我们建议使用 `aiohttp`。它是一个现代、成熟且易用的 HTTP 库。

```python
from aiohttp import ClientSession, ClientResponse


class Auth:
    """Class to make authenticated requests."""

    def __init__(self, websession: ClientSession, host: str, access_token: str):
        """Initialize the auth."""
        self.websession = websession
        self.host = host
        self.access_token = access_token

    async def request(self, method: str, path: str, **kwargs) -> ClientResponse:
        """Make a request."""
        if headers := kwargs.pop("headers", {}):
            headers = dict(headers)
        headers["authorization"] = self.access_token

        return await self.websession.request(
            method, f"{self.host}/{path}", **kwargs, headers=headers,
        )
```

要使用此类，先创建一个 aiohttp `ClientSession`，再将其与 API 信息一起传给构造函数。

```python
import asyncio
import aiohttp

from my_package import Auth


async def main():
    async with aiohttp.ClientSession() as session:
        auth = Auth(session, "http://example.com/api", "secret_access_token")

        # This will fetch data from http://example.com/api/lights
        resp = await auth.request("get", "lights")
        print("HTTP response status code", resp.status)
        print("HTTP response JSON content", await resp.json())


asyncio.run(main())
```

## 同步示例

```python
import requests


class Auth:
    """Class to make authenticated requests."""

    def __init__(self, host: str, access_token: str):
        """Initialize the auth."""
        self.host = host
        self.access_token = access_token

    def request(self, method: str, path: str, **kwargs) -> requests.Response:
        """Make a request."""
        if headers := kwargs.pop("headers", {}):
            headers = dict(headers)
        headers["authorization"] = self.access_token

        return requests.request(
            method, f"{self.host}/{path}", **kwargs, headers=headers,
        )
```

要使用此类，请使用 API 信息构造该类。

```python
from my_package import Auth


auth = Auth("http://example.com/api", "secret_access_token")

# This will fetch data from http://example.com/api/lights
resp = auth.request("get", "lights")
print("HTTP response status code", resp.status_code)
print("HTTP response JSON content", resp.json())
```

## OAuth2

OAuth2 是一种使用访问令牌和刷新令牌的[标准](https://tools.ietf.org/html/rfc6749)身份验证模式。访问令牌在签发后很快就会过期，而刷新令牌可用于获取新的访问令牌。

刷新访问令牌通常依赖客户端 ID 和密钥，而这些信息可能由外部服务持有。因此，我们需要构建身份验证类，让开发者能够实现自己的令牌刷新逻辑。

Home Assistant 附带 Home Assistant Cloud 账户关联服务。这是一项免费云服务，允许用户通过 OAuth2 快速关联账户。Home Assistant 还内置了易于使用的工具，供用户配置基于 OAuth2 的集成。更多信息请参阅[此处](/developers/config_entries_config_flow_handler#configuration-via-oauth2)。如果您的库按如下示例实现，这些内置工具的兼容性最佳。

### 异步示例

```python
from abc import ABC, abstractmethod


class AbstractAuth(ABC):
    """Abstract class to make authenticated requests."""

    def __init__(self, websession: ClientSession, host: str):
        """Initialize the auth."""
        self.websession = websession
        self.host = host

    @abstractmethod
    async def async_get_access_token(self) -> str:
        """Return a valid access token."""

    async def request(self, method, url, **kwargs) -> ClientResponse:
        """Make a request."""
        if headers := kwargs.pop("headers", {}):
            headers = dict(headers)

        access_token = await self.async_get_access_token()
        headers["authorization"] = f"Bearer {access_token}"

        return await self.websession.request(
            method, f"{self.host}/{url}", **kwargs, headers=headers,
        )
```

现在，使用您库的开发者必须实现该抽象方法来获取访问令牌。这里假设开发者已有自己的令牌管理器类。

```python
from my_package import AbstractAuth


class Auth(AbstractAuth):
    def __init__(self, websession: ClientSession, host: str, token_manager):
        """Initialize the auth."""
        super().__init__(websession, host)
        self.token_manager = token_manager

    async def async_get_access_token(self) -> str:
        """Return a valid access token."""
        if self.token_manager.is_token_valid():
            return self.token_manager.access_token

        await self.token_manager.fetch_access_token()
        await self.token_manager.save_access_token()

        return self.token_manager.access_token
```

### 同步示例

如果您使用 `requests`，我们建议配合 `requests_oauthlib` 使用。下面是一个使用本地客户端 ID 和密钥的示例，同时也允许将令牌获取逻辑委托给 Home Assistant。

```python
from typing import Optional, Union, Callable, Dict

from requests import Response
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import TokenExpiredError


class Auth:
    def __init__(
        self,
        host: str,
        token: Optional[Dict[str, str]] = None,
        client_id: str = None,
        client_secret: str = None,
        token_updater: Optional[Callable[[str], None]] = None,
    ):
        self.host = host
        self.client_id = client_id
        self.client_secret = client_secret
        self.token_updater = token_updater

        extra = {"client_id": self.client_id, "client_secret": self.client_secret}

        self._oauth = OAuth2Session(
            auto_refresh_kwargs=extra,
            client_id=client_id,
            token=token,
            token_updater=token_updater,
        )

    def refresh_tokens(self) -> Dict[str, Union[str, int]]:
        """Refresh and return new tokens."""
        token = self._oauth.refresh_token(f"{self.host}/auth/token")

        if self.token_updater is not None:
            self.token_updater(token)

        return token

    def request(self, method: str, path: str, **kwargs) -> Response:
        """Make a request.

        We don't use the built-in token refresh mechanism of OAuth2 session because
        we want to allow overriding the token refresh logic.
        """
        url = f"{self.host}/{path}"
        try:
            return getattr(self._oauth, method)(url, **kwargs)
        except TokenExpiredError:
            self._oauth.token = self.refresh_tokens()

            return getattr(self._oauth, method)(url, **kwargs)
```

开发者现在可以重写刷新令牌的方法，使其通过自己的外部服务完成。

```python
from my_package import AbstractAuth


class Auth(AbstractAuth):
    def refresh_tokens(self) -> Dict[str, Union[str, int]]:
        """Refresh and return new tokens."""
        self.token_manager.fetch_access_token()
        self.token_manager.save_access_token()

        return self.token_manager.access_token
```
