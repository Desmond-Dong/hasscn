Deprecation 是预定在未来执行的 breaking change：旧行为仍然有效，所有受影响者都会收到警告，而真正的移除发生在之后的某个 release 中。

任何移除都必须先经过 deprecation。即使你认为只影响少数用户也是如此，因为一个 entity、action 或 constant 可能从我们看不到的 automations、scripts 和 dashboards 中被引用。

| Who is affected | Minimum period |
| --- | --- |
| 用户（YAML configuration、actions、entities、attributes、integrations） | 6 个月 |
| 开发者（constants、helpers、entity properties、custom integrations 使用的 platform APIs） | 12 个月 |

如果生态系统尚未跟上，deprecation 期限可以延长，但绝不会缩短。请使用 [calendar version format](/developers/versioning.md) 格式，将移除发生的 release 声明为 `breaks_in_ha_version`。

在旧行为仍然有效时，使用 `IssueSeverity.WARNING`；只有当它已停止工作（因为 integration 已被移除或 migration 失败，用户的 configuration 已不再生效）时，才使用 `IssueSeverity.ERROR`。对于无法触发 repair issue 的 developer-facing features 移除，log levels 同样遵循这一划分。

## 面向用户的 deprecations

每个需要用户介入的 deprecation 都会对应一个 [repair issue](/developers/core/platform/repairs.md)。当 integration 可以被多次设置时，应按 config entry 范围来设定 `issue_id`，否则 issues 会发生冲突。Deprecation 期限结束后，创建一个后续的 pull request，移除 repair issue 和旧行为。

在你自己的 domain 下注册的每个 issue，都需要在 integration 的 [`strings.json`](/developers/internationalization/core.md) 中有匹配的 `issues.<translation_key>` 条目。注册在 `HOMEASSISTANT_DOMAIN` 下的 issues（如 `deprecated_yaml`）会重用已经存在于 core 中的文本，本地无需额外定义。

### 移除整个 integration 的 YAML 支持

要为整个 integration 移除 YAML 支持，请为 integration 添加一个 [config flow](/developers/core/integration/config_flow.md) 和一个 import flow，并使用 `integration_title` 和 `domain` placeholders 触发 core 的 `deprecated_yaml` repair issue。由于该 issue 文本存在于 `homeassistant` domain 中，请使用 `HOMEASSISTANT_DOMAIN` 注册，并将 `issue_domain` 设置为你的 domain。

```python
async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration."""
    if DOMAIN not in config:
        return True

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": SOURCE_IMPORT}, data=config[DOMAIN]
    )
    if (
        result.get("type") is FlowResultType.ABORT
        and (reason := result["reason"]) != "single_instance_allowed"
    ):
        async_create_import_error_issue(hass, reason)
        return True

    ir.async_create_issue(
        hass,
        HOMEASSISTANT_DOMAIN,
        f"deprecated_yaml_{DOMAIN}",
        breaks_in_ha_version="2027.1.0",
        is_fixable=False,
        issue_domain=DOMAIN,
        severity=ir.IssueSeverity.WARNING,
        translation_key="deprecated_yaml",
        translation_placeholders={"domain": DOMAIN, "integration_title": "Example"},
    )
    return True
```

只有在 import 成功之后才触发 `deprecated_yaml` issue。如果在提前触发而 import 后来中止，用户会被告知他们的 configuration 已被导入，而实际上并没有。当 import 中止时，他们的 configuration 没有生效，因此应改用 `ERROR` severity 触发你自己的 issue。

一旦 deprecation 期限已过，YAML handling 本身也已移除，请将 `cv.config_entry_only_config_schema(DOMAIN)` 保留为 `CONFIG_SCHEMA`。它会在仍然有人在 `configuration.yaml` 中包含该 integration 时记录错误并触发 repair issue。

### 弃用单个 YAML config keys

如果你只想弃用单个 YAML key 或一组 YAML keys（例如因为一次性弃用整个 YAML config 太复杂），我们会在读取 YAML 的 `async_setup` 中触发一个 repair issue，并且只在 key 实际存在时才触发。该 key 会一直工作到 deprecation 期限结束。

```python
async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration."""
    if CONF_IPV6 in config[DOMAIN]:
        ir.async_create_issue(
            hass,
            DOMAIN,
            "deprecated_ipv6",
            breaks_in_ha_version="2027.1.0",
            is_fixable=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key="deprecated_ipv6",
        )

    ...
```

一旦期限结束，不要只是从 schema 中移除该 key。请在其位置保留 `cv.removed(CONF_IPV6)`，这样会告诉用户该 option 已消失，而不是用一条泛化的 validation 错误失败。

### 操作

从 handler 中创建 repair issue：

```python
async def render_image(call: ServiceCall) -> ServiceResponse:
    ir.async_create_issue(
        call.hass,
        DOMAIN,
        "deprecated_generate_image",
        breaks_in_ha_version="2026.9.0",
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key="deprecated_generate_image",
    )
```

弃用 action 的单个参数处理方式相同，但只有在参数实际被传递时才触发 issue。

### Entities 和 attributes

当一个 attribute 变成它自己的 entity、一个 entity 被另一个 platform 上的 entity 替换，或一个 entity 被完全移除时，（请先创建新 entity）在 deprecation 期间保持旧的继续工作。

对每一个仍然存在且启用的已弃用 entity 都触发 issue。使用 `automations_with_entity()` 和 `scripts_with_entity()` 让消息更具体，并警告用户特定的 automations 或 scripts 将被破坏。[禁用 entity](https://www.home-assistant.io/common-tasks/general/#enabling-or-disabling-entities) 是用户确认 deprecation 的方式。一旦它被禁用且没有任何引用，就移除 registry entry，使其不会被重新创建。该 issue 本身不是持久的，因此重启后会自动消失。

```python
def async_deprecate_entity(
    hass: HomeAssistant,
    entity_registry: er.EntityRegistry,
    description: ExampleSwitchEntityDescription,
) -> bool:
    """Return whether the deprecated entity should still be created."""
    entity_id = entity_registry.async_get_entity_id(
        Platform.SWITCH, DOMAIN, description.unique_id
    )
    if entity_id is None:
        return False

    items = automations_with_entity(hass, entity_id) + scripts_with_entity(hass, entity_id)
    if entity_registry.async_get(entity_id).disabled and not items:
        entity_registry.async_remove(entity_id)
        return False

    ir.async_create_issue(
        hass,
        DOMAIN,
        f"deprecated_entity_{entity_id}",
        breaks_in_ha_version="2027.2.0",
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key="deprecated_entity_used" if items else "deprecated_entity",
        translation_placeholders={
            "entity_id": entity_id,
            "new_entity_id": description.replacement_entity_id,
        }
        | ({"items": "\n".join(items)} if items else {}),
    )
    return True
```

在 platform 的 `async_setup_entry` 中调用它，此处 entities 被构建，其返回值决定哪些会被添加：

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the switch platform."""
    entity_registry = er.async_get(hass)
    entities = [ExampleSwitch(coordinator, description) for description in SWITCHES]
    entities.extend(
        ExampleSwitch(coordinator, description)
        for description in DEPRECATED_SWITCHES
        if async_deprecate_entity(hass, entity_registry, description)
    )
    async_add_entities(entities)
```

对一个尚不存在的 entity 返回 `False` 意味着，只有已经拥有该 entity 的用户才会重新创建它，因此新用户永远不会得到它。

消息必须点明该 entity 可能被使用的每一个位置，不仅仅是 automations 和 scripts，还要告诉用户禁用它才是移除它的方式：

```json
"deprecated_entity": {
  "title": "Deprecated switch detected",
  "description": "The switch `{entity_id}` is deprecated because it has been replaced with `{new_entity_id}`.\n\nUpdate your dashboards, templates, automations and scripts to use the replacement entity, then disable the deprecated switch and restart Home Assistant."
},
"deprecated_entity_used": {
  "title": "[%key:component::example::issues::deprecated_entity::title%]",
  "description": "The switch `{entity_id}` is deprecated because it has been replaced with `{new_entity_id}`.\n\nThe switch was used in the following automations or scripts:\n{items}\n\nUpdate the above, along with any dashboards and templates that use it, to use the replacement entity, then disable the deprecated switch and restart Home Assistant."
}
```

### 移除一个 integration

当一个 integration 完全停止工作且没有更新计划时，应该将其移除，同时触发一个 repair，让用户知道发生了什么。这是通过将其精简为一个会触发 `ERROR` issue 的 stub 来实现，同时保留一个最基础的 `config_flow.py`，以便现有的 entries 仍然可以加载。既定的 translation key 是 `integration_removed`，应在 `strings.json` 中添加并说明移除原因：

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration from a config entry."""

    ir.async_create_issue(
        hass,
        DOMAIN,
        DOMAIN,
        is_fixable=False,
        severity=ir.IssueSeverity.ERROR,
        translation_key="integration_removed",
        translation_placeholders={
            "entries": f"/config/integrations/integration/{DOMAIN}",
        },
    )
    return True
```

`entries` placeholder 是一个指向用户现有 config entries 的链接：

```json
"integration_removed": {
  "title": "The Example integration has been removed",
  "description": "The Example integration has been removed from Home Assistant, as the vendor shut down the API it relied on.\n\nTo resolve this issue, remove the (now defunct) integration entries from your Home Assistant setup. [Click here to see your existing Example integration entries]({entries})."
}
```

在 `async_unload_entry` 中再次删除该 issue，但只有在该 domain 的最后一条 config entry 卸载之后才删除。

当 integration 是被后继者替代而不是消失时，应改用 `WARNING` 加 `breaks_in_ha_version`，并以 `deprecated` 原因中止 config flow，以便不会创建新的 entries。

### 文档和测试

Deprecation 通过 repair issue 和 release notes 公告。不要在 [home-assistant.io](/developers/documenting/standards.md) 上留下 deprecation 通知，因为该文档只描述当前有效的内容。

使用 `issue_registry` fixture 测试该 issue 是否被创建，以及在最后一条 config entry 卸载后是否被再次删除。

## 面向开发者的 deprecations

其他 integrations 导入或子类化的任何东西都算作 core API，无论它位于 `homeassistant/helpers/`、`homeassistant/const.py`，还是像 `homeassistant/components/sensor/` 这样的 entity platform 中。弃用其中之一会影响 custom integration 作者，他们需要一个自己的 release cycle 来应对。这些有 12 个月的时间，并且会在本网站的 [blog](/developers/blog.md) 上发布公告，说明替换方案（如有）和移除版本。

这些机制会将警告记录到被指责的 integration。它们 **不会** 创建 repair issue，因为用户无法修复 custom integration 的代码。

### Constants、aliases 和 enum members

以 `_DEPRECATED_` 为前缀的名称注册替换项，并安装三个 module hooks，这样读取旧名称时只警告一次：

```python
from functools import partial

from homeassistant.helpers.deprecation import (
    DeprecatedConstantEnum,
    all_with_deprecated_constants,
    check_if_deprecated_constant,
    dir_with_deprecated_constants,
)

_DEPRECATED_CONCENTRATION_GRAMS_PER_CUBIC_METER = DeprecatedConstantEnum(
    UnitOfDensity.GRAMS_PER_CUBIC_METER, "2027.8"
)

# These can be removed if no deprecated constants are in this module anymore
__getattr__ = partial(check_if_deprecated_constant, module_globals=globals())
__dir__ = partial(dir_with_deprecated_constants, module_globals_keys=[*globals().keys()])
__all__ = all_with_deprecated_constants(globals())
```

对于普通值使用 `DeprecatedConstant`，对于 enum member 使用 `DeprecatedConstantEnum`，当类或函数移动时使用 `DeprecatedAlias`。要弃用你要保留的 enum 中的单个 member，请改用 `EnumWithDeprecatedMembers` metaclass：

```python
class MediaPlayerState(
    StrEnum,
    metaclass=EnumWithDeprecatedMembers,
    deprecated={
        "STANDBY": ("MediaPlayerState.OFF or MediaPlayerState.IDLE", "2026.8.0"),
    },
):
    """State of media player entities."""

    OFF = "off"
    IDLE = "idle"
    STANDBY = "standby"
```

:::note

Deprecated constants 只有在调用方可以被归因于某个 integration 时才会警告。来自 core 代码或测试的访问是静默的，这就是为什么下面的测试 helpers 会通过一个 custom integration 来访问该 constant。

:::

### Functions、methods 和 classes

```python
@deprecated_function(
    "homeassistant.helpers.sun.get_astral_observer",
    breaks_in_ha_version="2027.7",
)
@callback
def get_astral_location(hass: HomeAssistant) -> tuple[Location, Elevation]:
```

`@deprecated_class` 会在实例化时警告，是保留已重命名 class 作为 alias 的工具。两者都以字符串形式接受替换项。要弃用一个你不再需要的 leading `hass` 参数，请使用 `@deprecated_hass_argument`，它会警告并剥离该参数。

### 使用模式

当问题不是一个符号，而是一种模式时，例如设置一个你想要移除的 property，或调用一个 platform 现在已经替代的 registration function，请使用 `report_usage()`。它能区分 core 代码和 integrations，这样 core 内部的错误会大声失败，而 integrations 只会收到警告：

```python
report_usage(
    "calls system_health.async_register_info, which is deprecated; "
    "add a system_health platform instead",
    breaks_in_ha_version="2027.1",
    core_behavior=ReportBehavior.ERROR,
    exclude_integrations={DOMAIN},
)
```

第一个参数 `what` 会被插入到 `Detected that integration 'domain' {what}` 中，因此请将它写为动词短语。

`report_usage()` 在 core 中运行，因此它通过遍历调用栈来识别负责的 integration。当 integration 自己调用了已弃用的 function 时这有效。当 core 只是读取 integration 之前设置的内容（如已弃用的 entity property）时无效，因为那时 integration 已经不在栈上了。这种情况下请传入 `integration_domain`，从一个知道自身来源的 object 中获取，例如 entity 上的 `self.platform.platform_name`。

谁会收到什么由三个独立参数控制，每个都接受一个 `ReportBehavior`，可以是 `IGNORE`（什么都不说）、`LOG`（在 `level` 级别记录，每个 caller 一次）或 `ERROR`（记录并抛出 `RuntimeError`）：

| Parameter | Applies to | Default |
| --- | --- | --- |
| `core_behavior` | `homeassistant/` 中栈上没有 integration 的代码 | `ERROR` |
| `core_integration_behavior` | 一个 built-in integration | `LOG` |
| `custom_integration_behavior` | 一个 custom integration | `LOG` |

这些默认值通常是想要的：core 代码在测试中大声失败，而 integrations 只收到警告。在仍在迁移 built-in integrations 时，可以将 `core_integration_behavior` 降为 `IGNORE`，这样警告才能触达 custom integration 作者，而不会被你已经在修复的 offenders 刷屏。

### 测试

`tests/common.py` 为 symbols 提供了 `import_and_test_deprecated_constant`、`import_and_test_deprecated_constant_enum`、`import_and_test_deprecated_alias` 和 `help_test_all`。`mock_integration_frame` fixture 覆盖 `report_usage` 警告。
