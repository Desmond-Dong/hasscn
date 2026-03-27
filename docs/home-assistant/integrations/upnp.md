---
title: UPnP/IGD
description: 'UPnP/IGD 集成允许您从路由器收集网络统计信息，例如入站/出站字节数、入站/出站数据包数、运行时间、WAN IP 地址以及 WAN 连接状态。如果您的路由器启用了 UPnP(https://en.wikipedia.org/wiki/UniversalPlugandPlay)/Internet。'
ha_category:
  - Binary sensor
  - Network
  - Sensor
ha_release: 0.18
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@StevenLooman'
ha_domain: upnp
ha_ssdp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: device
---
# UPnP/IGD

**UPnP/IGD** 集成允许您从路由器收集网络统计信息，例如入站/出站字节数、入站/出站数据包数、运行时间、WAN IP 地址以及 WAN 连接状态。如果您的路由器启用了 [UPnP](https://en.wikipedia.org/wiki/Universal_Plug_and_Play)/[Internet Gateway Device (IGD) Protocol](https://en.wikipedia.org/wiki/Internet_Gateway_Device_Protocol)，即可提供这些信息。

Home Assistant 目前支持以下设备类型：

- **Binary Sensor** - 指示路由器是否已连接到 WAN。
- **Sensor** - 用于获取路由器的网络统计信息，例如入站/出站字节数、入站/出站数据包数、运行时间、状态和 IP。运行时间传感器仅在路由器支持时才会出现。

请注意，要使此集成正常工作，您的路由器必须启用 UPnP 或 NAT-PMP。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 强制轮询数据

某些 UPnP/IGD 设备的 UPnP 实现存在缺陷，可能会返回无效数据，或者完全不返回数据。此集成提供了一个配置选项，可回退为对所有传感器数据进行轮询。如果您发现本应正常工作的传感器没有正常工作，请尝试启用该选项。

## 调试集成

如果此集成出现问题，您可以启用调试日志。

```yaml
logger:
  default: info
  logs:
    homeassistant.components.upnp: debug
    async_upnp_client: debug
    async_upnp_client.traffic: error
```

提交问题时，请附上相关日志。像 IP 地址这样的敏感信息可以做脱敏处理。
