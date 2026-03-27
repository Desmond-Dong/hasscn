---
title: LIVISI Smart Home
description: 'LIVISI Smart Home 集成可让您将 LIVISI Smart Home Controller (SHC) 连接到 Home Assistant。SHC 可控制与其相连的兼容 RWE/innogy 设备。 本页属于 Home Assistant 中文文档。'
ha_category:
  - Binary sensor
  - Climate
  - Switch
ha_iot_class: Local Polling
ha_release: 2022.12
ha_config_flow: true
ha_codeowners:
  - '@StefanIacobLivisi'
  - '@planbnet'
ha_domain: livisi
ha_platforms:
  - binary_sensor
  - climate
  - switch
ha_integration_type: hub
---
# LIVISI Smart Home

**LIVISI Smart Home** 集成可让您将 LIVISI Smart Home Controller (SHC) 连接到 Home Assistant。SHC 可控制与其相连的兼容 RWE/innogy 设备。
 
此集成当前支持以下设备：
 
- 室内智能插座（PSS）
- 嵌墙式开关（ISSx）
- 户外智能插座（PSSO）
- 房间供暖控制（VRCC），包括对散热器恒温器（RSTx）、房间恒温器（WRT）和地暖控制器（FSC8）等实体供暖设备的支持
- 墙壁开关（ISS、ISS2）
- 门窗传感器（WDS）
 
## 前提条件
 
此集成仅与本地版 LIVISI SmartHome 通信。
 
要启用本地 SmartHome 功能，请打开 LIVISI App，前往 **Settings** >> **General Settings** >> **Local SmartHome**，然后选择 **Activate**。
 
更多信息请访问 [LIVISI Community](https://community.livisi.de)。
 

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
 
### 额外配置
 
当前此集成无法自动发现您的 SHC，因此需要手动配置。您需要提供控制器的 IP 地址和本地密码。
 
## 设备发现

所有设备都会由该集成自动发现并纳入。如果您在 LIVISI SmartHome 中添加了新设备，该设备会在几分钟后自动出现在 Home Assistant 中。
