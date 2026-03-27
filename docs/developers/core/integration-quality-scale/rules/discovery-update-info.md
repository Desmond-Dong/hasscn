---
title: "集成使用发现信息来更新网络信息"
description: 'import RelatedRules from ''./includes/relatedrules.jsx''。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 集成使用发现信息来更新网络信息

import RelatedRules from './_includes/related_rules.jsx'

## 推理

大多数最终用户网络都使用动态 IP 地址。
这意味着首次设置不同的 IP 地址时可获得设备和服务。
为了避免用户将设备设置为静态 IP 地址（这并不总是需要支持），集成应使用发现信息来更新设备或服务的网络信息。

只有当集成确定设备或服务与之前设置的设备或服务相同时，我们才应更新设备或服务的IP地址。

## 实施示例

在下面的示例中，我们有一个使用 mDNS 来发现设备的集成。
结果启动Zeroconf发现流时，集成都会将流的唯一ID设置为设备的序列号。
如果已设置唯一ID，则设备IP地址发生更改时将进行更新，并且流程将中止。

ZZ保护0ZZ:
```json
{
  "zeroconf": ["_mydevice._tcp.local."]
}
```

ZZ保护0ZZ:
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
如果您使用DHCP发现，并且想要接收更新的IP地址的发现流，请务必在设备信息中注册MAC地址，并在清单中将`registered_devices`设置为`true`。
这将为这些设备创建发现流。
:::

## 其他资源

要了解有关配置流的更多信息，请查看[config flow documentation](/developers/config_entries_config_flow_handler)。
要了解有关网络协议和发现的更多信息，请查看 [Networking and discovery documentation](/developers/network_discovery)。

## 例外情况

此规则的例外是并非所有设备都可以被发现。
无法发现设备的集成不受此规则的约束。

