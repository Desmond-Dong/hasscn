# HomeWizard

[HomeWizard](https://www.homewizard.com/) 平台的集成。它可以从 HomeWizard 产品本地收集数据，并在 Home Assistant 中创建为传感器。使用此集成，你可以监控电力、燃气和用水情况，从而优化能源使用。此集成收集的信息可用于 [Energy dashboard](/home-assistant/home-energy-management)。

## 支持的设备

* [P1 Meter](https://www.homewizard.com/p1-meter/)：提供电力输入/输出、能耗（单相或三相），以及智能电表和燃气信息的传感器（型号：`HWE-P1`）
* [Energy Socket](https://www.homewizard.com/energy-socket/)：提供电力输入/输出和能耗传感器，以及用于控制插座的开关（型号：`HWE-SKT`）
* [Watermeter](https://www.homewizard.com/watermeter/)：提供当前和总用水量传感器（型号：`HWE-WTR`）
* [kWh Meter 1-Phase](https://www.homewizard.com/kwh-meter/)：提供电力输入/输出和能耗传感器（型号：`HWE-KWH1`、`SDM230-wifi`）
* [kWh Meter 3-Phase](https://www.homewizard.com/kwh-meter/)：提供电力输入/输出和能耗传感器（型号：`HWE-KWH3`、`SDM630-wifi`）
* [Plug-In Battery](https://www.homewizard.com/plug-in-battery/)：提供电力输入/输出、能耗、发电量和荷电状态传感器（型号：`HWE-BAT`）

## 启用 API

你必须启用本地 API，Home Assistant 才能与你的设备通信。请在 HomeWizard 应用中完成此操作：

:::tip
如果你配置的是以下设备之一，可以跳过这一步：

* 固件版本为 6 或更高的 Wi-Fi P1 Meter
* 固件版本为 5 或更高的 Wi-Fi kWh Meter
* Plug-In Battery

这些产品使用另一种身份验证方式，不需要启用本地 API。

:::

1. 进入 Settings（右上角齿轮图标）。
2. 进入 `Meters`。
3. 选择你的设备。
4. 向下滚动并开启 `Local API`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
IP address:
  description: "设备的 IP 地址。你可以在路由器中找到它。"
```

## 支持的功能

HomeWizard 集成会提供与你设备测量内容或运行状态相关的传感器。所有这些都会在 Home Assistant 中作为实体提供。下面概述此集成提供的实体。

### P1 Meter

*并非所有智能电表都会提供全部传感器，集成中只会显示可用的传感器。*

* **Energy import/export (kWh)**：自智能电表安装以来累计输入或输出的总电量。每个费率都有单独传感器（例如 T1、T2），同时也有一个合计值传感器
* **Power (W)**：当前测得的有功功率消耗，每个相位都有独立传感器。如果是在发电，传感器读数会为负值
* **Voltage (V)**：当前测得的电压，每个相位都有独立传感器
* **Current (A)**：当前测得的电流，每个相位都有独立传感器
* **Tariff**：当前使用的费率。你可以用它来尽量降低高峰时段的用电量
* **Frequency (Hz)**：电网频率
* **Voltage sags and swells**：检测到电压跌落或电压升高的次数
* **Power failures**：两个传感器用于指示智能电表检测到的停电次数，一个表示全部停电次数，另一个表示“长时间”停电次数
* **Peak demand**：比利时用户开始按每月峰值用电收费（参见 [capaciteitstarief](https://www.fluvius.be/thema/factuur-en-tarieven/capaciteitstarief)）。有两个传感器可用：一个显示当前季度平均值，另一个显示本月测得的峰值。两者都由智能电表直接提供，可用于尽量降低峰值
* **Status light brightness**：控制绿色状态灯的亮度。即使亮度设为 0，错误状态仍会被可视化显示

外部计量设备，如燃气表或水表，可以连接到智能电表。每个设备都会作为单独设备暴露，并带有各自的测量值。

### kWh Meter

* **Energy import/export (kWh)**：由 kWh Meter 测得的总输入或输出电量
* **Power (W)**：当前测得的有功功率消耗，每个相位都有独立传感器。如果是在发电，传感器读数会为负值
* **Production power (W)**：当前测得的发电功率。如果是在用电，读数会为负值。这个传感器可以在能源仪表板中作为太阳能发电功率传感器使用
* **Voltage (V)**：当前测得的电压，每个相位都有独立传感器
* **Current (A)**：当前测得的电流，每个相位都有独立传感器
* **Frequency (Hz)**：电网频率
* **Reactive power (VAR)**：当前测得的无功功率，每个相位都有独立传感器
* **Apparent power (VA)**：当前测得的视在功率，每个相位都有独立传感器

### Energy Socket

* **Energy import/export (kWh)**：由 Energy Socket 测得的总输入或输出电量
* **Power (W)**：当前测得的有功功率。如果是在发电，传感器读数会为负值
* **Production power (W)**：当前测得的发电功率。如果是在用电，读数会为负值。这个传感器可以在能源仪表板中作为太阳能发电功率传感器使用
* **Voltage (V)**：当前测得的电压
* **Current (A)**：当前测得的电流
* **Frequency (Hz)**：电网频率
* **Reactive power (VAR)**\*：当前测得的无功功率
* **Apparent power (VA)**\*：当前测得的视在功率

:::note
并非所有硬件版本都提供无功功率和视在功率，这取决于内部计量芯片。

:::
Energy Socket 还带有一个控制插座状态的开关，以及一个可控制的状态灯。

* **Switch**：控制 Energy Socket 插座的开关状态。当 *Switch Lock* 开启时，这个开关会始终保持开启。你可以用它控制一些简单设备的供电，比如加热器或充电器
* **Switch lock**：强制插座保持 *on* 状态，并禁用实体按钮。当插座连接的是不应断电的设备，比如冰箱时，这个选项会很有用
* **Status light brightness**：控制绿色状态灯的亮度。插座开启时，这个灯会点亮

### Watermeter

* **Water usage (L/min)**：当前时刻测得的水流量
* **Total water usage (m³)**：自 Watermeter 安装以来的总用水量

### Plug-In Battery

* **Energy import/export (kWh)**：电池输入或输出的总能量
* **Power (W)**：电池当前消耗或产生的有功功率。如果是在发电，传感器读数会为负值
* **Production power (W)**：当前测得的发电功率。如果是在用电，传感器读数会为负值。这个传感器可在能源仪表板中作为电池功率传感器使用
* **Voltage (V)**：当前测得的电压
* **Current (A)**：电池当前消耗或产生的电流
* **Frequency (Hz)**：电网频率
* **Cycles**：电池经历过的充放电循环次数
* **State of charge (%)**：当前电池荷电状态
* **Status light brightness**：控制 LED 灯带的亮度。即使亮度设为 0，错误状态仍会被可视化显示

#### 电池组模式

连接的 Plug-In Battery 组可以通过 **Battery group mode** 选择实体以三种不同模式进行控制：

* **Zero mode**：在此模式下，Plug-In Battery 会尽量让你家中的净用电或发电接近零。电池会自动充电或放电，以维持功率平衡。这是默认设置，可帮助你最大化自用率并减少与电网的交互
* **Zero mode (charge only)**：Plug-In Battery 只会充电，以吸收多余的太阳能发电，目标是让家庭发电量保持在零。此模式下禁用放电。如果你想把太阳能储存起来供稍后使用，比如晚上或电价更高时，这会很有用
* **Zero mode (discharge only)**：Plug-In Battery 只会放电，在家庭用电高于太阳能发电时提供电力，目标是让家庭用电量保持在零。此模式下禁用充电。如果你在电价较高时更希望使用已储存的能量，或者把多余太阳能卖回电网，这会很有帮助
* **Manual charge mode**：所有已连接的 Plug-In Battery 都会被充至 100%，不考虑家庭的用电或发电情况。当所有电池都充满后，Plug-In Battery 会切换到 standby 模式
* **Standby**：电池进入待机模式。此时 Plug-In Battery 既不充电，也不放电

你可以在负责管理电池的设备上找到 **Battery group mode** 选择实体：这可能是你的 P1 Meter，也可能是 kWh Meter，取决于你在 HomeWizard 应用中将哪一个设置为主电源连接。这个实体不会直接出现在电池本身上。如果你在初始设置之后新增 Plug-In Battery，**Battery group mode** 实体可能默认被禁用。要启用它，请参阅[我找不到实体](#i-cant-find-entities-like-voltage-current-or-battery-group-mode)。

:::tip
`Zero mode (charge only)` 和 `Zero mode (discharge only)` 仅适用于：

* 固件版本为 6.0300 或更高的 P1 Meter
* 固件版本为 5.0100 或更高的 kWh Meter

若要了解如何将设备更新到最新版本，请参阅 [How do I check if I have the latest software on my HomeWizard product?](https://helpdesk.homewizard.com/en/articles/9167578-how-do-i-check-if-i-have-the-latest-software-on-my-homewizard-product)

:::

## Identify 按钮

你可以按下 identify 按钮，让状态灯闪烁几秒钟。
*kWh Meter 不支持此功能。*

## 云通信

HomeWizard Energy 设备被设计为与 HomeWizard Energy 应用配合使用，并且需要与 HomeWizard 云通信，应用才能正常工作。你可以使用 “Cloud connection” 配置开关关闭所有与 HomeWizard 云的通信，从而让设备完全本地化。这样设备将无法再与应用通信，也无法接收未来的固件更新。

Plug-In Battery 不支持此功能。当你再次打开该开关时，云通信会恢复。恢复出厂设置或让设备进入配对模式后，云通信也会恢复。

## 示例

### 当洗衣机完成时发送通知

如果你了解洗衣机的功耗特征，可以创建一个自动化，在能耗低于某个阈值时发送通知。这样就能在洗衣机完成后提醒你。你可以使用下面这个 blueprint：

* [Appliance Power Monitor Blueprint With Elapsed Time and Energy Used Variables](https://community.home-assistant.io/t/549073)，由 [@Jhonattan-Souza](https://community.home-assistant.io/u/jhonattan-souza) 创建

### 将能源数据添加到 Energy dashboard

HomeWizard Energy 集成提供的数据可用于 Energy dashboard。要将你的数据添加到 Energy dashboard，请参阅 [Energy dashboard documentation](/home-assistant/home-energy-management)。

## 数据获取间隔

此集成每 5 秒轮询一次新数据。对设备发出的请求数量和频率没有限制。

如果你想自定义设备轮询数据的间隔，可以禁用默认轮询间隔并创建自己的轮询自动化。

1. 进入 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择你的集成。
2. 在集成条目上，选择 `[mdi:dots-vertical]`。
   * 然后，选择 **System options** 并关闭 polling。
3. 要定义自定义轮询间隔，创建一个自动化。
   * 进入 [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) 并创建新自动化。
   * 定义你需要的触发器和条件。
   * 选择 **Add action**，然后选择 **Other actions**。
   * 选择 **Perform action**，再从列表中选择 [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/index.md#action-homeassistantupdate_entity)。
   * 选择要更新的区域、设备、实体或标签。
4. 保存自动化。

## 已知限制

### Watermeter 不能使用电池供电配合本集成

Watermeter 可以通过 USB-C 线缆供电，也可以使用电池供电。使用电池时，它只会每隔几个小时连接一次 Wi-Fi。因此，只有在通过 USB-C 线缆供电时才能使用 API。Watermeter 使用电池供电时，无法使用此集成。

### P1 Meter 可能更新较慢

P1 Meter 的更新取决于智能电表，而智能电表通常每 1 秒或 10 秒更新一次。这意味着 P1 Meter 的更新速度可能比其他设备慢。

## 故障排除

### 我的设备没有显示出来

如果你找不到设备，或者它们没有出现在集成设置中，可能由以下原因导致：

* 设备未连接到网络。你必须先通过 HomeWizard Energy 应用将新设备连接到网络
* 请确认设备已更新到最新固件。了解更新方法请参阅：[How do I check if I have the latest software on my HomeWizard product?](https://helpdesk.homewizard.com/en/articles/9167578-how-do-i-check-if-i-have-the-latest-software-on-my-homewizard-product)
* 请确认已在 HomeWizard Energy 应用的设备设置中启用本地 API
* 请确认 Home Assistant 和设备位于同一网络中

### 配置设备时需要按哪个按钮？

1. 在设置过程中，系统可能会要求你按下设备上的一个按钮，以便设备与 Home Assistant 进行身份验证。
   * **P1 Meter**：按下 P1 Meter 正面的白色按钮。
   * **Plug-In Battery**：按下设备正面的黑色触摸按钮。你会听到一声蜂鸣。
   * **kWh Meter**：按住带有 Wi-Fi 图标的按钮两秒钟。在显示屏出现 `AP` 之前松开按钮。
   * **Energy Socket** 和 **Watermeter**：不需要这一步。
2. 按下按钮后，你必须在 30 秒内选择 **Continue** 以完成设置。
   * 如果设置超时，你可能需要再次按下按钮。

## I can't find entities like voltage, current, or battery group mode

某些实体默认处于禁用状态。你可以在集成设置中启用它们。更多信息请参阅[启用或禁用实体](/home-assistant/common-tasks/general/index.md#enabling-or-disabling-entities)。

## 删除集成

此集成遵循标准的集成删除流程。

1. 进入 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并选择集成卡片。
2. 从设备列表中，选择你要删除的集成实例。
3. 在条目旁边，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。

删除集成后，如果没有其他集成仍在使用本地 API，请前往 HomeWizard 应用并禁用本地 API。
