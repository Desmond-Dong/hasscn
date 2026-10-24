# D-Bus 问题

## 问题

D-Bus 是 Supervisor 与主机进行大部分通信的方式，没有它，Supervisor 需要执行的许多操作将会失败。

## 解决方案

如果 D-Bus 守护进程未运行，请启动它。

如果这没有帮助，请重启您的操作系统。

作为最后的手段，您需要使用支持的操作系统之一重新安装运行 Supervisor 的主机，[请参阅此处的说明](/home-assistant/more-info/unsupported/os.md)。
