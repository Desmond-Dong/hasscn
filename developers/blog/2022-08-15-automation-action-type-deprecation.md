对于 Home Assistant Core 2022.9，我们弃用了来自 `homeassistant/components/automation/__init__.py` 的 `AutomationActionType`、`AutomationTriggerInfo` 和 `AutomationTriggerData`。
它们被来自 `homeassistant/helpers/trigger.py` 的 `TriggerActionType`、`TriggerInfo` 和 `TriggerData` 替代。

| 旧 | 新 |
| --- | --- |
| `AutomationActionType` | `TriggerActionType` |
| `AutomationTriggerInfo` | `TriggerInfo` |
| `AutomationTriggerData` | `TriggerData` |

此外，我们建议将 `async_attach_trigger` 函数的 `automation_info` 参数名更新为 `trigger_info`。
