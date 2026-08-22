---
author: epenet
authorURL: https://github.com/epenet
title: "迁移 dhcp/ssdp/usb/zeroconf ServiceInfo models"
---

### 变更摘要

为了减少对 optional 集成的依赖（这些集成名称本质上是作为 helpers 使用的），以下 ServiceInfo models 已被迁移：
- `DhcpServiceInfo` 从 `homeassistant.components.dhcp` 迁移到 `homeassistant.helpers.service_info.dhcp`
- `SsdpServiceInfo` 从 `homeassistant.components.ssdp` 迁移到 `homeassistant.helpers.service_info.ssdp`
- `UsbServiceInfo` 从 `homeassistant.components.usb` 迁移到 `homeassistant.helpers.service_info.usb`
- `ZeroconfServiceInfo` 从 `homeassistant.components.zeroconf` 迁移到 `homeassistant.helpers.service_info.zeroconf`


要更新你的集成：
1. 按下述示例替换 import 语句
2. 使用新的 imports 测试你的集成

旧的 import 位置已被 deprecated，并将在 Home Assistant 2026.2 中移除。


### 示例

```python
# 旧
# from homeassistant.components.dhcp import DhcpServiceInfo
# from homeassistant.components.ssdp import SsdpServiceInfo
# from homeassistant.components.usb import UsbServiceInfo
# from homeassistant.components.zeroconf import ZeroconfServiceInfo

# 新
from homeassistant.helpers.service_info.dhcp import DhcpServiceInfo
from homeassistant.helpers.service_info.ssdp import SsdpServiceInfo
from homeassistant.helpers.service_info.usb import UsbServiceInfo
from homeassistant.helpers.service_info.zeroconf import ZeroconfServiceInfo

class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow."""

    async def async_step_dhcp(self, discovery_info: DhcpServiceInfo) -> ConfigFlowResult:
        """Handle dhcp discovery."""
        ...

    async def async_step_ssdp(self, discovery_info: SsdpServiceInfo) -> ConfigFlowResult:
        """Handle ssdp discovery."""
        ...

    async def async_step_usb(self, discovery_info: UsbServiceInfo) -> ConfigFlowResult:
        """Handle usb discovery."""
        ...

    async def async_step_zeroconf(self, discovery_info: ZeroconfServiceInfo) -> ConfigFlowResult:
        """Handle zeroconf discovery."""
        ...
```