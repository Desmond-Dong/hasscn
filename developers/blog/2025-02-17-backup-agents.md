在 2025 年 1 月的版本中，我们为备份引入了一项新功能，称为 backup agents。

此前，backup platform 仅用于在创建备份之前暂停或准备集成操作，以及在备份之后执行后续操作。随着 backup agents 的引入，backup platform 现在允许集成添加一个或多个 backup agents，这些 agents 可以将备份上传到某些本地或远程位置。

第一个实现 backup agent 的集成是 Home Assistant Cloud 集成。在 2025 年 2 月的版本中，又有三个集成实现了 backup agents：Google Drive、OneDrive 和 Synology DSM。如果你是一名集成作者，并希望为你喜欢的备份位置添加支持，你可以在[开发者文档](/developers/core/platform/backup.md)中了解更多关于如何实现 backup agents 的信息。
