---
title: Nuki 加入 Works with Home Assistant
description: '<img src=''/home-assistant/images/blog/2025-07-nuki/art.jpg'' style=''border: 0;box-shadow: none;'' alt="Nuki 与 Home Assistant 合作"。'
  Home Assistant 的最佳体验
---
# Nuki 加入 Works with Home Assistant

<img src='/home-assistant/images/blog/2025-07-nuki/art.jpg' style='border: 0;box-shadow: none;' alt="Nuki 与 Home Assistant 合作">

我们很高兴欢迎 [Nuki](https://nuki.io/) 加入 [与家庭助理一起工作](https://works-with.home-assistant.io/) 计划！ Nuki 创造了一些外观光滑的智能门锁，您可以将其安装在大多数门上（甚至可以安装在现有门锁的顶部）。他们不断开拓新的、令人兴奋的功能，同时也使用我们支持的开放标准。 Nuki 今天为该计划带来了三种不同的门锁类型，所有门锁类型均经过我们团队的认证，以提供 Home Assistant 的最佳体验。<!--more-->

## 解开它们的起源
Nuki 于 10 多年前开始推出第一款被称为“神奇黑匣子”的智能门锁。正是这种屡获殊荣的设计演变成如今时尚的 Nuki 智能门锁。  该品牌由 Martin 和 Jürgen 兄弟创立，保留了家族的一切。由于对在运动套件中携带门钥匙的麻烦感到沮丧，兄弟俩在 Kickstarter 上发起了成功的众筹活动，并从那时起就一直在创新。他们在奥地利设计智能门锁并在欧洲制造。他们的门锁在整个欧洲都有销售，7 月初，他们在美国推出了 Nuki Smart 门锁。
Nuki 设备经认证可与 [Home Assistant Matter 集成](/home-assistant/integrations/Matter/) 一起使用，现已获得[官方认证](/home-assistant/blog/2025/03/10/Matter-certification/)。与所有“兼容”认证的设备一样，Nuki 门锁优先考虑本地控制，因此您可以在不依赖云连接的情况下管理日常家庭安全。
<div class="alert">
    <p>“加入‘Works with Home Assistant’计划对我们来说是一个合乎逻辑的步骤。我们坚信开放生态系统的力量以及将控制权交给我们的客户。Home Assistant代表了一个致力于创新和定制的充满活力的社区，我们很高兴我们的产品能够与这一愿景保持一致。这种集成确保我们的客户可以使用他们信任的产品构建他们想要的智能家居。‘Works with Home Assistant’认证让客户确信Nuki的产品已经过兼容性测试并提供流畅的集成体验。”</p>
<em style="text-align: right; display: block;">- Matthias Kerstner，Nuki 产品主管。</em>
</div>

## 设备

<p class='img'><img src='/home-assistant/images/blog/2025-07-nuki/lock.jpg' style='border: 0;box-shadow: none;' alt="智能门锁专业版">这把门锁转动的速度比转动螺栓的速度还要快</p>

如果您不知道，Works with Home Assistant 与其他认证计划不同，因为产品经过严格的内部测试，以确保它们开箱即用。任何加入的公司还承诺提供长期支持和固件更新，同时成为家庭助理社区的积极力量。 Works with Home Assistant 由[开放家庭基金会](https://www.openhomefoundation.org/) 运营，[Home Assistant Cloud](/home-assistant/cloud/) 订阅者的支持为这项工作提供资金。
我们的团队一段时间以来一直忙于测试 Nuki 门锁，并已认证以下启用 Matter-over-Thread 的设备。需要注意的是，要设置门锁、校准它并激活 Matter，您将需要使用 Nuki 应用程序。但是，使用这些门锁并没有硬性要求必须有云帐户或帐户注册。一旦设备处于活动状态并通过 Matter 连接，您就可以纯粹通过 Home Assistant 对其进行管理，甚至可以删除该应用程序。
- [Nuki Smart门锁Go](https://nuki.io/en-uk/products/smart-门锁-go)
- [Nuki 智能门锁 Pro](https://nuki.io/en-uk/products/smart-门锁-pro-5th-gen)
- [Nuki 智能门锁 Ultra](https://nuki.io/en-uk/products/smart-门锁-ultra)
## 疯狂的速度，字面意义上的
获得认证的设备包括两种圆柱形型号：Nuki Smart 门锁 Pro 和 Nuki Smart 门锁 Ultra，两者均配备无刷电机和三速设置。其中速度最快的称为“疯狂”设置。这种超快的设置非常适合那些匆忙的人，但您也可以选择“标准”或“温和”，以更悠闲的速度移动。温和的设置也非常适合安静地解锁，因此，如果您在夜班或清晨慢跑后回家，就不会打扰其他人。
我们喜欢圆柱形设备配有可充电电池，以减少电子垃圾。每个圆柱形门锁都有白色和黑色带可供选择，因此您可以匹配您现有的硬件或您的家居风格。 Nuki Smart 门锁 Pro 可以对现有门锁进行改造，而 Nuki Smart 门锁 Ultra 则配有自己的锁芯。
如果您正在寻找可靠的入门级选择，Nuki Smart 门锁 Go 是一个不错的选择，它使用四节 AA 电池。 Smart门锁Go和Smart门锁Pro都可以在五分钟内完成安装，无需钻孔或特殊工具，这可能意味着即使您租用也可以安装智能门锁。与 Home Assistant 合作旨在为社区提供更多选择，Nuki 正在扩展智能门锁产品。
## 无钥匙的未来
列出的所有型号均可在本地运行，因为这是“兼容”计划的要求，这样您就可以确保您在智能家居中感到安全可靠。然而，一些用户可能也希望远程访问这些设备，以便您为客人、承包商、家人或朋友解锁门。如果您正在寻找远程访问，这可以由 Nuki 应用程序提供，也可以通过您的 Home Assistant 系统使用 [Home Assistant Cloud](/home-assistant/cloud/) 之类的东西提供（它支持 Home Assistant 的开发，但也有助于为该计划带来更多“合作”合作伙伴🤝）。
我们非常高兴 Nuki 加入我们的认证设备，并看到社区将提出的用例，将他们的智能门锁集成到智能家居的其他部分。
### 与 Home Assistant 配合使用的常见问题
***问：如果我的设备未在“与 Home Assistant 配合使用”下列出，这是否意味着它不受支持？***
答：大多数 Nuki 门锁都可以通过 Matter 与 Home Assistant 配合使用，我们甚至尝试了一些较旧的门锁，并取得了良好的效果。但是，我们仅对上面列出的设备进行了正式测试和认证。如果此列表中缺少任何其他设备，则仅意味着它尚未经过我们团队的测试或不符合计划的要求。它可能运行良好，并且可能会在以后添加到测试计划中，或者它可能在我们当前未在该计划下测试的不同连接类型下工作。
***问：好的，那么 Works with 计划的意义何在？***
答：它强调了我们所知道的与家庭助理配合良好的设备以及长期承诺为这些设备提供支持的品牌。我们寻找能够将其关键功能引入家庭助理、无需云登录即可在本地操作并继续长期这样做的品牌。
***问：这些设备是如何测试的？***
答：此列表中的所有设备均使用带有内置 Thread 边界路由器和我们的 [认证物质集成](/home-assistant/integrations/Matter/) 的标准 Home Assistant Yellow 进行测试。  如果您有另一个集线器、边界路由器设置或集成，那不是问题。我们对这些进行测试，因为它们是我们团队在我们的生态系统中进行认证的最有效方式。
***问：您会在该计划中添加更多 Nuki 设备吗？***
答：Nuki 目前销售的所有门锁现在都出现在“Works with”计划中。我们很高兴与 Nuki 团队建立密切的关系，共同开发任何即将发布的版本或添加此处尚未列出的更多产品。