---
title: 连接错误
description: '在运行 Home Assistant 时，您可能会收到关于连接问题的错误信息。例如：。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 连接错误

在运行 Home Assistant 时，您可能会收到关于连接问题的错误信息。例如：

```bash
ConnectionRefusedError: [Errno 111] Connection refused
```

这种情况很可能不是 bug，而是服务/守护进程本身的问题。请首先检查您的网络（DNS、DHCP、上行链路等），并确保 Home Assistant 和服务已正确配置。请记住，Web 服务可能会出现宕机情况。
