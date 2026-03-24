---
title: UniFi Network
description: 关于如何配置 Ubiquiti UniFi Network 应用程序集成的说明。
ha_category:
  - Hub
  - Image
  - Presence detection
  - Sensor
  - Switch
  - Update
ha_release: 0.81
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@Kane610'
ha_domain: unifi
ha_ssdp: true
ha_platforms:
  - button
  - device_tracker
  - diagnostics
  - image
  - light
  - sensor
  - switch
  - update
ha_integration_type: hub
---

[Ubiquiti Networks, inc.](https://www.ui.com/) 推出的 [UniFi Network](https://www.ui.com/download-software/) 是一款将网关、交换机和无线接入点统一整合到单一图形化界面中的软件。

## 先决条件

### 硬件支持

此集成支持所有运行 UniFi Network 的 UniFi OS Console，也支持自托管版本的 UniFi Network。

### 软件支持

建议运行 UniFi Network 和 UniFi OS 的最新稳定版本。

:::important
**Home Assistant 不支持 Early Access 和 Release Candidate 版本。**

使用 UniFi Network 或 UniFi OS 的 Early Access 或 Release Candidate 版本可能会带来意外变更。如果你选择加入 Early Access 或 Release Candidate 发布渠道，并因此导致 Home Assistant 中出现问题，则需要等到该版本进入正式 Stable 发布渠道后，才可预期它恢复正常工作。

:::
### 本地用户

你需要先在 UniFi OS Console 中创建一个本地用户，并使用该用户登录。Ubiquiti SSO Cloud User **无法**使用。
建议使用 Administrator 或具备完整读写权限的用户，以便充分使用此集成，
但这并非强制要求。创建出的实体会根据你所使用用户的权限自动调整。

1. 登录 UniFi OS 设备上的 _Local Portal_，然后选择 **Users**。
    - **注意**：这一步**必须**通过直接访问设备 IP 地址的方式在 UniFi OS 中完成，也就是使用 _Local Portal_，不能通过 `unifi.ui.com` 或 UniFi Network 应用进行。
2. 在左侧菜单中进入 **Admins & Users**，或直接访问 [IP address]/admins/users，例如 `192.168.1.1/admins/users`。
3. 选择 **Add New Admin**。
4. 勾选 **Restrict to local access only**，并填写用户信息。为 **Network** 选择 **Full Management**。由于不会使用 **OS Settings**，可将其设置为 **None**。
5. 在右下角选择 **Add**。

![UniFi OS User Creation](/home-assistant/images/integrations/unifi/user.png)

Home Assistant 目前支持以下设备类型：

- [Button](#button)
- [Image](#image)
- [Light](#light)
- [Presence detection](#presence-detection)
- [Actions](#actions)
- [Switch](#switch)
- [Sensor](#sensor)
- [Firmware updates](#firmware-updates)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::note
**权限**：下面各节介绍的功能默认假设你的 Home Assistant 实例对每台设备都具有完整写入权限。如果你使用的用户对某些设备访问受限，则可获得的实体会更少，并且在许多情况下，你会得到只读传感器，而不是可编辑的开关实体。

:::
### 集成的额外配置

所有配置选项都可在前端界面中完成。进入你想调整选项的 UniFi Network 集成，然后选择齿轮图标。启用用户个人资料页面中的 “Advanced Mode” 后，还可以看到一些高级选项。

## Button

只有当此集成使用的是具有管理员权限的 UniFi Network 账户时，按钮实体才会可用并可操作。

### PoE 电源循环

使用 **Power cycle PoE** 按钮实体，可对指定 PoE 端口执行断电重启，从而重启已连接设备。

### 重启 UniFi 设备

使用 **Restart UniFi device** 按钮实体可重启整个 UniFi 设备。如果该设备是 PoE 交换机，则不会影响 PoE 供电。

### WLAN 重新生成密码
使用 **WLAN regenerate password** 按钮实体可为指定 WLAN（无线局域网）生成并应用新密码。**该密码会随机生成，共 20 个字符，由小写字母、大写字母和数字组成。**

## Image

提供可扫描的二维码图像，以便轻松加入指定 WLAN。相关实体默认处于禁用状态。此功能需要管理员权限。

## Presence detection

此平台允许你通过查看连接到 [Ubiquiti](https://ui.com/) [UniFi Network](https://ui.com/cloud-gateways) 应用的设备来检测是否在家。默认情况下，设备在最后一次被看到 300 秒后会被标记为离家。

### 故障排除与时间同步

如果被跟踪设备在实际上未连接或不在场时仍持续显示为“Home”，并且在 UniFi Controller 中仍显示为已连接，请禁用 802.11r Fast Roaming。根据多个 UniFi Controller 版本的实际情况，启用该功能后可能无法正确将客户端标记为已断开。

在家检测与客户端 MAC 地址随机化不兼容。该功能在大多数现代智能手机上默认启用。你需要在客户端设备设置中将其关闭，通常位于对应网络的设置中。

在家检测依赖于 Home Assistant 与 UniFi Network 应用之间准确的时间配置。

如果 Home Assistant 与 UniFi Network 应用运行在不同的机器或虚拟机上，请确保所有时钟已同步。若时钟不同步，Home Assistant 可能无法正确将设备标记为在家。

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

## Actions

### 动作：重新连接客户端

`unifi.reconnect_client` 动作会尝试让无线客户端重新连接到网络。

| 数据属性 | 可选 | 说明 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `device_id`            | 否       | 表示与 UniFi Network 集成相关设备 ID 的字符串 |

### 动作：移除客户端

`unifi.remove_clients` 动作用于清理 UniFi Network 应用中仅短暂出现过的客户端。其首次出现与最后出现之间的时间差必须小于 15 分钟，并且该客户端不能关联固定 IP、主机名或名称。

## Switch

### 阻止客户端访问网络

通过在集成选项中添加 MAC 地址，可控制相应客户端的网络访问权限。列表中的每一项都会在 Home Assistant 中创建一个以 UniFi 设备名称命名的开关，用于阻止或恢复访问。

### PoE 端口控制

提供逐端口的 PoE 控制。相关实体默认处于禁用状态。此功能需要管理员权限。

### 端口控制

提供单独启用或禁用交换机端口的控制。相关实体默认处于禁用状态。此功能需要管理员权限。

### 控制 DPI 流量限制

系统会为每个限制组自动创建实体。如果某个组中没有限制，则不会显示实体。在 Home Assistant 中切换该开关会启用或禁用该组内的所有限制。

### 控制 WLAN 可用性

系统会为每个 WLAN 创建实体。更改 WLAN 状态会触发受影响接入点的重新配置，并限制该接入点公开的所有 WLAN 访问。

### 控制端口转发规则

系统会为每条端口转发规则创建实体。这些开关可通过图标 `[mdi:upload-network]` 识别。

### 控制流量规则

系统会为每条流量规则创建实体。这些开关可通过图标 `[mdi:security-network]` 识别。

### 控制基于策略的路由规则

系统会为每条基于策略的路由规则创建实体。这些开关可通过图标 `[mdi:routes]` 识别。

### 控制基于区域的防火墙策略

系统会为每条基于区域的防火墙策略创建实体。这些开关可通过图标 `[mdi:security-network]` 识别。

## Sensor

### 带宽传感器

获取按网络客户端分别统计接收和发送带宽的实体。这些传感器默认处于禁用状态。若要启用带宽传感器，请在 UniFi 集成页面中选择 **Configure**，前往第 3/3 页并启用带宽传感器。

### 有线客户端链路速度传感器

获取用于报告有线网络客户端链路速度的实体。该传感器显示有线客户端与网络交换机或网关之间以兆比特每秒（Mbit/s）为单位的连接速度。这些传感器默认处于禁用状态，且仅适用于处于活动连接状态的有线客户端。

### WLAN 客户端传感器

报告已连接到某个 WLAN 的客户端数量或状态的实体。

### 运行时间传感器

获取用于报告各网络客户端或 UniFi Network 设备运行时间的实体。

### 电源插座传感器

获取用于报告支持指标的插座功耗情况的实体，例如 USP-PDU-Pro 上的交流插座。

### 设备温度传感器

获取用于报告 UniFi Network 设备整体温度的实体。

### 设备状态

获取用于报告 UniFi Network 设备当前状态的实体。

### 设备 CPU

获取用于报告 UniFi Network 设备当前 CPU 使用率的实体。

### 设备内存

获取用于报告 UniFi Network 设备当前内存使用率的实体。

### 端口带宽传感器

获取按端口分别统计接收和发送带宽的实体。这些传感器默认处于禁用状态。若要启用带宽传感器，请在 UniFi 集成页面中选择 **Configure**，前往第 3/3 页并启用带宽传感器。

### 端口链路速度传感器

获取用于报告网络设备端口链路协商速度的实体。这些传感器显示每个端口协商后的链路速度，单位为兆比特每秒（Mbit/s）。相关实体默认处于禁用状态。

## Light

灯光实体仅适用于支持 LED 环自定义的 UniFi 接入点。并非所有接入点都具备此能力。

### LED 控制

可控制兼容 UniFi 接入点上的 LED 环。对于支持 LED 自定义的设备，系统会自动创建实体。你可以控制 LED 的状态、亮度和颜色。此功能需要管理员权限。

:::note
更改可能需要 5 秒以上才会生效，因为设备需要应用新的配置。UI 会先行乐观更新。

:::
## Firmware updates

这会显示连接到控制器的 UniFi 网络设备是否有可用固件更新。如果配置的用户具有管理员权限，还可以直接从 Home Assistant 安装固件升级。


## 在 Home Assistant 中移除设备

此集成会将 UniFi 设备以及网络客户端都导入到 Home Assistant 中。在某些边缘情况下，即使这些实体已不再存在于 UniFi 网络中，也可能仍然残留，从而导致设备注册表中的条目不断累积。

若要手动移除设备条目，请前往设备信息页面，并在设备信息菜单中选择 “Delete”。

只有那些自 UniFi 集成启动或重新加载后，已不再被 UniFi 识别的客户端或设备，才可被移除。

![4d4ca937-17bb-4902-9949-2ea83e3c2c0c](https://github.com/home-assistant/home-assistant.io/assets/21991867/c926f5c7-18af-47b5-b888-30cc8511d76a)


## 集成调试

如果你在使用 UniFi Network 应用或此集成时遇到问题，可以在日志中启用调试输出。

```yaml
logger:
  default: info
  logs:
    aiounifi: debug
    homeassistant.components.unifi: debug
```
