在 2022.7 之前，可以在 config entry 仍在设置过程中触发其重新加载。在 config entry 设置期间重新加载通常会导致意外的失败模式，需要重启 Home Assistant 才能使 config entry 恢复到正常状态。现在在设置期间尝试重新加载会抛出 `OperationNotAllowed` 异常。
