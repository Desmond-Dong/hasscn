---
title: OpenEVSE
description: 'OpenEVSE integration 允许您监控配备基于 ESP8266/ESP32 Wi-Fi 连接功能的 OpenEVSE(https://openevse.com/) 电动车充电站。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Car
  - Energy
  - Sensor
ha_release: 0.38
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@c00w'
  - '@firstof9'
ha_domain: openevse
ha_zeroconf: true
ha_platforms:
  - number
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---
# OpenEVSE

**OpenEVSE** integration 允许您监控配备基于 ESP8266/ESP32 Wi-Fi 连接功能的 [OpenEVSE](https://openevse.com/) 电动车充电站。

## 前提条件

- OpenEVSE 充电器与 Home Assistant 在同一网络上。

## Configuration

To add the **OpenEVSE** device to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=openevse)

OpenEVSE can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=openevse).
- From the list, select **OpenEVSE**.
- Follow the instructions on screen to complete the setup.

</details>

## 配置

## 传感器

此集成提供以下传感器实体：

- **充电状态**：充电器的当前运行状态（例如：**已连接**、**充电**、**未连接**）                                                                          
- **已用充电时间**（秒）：当前充电会话的持续时间                                                                                                             
- **本次使用情况** (Wh)：当前充电期间消耗的电量                                                                                                        
- **总能源使用量** (Wh)：设备的累计能源消耗                                                                                                                
- **环境温度** (°C)：充电器的环境温度读数                                                                                                        
- **IR温度** (°C)：红外传感器温度读数（默认禁用）                                                                                                      
- **RTC 温度** (°C)：实时时钟传感器温度读数（默认禁用）

:::note
IR 和 RTC 温度传感器默认处于禁用状态。如需启用，请前往设备页面，选择对应实体，然后打开“已启用”开关。

:::
## 身份验证

如果您在 OpenEVSE 充电器上配置了 HTTP 身份验证（出于安全考虑，建议这样做），集成将提示您在设置过程中输入凭据。这些凭据安全地存储在 Home Assistant 的配置中。

## 从 YAML 配置迁移

:::warning
OpenEVSE 的 YAML 配置已弃用，并将在未来版本中移除。

:::
如果您之前在“configuration.yaml”文件中使用 YAML 配置了 OpenEVSE，则您的配置已自动导入到 UI 中。要完成迁移：

1. 从“configuration.yaml”文件中删除 OpenEVSE 的“openevse”或“sensor”平台配置。
2. 重启 Home Assistant。

集成将继续使用导入的 UI 配置进行工作。

## 故障排除

### 无法连接到主机

- 验证 IP 地址或主机名是否正确。
- 确保 OpenEVSE 充电器已开机并连接到您的网络。
- 检查 Home Assistant 是否可以连接到充电器（它们应该位于同一网络或配置了正确的路由）。

### 身份验证失败

- 仔细检查您的用户名和密码。
- 如果系统提示您输入凭据，请验证 OpenEVSE 充电器上是否启用了 HTTP 身份验证。
- 尝试直接在浏览器中访问 OpenEVSE Web 界面，以确认您的凭据有效。

## 删除集成

此集成遵循标准集成删除。不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
