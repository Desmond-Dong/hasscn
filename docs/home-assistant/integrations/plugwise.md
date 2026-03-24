---
title: Plugwise
description: Plugwise 网关平台集成。
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Number
  - Select
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 0.98
ha_codeowners:
  - '@CoMPaTech'
  - '@bouwew'
ha_config_flow: true
ha_domain: plugwise
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: platinum
---

[Plugwise](https://www.plugwise.com) 提供智能家居设备，让您监控和控制气候、能源（包括燃气）消耗和能源生产。能源信息可用于[能源仪表板](/home-assistant/home-energy-management)。

此集成支持连接到网络的一个或多个 Plugwise 网关。您可以使用浏览器、Plugwise 应用程序或 Home Assistant 连接到这些网关。有 4 种[支持](#supported-devices)的网关类型：

- 使用 [Adam](https://www.plugwise.com/zone-control/) 的完整区域控制，使用[附加设备](#adam)如区域温控器、智能阀门和智能插座。
- 名为 [Anna](https://www.plugwise.com/product/anna/) 的独立智能温控器。
- 用于电力和燃气使用监控的设备简称为 [P1](https://www.plugwise.com/smile-p1)。
- 虽然不再销售，但也支持 Stretch，这是一种为其旧电力产品创建网络连接的网关。

## 前提条件

网络上的 Plugwise 网关会自动发现并显示在集成仪表板上。每个网关都需要其唯一的 8 字符 ID（在底部贴纸上找到）作为密码。对每个网关重复此过程。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: "网关的主机名或 IP 地址。例如：`192.168.1.25`。您可以在路由器或 Plugwise 应用程序中使用 **Settings** 图标 (&#9776;) > **System** > **Network** 找到它。在 Plugwise 应用程序中，要定位特定设备，请在主屏幕上选择 **Gateways**，选择所需的网关，然后按照前面的说明操作。通常，网关会自动发现，您不必提供主机名或 IP 地址。"
Username:
  description: "登录网关的用户名。对于大多数设备应该是 'smile'，对于 Stretch 应该是 'stretch'。"
Password:
  description: "每个网关都需要其唯一的 8 字符 ID（在底部贴纸上找到）作为密码。"
```

### 日程管理

1. **初始设置**：首先，使用 Plugwise 应用程序或浏览器激活日程。
2. **通过 Home Assistant 控制**：
   - 使用气候卡片激活/停用日程。
   - 'Auto' 模式表示日程处于活动状态。
   - 'Heat'、'Cool' 或 'Heat_cool' 模式表示日程处于非活动状态。
3. **更改日程**：使用温控器 [select](#change-climate-schedule) 实体。

:::note
只有包含两个或更多日程点的日程才会显示为选项。

:::
## 支持的功能

此集成显示您配置中的所有 Plugwise 设备，包括硬件设备、多温控器气候区域和虚拟开关组。此外，代表您的 Plugwise 网关（例如 Adam、Smile-T 或 P1）的设备也将可见。

例如，如果您有一个名为 'Living' 的 Lisa 和一个名为 'Bathroom' 的 Tom 的 Adam 设置，这些将显示为单独的设备。连接到网关的加热/冷却设备将显示为 'OpenTherm' 或 'OnOff'，具体取决于网关如何与设备通信。如果您有 Plugs（即可连接到 Adam 的插拔式开关）或 Aqara Smart Plugs，这些也将显示为设备。

每个设备将根据其功能列出实体，如 `binary sensors`、`sensors` 等：例如，集中测量（如 P1 的 `power`，Anna 或 Adam 上的 `outdoor_temperature`）将分配给您的网关设备。加热/冷却设备测量（如 `boiler_temperature`）将分配给 OpenTherm/OnOff 设备。

### 气候实体

#### 二值传感器

根据您的设置，一个或多个二值传感器将提供连接元素的状态。示例包括：

- **Cooling** & **Heating** 
  - **描述**：指示您的系统是否正在主动冷却或加热。
- **DHW State**
  - **描述**：指示正在主动加热生活热水。
- **Flame State** 
  - **描述**：您的加热器是否正在消耗燃气，即为空间或生活热水加热而燃烧。

#### 数字

修改特定的基于数字的设置可以让您微调您的设置。

- **Maximum boiler temperature setpoint**
  - **描述**：调整辅助加热器的最高温度。
- **Domestic hot water setpoint**
  - **描述**：调整生活热水的温度。
- **Temperature offset**
  - **描述**：微调感知温度。

#### 传感器

为您的气候设置提供了大量传感器。示例包括：

- **Setpoint**
  - **描述**：当前区域（Adam）或通用（Anna）的设定点。
- **Indoor temperature**
  - **描述**：对于 Anna、Lisa 或 Jip，这将显示在特定温控器处测量的温度。
- **Outdoor temperature**
  - **描述**：您的气候网关在线获取的温度。
- **Outdoor air temperature**
  - **描述**：您的 HVAC 系统室外机组（如热泵）中的传感器报告的温度。

#### 选择器

- **Thermostat schedule**
  - **描述**：在可用的日程之间选择，通用（Anna）或当前区域（Adam）。
  - **备注**：请查看[进一步配置](#further-configuration)了解配置日程的要求。

#### 开关

- **Cooling**
  - **描述**：切换是否应启用冷却。
- **DHW Comfort Mode**
  - **描述**：切换生活热水的舒适模式。

### 电力和燃气实体

#### 传感器

提供了大量传感器。示例包括：

- **Electricity consumed point**
  - **描述**：当前某相（P1）或插座消耗的电力（以瓦特为单位）。
  - **网关**：Adam、P1 或 Stretch。
- **Gas Consumed Interval**
  - **描述**：自上次间隔以来消耗的燃气。
  - **网关**：P1。
- **P1 Net Electricity Point**
  - **描述**：您当前的净电力使用量，在生产能源时可能为负值，即通过太阳能电池板。
  - **网关**：P1。
- **P1 Electricity Produced off-peak cumulative**
  - **描述**：非高峰期间的总发电量。
  - **网关**：P1。

#### 开关

- **Relay**
  - **描述**：打开或关闭插座
  - **网关**：Adam、P1 或 Stretch。

## 数据更新

集成从网关获取数据的间隔取决于设备类型。

|设备类型|间隔|
--- | --- 
| 气候实体 |60 秒|
| 能源和燃气实体 |10 秒|
| Stretch 实体 |60 秒|

## 动作

### 气候控制动作

有关如何使用可用动作的信息，请参阅[气候](/home-assistant/integrations/climate#climate-control-actions)集成。

所有气候网关可用的动作：`climate.set_temperature`、`climate.set_hvac_mode` 和 `climate.set_preset_mode`。

Adam 可用的额外动作：`climate.turn_on`、`climate.turn_off` 和 `climate.toggle`。

:::note
额外的动作将把 Adam 的 **regulation mode**（HVAC 系统模式）更改为开或关，影响**所有**连接的温控器的操作。打开将激活之前选择的加热或冷却模式。

:::
### 日程选择动作

可用动作：`select.select_option`

:::tip
可用的日程取决于您配置的[日程](#schedule-management)。

:::
### HVAC 模式

以下 HVAC 模式可用：

- `auto`：温控器日程活动 - 温控器根据用户创建的日程更改预设/设定点。
- `cool or heat`：无活动日程 - 系统手动设置为冷却或加热模式，根据室温相对于温控器设定点激活。

对于 Adam：

- `off`：调节设置为关闭 - HVAC 系统不加热或冷却，但生活热水加热功能（如果可用）保持活动。

如果您有带 Elga 的 Anna：

- `heat_cool`：无活动日程 - 系统处于自动冷却或加热模式，使用活动预设或手动设置的温度来控制 HVAC 系统。

:::note
最后活动的日程的确定方式与长按 Anna 顶部相同。

:::
## 网关模式

Adam 网关支持多种操作模式，提供管理加热和冷却系统的灵活性，让您可以根据需要调整系统的行为。

- 正常模式
  - **描述**：这是默认操作模式，根据配置的活动日程和预设运行。适合日常操作，确保最佳舒适度和能源效率。
  - **备注**：智能温控器和区域控制继续其自调节行为，包括根据其预测要求进行预热或预冷。
- 暂停模式
  - **描述**：暂停模式暂时停止加热或冷却操作，禁用所有日程和温度控制。
  - **备注**：适用于不需要气候控制的场景，例如长时间开门或开窗通风或进行维护工作。系统保持空闲，直到切换回正常模式或其他操作状态。
- 假日模式
  - **描述**：假日模式针对长期缺席优化系统，在保持基本功能的同时降低能耗。加热或冷却设置为最低水平，以防止冻结（冬季）或过热（夏季）。
  - **备注**：适合长期旅行或房屋无人居住的假期。活动日程将被覆盖，直到模式切换回正常。

:::tip
为获得最佳效果，请确保为正常模式适当配置您的日程和预设，并将假日模式设置与您的节能目标保持一致。

:::
## 示例

### 基于能源的自动化

使用 P1 提供的能源数据自动充电汽车的一个很好的示例可以在[汽车充电能源管理系统](https://community.home-assistant.io/t/744069)蓝图中找到。

### 基于气候的自动化

使用智能区域控制或温控器时，过度依赖额外的自动化可能会干扰它们准确预测预热或预冷时间的能力。相反，利用它们的预设模式来优化能源效率并减少环境影响以及您的能源账单。以下是一些帮助您入门的示例。

对于高级定制和完全手动控制，请考虑使用[高级加热控制](https://community.home-assistant.io/t/469873)等蓝图。如果您选择这种方式，我们建议禁用您的 Plugwise 日程以确保蓝图完全控制。

#### 基于在场的预设模式

下面的示例自动化在无人在家时将活动预设调整为 'away'，减少不必要的加热或冷却。例如，如果您在居家工作日意外去办公室，系统将节省能源。活动日程稍后将覆盖 'away' 模式，或者您可以创建一个补充自动化在有人回家时激活另一个预设。

```yaml
automation:
  alias: "Set climate to away when nobody is home"
  triggers:
    # When either occupant leaves for more than 15 minutes
    - trigger: state
      entity_id:
        - person.mom
        - person.dad
      to: not_home
      for:
        minutes: 15
  conditions:
    # If Anna is using the normal "home" preset
    - condition: state
      entity_id: climate.anna
      attribute: preset_mode
      state: home
    # And nobody is home
    - condition: state
      entity_id: person.mom
      entity_id: person.dad
      state: not_home
  actions:
    # Change Anna to Away
    - action: climate.set_preset_mode
      data:
        preset_mode: away
      target:
        entity_id: climate.anna
```

#### 基于日历的假日模式

下面的示例自动化将更改您的 Adam 的网关模式为假日模式（和返回），假设您有一个[日历](/home-assistant/integrations/calendar)集成，其中设置了无人在家时的特定日历事件。

```yaml
automation:
  - triggers:
    - trigger: calendar
      event: start
      # Calendar when your home is vacant
      entity_id: calendar.vacancy
  actions:
    # Change Adam operational mode
    - action: select.select_option
      data:
        option: "vacation"
      target:
        entity_id: select.adam_gateway_mode
  - triggers:
    - trigger: calendar
      event: end
      # Calendar when your home is vacant
      entity_id: calendar.vacancy
      # Offset by some time to allow to pre-condition
      offset: -04:00:00
  actions:
    # Change Adam operational mode
    - action: select.select_option
      data:
        option: "full"
      target:
        entity_id: select.adam_gateway_mode
```

### 支持的设备

### Adam

一个完整的区域控制系统，也称为 [Adam HA](https://www.plugwise.com/zone-control)，支持：

- On/Off、OpenTherm 加热和冷却支持。
- 运行固件 v3.x 或 v2.3。
- 附加设备：
  - 区域温控器，如 Anna、Emma、Lisa 或 Jip（请参阅下面关于连接到 Adam 的 Anna 的警告），
  - 名为 Floor 或 Tom 的阀门控制器，也可以作为区域温控器
  - 地暖控制器 Koen（注意：Koen 总是带有一个 Plug，这是活动部分），
  - 智能开关，Plug 或 Aqara Smart Plug。

:::note
您也可以使用 Adam SA（独立，无 Zigbee 适配器）让您的常规 OpenTherm 温控器变得智能。

:::
### Anna

一款[智能温控器](https://www.plugwise.com/product/anna/)，支持：

- On/Off、OpenTherm 加热和冷却支持。
- 运行固件 v4.x、v3.x 或 v1.x。

### P1 (DSMR)

一款用于连接到您家庭的单相或多相电网电力（包括燃气使用监控）的 [P1](https://www.plugwise.com/smile-p1) 智能电表监控器。运行固件 v4.x、v3.x 或 v2.x。

#### Anna P1

一款与能源监控器[结合](https://www.plugwise.com/product/anna-p1/)的智能温控器可以改变您管理能源的方式。如果您的太阳能装置产生剩余能源并被收费，这种组合可确保多余太阳能被有效重定向。例如为您的热泵供电，以充分利用可再生能源。您有这样的设置吗？我们很想听听您的体验！

### Stretch（已停售）

用于控制和监控传统电源开关，如 Circles 或 Stealths，使用 v3.x 或 v2.x Stretch 固件。

### 不支持的设备

#### Stick

Plugwise 以前销售的电力产品包括 USB 适配器（作为控制器）和智能插座（以及其他一些项目）。此集成不支持 USB 适配器。使用 Stretch 或 Adam 重复使用这些产品（如 Circles 和 Stealths）是支持的。社区正在开发 USB 支持，但尚未准备好成为正式的 Home Assistant 集成。

 - v3.x
 - v2.x

## 故障排除

### 访问本地设备

如果您需要直接配置网关，而不使用 Plugwise 应用程序，您可以通过以下方式找到设备链接：

1. 转到 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择您的集成。
2. 如果您有多个 Plugwise 网关，选择要配置的那个。
3. 选择网关设备，这应该被称为 'Adam'、'Stretch' 或在其名称中包含 'Smile'。
4. 在集成条目上，选择 `[mdi:dots-vertical]` 图标左侧的配置 URL。
5. 将打开一个新窗口/标签页，输入 'smile'（或 'stretch'）作为用户名，背面贴纸上的 ID 作为密码。
6. 查阅手册或点击 [Plugwise Support](https://plugwise.com/support/) 页面上的 'search' 按钮获取交互式帮助。

### 调整更新间隔

请注意，[默认间隔](#data-updates)被视为最佳实践，符合 Plugwise 正常更新其数据的方式。更新太频繁可能会给您的网关带来相当大的负载，导致意外结果或数据丢失。

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

### 诊断数据

如果您需要创建问题来报告错误或想检查诊断数据，请使用以下方法检索诊断：

1. 转到 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择您的集成。
2. 如果您有多个 Plugwise 网关，选择有问题的网关。
3. 选择网关设备，这应该被称为 'Adam'、'Stretch' 或在其名称中包含 'Smile'。
4. 在集成条目上，选择 `[mdi:dots-vertical]`。
   - 然后，选择 **Download diagnostics**，将下载一个 JSON 文件。
5. 您可以检查下载的文件，或者在请求时将其上传到您的问题报告中。

### 重启网关

对于每个网关，集成中都会有一个重启按钮可用。

1. 转到 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择您的集成。
2. 如果您有多个 Plugwise Smile，选择有问题的网关。
3. 选择网关设备，这应该被称为 'Adam'、'Stretch' 或在其名称中包含 'Smile'。
4. 在集成条目上，在 **Configuration** 部分查找 'Reboot' 按钮按下。

## 已知限制

### 日程配置和前提条件

不支持通过此集成创建、修改或删除气候日程。我们建议使用 Plugwise 应用程序或访问本地设备来配置日程。有关如何从 Home Assistant 访问本地设备，请参阅上面的[访问本地设备](#accessing-the-local-device)。

要将您的日程显示为此集成的有效 `select` 选项，请确保日程至少有两个日程点。

### 连接到 Adam 的 Anna

如果您将 Anna 作为 Adam 区域控制系统的一部分使用，它将成为区域温控器，不能配置为智能温控器。集成不会发现您的 Anna 或允许手动配置。

### 带 Elga 的 Anna

冷却模式只能通过设备上的**物理开关**切换（不能通过 Plugwise 应用程序中的切换或使用 Home Assistant）。

冷却模式的更改应该被 Home Assistant 检测到。如果没有，请尝试按如下所示**重新加载** Plugwise 集成并报告您的发现。

1. 创建一个包含您的[诊断数据](#diagnostic-data)的问题。
2. 转到 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择您的集成。
3. 在 "**Hubs**" 页面上，使用 Anna 旁边的 `[mdi:dots-vertical]` 图标并选择 "**Reload**"。

### 假日预设

`vacation` 预设仅在 Anna 上可用。Adam 有一个假日模式（在 Plugwise 应用程序中称为 Action），它禁用活动日程并为所有区域设置假日预设。

此外，还有一个暂停模式，它禁用活动日程并为所有区域设置 away 预设。

### 空闲气候动作

您只能在 Adam 上停止气候动作，请参阅[打开/关闭](#turn-on--turn-off)。另一种方法是调整您的[预设模式](#set-preset-mode)为 `no_frost` 以停止任何加热动作。

## 移除集成

此集成遵循标准的集成移除。在 Home Assistant 或您的 Plugwise 设备上不需要额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

这也将移除所有连接的 Adam 设备（如 Anna、Tom 或 Lisa）或连接的 Adam/Stretch 插座。