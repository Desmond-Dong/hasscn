# devolo Home Control

[devolo](https://www.devolo.global) Home Control 是一个以 [Z-Wave to IP 网关](https://www.devolo.de/devolo-home-control-zentrale) 为中心的 Z-Wave 生态系统。此集成允许您控制连接到网关的设备。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email / mydevolo ID:
  description: "您用于在 mydevolo 注册中央单元的电子邮箱地址。"
Password:
  description: "您的 mydevolo 账户密码。"
```

:::note
您的 mydevolo 账户仅用于获取本地凭据。之后，只要网关在同一网络内，通信完全在本地进行。

:::

## 支持的设备和功能

### 开关

此集成支持以下 Z-Wave 设备：

* devolo Metering Plug v1
* devolo Metering Plug v2
* devolo Switch FM
* Qubino Flush 1 Relay
* Qubino Flush 1D Relay
* Fibaro Wall Plug
* Fibaro Double Relay Switch

### 二值传感器

此集成支持以下 Z-Wave 设备：

* devolo Door/Window Contact
* devolo Flood Sensor
* devolo Key-Fob Switch
* devolo Motion Sensor
* devolo Smoke Detector
* devolo Wall Switch
* Fibaro Floor Sensor
* Fibaro Motion Sensor
* Fibaro Smoke Sensor

此集成支持以下功能：

* 各种开关的过载报警传感器
* devolo 和 Qubino 嵌入式继电器的传感器 I2 和 I3

### 遮盖

此集成支持以下 Z-Wave 设备：

* devolo Shutter FM
* Qubino Flush Shutter

### 气候

此集成支持以下 Z-Wave 设备：

* devolo Radiator Thermostat
* Danfoss Living Connect Z Radiator Thermostat

### 灯光

此集成支持以下 Z-Wave 设备：

* devolo Dimmer FM
* Qubino Flush Dimmer

### 传感器

此集成支持以下功能：

* 支持 devolo 传感器的温度和亮度
* 支持 devolo 和 Qubino 设备的消耗量
* devolo Metering Plug v2 的电压

### 警报器

此集成支持以下 Z-Wave 设备：

* devolo Siren

## 已知限制

此集成不支持设备添加和删除，因为本地 API 拒绝这些操作。
要添加或删除设备，请使用 devolo Home Control 应用程序或 Web 界面。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
