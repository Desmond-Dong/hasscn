---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "支持 config subentries"
---

Config entries 现在新增了一种称为“config subentry”的数据类型。[Config subentries](/developers/config_entries_index#config-subentries) 由 config entry 拥有，并在 `async_setup_entry` 期间设置。Config subentries 由 [config subentry flows](/developers/core/integration/config_flow#subentry-flows) 创建，并通过 config subentry reconfigure flows 更新。这与我们创建/编辑 config entries 的方式类似。

这使得集成作者可以更方便地允许用户添加、修改和移除共享某些公共资源（例如 cloud 账号或 MQTT broker）的配置片段。

[架构讨论](https://github.com/home-assistant/architecture/discussions/1070) 提供了更多背景信息。