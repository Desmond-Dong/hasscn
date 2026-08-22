---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "注册 platform entity service 的改进 API"
---

Platform entity service 应通过从集成的 `async_setup` 调用 helper [`service.async_register_platform_entity_service`](/developers/dev_101_services?_highlight=async_register_platform_entity_service#entity-service-actions) 来注册，而不是在 platform set up 期间调用 `platform.async_register_entity_service`。

现有集成应迁移到新 API，以确保加载 service 不依赖于 platform setup。

有关迁移示例，请参阅 [core PR 152172](https://github.com/home-assistant/core/pull/152172) 和 [core PR 152047](https://github.com/home-assistant/core/pull/152047)。