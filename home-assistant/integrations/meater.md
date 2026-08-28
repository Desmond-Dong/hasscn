# Meater

The **Meater** integration allows for communicating with the [Meater Temperature Probe](https://meater.com/) from Apption Labs.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

Once configuration is complete, probes will be added as soon as they're seen by Home Assistant. They will be marked unavailable when the probes are disconnected from Meater Cloud.

Currently, both the internal and external temperature of each probe will be displayed.

## Troubleshooting

Devices will only be returned from the Meater Cloud API after the following criteria are met. There may be a delay between the Meater Cloud seeing your device and it being returned by the API.

* Device must be seen by the Meater Cloud. Ensure you've completed a cook while connected to Meater Cloud.
* The Meater app or Block must have an active Bluetooth connection with the device.
* The Meater app or Block must have an active Meater Cloud connection.
