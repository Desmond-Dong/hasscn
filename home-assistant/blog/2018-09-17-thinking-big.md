# 放眼未来

今天是 Home Assistant 的 5 周年。我想借这篇文章，不仅回顾过去 5 年，也谈谈我们接下来要走向哪里、希望 Home Assistant 成为什么样的平台。

Home Assistant 不是出于某种意识形态而诞生的。我最初只是买了些智能灯，想写脚本控制它们。后来我把这些脚本开源，项目就这样发展起来了。随着 Home Assistant 成长，周围的世界变了，我自己也变了。

Home Assistant 诞生后，市面上出现了大量 IoT 产品。遗憾的是，主流趋势是把所有数据上传到云端，再从云端管理你的家。我逐渐意识到，大公司并没有动力去做真正重视隐私和本地控制的产品，因为我们的数据对他们太有价值了。

我不喜欢这个趋势。我不愿看到越来越多的数据被少数巨头囤积，集中在少数系统里，再被用来影响我们在网络世界中的处境。这是我们的生活、我们的数据，控制权应当属于我们，而不是某个为“互动率”优化的算法。

因此我想为 Home Assistant 提出一个目标。这个目标将塑造平台未来几年的发展方向。

<!--more-->

## The goal

我们的目标是打造一个以人为中心的家庭自动化平台：开源，并把隐私与本地控制放在优先位置。

* **隐私。** 你的所有数据都存储在本地。
* **本地控制。** 所有逻辑都在本地运行，云只在必要时调用。
* **开源。** 平台对用户和企业都免费开放。越多人选择注重隐私的平台而不是纯云方案，对我们来说就是胜利。
* **互操作性。** 平台提供易于共享数据的 API。我们希望你的数据可以被你想用的任何应用访问。

## 为实现目标我们将构建什么

有很多！以下是我最期待的一些方向：

* **远程连接实例。** 你在外也能控制 Home Assistant。我们会使用端到端加密，确保云端无法读取你的数据。该功能由 Home Assistant Cloud 提供，你只要登录即可使用。这会是云服务下一个重点功能。
* **归因能力。** 我们最近加入了用户和上下文。下一步会在日志中清晰显示“哪个用户触发了哪项变更”。
* **权限体系。** 基于同一套用户与上下文机制，我们也能把实体访问限制到具体用户。
* **更好的设备管理。** 我们最近已在 Home Assistant 中加入设备概念。用户将可以把设备放入区域、查看某设备包含哪些实体，并确保实体状态保持最新。
* **可达性。** 我们希望 Hass.io 能运行在尽可能多的设备上，让任何人都能轻松开启私有化智能家居。
* **集成 Mozilla 的 [Web Things API]。** 让平台更容易与其他家庭自动化平台互通。新引入的设备管理也与 Web Things 数据模型高度契合。
* **云透明度。** 我们希望清晰展示哪些数据被共享到了 Amazon Alexa 和 Google Home 云端。
* **更好的 Z-Wave。** 当前集成还有改进空间。Z-Wave 所有方已经宣布公开 SDK，我们会探索将其集成进 Home Assistant。

## 实现目标还需要什么

Home Assistant 的规模已经超出“靠业余时间维持”的阶段。我们希望继续保持友好的社区氛围、高质量代码、平滑升级、及时更新文档和可靠的平台安全。

在 Ubiquiti，我们找到了目标一致的合作伙伴。他们在 4 月聘用我全职投入 Home Assistant，已经带来了明显进展，包括上面提到的一些增强。但只有一名全职成员仍然不够。

因此我创立了新公司来筹集资金，帮助 Home Assistant 实现目标：[Nabu Casa, Inc][nabu-home]。公司将以每月 5 美元订阅费运营 Home Assistant Cloud。收入将用于扩展云功能、支持 Home Assistant 网站与社区基础设施，并支付全职员工持续贡献项目。

<div style='max-width: 250px; margin: 0 auto'><img src='/home-assistant/images/blog/2018-09-thinking-big/logo-text.svg' style='border: 0; box-shadow: none' alt='Logo of Nabu Casa, Inc'>
</div>

Nabu Casa, Inc. 只接受订阅用户的资金支持。这样才能保证我们始终为真正出资的用户负责，做对用户最有利的事。我们不会向投资人融资。大资本通常更在意继续赚钱，而不是人本身与隐私。我们必须保持控制权，才能确保目标不偏移。

如果你在过去 9 个月一直是 Home Assistant Cloud 用户，感谢你参与公开测试。所有公开测试成员会自动进入免费试用，可继续使用 Home Assistant Cloud 至 10 月 17 日，且无需对 Home Assistant 做任何改动。若试用结束前未填写支付信息，你将失去 Home Assistant Cloud 访问权限。

更多信息：

* [Nabu Casa, Inc homepage][nabu-home]
* [Manage your Home Assistant Cloud account][nabu-account]

## 常见问题

### Do I have to pay to use Home Assistant and Hass.io?

不需要。Home Assistant 是开源并可免费安装，这一点不会改变。只有云服务是付费订阅。

### Will Home Assistant and Hass.io remain 开源?

会。Nabu Casa 只负责 Home Assistant Cloud，并会投入资源帮助 Home Assistant 实现目标并承担基础设施成本。

### Why not take donations?

仅依赖捐赠，无法为员工做可持续预算，也会让他们及家人面临月底拿不到薪水的风险。

### Is Home Assistant Cloud 开源?

Home Assistant Cloud 的大部分代码是开源的。Alexa 技能源码在[这里](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/alexa/smart_home.py)（手动配置说明见[这里](https://github.com/mike-grant/haaska/)）；Google Assistant 源码在[这里](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/integrations/google_assistant/smart_home.py)（手动配置说明见[这里](/home-assistant/integrations/google_assistant/index.md)）。我们的账户页面和中继服务目前不开源。

### Will you offer a lifetime plan for a one time fee?

不会。云服务的一次性终身计划本质上是庞氏结构，意味着新订阅者在为老订阅者的长期成本买单。

### I think the price is too high for what I get

未来会持续增加新功能，价格不变。我们计划发布的下一个功能是对实例的加密远程访问。

订阅费用不仅覆盖 Home Assistant Cloud 的运行成本，收入还将用于支持 Home Assistant 与社区论坛的基础设施。

[nabu-home]: https://www.nabucasa.com

[nabu-account]: https://account.nabucasa.com

[Web Things API]: https://iot.mozilla.org/wot/
