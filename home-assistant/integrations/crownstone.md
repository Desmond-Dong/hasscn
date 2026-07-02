# Crownstone

**Crownstone** 集成允许您通过云端或使用 [Crownstone USB](#crownstone-usb) 加密狗来控制您的 Crownstone。

Crownstone 集成支持以下 Crownstone 设备：

* Crownstone 插头（可直接插入现有电源插座）
* Crownstone 内置式（可安装在电源插座、灯具或开关后面）

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Options

To define options for Crownstone, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of Crownstone are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Use a Crownstone USB dongle to enable local data transmission:
  description: "启用此选项将启动一个流程，允许您配置 Crownstone USB 加密狗。禁用此选项将删除当前配置。"
Crownstone Sphere where the USB is located:
  description: "当配置了 Crownstone USB 加密狗且有多个 Crownstone Sphere 可用时，此选项可用。您可以选择 USB 加密狗当前所在的 Sphere。"
```

## Crownstone

Crownstone 具有调光功能，但调光默认是禁用的。要为 Crownstone 启用调光：

1. 进入您的 Crownstone 应用
2. 点击您想启用调光功能的 Crownstone
3. 点击 **Abilities**
4. 将 **Dimming** 切换为开

当您通过 Crownstone 应用更改功能后，更改将自动在 Home Assistant 中更新。请注意，当调光更改时，Home Assistant 将重新加载条目。

启用调光需自行承担风险。建议仅在灯上使用调光。

## Crownstone USB

Crownstone 集成的默认连接方式是云端轮询。但是，也有 [Crownstone USB](https://shop.crownstone.rocks/products/crownstone-usb-dongle) 可用。此加密狗不使用云端来切换和调光 Crownstone，而是直接连接到 Crownstone mesh 来切换 Crownstone，这意味着延迟非常低。

此外，Crownstone USB 加密狗允许独立切换 Crownstone。使用云端时，必须有智能手机在 Sphere 中才能切换 Crownstone。
