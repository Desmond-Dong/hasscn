# WiZ

**WiZ** 集成可让您控制 WiZ 灯具和智能插座。
这些设备通过 Wi-Fi 网络进行设置，不需要额外的桥接器或网关。

这些设备至少曾以以下品牌销售：

* [4Lite](https://4liteuk.com/)
* AEG
* [Altair](https://altairlighting.com/default.dmx)
* [Ansell](https://ansell-lighting.com/)
* [Atom Lighting](https://atomlighting.com.au/)
* [ATX LED](https://atxledinc.com/)
* [Brilliant](https://www.brilliantlightsource.com/)
* [Designers Fountain](https://designersfountain.com/)
* [Evoluziona](https://tecnolite.mx/)
* [Fischer & Honsel](https://fischer-honsel.com/)
* [Gauss](https://gauss.ru/smartlight/products/)
* iDual
* [KSR](https://www.ksrlighting.com/)
* [Laurie Lumiere](https://www.laurielumiere.com/)
* [Lednify](https://lednify.com/)
* [Leyton](https://www.leyton-lighting.co.uk/)
* [Liteline](https://www.liteline.com/page/oncloud)
* [Lutec](https://www.lutec.com/segments/connected)
* [Philips Smart LED lights with WiZ Connected](https://www.usa.lighting.philips.com/consumer/smart-wifi-led)
* [Spex](https://spexlighting.com/pages/smart-lights)
* [SLV](https://www.slv.com/)
* [Trenz](https://trenzlighting.com/pages/smart-lights)
* [Trio](https://wiz.trio-lighting.com/)
* [Wofi](https://wofi-wiz.com/)

此集成还可以报告已与设备关联的占用传感器状态。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 将 WiZ 设备连接到您的网络

要将 WiZ 设备连接到 Wi-Fi 网络，请按照 [WiZ app](https://www.wizconnected.com/en-us/explore-wiz/app)（支持 iOS 和 Android）中的说明进行操作。
如果您有更多问题，请参阅 [WiZ Support Page](https://www.wizconnected.com/en-us/support/faq)。

### 启用本地连接

此集成需要与 WiZ 设备进行本地通信。您可以在 WiZ app 中启用或禁用 **Allow local communication** 设置。
该设置默认应为启用状态。

启用步骤：

1. 在手机上打开 WiZ app。
2. 选择左上角的设置菜单。
3. 向下滚动到安全设置。
4. 启用 **Allow local communication** 开关。

### 占用传感器

只有在检测到一次移动事件后，占用传感器才会被添加。如果占用时它们会打开至少一个设备，并且在无人时会关闭至少一个设备，Home Assistant 就能检测到这些传感器。未与设备关联的传感器无法被检测到。

当设备与占用传感器关联时，默认情况下，在手动控制后该传感器会被禁用 30 分钟。

与上一次被手动控制的占用传感器相关联的设备，在启动时会显示为 unknown。等到下次由该传感器控制灯光时，状态才会变为已知。

### 功率监控传感器

具有以下硬件模块的设备可使用功率监控传感器：

* ESP25\_SOCKET\_01
* ESP20\_SHDW\_31R
* ESP20\_SHRGB\_31R
* ESP20\_SHTW\_31R

### 效果速度

效果速度可以通过 `number` 实体进行控制。只有在已设置可调节速度的效果时，该实体才会出现。
