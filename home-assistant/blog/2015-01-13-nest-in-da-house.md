# Nest 来到家中！

在过去的大部分时间里，Home Assistant 主要专注于在场检测、灯光和开关。但现在不一样了，我们正在扩展支持设备。今天，我们很高兴发布由 [Stefano Fiorini](https://github.com/sfiorini) 贡献的 Nest Thermostat 集成！

<p class='img'>
  <img src='/home-assistant/images/screenshots/nest-thermostat-card.png' />
</p>

这个新集成由两部分组成：通用恒温器组件和 Nest 平台实现。首个版本提供了一个只读卡片以及用于控制的服务。后续计划是在恒温器卡片中加入温度和离家模式控制，并增加更多信息对话框。底层通信使用的是 [jkoelker 的 python-nest](https://github.com/jkoelker/python-nest) Python 包。

如果你有 Nest 恒温器，请在 `home-assistant.conf` 中添加以下内容：

```text
[thermostat]
platform=nest
username=YOUR_USERNAME
password=YOUR_PASSWORD
```
