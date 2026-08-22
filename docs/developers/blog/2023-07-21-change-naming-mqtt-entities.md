---
author: Jan Bouwhuis
authorURL: https://twitter.com/jbouwh
title: MQTT entities 命名变更为符合 HA 指南
---

MQTT entities 的命名方式，以及发现的 entity 之间如何共享 device 配置，已发生改变。

### 共享 device 配置

发现的 MQTT entities 可以共享 device 配置，即一个 entity 可以包含完整的 device 配置，其他 entity 仅通过设置必填字段即可链接到该 device。此前必填字段至少包含 `connection` 和 `identifiers` 中的一个，现已扩展为至少包含 `connection` 和 `identifiers` 中的一个，以及 `name`。

### MQTT entities 的命名

MQTT entities 的命名已更改，以符合[entity 命名指南](https://developers.home-assistant.io/docs/core/entity/#entity-naming)：

- 所有 MQTT entities 的 `has_entity_name` 将被设置为 `True`
- 未命名的 `binary_sensor`、`button`、`number` 与 `sensor` entities 现在将以其 device class 命名，而不再命名为 `MQTT binary sensor` 等
- 现在允许将 MQTT entity 的 name 设置为 `None`，以标记其为 device 的主要功能
