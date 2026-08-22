---
title: "获取实例 URL"
---

在某些情况下，integration 需要知道用户的 Home Assistant 实例的 URL，并且该 URL 必须符合当前用例的要求。例如，设备需要回传数据给 Home Assistant，或者外部服务或设备需要从 Home Assistant 获取数据（例如，生成的图片或声音文件）。

获取 instance URL 可能会比较复杂，因为用户可能有一堆不同的 URL：

- 用户配置的 internal home network URL。
- 自动检测到的 internal home network URL。
- 用户配置的、从互联网上可公开访问的 external URL。
- 如果用户有订阅，则可能是 Nabu Casa 提供的 Home Assistant Cloud URL。

URL 可以在非标准端口上提供服务（例如，不是 80 或 443），并且可以带或不带 SSL（`http://` 与 `https://`），这增加了额外的复杂性。

幸运的是，Home Assistant 提供了一个 helper method 来稍微简化这一点。

## URL helper

Home Assistant 提供了一个 network helper method 来获取 instance URL，该 URL 符合 integration 的需求，名为 `get_url`。

该 helper method 的签名：

```py
# homeassistant.helpers.network.get_url
def get_url(
    hass: HomeAssistant,
    *,
    require_current_request: bool = False,
    require_ssl: bool = False,
    require_standard_port: bool = False,
    allow_internal: bool = True,
    allow_external: bool = True,
    allow_cloud: bool = True,
    allow_ip: bool = True,
    prefer_external: bool = False,
    prefer_cloud: bool = False,
) -> str:
```

该方法的各个参数：

- `require_current_request`
  要求返回的 URL 与用户浏览器当前正在使用的 URL 匹配。如果没有当前请求，将抛出错误。

- `require_ssl`：
  要求返回的 URL 使用 `https` scheme。

- `require_standard_port`：
  要求返回的 URL 使用标准 HTTP 端口。也就是说，它要求 `http` scheme 使用端口 80，`https` scheme 使用端口 443。

- `allow_internal`：
  允许 URL 是用户在 internal network 上设置的 URL 或检测到的 URL。如果你要求必须使用 external URL，请将此项设置为 `False`。

- `allow_external`：
  允许 URL 是用户设置的 external URL 或 Home Assistant Cloud URL。如果你要求必须使用 internal URL，请将此项设置为 `False`。

- `allow_cloud`：
  允许返回 Home Assistant Cloud URL，如果你要求不能使用 Cloud URL，请设置为 `False`。

- `allow_ip`：
  允许 URL 的 host 部分为 IP 地址，如果这对你的用例不可用，请设置为 `False`。

- `prefer_external`：
  默认情况下，我们优先选择 internal URL 而不是 external URL。将此选项设置为 `True` 可以反转这一逻辑，优先选择 external URL 而不是 internal URL。

- `prefer_cloud`：
  默认情况下，用户设置的 external URL 是首选，但在极少数情况下，cloud URL 可能更可靠。将此选项设置为 `True` 会优先选择 Home Assistant Cloud URL，而不是用户自定义的 external URL。

## 默认行为

默认情况下，不传递任何额外参数（`get_url(hass)`），它会尝试：

- 获取用户设置的 internal URL，如果不可用，则尝试从 network interface 检测一个（基于 `http` 设置）。

- 如果 internal URL 失败，它会尝试获取 external URL。它优先使用用户设置的 external URL，如果那也失败，则在可用的情况下获取 Home Assistant Cloud URL。

默认目标是：允许任何 URL，但优先使用本地 URL，且没有额外要求。

## 使用示例

使用该 helper 的最基本示例：

```py
from homeassistant.helpers.network import get_url

instance_url = get_url(hass)
```

对上述 helper method 的这次调用将优先返回一个 internal URL，该 URL 要么是用户设置的，要么是检测到的。如果无法提供，它将尝试使用用户的 external URL。最后，如果用户没有设置 external URL，它将尝试使用 Home Assistant Cloud URL。

如果完全没有任何 URL 可用（或没有任何 URL 满足给定要求），将抛出一个异常：`NoURLAvailableError`。

```py
from homeassistant.helpers import network

try:
    external_url = network.get_url(
        hass,
        allow_internal=False,
        allow_ip=False,
        require_ssl=True,
        require_standard_port=True,
    )
except network.NoURLAvailableError:
    raise MyInvalidValueError("Failed to find suitable URL for my integration")
```

上面的示例展示了 URL helper 的稍复杂用法。在这种情况下，请求的 URL 不能是 internal 地址，URL 不能包含 IP 地址，需要 SSL，并且必须运行在标准端口上。

如果没有可用的 URL，可以捕获并处理 `NoURLAvailableError` 异常。