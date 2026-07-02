# 清理存储空间

当您达到存储限制时，此页面将帮助您解决这个问题。

您可以采取以下几种措施来释放空间：

* [清理数据库](#清理数据库)
* [减少备份占用的空间](#减少备份占用的空间)
* [卸载未使用的应用](#卸载未使用的应用)
* [扩展存储](#扩展存储)

## 查看可用磁盘空间

按照以下步骤检查可用空闲磁盘空间。

1. 前往 **[设置 > 系统 > 存储](https://my.home-assistant.io/redirect/storage/)**。
2. 在磁盘指标下，将鼠标悬停在状态栏上以查看详细信息。

   * `[mdi:information-outline]` **网络存储**部分仅在您[添加了网络存储](/home-assistant/common-tasks/os/index.md#network-storage)时显示。

   !["移动数据磁盘"功能的截图](/home-assistant/images/screenshots/storage_view_free-diskspace.png)

## 清理数据库

Home Assistant 数据库可能会变得非常大。按照以下步骤减少数据库的大小。

1. 要查看当前数据库的大小，前往 [**设置** > **系统** > **修复**](https://my.home-assistant.io/redirect/system_health/)。
   * 选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **系统信息**。
   * 向下滚动到 **Recorder**，检查 **估计数据库大小 (MiB)**。
2. [清除数据库内容](/home-assistant/integrations/recorder/index.md#action-purge)。
3. 要减缓数据库增长，[筛选](/home-assistant/integrations/recorder/index.md#configuration-filter)发送到数据库的内容。
4. 使用 [`purge_keep_days` 设置](/home-assistant/integrations/recorder/index.md#purge_keep_days)更改数据存储时长。

## 减少备份占用的空间

### 删除过时的备份

创建新备份时不会包含以前的备份。但它们确实占用空间。

1. 要删除旧备份，请按照[删除过时备份](/home-assistant/common-tasks/general/index.md#deleting-obsolete-backups)的步骤操作。
2. 理想情况下，备份不应该在系统上堆积。
   * 要定义自动备份在系统上保留的时间，请按照[设置自动备份流程](/home-assistant/common-tasks/general/index.md#setting-up-an-automatic-backup-process)的步骤操作。

### 在 Home Assistant 外部存储备份

在 Home Assistant 外部存储备份可确保它们一开始就不会占用 Home Assistant 的空间。这也确保您可以在当前安装出现问题时[从备份恢复 Home Assistant](/home-assistant/common-tasks/general/index.md#restoring-a-backup)。请按照[定义备份位置](/home-assistant/common-tasks/general/index.md#defining-backup-locations)的步骤操作。

## 卸载未使用的应用

应用可能会占用大量空间，不仅是应用本身，还包括其数据。

1. 前往 [**设置** > **应用**](https://my.home-assistant.io/redirect/supervisor/)。
2. 查看您已安装的应用，找出您不再使用的应用。
3. 要移除应用，选择该应用，然后选择 **卸载**。

## 扩展存储

如果上述释放空间的步骤没有帮助，您需要扩展存储。

### 扩展存储：Home Assistant Operating System

当您运行 **Home Assistant Operating System** 时，可以使用以下选项来扩展存储：

* 用更大的存储介质替换当前的存储介质，例如 SD 卡。使用备份在新 SD 卡上[从备份恢复 Home Assistant](/home-assistant/common-tasks/general/index.md#restoring-a-backup)。
* [使用外部数据磁盘](/home-assistant/common-tasks/os/index.md#using-external-data-disk)

### 在 VM 上扩展存储

如果您将 Home Assistant 作为 VM 运行，请查看您的虚拟机监控程序文档，了解如何为虚拟机扩展磁盘。
Home Assistant 将自动扩展以使用新添加的空间。
