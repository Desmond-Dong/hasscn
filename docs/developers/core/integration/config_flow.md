---
title: 配置流程
sidebar_label: "配置流程"
---

集成可以通过用户界面进行设置，只需为集成添加对 config flow 的支持以创建 config entry。想要支持 config entry 的集成需要定义一个 Config Flow Handler。该 handler 负责管理从用户输入、discovery 或其他来源（如 Home Assistant OS）创建条目。

Config Flow Handler 控制存储在 config entry 中的数据。这意味着 Home Assistant 启动时无需验证配置是否正确。同时也能防止 breaking changes，因为当版本发生变化时，我们可以将配置条目迁移到新格式。

在实例化 handler 时，Home Assistant 会确保加载所有依赖并安装集成的 requirements。

## 更新 manifest

你需要更新集成的 manifest，以告知 Home Assistant 该集成具有 config flow。做法是将 `config_flow: true` 添加到 manifest 中（[docs](/developers/creating_integration_manifest#config-flow)）。

## 定义你的 config flow

Config entries 使用 [data flow entry framework](/developers/data_entry_flow_index) 来定义它们的 config flows。config flow 需要在集成文件夹的文件 `config_flow.py` 中定义，继承 `homeassistant.config_entries.ConfigFlow`，并在继承 `ConfigFlow` 时传入一个 `domain` 键。

```python
from homeassistant import config_entries
from .const import DOMAIN


class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Example config flow."""
```

更新 manifest 并创建 `config_flow.py` 后，需要运行 `python3 -m script.hassfest`（仅一次），Home Assistant 就会为你的集成激活 config entry。

## Config flow 标题

config flow 的标题可以被集成影响，并按以下优先级顺序确定：

1. 如果 config flow 中的 `title_placeholders` 被设置为非空字典，它将用于动态计算 config flow 的标题。Reauth 和 reconfigure flows 会自动将 `title_placeholders` 设置为 `{"name": config_entry_title}`。
   1. 如果集成提供了本地化的 `flow_title`，将使用它，并从 `title_placeholders` 替换任何翻译占位符。
   2. 如果集成未提供 `flow_title`，但 `title_placeholders` 包含 `name`，则将使用 `name` 作为 flow 的标题。
2. 如果存在，将 flow 标题设置为集成本地化的 `title`。
3. 如果存在，将 flow 标题设置为集成 manifest 的 `name`。
4. 将 flow 标题设置为集成的 domain。

请注意，这个优先级顺序意味着：
- 如果 `title_placeholders` 字典缺失或为空，即使本地化的 `flow_title` 不包含任何占位符，也会被忽略
- 如果 `title_placeholders` 非空，但不存在本地化的 `flow_title` 且 `title_placeholders` 不包含 `name`，则会被忽略

## 定义步骤

你的 config flow 需要定义配置流程的各个步骤。每个步骤由一个唯一的 step name（`step_id`）标识。step 回调方法遵循 `async_step_<step_id>` 的模式。[Data Entry Flow](/developers/data_entry_flow_index) 的文档描述了 step 的不同返回值。以下是一个定义 `user` step 的示例：

```python
import voluptuous as vol

class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    async def async_step_user(self, info):
        if info is not None:
            pass  # TODO: process info

        return self.async_show_form(
            step_id="user", data_schema=vol.Schema({vol.Required("password"): str})
        )
```

有一些 step name 是预留给系统使用的：

| Step name   | Description                                                                                                                                                         |
| ----------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bluetooth`        | 如果集成通过 Bluetooth 被发现，则被调用，如 [使用 manifest 中的 `bluetooth`](/developers/creating_integration_manifest#bluetooth) 所指定的。 |
| `discovery` | _已废弃_ 如果集成被发现且未定义匹配的 step，则被调用。 |
| `dhcp`      | 如果集成通过 DHCP 被发现，则被调用，如 [使用 manifest 中的 `dhcp`](/developers/creating_integration_manifest#dhcp) 所指定的。 |
| `hassio`    | 如果集成通过 Supervisor add-on 被发现，则被调用。 |
| `homekit`   | 如果集成通过 HomeKit 被发现，则被调用，如 [使用 manifest 中的 `homekit`](/developers/creating_integration_manifest#homekit) 所指定的。 |
| `mqtt`      | 如果集成通过 MQTT 被发现，则被调用，如 [使用 manifest 中的 `mqtt`](/developers/creating_integration_manifest#mqtt) 所指定的。 |
| `ssdp`      | 如果集成通过 SSDP/uPnP 被发现，则被调用，如 [使用 manifest 中的 `ssdp`](/developers/creating_integration_manifest#ssdp) 所指定的。 |
| `usb`       | 如果集成通过 USB 被发现，则被调用，如 [使用 manifest 中的 `usb`](/developers/creating_integration_manifest#usb) 所指定的。 |
| `user`      | 当用户通过用户界面发起 flow，或发现时且未定义匹配的 discovery step 时被调用。 |
| `reconfigure`      | 当用户通过用户界面发起 flow 以重新配置现有 config entry 时被调用。 |
| `zeroconf`  | 如果集成通过 Zeroconf/mDNS 被发现，则被调用，如 [使用 manifest 中的 `zeroconf`](/developers/creating_integration_manifest#zeroconf) 所指定的。 |
| `reauth`    | 如果集成指示它[需要重新认证，例如由于凭据过期](#reauthentication)，则被调用。 |
| `import`    | 预留给从 YAML 配置迁移到 config entries。 |

## 唯一标识符（Unique IDs）

config flow 可以附加一个 unique ID（必须是字符串），以避免同一设备被设置两次。unique ID 不需要全局唯一，只需在集成 domain 内唯一即可。

通过设置 unique ID，用户可以选择忽略你的 config entry 的 discovery。这样，他们就不会再被它打扰。
如果集成使用 Bluetooth、DHCP、HomeKit、Zeroconf/mDNS、USB 或 SSDP/uPnP 来发现，则必须提供 unique ID。

如果没有可用的 unique ID，则可以选择省略 `bluetooth`、`dhcp`、`zeroconf`、`hassio`、`homekit`、`ssdp`、`usb` 和 `discovery` steps，即使它们在集成 manifest 中已配置。在这种情况下，当条目被发现时将调用 `user` step。

或者，如果集成不能总是获取到 unique ID（例如，多个设备，有的有、有的没有），则可以使用一个 helper，它仍然允许发现，只要尚未配置该集成的任何实例。

以下是处理 unique ID 并非总是可用的 discovery 的示例：

```python
if device_unique_id:
    await self.async_set_unique_id(device_unique_id)
else:
    await self._async_handle_discovery_without_unique_id()
```

### 在 config flows 中管理 unique IDs

设置 unique ID 后，如果已有另一个 flow 正在处理此 unique ID，则当前 flow 将立即中止。你还可以快速中止——如果此 ID 已有现有 config entry。Config entries 将获得创建它们的 flow 的 unique ID。

在 config flow step 内部调用：

```python
# 为 flow 分配 unique ID，如果另一个具有相同 unique ID 的 flow 正在进行，则中止当前 flow
await self.async_set_unique_id(device_unique_id)

# 如果存在具有相同 unique ID 的 config entry，则中止 flow
self._abort_if_unique_id_configured()
```

如果 config flow 随后中止，`strings.json` 中 `abort` 部分的键 `already_configured` 的文本资源将作为中止原因显示给用户。

```json
{
  "config": {
    "abort": {
      "already_configured": "[%key:common::config_flow::abort::already_configured_device%]"
    }
  }
}
```

### 唯一标识符要求

unique ID 用于将 config entry 与底层设备或 API 匹配。unique ID 必须稳定，不应允许用户更改，且必须是字符串。

Unique ID 可用于在设备访问信息更改时更新 config entry 数据。例如，对于通过本地网络通信的设备，如果由于新的 DHCP 分配导致 IP 地址更改，集成可以使用 Unique ID 通过以下代码片段更新 host：

```
    await self.async_set_unique_id(serial_number)
    self._abort_if_unique_id_configured(updates={CONF_HOST: host, CONF_PORT: port})
```

#### unique ID 的可接受来源示例

- 设备的序列号
- MAC 地址：使用 `homeassistant.helpers.device_registry.format_mac` 格式化；仅从设备 API 或 discovery handler 获取 MAC 地址。依赖读取 arp 缓存或本地网络访问的工具（如 `getmac`）并非在所有受支持的網絡环境中都能正常工作，不可接受。
- 表示纬度和经度或其他唯一地理位置的字符串
- 物理印刷在设备上或烧录到 EEPROM 中的唯一标识符

#### 本地设备的 unique ID 有时可接受的来源

- Hostname：如果 hostname 的子集包含其中一个可接受的来源，则可以使用该部分

#### 云服务有时可接受的 unique ID 来源

- Email Address：必须规范化为小写
- Username：如果用户名不区分大小写，必须规范化为小写
- Account ID：不得有冲突

#### unique ID 的不可接受来源

- IP Address
- Device Name
- Hostname（如果可以被用户更改）
- URL

## 发现步骤

当集成被发现时，会调用相应的 discovery step（如 `async_step_dhcp` 或 `async_step_zeroconf`），并传入发现信息。该 step 需要检查以下内容：

- 确保没有其他此 config flow 的实例正在设置所发现的设备。如果有多种方式可以发现某设备在网络上，就可能发生这种情况。
  - 在大多数情况下，在 flow 上设置 unique ID 并检查是否已有具有相同 unique ID 的 config entry 就足够了，如[在 config flows 中管理 unique IDs](#managing-unique-ids-in-config-flows)部分所述
  - 在某些情况下，无法确定 unique ID，或因为不同发现源可能有不同的计算方式而导致 unique ID 不明确。在这种情况下：
    1. 在 flow 上实现方法 `def is_matching(self, other_flow: Self) -> bool`。
    2. 调用 `hass.config_entries.flow.async_has_matching_flow(self)`。
    3. 然后，你的 flow 的 `is_matching` 方法将对每个其他正在进行的 flow 调用一次。
- 确保设备尚未被设置。
- 调用 discovery step 绝不应导致 flow 完成并产生 config entry。始终需要用户确认。

## 无需身份验证的可发现集成

如果你的集成可以被发现且无需任何身份验证，你将能够使用内置的 Discoverable Flow。此 flow 提供以下功能：

- 在 config flow 完成之前，检测设备/服务是否可以在网络上被发现。
- 支持所有基于 manifest 的 discovery 协议。
- 限制仅 1 个 config entry。发现所有可用设备由 config entry 负责。

要开始使用，运行 `python3 -m script.scaffold config_flow_discovery` 并按照说明操作。这将创建使用 discovery 配置集成所需的所有样板代码。

## 通过 OAuth2 配置

Home Assistant 内置了对提供使用 [OAuth2 authorization framework](https://www.rfc-editor.org/rfc/rfc6749) 进行账户链接的集成的支持。要利用此功能，你需要将 Python API library 组织成允许 Home Assistant 负责刷新 token 的方式。请参阅我们的 [API library guide](/developers/api_lib_index) 了解如何操作。

内置的 OAuth2 支持开箱即用地与使用 [Application Credentials platform](/developers/core/platform/application_credentials) 配置的本地 client ID / secret 配合使用，并与 Home Assistant Cloud Account Linking 服务配合使用。此服务允许用户将其账户与集中管理的 client ID/secret 链接。如果你希望你的集成成为此服务的一部分，请通过 [partner@openhomefoundation.org](mailto:partner@openhomefoundation.org) 联系我们。

要开始使用，运行 `python3 -m script.scaffold config_flow_oauth2` 并按照说明操作。这将创建使用 OAuth2 配置集成所需的所有样板代码。

## 翻译

[config flow](/developers/internationalization/core#config--options--subentry-flows) handlers 的 translations 在集成翻译文件 `strings.json` 的 `config` 键下定义。以 Hue 集成为例：

```json
{
  "title": "Philips Hue Bridge",
  "config": {
    "step": {
      "init": {
        "title": "Pick Hue bridge",
        "data": {
          "host": "Host"
        }
      },
      "link": {
        "title": "Link Hub",
        "description": "Press the button on the bridge to register Philips Hue with Home Assistant.\n\n![Location of button on bridge](/static/images/config_philips_hue.jpg)"
      }
    },
    "error": {
      "register_failed": "Failed to register, please try again",
      "linking": "Unknown linking error occurred."
    },
    "abort": {
      "discover_timeout": "Unable to discover Hue bridges",
      "no_bridges": "No Philips Hue bridges discovered",
      "all_configured": "All Philips Hue bridges are already configured",
      "unknown": "Unknown error occurred",
      "cannot_connect": "Unable to connect to the bridge",
      "already_configured": "Bridge is already configured"
    }
  }
}
```

当 translations 合并到 Home Assistant 后，它们将自动上传到 [Lokalise](https://lokalise.com/)，翻译团队将帮助将其翻译为其他语言。在本地开发时，需要运行 `python3 -m script.translations develop` 以查看对 `strings.json` 所做的更改。[更多信息请参阅翻译 Home Assistant。](/developers/translations)

## Config entry 迁移

每个 config entry 都有一个分配给它的 version，由 major 和 minor version 组成。这是为了能够在 config entry schema 更改时将 config entry 数据迁移到新格式。如果未在 config flow 中显式设置，`VERSION` 和 `MINOR_VERSION` 都默认为 `1`，因此集成只有在实现 migration 时才需要设置它们。

migration 可以通过在集成的 `__init__.py` 文件中实现函数 `async_migrate_entry` 来以编程方式处理。如果 migration 成功，该函数应返回 `True`。

如果 minor versions 不同但 major versions 相同，即使集成未实现 `async_migrate_entry`，也允许集成设置继续。这意味着 minor version bump 是向后兼容的，而 major version bump 则不然，如果用户在没有从备份恢复配置的情况下降级 Home Assistant Core，会导致集成设置失败。

要设置新 version，将 `VERSION` 和/或 `MINOR_VERSION` 添加到 config flow 类：

```python
class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Example config flow."""

    VERSION = 2
    MINOR_VERSION = 2
```

```python
# Example migration function
async def async_migrate_entry(hass, config_entry: ConfigEntry):
    """Migrate old entry."""
    _LOGGER.debug("Migrating configuration from version %s.%s", config_entry.version, config_entry.minor_version)

    if config_entry.version == 1:

        new_data = {**config_entry.data}
        if config_entry.minor_version < 2:
            # TODO: modify Config Entry data with changes in version 1.2
            pass
        if config_entry.minor_version < 3:
            # TODO: modify Config Entry data with changes in version 1.3
            pass

        hass.config_entries.async_update_entry(
            config_entry, data=new_data, minor_version=3, version=1
        )

    _LOGGER.debug("Migration to configuration version %s.%s successful", config_entry.version, config_entry.minor_version)

    return True
```

## 重新配置

config entry 可以通过添加 `reconfigure` step 来允许重新配置。这为集成提供了一种方式，使用户能够更改 config entry 数据，而无需为实现不打算作为可选的 setup 数据的 `OptionsFlow`。

这不是用来处理身份验证问题或对其进行重新配置的。为此我们有 [`reauth`](#reauthentication) step，应该在认证出现问题时自动启动。

```python
import voluptuous as vol

class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Example integration."""

    async def async_step_reconfigure(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            # TODO: process user input
            await self.async_set_unique_id(user_id)
            self._abort_if_unique_id_mismatch()
            return self.async_update_reload_and_abort(
                self._get_reconfigure_entry(),
                data_updates=data,
            )

        return self.async_show_form(
            step_id="reconfigure",
            data_schema=vol.Schema({vol.Required("input_parameter"): str}),
        )
```

成功后，reconfiguration flows 预期更新当前条目并中止；它们不应创建新条目。
这通常使用 `return self.async_update_reload_and_abort` helper 完成。
自动化测试应验证 reconfigure flow 更新现有 config entry 且不创建额外条目。

检查是否处于 reconfigure flow 可以使用 `if self.source == SOURCE_RECONFIGURE`。
也可以使用 `self._get_reconfigure_entry()` 访问对应的 config entry。
确保 `unique_id` 未更改应使用 `await self.async_set_unique_id` 后跟 `self._abort_if_unique_id_mismatch()`。


## 重新认证

优雅地处理认证错误（如无效、过期或撤销的 token）是在 [Integration Quality Scale](/developers/core/integration-quality-scale) 上进步所必需的。以下是如何为 `script.scaffold` 创建的 OAuth flow 添加 reauth 的示例，遵循 [Building a Python library](/developers/api_lib_auth#oauth2) 中的模式。如果你正在查找如何触发 reauthentication flow，请参阅 [handling expired credentials](/developers/integration_setup_failures#handling-expired-credentials)。

此示例捕获 `__init__.py` 中 config entry setup 的认证异常，并指示用户访问集成页面以重新配置集成。

要允许用户更改非可选的 config entry 数据（`OptionsFlow`），并且与认证无直接关系的数据（例如更改的 host name），集成应实现 [`reconfigure`](#reconfigure) step。

```python

from homeassistant.config_entries import SOURCE_REAUTH, ConfigEntry
from homeassistant.core import HomeAssistant
from . import api

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up a config entry."""

    # TODO: Replace with actual API setup and exception
    auth = api.AsyncConfigEntryAuth(...)
    try:
        await auth.refresh_tokens()
    except TokenExpiredError as err:
        raise ConfigEntryAuthFailed(err) from err

    # TODO: Proceed with integration setup
```

`config_flow.py` 中的 flow handler 还需要一些额外的步骤来支持 reauth，包括显示确认、启动 reauth flow、更新现有 config entry 以及重新加载以再次调用 setup。

```python

class OAuth2FlowHandler(
    config_entry_oauth2_flow.AbstractOAuth2FlowHandler, domain=DOMAIN
):
    """Config flow to handle OAuth2 authentication."""

    async def async_step_reauth(
        self, entry_data: Mapping[str, Any]
    ) -> ConfigFlowResult:
        """Perform reauth upon an API authentication error."""
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Dialog that informs the user that reauth is required."""
        if user_input is None:
            return self.async_show_form(
                step_id="reauth_confirm",
                data_schema=vol.Schema({}),
            )
        return await self.async_step_user()

    async def async_oauth_create_entry(self, data: dict) -> dict:
        """Create an oauth config entry or update existing entry for reauth."""
        await self.async_set_unique_id(user_id)
        if self.source == SOURCE_REAUTH:
            self._abort_if_unique_id_mismatch()
            return self.async_update_reload_and_abort(
                self._get_reauth_entry(),
                data_updates=data,
            )
        self._abort_if_unique_id_configured()
        return await super().async_oauth_create_entry(data)
```

默认情况下，`async_update_reload_and_abort` helper 方法在更新和重新加载后以 `reauth_successful` 中止 flow。默认情况下，entry 将始终被重新加载。如果仅应在 config entry 已更新时重新加载 config entry，请指定 `reload_even_if_entry_is_unchanged=False`。

根据集成的细节，可能还有额外的注意事项，例如确保 reauth 时使用的是同一账户，或处理多个 config entries。

reauth 确认对话框需要在 `strings.json` 中为 reauth 确认和成功对话框添加额外的定义：

```json
{
  "config": {
    "step": {
      "reauth_confirm": {
        "title": "[%key:common::config_flow::title::reauth%]",
        # TODO: Replace with the name of the integration
        "description": "The Example integration needs to re-authenticate your account"
      }
    },
    "abort": {
      "reauth_successful": "[%key:common::config_flow::abort::reauth_successful%]"
    },
}
```

请参阅 [Translations](#translations) 的本地开发说明。

认证失败（如撤销的 oauth token）可能比较难以手动测试。一个建议是复制 `config/.storage/core.config_entries`，并根据你想要测试的场景手动更改 `access_token`、`refresh_token` 和 `expires_at` 的值。然后可以逐步推进 reauth flow，确认值被替换为新的有效 token。

成功后，reauth flows 预期更新当前条目并中止；它们不应创建新条目。
这通常使用 `return self.async_update_reload_and_abort` helper 完成。
自动化测试应验证 reauth flow 更新现有 config entry 且不创建额外条目。

检查是否处于 reauth flow 可以使用 `if self.source == SOURCE_REAUTH`。
也可以使用 `self._get_reauth_entry()` 访问对应的 config entry。
确保 `unique_id` 未更改应使用 `await self.async_set_unique_id` 后跟 `self._abort_if_unique_id_mismatch()`。


## 子条目流

集成可以实现 subentry flows，以允许用户添加（并可选地重新配置）subentries。一个示例是提供天气预报的集成，其中 config entry 存储认证详细信息，而每个需要天气预报的位置则存储为 subentry。

Subentry flows 类似于 config flows，只是 subentry flows 不支持 reauthentication 或 discovery；subentry flow 只能通过 `user` 或 `reconfigure` steps 启动。

```python
class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Example integration."""

    ...

    @classmethod
    @callback
    def async_get_supported_subentry_types(
        cls, config_entry: ConfigEntry
    ) -> dict[str, type[ConfigSubentryFlow]]:
        """Return subentries supported by this integration."""
        return {"location": LocationSubentryFlowHandler}

class LocationSubentryFlowHandler(ConfigSubentryFlow):
    """Handle subentry flow for adding and modifying a location."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """User flow to add a new location."""
        ...
```

### Subentry 唯一标识符

Subentries 可以设置 unique ID。规则与 config entries 的 [unique IDs](#unique-ids) 类似，只是 subentry unique IDs 只需在 config entry 内唯一。

### Subentry 翻译

[subentry flow](/developers/internationalization/core#config--options--subentry-flows) handlers 的 translations 在集成翻译文件 `strings.json` 的 `config_subentries` 键下定义，例如：

```json
{
  "config_subentries": {
    "location": {
      "title": "Weather location",
      "step": {
        "user": {
          "title": "Add location",
          "description": "Configure the weather location"
        },
        "reconfigure": {
          "title": "Update location",
          "description": "..."
        }
      },
      "error": {
      },
      "abort": {
      }
    }
  }
}
```

### Subentry 重新配置

Subentries 可以被重新配置，类似于 [config entries 可以被重新配置](#reconfigure) 的方式。要为 subentry flow 添加 reconfigure 支持，请实现一个 `reconfigure` step。

```python
class LocationSubentryFlowHandler(ConfigSubentryFlow):
    """Handle subentry flow for adding and modifying a location."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """User flow to add a new location."""
        ...

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """User flow to modify an existing location."""
        # 检索父 config entry 作为引用
        config_entry = self._get_entry()
        # 检索要更新的目标 subentry
        config_subentry = self._get_reconfigure_subentry()
        ...

```

## 继续另一个 flow

config flow 可以启动另一个 config flow，并告知 frontend 当第一个 flow 完成后应显示另一个 flow。为此，第一个 flow 需要将 `next_flow` 参数传递给 `async_create_entry` 方法。参数应为形式为 `(flow_type, flow_id)` 的元组。

```python
from homeassistant.config_entries import SOURCE_USER, ConfigFlow, FlowType


class ExampleFlow(ConfigFlow):
    """Example flow."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Show create entry with next_flow parameter."""
        result = await self.hass.config_entries.flow.async_init(
            "another_integration_domain",
            context={"source": SOURCE_USER},
        )
        return self.async_create_entry(
            title="Example",
            data={},
            next_flow=(FlowType.CONFIG_FLOW, result["flow_id"]),
        )
```

### 使用 async_on_create_entry

`async_on_create_entry` 提供了一个选项，用于在 config entry 创建并 flow 最终确定后修改最终的 `ConfigFlowResult`。

由于 subentry flows 和 option flows 依赖于 main config entry 存在后才能启动，这些 flow 类型只能与 config flow 中的 `async_on_create_entry()` 方法一起使用：

```python
from homeassistant.config_entries import (
    ConfigFlow,
    FlowType,
    SOURCE_USER,
    SubentryFlowContext,
)


class ExampleFlow(ConfigFlow):
    """Example flow."""

    async def async_on_create_entry(
        self, result: ConfigFlowResult
    ) -> ConfigFlowResult:
        """Create subentry flow after creating the main entry."""
        subentry_result = await self.hass.config_entries.subentries.async_init(
            (result["result"].entry_id, "subentry_type"),
            context=SubentryFlowContext(source=SOURCE_USER),
        )
        result["next_flow"] = (
            FlowType.CONFIG_SUBENTRIES_FLOW,
            subentry_result["flow_id"],
        )
        return result

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create entry."""
        return self.async_create_entry(
            title="Example",
            data={},
        )
```

## 使用 SchemaConfigFlowHandler 处理简单 flows

对于 helper 和具有简单 config flows 的集成，你可以改用 `SchemaConfigFlowHandler`。

与使用完整的 config flow 相比，`SchemaConfigFlowHandler` 有一些限制需要注意：

- 所有用户输入都保存在结果 config entry 的 `options` 字典中。因此，它不适合在需要连接数据、api key 或其他应存储在 config entry `data` 中的信息的集成中使用。
- 如果你有大量的验证、设置 unique id 或检查重复 config entries，使用普通的 config flow handler 可能更简单。
- 不建议使用 `user` 和 `import` 以外的其他 steps 来启动 flow。

```python

from homeassistant.helpers.schema_config_entry_flow import (
    SchemaCommonFlowHandler,
    SchemaConfigFlowHandler,
    SchemaFlowError,
    SchemaFlowFormStep,
)

async def validate_setup(
    handler: SchemaCommonFlowHandler, user_input: dict[str, Any]
) -> dict[str, Any]:
    """Validate options."""
    if user_input[CONF_SOME_SETTING] == "error":
      # 'setup_error' 需要在 string.json 的 config errors 部分中存在
      raise SchemaFlowError("setup_error")
    return user_input

DATA_SCHEMA_SETUP = vol.Schema(
    {
        vol.Required(CONF_NAME, default=DEFAULT_NAME): TextSelector()
    }
)
DATA_SCHEMA_OPTIONS = vol.Schema(
    {
        vol.Optional(CONF_SOME_SETTING): TextSelector()
    }
)

CONFIG_FLOW = {
    "user": SchemaFlowFormStep(
        schema=DATA_SCHEMA_SETUP,
        next_step="options",
    ),
    "options": SchemaFlowFormStep(
        schema=DATA_SCHEMA_OPTIONS,
        validate_user_input=validate_setup,
    ),
}
OPTIONS_FLOW = {
    "init": SchemaFlowFormStep(
        DATA_SCHEMA_OPTIONS,
        validate_user_input=validate_setup,
    ),
}

class MyConfigFlowHandler(SchemaConfigFlowHandler, domain=DOMAIN):
    """Handle a config flow."""

    config_flow = CONFIG_FLOW
    options_flow = OPTIONS_FLOW
    options_flow_reloads = True # Reload without a config entry listener

    def async_config_entry_title(self, options: Mapping[str, Any]) -> str:
        """Return config entry title from input."""
        return cast(str, options[CONF_NAME])

```

## 测试你的 config flow

具有 config flow 的集成需要 `config_flow.py` 中所有代码的完整测试覆盖才能被纳入 core。[测试你的代码](/developers/development_testing#running-a-limited-test-suite) 包含更多有关如何生成 coverage 报告的细节。
