# 可以发现设备

import RelatedRules from './\_includes/related\_rules.jsx'

## 推理

许多设备都有被发现的能力。
这可以使用以下方法之一来实现:

* 应用程序（以前称为附加组件）
* ZZ保护0ZZ
* ZZ保护0ZZ
* ZZ保护0ZZ
* ZZ保护0ZZ
* ZZ保护0ZZ
* ZZ保护0ZZ
* ZZ保护0ZZ

这是让用户更轻松地查找和设置设备的好方法，因为他们不必手动查找要使用的集成，然后输入主机。
这大大减少了设置设备所需的工作量，从而改善了用户体验。

使用基于网络的设置，还允许在设备收到新的 IP 地址后更新集成的。

## 实施示例

在以下示例中，可以使用 mDNS 发现集成。
该设备将通过提供 `_mydevice._tcp.local.` 服务来生产自身可发现。
Home Assistant 将拾取此信息并为用户启动发现流程。
然后，用户将能够确认发现并设置集成。

ZZ保护0ZZ:

```json {2} showLineNumbers
{
  "zeroconf": ["_mydevice._tcp.local."]
}
```

ZZ保护0ZZ:

```python {8-23,25-36} showLineNumbers
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

    async def async_step_discovery_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Confirm discovery."""
        if user_input is not None:
            return self.async_create_entry(
                title="MyIntegration",
                data={CONF_HOST: self.data[CONF_HOST]},
            )

        self._set_confirm_only()
        return self.async_show_form(step_id="discovery_confirm")

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle a flow initialized by the user."""
        errors: dict[str, str] = {}
        if user_input:
            client = MyClient(user_input[CONF_HOST])
            try:
                serial_number = await client.check_connection()
            except MyException as exception:
                errors["base"] = "cannot_connect"
            else:
                await self.async_set_unique_id(
                    serial_number, raise_on_progress=False
                )
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title="MyIntegration",
                    data=user_input,
                )
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_HOST): TextSelector(),
                }
            ),
            errors=errors,
        )
```

## 其他资源

要了解有关配置流的更多信息，请查看[config flow documentation](/developers/config_entries_config_flow_handler.md)。
要了解有关网络协议发现的更多信息，请查看 [Networking and discovery documentation](/developers/network_discovery.md)。
要了解有关蓝牙设备发现的更多信息，请查看[Bluetooth documentation](/developers/bluetooth.md)。

## 例外情况

此规则的例外是并非所有设备都可以被发现。
无法发现设备的集成不受此规则的约束。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
