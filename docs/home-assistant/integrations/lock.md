---
title: Lock
description: '此集成会跟踪你环境中的门锁及其状态，并允许你控制它们。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Lock
ha_release: 0.9
ha_quality_scale: internal
ha_domain: lock
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Lock

此集成会跟踪你环境中的门锁及其状态，并允许你控制它们。

- 为每把门锁维护单独状态，并提供组合状态 `all_locks`。
- 注册 `lock.lock`、`lock.unlock` 和 `lock.open`（释放门闩）操作来控制门锁。

:::note Building block integration
This lock is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this lock building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the lock building block offers.
:::

## 门锁实体的状态

门锁实体可以具有以下状态：

- **Jammed**：门锁当前卡住。
- **Open**：表示门锁当前是否处于打开状态。
- **Opening**：表示门锁当前是否正在打开。
- **Locked**：门锁当前已锁定。
- **Locking**：门锁当前正在锁定过程中。
- **Unlocked**：门锁当前已解锁。
- **Unlocking**：门锁当前正在解锁过程中。
- **Unavailable**：实体当前不可用。
- **Unknown**：当前状态未知。

## 操作

门锁集成提供以下操作：

### 操作：Lock

`lock.lock` 操作用于锁门。

| Data attribute | Optional | Description                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | no       | 相关门锁的实体。             |

#### 示例

```yaml
actions:
  action: lock.lock
  target:
    entity_id: lock.my_place
```

### 操作：Unlock

`lock.unlock` 操作用于开锁。

| Data attribute | Optional | Description                  |
| -------------- | -------- | ---------------------------- |
| `entity_id`    | no       | 相关门锁的实体。             |

#### 示例

```yaml
actions:
  action: lock.unlock
  target:
    entity_id: lock.my_place
```

## 使用操作

前往 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/)，然后从可用操作列表中选择 `lock.lock`、`lock.unlock` 或 `lock.open`。在 **data** 字段中输入类似下面示例的内容，然后选择 **Perform action**。

```json
{"entity_id":"lock.front_door"}
```

| Data attribute | Optional | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `entity_id`    | yes      | 仅作用于指定门锁。使用 `entity_id: all` 可作用于全部门锁。     |
