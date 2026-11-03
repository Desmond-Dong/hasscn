# Radio Thermostat

**Radio Thermostat** 集成允许您控制来自 [Radio Thermostat](https://www.radiothermostat.com/) 或 [3M Filtrete](https://www.filtrete.com/) 的恒温器。您的恒温器必须已安装 Wi-Fi 模块并连接到网络。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 时间同步

如果设备当前不处于保持模式，集成在加载时会自动同步时间，因为同步时间会禁用保持模式。

## 保持模式

如果您希望 Home Assistant 中的温度设置覆盖恒温器本机上的日程安排，可以通过保持模式开关启用保持模式。

## 已知可用设备

* CT30 v1.75
* CT30 v1.92
* CT30 v1.94
* CT30 v1.99
* CT50 V1.09
* CT50 V1.88
* CT50 V1.92
* CT50 V1.94 (also known as Filtrete 3M50)
* CT80 Rev B1 V1.00
* CT80 Rev B2 V1.00
* CT80 Rev B2 V1.03
* CT80 Rev B2 V1.09

作为 CT30 或 CT80 衍生型号的新设备应可被自动检测，并且基本功能应能正常工作。
