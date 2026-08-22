---
author: Allen Porter
authorURL: https://github.com/allenporter
title: "Calendar Data Model 改进和弃用"
---

从 Home Assistant Core 2022.5 开始，`CalendarDeviceEntity` 已被弃用，并由 `CalendarEntity` 取代。新 entity 拥有更明确的数据模型和简化的 websocket API。`CalendarDeviceEntity` 将在未来的 Home Assistant 版本中移除，custom components 需要迁移到新的 API。详情请参见新的 [Calendar Entity](https://developers.home-assistant.io/docs/core/entity/calendar) 开发者文档。
