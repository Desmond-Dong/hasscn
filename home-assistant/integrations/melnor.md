# Melnor Bluetooth

The **Melnor Bluetooth** integration allows you to control your Melnor Bluetooth watering valves.
The devices are set up through Bluetooth and don't need any additional bridge or gateway.

1-zone, 2-zone, and 4-zone valves are supported.

These devices have been sold under at least the following brands:

* [Melnor](https://melnor.com/)
* [Eden](https://edengarden.com/)

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

The Melnor Bluetooth integration will automatically discover devices once the [Bluetooth](/home-assistant/integrations/bluetooth/index.md) integration is enabled and functional.

## Troubleshooting

### No devices found on the network

Make sure nothing else is connected to the valve. The valve will not respond to Bluetooth discovery requests from Home Assistant if another device, such as your phone, is already connected.
