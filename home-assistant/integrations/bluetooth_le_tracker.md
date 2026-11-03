# Bluetooth LE Tracker

此集成在启动时和定期间隔中发现新设备，并根据 interval\_seconds 值定期跟踪蓝牙低功耗设备。设备之间不需要配对。

发现的设备在 `known_devices.yaml` 中以 'BLE\_' 作为设备 MAC 地址的前缀存储。

## 设置

此集成需要启用并正常运行 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成。

## 配置

要在您的安装中使用蓝牙跟踪器，请将以下内容添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
```

```yaml
track_new_devices:
  description: 新发现的设备是否默认被跟踪。
  required: false
  default: false
  type: boolean
track_battery:
  description: 集成是否应尝试读取被跟踪设备的电池状态。
  required: false
  default: false
  type: boolean
track_battery_interval:
  description: 向设备询问电池状态的最小间隔。电池状态在每个间隔内最多检查一次。如果 `track_battery` 为 false，则此项将被忽略。
  required: false
  default: 1 day
  type: time
interval_seconds:
  description: 每次扫描新设备之间的秒数。
  required: false
  default: 12
  type: integer
```

由于某些 BT LE 设备会定期更改其 MAC 地址，因此新设备只有被看到 5 次后才会被发现。

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: bluetooth_le_tracker
    track_new_devices: true
    track_battery: true
    track_battery_interval: 12h
    interval_seconds: 30
```

For more information about how device trackers are discovered and shown, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about using multiple device tracker sources together, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about ARP-based device tracker behavior, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about contributing additional device tracker docs, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about device tracker details, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about using device trackers for motion-related logic, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
For more information about presence detection concepts, refer to the [device tracker documentation](/home-assistant/integrations/device_tracker/index.md).
