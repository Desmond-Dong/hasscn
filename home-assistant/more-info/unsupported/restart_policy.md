# 重启策略

## 问题

Supervisor 需要在系统重启后以正确的顺序启动它管理的加载项、插件和 Home Assistant 容器。更改它为这些容器设置的重启策略可能会导致它们以错误的顺序启动并产生错误。

## 解决方案

如果观察者的重启策略被更改，请从主机 shell 使用以下命令修复：

```bash
docker update hassio_observer --restart always
```

对于其他所有内容，可以使用以下命令修复重启策略：

```bash
docker update <container_name> --restart no
```

Supervisor 日志应该包含具有错误重启策略的容器名称列表。
