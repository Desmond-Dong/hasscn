---
author: epenet
authorURL: https://github.com/epenet
title: "对 config flow unique ID 的新检查"
---

### 变更摘要

创建带有已在注册表中存在的 unique ID 的 config entry 已被弃用，现在将会记录警告。

### 详情

当 config flow 创建一个具有冲突 unique ID 的 entry 时，旧 entry 当前会被自动移除并替换为新的 config entry。
这可能导致意外的行为，集成应调整为中止 flow。

对于手动 flow，集成应实现 options、reauth、reconfigure，以允许用户更改设置。
对于非用户可见的 flow，集成应在中止前可选择更新现有 entry。

更多详情请参阅 [config flow](/developers/core/integration/config_flow#unique-id-requirements) 文档。