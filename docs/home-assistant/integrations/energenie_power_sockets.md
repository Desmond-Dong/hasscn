---
title: Energenie Power Sockets
description: 'Energenie Power-Sockets 集成允许您将 Energenie USB Power-Sockets(https://energenie.com/item.aspx?id=7556&lang=de) 包含到您的 Home Assistant 设置中。'
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: '2024.5'
ha_codeowners:
  - '@gnumpi'
ha_domain: energenie_power_sockets
ha_platforms:
  - switch
ha_integration_type: device
ha_config_flow: true
---
# Energenie Power Sockets

**Energenie Power-Sockets** 集成允许您将 [Energenie USB Power-Sockets](https://energenie.com/item.aspx?id=7556&lang=de) 包含到您的 Home Assistant 设置中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 故障排除

如果您运行的是 Home Assistant Container 安装：根据您的系统配置，可能需要通过创建 udev 规则来授予用户对 USB 设备的显式访问权限。

<details>
<summary>创建 udev 规则</summary>


1. 通过调用 `lsusb` 查找 USB 设备的 *vendor_id* 和 *product_id*：

```bash
lsusb

#例如：Bus 001 Device 005: ID 04b4:fd15 Cypress Semiconductor Corp. Energenie EG-PMS2
```

2. 通过调用以下命令创建 udev 规则：

```bash
sudo echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="04b4", ATTR{idProduct}=="fd15", MODE="0666"' > /lib/udev/rules.d/60-energenie-usb.rules
sudo udevadm control --reload-rules
sudo udevadm trigger
```


</details>