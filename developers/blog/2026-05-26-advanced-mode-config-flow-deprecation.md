## 摘要

用户资料中的 [advanced mode 即将移除](https://github.com/OpenHomeFoundation/roadmap/issues/54)，这意味着集成再也不能在 data entry flows 中检查 advanced mode 是否已启用。

集成作者需要更新集成，在 UI 中使用替代的用户友好方式来展示额外选项，例如将额外选项分组到一个 section 中。

### `FlowHandler.show_advanced_options`

`FlowHandler.show_advanced_options` 属性已被弃用，并将在 Home Assistant Core 2027.6 发布时移除。在弃用期间，`FlowHandler.show_advanced_options` 无条件返回 `True`，以避免由该 flag 控制选项的用户无法访问。

### `FlowHandler.context['show_advanced_options']`

`FlowHandler.context` 中不再存在 `show_advanced_options` key。

## 背景

用户资料中的 Advanced mode 开关是一个单一的 binary 开关，它控制着 Home Assistant 中一系列不相关功能的集合，从 app（add-on）可见性（Terminal & SSH）到配置选项和 UI 元素，我们在过去一年中一直在着手移除它。

更详细的解释，请参阅 [roadmap issue #54](https://github.com/OpenHomeFoundation/roadmap/issues/54)。
