---
author: epenet
authorURL: https://github.com/epenet
title: "OptionsFlow 新增辅助属性"
---

### 变更摘要

`OptionsFlow` 中新增了几个 helper 属性：
- `self._config_entry_id` 提供 config entry 的 ID
- `self.config_entry` 返回 config entry

### 向后兼容性

直到 Home Assistant Core 2025.12，仍可以手动设置 `self.config_entry`，但这样做会记录一条警告，提示用户在该自定义集成的 bug tracker 上提 issue。

新代码：
```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler()

class OptionsFlowHandler(OptionsFlow):
    """Options flow handler."""

    def __init__(self) -> None:
        """Initialize options flow."""
        self._conf_app_id: str | None = None
```

旧的带 `OptionsFlow` 属性的代码：
```python
@staticmethod
@callback
def async_get_options_flow(
    config_entry: ConfigEntry,
) -> OptionsFlowHandler:
    """Create the options flow."""
    return OptionsFlowHandler(config_entry)

class OptionsFlowHandler(OptionsFlow):
    """Options flow handler."""

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize options flow."""
        self.config_entry = config_entry
        self._conf_app_id: str | None = None
```

### OptionsFlowWithConfigEntry 的特殊处理

`OptionsFlowWithConfigEntry` 类的主要目的是提供 `self.config_entry` 属性，而该属性现在已由父类提供。
目前尚无移除 `OptionsFlowWithConfigEntry` 类的计划，但保留它仅为了向后兼容，新代码应避免使用。

希望移除对 `OptionsFlowWithConfigEntry` 引用的自定义集成需要考虑它们是如何引用 `self.options` 的：
- 如果没有引用 `self.options`，则迁移到 `OptionsFlow` 很简单（见 [PR #129651](https://github.com/home-assistant/core/pull/129651)）
- 如果你只是读取 options 值，则建议将读取改为 `self.config_entry.options`（见 [PR #129895](https://github.com/home-assistant/core/pull/129895)）
- 如果在单个 step 内更新/修改 options 值，则可能需要先复制 options（`options = deepcopy(dict(self.config_entry.options))`，见 [PR #129928](https://github.com/home-assistant/core/pull/129928)）
- 如果在多个 step 中更新/修改 options 值，则可能需要在类初始化时复制 options（`self.options = deepcopy(dict(config_entry.options))`，见 [PR #129890](https://github.com/home-assistant/core/pull/129890)）

更多详情请参阅 [options flow](/developers/core/integration/options_flow) 文档。