---
title: "Python库：建模数据"
sidebar_label: 建模数据
---

现在我们已经进行了身份验证，我们可以开始发出经过身份验证的请求并获取数据！

在对数据进行建模时，重要的是我们与 API 提供的结构相同的结构公开来自 API 的数据。某些 API 设计可能没有多大意义或包含剪贴错误。重要的是我们仍然在我们的对象中代表它们。这使得您的库的开发人员可以轻松地使用 API 文档并了解它如何在您的库中工作。

API 库应该学做。，因此可以将数据结构表示为类，但不宜将数据从一个值转换为另一个值。例如，您不宜实现摄氏温度和华氏温度之间的决定转换。这涉及对结果精度的影响，因此应转用该库的开发人员。

在此示例中，我们将名为 ExampleHub 的 Rest API 建模一个异步库，该库有两个端点：

- get `/light/<id>`：查询单个灯的信息。

  ```json
  {
    "id": 1234,
    "name": "Example Light",
    "is_on": true
  }
  ```

- 后`/light/<id>`：控制灯光。要发送的示例 JSON：`{ "is_on": false }`。以新的光状态做出响应。

- 获取`/lights`：返回所有灯的列表
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

由于这个 API 代表灯光，我们首先要创建一个类来代表灯光。

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

现在我们有了一个轻量级，我们可以对 API 的根进行建模，它提供数据的入口点。

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

有了这两个文件，我们现在可以像这样控制灯光：

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
