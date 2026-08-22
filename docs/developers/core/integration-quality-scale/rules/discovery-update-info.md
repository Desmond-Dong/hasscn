---
title: "集成使用发现信息更新网络信息"
sidebar_label: 🥇 discovery-update-info
---
import RelatedRules from './_includes/related_rules.jsx'

## 原因

大多数终端用户的网络使用动态 IP 地址。
这意味着设备和服务可能会获得与首次设置时不同的 IP 地址。
为了避免需要用户将设备设置为静态 IP 地址（这并不总是可行的），集成应使用发现信息来更新设备或服务的网络信息。

只有在集成确定设备或服务与之前设置的是同一个时，才应更新设备或服务的 IP 地址。

## 示例实现

在下面的示例中，我们有一个使用 mDNS 发现设备的集成。
每次启动 zeroconf 发现流程时，集成都会将流程的唯一 ID 设置为设备的序列号。
如果唯一 ID 已存在，当设备 IP 地址发生变化时将对其进行更新，然后流程将中止。

`manifest.json`:
```json
{
  "zeroconf": ["_mydevice._tcp.local."]
}
```

`config_flow.py`:
```python {14-15} showLineNumbers
class MyConfigFlow(ConfigFlow, domain=DOMAIN):
    """My config flow."""

    def __init__(self) -> None:
        """Initialize the config flow."""
        self.data: dict[str, Any] = {}

    async def async_step_zeroconf(
        self, discovery_info: zeroconf.ZeroconfServiceInfo
    ) -> ConfigFlowResult:
        """Handle zeroconf discovery."""
        self.data[CONF_HOST] = host = discovery_info.host

        await self.async_set_unique_id(discovery_info.properties["serialno"])
        self._abort_if_unique_id_configured(updates={CONF_HOST: host})

        client = MyClient(host)
        try:
            await client.get_data()
        except MyClientError:
            return self.async_abort(reason="cannot_connect")

        return await self.async_step_discovery_confirm()
```

:::info
如果你使用 DHCP 发现，并希望针对更新的 IP 地址接收发现流程，请务必在 device info 中注册 MAC 地址，并在 manifest 中将 `registered_devices` 设置为 `true`。
这将为这些设备创建设置流程。
:::

## 更多资源

要了解有关配置流程的更多信息，请查阅[config flow 文档](/developers/core/integration/config_flow)。
要了解有关网络协议和发现的信息，请查阅[Networking and discovery 文档](/developers/network_discovery)。

## 例外

本规则的例外情况是并非每个设备都可以被发现。
设备无法被发现的集成免于此规则。
