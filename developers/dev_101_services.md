# 集成服务动作

Home Assistant 为很多场景提供了现成动作，但并不总能覆盖所有需求。与其尝试修改 Home Assistant，本着优先原则，应该先将它作为你自己集成下的一个服务动作添加进来。一旦我们在这些服务动作中看到某种模式，再讨论如何将它们泛化。

[服务动作应始终被注册](/developers/core/integration-quality-scale/rules/action-setup.md)，以确保引用它们的自动化可被编辑和校验，并且即使集成没有加载任何配置条目，在调用服务时也能给出有信息量的错误消息。请在集成的 `async_setup` 或 `setup` 函数中注册服务，不要在集成的 `async_setup_entry` 中注册，也不要在平台的 `async_setup_entry`、`async_setup_platform` 或 `setup_platform` 中注册。

下面是一个简单的 “hello world” 示例，用来展示注册服务动作的基础做法。要使用这个示例，请创建文件 `<config dir>/custom_components/hello_action/__init__.py`，并复制下面的示例代码。

动作既可以从自动化中调用，也可以从前端“开发者工具”里的动作面板中调用。

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

要在 Home Assistant 中加载该集成，需要创建一个 `manifest.json`，并在 `configuration.yaml` 中添加一个条目。当组件加载后，就会有一个新的服务可供调用。

```yaml
# configuration.yaml entry
hello_action:
```

一个 `manifest.json` 示例：

```json
{
    "domain": "hello_action",
    "name": "Hello Action",
    "documentation": "https://developers.home-assistant.io/docs/dev_101_services",
    "iot_class": "local_push",
    "version": "0.1.0"
}
```

打开前端，在侧边栏中点击开发者工具部分的第一个图标。这会打开“动作”开发者工具。在右侧找到你的动作并点击它，系统会自动填入正确的值。

点击 “Perform action” 现在会在不带任何参数的情况下调用你的服务动作。这会让服务动作创建一个默认名称为 `World` 的状态。如果你想指定名称，则需要通过服务动作的 Data 提供参数。在 YAML 模式下，添加以下内容后再次点击 “Perform Service”。

```yaml
service: hello_action.hello
data:
  name: Planet
```

现在，这个服务动作会用 `Planet` 覆盖之前的状态。

## 服务动作描述

只有用户知道这些动作的用途，添加动作才真正有意义。在 Home Assistant 中，我们使用集成内的 `services.yaml` 来描述服务动作。

动作发布在你的集成 domain 名称下，因此在 `services.yaml` 中我们只使用服务动作名作为基础 key。

### 服务动作描述示例

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
      # Advanced fields are only shown when the advanced mode is enabled for the user
      # (default = false)
      advanced: true
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
    # advanced fields and to group related fields. Note that the collapsible section
    # only affect presentation to the user, service action data will not be nested.
    advanced_fields:
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
服务动作的名称和描述设置在我们的[翻译](/developers/internationalization/core.md#services)中，而不是写在服务动作描述里。每个服务动作及其字段都必须定义匹配的翻译。Description placeholders 让你可以把 URL 之类的元素排除在翻译之外。

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

### 服务动作字段分组

输入字段可以在视觉上分组到不同 section 中。按 section 对输入字段分组，只会影响这些输入如何展示给用户，不会影响服务动作数据的结构。

在[服务动作描述示例](#service-action-description-example)中，`speed_pct` 输入字段位于一个初始折叠的 `advanced_fields` section 中。示例中该服务的服务动作数据是 `{"speed_pct": 50}`，而不是 `{"advanced_fields": {"speed_pct": 50}}`。

### 过滤服务动作字段

在某些情况下，某个动作 domain 下的实体可能并不支持所有服务动作字段。通过为字段描述提供 `filter`，该字段只会在至少一个已选实体根据配置的过滤条件支持它时显示。

过滤器必须指定 `supported_features` 或 `attribute` 二者之一，不支持将两者组合使用。

`supported_features` 过滤器由一个支持特性列表组成。如果至少一个已选实体支持其中至少一个特性，该字段就会显示。

`attribute` 过滤器将一个属性与一组值组合在一起。如果至少一个已选实体的该属性被设置为列出的属性状态之一，该字段就会显示。如果属性状态是列表，则只要至少一个已选实体的属性状态中包含列出的属性状态之一，该字段就会显示。

下面是一个字段的局部示例：只有当至少一个已选实体支持 `ClimateEntityFeature.TARGET_TEMPERATURE` 时，它才会显示：

```yaml
  fields:
    temperature:
      name: Temperature
      description: New target temperature for HVAC.
      filter:
        supported_features:
          - climate.ClimateEntityFeature.TARGET_TEMPERATURE
```

下面是另一个字段的局部示例：只有当至少一个已选实体的 `supported_color_modes` 属性包含 `light.ColorMode.COLOR_TEMP` 或 `light.ColorMode.HS` 时，它才会显示：

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

动作也可以有图标。这些图标会在 Home Assistant UI 中显示服务动作时使用，例如自动化和脚本编辑器中。

每个服务动作所使用的图标可以在集成目录下的 `icons.json` 翻译文件中定义，位置在 `services` key 下。key 应为服务动作名称，value 则为要使用的图标。

下面的示例展示了如何为某个集成的 `turn_on` 和 `turn_off` 服务动作提供图标：

```json
{
  "services": {
    "turn_on": {"service": "mdi:lightbulb-on"},
    "turn_off": {"service": "mdi:lightbulb-off"}
  }
}
```

此外，也可以为可折叠 section 指定图标。

下面的示例展示了如何为 `advanced_options` section 提供图标：

```json
{
  "services": {
    "start_brewing": {
      "service": "mdi:flask",
      "sections": {
        "advanced_options": "mdi:test-tube"
      }
    }
  }
}
```

## 为服务动作选择正确的 target

注册服务动作时，应将其 target 设定在该动作真正需要的数据层级上，参考[数据层级](/developers/architecture/devices-and-services.md#entity-data-hierarchy)。不要把 target 设得比实际需要更高或更低，即使这些层级之间可以互相解析。

* **实体级** - 如果服务动作作用于某个特定实体，或者必须依赖某个特定实体才能工作，请使用 `entity_id` 作为 target。例如控制一盏灯。此类动作应注册为[实体服务动作](#entity-service-actions)。

* **设备级** - 如果服务动作作用于整个设备，并且需要设备条目（而不是特定实体）才能工作，请使用 `device_id` 字段作为 target。不要用 `entity_id` 代替，即使某个实体可以解析回它的父设备。例如，重启设备的动作作用于设备本身，而不是它暴露出的某个特定实体，因此它应该以设备为 target。

* **配置条目级** - 如果服务动作作用于集成实例，并且需要配置条目才能工作，请使用 `config_entry_id` 作为 target。不要使用 `device_id` 或 `entity_id` 代替，即使它们可以反向解析回该配置条目。例如，在外部 API 中为整个账号或连接创建新资源的动作，应当 target 到代表该账号或连接的配置条目，而不是其下的设备或实体。

:::tip
指导原则是：**将 target 设为动作真正作用的对象。** 如果动作需要设备，就 target 设备；如果需要配置条目，就 target 配置条目。从更低层级进行解析（例如从实体查找配置条目）会引入不必要的间接性，使动作接口与集成中的数据层级假设耦合，也会让用户更难理解该动作到底作用于什么。
:::

:::caution
当服务动作需要 target 时，这个 target 不应是可选的。不要在未指定 target 时实现默认 target。

把 target 设为可选看似方便，但当用户通过新增实体或条目改变配置后，会让自动化和脚本的行为变得不可预测。要求显式 target，才能让动作调用在用户当
