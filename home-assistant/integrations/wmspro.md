# WMS WebControl pro

**WMS WebControl pro** 集成可让您将 WAREMA 设备集成到 Home Assistant 中。

此集成使用本地 API，该 API 从固件容器版本 11H 开始可用。

有关支持信息，请参阅对应设备章节：[buttons](#buttons)、[covers](#covers)、[lights](#lights)、[scenes](#scenes) 和 [switches](#switches)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

WMS WebControl pro 也*可能*通过 DHCP 在您的本地网络中被自动发现。

## Buttons

* 所有支持识别动作的设备（例如让遮阳篷晃动一下或让灯闪烁）
  都可以被触发执行该动作。

## Covers

* *Patio awnings* 和 *roller shutters/blinds* 支持打开、关闭、设置到指定位置以及停止。
* 此集成和底层库*可能*已经支持其他单电机遮阳篷或遮挡设备类型。

## Lights

* 调光器（支持亮度控制）和开关已获得完整支持。

## Scenes

* 场景可以激活，但不能修改或监控。
* 场景通过每个房间的虚拟设备访问。

## Switches

* 负载开关（例如连接的加热器）可进行开关控制。
