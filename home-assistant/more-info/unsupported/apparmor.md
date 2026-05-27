# AppArmor 问题

## 问题

AppArmor 是 Supervisor 处理加载项所有安全机制的方式，如果没有它，Supervisor 将缺少保护您的系统和其中数据的重要安全机制。

## 解决方案

如果您的主机未启用 AppArmor，请将以下内容添加到 Linux 内核启动参数中：`apparmor=1 security=apparmor`，然后重新启动您的操作系统。

作为最后手段，您可能需要使用支持的操作系统之一重新安装运行 Supervisor 的主机，[请参阅此处的说明](/home-assistant/more-info/unsupported/os.md)。
