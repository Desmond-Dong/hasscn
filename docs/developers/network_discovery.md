---
title: "网络与发现"
sidebar_label: "Networking and discovery"
---

某些 integrations 在启用后，可能需要通过 [mDNS/Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking)、[SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) 或其他方法在网络中自动发现设备。主要的使用场景是查找没有已知固定 IP Address 的设备，或者用于可以动态添加和移除任意数量兼容可发现设备的 integrations。

Home Assistant 内置了支持 mDNS/Zeroconf 和 SSDP 的 helpers。如果你的 integration 使用了其他 discovery method，并且需要确定使用哪些 network interfaces 来广播流量，[Network](https://www.home-assistant.io/integrations/network/) integration 提供了一个 helper API 来访问用户的 interface 偏好设置。

## mDNS/Zeroconf

Home Assistant 使用 [python-zeroconf](https://github.com/python-zeroconf/python-zeroconf) 包来提供 mDNS 支持。由于不建议在单个主机上运行多个 mDNS 实现，Home Assistant 提供了内部 helper APIs 来访问正在运行的 `Zeroconf` 和 `AsyncZeroconf` 实例。

在使用这些 helpers 之前，请确保在你的 integration 的 [`manifest.json`](creating_integration_manifest.md) 中将 `zeroconf` 添加到 `dependencies` 中。

### 获取 `AsyncZeroconf` 对象

```python
from homeassistant.components import zeroconf

...
aiozc = await zeroconf.async_get_async_instance(hass)

```

### 获取 `Zeroconf` 对象

```python
from homeassistant.components import zeroconf

...
zc = await zeroconf.async_get_instance(hass)

```

### 使用 `AsyncZeroconf` 和 `Zeroconf` 对象

`python-zeroconf` 提供了关于如何使用这两个对象的示例：[examples](https://github.com/jstasiak/python-zeroconf/tree/master/examples)。

## SSDP

Home Assistant 提供了基于 SSDP 的内置自动发现功能。

在使用这些 helpers 之前，请确保在你的 integration 的 [`manifest.json`](creating_integration_manifest.md) 中将 `ssdp` 添加到 `dependencies` 中。

### 获取已发现设备列表

可以通过以下内置 helper APIs 获取已发现的 SSDP 设备列表。SSDP integration 提供了以下 helper APIs 来从缓存中查找现有的 SSDP discoveries：`ssdp.async_get_discovery_info_by_udn_st`、`ssdp.async_get_discovery_info_by_st`、`ssdp.async_get_discovery_info_by_udn`

### 查找特定设备

`ssdp.async_get_discovery_info_by_udn_st` API 在提供 `SSDP`、`UDN` 和 `ST` 时，返回单个 `discovery_info` 或 `None`。

```
from homeassistant.components import ssdp

...

discovery_info = await ssdp.async_get_discovery_info_by_udn_st(hass, udn, st)
```

### 按 `ST` 查找设备

如果你想查找特定类型的已发现设备，调用 `ssdp.async_get_discovery_info_by_st` 将返回所有与 `SSDP` `ST` 匹配的已发现设备列表。下面的示例返回网络中发现的每个 Sonos player 的 discovery info 列表。

```
from homeassistant.components import ssdp

...

discovery_infos = await ssdp.async_get_discovery_info_by_st(hass, "urn:schemas-upnp-org:device:ZonePlayer:1")
for discovery_info in discovery_infos:
  ...

```

### 按 `UDN` 查找设备

如果你想查看特定 `UDN` 所提供的服务列表，调用 `ssdp.async_get_discovery_info_by_udn` 将返回所有与 `UPNP` `UDN` 匹配的已发现设备列表。

```
from homeassistant.components import ssdp

...

discovery_infos = await ssdp.async_get_discovery_info_by_udn(hass, udn)
for discovery_info in discovery_infos:
  ...

```

### 订阅 SSDP 发现

某些 integrations 可能需要立即获知设备被发现的事件。SSDP integration 提供了一个 registration API，当发现的新设备匹配特定 key values 时接收回调。匹配规则使用与 [`manifest.json`](creating_integration_manifest.md) 中 `ssdp` 相同的格式。

`ssdp.async_register_callback` 函数提供了此功能。该函数返回一个回调，调用该回调即可取消注册。

下面的示例展示了注册以在网络中出现 Sonos player 时接收回调。

```
from homeassistant.components import ssdp

...

entry.async_on_unload(
    await ssdp.async_register_callback(
        hass, _async_discovered_player, {"st": "urn:schemas-upnp-org:device:ZonePlayer:1"}
    )
)
```

下面的示例展示了注册以在 `x-rincon-bootseq` header 存在时接收回调。

```
from homeassistant.components import ssdp
from homeassistant.const import MATCH_ALL

...

entry.async_on_unload(
    await ssdp.async_register_callback(
        hass, _async_discovered_player, {"x-rincon-bootseq": MATCH_ALL}
    )
)
```

## DHCP

Home Assistant 提供了基于 DHCP 的内置自动发现功能。

在使用这些 helpers 之前，请确保在你的 integration 的 [`manifest.json`](creating_integration_manifest.md) 中将 `dhcp` 添加到 `dependencies` 中。

### 获取已发现设备列表

要访问当前的 DHCP discoveries 列表，请调用 `dhcp.async_discovered_service_info` API。仅返回仍处于 DHCP cache 中的设备。

```python
from homeassistant.components import dhcp

...

service_infos = dhcp.async_discovered_service_info(hass)
for service_info in service_infos:
  ...
```

每个条目都是一个 `DhcpServiceInfo`，包含 `ip`、`hostname` 和 `macaddress` 属性。请注意，`hostname` 始终为小写，`macaddress` 格式化为不带冒号的小写字符串（例如，`AA:BB:CC:12:34:56` 将返回为 `aabbcc123456`）。

## 网络

对于使用非内置 discovery method 且需要访问用户 network adapter 配置的 integrations，应使用以下 helper API。

```python
from homeassistant.components import network

...
adapters = await network.async_get_adapters(hass)
```

### `async_get_adapters` 数据结构示例

```python
[
    {
        "auto": True,
        "default": False,
        "enabled": True,
        "ipv4": [],
        "ipv6": [
            {
                "address": "2001:db8::",
                "network_prefix": 8,
                "flowinfo": 1,
                "scope_id": 1,
            }
        ],
        "name": "eth0",
    },
    {
        "auto": True,
        "default": False,
        "enabled": True,
        "ipv4": [{"address": "192.168.1.5", "network_prefix": 23}],
        "ipv6": [],
        "name": "eth1",
    },
    {
        "auto": False,
        "default": False,
        "enabled": False,
        "ipv4": [{"address": "169.254.3.2", "network_prefix": 16}],
        "ipv6": [],
        "name": "vtun0",
    },
]
```

### 从适配器获取 IP 网络

```python
from ipaddress import ip_network
from homeassistant.components import network

...

adapters = await network.async_get_adapters(hass)

for adapter in adapters:
    for ip_info in adapter["ipv4"]:
        local_ip = ip_info["address"]
        network_prefix = ip_info["network_prefix"]
        ip_net = ip_network(f"{local_ip}/{network_prefix}", False)
```

## USB

USB integration 在启动时、访问 integrations 页面时，以及在底层系统支持 `pyudev` 的情况下插入设备时，会发现新的 USB 设备。

### 了解何时查找新的兼容 USB 设备

调用 `async_register_scan_request_callback` API 以在可能有新的兼容 USB 设备可用时请求回调。

```python
from homeassistant.components import usb
from homeassistant.core import callback

...

@callback
def _async_check_for_usb() -> None:
    """Check for new compatible USB adapters."""

entry.async_on_unload(
    usb.async_register_scan_request_callback(hass, _async_check_for_usb)
)
```
