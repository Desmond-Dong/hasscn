---
title: "备份"
sidebar_label: "备份"
---

集成实现备份平台有两个主要目的：

1. 添加一个 backup agent，可以将备份上传到某个本地或远程位置。
2. 在创建备份之前暂停或准备集成操作，和/或在备份后运行某些操作。

## 备份代理

要添加一个或多个 backup agents，请在 `backup.py` 中实现 `async_get_backup_agents` 和 `async_register_backup_agents_listener` 这两个方法。示例：

```python
async def async_get_backup_agents(
    hass: HomeAssistant,
) -> list[BackupAgent]:
    """Return a list of backup agents."""
    if not hass.config_entries.async_loaded_entries(DOMAIN):
        LOGGER.debug("No config entry found or entry is not loaded")
        return []
    return [ExampleBackupAgent()]


@callback
def async_register_backup_agents_listener(
    hass: HomeAssistant,
    *,
    listener: Callable[[], None],
    **kwargs: Any,
) -> Callable[[], None]:
    """Register a listener to be called when agents are added or removed.

    :return: A function to unregister the listener.
    """
    hass.data.setdefault(DATA_BACKUP_AGENT_LISTENERS, []).append(listener)

    @callback
    def remove_listener() -> None:
        """Remove the listener."""
        hass.data[DATA_BACKUP_AGENT_LISTENERS].remove(listener)

    return remove_listener
```

存储在 `async_register_backup_agents_listener` 中的 listener 应在每次需要重新加载 backup agents 时被调用，以移除过期的 agents 并添加新的 agents。这可以通过在 `async_setup_entry` 期间注册 listeners 来完成：

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up config entry."""
    # do things to set up your config entry

    # 通知 backup listeners
    def notify_backup_listeners() -> None:
        for listener in hass.data.get(DATA_BACKUP_AGENT_LISTENERS, []):
            listener()
    entry.async_on_unload(entry.async_on_state_change(notify_backup_listeners))

    return True
```

Backup agent 应实现 `BackupAgent` 基类的抽象接口，如下例所示：

```python
from homeassistant.components.backup import BackupAgent, BackupAgentError, OnProgressCallback

from .const import DOMAIN


class ExampleBackupAgent(BackupAgent):
    """Backup agent interface."""

    domain = DOMAIN
    name = "Example Backup-Agent"
    unique_id = "example_stable_id"

    async def async_download_backup(
        self,
        backup_id: str,
        **kwargs: Any,
    ) -> AsyncIterator[bytes]:
        """Download a backup file.

        Raises BackupNotFound if the backup does not exist.

        :param backup_id: The ID of the backup that was returned in async_list_backups.
        :return: An async iterator that yields bytes.
        """

    async def async_upload_backup(
        self,
        *,
        open_stream: Callable[[], Coroutine[Any, Any, AsyncIterator[bytes]]],
        backup: AgentBackup,
        on_progress: OnProgressCallback,
        **kwargs: Any,
    ) -> None:
        """Upload a backup.

        :param open_stream: A function returning an async iterator that yields bytes.
        :param backup: Metadata about the backup that should be uploaded.
        :param on_progress: A callback to report the number of uploaded bytes.
        """

    async def async_delete_backup(
        self,
        backup_id: str,
        **kwargs: Any,
    ) -> None:
        """Delete a backup file.

        Raises BackupNotFound if the backup does not exist.

        :param backup_id: The ID of the backup that was returned in async_list_backups.
        """

    async def async_list_backups(self, **kwargs: Any) -> list[AgentBackup]:
        """List backups."""

    async def async_get_backup(
        self,
        backup_id: str,
        **kwargs: Any,
    ) -> AgentBackup:
        """Return a backup.

        Raises BackupNotFound if the backup does not exist.
        """
```

Backup agents 应在出错时抛出 `BackupAgentError`（或 `BackupAgentError` 的子类）异常。其他异常不应从 backup agent 中抛出。

### 报告上传进度

`async_upload_backup` 方法接收一个 `on_progress` callback，agents 可以使用它来报告上传进度。调用 callback 时传入到目前为止上传的总字节数（整数）：

```python
on_progress(bytes_uploaded=bytes_sent)
```

备份管理器使用此信息来触发 `UploadBackupEvent` 事件，允许 frontend 向用户显示上传进度。Agents 应在上传过程中定期调用此 callback，例如在每次发送数据块之后。

## 预操作和后操作

当 Home Assistant 正在创建备份时，可能需要暂停集成中的某些操作，或 dump 数据以便正确恢复。

这是通过在 `backup.py` 中添加两个函数（`async_pre_backup` 和 `async_post_backup`）来完成的。

### 添加支持

为新集成添加备份支持的最快方法是使用我们内置的 scaffold 模板。从 Home Assistant 开发环境运行 `python3 -m script.scaffold backup` 并按照说明操作。

如果你更喜欢手动方式，请在集成文件夹中创建一个名为 `backup.py` 的新文件，并实现以下方法：

```python
from homeassistant.core import HomeAssistant


async def async_pre_backup(hass: HomeAssistant) -> None:
    """Perform operations before a backup starts."""

async def async_post_backup(hass: HomeAssistant) -> None:
    """Perform operations after a backup finishes."""
```
