# 修复

Home Assistant 会跟踪需要用户注意的问题。这些问题可能由集成引起，也可能来自 Home Assistant 本身。问题可以通过 `RepairsFlow` 解决，也可以通过链接到说明用户如何自行解决问题的网站来处理。

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

|属性|类型|默认值|说明|
| --------- | -------- | ------- | ----------- |
|`domain`|`str`| | 提出该问题的域|
|`issue_id`|`str`| | 问题标识符，必须在 `domain` 内唯一|
|`breaks_in_ha_version`|`str`|`None`| 问题在哪个 Home Assistant 版本中会造成破坏性影响|
|`data`|`dict`|`None`| 任意数据，不会展示给用户|
|`is_fixable`|`bool`| | 若问题可自动修复，则为 `True`|
|`is_persistent`|`bool`| | 若问题应在 Home Assistant 重启后继续保留，则为 `True`|
|`issue_domain`|`str`|`None`| 当集成代表其他集成创建问题时设置|
|`learn_more_url`|`str`|`None`| 用户可查看问题更多详情的 URL|
|`severity`|`IssueSeverity`| | 问题严重级别|
|`translation_key`|`str`| | 对问题进行简要说明的翻译键|
|`translation_placeholders`|`dict`|`None`| 会注入翻译文本中的占位符|

### 问题的严重性

要更好地了解选择哪个严重级别，请参阅下面的列表。

|问题严重级别|说明|
|---------------|--------------------------------------------------------------------|
|`critical`|保留级别，仅用于真正严重的紧急情况|
|`error`|当前已有功能损坏，需要立即关注|
|`warning`|未来将出现问题（例如 API 即将关闭），需要用户留意|

## 解决问题

如果问题的 `is_fixable` 设置为 `True`，用户就可以修复该问题。成功修复后，问题会从问题注册表中删除。
如果可以自动修复，应通过 `RepairsFlow` 来实现。

### 提供自动修复

在集成目录中创建一个名为 `repairs.py` 的新平台文件，并按以下模式添加代码。

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

### 问题持续存在

问题会保留在问题注册表中，直到创建它的集成将其删除，或者用户通过其[修复流程](#解决问题)解决它。

`is_persistent` 标志控制 Home Assistant 重启后是否仍应向用户显示该问题：

* 如果为问题设置了 `is_persistent`，重启后该问题会再次显示。适用于只能在问题发生时检测到的情况，例如更新失败、自动化中的未知操作等。
* 如果未设置 `is_persistent`，重启后该问题不会再次显示，直到集成再次创建它。适用于可重复检查的问题，例如磁盘空间不足。

### 被忽视的问题

用户也可以“忽略”问题。被忽略的问题会一直保持忽略状态，直到它被显式删除——无论是由集成删除，还是用户成功完成其[修复流程](#解决问题)——并且之后再次被创建。无论[问题持久性](#问题持续存在)如何，忽略状态在 Home Assistant 重启后依然有效。

## 删除问题

集成通常不需要删除问题，但在某些场景下这样做会很有用。

```python
from homeassistant.helpers import issue_registry as ir

ir.async_delete_issue(hass, DOMAIN, "manual_migration")
```
