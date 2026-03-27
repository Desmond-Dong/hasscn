---
title: "抛出异常"
description: '服务操作调用以及实体方法（例如设置 HVAC 模式）等操作，都应正确抛出异常。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 抛出异常

## 在服务操作处理程序中引发异常

服务操作调用以及实体方法（例如*设置 HVAC 模式*）等操作，都应正确抛出异常。

当用户输入有误时，集成应抛出 `ServiceValidationError`（而不是 `ValueError`）。在这种情况下，堆栈跟踪只会在调试级别输出。

对于其他故障，例如与设备通信时出现的问题，应抛出 `HomeAssistantError`。请注意，这种情况下异常堆栈跟踪会写入日志。

## 本地化异常

对于 `HomeAssistantError` 及其子类（如 `ServiceValidationError`），Home Assistant [支持异常本地化](/developers/internationalization/core#exceptions)。
