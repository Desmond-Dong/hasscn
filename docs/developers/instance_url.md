---
title: "获取实例地址"
description: '在某些情况下，集成需要知道用户的 Home Assistant 实例 URL，并且这个 URL 还必须满足当前用例的需求。例如，设备需要将数据回传给 Home Assistant，或外部服务/设备需要从 Home Assistant 获取数据（例如生成的图片或音频文件）。'
---
# 获取实例地址

在某些情况下，集成需要知道用户的 Home Assistant 实例 URL，并且这个 URL 还必须满足当前用例的需求。例如，设备需要将数据回传给 Home Assistant，或外部服务/设备需要从 Home Assistant 获取数据（例如生成的图片或音频文件）。

获取实例 URL 可能相当复杂，因为用户可能拥有多种不同的 URL：

- 用户配置的内部家庭网络 URL。
- 自动检测到的内部家庭网络 URL。
- 用户配置的、可从公网访问的外部 URL。
- 由 Nabu Casa 的 Home Assistant Cloud 提供的 URL（如果用户有订阅）。

由于 URL 还可能运行在非标准端口（例如不是 80 或 443）上，并且可能启用或未启用 SSL（`http://` 与 `https://`），因此复杂度会进一步增加。

幸运的是，Home Assistant 提供了一个辅助方法来稍微简化这个过程。

## URL helper

Home Assistant 提供了一个网络辅助方法 `get_url`，用于获取满足集成需求的实例 URL。

该辅助方法的签名如下：

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

该方法各参数的含义如下：

- `require_current_request`
  要求返回的 URL 与用户当前在浏览器中使用的 URL 相匹配。如果当前没有请求，则会抛出错误。

- `require_ssl`:
  要求返回的 URL 使用 `https` scheme。

- `require_standard_port`:
  要求返回的 URL 使用标准 HTTP 端口。也就是说，`http` 必须使用 80 端口，`https` 必须使用 443 端口。

- `allow_internal`:
  允许返回用户设置的内部 URL，或在内部网络上检测到的 URL。如果需要的是纯外部 URL，请将其设为 `False`。

- `allow_external`:
  允许返回用户设置的外部 URL 或 Home Assistant Cloud URL。如果只需要内部 URL，请将其设为 `False`。

- `allow_cloud`:
  允许返回 Home Assistant Cloud URL。如果你的场景要求不能使用 Cloud URL，请将其设为 `False`。

- `allow_ip`:
  允许 URL 的 host 部分是 IP 地址。如果你的用例无法使用 IP 地址，请将其设为 `False`。

- `prefer_external`:
  默认情况下，我们优先选择内部 URL。将其设为 `True` 可反转这一逻辑，使外部 URL 优先于内部 URL。

- `prefer_cloud`:
  默认情况下，优先使用用户设置的外部 URL。不过在极少数情况下，云 URL 可能更可靠。将其设为 `True` 后，会优先选择 Home Assistant Cloud URL，而不是用户定义的外部 URL。

## 默认行为

默认情况下，在不传入额外参数时（`get_url(hass)`），它会尝试：

- 获取用户设置的内部 URL；如果不可用，则尝试从网络接口检测一个（基于 `http` 设置）。

- 如果内部 URL 失败，则尝试获取外部 URL。它会优先使用用户设置的外部 URL；如果这也失败，则尝试获取可用的 Home Assistant Cloud URL。

默认行为的目标是：允许任意 URL，但优先选择本地 URL，并且不附加额外要求。

## 示例用法

最基本的辅助方法用法如下：

```py
from homeassistant.helpers.network import get_url

instance_url = get_url(hass)
```

这个示例调用通常会优先返回一个内部 URL，该 URL 可能是用户设置的，也可能是自动检测到的。如果无法提供内部 URL，则会尝试使用用户的外部 URL。最后，如果用户未设置外部 URL，则会尝试使用 Home Assistant Cloud URL。

如果完全没有可用 URL（或没有 URL 满足给定要求），则会抛出异常：`NoURLAvailableError`。

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

上面的示例展示了一个稍微复杂一些的 URL helper 用法。在这个例子中，请求得到的 URL 不能是内部地址，不能包含 IP 地址，必须启用 SSL，并且必须运行在标准端口上。

如果没有满足条件的 URL，可捕获 `NoURLAvailableError` 异常并进行处理。
