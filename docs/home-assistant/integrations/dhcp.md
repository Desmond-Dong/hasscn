---
title: DHCP discovery
description: 'DHCP 发现集成将监视网络上的 DHCP 请求以查找支持的设备和服务。发现的集成将显示在配置面板集成页面的已发现部分。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
ha_iot_class: Local Push
ha_release: 2021.2
ha_domain: dhcp
ha_quality_scale: internal
ha_codeowners:
  - '@bdraco'
ha_integration_type: system
---
# DHCP discovery

**DHCP 发现**集成将监视网络上的 DHCP 请求以查找支持的设备和服务。发现的集成将显示在配置面板集成页面的已发现部分。

## 配置

此集成默认启用，除非您从配置中禁用或删除了 [`default_config:`](/home-assistant/integrations/default_config/) 行。如果是这种情况，以下示例显示如何在 "`configuration.yaml`" 文件中手动启用此集成：

```yaml
# 示例 configuration.yaml 条目
dhcp:
```

## 故障排除

### DHCP 浏览器

**DHCP 浏览器**显示 Home Assistant 使用各种网络方法发现的设备，例如 DHCP、ARP + PTR 查找和基于路由器的设备跟踪器。当设备连接到网络并通过 DHCP（动态主机配置协议）请求 IP 地址时，Home Assistant 可以自动检测到它。通过这些方法发现的所有设备都将出现在 DHCP 浏览器中。

要打开 DHCP 浏览器，请前往：
[**设置** > **系统** > **网络** > **DHCP 浏览器**](https://my.home-assistant.io/redirect/config_dhcp/)
