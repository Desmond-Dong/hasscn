## 翻译字符串

Platform translation strings 以 JSON 形式存储在 [core](https://github.com/home-assistant/core) 仓库中。这些文件必须与所属的 component/platform 相邻放置。Components 必须有自己独立的目录，文件名在该目录中简单地命名为 `strings.json`。该文件将包含可翻译的不同字符串。

`strings.json` 包含集成提供的、需要翻译的各种内容的翻译。

| Category            | Description                                       |
| ------------------- | ------------------------------------------------- |
| `title`             | Title of the integration.                         |
| `common`            | Shared strings.                                   |
| `conditions`        | Conditions of the integration.                    |
| `config`            | Translations for the config flow.                 |
| `device`            | Translations for devices.                         |
| `device_automation` | Translations for device automations.              |
| `entity`            | Translations for entities.                        |
| `entity_component`  | Translations for entity components.               |
| `exceptions`        | Translations for error messages.                  |
| `issues`            | Translations for repairs issues.                  |
| `options`           | Translations for the options flow.                |
| `selectors`         | Selectors of the integration.                     |
| `services`          | Service actions of the integration.               |
| `triggers`          | Triggers of the integration.                      |

### 标题

此 category 只是一个字符串：集成名称的翻译。该 key 是可选的，如果省略，Home Assistant 将回退到集成名称。仅当该名称不是产品品牌时才包含此条目。

### 共享字符串

多次使用的字符串不应重复，而应使用引用指向单一的定义。引用可以是任何有效的 translation key。可选地，shared strings 可以放在 `common` section 中。

```json
{
  "common": {
    "error_stale_api_key": "This message will be displayed if `stale_api_key` is returned as the abort reason."
  },
  "config": {
    "error": {
      "invalid_api_key": "This message will be displayed if `invalid_api_key` is returned as a flow error.",
      // Reference to the common section
      "stale_api_key": "[%key:component::new_integration::common::error_stale_api_key%]"
    },
  }
  "options": {
    "error": {
      // Reference to another section in the same file
      "invalid_api_key": "[%key:component::new_integration::config::error::invalid_api_key%]",
      // Reference to the common section in the same file
      "stale_api_key": "[%key:component::new_integration::common::error_stale_api_key%]"
    },
  }
}
```

### 配置 / 选项 / 子条目流

Configuration flow handler、option flow handler 和 config subentry handler 的 translation strings 分别定义在 `config`、`options` 和 `config_subentries` key 下。

请注意，`config_subentries` 是 map of maps，其中 key 是集成支持的 subentry 类型。

下面的示例 strings 文件描述了不同的支持的 key。虽然示例展示的是 configuration flow 的翻译，但 options 和 subentry flow 的翻译格式相同。

```json
{
  "config": {
    // Optional. Title to show in list. Only will be rendered if placeholders required
    "flow_title": "Discovered Device ({host})",
    // Optional, only needed if the default translations in frontend are misleading
    "entry_type": "Label explaining what an entry represents",
    // Optional, only needed if the default translations in frontend are misleading
    "initiate_flow": {
        "reconfigure": "Menu or button label for starting a reconfigure flow",
        "user": "Menu or button label for starting a user flow"
    },
    "step": {
      "init": {
        // Optional. Will show the integration name if omitted
        "title": "The user visible title of the `init` step.",
        // Optional
        "description": "Markdown that is shown with the step.",
        "data": {
          "api_key": "The label for the `api_key` input field"
        },
        // Only needed if the form has sections
        "sections": {
          "auth_options": {
            "name": "The label for the `auth_options` section"
          }
        }
      }
    },
    "error": {
      "invalid_api_key": "This message will be displayed if `invalid_api_key` is returned as a flow error."
    },
    "abort": {
      "stale_api_key": "This message will be displayed if `stale_api_key` is returned as the abort reason. Supports Markdown."
    },
    "progress": {
      "slow_task": "This message will be displayed if `slow_task` is returned as `progress_action` for `async_show_progress`. Supports Markdown."
    },
    "create_entry": {
      "default": "This message will be displayed in the success dialog if `async_create_entry` is called with `description=None`. Supports Markdown.",
      "custom": "This message will be displayed in the success dialog if `async_create_entry` is called with `description='custom'`. Supports Markdown."
    }
  },
  "options": {
    // Same format as for config flow
  },
  "config_subentries": {
    "subentry_type_1": {
      // Same format as for config flow
    },
    "subentry_type_2": {
      // Same format as for config flow
    }
  }
}
```

### 选择器

Selectors 的翻译定义在 `selector` key 下。它支持 selector `select` 的 option label 翻译。集成应在 selector select 配置上设置 `translation_key`。这允许对 config 和 options flows 中使用的 select selectors 进行翻译。下面的示例 strings 文件描述了不同的支持的 key。

```json
{
  "config": {
    "flow_title": "Discovered Device ({host})",
    "step": {
      "init": {
        "title": "The user visible title of the `init` step.",
        "description": "Markdown that is shown with the step.",
        "data": {
          // Config flow selector select with options that support translations
          "set_ca_cert": "Broker certificate validation"
        }
      }
    }
  },
  // Translations for selector select to be used in option and config flows
  "selector": {
    // The key is linked to the `translation_key` that needs to be set
    // using the SelectSelectorConfig class
    "set_ca_cert": {
      // The translations for the selector select option labels
      "options": {
        "off": "Off",
        "auto": "Auto",
        "custom": "Custom"
      }
    }
  }
}

```

Number selector 的 `unit_of_measurement` 也可以使用 translation key 进行翻译：

```json
{
  // Translations for number selector to be used in option and config flows
  "selector": {
    // The key is linked to the `translation_key` that needs to be set
    // using the NumberSelectorConfig class
    "round_digits": {
      // The translations for the number selector unit_of_measurement
      "unit_of_measurement": {
        "decimals": "decimals"
      }
    }
  }
}
```

### Service 操作

Service actions strings 的翻译定义在 `services` key 下。

它支持翻译每个 action 的 `name` 和 `description`、每个 action 的 `fields` 的 `name` 和 `description`，以及每个可折叠 fields section 的 `name` 和 `description`。

请注意，在可折叠 section 中显示的 fields 的 `name` 和 `description` 的翻译也应在 `fields` key 下。

在[注册 service action](/developers/dev_101_services.md#service-action-description-example)时设置 description placeholders。

```json
{
  "selector": {
    "fan_speed": {
      "options": {
        "high": "High",
        "low": "Low",
        "medium": "Medium",
        "off": "Off",
      }
    }
  },
  "services": {
    "set_speed": {
      "name": "Set speed",
      "description": "Sets fan speed. [Learn more.]({docs_url})",
      "fields": {
        "speed": {
          "name": "Speed",
          "description": "The speed to set."
        }
      },
      "sections": {
        "additional_fields": {
          "name": "Additional options"
        }
      }
    }
  }
}
```

:::note
Service actions 可以在其 `fields` 中使用 selectors。这些 selectors 的翻译可以通过 `services.yaml` 文件中 selector 定义上的 `translation_key` 属性提供。更多信息请参见 [Selectors](#selectors) section 和 [Service action description](/developers/dev_101_services.md#service-action-descriptions) 页面。
:::

### 设备自动化

Device automations 的 translation strings 定义在 `device_automation` key 下。下面的示例 strings 文件描述了不同的支持的 key。

```json
{
  "device_automation": {
    // Translations for supported device actions
    "action_type": {
      "open": "Open {entity_name}"
    }
    // Translations for supported device conditions
    "condition_type": {
      "is_open": "{entity_name} is open"
    }
    // Translations for supported device triggers
    "trigger_type": {
      "opened": "{entity_name} opened",
      "remote_button_short_press": "\"{subtype}\" button pressed",
    }
    // Translations for device trigger sub types, typically used for names of buttons
    "trigger_subtype": {
      "button_1": "First button"
    }
  }
}

```

### 触发器

Trigger strings 的翻译定义在 `triggers` key 下。结构与[service actions](#service-actions)相同：每个 trigger 以 trigger key（`async_get_triggers` 返回的 key）为键，支持翻译 trigger 的 `name` 和 `description`、每个 `fields` 的 `name` 和 `description`，以及每个可折叠 `section` 的 `name` 和 `description`。

Trigger 的结构（其 fields、sections 和 selectors）定义在 `triggers.yaml` 文件中。更多信息请参见 [Automations](/developers/automations.md) 文档。

```json
{
  "triggers": {
    "occupancy_cleared": {
      "name": "Occupancy cleared",
      "description": "Triggers when occupancy is cleared.",
      "fields": {
        "for": {
          "name": "For",
          "description": "The duration the occupancy must be cleared before triggering."
        }
      }
    }
  }
}
```

:::note
Triggers 可以在其 `fields` 中使用 selectors。这些 selectors 的翻译可以通过 `triggers.yaml` 文件中 selector 定义上的 `translation_key` 属性提供。更多信息请参见 [Selectors](#selectors) section。
:::

### 条件

Condition strings 的翻译定义在 `conditions` key 下。与[triggers](#triggers)一样，结构与[service actions](#service-actions)相同：每个 condition 以 condition key（`async_get_conditions` 返回的 key）为键，支持翻译 condition 的 `name` 和 `description`、每个 `fields` 的 `name` 和 `description`，以及每个可折叠 `section` 的 `name` 和 `description`。

Condition 的结构（其 fields、sections 和 selectors）定义在 `conditions.yaml` 文件中。更多信息请参见 [Automations](/developers/automations.md) 文档。

```json
{
  "conditions": {
    "door_state": {
      "name": "Door state",
      "description": "Tests if the door has a specific state.",
      "fields": {
        "state": {
          "name": "State",
          "description": "The state the door must have for the condition to pass."
        }
      }
    }
  }
}
```

:::note
Conditions 可以在其 `fields` 中使用 selectors。这些 selectors 的翻译可以通过 `conditions.yaml` 文件中 selector 定义上的 `translation_key` 属性提供。更多信息请参见 [Selectors](#selectors) section。
:::

### 异常

Localization 支持 `HomeAssistantError` 及其子类。
Exceptions 的 translation strings 定义在 `strings.json` 文件中的 `exception` key 下。下面的示例描述了不同的支持的 key。

```json
{
  "exceptions": {
    // Translations for known exceptions
    "invalid_index": {
      "message": "Invalid index selected, expected [0,1,2]. Got {index}"
    }
  }
}

```

在 service action 调用中抛出带 localization 的异常示例：

```python
async def async_select_index(hass: HomeAssistant, index: int) -> None:
    """Set up the config entry for my device."""
    try:
        check_index(index)
    except ValueError as exc:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="invalid_index",
            translation_placeholders={
                "index": index,
            },
        ) from exc
```

### 问题

Repairs issues 的 translation strings 定义在 `issues` key 下。下面的示例 strings 文件描述了不同的支持的 key。

```json
{
  "issues": {
    "cold_tea": {
      // The title of the issue
      "title": "The tea is cold",
      // Translations for a fixable issue's repair flow, defined in the same way as translation for a configuration flow.
      // Exactly one of `fix_flow` or `description`. must be present.
      "fix_flow": {
        "abort": {
          "not_tea_time": "Can not re-heat the tea at this time"
        }
      }
    },
    "unfixable_problem": {
      "title": "This is not a fixable problem",
      // Description of the issue, exactly one of `fix_flow` or `description`. must be present.
      "description": "This issue can't be fixed by a flow."
    }
  }
}
```

### 设备

#### 设备名称

集成可以提供其设备名称的翻译。为此，提供一个 `device` 对象，该对象包含名称的翻译，并将设备的 `translation_key` 设置为 `device` 对象下某个 domain 对应的键。
如果设备的 `translation_key` 不为 `None`，则在 entity 的 `device_info` 属性中设置或通过 `DeviceRegistry.async_get_or_create` 传递的 `name` 将被忽略。如果 `device` 对象没有为指定的 `translation_key` 提供翻译后的名称，`translation_key` 将被用作设备名称。

翻译中也支持使用占位符。如果在翻译字符串中定义了占位符，则设备的 `translation_placeholders` 必须相应地设置。

以下示例 `strings.json` 适用于 `translation_key` 设置为 `power_strip` 的设备：

```json
{
  "device": {
    "power_strip": {
      "name": "Power strip"
    }
  }
}
```

以下示例 `strings.json` 适用于 `translation_key` 属性设置为 `n_ch_power_strip` 且包含占位符 `number_of_sockets` 的设备：

```json
{
  "device": {
    "n_ch_power_strip": {
      "name": "Power strip with {number_of_sockets} sockets"
    }
  }
}
```

### 实体

#### 实体名称

集成可以提供其实体名称的翻译。为此，提供一个 `entity` 对象，该对象包含名称的翻译，并将实体的 `translation_key` 属性设置为 `entity` 对象下某个 domain 对应的键。
如果实体的 `translation_key` 属性不为 `None` 且 `entity` 对象提供了翻译后的名称，`EntityDescription.name` 将被忽略。

实体名称的本地化仅支持将 [`has_entity_name`](/developers/core/entity.md#has_entity_name-true-mandatory-for-new-integrations) 属性设置为 `True` 的实体。

像 `sensor` 这样的 entity components 已经有现成的翻译可供通过引用复用。这包括基于 device class 的通用实体名称翻译。例如，它已经有 "Temperature" 传感器的翻译可供引用。优先使用引用现有翻译，因为它可以避免多次翻译相同内容。

翻译中也支持使用占位符。如果在翻译字符串中定义了占位符，则实体的 `translation_placeholders` 属性必须相应地设置。

以下示例 `strings.json` 适用于 `translation_key` 属性设置为 `thermostat_mode` 的 `sensor` 实体：

```json
{
  "entity": {
    "sensor": {
      "thermostat_mode": {
        "name": "Thermostat mode"
      }
    }
  }
}
```

以下示例 `strings.json` 适用于 `translation_key` 属性设置为 `temperature_sensor` 的 `sensor` 实体，其中使用了由 `sensor` 集成提供的共享翻译：

```json
{
  "entity": {
    "sensor": {
      "temperature_sensor": {
        "name": "[%key:component::sensor::entity_component::temperature::name%]"
      }
    }
  }
}
```

以下示例 `strings.json` 适用于 `translation_key` 属性设置为 `distance` 且包含占位符 `tracked_device` 的 `sensor` 实体：

```json
{
  "entity": {
    "sensor": {
      "distance": {
        "name": "Distance of {tracked_device}"
      }
    }
  }
}
```

#### 实体状态

如果基础 entity component 不提供翻译，或者基础 entity component 提供的翻译与集成的实体不匹配，集成可以提供其实体在 sensor 等其他集成下状态的翻译。为此，提供一个 `entity` 对象，该对象包含状态的翻译，并将实体的 `translation_key` 属性设置为 `entity` 对象下某个 domain 对应的键。

请注意，翻译后的 state 必须像所有其他翻译键一样为 `snake_case`。

为了区分实体及其翻译，请提供不同的 translation keys。以下示例 `strings.json` 适用于 Moon domain 下 `translation_key` 属性设置为 `phase` 的 `sensor` 实体：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "state": {
          "new_moon": "New moon",
          "first_quarter": "First quarter",
          "full_moon": "Full moon",
          "last_quarter": "Last quarter"
        }
      }
    }
  }
}
```

#### 实体状态属性

如果基础 entity component 不提供翻译，或者基础 entity component 提供的翻译与集成的实体不匹配，集成可以提供其实体在 sensor 等其他集成下状态属性的翻译。为此，提供一个 `entity` 对象，该对象包含实体状态属性的翻译，并将实体的 `translation_key` 属性设置为 `entity` 对象下某个 domain 对应的键。

请注意，翻译后的状态属性必须像所有其他翻译键一样为 `snake_case`。

为了区分实体及其翻译，请提供不同的 translation keys。以下示例 `strings.json` 适用于 `demo` domain 下 `translation_key` 属性设置为 `ubercool` 的 `climate` 实体，它具有自定义的 `fan_mode` 和 `swing_mode` 设置：

```json
{
  "entity": {
    "climate": {
      "ubercool": {
        "state_attributes": {
          "fan_mode": {
            "state": {
              "auto_high": "Auto High",
              "auto_low": "Auto Low",
              "on_high": "On High",
              "on_low": "On Low"
            }
          },
          "swing_mode": {
            "state": {
              "1": "1",
              "2": "2",
              "3": "3",
              "auto": "Auto",
              "off": "Off"
            }
          }
        }
      }
    }
  }
}
```

#### Entity component 状态

如果你的集成在其 domain 下提供实体，你将需要翻译这些状态。通过在 `entity_component` 字典下提供一个 `states` 对象来实现，该对象包含具有不同 device class 的状态的翻译。键 `_` 用于没有 device class 的实体。

```json
{
  "entity_component": {
    "problem": {
      "state": {
        "off": "OK",
        "on": "Problem"
      }
    },
    "safety": {
      "state": {
        "off": "Safe",
        "on": "Unsafe"
      }
    },
    "_": {
      "state": {
        "off": "[%key:common::state::off%]",
        "on": "[%key:common::state::on%]"
      }
    }
  }
}
```

#### Entity component 的实体属性名称和状态

:::info
实体属性名称和状态的翻译还需要前端支持，目前仅适用于 `climate` 实体。
:::

如果你的集成在其 domain 下提供实体，你将需要翻译实体属性名称以及实体状态属性。通过在 `entity_component` 字典中提供一个 `state_attributes` 对象来实现，该对象包含具有不同 device class 的实体属性的翻译。键 `_` 用于没有 device class 的实体。

```json
{
  "entity_component": {
    "_": {
      "state_attributes": {
        "aux_heat": { "name": "Aux heat" },
        "current_humidity": { "name": "Current humidity" },
        "current_temperature": { "name": "Current temperature" },
        "fan_mode": {
          "name": "Fan mode",
          "state": {
            "off": "[%key:common::state::off%]",
            "on": "[%key:common::state::on%]",
            "auto": "Auto",
            "low": "Low",
            "medium": "Medium",
            "high": "High",
            "top": "Top",
            "middle": "Middle",
            "focus": "Focus",
            "diffuse": "Diffuse"
          }
        }
      }
    }
  }
}
```

#### 实体测量单位

集成可以提供其实体测量单位的翻译。为此，提供一个 `entity` 对象，该对象包含单位的翻译，并将实体的 `translation_key` 属性设置为 `entity` 对象下某个 domain 对应的键。
如果实体的 `translation_key` 属性不为 `None` 且 `entity` 对象提供了翻译后的测量单位，则不应定义 `SensorEntityDescription.native_unit_of_measurement` 或 `NumberEntityDescription.native_unit_of_measurement`。

以下示例 `strings.json` 适用于 `translation_key` 属性设置为 `goal` 的 `sensor` 实体：

```json
{
  "entity": {
    "sensor": {
      "goal": {
        "unit_of_measurement": "steps"
      }
    }
  }
}
```

## 测试翻译

要测试翻译文件的更改，翻译字符串必须通过运行以下脚本编译到 Home Assistant 的翻译目录中：

```shell
python3 -m script.translations develop
```

如果翻译不显示，请清除浏览器缓存（MacOS 为 cmd + R，Windows 和 Linux 为 ctrl + F5）。

## 引入新字符串

要引入新字符串，请将其添加到 `strings.json` 或平台字符串文件中。尽可能多地引用通用字符串。通用字符串存放在 `homeassistant/strings.json` 中。你可以使用引用来引用这些翻译。例如：

```json
{
  "config": {
    "abort": {
      "already_configured": "[%key:common::config_flow::abort::already_configured_device%]"
    }
  }
}
```

包含字符串文件的 pull request 合并到 `dev` 分支后，字符串将自动上传到 Lokalise，贡献者可以在那里提交翻译。Lokalise 中的翻译字符串将被定期拉取到核心仓库中。
