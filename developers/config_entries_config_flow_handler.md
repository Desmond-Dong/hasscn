# 配置流

通过支持配置流来创建配置条目后，集成就可以通过用户界面完成设置。要支持配置流，集成需要定义一个配置流处理程序。该处理程序负责根据用户输入、自动发现或其他来源（例如 Home Assistant OS）创建条目。

流处理程序控制存储在配置条目中的数据。这意味着 Home Assistant 在启动时可以验证配置是否有效，也便于在版本变更时将配置迁移到新格式。

实例化处理程序时，Home Assistant 会确保加载所有依赖项，并安装集成的 requirements。

## 更新清单

您需要更新集成清单，告知 Home Assistant 该集成支持配置流。做法是在清单中添加 `config_flow: true`（[文档](/developers/creating_integration_manifest.md#config-flow)）。

## 定义配置流

配置条目基于 [Data Entry Flow 框架](/developers/data_entry_flow_index.md)。配置流需要在集成目录中的 `config_flow.py` 文件里定义，继承 `homeassistant.config_entries.ConfigFlow`，并在类定义中提供 `domain`。

```python
from homeassistant import config_entries
from .const import DOMAIN


class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Example config flow."""
```

更新清单并创建 `config_flow.py` 后，您需要为 Home Assistant 仅运行一次 `python3 -m script.hassfest`，以激活集成的配置条目支持。

## 配置流标题

配置流标题会按以下优先顺序确定：

1. 如果配置流中的 `title_placeholders` 被设置为非空字典，则用于动态计算标题。重新验证流和重新配置流会自动将 `title_placeholders` 设为 `{"name": config_entry_title}`。
   1. 如果集成提供了本地化的 `flow_title`，则使用该 `flow_title`，并替换其中的翻译占位符。
   2. 如果集成未提供 `flow_title`，但 `title_placeholders` 包含 `name`，则使用 `name` 作为流标题。
2. 使用集成本地化的 `title`（如果存在）。
3. 使用集成清单中的 `name`（如果存在）。
4. 使用集成的域名。

请注意，这个优先级意味着：

* 如果 `title_placeholders` 缺失或为空，即使本地化的 `flow_title` 不包含任何占位符，也会被忽略。
* 如果 `title_placeholders` 非空，但既没有本地化的 `flow_title`，又不包含 `name`，则不会生成自定义标题。

## 定义步骤

配置流需要定义若干步骤。每个步骤都由唯一的步骤名称（`step_id`）标识。步骤回调方法遵循 `async_step_<step_id>` 的命名模式。[Data Entry Flow 文档](/developers/data_entry_flow_index.md)介绍了每种步骤返回值。下面是定义 `user` 步骤的示例：

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

以下步骤名称保留给系统使用：

|步骤名称|描述|
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|`bluetooth`|如果您的集成已在清单中声明 Bluetooth 发现，则调用此步骤。参见[在清单中使用 `bluetooth`](/developers/creating_integration_manifest.md#bluetooth)。|
|`discovery`|*已弃用*。如果您的集成通过旧版 discovery 机制被发现且未定义更具体的步骤，则调用。|
|`dhcp`|如果您的集成已在清单中声明 DHCP 发现，则调用此步骤。参见[在清单中使用 `dhcp`](/developers/creating_integration_manifest.md#dhcp)。|
|`hassio`|如果您的集成是通过 Supervisor add-on 被发现的，则调用此步骤。|
|`homekit`|如果您的集成已在清单中声明 HomeKit 发现，则调用此步骤。参见[在清单中使用 `homekit`](/developers/creating_integration_manifest.md#homekit)。|
|`mqtt`|如果您的集成已在清单中声明 MQTT 发现，则调用此步骤。参见[在清单中使用 `mqtt`](/developers/creating_integration_manifest.md#mqtt)。|
|`ssdp`|如果您的集成已在清单中声明 SSDP/uPnP 发现，则调用此步骤。参见[在清单中使用 `ssdp`](/developers/creating_integration_manifest.md#ssdp)。|
|`usb`|如果您的集成已在清单中声明 USB 发现，则调用此步骤。参见[在清单中使用 `usb`](/developers/creating_integration_manifest.md#usb)。|
|`user`|当用户通过界面启动流程，或设备被发现但没有定义匹配的发现步骤时调用。|
|`reconfigure`|当用户通过界面启动现有配置条目的重新配置流程时调用。|
|`zeroconf`|如果您的集成已在清单中声明 Zeroconf/mDNS 发现，则调用此步骤。参见[在清单中使用 `zeroconf`](/developers/creating_integration_manifest.md#zeroconf)。|
|`reauth`|如果您的集成指示需要重新验证，例如凭证过期，则调用此步骤。参见[重新认证](#reauthentication)。|
|`import`|保留用于从 YAML 配置迁移到配置条目。|

## 唯一 ID

配置流可以附加一个唯一 ID（必须是字符串），以防止同一设备被重复配置。唯一 ID 不需要全局唯一，只需在该集成域内唯一即可。

借助唯一 ID，用户还可以忽略由发现触发的配置流，这样系统就不会反复提示他们配置同一设备。
如果集成通过 Bluetooth、DHCP、HomeKit、Zeroconf/mDNS、USB 或 SSDP/uPnP 进行发现，则提供唯一 ID 是 required。

如果无法获得唯一 ID，则可以省略 `bluetooth`、`dhcp`、`zeroconf`、`hassio`、`homekit`、`ssdp`、`usb` 和 `discovery` 步骤，即使它们已在集成清单中声明。在这种情况下，当发现设备时会调用 `user` 步骤。

另一种情况是：集成始终无法获取唯一 ID，或者只能在部分设备上获取（例如多个设备中有的有、有的没有）。此时可以使用辅助方法，只要该集成尚未配置任何实例，仍允许继续发现流程。

以下示例展示了在唯一 ID 并不总是可用时如何处理发现：

```python
if device_unique_id:
    await self.async_set_unique_id(device_unique_id)
else:
    await self._async_handle_discovery_without_unique_id()
```

### 管理配置流中的唯一 ID

设置唯一 ID 后，如果已有另一个流程正在使用该唯一 ID，则当前流程会立即中止。如果该唯一 ID 对应的配置条目已经存在，您也可以直接中止。配置条目会继承创建它的流程的唯一 ID。

在配置流步骤中调用：

```python
# Assign a unique ID to the flow and abort the flow
# if another flow with the same unique ID is in progress
await self.async_set_unique_id(device_unique_id)

# Abort the flow if a config entry with the same unique ID exists
self._abort_if_unique_id_configured()
```

如果配置流随后中止，界面会向用户显示 `strings.json` 中 `abort` 部分里 `already_configured` 对应的文本资源作为中止原因。

```json
{
  "config": {
    "abort": {
      "already_configured": "[%key:common::config_flow::abort::already_configured_device%]"
    }
  }
}
```

### 唯一 ID 的要求

唯一 ID 用于将配置条目与底层设备或 API 对应起来。唯一 ID 必须稳定、不可由用户修改，并且必须是字符串。

当设备的访问细节发生变化时，唯一 ID 也可用于更新配置条目数据。例如，对于通过本地网络通信的设备，如果 IP 地址因新的 DHCP 分配而变化，集成可以用唯一 ID 通过下面的代码片段更新主机：

```
    await self.async_set_unique_id(serial_number)
    self._abort_if_unique_id_configured(updates={CONF_HOST: host, CONF_PORT: port})
```

#### 唯一 ID 的来源示例

* 设备的序列号
* MAC 地址：使用 `homeassistant.helpers.device_registry.format_mac` 格式化；仅从设备 API 或发现处理程序中获取 MAC 地址。依赖读取 ARP 缓存或本地网络探测工具（例如 `getmac`）的方法无法在所有受支持的网络环境中稳定工作。
* 表示纬度和经度，或其他唯一地理位置的字符串
* 设备外壳上印刷、或写入 EEPROM 的唯一标识符

#### 有时可作为本地设备唯一 ID 的来源

* 主机名：如果主机名中包含上述可接受来源的一部分，可以使用该部分

#### 有时可作为云服务唯一 ID 的来源

* 电子邮件地址：必须标准化为小写
* 用户名：如果用户名不区分大小写，则必须标准化为小写
* 账户 ID：不能发生冲突

#### 不能作为唯一 ID 的来源

* IP 地址
* 设备名称
* 主机名（如果用户可更改）
* URL

## 发现步骤

当集成被发现时，会使用发现信息调用对应的发现步骤（例如 `async_step_dhcp` 或 `async_step_zeroconf`）。该步骤必须检查以下内容：

* 确保在处理当前发现设备时，没有其他相同配置流实例正在进行。如果设备可能通过多种方式在网络中被发现，就可能发生这种情况。
  * 在大多数情况下，在流程中设置唯一 ID，并检查是否已经存在具有相同唯一 ID 的配置条目即可。参见[管理配置流中的唯一 ID](#managing-unique-ids-in-config-flows)。
  * 在某些情况下，无法确定唯一 ID，或者不同发现源会以不同方式计算唯一 ID，导致唯一 ID 不明确。此时：

1. 在流程中实现 `def is_matching(self, other_flow: Self) -> bool` 方法。
2. 调用 `hass.config_entries.flow.async_has_matching_flow(self)`。
3. 系统随后会针对每个候选流程调用一次您的 `is_matching` 方法。

* 确保设备尚未配置。
* 调用发现步骤绝不能直接完成流程并创建配置条目，始终需要用户确认。

## 可发现但无需认证的集成

如果您的集成可以在无需任何身份验证的情况下被发现，则可以使用 built-in 的发现流程。该流程具有以下特点：

* 在完成配置流程前，先检测网络上是否能发现设备或服务。
* 支持所有基于清单的发现协议。
* 仅支持 1 个配置条目，由该配置条目负责发现所有可用设备。

首先，运行 `python3 -m script.scaffold config_flow_discovery` 并按提示操作。这会生成使用发现流程配置集成所需的全部样板代码。

## 通过 OAuth2 配置

Home Assistant 对使用 [OAuth2 授权框架](https://www.rfc-editor.org/rfc/rfc6749)进行账户关联的集成提供 built-in 支持。要使用这套机制，您需要以支持 Home Assistant 管理刷新令牌的方式构建 Python API 库。可参考我们的 [API 库指南](/developers/api_lib_index.md)。

built-in OAuth2 支持可直接与本地配置的客户端 ID/密钥（通过[应用凭证平台](/developers/core/platform/application_credentials.md)）以及 Home Assistant Cloud 账户关联服务一起使用。该服务允许用户将自己的账户与集中管理的客户端 ID/secret 关联。如果您希望集成加入这项服务，请通过 <partner@openhomefoundation.org> 联系我们。

首先，运行 `python3 -m script.scaffold config_flow_oauth2` 并按提示操作。这会生成通过 OAuth2 配置集成所需的全部样板代码。

## 翻译

[配置流翻译](/developers/internationalization/core.md#config--options--subentry-flows)定义在集成翻译文件 `strings.json` 的 `config` 键下。下面是 Hue 集成的示例：

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
        "description": "Press the button on the bridge to register Philips Hue with Home Assistant.\n\n![Location of button on bridge](/developers/static/images/config_philips_hue.jpg)"
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

当翻译合并到 Home Assistant 后，它们会自动上传到 [Lokalise](https://lokalise.co/)，翻译团队会协助将其翻译成其他语言。在本地开发时，您需要运行 `python3 -m script.translations develop`，才能看到对 `strings.json` 所做的修改。更多信息请参见[翻译文档](/developers/translations.md)。

## 配置条目迁移

每个配置条目都带有一个版本号，由主版本和次版本组成。这样一来，当配置条目结构发生变化时，就可以将已有数据迁移到新格式。如果没有在配置流中显式设置，`VERSION` 和 `MINOR_VERSION` 默认都为 `1`，因此通常只需在实现迁移时再设置它们。

可以在集成的 `__init__.py` 中实现 `async_migrate_entry` 函数，以编程方式处理迁移。如果迁移成功，该函数应返回 `True`。

如果只有次版本不同，而集成未实现 `async_migrate_entry`，集成仍会继续设置。这意味着次版本升级被视为向后兼容；而主版本升级不同，如果用户把 Home Assistant Core 降级，且没有从备份恢复配置，则集成设置可能失败。

要设置新版本，可将 `VERSION` 和/或 `MINOR_VERSION` 添加到配置流类中：

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

    if config_entry.version > 1:
        # This means the user has downgraded from a future version
        return False

    if config_entry.version == 1:

        new_data = {**config_entry.data}
        if config_entry.minor_version < 2:
            # TODO: modify Config Entry data with changes in version 1.2
            pass
        if config_entry.minor_version < 3:
            # TODO: modify Config Entry data with changes in version 1.3
            pass

        hass.config_entries.async_update_entry(config_entry, data=new_data, minor_version=3, version=1)

    _LOGGER.debug("Migration to configuration version %s.%s successful", config_entry.version, config_entry.minor_version)

    return True
```

## 重新配置

配置条目可以通过添加 `reconfigure` 步骤来支持重新配置。这为集成提供了一种让用户修改配置条目数据的方法，而无需通过 `OptionsFlow` 去修改选项数据。

重新配置并不是为了解决身份验证问题。对于这类情况，应实现 [`reauth`](#reauthentication) 步骤，以便在身份验证出现问题时自动启动。

```python
import voluptuous as vol

class ExampleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Example integration."""

    async def async_step_reconfigure(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            # TODO: process user input
            self.async_set_unique_id(user_id)
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

成功后，重新配置流程应更新当前条目并中止，而不是创建新条目。
通常会通过 `return self.async_update_reload_and_abort(...)` 辅助方法实现。
自动化测试应验证重新配置流程会更新已有配置条目，且不会创建额外条目。

可以使用 `if self.source == SOURCE_RECONFIGURE` 判断当前是否处于重新配置流程。
也可以使用 `self._get_reconfigure_entry()` 访问对应的配置条目。
要确保 `unique_id` 未发生变化，应先调用 `await self.async_set_unique_id(...)`，再调用 `self._abort_if_unique_id_mismatch()`。

## 重新认证

为满足[集成质量等级](/developers/core/integration-quality-scale.md)要求，需要妥善处理身份验证错误，例如令牌无效、过期或被撤销。下面的示例展示了如何将重新验证添加到通过 `script.scaffold` 生成的 OAuth 流程中，并遵循 [Building Python libraries](/developers/api_lib_auth.md#oauth2) 中的模式。
如果您想了解如何触发重新认证流程，请参见[处理过期凭证](/developers/integration_setup_failures.md#handling-expired-credentials)。

此示例在 `__init__.py` 的配置条目设置过程中捕获身份验证异常，并提示用户前往集成页面重新完成认证。

若要让用户修改与身份验证无直接关系、且不适合作为 `OptionsFlow` 的配置数据（例如主机名变更），集成应实现 [`reconfigure`](#reconfigure) 步骤。

```python

from homeassistant.config_entries import SOURCE_REAUTH, ConfigEntry
from homeassistant.core import HomeAssistant
from . import api

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Setup up a config entry."""

    # TODO: Replace with actual API setup and exception
    auth = api.AsyncConfigEntryAuth(...)
    try:
        await auth.refresh_tokens()
    except TokenExpiredError as err:
        raise ConfigEntryAuthFailed(err) from err

    # TODO: Proceed with integration setup
```

`config_flow.py` 中的流程处理程序还需要一些额外步骤来支持重新验证，包括再次显示确认界面、启动重新验证流程、更新现有配置条目，以及重新加载并再次执行设置。

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
        self.async_set_unique_id(user_id)
        if self.source == SOURCE_REAUTH:
            self._abort_if_unique_id_mismatch()
            return self.async_update_reload_and_abort(
                self._get_reauth_entry(),
                data_updates=data,
            )
        self._abort_if_unique_id_configured()
        return await super().async_oauth_create_entry(data)
```

默认情况下，`async_update_reload_and_abort` 辅助方法会在更新并重新加载后，以 `reauth_successful` 中止流程。默认行为始终会重新加载该条目。如果仅希望在配置条目发生变化时才重新加载，请指定 `reload_even_if_entry_is_unchanged=False`。

根据集成的具体情况，可能还需要额外处理，例如确保重新验证前后使用的是同一个账户，或支持多个配置条目。

重新验证确认对话框需要在 `strings.json` 中补充定义重新验证确认和成功对话框：

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

本地开发说明可参见[翻译](#translations)。

手动测试身份验证失败（例如撤销的 OAuth 令牌）可能较为麻烦。一个常见做法是复制 `config/.storage/core.config_entries`，然后根据要测试的场景，手动修改 `access_token`、`refresh_token` 和 `expires_at` 的值。之后即可提前触发重新验证流程，并确认这些值是否被新的有效令牌替换。

成功后，重新验证流程应更新当前条目并中止，而不是创建新条目。
通常会通过 `return self.async_update_reload_and_abort(...)` 辅助方法实现。
自动化测试应验证重新验证流程会更新已有配置条目，且不会创建额外条目。

可以使用 `if self.source == SOURCE_REAUTH` 判断当前是否处于重新验证流程。
也可以使用 `self._get_reauth_entry()` 访问对应的配置条目。
要确保 `unique_id` 未发生变化，应先调用 `await self.async_set_unique_id(...)`，再调用 `self._abort_if_unique_id_mismatch()`。

## 子条目流程

集成可以实现子条目流程，让用户添加并可选择重新配置子条目。一个示例是天气预报集成：配置条目存储身份验证信息，而每个需要提供天气预报的位置则存储为子条目。

子条目流程与配置流类似，但不支持重新认证或发现；它只能通过 `user` 或 `reconfigure` 步骤启动。

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

### 子条目唯一 ID

子条目也可以设置唯一 ID。规则与[唯一 ID](#unique-ids)中的配置条目唯一 ID 类似，但子条目唯一 ID 只需要在其所属配置条目内部唯一。

### 子条目翻译

[子条目流程翻译](/developers/internationalization/core.md#config--options--subentry-flows)定义在集成翻译文件 `strings.json` 的 `config_subentries` 键下，例如：

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

### 子条目重新配置

子条目也可以重新配置，方式与[配置条目重新配置](#reconfigure)类似。要为子条目流程添加重新配置支持，请实现 `reconfigure` 步骤。

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
        # Retrieve the parent config entry for reference.
        config_entry = self._get_entry()
        # Retrieve the specific subentry targeted for update.
        config_subentry = self._get_reconfigure_subentry()
        ...

```

## 在另一个流程中继续

配置流可以启动另一个配置流，并告知前端在第一个流程完成后继续显示另一个流程。因此，第一个流程需要把 `next_flow` 参数传给 `async_create_entry` 方法。该参数应为 `(flow_type, flow_id)` 形式的元组。

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

## 使用 SchemaConfigFlowHandler 处理简单流程

对于仅包含简单配置流的助手或集成，您可以改用 `SchemaConfigFlowHandler`。

与完整配置流相比，`SchemaConfigFlowHandler` 有一些需要注意的限制：

* 所有用户输入都会保存在生成出的配置条目的 `options` 字典中。因此，它不适用于需要在配置条目 `data` 中保存连接信息、API 密钥或其他核心配置数据的集成。
* 如果您需要进行复杂验证、设置唯一 ID 或检查重复配置条目，通常直接使用普通配置流处理程序会更简单。
* 不建议使用 `user` 和 `import` 之外的步骤来启动流程。

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
      # 'setup_error' needs to be existing in string.json config errors section
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

## 测试配置流

若要让集成被 Core 接受，与配置流相关的 `config_flow.py` 中所有代码都需要具备完整测试覆盖率。[测试你的代码](/developers/development_testing.md#running-a-limited-test-suite)中提供了更多关于如何生成覆盖率报告的说明。
