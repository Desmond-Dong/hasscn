---
title: Systemd-Resolved
description: 'systemd-resolved 通过 D-Bus 用于解析 Home Assistant、Supervisor 和应用（以前称为加载项）发出的 DNS 查询。没有它，您的安装中的 DNS 将无法正常工作。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Systemd-Resolved

## 问题

systemd-resolved 通过 D-Bus 用于解析 Home Assistant、Supervisor 和应用（以前称为加载项）发出的 DNS 查询。没有它，您的安装中的 DNS 将无法正常工作。

## 解决方案

如果您看到关于 D-Bus 问题的消息，[请先解决该问题](/home-assistant/more-info/unsupported/dbus)。

如果 systemd-resolved 服务未运行或被禁用，请启用并启动它。

如果这没有帮助，请重启您的操作系统。

作为最后手段，您需要使用支持的操作系统之一重新安装运行 Supervisor 的主机，[请参阅此处的说明](/home-assistant/more-info/unsupported/os)。
