---
title: "Python 库：认证"
sidebar_label: 认证
---

本页面向旨在集成第三方 API 的第三方库的一般 API 开发。有关与 Home Assistant API 交互的信息，请参见[Home Assistant REST API 文档](/developers/api/rest)。

库的 Authentication 部分负责获取认证信息以及发起经过认证的请求。它不应该知道请求中包含了什么内容。

认证有许多种形式，但归根结底通常就是每个请求都附带一个 `authorization` header，其中包含一个 access token。access token 通常是一串随机数字和字母的字符串。

你的库应该能够获取认证令牌、在必要时更新它们，并使用认证信息发起请求。它不应提供存储认证数据的功能。

由于认证信息将由开发者存储，因此重要的是你要以可以 JSON 序列化的格式将认证信息返回给开发者。建议使用包含基本类型（`str`、`float`、`int`）的 `dict`。

如果你的 API 可以从多个位置提供，你的认证类应该允许开发者传入 API 的位置。

## 异步示例

Python 允许开发者编写同步或异步（通过 `asyncio`）的代码。Home Assistant 使用 async 编写，但也能够与同步库配合使用。我们更倾向于使用 async 库。

如果你在编写 async 库，我们建议使用 `aiohttp`。它是一个现代且成熟的 HTTP 库，易于使用。

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

要使用此类，你需要创建一个 aiohttp `ClientSession` 并将其与 API 信息一起传递给构造函数。

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

要使用此类，请用 API 信息构造该类。

```python
from my_package import Auth


auth = Auth("http://example.com/api", "secret_access_token")

# This will fetch data from http://example.com/api/lights
resp = auth.request("get", "lights")
print("HTTP response status code", resp.status_code)
print("HTTP response JSON content", resp.json())
```

## OAuth2

OAuth2 是一种利用 refresh token 和 access token 的[标准化](https://tools.ietf.org/html/rfc6749)认证方案。access token 在颁发后短时间内即过期。refresh token 可用于获取新的 access token。

刷新 access token 依赖于 client ID 和 secret，它们可能由外部服务持有。我们需要设计认证类的结构，使其能够允许开发者实现自己的 token refresh 逻辑。

Home Assistant 附带了 Home Assistant Cloud Account Linking 服务，这是一个免费的云服务，允许用户通过 OAuth2 快速连接账户。Home Assistant 内置了易于使用的工具，允许用户配置基于 OAuth2 的 integrations。更多信息，请[点击此处](core/integration/config_flow.md#configuration-via-oauth2)。如果你的库按照下面的示例方式实现，这些内置工具将发挥最佳效果。

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

现在，使用你的库的开发者必须实现获取 access token 的 abstract method。假设开发者拥有自己的 token manager 类。

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

如果你使用 `requests`，我们建议使用 `requests_oauthlib` 包。下面是一个示例，它可以使用本地的 client ID 和 secret，同时也允许将 token 获取工作委托给 Home Assistant。

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

现在开发者可以覆盖 refresh token 函数，将其路由到自己的外部服务。

```python
from my_package import AbstractAuth


class Auth(AbstractAuth):
    def refresh_tokens(self) -> Dict[str, Union[str, int]]:
        """Refresh and return new tokens."""
        self.token_manager.fetch_access_token()
        self.token_manager.save_access_token()

        return self.token_manager.access_token
```
