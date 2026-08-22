---
author: Allen Porter
authorURL: https://github.com/allenporter
title: "Service Call API 变更"
---

此变更影响 Service Call API：`hass.services.async_call` 和 `hass.services.call`。

对于 Home Assistant Core 2023.7，service calls 的部分输入参数和返回值已
变更，以准备更好地支持 [Service return values](https://github.com/home-assistant/architecture/discussions/777#discussioncomment-6127898)。

之前，成功时返回 `True`，发生超时返回 `False`。用于设置超时的 `limit`
参数已被移除，布尔返回值也已移除。
如果调用方需要超时，现在应使用 asyncio 自行设置。