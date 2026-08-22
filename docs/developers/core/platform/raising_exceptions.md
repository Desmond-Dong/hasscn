---
title: "抛出异常"
sidebar_label: "抛出异常"
---

## 在 service action handler 中抛出异常

像 service action 调用和 entity 方法（例如 *Set HVAC Mode*）这样的操作应该正确地抛出异常。

当用户做错了某事时，集成应抛出 `ServiceValidationError`（而不是 `ValueError`）。在这种情况下，堆栈跟踪仅在 debug 级别打印。

对于其他故障，如与设备通信时出现问题，应抛出 `HomeAssistantError`。请注意，在这种情况下，异常堆栈跟踪将被打印到日志中。

## 本地化异常

Home Assistant [支持本地化](/developers/internationalization/core#exceptions)，适用于 `HomeAssistantError` 及其子类如 `ServiceValidationError`。
