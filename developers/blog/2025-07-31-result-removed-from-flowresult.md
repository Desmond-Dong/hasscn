`homeassistant.data_entry_flow.FlowResult` typed dict 中的 result 属性已被移除，现在仅在需要时才存在，即 `homeassistant.auth.models.AuthFlowResult` 和 `homeassistant.config_entries.ConfigFlowResult`。

此项变更预计不会影响自定义集成的运行时行为，但自定义集成作者可能需要更新测试以及任何派生自 `homeassistant.data_entry_flow.FlowResult` 且使用了 `result` 属性的类，以消除类型检查器的警告。
