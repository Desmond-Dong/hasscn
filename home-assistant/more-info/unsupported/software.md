# 不支持的软件

## 问题

如 [ADR-0014](https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md) 所述，Home Assistant 生态系统之外不会安装任何额外软件。这包括但不限于在同一主机上运行的独立容器。

某些容器还会与 Supervisor 的操作冲突，如果您运行其中任何容器，您的系统也会被标记为不健康。这些容器将在 Supervisor 日志中显示为错误。

## 解决方案

移除您在主机上安装的任何额外软件（包括独立容器），并重启 Supervisor。
