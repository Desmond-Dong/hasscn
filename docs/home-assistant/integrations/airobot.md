---
title: Airobot
description: 'Airobot integration 允许您通过本地 REST API 控制和监控 Airobot(https://airobothome.com/) 智能恒温器，用于智能地暖控制。恒温器使用带有 <abbr title="时间比例积分"TPI</abbr 算法的自适应学习来保持稳定温度并优化能源效率。'
ha_release: 2025.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@mettolen'
ha_domain: airobot
ha_integration_type: device
ha_dhcp: true
ha_config_flow: true
ha_quality_scale: platinum
related:
  - url: https://airobothome.com/
    title: Airobot
  - url: https://airobothome.com/heat-control-products/
    title: Airobot Heat Control Products
ha_category:
  - Climate
ha_platforms:
  - button
  - climate
  - diagnostics
  - number
  - sensor
  - switch
---
# Airobot

**Airobot** integration 允许您通过本地 REST API 控制和监控 [Airobot](https://airobothome.com/) 智能恒温器，用于智能地暖控制。恒温器使用带有 <abbr title="时间比例积分">TPI</abbr> 算法的自适应学习来保持稳定温度并优化能源效率。可选的内置二氧化碳和湿度传感器可监测室内空气质量，营造更健康的居住环境。

使用场景：创建基于在场的供暖自动化，使用 BOOST 在到达前快速加热房间，监测空气质量以触发通风警报，并跟踪供暖运行模式以优化能源使用。

## 支持的设备

此集成支持以下设备：

- 固件版本 1.8 或更高版本的 Airobot 智能恒温器 TE1

## 前提条件

在设置集成之前，请确保您的 Airobot 恒温器已正确配置：

1. 验证您的恒温器固件版本为 1.8 或更高版本。您可以在恒温器设置菜单中查看固件版本。
2. 将恒温器连接到本地 Wi-Fi 或以太网网络。
3. 至少连接一次互联网以向 Airobot 服务器注册。在此初始连接期间，恒温器会接收其设备 ID（用户名）和密码。
4. 在恒温器设置菜单中，导航到 **Connectivity** > **Local API** > **Enable** 以启用本地 REST API（默认禁用）。
5. 从恒温器菜单的 **Connectivity** > **Mobile app** 屏幕中记下您的设备 ID 和密码。您将在设置过程中需要这些信息。这些与用于配对移动应用程序的凭据相同。

初始设置完成后，恒温器不需要互联网连接即可与 Home Assistant 配合使用。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

当恒温器位于同一网络时，集成可以通过 DHCP 自动发现。如果自动发现不起作用，您可以手动添加集成。

```yaml
Host:
    description: "Airobot 恒温器的主机名或 IP 地址。您可以在路由器设置中找到它，或使用主机名格式 `airobot-thermostat-t01xxxxxx`（将 `t01xxxxxx` 替换为您的设备 ID，小写）。"
Device ID:
    description: "恒温器设备 ID（例如 T01XXXXXX）。您可以在恒温器菜单的 **Connectivity** > **Mobile app** 屏幕中找到此信息。这与用于配对移动应用程序的凭据相同。"
Password:
    description: "恒温器密码。您可以在恒温器菜单的 **Connectivity** > **Mobile app** 屏幕中找到此信息。这与用于配对移动应用程序的凭据相同。"
```

## 重新配置

如果您需要更新恒温器的连接设置（例如更改 IP 地址、设备 ID 或密码），您可以重新配置集成而无需删除并重新添加：

1. 转到 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/)。
2. 在 **Airobot** 集成上，选择三点菜单并选择 **重新配置**。
3. 根据需要更新连接设置。
4. 选择 **提交** 以保存新设置。

这在以下情况下很有用：

- 您的恒温器 IP 地址已更改（例如，路由器重启或 DHCP 租约更新后）。
- 您需要更新设备 ID 或密码。
- 您想在 IP 地址和主机名之间切换。

## 支持的功能

**Airobot** 集成提供以下实体。

### 气候

恒温器表示为具有以下功能的气候 entity。

- **当前温度**
  - **描述**：显示房间内的测量温度。
  - **备注**：如果连接了地板温度传感器，则显示地板温度（用于地暖控制）。否则，显示空气温度。

- **当前湿度**
  - **描述**：显示房间内的测量相对湿度。

- **目标温度**
  - **描述**：显示并允许您设置所需温度（5°C 至 35°C 范围）。
  - **备注**：在 HOME 模式下，控制 HOME 温度设定点。在 AWAY 模式下，控制 AWAY 温度设定点。

- **HVAC 模式**
  - **描述**：对于此仅供暖恒温器，始终设置为制热。

- **HVAC 动作**
  - **描述**：显示恒温器是正在主动加热还是空闲。

- **预设模式**
  - **描述**：选择恒温器的运行模式。
  - **选项**：Home（使用 HOME 温度设定点）、Away（使用 AWAY 温度设定点，通常较低以节能）、Boost（临时增强供暖 1 小时，然后返回之前的模式）。

### 传感器

集成提供以下传感器实体来监控您的恒温器和环境。

#### 环境传感器

- **空气温度**
  - **描述**：房间内的测量空气温度。
  - **单位**：°C

- **地板温度**
  - **描述**：测量的地板温度。
  - **单位**：°C
  - **备注**：仅在恒温器连接了地板温度传感器时可用。

- **湿度**
  - **描述**：房间内的测量相对湿度。
  - **单位**：%

- **二氧化碳**
  - **描述**：房间内的测量二氧化碳浓度。
  - **单位**：ppm
  - **备注**：仅在恒温器具有可选的二氧化碳传感器时可用。

- **空气质量指数**
  - **描述**：根据二氧化碳水平计算的空气质量指数。
  - **备注**：仅在恒温器具有可选的二氧化碳传感器时可用。

#### 诊断传感器

以下诊断传感器默认禁用。如果需要，您可以在实体设置中启用它们。

- **设备运行时间**
  - **描述**：恒温器上次重启的时间戳。

- **供暖运行时间**
  - **描述**：自恒温器上次重启以来供暖处于活动状态的累计时间。
  - **单位**：小时

#### 系统传感器

- **错误**
  - **描述**：恒温器上的当前错误计数。值为 0 表示正常运行。

### 数字

集成提供一个配置实体来调整高级恒温器设置：

- **滞后带**：配置供暖控制的温度滞后（死区）（0.0-0.5°C 范围）。此设置确定温度必须低于设定点多少才会激活供暖。较小的值可提供更严格的温度控制，但可能导致更频繁的供暖循环。较大的值可减少供暖循环，但允许更大的温度变化。

### 按钮

集成提供用于设备管理的按钮实体：

- **重启**：重启恒温器设备。这会执行恒温器的软重启，可用于排查连接问题或应用配置更改。恒温器在重启过程中（通常 5-10 秒）将暂时不可用。
- **重新校准 CO₂**：通过将当前空气设置为新的 400 ppm 参考值来启动手动二氧化碳传感器校准。仅在恒温器具有可选的二氧化碳传感器时可用。不建议常规使用，因为二氧化碳传感器默认启用了自动校准算法。仅在空气清洁（新鲜室外空气）且需要手动覆盖自动校准时激活此功能。

### 开关

集成提供用于控制恒温器功能的开关实体：

- **童锁**：启用或禁用恒温器上的童锁功能。启用后，恒温器上的物理按钮将被锁定，以防止意外或未经授权的设置更改。
- **禁用执行器运动**：启用或禁用执行器运动功能。为防止阀门卡住，执行器运动会定期每 96 小时至少关闭阀门 8 分钟。此实体默认禁用。

## 示例

您可以使用 Airobot 集成创建的自动化示例。

### 空气质量警报

当空气质量超过指定阈值时发送通知。

<!-- markdownlint-disable MD034 -->
[![Open **Import blueprint** in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fair-quality-alert-notification-airobot%2F994072)
<!-- markdownlint-enable MD034 -->

<details>
<summary>示例 YAML 配置</summary>


```yaml
alias: "Airobot Air Quality Alert"
description: >-
  Sends a notification when the Airobot air quality sensor exceeds
  a threshold.

triggers:
  - trigger: numeric_state
    entity_id: sensor.airobot_air_quality
    above: 1000

conditions:
  - >-
    {{
      trigger.from_state.state | float(0)
      < trigger.to_state.state | float(0)
    }}

actions:
  - action: notify.mobile_app_your_phone
    data:
      title: "Poor Air Quality"
      message: >-
        Air quality in {{ area_name(trigger.entity_id) }} is
        {{ trigger.to_state.state }} (threshold: {{ trigger.above | int }})

```


</details>

## 数据更新

**Airobot** 集成每 30 秒从恒温器 polls 数据。此间隔与恒温器的内部测量周期相匹配，确保高效的数据同步而不会使设备过载。

## 已知限制

- **仅本地 API**：集成仅支持本地 REST API。不支持通过 Airobot 云服务进行云端控制。
- **手动启用 API**：在集成可以连接之前，必须在恒温器上手动启用本地 REST API。出于安全原因，它默认禁用。
- **固件要求**：仅支持固件版本 1.8 或更高版本。较旧的固件版本不提供本地 REST API。
- **仅供暖**：恒温器专为地暖控制设计，不支持制冷模式。
- **可选传感器**：二氧化碳和地板温度传感器仅在您的恒温器型号中安装了相应硬件时可用。

## 故障排除

<details>
<summary>无法连接到恒温器</summary>


**症状：** 无法连接到您的 Airobot 恒温器

尝试设置集成时，配置流程显示错误"无法连接到您的 Airobot 恒温器"。

此错误表示 Home Assistant 无法建立到恒温器本地 REST API 的连接。这可能是由于网络设置不正确、本地 API 被禁用或网络连接问题引起的。

要解决此问题，请尝试以下步骤：

1. **验证 IP 地址或主机名**：
   - 确保您输入了正确的 IP 地址或主机名。
   - 您可以在路由器设置中找到 IP 地址。
   - 主机名格式为 `airobot-thermostat-t01xxxxxx`（将 `t01xxxxxx` 替换为您的设备 ID，小写）。

2. **检查网络连接**：
   - 确保恒温器已开机并连接到您的网络。
   - 验证 Home Assistant 和恒温器在同一网络上或可以相互通信。
   - 尝试从 Home Assistant 主机 ping 恒温器：`ping <thermostat-ip>`。

3. **启用本地 API**：
   - 在恒温器上，导航到 **Connectivity** > **Local API** > **Enable**。
   - 等待几秒钟让 API 变为活动状态。

4. **重启恒温器**（如果需要）：
   - 如果刚刚启用本地 API，请尝试重启恒温器以确保 API 服务正确启动。


</details>

<details>
<summary>身份验证失败</summary>


**症状：** "无效的身份验证"

输入凭据时配置流程显示"无效的身份验证"错误。

提供的设备 ID（用户名）或密码不正确或与恒温器的凭据不匹配。

1. **验证凭据**：
   - 在恒温器上，导航到设置菜单中的 **Connectivity** > **Mobile app** 屏幕。
   - 检查设备 ID（例如 T01XXXXXX）是否与您输入的完全匹配（区分大小写）。
   - 检查密码是否与您输入的完全匹配（区分大小写）。

2. **重新输入凭据**：
   - 仔细检查是否有输入错误。
   - 设备 ID 应以"T"开头，后跟数字。

3. **确保初始注册**：
   - 恒温器必须至少连接一次互联网以注册并获取凭据。
   - 如果您从未将恒温器连接到互联网，请先这样做，然后再次检查凭据。


</details>

<details>
<summary>恒温器变为不可用</summary>


**症状：** 恒温器实体在一段时间后变为不可用

集成失去与恒温器的连接，导致实体变为不可用。这可能是由于网络问题、恒温器断电或设备进入睡眠模式引起的。

1. **检查电源和网络**：
   - 确保恒温器已开机并连接到网络。
   - 检查您是否可以直接在浏览器中访问恒温器的 Web 界面。

2. **验证网络稳定性**：
   - 如果使用无线连接，请检查 Wi-Fi 信号强度问题。
   - 考虑使用有线以太网连接以获得更可靠的连接。

3. **检查本地 API 状态**：
   - 确保恒温器上仍启用本地 API。
   - 导航到 **Connectivity** > **Local API** 并验证它已启用。

4. **重置 Wi-Fi 设置**：
   - 在恒温器上，导航到 **Connectivity** > **WiFi**。
   - 重置 Wi-Fi 设置并重新连接到您的本地网络。


</details>

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

您可以在移除集成后选择性地在恒温器上禁用本地 API，方法是导航到 **Connectivity** > **Local API** > **Disable**。
