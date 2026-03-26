---
title: "国际化"
---

Home Assistant 国际化项目包括准备 平台 和 前端 进行本地化，以及本地化字符串的实际翻译。

某些组件和 平台 将具有需要专门针对该 平台 进行本地化的字符串。这些字符串在 Core 中进行管理[家庭助理](https://github.com/home-assistant/core)存储库。 Home Assistant 后端 将根据运行实例中加载的组件向客户端提供字符串。

还有仅存在于 前端 上的可本地化字符串。这些字符串在[家庭助理 前端](https://github.com/home-assistant/frontend)存储库。这些字符串与 前端 一起存储，并且不依赖于 后端 配置。

|类型|地点|
| ----------------- | -------- |
|实体 状态|Core|
|配置流s|Core|
|选项流s|Core|
|设备自动化|Core|
|UI 中的文本|前端|

我们的字符串是由社区使用在线翻译工具翻译的[洛卡利斯](https://lokalise.co/).
