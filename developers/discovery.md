import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

很多设备都具有被发现的机制。
这可以通过以下方法之一发生：

* App（以前称为 add-ons）
* [Bluetooth](/developers/creating_integration_manifest.md#bluetooth)
* [DHCP](/developers/creating_integration_manifest.md#dhcp)
* [HomeKit](/developers/creating_integration_manifest.md#homekit)
* [mDNS](/developers/creating_integration_manifest.md#zeroconf)
* [MQTT](/developers/creating_integration_manifest.md#mqtt)
* [SSDP](/developers/creating_integration_manifest.md#ssdp)
* [USB](/developers/creating_integration_manifest.md#usb)

这是一个让用户更容易找到并设置设备的好方法，因为他们不必手动查找使用哪个集成，然后再输入主机。
这大大减少了设置设备所需的精力，从而改善了用户体验。

使用基于网络的设置，还允许在设备获得新 IP 地址时更新集成的配置。

## 示例实现

在下面的示例中，集成可以通过 mDNS 被发现。
设备会通过提供一个 `_mydevice._tcp.local.` 服务来让自己可被发现。
Home Assistant 会捕获到这个服务，并开始为用户启动一个发现流程。
然后用户将能够确认发现并设置该集成。

`manifest.json`：

```json {2} showLineNumbers
{
  "zeroconf": ["_mydevice._tcp.local."]
}
```

`config_flow.py`：

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

## 附加资源

要了解有关 config flow 的更多信息，请查看[config flow 文档](/developers/core/integration/config_flow.md)。
要了解有关网络协议上的发现更多信息，请查看[网络与发现文档](/developers/network_discovery.md)。
要了解有关蓝牙设备发现的更多信息，请查看[蓝牙文档](/developers/bluetooth.md)。
要了解有关在 manifest 中指定不同发现方法的更多信息，请查看[集成 Manifest 文档](/developers/creating_integration_manifest.md)。

## 例外

此规则的例外情况是，并非每个设备都可以被发现。
对于设备无法被发现的集成，此规则不适用。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
