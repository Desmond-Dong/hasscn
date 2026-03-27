---
title: "集成依赖支持传入 websession"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
related_rules:
  - async-dependency
---
# 集成依赖支持传入 websession

import RelatedRules from './_includes/related_rules.jsx'

## 推理

由于许多设备和服务通过 HTTP 连接，因此活动 Web 会话的数量可能很高。
为了提高这些 Web 会话的效率，建议支持将 Web 会话传递到集成所使用的依赖项客户端。

Home Assistant 支持 [aiohttp](https://docs.aiohttp.org/en/stable/) 和 [httpx](https://www.python-httpx.org/)。
这意味着集成依赖项应该使用这两个库中的任何一个。

## 实施示例

在下面的示例中，`aiohttp` 会话被传递到客户端。
`httpx` 的等效项是 `get_async_client`。

```python {4} showLineNumbers
async def async_setup_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Set up my integration from a config entry."""

    client = MyClient(entry.data[CONF_HOST], async_get_clientsession(hass))
```

:::info
在某些情况下，您可能不希望共享会话，例如使用 cookie 时。
在这种情况下，您可以对 `aiohttp` 使用 `async_create_clientsession`，对 `httpx` 使用 `create_async_httpx_client` 创建新会话。
:::

## 例外情况

如果集成未发出任何 HTTP 请求，则此规则不适用。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
