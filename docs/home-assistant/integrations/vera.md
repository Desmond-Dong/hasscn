---
title: Vera
description: 'Vera(https://getvera.com/) 集线器是一种主要用于连接 Z-Wave 设备的控制器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: vera
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - scene
  - sensor
  - switch
ha_integration_type: hub
---
# Vera

[Vera](https://getvera.com/) 集线器是一种主要用于连接 Z-Wave 设备的控制器。

受支持的 Vera 集线器（Edge、Plus 和 Secure）已不再销售，厂商也没有继续积极增强其固件。新的 Z-Wave 设备无法直接获得支持，因此不太容易添加到该平台。

较新的 Ezlo 集线器使用不同的固件，因此不受此集成支持。

[Z-Wave JS](/home-assistant/integrations/zwave_js/) 更适合新的 Z-Wave 用户，或希望支持新款 Z-Wave 设备的用户。

Home Assistant 目前支持以下设备类型：

- Binary sensor
- Cover
- Light
- Lock
- Scene
- Sensor
- Switch
- Climate

当 Home Assistant 连接到您的 Vera 控制器后，这些设备类型会被自动添加。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
请确保 **Controller URL** 中包含协议和端口。例如 `http://192.168.1.1:3480`。

:::
:::tip
建议为 Vera 控制器分配静态 IP 地址。这样可以确保它不会更换 IP 地址，避免在设备重启后因 IP 改变而需要修改 `vera_controller_url`。有关如何设置，请参阅路由器说明书。如果您需要 Vera 的 MAC 地址，请查看设备底部标签。

:::
## 选项

配置好 Vera 集成后，您可以在该集成中设置其他选项；请选择齿轮图标。

- Vera switch device - 默认情况下，您的开关会以开关实体形式添加到 Home Assistant；如果其中一些实际上是灯光开关，您可以提供灯光 ID 列表，让 Home Assistant 将它们识别为灯光。
- Vera device ids to exclude - Vera 会将详细的 Z-Wave 设备导入 Home Assistant，这其中可能包含系统设备和其他您不使用的设备；您可以提供设备 ID 列表，告诉 Home Assistant 不要加载这些设备。

您可以在 Vera UI 中通过设备的高级属性查看 Vera device id，也可以在 Home Assistant 中已导入设备的 `Vera Device Id` 属性里找到它（位于开发者工具中）。

### 在自动化中使用 Z-Wave 设备

如果您想在 Home Assistant 自动化中使用来自 Vera 控制器的 Z-Wave 设备，您需要对应的实体 ID。在 Home Assistant UI 中，您可以在 [**Settings** > **Developer tools** > **States**](https://my.home-assistant.io/redirect/developer_states/) 找到所有实体。查找属性中包含 `Vera Device Id` 的实体，左侧即可看到其实体 ID。

### 传感器

`vera` 平台允许您在 Home Assistant 中获取 [Vera](https://getvera.com/) 传感器的数据。

请注意，某些 Vera 传感器（如 _motion_ 和 _flood_ 传感器）是可布防的，也就是说，当它们被布防且状态发生变化时，Vera 会发送告警（电子邮件、短信等）。

无论这些传感器是否处于 _armed_ 状态，Home Assistant 都会显示其状态。

为了让您可以更改 _armed state_，Home Assistant 会为每个可布防传感器同时创建一个开关和一个传感器实体。
