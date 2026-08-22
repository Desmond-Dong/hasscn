---
title: "Python 库：数据建模"
sidebar_label: Modelling data
---

既然认证已经就绪，我们就可以开始发起经过认证的请求并获取数据了！

在建模数据时，重要的是我们要以 API 所提供的相同结构来暴露数据。某些 API 设计可能不太合理，或者包含拼写错误。我们仍然需要在对象中如实表示它们。这使得使用你的库的开发者可以轻松参考 API 文档，并了解它在你的库中如何工作。

API 库应尽量做到最少。因此，将数据结构表示为类是可以的，但你不应该将一个值转换为另一个值。例如，你不应该实现 Celsius 和 Fahrenheit 温度之间的转换。这涉及到对结果精度的决策，因此应该交由使用库的开发者来处理。

在这个示例中，我们将为名为 ExampleHub 的 Rest API 构建一个 async 库，它有两个 endpoints：

- get `/light/<id>`：查询单个 light 的信息。

  ```json
  {
    "id": 1234,
    "name": "Example Light",
    "is_on": true
  }
  ```

- post `/light/<id>`：控制 light。发送的示例 JSON：`{ "is_on": false }`。返回 light 的新状态。

- get `/lights`：返回所有 lights 的列表
  ```json
  [
    {
      "id": 1234,
      "name": "Example Light",
      "is_on": true
    },
    {
      "id": 5678,
      "name": "Example Light 2",
      "is_on": false
    }
  ]
  ```

由于此 API 表示 lights，我们首先要创建一个类来表示 light。

```python
from .auth import Auth


class Light:
    """Class that represents a Light object in the ExampleHub API."""

    def __init__(self, raw_data: dict, auth: Auth):
        """Initialize a light object."""
        self.raw_data = raw_data
        self.auth = auth

    # Note: each property name maps the name in the returned data

    @property
    def id(self) -> int:
        """Return the ID of the light."""
        return self.raw_data["id"]

    @property
    def name(self) -> str:
        """Return the name of the light."""
        return self.raw_data["name"]

    @property
    def is_on(self) -> bool:
        """Return if the light is on."""
        return self.raw_data["id"]

    async def async_control(self, is_on: bool):
        """Control the light."""
        resp = await self.auth.request(
            "post", f"light/{self.id}", json={"is_on": is_on}
        )
        resp.raise_for_status()
        self.raw_data = await resp.json()

    async def async_update(self):
        """Update the light data."""
        resp = await self.auth.request("get", f"light/{self.id}")
        resp.raise_for_status()
        self.raw_data = await resp.json()
```

现在我们有了 light 类，可以建模 API 的根部分，它提供了数据的入口点。

```python
from typing import List

from .auth import Auth
from .light import Light


class ExampleHubAPI:
    """Class to communicate with the ExampleHub API."""

    def __init__(self, auth: Auth):
        """Initialize the API and store the auth so we can make requests."""
        self.auth = auth

    async def async_get_lights(self) -> List[Light]:
        """Return the lights."""
        resp = await self.auth.request("get", "lights")
        resp.raise_for_status()
        return [Light(light_data, self.auth) for light_data in await resp.json()]

    async def async_get_light(self, light_id) -> Light:
        """Return the lights."""
        resp = await self.auth.request("get", f"light/{light_id}")
        resp.raise_for_status()
        return Light(await resp.json(), self.auth)
```

有了这两个文件，我们现在可以这样控制 lights：

```python
import asyncio
import aiohttp

from my_package import Auth, ExampleHubAPI


async def main():
    async with aiohttp.ClientSession() as session:
        auth = Auth(session, "http://example.com/api", "secret_access_token")
        api = ExampleHubAPI(auth)

        lights = await api.async_get_lights()

        # Print light states
        for light in lights:
            print(f"The light {light.name} is {light.is_on}")

        # Control a light.
        light = lights[0]
        await light.async_control(not light.is_on)


asyncio.run(main())
```
