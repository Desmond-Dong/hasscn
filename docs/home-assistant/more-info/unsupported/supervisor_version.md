---
title: Supervisor 版本
description: '仅支持最新版本的 supervisor。用户可以通过禁用其默认自动更新行为并手动更新来控制 Supervisor 何时更新。但使用最新版本以外的任何 Supervisor 版本都不受支持。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Supervisor 版本

## 问题

仅支持最新版本的 supervisor。用户可以通过禁用其默认自动更新行为并手动更新来控制 Supervisor 何时更新。但使用最新版本以外的任何 Supervisor 版本都不受支持。

## 解决方案

运行以下命令将 Supervisor 更新到最新版本：
```bash
ha supervisor update
```
或使用以下命令重新启用自动更新：
```bash
ha supervisor options --auto-update
```