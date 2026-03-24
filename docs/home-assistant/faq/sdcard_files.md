---
title: 我想在主机或 SD 卡上找到我的文件。它们在哪里？
---

在 **Home Assistant Operating System** 安装中，您的文件位于 `/mnt/data/supervisor/` 中的数据分区。
在 SD 卡本身上，这是一个标记为 `hassos-data` 的 EXT4 分区。

有关文件访问的信息，请参阅[配置文件访问](/home-assistant/common-tasks/os/#configuring-access-to-files)部分。
