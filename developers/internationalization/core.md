# 后端本地化

## 翻译字符串

平台 翻译字符串以 JSON 形式存储在[Core](https://github.com/home-assistant/core)存储库。这些文件必须位于与其所属的 component/platform 相邻的位置。组件必须有自己的目录，并且该目录中的文件简单地命名为 `strings.json`。该文件将包含可翻译的不同字符串。

`strings.json` 包含 集成 提供的需要翻译的不同内容的翻译。

|类别|描述|
| ------------------- | ------------------------------------------------- |
|`title`|集成 的标题。|
|`common`|共享字符串。|
|`config`|配置流 的翻译。|
|`device`|设备 的翻译。|
|`device_automation`|设备 自动化的翻译。|
|`entity`|实体 的翻译。|
|`entity_component`|实体 组件的翻译。|
|`exceptions`|错误消息的翻译。|
|`issues`|修复问题的翻译。|
|`options`|选项流 的翻译。|
|`selectors`|集成 的选择器。|
|`services`|集成 的维修操作。|

### 标题

这个类别只是一个字符串：集成 名称的翻译。该键是可选的，如果省略，Home Assistant 将回退到 集成 名称。仅当它不是产品品牌时才包含此内容。

### 共享字符串

多次使用的字符串不应重复，而应使用引用来引用单个定义。参考可以是任何有效的翻译密钥。 （可选）共享字符串可以放置在 `common` 部分中。

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

### 配置/选项/子条目 流程

配置流处理程序、选项流处理程序和 配置子条目 处理程序的翻译字符串分别在 `config`、`options` 和 `config_subentries` 键下定义。

请注意，`config_subentries` 是映射的映射，其中键是 集成 支持的 子条目 类型。

下面的示例字符串文件描述了受支持的不同键。尽管该示例显示了配置流的转换，但选项和 子条目 流转换遵循相同的格式。

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

选择器的翻译是在 `selector` 键下定义的。它支持选择器 `select` 的选项标签翻译。 集成 应在选择器选择配置上设置 `translation_key`。这允许对配置和 选项流 中使用的选择器进行翻译。下面的示例字符串文件描述了受支持的不同键。

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

数字选择器的 `unit_of_measurement` 也可以使用翻译键进行翻译：

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

### 服务行动

服务操作字符串的翻译在 `services` 键下定义。

支持翻译每个动作的`name`和`description`，
每个动作的`fields`的`name`和`description`，以及`name`和`description`
字段的每个可折叠部分。

请注意，`name` 和 `description` 字段的翻译
显示在可折叠部分中的内容应位于 `fields` 键下。

设置描述占位符[服务操作已注册](/developers/dev_101_services.md#service-action-description-example).

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
      "description": "Sets fan speed. [Learn more.](/developers/{docs_url})",
      "fields": {
        "speed": {
          "name": "Speed",
          "description": "The speed to set."
        }
      },
      "sections": {
        "advanced_fields": {
          "name": "Advanced options"
        }
      }
    }
  }
}
```

:::note
服务操作可以使用其 `fields` 中的选择器。可以使用 services.yaml 文件中选择器定义上的 `translation_key` 属性来提供这些选择器的转换。请参阅[选择器](#selectors)部分和[服务动作说明](/developers/dev_101_services.md#service-action-descriptions)页面了解更多信息。
:::

### 设备 自动化

设备 自动化的翻译字符串在 `device_automation` 键下定义。下面的示例字符串文件描述了受支持的不同键。

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

### 例外情况

`HomeAssistantError` 及其子类支持本地化。
异常的翻译字符串在 `strings.json` 文件中的 `exception` 键下定义。下面的示例描述了受支持的不同键。

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

在服务操作调用期间引发本地化异常的示例：

```python
async def async_select_index(hass: HomeAssistant, index: int) -> None:
    """Setup the config entry for my device."""
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

修复问题的翻译字符串在 `issues` 键下定义。下面的示例字符串文件描述了受支持的不同键。

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

#### 设备 名称

集成可以提供其设备名称的翻译。为此，请提供一个 `device` 对象，其中包含名称的翻译，并将 设备 的 `translation_key` 设置为 `device` 对象中域下的密钥。
如果 设备 的 `translation_key` 不是 `None`，则在 实体 的 `device_info` 属性中设置或传递给 `DeviceRegistry.async_get_or_create` 的 `name` 将被忽略。如果 `device` 对象没有为指定的 `translation_key` 提供翻译名称，则 `translation_key` 将用作 设备 名称。

还支持在翻译中使用占位符。如果在翻译字符串中定义了占位符，则必须相应地设置 设备 的 `translation_placeholders`。

以下示例 `strings.json` 适用于 设备，其 `translation_key` 设置为 `power_strip`：

```json
{
  "device": {
    "power_strip": {
      "name": "Power strip"
    }
  }
}
```

以下示例 `strings.json` 适用于 设备，其 `translation_key` 属性设置为 `n_ch_power_strip` 且占位符设置为 `number_of_sockets`：

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

#### 实体 名称

集成可以提供其实体名称的翻译。为此，请提供一个包含名称翻译的 `entity` 对象，并将 实体 的 `translation_key` 属性设置为 `entity` 对象中域下的键。
如果 实体 的 `translation_key` 属性不是 `None` 并且 `entity` 对象提供翻译名称，则 `EntityDescription.name` 将被忽略。

仅 实体 支持 实体 名称的本地化，该 实体 设置了[`has_entity_name`](/developers/core/entity.md#has_entity_name-true-mandatory-for-new-integrations)属性为 `True`。

实体 组件（如 `sensor`）已经具有可用的现有翻译，可以通过引用这些翻译来重用。这包括基于 设备 类的 实体 名称的常见翻译。例如，它已经提供了可供参考的“温度”传感器的翻译。首选引用现有翻译，因为它可以防止多次翻译相同的内容。

还支持在翻译中使用占位符。如果在翻译字符串中定义了占位符，则必须相应地设置 实体 的 `translation_placeholders` 属性。

以下示例 `strings.json` 适用于 `sensor` 实体，其 `translation_key` 属性设置为 `thermostat_mode`：

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

以下示例 `strings.json` 适用于 `sensor` 实体，其 `translation_key` 属性设置为 `temperature_sensor`，其中使用 `sensor` 集成 提供的共享转换：

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

以下示例 `strings.json` 适用于 `sensor` 实体，其 `translation_key` 属性设置为 `distance` 且占位符设置为 `tracked_device`：

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

#### 实体的状态

如果基本 实体 组件不提供转换，或者如果基本 实体 组件提供的转换与 集成 的 实体 不匹配，则 集成 可以在其他 集成 类似传感器下为其 实体 的状态提供转换。为此，请提供一个包含状态转换的 `entity` 对象，并将 实体 的 `translation_key` 属性设置为 `entity` 对象中域下的键。

请注意，翻译状态必须是 `snake_case`，就像所有其他翻译键一样。

为了区分实体及其翻译，请提供不同的翻译键。以下示例 `strings.json` 适用于 Moon 域 `sensor` 实体，其 `translation_key` 属性设置为 `phase`：

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

如果基础 实体 组件不提供转换，或者如果基础 实体 组件提供的转换与 集成 的 实体 不匹配，则 集成 可以在其他 集成 类似传感器下为其 实体 的状态属性提供转换。为此，请提供一个 `entity` 对象，其中包含 实体 状态属性的转换，并将 实体 的 `translation_key` 属性设置为 `entity` 对象中域下的键。

请注意，转换状态属性必须是 `snake_case`，就像所有其他转换键一样。

为了区分实体及其翻译，请提供不同的翻译键。以下示例 `strings.json` 适用于 `demo` 域 `climate` 实体，其 `translation_key` 属性设置为 `ubercool`，它具有自定义 `fan_mode` 和 `swing_mode` 设置：

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

#### 实体 组件状态

如果您的 集成 在其域下提供 实体，您将需要翻译这些状态。您可以通过在 `entity_component` 字典下提供 `states` 对象来完成此操作，该对象包含具有不同 设备 类的状态的翻译。密钥 `_` 用于没有 设备 类的 实体。

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

#### 实体 实体 组件的属性名称和状态

:::info
实体属性名称和状态的翻译还需要qUIres 前端支持，目前仅适用于`climate` 实体。
:::

如果您的 集成 在其域下提供 实体，您将需要翻译 实体 属性的名称以及 实体 状态属性。您可以通过在 `entity_component` 字典中提供 `state_attributes` 对象来完成此操作，该对象包含具有不同 设备 类的 实体 属性的翻译。密钥 `_` 用于没有 设备 类的 实体。

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

#### 实体的计量单位

集成可以为其实体提供计量单位的翻译。为此，请提供一个包含单位转换的 `entity` 对象，并将 实体 的 `translation_key` 属性设置为 `entity` 对象中域下的键。
如果 实体 的 `translation_key` 属性不是 `None` 并且 `entity` 对象提供转换的测量单位，则不应定义 `SensorEntityDescription.native_unit_of_measurement` 或 `NumberEntityDescription.native_unit_of_measurement`。

以下示例 `strings.json` 适用于 `sensor` 实体，其 `translation_key` 属性设置为 `goal`：

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

为了测试对翻译文件的更改，必须通过运行以下脚本将翻译字符串编译到 Home Assistant 的翻译目录中：

```shell
python3 -m script.translations develop
```

如果未显示翻译，请清除浏览器缓存（cmd + R（适用于 MacOS）、ctrl + F5（Windows 和 Linux））

## 引入新字符串

要引入新字符串，请将它们添加到 `strings.json` 或 平台 字符串文件中。尝试尽可能多地引用常用字符串。常见字符串位于 `homeassistant/strings.json` 中。您可以使用参考文献来参考这些翻译。例如：

```json
{
  "config": {
    "abort": {
      "already_configured": "[%key:common::config_flow::abort::already_configured_device%]"
    }
  }
}
```

带有字符串文件的拉取请求合并到 `dev` 分支后，字符串将自动上传到 Lokalise，贡献者可以在其中提交翻译。 Lokalise 中翻译的字符串将定期拉入 Core 存储库。
