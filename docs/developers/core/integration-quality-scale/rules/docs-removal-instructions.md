---
title: "该文档提供了删除说明"
description: '从 Home Assistant 中删除设备或服务并不总是那么简单。 该文档应提供有关如何删除设备或服务的明确说明。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 该文档提供了删除说明

## 推理

从 Home Assistant 中删除设备或服务并不总是那么简单。
该文档应提供有关如何删除设备或服务的明确说明。

## 实施示例

```markdown showLineNumbers
## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to the app of the manufacturer and remove the Home Assistant integration from there as well.
```

## 例外情况

这条规则没有例外。
