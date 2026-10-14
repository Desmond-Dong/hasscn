# IronOS

**IronOS** 集成可将 Home Assistant 与 PINE64 的 Pinecil V2 焊台无缝连接，实现远程监控和控制。此集成可实时更新温度、功率，以及多种设置和诊断信息。

## 关于 IronOS

**IronOS** 是适用于智能焊台的开源固件，提供电源协商、电池保护和可自定义设置等高级功能。它最初为 TS100 开发，现在已支持多种设备，其中包括首款支持 BLE 的 Pinecil V2。该固件功能完整，并提供 31 种语言版本。

## 你可以如何使用此集成

通过 IronOS 集成，你可以在 Home Assistant 中监控和控制智能焊台，并自动化相关任务。例如，当焊台进入焊接模式时，你可以自动开启排烟器，而在焊台放下时将其关闭。你还可以直接在仪表板中监控焊嘴和手柄温度，以及功耗和输入电压。

## 最低要求

* **Pinecil V2** 需要 IronOS v2.21 或更高版本才能连接到 Home Assistant。更新说明请参阅 [Pinecil 文档](https://pine64.org/documentation/Pinecil/Firmware/)。

## 先决条件

IronOS 集成要求你的设备位于 Home Assistant 的蓝牙范围内，并且 Home Assistant 必须配备 [蓝牙适配器](/home-assistant/integrations/bluetooth/index.md)。如果设备超出范围，可以在设备附近放置 [ESPHome 蓝牙代理](https://esphome.io/projects/?type=bluetooth)。在这种情况下，Home Assistant 无需蓝牙适配器。

Home Assistant 会检测附近的 IronOS 设备。发现的设备会显示在 [Settings > Devices & services](https://my.home-assistant.io/redirect/integrations/) 的已发现区域中。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 配置参数

```yaml
"Address":
  description: "检测到的 IronOS 设备的蓝牙地址。"
```

## 数值控制

* **设定温度**：用于设置焊嘴的目标温度。

## 二进制传感器

* **焊嘴**：指示当前是否有焊嘴连接到设备。

## 传感器

* **焊嘴温度**：监控焊嘴当前温度。
* **手柄温度**：显示焊台手柄温度。
* **估算功率**：显示焊台的估算功耗。
* **DC 输入电压**：报告焊台当前输入电压。
* **上次移动时间**：指示焊台上次检测到移动的时间，相对于设备运行时长计算，适合用于活动监控。
* **运行模式**：显示焊台当前运行状态，例如空闲、焊接、增强、休眠、设置或调试。
* **焊嘴最高温度**：显示当前插入焊嘴所支持的最高温度。
* **功率等级**：以百分比显示脉宽调制（PWM）占空比，表示焊台当前功率输出，例如 `50%` 表示 50% 占空比。
* **电源来源**：显示焊台当前使用的电源类型，例如 DC 输入、USB Quick Charge、USB Power Delivery 或 USB Power Delivery VBUS。
* **焊嘴原始电压**：测量焊台热电偶上的原始电压，随后经过偏移补偿并转换为焊嘴温度。
* **焊嘴电阻**：显示当前插入焊嘴的电阻，例如短焊嘴为 `6.2 Ω`，普通焊嘴为 `8 Ω`。
* **运行时长**：记录焊台自上次通电以来的总运行时间。
* **霍尔效应强度**：（可选）此功能要求设备已[加装霍尔效应传感器](https://pine64.org/documentation/Pinecil/Modifications/Hall_effect_sensor/)。如果在支架上安装钕磁铁，就能实现接近检测，并可根据焊台与支架的距离校准其进入休眠模式的时机。

## 更新

* **固件**：更新实体会显示当前固件是否为最新版本，或是否有适用于你设备的较新 IronOS 版本。有关如何更新设备的更多信息，请参阅 [IronOS 文档](https://ralim.github.io/IronOS/)。

## 设备设置与配置

以下控件可让你自定义焊接设备的设置和选项。其中一些控件默认处于停用状态，因为它们属于高级设置、不太关键，或通常无需调整。

### 基本设置

* **增强**：启用或禁用增强功能。启用后，按住前侧按钮会暂时将焊嘴温度提升到增强温度。

* **增强温度**：定义按住前侧按钮时启用的临时升温值。

* **休眠温度**：设备在一段时间无活动后（无移动或按键操作）降至的温度。

* **休眠超时**：设备进入休眠模式并降至休眠温度前所需的无活动时长。

* **长按温度步进**：按住按钮时温度调整的增量。默认值为 10°。

* **短按温度步进**：短按按钮时温度调整的增量。默认值为 1°。

* **运动灵敏度**：控制设备对移动的敏感程度。数值越高，灵敏度越高，例如 `0 = 关闭移动检测`。

* **霍尔效应灵敏度**：配置霍尔效应传感器（如果存在）检测磁铁并触发休眠模式的灵敏度。

* **显示亮度**：调整焊台显示屏亮度。

* **按键锁定模式**：配置是否锁定按钮以防误触，可选禁用、完全锁定或仅增强模式。

* **显示方向模式**：设置显示方向，可选左手、右手或自动调整。

* **启动行为**：定义设备通电后的进入模式，可选禁用、休眠模式、空闲模式（在移动前不加热）或焊接模式。

* **焊嘴类型**：选择正在使用的焊嘴类型：TS100 长 / Hakko T12、Pinecil 短，或 PTS200 短。自动感应选项可自动检测焊嘴类型。此功能需要 IronOS v2.23 或更高版本。

* **霍尔效应休眠超时**：指定设备在霍尔效应传感器（如果存在）检测到接近磁铁后，经过多长时间无活动才进入休眠模式。此功能需要 IronOS v2.23 或更高版本。

### 用户界面设置

* **滚动速度**：调整菜单中说明文字的滚动速度，可选慢或快。
* **温度显示单位**：设置温度显示单位为摄氏度（C°）或华氏度（F°）。
* **动画速度**：调整菜单中图标动画的速度，可选关闭、慢、中或快。
* **启动 Logo 时长**：设置启动 Logo 的显示时长，可选关闭、1-5 秒或循环。
* **动画循环**：控制菜单动画是否持续循环。仅在启用动画速度时适用。
* **详细空闲界面**：在空闲界面启用更详细的显示，相比默认图标视图可显示更多文本信息。
* **详细焊接界面**：在焊接界面启用更详细的文本显示方式，减少图形元素的使用。
* **反转屏幕**：反转 OLED 屏幕颜色。
* **交换 +/- 按钮**：在调节界面中交换升温和降温按钮的功能。
* **降温界面闪烁**：当焊嘴温度超过 50°C 时，使空闲界面中的焊嘴温度闪烁，作为焊嘴仍然很烫的警告。

### 电源管理

* **保持唤醒脉冲持续时间**：指定用于让已连接充电宝保持唤醒状态的电脉冲持续时间。较短的持续时间可减少电力浪费和不必要发热。
* **保持唤醒脉冲延迟**：调整电脉冲之间的间隔。较长的间隔可减少不必要的发热，但必须足够短，避免充电宝自动断电。
* **保持唤醒脉冲强度**：启用并设置电脉冲功率。该电脉冲会短暂激活加热器以消耗足够电力，防止已连接的充电宝进入休眠模式。
* **电源来源**：设置电源类型，可选外部电源或 3S 到 6S 电池配置。
* **每节电池最低电压**：设置关机前每节电池的最低电压。该值会乘以电池串数，例如 3S：3-3.7V，4-6S：2.4-3.7V。
* **Power Delivery 超时**：定义固件在切换到 Quick Charge 前尝试协商 USB-PD 的时长。若希望更快完成 PD 协商，建议使用较低数值。
* **功率限制**：为设备设置自定义瓦数上限，以使**平均**功率保持低于此值。注意：无法控制峰值功率。使用 USB-PD 时，实际限制将取此设置与电源声明瓦数中的较小值。
* **Quick Charge 电压**：调整 Quick Charge 协商时的最高电压。不会影响 USB-PD。为确保安全，请确认该设置与你电源的额定电流相匹配。
* **Power Delivery 3.1 EPR（Extended Power Range）**：启用 EPR 模式，可配合[兼容的 USB-C 电源](https://pine64.org/documentation/Pinecil/Power_supplies/Power_supplies/#epr-pd31-140w-chargers)支持最高 28V 输入电压。可选项为 *on*、*off* 和 *safe*（不会动态请求更多功率）。*safe* 选项需要 IronOS v2.23 或更高版本。

### 高级设置

这些设置面向有经验的技术用户，修改前请谨慎考虑。

* **分压器**：微调测得的电压，以补偿不同设备间电压检测电阻的差异。
* **校准偏移**：调整热电偶测量的校准值，从而影响焊嘴显示温度。
* **校准 CJC（冷端补偿）**：在下次启动时执行热电偶校准，以提高温度准确性。仅在温度读数持续不准确时才需要。校准前请确保设备处于室温。更多信息请参阅[文档](https://ralim.github.io/IronOS/Settings/#setting-calibrate-cjc-at-next-boot)。

### 保存与恢复

* **保存设置**：保存当前配置并永久生效。修改后请使用此项，以确保设置在设备重启后仍然保留。
* **恢复默认设置**：将所有配置选项重置为出厂默认值。注意：此操作无法撤销，所有自定义设置都会丢失。若想保留自定义设置，请先创建场景再恢复默认值。

## 自动化

你可以从这个适用于 IronOS 的现成蓝图自动化示例开始。

### 焊接排烟器自动化

在开始焊接时自动开启排烟器，并在焊台空闲时自动关闭。

[![Open Import blueprint in your Home Assistant instance.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=%3Chttps%3A%2F%2Fcommunity.home-assistant.io%2Ft%2Fironos-soldering-fume-extractor-automation-pinecil-v2%2F802156%3E)

<details>
<summary>Example YAML configuration</summary>

```yaml
triggers:
  - trigger: state
    entity_id: sensor.pinecil_operating_mode
    to: soldering
    id: start soldering
    from:
  - trigger: state
    entity_id: sensor.pinecil_operating_mode
    from: soldering
    to: idle
    id: stop soldering
actions:
  - if:
      - condition: trigger
        id:
          - start soldering
    then:
      - action: switch.turn_on
        target:
          entity_id: switch.fume_extractor
  - if:
      - condition: trigger
        id:
          - stop soldering
    then:
      - action: switch.turn_off
        target:
          entity_id: switch.fume_extractor
```

</details>

## 数据更新

当设备通电时，此集成会保持活跃的蓝牙连接，并每 5 秒刷新一次数据。

### 已知限制

* IronOS 不支持通过蓝牙开机、从休眠唤醒，或从空闲模式唤醒。这些操作受限是为了确保安全并防止设备意外启动。
* 无法从 Home Assistant 更新设备，因为 IronOS 不支持 OTA 更新。

### 故障排除

* **错误：`Characteristic f6d70xxx-5a10-4eba-aa55-33e27f9bc533 was not found!`**：

  使用 ESPHome BLE 代理时，出现此错误通常是因为缓存的 GATT 特征数量上限过小。IronOS 在 Pinecil V2 上公开了 60 多个特征，超过了默认限制。要解决此问题，请使用以下设置重新编译 ESPHome 蓝牙代理固件：

  ```yaml
  esp32:
    board: ${board}
    framework:
      type: esp-idf
      sdkconfig_options:
        CONFIG_BT_GATTC_MAX_CACHE_CHAR: "100"
  ```

无论如何，在报告问题时，请先启用[调试日志](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)，重启集成，并在问题再次出现后立即停止调试日志（*会自动开始下载调试日志文件*）。如果条件允许，也请同时下载[诊断数据](/home-assistant/integrations/diagnostics.md)。收集好调试日志和诊断数据后，请与问题报告一并提交。

## 删除集成

你可以按照以下步骤删除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
4. Home Assistant 会自动重新发现该设备。如果你不想再次看到它，请选择 Ignore。
