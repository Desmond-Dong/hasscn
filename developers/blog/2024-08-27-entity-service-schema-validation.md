注册 entity service action 允许集成作者传入：

* 无 schema（`None`）
* 一个字典，它将通过传递给 `cv.make_entity_service_schema` 转换为 voluptuous schema
* 一个自定义的 voluptuous schema

对于第三种情况，当使用不满足以下至少一个条件的自定义 schema 注册 entity action 时，现在将记录一条警告：

* 由 `cv.make_entity_service_schema` 返回的 validator
* 由 `cv.make_entity_service_schema` 返回的 validator，包裹在 `vol.Schema` 中
* 由 `cv.make_entity_service_schema` 返回的 validator，包裹在 `vol.All` 中

在 Home Assistant Core 2025.10 中，将不再能够注册不满足此要求的自定义 schema 的 entity action。

更改的原因是，如果未使用 `cv.make_entity_service_schema`，service 将不会自动支持所有可能的 entity 定向方式。

更多详情请参阅 [开发者文档](/developers/dev_101_services.md#entity-service-actions) 以及 core PR [#124102](https://github.com/home-assistant/core/pull/124102) 和 [#125057](https://github.com/home-assistant/core/pull/125057)。
