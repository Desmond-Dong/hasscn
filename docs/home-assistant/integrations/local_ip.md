---
title: Local IP Address
description: 'Local IP Address 集成会公开您的 Home Assistant 实例在本地网络（LAN）中的 IP 地址。当您的实例使用固定的公网主机名（例如使用 Nabu Casa 服务时），但本地局域网地址是动态分配的（例如通过 DHCP 配置）时，这会很有帮助。'
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: 0.104
ha_config_flow: true
ha_codeowners:
  - '@issacg'
ha_domain: local_ip
ha_platforms:
  - sensor
ha_integration_type: integration
---
# Local IP Address

**Local IP Address** 集成会公开您的 Home Assistant 实例在本地网络（LAN）中的 IP 地址。当您的实例使用固定的公网主机名（例如使用 Nabu Casa 服务时），但本地局域网地址是动态分配的（例如通过 DHCP 配置）时，这会很有帮助。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
