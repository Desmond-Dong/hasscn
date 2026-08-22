---
title: "文档描述了已知支持 / 不支持的设备"
sidebar_label: 🥇 docs-supported-devices
---

## 原理说明

许多 Home Assistant 用户会根据 Home Assistant 是否支持来决定购买哪些设备。
为了让用户更容易确认某设备是否受支持，文档应描述已知支持或不支持的设备。
这将减少用户尝试设置设备时才得知设备不受支持所带来的糟糕体验。

## 示例实现

```markdown showLineNumbers

## 支持的设备

以下设备已知受该集成支持：
- Device 1
- Device 2
- 所有运行 MyOS 的设备

## 不支持的设备

以下设备不受该集成支持：
- Device 3
- 2010 年之前生产的设备
```

## 例外情况

本规则不适用于不连接设备或服务的集成。
本规则也不适用于不集成物理设备的集成。
