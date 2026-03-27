---
title: Netio
description: 'The Netio integration allows you to control your Netio(https://www.netio-products.com/en/overview/) Netio4, Netio4 All, and Netio 230B. These are smart。'

ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.24
ha_domain: netio
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Netio

The **Netio** integration allows you to control your [Netio](https://www.netio-products.com/en/overview/) Netio4, Netio4 All, and Netio 230B. These are smart outlets controllable through Ethernet and/or Wi-Fi that reports consumptions (Netio4all). This integration requires Telnet to be enabled on the Netio device.

To use Netio devices in your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
switch:
  - platform: netio
    host: 192.168.1.43
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    outlets:
      1: Free
      2: TV
      4: Lamp
```

```yaml
host:
  description: "The IP address of your Netio plug, e.g., `http://192.168.1.32`."
  required: true
  type: string
port:
  description: The port to communicate with the switch.
  required: true
  default: 1234
  type: integer
username:
  description: The username for your plug.
  required: true
  default: admin
  type: string
password:
  description: The password for your plug.
  required: true
  type: string
outlets:
  description: "List of all outlets. Consisting of a number and a name [No.]: [Name]."
  required: false
  type: list
```

要从 Netio 设备获取推送更新，可以在设备界面中添加此 Lua 代码，作为“Netio”“系统变量更新”上触发的操作，并指定“始终”计划：

```lua
-- this will send socket and consumption status updates via CGI
-- to given address. Associate with 'System variables update' event
-- to get consumption updates when they show up

本地地址='ha:8123'
本地路径 = '/api/netio/<主机>'

本地输出 = {}
for i = 1, 4 for _, 成对执行什么({'state', 'consumation',
                        '累积消费'，'消费开始'}) 做
    local varname = string.format('输出%d_%s', i, 什么)
    表.插入（输出，
        varname..'='..tostring(devices.system[varname]):gsub(" ","|"))
结束结束

local qs = table.concat(output, '&')
local url = string.format('http://%s%s?%s', address, path, qs)
devices.system.CustomCGI{url=url}
```
