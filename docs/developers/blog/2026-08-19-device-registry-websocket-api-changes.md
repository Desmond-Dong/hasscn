---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Device registry WebSocket API 变更"
---

## 摘要

本文描述了 device registry **WebSocket API** 的变更——由 frontend、自定义卡片和其他 WebSocket clients 消费的 commands 和 device serialization。它们源于 device registry 的两项变更：

- **将每个 device 限制为单个 config entry**（Home Assistant Core 2026.8）。此变更的 Python API 方面在 companion post [Devices are restricted to a single config entry and at most one subentry](/developers/blog/2026-07-21-device-registry-single-config-entry) 中描述。
- **引入 [child devices](#device-list-中的-child-devices)**（Home Assistant Core 2026.9，[architecture proposal #1414](https://github.com/home-assistant/architecture/discussions/1414)）。

大多数 clients 只通过 `config/device_registry/list` 读取 devices，新的 device fields 是 additive 的，因此无需任何更改即可保持工作——但遍历 device list 的 clients 应准备好遇到 child devices，它们被序列化得不同。移除 devices 或检查 device 的 config entries 的 clients 请继续阅读。

## 新的 device fields：`config_entry_id` 和 `config_subentry_id`

`config/device_registry/list` 返回的每个 device，以及 `EVENT_DEVICE_REGISTRY_UPDATED` payload 中的每个 device，现在都携带两个新 fields：

- `config_entry_id` — device 所属的单个 config entry 的 id。
- `config_subentry_id` — device 所属的单个 config subentry 的 id，或 `null`。

它们取代了以前的 fields，这些 fields 建模了可以跨多个 config entries 和 subentries 的 device：

- `config_entries` — config entry ids 的 list。
- `config_entries_subentries` — 从 config entry id 到 subentry ids list 的 map。
- `primary_config_entry` — device 的 primary config entry 的 id。

旧 fields **为了向后兼容而保留，并已弃用**；计划在家 Home Assistant Core 2027.8 中移除。在弃用期间，它们从新值派生：device 将 `config_entries` 报告为单元素 list `[config_entry_id]`，将 `config_entries_subentries` 报告为 `{config_entry_id: [config_subentry_id]}`，`primary_config_entry` 等于 `config_entry_id`。

更新你的 client 以读取 `config_entry_id` 和 `config_subentry_id`。

## Device list 中的 child devices {#device-list-中的-child-devices}

Home Assistant Core 2026.9 引入了 **child devices**（[architecture proposal #1414](https://github.com/home-assistant/architecture/discussions/1414)，core [PR #178666](https://github.com/home-assistant/core/pull/178666)）。Child device 是 parent device 的轻量级逻辑部分：它没有自己的硬件或固件 metadata，并通过 `parent_device_id` 引用其 parent。Parent 必须由相同的 config entry 注册，并属于相同的 config subentry。

`config/device_registry/list` 现在将 child devices 与普通 devices 一起返回，因此其结果是两种 entry 的混合。Child device 以更小的 field 集合进行序列化：

```json
{
  "id": "child1234",
  "parent_device_id": "abcd1234",
  "config_entry_id": "wxyz5678",
  "config_subentry_id": null,
  "area_id": null,
  "name": "Left channel",
  "name_by_user": null,
  "labels": [],
  "identifiers": [["demo", "left"]],
  "disabled_by": null,
  "created_at": 1723987200.0,
  "modified_at": 1723987200.0
}
```

与普通 device 相比，child device **没有** `connections`、`via_device_id`、`configuration_url`、`entry_type`、`manufacturer`、`model`、`model_id`、`hw_version`、`sw_version`、`serial_number`、`primary_config_entry`、`config_entries` 或 `config_entries_subentries`。读取 device list 的 clients 不能假设每个 entry 都携带这些 fields。

区分两者的可靠方式是 `parent_device_id` field：它仅出现在 child devices 上且非 null。普通 device 携带的是 `via_device_id`。

没有自己 `area_id` 的 child device 继承其 parent 的 area，因此 client 在解析 child device 的 area 时，如果 child 的 `area_id` 为 `null`，应回退到 parent device。

两个相关 commands 也理解 child devices：

- `config/device_registry/update` 接受 child device id——设置 `area_id`、`disabled_by`、`labels` 或 `name_by_user`——并以上述缩减序列化返回更新后的 child device。
- `config/device_registry/list_linked_devices` 总是为 child device 返回空的 `linked_devices` list，因为 child 共享其 parent 的 per-config-entry identifier 命名空间，并且永远不会链接到其他 config entries 的 devices。

## 新 command：`config/device_registry/remove`

一个新的 WebSocket command 按 id 移除 device：

```json
{
  "type": "config/device_registry/remove",
  "device_id": "abcd1234"
}
```

由于 device 现在恰好属于一个 config entry，从该 config entry 移除它就移除了 device。该 command 需要 admin，并且以错误 `Cannot remove a composite device` 拒绝[composite device id](#composite-devices)。

它取代了 `config/device_registry/remove_config_entry`，该 command 同时接收 `device_id` 和 `config_entry_id`：

```json
{
  "type": "config/device_registry/remove_config_entry",
  "config_entry_id": "wxyz5678",
  "device_id": "abcd1234"
}
```

该 command 仍然有效但已**弃用**：它记录警告，并将在 Home Assistant Core 2027.9 中移除。它的 `config_entry_id` 参数现在仅用于检查它与 device 的 config entry 匹配——不匹配会失败并返回 `Config entry not in device`——无论传递哪个 config entry，device 都会被移除。更新 clients 调用 `config/device_registry/remove` 并去掉 `config_entry_id`。

在 core [PR #178319](https://github.com/home-assistant/core/pull/178319) 中实现。

## 新 command：`config/device_registry/list_linked_devices`

由于 connections 和 identifiers 现在在每个 config entry 中唯一，由多个集成支持的物理设备由每个 config entry 一个 device 表示，而不是单个共享 device。该 command 返回与给定 device 共享 connection 或 identifier 的其他 devices——在不同 config entries 下表示相同物理硬件的 sibling devices：

```json
{
  "type": "config/device_registry/list_linked_devices",
  "device_id": "abcd1234"
}
```

结果：

```json
{
  "linked_devices": ["ef567890", "12ab34cd"]
}
```

被查询的 device 本身被排除在结果之外。这让 client（例如）可以从 device page 链接到表示相同硬件的其他 devices。在 core [PR #177449](https://github.com/home-assistant/core/pull/177449) 中实现。

## 新 command：`config/device_registry/list_composite_splits` {#composite-devices}

当 device registry 加载时，每个跨多个 config entries 的迁移前 device 被拆分为每个 config entry 一个 device，原始的（"composite"）device id 不再指向注册的 device。Composite device ids 仍被 automations、scripts、dashboards 和 target pickers 引用，因此该 command 将每个 composite device id 映射到它被拆分成的 devices：

```json
{
  "type": "config/device_registry/list_composite_splits"
}
```

结果：

```json
{
  "old_composite_id": {
    "split_ids": ["ef567890", "12ab34cd"],
    "primary_id": "ef567890"
  }
}
```

对于每个 composite device id，`split_ids` 列出替代 device ids，`primary_id` 是继承了 composite 先前 primary config entry 的拆分，或 `null`。用它将存储的 composite device id 解析为当前 device——例如，在存储的 id 是 composite id 时保持 device picker 工作。在 core [PR #176693](https://github.com/home-assistant/core/pull/176693) 中实现。

Companion post 的 [Backwards compatibility](/developers/blog/2026-07-21-device-registry-single-config-entry#backwards-compatibility) 部分描述了弃用期间行为的其余部分，例如针对 composite device id 的 actions 级联到拆分 devices。

## Device registry 事件

订阅 `device_registry_updated` events（`EVENT_DEVICE_REGISTRY_UPDATED`）的 clients 看到两个变更，镜像了 Python API：

- `update` 事件的 `changes` map 用 `config_entry_id` 和 `config_subentry_id` keys 报告 device 移动，取代先前的 `config_entries` 和 `config_entries_subentries`。
- Device 现在属于单个 config entry，因此它不能再丢失一个 config entry 同时继续存在用于另一个。Device 丢失其 config entry 现在是一个 `remove` event 而不是 `update`。

详情请参阅 companion post 中的 [Device registry events](/developers/blog/2026-07-21-device-registry-single-config-entry#device-registry-events)。
