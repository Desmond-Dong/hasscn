# Devialet

**Devialet** 集成允许您从 Home Assistant 控制 [Devialet](https://www.devialet.com) 无线扬声器。

:::important

* 对于立体声设置，只需要配置其中一个扬声器。
* 确保您的 Devialet 固件版本为 2.16.1 或更高版本。否则，某些功能可能无法正常工作。
* 强烈建议为您的扬声器分配固定 IP 地址。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 已测试型号

已知支持的设备：

* Phantom I
* Phantom II

## 关闭设备

媒体播放器 `turn off` 按钮和 `media_player.turn_off` 动作将关闭指定系统的所有设备。退出关闭模式只能通过按下每个设备上的物理按钮来实现。
