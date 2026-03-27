---
title: Epson
description: 'Epson 集成允许您从 Home Assistant 控制 Epson 投影仪。 初始配置期间设备必须开机。 当您首次添加设备时，请在按照集成步骤操作之前将其开机。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Media player
ha_release: 0.72
ha_iot_class: Local Polling
ha_domain: epson
ha_codeowners:
  - '@pszafer'
ha_config_flow: true
ha_platforms:
  - media_player
ha_integration_type: device
---
# Epson

**Epson** 集成允许您从 Home Assistant 控制 Epson 投影仪。
**初始配置期间设备必须开机。**
当您首次添加设备时，请在按照集成步骤操作之前将其开机。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

- 开/关
- 设置输入源
- 设置/获取色彩模式，包括高/低灯泡模式
- 增加/减少音量
- 静音/取消静音
- 发送下一曲/上一曲

## 支持的设备

- 支持 ESC/VP21 协议的 Epson 投影仪。

### 已测试设备

- Epson EH-TW5350
- Epson EH-TW7000
- Epson EH-TW9400W（与 7400/8400/9400(w) 共享平台）
- Epson EH-TW3200
- Epson Powerlite W39

## 配置

此集成支持通过 LAN 或串口连接到 Epson 投影仪。

### LAN 连接

将投影仪连接到您的 LAN，在提示时输入投影仪的 IP 地址，根据投影仪型号支持选择 HTTP 或 TCP。
Epson 的 iProjection 应用程序可用于测试是否工作。

### 串口连接

通过串口线将投影仪直接连接到 Home Assistant，或使用 ser2net 作为串口到网络的代理。

#### ser2net 配置

可以使用类似以下的 ser2net 配置，在端口 `3629` 上暴露连接到 `/dev/ttyUSB0` 的投影仪。

```yaml
connection: &con1
  accepter: tcp,3629
  connector: serialdev,/dev/ttyUSB0,9600n81
```

然后可以使用 `socket://<ser2net_ip>:3629` 将投影仪添加到集成中。