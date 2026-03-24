---
title: Z-Wave.Me
description: 关于如何通过 Z-Wave.Me Z-Way 将 Z-Wave 集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Number
  - Sensor
  - Siren
  - Switch
ha_release: 2022.3
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lawfulchaos'
  - '@Z-Wave-Me'
  - '@PoltoS'
ha_domain: zwave_me
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - fan
  - light
  - lock
  - number
  - sensor
  - siren
  - switch
ha_zeroconf: true
ha_integration_type: hub
---

此集成允许您通过 [Z-Wave.Me Z-Way](https://z-wave.me/z-way/) 控制 Z-Wave 网络。它结合了 Z-Way 内置诊断工具的性能和强大功能以及 Home Assistant 的灵活性。该集成将所有 Z-Way 设备引入 Home Assistant（Z-Wave、Zigbee、EnOcean、基于 HTTP 的设备等）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
URL:
  description: Z-Way 服务器的 IP 地址和端口。如果应使用 HTTPS 而不是 HTTP（使用 find.z-wave.me 远程访问服务或带有 SSL 的公共 IP 时），IP 地址可以以 wss:// 为前缀。
API Token:
  description: Z-Way 服务器的 Z-Way API 访问令牌。要获取令牌，请转到 Z-Way 用户界面 Smart Home UI > 菜单 > 设置 > 用户 > 管理员 > API 令牌。
```

通过 find.z-wave.me 远程访问服务连接时，您需要使用具有全局范围的令牌（为此请通过 [find.z-wave.me](https://find.z-wave.me) 登录 Z-Way）。

连接到本地网络中 Z-Way 的示例：
 - URL: 192.168.1.39:8083
 - API Token: /112f7a4a-0051-cc2b-3b61-1898181b9950

通过远程访问 find.z-wave.me 连接到 Z-Way 的示例：
 - URL: wss://find.z-wave.me
 - API Token: 0481effe8a5c6f757b455babb678dc0e764feae279/112f7a4a-0051-cc2b-3b61-1898181b9950

 使用静态公共 IP 地址连接到 Z-Way 的示例：
 - URL: wss://87.250.250.242:8083
 - API Token: /112f7a4a-0051-cc2b-3b61-1898181b9950


:::warning
要仅授予对某些设备的访问权限，请创建新用户并从列表中选择必要的设备。然后使用该用户的 API 令牌。建议**不要使用管理员的 API 令牌**。

:::
:::tip
您可以将 Z-Wave.Me UI 及其增强的 Z-Wave 网络诊断工具与 Home Assistant UI 一起使用。

:::
## 硬件要求

Z-Wave.Me Z-Way 需要 Z-Wave.Me 硬件：
 - [RaZberry 7](https://z-wave.me/products/razberry/) 和 [RaZberry 7 Pro](https://z-wave.me/products/razberry/)
 - [Wiren Board 7](https://z-wave.me/products/wirenboard-7/)
 - [Z-Station](https://z-wave.me/products/z-station/)
 - [Z-Wave & Zigbee mPCIe](https://z-wave.me/products/mpcie/)
 - [RaZberry（旧版）](https://z-wave.me/products/razberry-old/)
 - [UZB1](https://z-wave.me/products/uzb/)
 - [Hub1](https://z-wave.me/products/hub/)
 - 或任何其他基于 Z-Wave.Me 的控制器。

## 安装 Z-Way

Z-Wave.Me Z-Way 可在各种平台上运行：Raspberry Pi OS、Linux、Windows。安装说明可在此处找到：https://z-wave.me/z-way/download-z-way/

## 迁移到 Z-Way

要从任何其他 Z-Wave 控制器迁移到 Z-Way，请将 Z-Way 作为辅助控制器添加（使用安全模式让 Z-Way 学习网络密钥）。使用 Z-Way 迁移工具将控制器设置为网络中的主控制器。