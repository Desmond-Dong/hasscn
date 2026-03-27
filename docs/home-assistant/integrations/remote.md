---
title: Remote
description: 'Remote 集成用于管理遥控器实体的状态，并允许您控制它们。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_release: 0.34
ha_domain: remote
ha_category:
  - Remote
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---
# Remote

**Remote** 集成用于管理遥控器实体的状态，并允许您控制它们。

- 为每个遥控器维护单独状态，并提供一个组合状态 `all_remotes`。
- 注册 `remote.turn_on`、`remote.turn_off`、`remote.toggle` 和 `remote.send_command` 操作以控制遥控器。

:::note Building block integration
This remote is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this remote building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the remote building block offers.
:::

## 遥控器实体的状态

遥控器实体的状态可以是 **On** 或 **Off**。

此外，实体还可能处于以下状态：

- **Unavailable**：实体当前不可用。
- **Unknown**：当前状态未知。

## 使用操作

前往 [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_services/)。在 **Actions** 下拉菜单中，选择 `remote.turn_on`、`remote.turn_off` 或 `remote.toggle`。在目标区域选择目标设备。如果您处于 YAML 模式，请在 **Data** 字段中输入类似以下示例的内容。完成后，选择 **Perform action**。

```json
{"entity_id":"remote.family_room"}
```

| 数据属性 | 可选 | 说明 |
| -------------- | -------- | ----------------------------------------------- |
| `entity_id`    | 是       | 仅作用于指定遥控器；否则会作用于所有目标。 |

有关更详细的示例，请参阅各类遥控器平台的文档。
