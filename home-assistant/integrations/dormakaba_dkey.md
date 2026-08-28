# Dormakaba dKey

将通过蓝牙低功耗连接的 Dormakaba dKey 门锁集成到 Home Assistant 中。

该集成仅支持通过蓝牙直接连接门锁，不支持通过 Dormakaba dKey 网关连接。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

除了门锁实体外，每个添加的 dKey 门锁还会提供：

* 电池传感器
* 一个用于显示门是否打开的二进制传感器
* 一个用于显示门锁锁舌位置的二进制传感器

:::important
Dormakaba dKey 门锁目前无法通过 USB 蓝牙适配器或内置蓝牙无线电稳定工作，只有配置为允许主动连接的 [ESPHome 蓝牙代理](/home-assistant/integrations/bluetooth/index.md#remote-adapters-bluetooth-proxies) 能可靠运行。

:::
