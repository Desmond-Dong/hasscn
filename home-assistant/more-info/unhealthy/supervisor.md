# Supervisor 未能更新

## 问题

当 Supervisor 启动期间出现网络问题时，可能会发生这种情况。

## 解决方案

如果有待处理的更新，手动更新 Supervisor。这可以从面板完成。

这也可以通过 CLI 完成，运行以下命令：

```bash
ha supervisor update
```

如果这不起作用。检查日志，如果有无法解析主机的错误（例如：lookup ghcr.io: no such host），可能是您的网络设置有问题（例如：无法访问的 DNS 服务器）。
