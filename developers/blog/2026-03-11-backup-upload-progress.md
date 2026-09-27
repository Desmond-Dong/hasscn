`BackupAgent.async_upload_backup` 方法现在接收一个新的 `on_progress` 回调参数。Backup agents 可以在上传期间定期调用此回调，以报告到目前为止已上传的字节数：

```python
class ExampleBackupAgent(BackupAgent):

    async def async_upload_backup(
        self,
        *,
        open_stream: Callable[[], Coroutine[Any, Any, AsyncIterator[bytes]]],
        backup: AgentBackup,
        on_progress: OnProgressCallback,
        **kwargs: Any,
    ) -> None:
        """Upload a backup."""
        ...
        bytes_uploaded = 0
        async for chunk in await open_stream():
            await do_upload(chunk)
            bytes_uploaded += len(chunk)
            on_progress(bytes_uploaded=bytes_uploaded)
        ...
```

Backup manager 使用这些进度报告来触发 `UploadBackupEvent` 事件，使 frontend 能够向用户显示实时上传进度。

更多详情，请查看 [backup agent 文档](/developers/core/platform/backup.md#backup-agents)。
