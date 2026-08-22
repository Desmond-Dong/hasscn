# Victron BLE

**Victron BLE** 集成可将支持 BLE 协议的 [Victron Energy](https://www.victronenergy.com/) 设备接入 Home Assistant。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

启用并正常运行 [Bluetooth](/home-assistant/integrations/bluetooth.md) 集成后，Victron BLE 集成会自动发现设备。

## 添加设备

要配置已发现的设备，您需要提供该设备对应的加密密钥。更多信息请参阅这些[说明](https://github.com/keshavdv/victron-ble/tree/main#fetching-keys)。

要获取加密密钥，请使用 VictronConnect 应用（[Android](https://play.google.com/store/apps/details?id=com.victronenergy.victronconnect)、[iOS](https://apps.apple.com/app/id943840744)、[Linux](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app)、[macOS](https://apps.apple.com/app/id1084677271)、[Windows](https://www.victronenergy.com/support-and-downloads/software#victronconnect-app)）：

1. 安装 **VictronConnect** 应用，最好安装在您用于配置此集成的设备上，这样就可以直接复制并粘贴密钥。
2. 打开应用，并与设备完成配对。
3. 在列表中选择您想监控的设备。
4. 选择齿轮图标，打开该设备的 **Settings**。
5. 打开菜单并选择 **Product Info**。
6. 向下滚动到 **Instant Readout via Bluetooth**，并启用该功能（如果尚未启用）。
7. 在 **Instant Readout Details** 旁选择 **Show**，以显示加密密钥。

## 数据更新

此集成会订阅被动蓝牙更新，并在每次收到更新时同步更新传感器。

## 移除集成

此集成遵循标准的集成移除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
