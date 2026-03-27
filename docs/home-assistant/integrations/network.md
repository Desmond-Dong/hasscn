---
title: Network Configuration
description: 'The Network configuration integration provides network configuration for integrations such as Zeroconf(/home-assistant/integrations/zeroconf/). It is。'

ha_category:
  - Other
ha_release: 2021.6
ha_domain: network
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---
# Network Configuration

The **Network configuration** integration provides network configuration for integrations such as [Zeroconf](/home-assistant/integrations/zeroconf/). It is managed by going to **[Settings > System > Network](https://my.home-assistant.io/redirect/network/)** and is only available to users that have "Advanced Mode" enabled on their [user profile](https://my.home-assistant.io/redirect/profile/).

**[![Open **Settings** > **System** > **General** in your Home Assistant instance.](https://my.home-assistant.io/badges/general.svg)](https://my.home-assistant.io/redirect/general/)**

## Auto detection

自动检测基于 mDNS 广播地址 (`224.0.0.251`) 的系统路由下一跃。

如果下一跳具有非环回、非链路本地、非组播地址，自动检测将使用与下一跳对应的接口（通常称为默认接口）。

如果无法检测到下一跳或者是环回地址，则自动检测将使用所有具有非环回、非链路本地、非组播地址的接口。

## Configuration

默认情况下启用此集成，除非您已从配置中禁用或删除 [`default_config:`](/home-assistant/integrations/default_config/) 行。如果是这种情况，以下示例向您展示如何手动启用此集成：

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
network:
```
