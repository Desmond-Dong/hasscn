---
title: '操作系统错误：Bad message'
description: 关于 OS 错误为何将安装标记为不健康的更多信息。
---

## 问题

Supervisor 在文件操作期间收到操作系统错误（Python OSError 异常）。报告的错误编号为 74，"Bad message"，这通常是在文件系统损坏时引发的。文件系统损坏可能是由于断电或系统未正常关闭造成的。

## 解决方案

通常，Home Assistant 可以从文件系统损坏中恢复。如果您第一次看到此错误，请忽略它。如果问题恶化，请确保创建完整备份，下载它，或将其存储在另一个系统上。

如果此问题在系统重启后仍然出现，您的系统配置或硬件可能有问题。考虑重新全新安装您的操作系统。如果您使用的是外部 USB 驱动器，考虑更换 USB 适配器或 SSD。如果您确信硬件没有问题，并且您使用的是树莓派，这可能与某些 UAS 驱动器不兼容有关。有关更多背景信息，请阅读这篇[树莓派论坛帖子][rpi-forum-uas]。Home Assistant OS 维护一个禁用 UAS 的设备列表以解决此问题（检查您安装的第一个分区上的 config.txt）。如果您设备的 USB PID/VID 缺失，请考虑在 Home Assistant OS 项目中[提交问题][haos-issue]。

[rpi-forum-uas]: https://forums.raspberrypi.com/viewtopic.php?t=245931
[haos-issue]: https://github.com/home-assistant/operating-system/issues/new/choose
