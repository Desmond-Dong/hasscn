---
title: eQ-3 Bluetooth Smart Thermostats
description: 'eQ-3 Bluetooth Smart Thermostats 集成允许您集成 eQ-3 Bluetooth Smart 温控器。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Climate
ha_iot_class: Local Polling
ha_release: 2024.5
ha_config_flow: true
ha_codeowners:
  - '@eulemitkeule'
  - '@dbuezas'
ha_domain: eq3btsmart
ha_integration_type: device
ha_platforms:
  - binary_sensor
  - climate
  - number
  - sensor
  - switch
---
# eQ-3 Bluetooth Smart Thermostats

**eQ-3 Bluetooth Smart Thermostats** 集成允许您集成 eQ-3 Bluetooth Smart 温控器。

当前功能允许设置温度以及借助 [eq3btsmart](https://github.com/eulemitkeule/eq3btsmart) 库控制支持的模式。
由于设备不包含温度传感器（[了解更多](https://forum.fhem.de/index.php/topic,39308.15.html)），我们也将目标温度报告为当前温度。

### 配对

根据您的连接方式和设备固件版本，配对 eQ-3 Bluetooth Smart 温控器设备的方式不同。

#### [ESPHome Bluetooth Proxies](https://esphome.io/components/bluetooth_proxy/)

对于低于 148 的固件版本，使用 ESPHome Bluetooth Proxies 时不需要额外配置。
自版本 148 起，设备中的安全漏洞已修复，现在需要输入密码。

要配置密码，请将以下内容添加到您的 ESPHome Bluetooth Proxy 配置中：

```yaml
esp32_ble:
  io_capability: keyboard_only

ble_client:
  - mac_address: <MAC>
    id: my_eq3_thermostat
    auto_connect: true
    on_passkey_request:
      then:
        - ble_client.passkey_reply:
            id: my_eq3_thermostat
            passkey: <温控器上显示的 PIN 码。要显示 PIN，请按住主按钮。>
```

有关更多信息，请参阅 [ESPHome 文档](https://esphome.io/components/ble_client/#on_passkey_request)。

#### 其他

仅固件版本 120 以上需要配对。<br>
在配置 Home Assistant 之前，您需要使用 `bluetoothctl` 将温控器与蓝牙适配器配对。

```bash
bluetoothctl
scan on
# 等待温控器出现并复制其 MAC 地址
# 预期输出：[NEW] Device 00:1A:23:27:F8:4E CC-RT-BLE
scan off
pair <MAC>
# 按住温控器上的主按钮以显示 PIN
# 提示时输入显示的 PIN
trust <MAC>
disconnect <MAC>
exit
```


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::