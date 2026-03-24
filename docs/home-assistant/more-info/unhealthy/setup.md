---
title: Supervisor 设置失败
description: 关于设置阶段失败为何将安装标记为不健康的更多信息。
---

## 问题

当任何设置任务未能完成时会发生这种情况，这可能是由于 Supervisor 启动时主机未完全准备好，或 [DBUS] 未正常工作。

## 解决方案

如果问题与 DBUS 相关，您也会看到关于它的不支持消息；您可以查看[此处][DBUS]了解如何解决该问题。

如果 DBUS 不是问题，您应该首先尝试重启 Supervisor。

这也可以通过 CLI 完成，运行以下命令：

```bash
ha supervisor restart
```

如果这没有帮助，或者您没有任何方式访问 CLI，可以尝试重启主机。这可以通过前往 [**设置** > **系统** > **硬件**](https://my.home-assistant.io/redirect/hardware/)，打开右上角菜单，选择"重启系统"来完成。

为了帮助我们使设置更加健壮，请在 [**设置** > **系统** > **分析**](https://my.home-assistant.io/redirect/analytics/) 面板上启用诊断和崩溃日志共享。

[DBUS]: /more-info/unsupported/dbus