---
title: "集成服务操作"
sidebar_label: "自定义操作"
---

Home Assistant 提供了许多现成的 actions，但并非总能覆盖一切。与其试图更改 Home Assistant，更好的做法是先将其作为 service action 添加到你自己的 integration 下。一旦我们在这些 service actions 中看到某种模式，再讨论如何将其通用化。

[Service actions 应始终注册]（/docs/core/integration-quality-scale/rules/action-setup），以确保引用它们的 automations 可以被编辑和验证，并且即使 integration 没有加载的 config entries，在调用 service 时也能给出说明性的错误信息。请在 integration 的 `async_setup` 或 `setup` 函数中注册 services，而不是在 integration 的 `async_setup_entry` 或 platform 的 `async_setup_entry`、`async_setup_platform`、`setup_platform` 中注册。

这是一个简单的 "hello world" 示例，用于展示注册 service action 的基本方法。要使用此示例，创建文件 `<config dir>/custom_components/hello_action/__init__.py` 并复制下面的示例代码。

Actions 可以从 automations 调用，也可以从前端的 **Tools** 中的 **Actions** 标签页调用。

```python
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.typing import ConfigType

DOMAIN = "hello_action"

ATTR_NAME = "name"
DEFAULT_NAME = "World"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up is called when Home Assistant is loading our component."""

    @callback
    def handle_hello(call: ServiceCall) -> None:
        """Handle the service action call."""
        name = call.data.get(ATTR_NAME, DEFAULT_NAME)

        hass.states.async_set("hello_action.hello", name)

    hass.services.async_register(DOMAIN, "hello", handle_hello)

    # Return boolean to indicate that initialization was successful.
    return True
```

要在 Home Assistant 中加载该 integration，需要创建一个 `manifest.json`，并在 `configuration.yaml` 中添加一个条目。当 component 加载后，应该会出现一个可调用 service。

```yaml
# configuration.yaml entry
hello_action:
```

`manifest.json` 示例：

```json
{
    "domain": "hello_action",
    "name": "Hello Action",
    "documentation": "https://developers.home-assistant.io/docs/dev_101_services",
    "iot_class": "local_push",
    "version": "0.1.0"
}
```

打开前端，在侧边栏中点击 developer tool 区域中的第一个图标。这会打开 Actions developer tool。在右侧找到你的 action 并点击它，会自动填入正确的值。

现在按下 "Perform action" 将以不带任何参数的方式调用你的 service action。这会让你的 service action 创建一个名为 'World' 的默认 state。如果你想指定名称，需要通过 service action Data 提供参数。在 YAML 模式下，添加以下内容，然后再次按下 "Perform Service"。

```yaml
service: hello_action.hello
data:
  name: Planet
```

Service action 现在会用 "Planet" 覆盖之前的 state。

## Service action 描述

添加 actions 只有在用户知道它们时才有用。在 Home Assistant 中，我们通过将 `services.yaml` 作为 integration 的一部分来描述 service actions。

Actions 发布在 integration 的 domain 名称下，因此在 `services.yaml` 中我们只使用 service action 名称作为 base key。

### Service action description 示例

```yaml
# Example services.yaml entry

# Service ID
set_speed:
  # If the service action accepts entity IDs, target allows the user to specify
  # entities by entity, device, or area. If `target` is specified, `entity_id`
  # should not be  defined in the `fields` map. By default it shows only targets
  # matching entities from the same domain as the action, but if further
  # customization is required, target supports the entity, device, and area
  # selectors (https://www.home-assistant.io/docs/blueprint/selectors/).
  # Entity selector parameters will automatically be applied to device and area,
  # and device selector parameters will automatically be applied to area.
  target:
    entity:
      domain: fan
      # If not all entities from the action's domain support an action, entities
      # can be further filtered by the `supported_features` state attribute. An
      # entity will only be possible to select if it supports at least one of the
      # listed supported features.
      supported_features:
        - fan.FanEntityFeature.SET_SPEED
        # If a service action requires more than one supported feature, the item
        # should be given as a list of required supported features. For example,
        # if the service action requires both SET_SPEED and OSCILLATE it would
        # be expressed like this
        - - fan.FanEntityFeature.SET_SPEED
          - fan.FanEntityFeature.OSCILLATE
  # Different fields that your service action accepts
  fields:
    # Key of the field
    speed:
      # Whether or not field is required (default = false)
      required: true
      # Example value that can be passed for this field
      example: "low"
      # The default field value
      default: "high"
      # Selector (https://www.home-assistant.io/docs/blueprint/selectors/) to control
      # the input UI for this field
      selector:
        select:
          translation_key: "fan_speed"
          options:
            - "off"
            - "low"
            - "medium"
            - "high"
    # Fields can be grouped in collapsible sections, this is useful to initially hide
    # less commonly used fields and to group related fields. Note that the collapsible section
    # only affect presentation to the user, service action data will not be nested.
    additional_fields:
      # Whether or not the section is initially collapsed (default = false)
      collapsed: true
      # Input fields in this section
      fields:
        speed_pct:
          selector:
            number:
              min: 0
              max: 100
```

:::info
Service actions 的名称和描述在我们的 [translations](/developers/internationalization/core) 中设置，而不是在 service action description 中。每个 service action 和 service action field 都必须有对应的 translation 定义。Description placeholders 允许你排除 URL 等元素而不翻译。

```python
...
    hass.services.async_register(
      DOMAIN,
      "hello", handle_hello,
      description_placeholders={"docs_url": "https://example.com/hello_world"},
    )
...
```

:::

### Service action fields 的分组

输入字段可以在 sections 中按视觉进行分组。将输入字段按 section 分组只影响向用户展示输入方式，不影响 service action data 的结构。

在 [service action description 示例](#service-action-description-example) 中，`speed_pct` 输入字段位于一个默认折叠的 section `additional_fields` 内。
示例中该 service 的 service action data 是 `{"speed_pct": 50}`，而不是
`{"additional_fields": {"speed_pct": 50}}`。

### Service action fields 的过滤

在某些情况下，action 的 domain 中的实体可能不支持所有 service action fields。
通过为 field description 提供 `filter`，只有当至少有一个选中的实体按照配置的 filter 支持该字段时，该字段才会显示。

filter 必须指定 `supported_features` 或 `attribute` 其中之一，不能同时使用两者。

`supported_features` filter 通过一个 supported features 列表来指定。只有当至少一个选中的实体支持所列特征之一时，字段才会显示。

`attribute` filter 将一个 attribute 与一个 values 列表组合起来。只有当至少一个选中的实体的 attribute 被设置为所列的 attribute states 之一时，字段才会显示。如果 attribute state 是一个列表，只有当选中的实体的 attribute state 中至少有一个项被设置为所列的 attribute states 之一时，字段才会显示。

以下是一个字段的局部示例，只有当至少一个选中的实体支持 `ClimateEntityFeature.TARGET_TEMPERATURE` 时才会显示该字段：

```yaml
  fields:
    temperature:
      name: Temperature
      description: New target temperature for HVAC.
      filter:
        supported_features:
          - climate.ClimateEntityFeature.TARGET_TEMPERATURE
```

以下是一个字段的局部示例，只有当至少一个选中的实体的 `supported_color_modes` attribute 包含 `light.ColorMode.COLOR_TEMP` 或
`light.ColorMode.HS` 时才会显示该字段：

```yaml
    color_temp:
      name: Color temperature
      description: Color temperature for the light in mireds.
      filter:
        attribute:
          supported_color_modes:
            - light.ColorMode.COLOR_TEMP
            - light.ColorMode.HS
```

## 图标

Actions 也可以有 icons。这些 icons 在 Home Assistant UI 中显示 service action 的地方使用，比如在 automation 和 script 编辑器中。

每个 service action 要使用的 icon 可以在 integration 文件夹的 `icons.json` translation 文件中定义，位于 `services` key 下。key 应该是 service action 名称，value 应该是要使用的 icon。

以下示例展示如何为 integration 的 `turn_on` 和 `turn_off` service actions 提供 icons：

```json
{
  "services": {
    "turn_on": {"service": "mdi:lightbulb-on"},
    "turn_off": {"service": "mdi:lightbulb-off"}
  }
}
```

此外，也可以为 collapsible sections 选择性地指定 icon。

以下示例展示如何为 `additional_options` section 提供 icon：

```json
{
  "services": {
    "start_brewing": {
      "service": "mdi:flask",
      "sections": {
        "additional_options": "mdi:test-tube"
      }
    }
  }
}
```

## 为 service actions 选择合适的 target

注册 service action 时，应将其指向 [data hierarchy](/developers/architecture/devices-and-services#entity-data-hierarchy) 中该 action 真正需要运行的层级。不要指向比所需层级更高或更低的层级，即使这些层级可以互相解析。

- **Entity level** — 如果 service action 是对某个特定实体进行操作或需要某个特定实体才能工作，请使用 `entity_id` 作为 target。例如控制一个 light。将这些注册为 [entity service actions](#entity-service-actions)。

- **Device level** — 如果 service action 是对整个设备进行操作，并且需要一个 device entry（而不是某个特定实体）才能工作，请使用 `device_id` 字段作为 target。即使可以将实体解析为其父级设备，也不要使用 `entity_id` 作为替代。例如，重启设备这样的 action 是针对设备本身的，而不是它暴露的任何特定实体，因此应该以设备为 target。

- **Config entry level** — 如果 service action 是对 integration 实例进行操作，并且需要一个 config entry 才能工作，请使用 `config_entry_id` 作为 target。即使可以将它们解析回 config entry，也不要使用 `device_id` 或 `entity_id` 作为替代。例如，在外部 API 中创建一个新资源的 action，该资源对整个 account 或 connection 通用，应该以代表该 account 或 connection 的 config entry 为 target，而不是以它下面的 device 或 entity 为 target。

:::tip
指导原则是：**将 target 指向 action 真正操作的对象**。如果 action 需要 device，就以 device 为 target。如果需要 config entry，就以 config entry 为 target。从较低层级进行解析（例如从 entity 查找 config entry）会引入不必要的间接关系，使 action 接口与 integration 中 data hierarchy 的假设耦合，也会让用户更难理解 action 操作的对象。
:::

:::caution
当 service action 需要一个 target 时，该 target 不应是可选的。不要在没有指定 target 时实现一个默认 target。

将 target 设为可选看起来很方便，但当配置因添加 entities 或 entries 而发生变化时，会让 automations 和 scripts 变得不可预测。要求明确的 target 可以让 action 调用在任何用户当前配置下都保持可预测。
:::

## 实体 service actions

有时你想提供额外的 actions 来控制你的 entities。例如，Sonos integration 提供了用于将 devices 分组和取消分组的 action。Entity service actions 的特殊之处在于用户有多种指定 entities 的方式。它可以是 areas、一个 group 或一个 entities 列表。

使用 `homeassistant.helpers.service.async_register_platform_entity_service` 注册 entity service actions。请在 integration domain 下注册 actions，例如 `sonos`，而不是在 platform domain 下注册，例如 `media_player`。如果 entity service action 有 fields，你可以将一个 schema 传递给 `async_register_platform_entity_service`。该 schema 可以是：

- 一个字典，会被自动传递给 `cv._make_entity_service_schema`
- `cv._make_entity_service_schema` 返回的 validator
- `cv._make_entity_service_schema` 返回的 validator，被包裹在一个 `vol.Schema` 中
- `cv._make_entity_service_schema` 返回的 validator，被包裹在一个 `vol.All` 中

添加到 `homeassistant/components/sonos/__init__.py` 的示例代码：

```python
from homeassistant.components.media_player import DOMAIN as MEDIA_PLAYER_DOMAIN
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers import config_validation as cv, service
import voluptuous as vol

DOMAIN = "sonos"
SERVICE_SET_TIMER = "set_sleep_timer"

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Sonos integration."""

    # This will call each targeted entity's `set_sleep_timer` method with `sleep_time=VALUE`
    service.async_register_platform_entity_service(
         hass,
         DOMAIN,
         SERVICE_SET_TIMER,
         entity_domain=MEDIA_PLAYER_DOMAIN,
         schema={vol.Required("sleep_time"): cv.time_period},
         func="set_sleep_timer",
     )
    return True
```

如果你需要对 service action 调用进行更精细的控制，也可以传递一个 async function，该 function 会被调用以替代 `"set_sleep_timer"`：

```python
async def custom_set_sleep_timer(entity, service_call):
    await entity.set_sleep_timer(service_call.data['sleep_time'])
```

## 响应数据

Actions 可以使用 data 对 action 调用做出响应，以支撑更复杂的 automations。有以下额外的实现要求：

- Response data 必须是一个 `dict`，并且可 JSON 序列化为 [`homeassistant.util.json.JsonObjectType`](https://github.com/home-assistant/core/blob/dev/homeassistant/util/json.py)，以便与系统的其他部分（如 frontend）互操作。
- Errors 必须像任何其他 service action 调用一样作为 exceptions 抛出，
因为我们不希望终端用户在 scripts 和 automations 中进行复杂的错误处理。
Response data 中不应包含用于错误处理的错误码。

示例代码：

```python
import datetime

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.helpers import config_validation as cv, entity_platform, service
from homeassistant.util.json import JsonObjectType

SEARCH_ITEMS_SERVICE_NAME = "search_items"
SEARCH_ITEMS_SCHEMA = vol.Schema({
    vol.Required("start"): datetime.datetime,
    vol.Required("end"): datetime.datetime,
})


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration."""

    async def search_items(call: ServiceCall) -> ServiceResponse:
        """Search in the date range and return the matching items."""
        items = await my_client.search(call.data["start"], call.data["end"])
        return {
            "items": [
                {
                    "summary": item["summary"],
                    "description": item["description"],
                } for item in items
            ],
        }

    hass.services.async_register(
        DOMAIN,
        SEARCH_ITEMS_SERVICE_NAME,
        search_items,
        schema=SEARCH_ITEMS_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
```

Response data 的用途适用于那些不符合 Home Assistant state 的情况。例如，对象的响应流。相反，对于符合 entity state 的情况，不应使用 response data。例如，温度值应该只是一个 sensor。

### 支持 response data

Action 调用在注册时会带有一个 `SupportsResponse` 值，用于指示是否支持 response data。

| Value      | Description                                                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OPTIONAL` | 执行一个 action，并可以选择性地返回 response data。Service action 应当根据 `ServiceCall` 属性 `return_response` 进行条件判断，以决定是否返回 response data，或返回 `None`。 |
| `ONLY`     | 不执行任何 actions，始终返回 response data。                                                                                                                                                         |