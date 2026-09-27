# Vegetronix VegeHub

**[Vegetronix VegeHub](https://vegetronix.com/Products/ha/VG-HUB-RELAY/)** 是一款紧凑型网络连接设备，专为农业监测与控制而设计。它支持多种环境传感器，包括*土壤湿度、土壤温度、光照等*，因此适用于园艺、景观维护和精准农业。除了监测功能外，VegeHub 还可以控制*继电器、泵或水阀*等执行器，实现灌溉和其他系统的自动化。此集成允许 Home Assistant 接收 VegeHub 设备的实时数据，并可选择控制已连接的输出端。

VegeHub 提供[标准配置](https://vegetronix.com/Products/ha/VG-HUB-RELAY/)以及[喷淋控制版本](https://vegetronix.com/Products/ha/VG-SPRINKLER-4L/)。这两种型号都受此集成支持。

Home Assistant 目前支持以下平台：

* Sensor：采集 VegeHub 传感器通道的数据。
* Switch：显示执行器状态，并允许您进行控制。

## 支持的设备

* [Sensor Based WiFi Controller](https://vegetronix.com/Products/ha/VG-HUB-RELAY/) - Firmware 4.0 or later - All variants
* [Sensor Based WiFi Data Logger](https://vegetronix.com/Products/ha/VG-HUB/) - Firmware 4.0 or later - All variants
* [Sensor Based WiFi Sprinkler Valve Controller](https://vegetronix.com/Products/ha/VG-SPRINKLER-4L/) - Firmware 4.0 or later - All variants

## 前提条件

VegeHub 可以直接连接到 Wi-Fi，*无需*额外应用或云账户。通电后，VegeHub 会创建一个名为 `Vege_XX_XX` 的 Wi-Fi 接入点，其中 `XX` 会因设备而异。请使用手机、平板或类似设备连接到此网络。连接该接入点的默认密码是 `vegetronix`。您可以（并且应该）在 Wi-Fi 设置中修改此密码。

连接到该网络后，设备通常会自动引导您进入网络登录页面。按照提示进入 VegeHub 的 Wi-Fi 设置页面，在那里您可以扫描可用网络、输入 Wi-Fi 凭据、更改设备名称，以及修改接入点密码。

:::important
务必修改默认接入点密码。否则，任何人都可以轻易访问您的 VegeHub，并可能危及您的 Wi-Fi 网络凭据。

:::
选择 **Apply** 后，VegeHub 会重置其网络连接，并尝试使用您输入的凭据进行连接。

### 连接到 Home Assistant

Home Assistant 会在您的网络中自动搜索 VegeHub 设备。只要 VegeHub 与 Home Assistant 连接到同一网络，它就应当会被自动发现。请前往 Home Assistant 中的 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，您应能在 **Discovered** 设备中看到 VegeHub。

:::important
VegeHub 设备依赖您的 Home Assistant 实例保持相同的 IP 地址。如果 Home Assistant 设备的 IP 地址发生变化，VegeHub 将无法继续发送更新，直到您在其配置中更新为新的 IP 地址。

为避免出现问题，建议在网络中为 Home Assistant 设备分配静态 IP 地址或 DHCP 预留地址。如果您之后更改了 Home Assistant 设备的 IP 地址，请记得同步更新 VegeHub 配置，以便它继续发送更新。

:::
我们建议通过 Home Assistant 的自动发现功能添加设备，但如果需要，您也可以手动添加。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 设备设置

要打开 VegeHub 设置页面，请前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 VegeHub 设备卡片，然后在 **Device info** 下选择 **Visit**。

## 电源管理

VegeHub 有两种供电模式：

* 电池模式（默认）：设备在 5 分钟无活动后进入休眠
* 电源适配器模式：设备始终保持活动

在电源适配器模式下，设备的耗电量会显著增加，因此如果使用电池供电，则不应使用此模式，否则电池会很快耗尽。

要更改供电模式，请访问[设备设置界面](#device-settings)，进入 **Settings** 页面，并将 **Power source** 更改为 **Power adapter**。

## 故障排除

### 设备无响应

如果设备无响应，请使用以下任一方法将其唤醒：

* 按下电路板上的按钮。
* 断开并重新接通电源。

### 设置失败

* 请确保 VegeHub 处于唤醒状态（请参阅设备唤醒部分）。

### [设备设置界面](#device-settings) 无法访问

* 请确保 VegeHub 处于唤醒状态（请参阅设备唤醒部分）。

### 执行器没有响应

* 请确保 VegeHub 处于唤醒状态（请参阅设备唤醒部分）。
* 若要获得更稳定的响应，请考虑切换到[电源适配器模式](#power-management)。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
