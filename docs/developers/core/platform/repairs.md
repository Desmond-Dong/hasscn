---
title: "维修"
sidebar_label: "维修"
---

Home Assistant 会跟踪需要引起用户注意的问题。这些问题可以由集成或 Home Assistant 本身创建。问题可以通过 RepairsFlow 修复，也可以通过链接到包含用户自行解决方法的网站来修复。

维修问题也是面向用户的集成中 [deprecation](/developers/deprecating) 的宣布方式，这是它们最常见的用途之一。Core API 的 deprecation 则通过日志警告报告给开发者。

## 创建问题

```python
from homeassistant.helpers import issue_registry as ir

ir.async_create_issue(
    hass,
    DOMAIN,
    "manual_migration",
    breaks_in_ha_version="2022.9.0",
    is_fixable=False,
    severity=ir.IssueSeverity.ERROR,
    translation_key="manual_migration",
)
```

| 属性 | 类型 | 默认值 | 描述 |
| --------- | -------- | ------- | ----------- |
| domain | string | | 引发该问题的 domain |
| issue_id | string | | 问题的标识符，在 `domain` 内必须唯一 |
| breaks_in_ha_version | string | `None` | 问题成为破坏性的版本 |
| data | dict | `None` | 任意数据，不向用户显示 |
| is_fixable | boolean | | 如果问题可以自动修复则为 True |
| is_persistent | boolean | | 如果问题应在 Home Assistant 重启后持续存在则为 True |
| issue_domain | string | `None` | 由代为其他集成创建问题的集成设置 |
| learn_more_url | string | `None` | 用户可以查找更多关于问题详细信息的 URL |
| severity | IssueSeverity |  | 问题的严重程度 |
| translation_key | str |  | 包含问题简要说明的 translation key |
| translation_placeholders | dict | `None` | 将注入到翻译中的占位符 |

### 问题的严重程度

为了更好地理解应选择哪个严重程度级别，请参阅下面的列表。

| IssueSeverity | 描述 |
|---------------|--------------------------------------------------------------------|
| CRITICAL | 保留级别，仅用于真正的紧急情况 |
| ERROR | 当前有某事物已损坏，需要立即关注 |
| WARNING | 将来某事物将损坏（例如 API 关闭），需要关注 |

## 修复问题

如果问题的 `is_fixable` 设置为 `True`，用户将被允许修复该问题。成功修复的问题将从 issue registry 中移除。

如果可以进行自动修复，应使用 RepairsFlow 来实现。

### 提供自动修复

在集成文件夹中创建一个名为 `repairs.py` 的新 platform 文件，并根据下面的模式添加代码。

```python
from __future__ import annotations

import voluptuous as vol

from homeassistant import data_entry_flow
from homeassistant.components.repairs import ConfirmRepairFlow, RepairsFlow
from homeassistant.core import HomeAssistant


class Issue1RepairFlow(RepairsFlow):
    """Handler for an issue fixing flow."""

    async def async_step_init(
        self, user_input: dict[str, str] | None = None
    ) -> data_entry_flow.FlowResult:
        """Handle the first step of a fix flow."""

        return await (self.async_step_confirm())

    async def async_step_confirm(
        self, user_input: dict[str, str] | None = None
    ) -> data_entry_flow.FlowResult:
        """Handle the confirm step of a fix flow."""
        if user_input is not None:
            return self.async_create_entry(title="", data={})

        return self.async_show_form(step_id="confirm", data_schema=vol.Schema({}))


async def async_create_fix_flow(
    hass: HomeAssistant,
    issue_id: str,
    data: dict[str, str | int | float | None] | None,
) -> RepairsFlow:
    """Create flow."""
    if issue_id == "issue_1":
        return Issue1RepairFlow()
```

## 问题生命周期

### 问题持久性

问题将保留在 issue registry 中，直到被创建它的集成或用户通过[修复](#fixing-an-issue)将其移除。

`is_persistent` 标志控制问题是否应在 Home Assistant 重启后向用户显示：

- 如果设置了 `is_persistent` 标志，问题将在重启后再次向用户显示。适用于只能在发生时检测到的问题（更新失败、自动化中未知操作）。
- 如果未设置 `is_persistent` 标志，问题将在重启后不再向用户显示，直到其集成重新创建它。适用于可以检查的问题，如磁盘空间不足。

### 被忽略的问题

用户可以"忽略"问题。被忽略的问题将被忽略，直到被明确删除——由集成删除或用户成功走完其[维修流程](#fixing-an-issue)——并重新创建。忽略问题在 Home Assistant 重启后仍然生效，无论[问题持久性](#issue-persistence)如何。

## 删除问题

集成通常不需要删除问题，但在某些情况下可能有用。

```python
from homeassistant.helpers import issue_registry as ir

ir.async_delete_issue(hass, DOMAIN, "manual_migration")
```
