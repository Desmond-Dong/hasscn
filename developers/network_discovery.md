# 网络和发现

某些集成可能需要通过 [mDNS/Zeroconf](https://en.wikipedia.org/wiki/Zero-configuration_networking)、[SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) 或其它已启用的方式来发现网络中的设备。最常见的场景包括：查找没有固定 IP 地址的设备，或者为可动态增删任意数量兼容设备的集成提供发现能力。

Home Assistant 内置了对 mDNS/Zeroconf 和 SSDP 的 helper。如果你的集成使用其它发现方式，并且需要决定应通过哪些网络接口广播流量，可以使用 [network](https://www.home-assistant.io/integrations/network/) 集成提供的 helper API 来访问用户的网络接口偏好设置。

## mDNS/Zeroconf

Home Assistant 使用 [python-zeroconf](https://github.com/python-zeroconf/python-zeroconf) 提供 mDNS 支持。由于不建议在同一台主机上运行多个 mDNS 实现，Home Assistant 提供了内部 helper API，用于访问正在运行的 `Zeroconf` 和 `AsyncZeroconf` 实例。

在使用这些 helper 之前，请先在集成的 `manifest.json` 中把 `zeroconf` 添加到 `dependencies`，参见 [`manifest.json`](/developers/creating_integration_manifest.md)。

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

`python-zeroconf` 提供了这两个对象的使用[示例](https://github.com/jstasiak/python-zeroconf/tree/master/examples)。

## SSDP

Home Assistant 内置了 SSDP 发现能力。

在使用这些 helper 之前，请先在集成的 `manifest.json` 中把 `ssdp` 添加到 `dependencies`，参见 [`manifest.json`](/developers/creating_integration_manifest.md)。

### 获取已发现设备列表

SSDP 集成提供了以下 helper API，用于从缓存中获取已发现的 SSDP 设备：`ssdp.async_get_discovery_info_by_udn_st`、`ssdp.async_get_discovery_info_by_st`、`ssdp.async_get_discovery_info_by_udn`。

### 查找特定设备

`ssdp.async_get_discovery_info_by_udn_st` 在提供 `UDN` 和 `ST` 时，会返回单个 `discovery_info`，如果没有匹配则返回 `None`。

```python
from homeassistant.components import ssdp

...

discovery_info = await ssdp.async_get_discovery_info_by_udn_st(hass, udn, st)
```

### 通过 `ST` 查找设备

如果你想查找已发现的特定类型设备，可以调用 `ssdp.async_get_discovery_info_by_st`。它会返回所有匹配该 `ST` 的已发现设备列表。下面的示例会返回网络上发现的每一台 Sonos 播放器的发现信息。

```python
from homeassistant.components import ssdp

...

discovery_infos = await ssdp.async_get_discovery_info_by_st(hass, "urn:schemas-upnp-org:device:ZonePlayer:1")
for discovery_info in discovery_infos:
    ...
```

### 通过 `UDN` 查找设备

如果你想查看某个特定 `UDN` 提供的服务列表，可以调用 `ssdp.async_get_discovery_info_by_udn`。它会返回所有匹配该 `UDN` 的已发现设备列表。

```python
from homeassistant.components import ssdp

...

discovery_infos = await ssdp.async_get_discovery_info_by_udn(hass, udn)
for discovery_info in discovery_infos:
    ...
```

### 订阅 SSDP 发现事件

某些集成可能需要在设备一被发现时就立即获知。SSDP 集成提供了注册 API，可在发现与指定键值匹配的新设备时触发回调。匹配格式与 `manifest.json` 中 `ssdp` 的配置格式一致，参见 [`manifest.json`](/developers/creating_integration_manifest.md)。

可通过 `ssdp.async_register_callback` 启用该功能。该函数会返回一个取消注册用的 callback。

下面的示例展示了如何在网络中发现 Sonos 播放器时接收回调。

```python
from homeassistant.components import ssdp

...

entry.async_on_unload(
    ssdp.async_register_callback(
        hass, _async_discovered_player, {"st": "urn:schemas-upnp-org:device:ZonePlayer:1"}
    )
)
```

下面的示例展示了如何在检测到 `x-rincon-bootseq` 头时接收回调。

```python
from homeassistant.components import ssdp
from homeassistant.const import MATCH_ALL

...

entry.async_on_unload(
    ssdp.async_register_callback(
        hass, _async_discovered_player, {"x-rincon-bootseq": MATCH_ALL}
    )
)
```

## 网络

对于使用非内置发现方式、并且需要访问用户网络适配器配置的集成，可以使用以下 helper API。

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

USB 集成会在启动时、打开集成页面时，以及插入新设备时（如果底层系统支持 `pyudev`）发现新的 USB 设备。

### 检查特定适配器是否已插入

调用 `async_is_plugged_in` API，检查系统中是否存在指定适配器。

```python
from homeassistant.components import usb

...

if not usb.async_is_plugged_in(hass, {"serial_number": "A1234", "manufacturer": "xtech"}):
    raise ConfigEntryNotReady("The USB device is missing")
```

### 了解何时需要查找新的兼容 USB 设备

当有新的兼容 USB 设备可用时，可调用 `async_register_scan_request_callback` API 注册回调。

```python
from homeassistant.components import usb
from homeassistant.core import callback

...

@callback
def _async_check_for_usb() -> None:
    """Check for new compatible bluetooth USB adapters."""

entry.async_on_unload(
    bluetooth.async_register_scan_request_callback(hass, _async_check_for_usb)
)
```
