# Gardena Bluetooth

**Gardena Bluetooth** 集成可让用户将 Gardena 蓝牙设备接入 Home Assistant。

有关支持信息，请参阅各设备章节：[water control](#water-control)、[irrigation valves](#irrigation-valves)、[lawn mowers](#lawn-mowers)、[garden pumps](#garden-pumps)

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Water control

* Water Control Bluetooth ([01889-20](https://www.gardena.com/int/products/watering/water-controls/water-control-bluetooth/970481101.html))
* Soil Moisture Sensors ([1867-20](https://www.gardena.com/int/products/watering/water-controls/soil-moisture-sensor/967926801.html))

设备配对前可能需要先执行[恢复出厂设置](#factory-reset)，之后才能建立连接。

### 限制

* 不支持控制离线计划设置。
* 使用官方 Android 应用有时会导致设备无法访问，直到执行[恢复出厂设置](#factory-reset)或在 Android 设备上禁用蓝牙为止。

### 恢复出厂设置

1. 取出电池。
2. 按住 `Man.` 按钮并重新装入电池。
3. 持续按住按钮约 10 秒。

## Irrigation valves

* Irrigation Valve 9 V Bluetooth ([1285-20](https://www.gardena.com/int/products/watering/sprinklersystem/irrigation-valve-9-v-bluetooth/970480401/))

### 限制

* 灌溉阀目前尚未经过测试，但预计可以工作。
* Irrigation Valve 9 V Bluetooth 需要固件版本 `1.7.23.29` 或更高版本（可通过 Gardena Bluetooth App 更新）。

## Lawn mowers

### 限制

由于在蓝牙之上使用了自定义协议，Gardena 蓝牙割草机目前不受支持。

## Garden pumps

* Garden Pump ([9058-61](https://www.gardena.com/de/produkte/bewasserung/pumpen/gartenpumpe-6300-silentcomfort/970645401/))
* Garden Pump ([9059-61](https://www.gardena.com/de/produkte/bewasserung/pumpen/gartenpumpe-6500-silentcomfort/970645601/))

### 限制

花园水泵目前尚未经过测试，但预计可以工作。
