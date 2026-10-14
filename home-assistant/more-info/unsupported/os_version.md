# Home Assistant Operating System 版本

## 问题

Supervisor 将超过最近 4 个主要版本的 Home Assistant Operating System 视为不支持。我们通常建议始终更新到最新的 Home Assistant Operating System。

在不支持的 Home Assistant OS 上，Supervisor 停止刷新其更新信息。这意味着您将不再收到任何组件的更新，包括 Home Assistant 核心或应用（以前称为加载项）更新。

## 解决方案

由于您有一段时间没有更新系统，我们建议在更新系统之前[创建备份](/home-assistant/common-tasks/general/index.md#backups)。确保下载备份或将其存储在远程位置。

要解决此问题，请更新您的 Home Assistant Operating System 版本。前往 [**系统** > **更新**](https://my.home-assistant.io/redirect/updates/) 更新操作系统。如果您看不到更新，可能是之前跳过了它。要查看之前跳过的更新，选择三点 `[mdi:dots-vertical]` 并启用已跳过的更新。如果没有新的 OS 更新出现，您可能需要参考[常见任务中的 OS 文档](/home-assistant/common-tasks/os/index.md)并使用 CLI 更新到最新版本。

如果您的系统严重过时，可能需要多次更新才能达到最新版本。
