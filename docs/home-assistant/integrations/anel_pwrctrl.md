---
title: Anel NET-PwrCtrl
description: 'Anel NET-PwrCtrl 集成允许您控制固件版本 6.x 及更低版本的 ANEL PwrCtrl(https://en.anel.eu/index.htm?src=/produkte/produkte.htm) 设备。固件版本 7.x 的 ANEL。'
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '0.30'
ha_domain: anel_pwrctrl
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Anel NET-PwrCtrl

**Anel NET-PwrCtrl** 集成允许您控制固件版本 6.x 及更低版本的 [ANEL PwrCtrl](https://en.anel.eu/index.htm?src=/produkte/produkte.htm) 设备。固件版本 7.x 的 [ANEL PwrCtrl](https://en.anel.eu/index.htm?src=/produkte/produkte.htm) 设备不受支持。

已测试并支持的设备：

- PwrCtrl HUT
- PwrCtrl Advanced
- PwrCtrl Advanced Power

要将此平台添加到您的安装中，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
switch:
  - platform: anel_pwrctrl
    host: IP_ADDRESS
    port_recv: PORT
    port_send: PORT
    username: USERNAME
    password: PASSWORD
```

```yaml
host:
  description: 您的 PwrCtrl 设备的 IP 地址或主机名。
  required: false
  type: string
port_recv:
  description: 设备接收数据的端口。
  required: true
  type: integer
port_send:
  description: 设备发送数据的端口。
  required: true
  type: integer
username:
  description: 您设备的用户名。
  required: true
  type: string
password:
  description: 您设备的密码。
  required: true
  type: string
```

:::note
如果未提供 **host**，平台将尝试自动发现网络中所有在给定 **port_recv** 上监听的设备。

:::
