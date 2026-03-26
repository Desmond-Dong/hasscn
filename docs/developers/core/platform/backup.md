---
title: "备份"
---

集成实现备份平台主要有两个目的：

1. 添加一个备份代理，用于将备份上传到本地或远程位置。
2. 在创建备份前暂停或准备集成相关操作，并在备份后执行必要的后续操作。

## 备份代理

要添加一个或多个备份代理，请在 `backup.py` 中实现 `async_get_backup_agents` 和 `async_register_backup_agents_listener` 这两个方法。例如：

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

每当需要重新加载备份代理、移除过期代理并添加新代理时，都应调用在 `async_register_backup_agents_listener` 中注册的监听器。这可以通过在 `async_setup_entry` 期间注册状态变更监听来实现：

```python
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up config entry."""
    # do things to set up your config entry

    # Notify backup listeners
    def notify_backup_listeners() -> None:
        for listener in hass.data.get(DATA_BACKUP_AGENT_LISTENERS, []):
            listener()
    entry.async_on_unload(entry.async_on_state_change(notify_backup_listeners))

    return True
```

备份代理应实现 `BackupAgent` 基类定义的抽象接口，如下例所示：

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

备份代理在发生错误时应抛出 `BackupAgentError`（或其子类）。不应让其他异常从备份代理中泄漏出来。

### 报告上传进度

`async_upload_backup` 方法会接收一个 `on_progress` 回调，代理可以用它来报告上传进度。调用时传入截至当前已上传的总字节数：

```python
on_progress(bytes_uploaded=bytes_sent)
```

备份管理器会利用这些信息触发 `UploadBackupEvent` 事件，从而让前端向用户显示上传进度。代理应在上传期间定期调用该回调，例如在发送每个数据块之后。

## 备份前后操作

当 Home Assistant 创建备份时，可能需要暂停集成中的某些操作，或者先导出数据，以确保之后能够正确恢复。

这可以通过在 `backup.py` 中添加两个函数（`async_pre_backup` 和 `async_post_backup`）来实现。

### 添加支持

为新集成添加备份支持的最快方式，是使用内置脚手架模板。在 Home Assistant 开发环境中，运行 `python3 -m script.scaffold backup` 并按照提示操作。

如果你更希望手动完成，请在集成目录中创建一个名为 `backup.py` 的新文件，并实现以下方法：

```python
from homeassistant.core import HomeAssistant


async def async_pre_backup(hass: HomeAssistant) -> None:
    """Perform operations before a backup starts."""

async def async_post_backup(hass: HomeAssistant) -> None:
    """Perform operations after a backup finishes."""
```
