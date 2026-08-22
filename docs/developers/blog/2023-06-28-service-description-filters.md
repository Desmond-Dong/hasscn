---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "服务调用描述过滤器"
---

服务调用描述已更改以支持过滤。

可以为服务调用添加过滤器，以不显示不支持该服务调用的 entity；也可以为服务调用字段添加过滤器，以不向用户显示被选中 entity 不支持的字段。

例如：
- 仅当 light 支持亮度时，`light.turn_on` 的 `brightness` 服务调用参数才会显示。
- `climate.set_aux_heat` 服务调用仅允许选择支持辅助加热的 climate entity。

此功能在 core [PR #86162](https://github.com/home-assistant/core/pull/86162) 中引入，文档见[此处](/developers/dev_101_services#filtering-service-action-fields)。
