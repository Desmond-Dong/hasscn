`BackupAgent` API 已进行调整，以下方法在找不到备份时应抛出 `BackupNotFound`：

* `BackupAgent.async_delete_backup`
* `BackupAgent.async_download_backup`
* `BackupAgent.async_get_backup`

请参阅 [backup agent 文档](/developers/core/platform/backup.md#backup-agents) 和 [home assistant core PR #139754](https://github.com/home-assistant/core/pull/139754) 以获取更多背景信息。
