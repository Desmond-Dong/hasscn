# Backup

**Backup** integration 用于所有[安装类型](/home-assistant/installation/index.md#about-installation-methods)创建和恢复备份。

要了解如何创建和恢复备份，请参阅[常见任务](/home-assistant/common-tasks/general/index.md#backups)下的备份部分。

## 动作

**Backup** 集成公开了可用于自动化备份过程的 actions。

但是，不再需要创建您自己的自动化。按照这些步骤[从 UI 设置自动备份](/home-assistant/common-tasks/general/index.md#setting-up-an-automatic-backup-process)。

### 动作：创建自动备份

`backup.create_automatic` 动作允许您创建 Home Assistant 实例的备份。

自动化编辑器不会显示 UI 编辑器，因为该动作使用您在 [**设置** > **系统** > **备份**](https://my.home-assistant.io/redirect/backup/) 的**备份设置**下定义的相同设置。有关更详细的描述，请参阅[自动备份](/home-assistant/common-tasks/general/index.md#setting-up-an-automatic-backup-process)文档。

可以调用此动作以比自动备份可配置的日程更灵活的预定义设置创建备份。

该动作没有额外的选项或参数。

示例动作：

```yaml
action: backup.create_automatic
```

### 动作：创建

`backup.create` 动作允许您创建 Home Assistant 实例的备份。

* 此动作仅在[核心和容器安装](/home-assistant/installation/index.md#about-installation-methods)中可用。
* 该动作没有额外的选项或参数。
* 备份将仅保存在本地存储上。
* 使用 `backup.create` 创建的备份始终包含数据库。
* 备份将创建时不使用密码。

示例动作：

```yaml
action: backup.create
```

### 示例：每晚凌晨 3 点备份

这是一个 YAML 自动化示例，每晚凌晨 3 点启动备份：

```yaml
automation:
  - alias: "每晚凌晨 3 点备份 Home Assistant"
    triggers:
      - trigger: time
        at: "03:00:00"
    actions:
      - alias: "现在创建备份"
        action: backup.create
```

## 恢复备份

要恢复备份，请按照[恢复备份](/home-assistant/common-tasks/general/index.md#restoring-a-backup)中描述的步骤操作。

## 事件实体

**Backup** integration 提供一个 Event entity，表示上次自动备份的状态（*已完成、进行中、失败*）。它还提供了几个可在自动化中使用的事件属性。

| 属性 | 描述 |
| --- | --- |
| `event_type` | 上次自动备份任务的翻译状态（*可能的状态：已完成、进行中、失败*） |
| `backup_stage` | 当前自动备份阶段（*当 `event_type` 不是进行中时为 `None`*） |
| `failed_reason` | 自动备份失败的原因（*当 `event_type` 为已完成或进行中时为 `None`*） |

### 使用示例

当自动备份失败时向移动应用发送通知。

```yaml
alias: 备份失败
triggers:
  - trigger: state
    entity_id:
      - event.backup_automatic_backup
conditions:
  - condition: state
    entity_id: event.backup_automatic_backup
    attribute: event_type
    state: failed
actions:
  - data:
      title: 自动备份失败
      message: 上次自动备份失败，原因为 {{ state_attr('event.backup_automatic_backup', 'failed_reason') }}
    action: notify.mobile-app
mode: single
```

## 传感器

**Backup** integration 提供多个传感器。

### 备份管理器状态

备份系统的当前状态。可能的状态有：

* 空闲
* 正在创建备份
* 正在接收备份
* 正在恢复备份

### 下次计划自动备份

下次计划自动备份的时间戳。

### 上次尝试自动备份

上次尝试自动备份的时间戳。

### 上次成功自动备份

上次成功自动备份的时间戳。
