---
title: 现已支持 Verisure 设备和新款 TP-Link 路由器
description: 新增对 Verisure 开关、传感器、湿度计以及新款
  TP-Link routers
---

这是一个小型的错误修复发布，用于解决上个版本以来出现的一些问题。请尽快在 Home Assistant 目录中运行 `git pull` 完成升级。

本次发布在测试覆盖率上也达成了一个重要里程碑：我们已经突破 80%！需要说明的是，这个覆盖率主要来自核心和自动化组件，和 IoT 设备通信的平台暂未计入。

我们不想只发布错误修复，所以这次也加入了几个新内容：

- 支持 ArcherC9 等新款 TP-Link 路由器，由 [@chrisvis](https://github.com/chrisvis) 贡献。
- 改进了 MQTT 主题订阅支持，由 [@qrtn](https://github.com/qrtn) 贡献。

__Verisure Support__
<img src='/home-assistant/images/supported_brands/verisure.png' style='border:none; box-shadow: none; float: right;' height='50' /> Home Assistant 现可集成你的 [Verisure](https://www.verisure.com/) 报警系统、湿度计、传感器和温度计，由 [@persandstrom](https://github.com/persandstrom) 贡献。

```yaml
# Example configuration.yaml entry
verisure:
  username: user@example.com
  password: password
  alarm: 1
  hygrometers: 0
  smartplugs: 1
  thermometers: 0
```
