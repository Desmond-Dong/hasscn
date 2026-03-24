---
title: CGroup 版本
description: 关于 CGroup 版本为何将安装标记为不支持的更多信息。
---

## 问题

Supervisor 更倾向于 CGroups 版本 2，因为它依赖于其功能才能正常工作。

您的系统上的 CGroups 似乎不可用或使用了未知的 CGroups 版本。

## 解决方案

确保您的操作系统上 CGroups v2 可用且已启用。

您不应该在 Home Assistant OS 上看到此问题，因为所有版本的 OS 都附带支持的 CGroup 版本。