---
title: iBeacon Tracker
description: '此集成可通过 UI 配置。前往 设置 设备与服务 添加。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Device tracker
  - Presence detection
  - Sensor
ha_release: '2022.10'
ha_iot_class: Local Push
ha_domain: ibeacon
ha_platforms:
  - device_tracker
  - sensor
ha_bluetooth: true
ha_config_flow: true
ha_integration_type: hub
---
# iBeacon Tracker

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

iBeacon 是支持蓝牙的设备，会广播标识符来表明自身位置。例如，装在垃圾桶上的 iBeacon 可用于判断垃圾桶是在车库里还是已经被推到路边。Home Assistant 可以估算 iBeacon 设备与最近蓝牙适配器之间的距离。

当此集成通过 UI 添加完成，且 [Bluetooth](/home-assistant/integrations/bluetooth) 集成已启用并正常工作后，发现到的 iBeacon 设备会自动被检测并添加。

iBeacon 设备通过以下数据的组合进行追踪：

- UUID（通用唯一标识符）是一个 128 位标识符，通常同一物理位置的所有 iBeacon 都会设置成相同值。
- Major 是一个整数，用于区分具有相同 UUID 的 iBeacon。
- Minor 是一个整数，用于区分具有相同 UUID 和 Major 值的 iBeacon。
- MAC 地址（使用随机 MAC 地址的设备除外）

建议您按照类似以下的方案设置 iBeacon：

- uuid=UUID major=1000 minor=1000 Downstairs Front Room
- uuid=UUID major=1000 minor=1001 Downstairs Bathroom
- uuid=UUID major=2000 minor=1001 Upstairs Main Bedroom
- uuid=UUID major=2000 minor=1002 Upstairs Guest Bedroom
- uuid=UUID major=3000 minor=1000 Attic

不支持 Major 和 Minor 值不稳定的 iBeacon 设备。如果系统在同一个固定 MAC 地址的 iBeacon 上，看到同一 UUID 对应十个或更多不同的 Major 和 Minor 值，就会自动移除该设备。

对于不广播名称的 beacon，系统不会自动创建设备，以避免大量短暂设备充斥您的系统。

如果您希望即使设备名称为空，也明确允许添加某些 UUID 列表，可在集成选项中进行设置。

## Options

To define options for iBeacon Tracker, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of iBeacon Tracker are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

## 何时将 iBeacon 视为离开

由于系统设置和 iBeacon 固件等多种因素影响，iBeacon 不会立即被标记为“离开”。这可能需要几分钟时间。

## 固定 MAC 地址

具有固定 MAC 地址的 iBeacon 会针对每组 UUID、Major、Minor 和 MAC 地址组合创建自己的一组实体，从而实现基于单个物理设备的距离和存在检测。在这种设置下，可以有多个 iBeacon 广播相同的 UUID、Major 和 Minor 组合，但设备数量不能超过五个。

## 随机 MAC 地址

使用随机 MAC 地址的 iBeacon 会在集成发现同一 UUID、Major 和 Minor 组合来自十个或更多 MAC 地址后，被合并为一组实体。这使系统可以基于最后一次上报的数据进行距离和存在检测。使用随机 MAC 地址时，只有一个设备应广播该唯一的 UUID、Major 和 Minor 组合。

## 传感器

此集成默认会创建一个估算距离传感器。该估算值假设 iBeacon 与蓝牙适配器之间具有理想的射频条件和无遮挡视线。通常，估算距离主要用于判断 iBeacon 是紧邻适配器、在附近，还是较远。如果系统中有多个适配器，则会由 RSSI 值最佳的适配器来上报距离。由于这个来源可能变化，因此在判断距离时检查 source 属性非常重要。

要让估算距离传感器正常工作，多数情况下需要先在厂商应用中完成校准。请将设备放在距离蓝牙适配器 1 米、无遮挡的位置，读取其 dBm 信号强度，并将该值填写到设备应用对应的字段中。

## 已知可用设备

- [Blue Charm Beacons BC-U1-USB-Powered-MultiBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-ibeacon-bc-u1-multibeacon-usb-powered/)
- [Blue Charm Beacons BC011-MultiBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-multi-beacon-bc011/)
- [Blue Charm Beacons BC021-MultiBeacon](https://bluecharmbeacons.com/product/bluetooth-ble-ibeacon-bc021-multibeacon-with-button-trigger-and-motion-sensor/)
- Blue Charm Beacons BC037G-GeoPattern-iBeacon (discontinued)
- Blue Charm Beacons BC037S-SmoothPattern-iBeacon (discontinued)
- Blue Charm Beacons BC08-MultiBeacon (discontinued)
- Blue Charm Beacons BC037G-GeoPattern-iBeacon (discontinued)
- Blue Charm Beacons BC037S-SmoothPattern-iBeacon (discontinued)
- [Blue SLIM ID](https://elainnovation.com/en/catalogue/blue-slim-id-en/)
- [Feasycom FSC-BP103B](https://www.feasycom.com/product/fsc-bp103b/)
- [Feasycom FSC-BP104D](https://www.feasycom.com/product/fsc-bp104d/)
- [Feasycom FSC-BP106](https://www.feasycom.com/fsc-bp106)
- [Feasycom FSC-BP108](https://www.feasycom.com/product/fsc-bp108b/)
- [MikroTik TG-BT5-IN](https://mikrotik.com/product/tg_bt5_in) (Additional sensors such as angle or impact are not compatible)
- [NRF51822 iBeacon](https://www.aliexpress.com/item/32826502025.html)
- [NRF52810 iBeacon](https://www.aliexpress.com/item/1005003211033416.html)
- [Pawscout Tag](https://pawscout.com/shop/pawscout-tag/)
- [SwiftFinder](https://www.amazon.com/dp/B089MD5NP7) (Requires being paired to a phone first before it starts transmitting once a minute, otherwise it stays asleep)
- [Teltonika EYE Teltonika EYE Sensor](https://teltonika-gps.com/products/accessories/sensors-beacons/eye) (Additional sensors such as accelerometer, temperature, and humidity are not compatible)

## 自动化示例

```yaml
alias: "The black trash can has left the building"
triggers:
  - trigger: state
    entity_id: sensor.black_trash_bin_estimated_distance
    to: "unavailable"
    for:
      hours: 0
      minutes: 5
      seconds: 0
  - trigger: numeric_state
    entity_id: sensor.black_trash_bin_estimated_distance
    for:
      hours: 0
      minutes: 5
      seconds: 0
    above: 20
actions:
  - action: notify.notify
    data:
      message: "The black trash can has left the building"
      title: "The black trash can has left the building"
```
