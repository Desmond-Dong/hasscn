---
title: Cisco IOS
description: '这是一个用于 Cisco IOS(https://www.cisco.com/) 设备的存在检测扫描器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Presence detection
ha_release: 0.33
ha_iot_class: Local Polling
ha_codeowners:
  - '@fbradyirl'
ha_domain: cisco_ios
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Cisco IOS

这是一个用于 [Cisco IOS](https://www.cisco.com/) 设备的存在检测扫描器。

:::important
此设备跟踪器需要在路由器上启用 SSH。

:::
在使用此扫描器之前，建议您降低路由器上的 ARP 缓存超时，因为 Cisco IOS 通常具有 4 小时的默认 ARP 缓存超时。

例如，以下命令将在 Vlan1 上将超时降低到 2 分钟：

```bash
# 1. 使用此命令查看您的设备在哪个 Vlan 上
show ip arp

# 2. 进入配置模式
conf t

# 3. 使用您在上面第 1 步中看到的 Vlan 名称
interface Vlan1

# 4. 设置新的 arp 缓存超时
arp timeout 120

# 5. 退出
# 按 <ctrl+c> 退出配置模式

# 6. 不要忘记保存新配置，以便它在重启后仍然有效
copy running-config startup-config
```

:::note
如果您的 VLan 上有大量设备（+1000），您可能需要调整 ARP 缓存超时以满足您的需求。请参阅[此讨论](https://community.cisco.com/t5/switching/arp-timeout/td-p/839027)了解更多信息。


:::
要在您的系统中使用此设备跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
device_tracker:
  - platform: cisco_ios
    host: ROUTER_IP_ADDRESS
    username: YOUR_ADMIN_USERNAME
    password: YOUR_ADMIN_PASSWORD
```

```yaml
host:
  description: 您路由器的 IP 地址，例如 192.168.1.1。
  required: true
  type: string
username:
  description: 具有管理权限的用户名。
  required: true
  type: string
password:
  description: 您指定的管理员账户的密码。
  required: true
  type: string
```

有关如何配置要跟踪的人员的说明，请参阅[设备跟踪器集成页面](/home-assistant/integrations/device_tracker/)。
