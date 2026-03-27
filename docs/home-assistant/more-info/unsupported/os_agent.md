---
title: OS-Agent 问题
description: 'OS-Agent 是 Supervisor 在主机上处理额外任务的方式，没有它，Supervisor 将无法完成其任务和职责。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# OS-Agent 问题

## 问题

OS-Agent 是 Supervisor 在主机上处理额外任务的方式，没有它，Supervisor 将无法完成其任务和职责。

## 解决方案

Home Assistant Operating-System 从版本 6.0 开始已预装此组件 - 您可能需要重启系统。

如果 OS-Agent 守护进程未运行，请启动它。
如果 [OS-Agent 未安装](https://github.com/home-assistant/os-agent)，您需要安装它。