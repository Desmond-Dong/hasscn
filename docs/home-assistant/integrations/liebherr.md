---
title: Liebherr
description: 关于如何将 Liebherr SmartDevice 家电集成到 Home Assistant 的说明。
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mettolen'
ha_domain: liebherr
ha_integration_type: hub
ha_zeroconf: true
ha_config_flow: true
ha_quality_scale: silver
related:
  - url: https://home.liebherr.com/
    title: Liebherr
  - url: https://www.liebherr.com/en-us/refrigerators-freezers/smartdevice-3033395
    title: Liebherr SmartDevice appliances
  - url: https://developer.liebherr.com/apis/smartdevice-homeapi/
    title: Liebherr SmartDevice HomeAPI
  - docs: /common-tasks/general/#defining-a-custom-polling-interval
    title: Defining a custom polling interval
ha_category:
  - Number
  - Select
  - Sensor
  - Switch
ha_platforms:
  - diagnostics
  - number
  - select
  - sensor
  - switch
---

**Liebherr** 集成可让您通过云端 [SmartDevice HomeAPI](https://developer.liebherr.com/apis/smartdevice-homeapi/) 控制和监控 [Liebherr](https://home.liebherr.com/) SmartDevice 冰箱和冷柜。借助此集成，您可以监控温度、调整制冷设置，并创建自动化，以便在温度超过食品安全储存阈值时收到提醒。

用例：监控食品储存温度、在超过阈值时发送提醒、优化能耗，并在您离家时自动调整制冷设置。

## 支持的设备

此集成支持以下设备：

- 支持 Wi-Fi 连接的 Liebherr SmartDevice 冰箱和冷柜

## 前提条件

在设置集成之前，您需要从 Liebherr SmartDevice 应用中获取 API key：

1. 连接设备：下载 [SmartDevice 应用](https://smartdevice.onelink.me/OrY5/8neax8lp)，并将您的 Liebherr 设备连接到家庭 Wi-Fi 网络。按照[设置说明](https://go.liebherr.com/cb2ct1)完成初始配置。

2. 获取 API key：
   - 打开 SmartDevice 应用
   - 前往 **Settings**
   - 选择 **Become a beta tester**
   - 启用 **Beta testing HomeAPI**
   - 选择 **Generate new key**
   - 复制 API key。该 API key 只能在应用中复制一次。

3. 验证连接状态：只有通过 SmartDevice 应用连接到互联网的设备，才能通过 HomeAPI 访问。仅注册但未实际联网的设备不会显示在 Home Assistant 中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

当您的设备位于同一网络中时，此集成可被自动发现。如果自动发现无效，您也可以手动添加该集成。

```yaml
API key:
    description: "来自 Liebherr SmartDevice 应用的 API key（**Settings** > **Become a beta tester**）。注意：API key 只能在应用中复制一次。"
```

<details>
<summary>更改温度单位</summary>


Home Assistant 中显示的温度单位由 Home Assistant 系统设置控制，而不是由该集成或设备设置控制。

要在摄氏度和华氏度之间切换：

1. Go to [**Settings** > **System** > **General**](https://my.home-assistant.io/redirect/general/).
2. 在 **Unit system** 下选择：
   - **Metric** 表示摄氏度 (°C)
   - **Imperial** 表示华氏度 (°F)
3. 温度实体会自动更新为您所选的单位显示。

Liebherr 设备会根据设备自身设置的温度单位运行。Home Assistant 则会按照您在 Home Assistant 设置中配置的单位系统显示温度，并在需要时自动在摄氏度和华氏度之间转换。


</details>

## 支持的功能

**Liebherr** 集成为您的 SmartDevice 冰箱和冷柜分区提供温度监控与控制功能。

### 数值实体

此集成会为每个冷却分区创建用于控制设定温度的 number 实体。

- **Setpoint**：冷却分区的目标温度。调整该值即可更改期望温度。

温度范围和单位取决于您设备的能力和设置。

对于具有多个冷却分区的设备（例如冷藏冷冻组合机型），每个分区都会创建独立的 number 实体：

- **Top zone setpoint**：最上层分区的目标温度
- **Middle zone setpoint**：中间分区的目标温度（如果存在）
- **Bottom zone setpoint**：最下层分区的目标温度（如果存在）

### 传感器

此集成会为设备中的每个冷却分区创建温度传感器。

- **Zone temperature**：当前在冷却分区内部测得的温度。

对于具有多个冷却分区的设备（例如冷藏冷冻组合机型），每个分区都会创建独立的传感器：

- **Top zone**：最上层冷却分区
- **Middle zone**：中间分区（如果存在）
- **Bottom zone**：最下层冷却分区（如果存在）

### 选择实体

此集成会为设备上的特殊功能创建 select 实体。根据设备型号和能力的不同，并非所有 select 都可用。对于具有多个冷却分区的设备，每个分区都会创建独立的 select 实体。

- **IceMaker**：控制自动制冰机。可选项为 Off、On 和 MaxIce（如果设备支持）。MaxIce 会临时提高制冰量，适合您需要更多冰块的场景。
- **HydroBreeze**：控制 HydroBreeze 喷雾系统，该系统会定期喷出细雾以保持果蔬新鲜。可选项为 Off、Low、Medium 和 High。
- **BioFresh-Plus**：控制 BioFresh-Plus 分区的温度设置。可选项表示两个 BioFresh-Plus 抽屉的温度组合（例如 0|0、0|-2、-2|-2、-2|0），可帮助您为不同类型的新鲜食材优化储存条件。

### 开关

此集成会为设备上的特殊运行模式创建 switch 实体。根据设备型号和能力的不同，并非所有 switch 都可用。

#### 分区级开关

这些开关作用于单个冷却分区。对于具有多个分区的设备，每个分区都会创建独立的开关：

- **SuperCool**：可在最长 12 小时内将冷藏室温度快速降至 +2°C。适合快速冷却大量新放入的食物或饮料，防止内部温度升高并确保更佳保鲜效果。
- **SuperFrost**：可将冷冻室温度快速降至 -32°C (-26°F)，形成低温储备，以利于保留维生素的冷冻过程。冻结完成后，此功能会自动恢复为正常模式，最长不超过 65 小时，有助于节省电力。

#### 整机开关

这些开关作用于整台设备：

- **PartyMode**：一种持续 24 小时的便捷模式，通过最大化制冷性能，让设备为聚会场景做好准备。它会自动启用 SuperCool 来快速冰镇饮料，并启用 SuperFrost 来冷冻食物，同时在支持时提高制冰量。
- **NightMode**：通过关闭所有设备提示音、暂停 IceMaker，并将内部 LED 灯光调暗为柔和亮度，营造更安静的厨房环境。

## 自动化

以下是一些您可以使用 Liebherr 集成创建的自动化示例。

### 夜间模式计划

让您的 Liebherr 设备在睡觉时自动启用夜间模式，并在早晨自动关闭，以实现更安静的夜间运行。

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Liebherr 夜间模式计划"
description: >-
  在睡觉时自动启用夜间模式，并在早晨关闭，以获得更安静的夜间运行体验。
triggers:
  - trigger: time
    at: "22:00:00"
    id: night_mode_on
  - trigger: time
    at: "07:00:00"
    id: night_mode_off
actions:
  - choose:
      - conditions:
          - condition: trigger
            id: night_mode_on
        sequence:
          - action: switch.turn_on
            target:
              entity_id: switch.my_fridge_night_mode
      - conditions:
          - condition: trigger
            id: night_mode_off
        sequence:
          - action: switch.turn_off
            target:
              entity_id: switch.my_fridge_night_mode
mode: single
```


</details>

## 数据更新

**Liebherr** 集成会每 1 分钟从 SmartDevice HomeAPI 云服务中 polls 一次数据。

如果您有超过 2 台设备，建议增大轮询间隔，以避免触发 API 速率限制。

<details>
<summary>定义自定义轮询间隔</summary>


If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   - Then, select **System options** and toggle the button to disable polling.
   ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   - Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   - Define any trigger and condition you like.
   - Select **Add action**, then select **Other actions**.
   - Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/#action-homeassistantupdate_entity).
   - Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
   ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.


</details>

## 已知限制

- 云依赖：该集成需要互联网连接才能与 Liebherr SmartDevice HomeAPI 云服务通信。如果您的网络中断，将无法通过 Home Assistant 控制设备。
- Beta API：SmartDevice HomeAPI 当前仍处于 beta 阶段。随着 Liebherr 持续开发该 API，功能和行为可能发生变化。
- API key 限制：API key 只能在 SmartDevice 应用中复制一次。如果丢失，您需要重新生成一个新的 key。
- 仅显示已连接设备：只有通过 Wi-Fi 主动连接到互联网的设备才会出现在 Home Assistant 中。已注册但已断开的设备无法访问。

## 故障排除

<details>
<summary>设置期间出现连接错误</summary>


**现象：** 配置流程显示连接错误

在尝试设置集成时，Home Assistant 无法与 Liebherr SmartDevice HomeAPI 云服务建立连接。

要解决此问题，请尝试以下步骤：

1. 检查互联网连接：
   - 确保您的 Home Assistant 实例具有可用的互联网连接。
   - 确认您可以从当前网络访问 `https://home-api.smartdevice.liebherr.com`。

2. 验证 API key：
   - 再次确认您从 SmartDevice 应用中完整复制了 API key。
   - 确保其中没有多余空格或字符。

3. 检查 API 状态：
   - SmartDevice HomeAPI 属于 beta 服务，偶尔可能不可用。
   - 等待几分钟后再试。

4. 重新生成 API key（如有需要）：
   - 如果您怀疑 API key 无效，请在 SmartDevice 应用中重新生成一个新的 key（**Settings** > **Become a beta tester** > **Generate new key**）。


</details>

<details>
<summary>API key 无效或已过期</summary>


**现象：** 设置期间出现 “Invalid authentication” 错误，或集成显示 “Requires reconfiguration” 状态

API key 可能不正确、已过期，或已在 SmartDevice 应用中重新生成。如果服务端发生变更并使您的凭据失效，也可能出现这种情况。

要解决此问题，请生成新的 API key 并更新集成：

1. 在 SmartDevice 应用中，前往 **Settings** > **Become a beta tester** > **Generate new key**。
2. 立即复制新的 API key（只能复制一次）。
3. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
4. 找到 **Liebherr** 集成并选择 **Reconfigure**。
5. 输入新的 API key，然后选择 **Submit**。

:::note
在 SmartDevice 应用中生成新的 API key 后，旧 key 会立即失效。请务必在生成新 key 后立刻更新 Home Assistant。

:::
</details>

<details>
<summary>设置完成后未找到任何设备</summary>


**现象：** 设置已完成，但没有任何设备显示出来

API key 有效，但当前没有任何设备连接到 Liebherr SmartDevice 云服务。

1. 检查设备连接状态：
   - 打开 SmartDevice 应用，确认您的设备显示为已连接，而不只是已注册。
   - 确保设备具有有效的 Wi-Fi 连接。

2. 重新连接设备：
   - 如果应用中显示设备已断开，请将其重新连接到 Wi-Fi 网络。
   - 按照[设置说明](https://go.liebherr.com/cb2ct1)完成重新连接。

3. 等待同步：
   - 重新连接设备后，请等待几分钟，让设备与云服务完成同步。
   - 然后再次尝试设置集成。


</details>

<details>
<summary>设备变为不可用</summary>


**现象：** 实体显示为 unavailable

集成失去了与 Liebherr 云服务的连接。这可能由互联网连接问题、API 服务中断，或设备离线状态导致。

1. 检查是否触发 API 速率限制：
   - 如果您在短时间内执行了很多操作，API 可能会暂时限制请求速率。
   - 等待几分钟让限制重置，设备通常会重新恢复可用。

2. 检查互联网连接：
   - 确保您的 Home Assistant 实例具有稳定的互联网连接。
   - 确认您的设备已连接到 Wi-Fi，并且在 SmartDevice 应用中显示为在线。

3. 检查 API 服务状态：
   - SmartDevice HomeAPI 是 beta 服务，偶尔可能不可用。
   - 等待几分钟让服务恢复。

4. 重启集成：
   - 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
   - 选择 **Liebherr** 集成。
   - 选择右侧三点菜单 `[mdi:dots-vertical]`，然后选择 **Reload**。


</details>

## 删除集成

此集成遵循标准集成删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

移除集成后，您的 API key 在 SmartDevice 应用中仍然保持有效。若要撤销访问权限，请在应用中生成新的 API key，这会使旧 key 失效。
