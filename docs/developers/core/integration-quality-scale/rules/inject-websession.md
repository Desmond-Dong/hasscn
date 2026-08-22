---
title: "集成依赖支持传入 websession"
sidebar_label: 🏆 inject-websession
related_rules:
  - async-dependency
---
import RelatedRules from './_includes/related_rules.jsx'

## 原理说明

由于许多设备和服务通过 HTTP 连接，活跃 web session 的数量可能会很高。
为提高这些 web session 的效率，建议在集成使用的依赖客户端中支持传入 web session。

Home Assistant 支持 [`aiohttp`](https://docs.aiohttp.org/en/stable/) 和 [`httpx`](https://www.python-httpx.org/) 这两种方式。
这意味着集成的依赖应使用这两个库中的一个。

## 示例实现

在下面的示例中，将一个 `aiohttp` session 传入客户端。
`httpx` 的等效实现为 `get_async_client`。

```python {4} showLineNumbers
async def async_setup_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Set up my integration from a config entry."""

    client = MyClient(entry.data[CONF_HOST], async_get_clientsession(hass))
```

:::info
在某些情况下可能不需要共享 session，例如使用 cookies 时。
在这种情况下，可以使用 `async_create_clientsession`（针对 `aiohttp`）或 `create_async_httpx_client`（针对 `httpx`）来创建新 session。
:::

## 例外情况

如果集成不发出任何 HTTP 请求，则此规则不适用。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
