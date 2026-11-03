# Select

**Select** 集成用于管理 select 实体的状态，并允许你控制这些实体。此集成还允许其他集成为实体提供一组有限的可选项。

:::note Building block integration
This select is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this select building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the select building block offers.
:::

## Select 实体的状态

Select 实体的状态就是当前选中选项的值。

<p class='img'>
<img src='/home-assistant/images/integrations/select/state_select.png' alt='开发者工具中显示 select 实体状态的截图' />
开发者工具中显示 select 实体状态的截图。
</p>

此外，该实体还可能具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

## 操作

Select 实体还公开了额外的操作，可用于在自动化或脚本等场景中控制实体。这些操作可以通过 UI 创建，也可以使用 YAML，下面提供了相应示例。

### 操作：选择第一个

`select.select_first` 操作会将 select 实体的当前选项切换为可用选项列表中的第一个。

此操作没有额外选项。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=select.select_first)

YAML 示例：

```yaml
action: select.select_first
target:
  entity_id: select.my_entity
```

### 操作：选择最后一个

`select.select_last` 操作会将 select 实体的当前选项切换为可用选项列表中的最后一个。

此操作没有额外选项。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=select.select_last)

YAML 示例：

```yaml
action: select.select_last
target:
  entity_id: select.my_entity
```

### 操作：选择下一个

`select.select_next` 操作会将 select 实体的当前选项切换为可用选项列表中的下一个。如果当前 select 选项未知，则会改为选择列表中的第一个选项。

如果当前 select 选项已经是列表中的最后一个，则默认会循环回到第一个选项并选中它。你可以在操作数据中将 `cycle` 选项设为 `false` 来禁用这种循环行为。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=select.select_next)

YAML 示例：

```yaml
action: select.select_next
target:
  entity_id: select.my_entity
```

```yaml
# 禁止循环回到第一个选项
action: select.select_next
target:
  entity_id: select.my_entity
data:
  cycle: false
```

### 操作：选择指定选项

`select.select_option` 操作会根据必填的 `option` 操作数据，将当前选项切换为指定的目标选项。

如果目标实体的可用选项列表中不存在所选选项，则此操作调用不会成功。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=select.select_option)

YAML 示例：

```yaml
action: select.select_option
target:
  entity_id: select.my_entity
data:
  option: "example_option"
```

### 操作：选择上一个

`select.select_previous` 操作会将 select 实体的当前选项切换为可用选项列表中的上一个。如果当前 select 选项未知，则会改为选择列表中的最后一个选项。

如果当前 select 选项已经是列表中的第一个，则默认会循环回到最后一个选项并选中它。你可以在操作数据中将 `cycle` 选项设为 `false` 来禁用这种循环行为。

[![Open Settings > Developer tools > Actions in your Home Assistant instance.](https://my.home-assistant.io/badges/developer_call_service.svg)](https://my.home-assistant.io/redirect/developer_call_service/?service=select.select_previous)

YAML 示例：

```yaml
action: select.select_previous
target:
  entity_id: select.my_entity
```

```yaml
# 禁止循环回到最后一个选项
action: select.select_previous
target:
  entity_id: select.my_entity
data:
  cycle: false
```
