---
title: 如何在欧洲用智能家居技术短期节省能源与开支的解决方案
description: 概述欧洲人今天就可以开始节省能源和开支的方法，即使你是租房也一样。
---

欧洲已经进入能源危机，电价和天然气价格飞涨。每千瓦时 1 欧元的电价，以及每立方米 3.40 欧元的燃气价格，并不少见。人们纷纷向 Home Assistant 社区里的朋友求助，想知道该如何节省能源。随着冬天临近，大家都希望能在真正变冷之前，找到一些可以立刻实施的方案。

这篇文章的目标，是概述欧洲人今天就可以开始节省能源和开支的方法，即使你是租房也一样。重点面向使用暖气片，以及连接恒温器锅炉的家庭。

供暖是一个复杂的话题，读完这篇文章之后，你可能仍然会有一些问题。欢迎加入 Home Assistant 社区，一起讨论如何节省能源（提问前请先搜索一下）。你可以到我们的[论坛][forums]能源分类参与讨论，或者来 [Discord 聊天服务器][discord] 的 `#energy` 频道交流。

## 掌控你的供暖系统

冬天里，你的大部分能源消耗都花在给房子供暖上。

除非你有热泵，否则用天然气给房屋供暖通常比用电更高效。因此，不要关闭燃气供暖，改用电暖器，因为那样通常会花更多钱。

在供暖方面节能，大致有两种方式。第一种是投资更高效的制热技术，并改善房屋保温能力，让室内更容易保持温暖，比如安装热泵、加强保温、换更好的窗户。但这些事情通常无法在冬天到来前立刻完成，所以不在本文讨论范围内。

第二种节能方式，就是减少使用量。政府一直建议大家降低家中的整体温度，但温度降得太低，住起来可能会过于寒冷。相反，你可以通过安装智能恒温器、温度传感器，以及暖气片恒温阀（TRV），更聪明地为家里供暖。

<p class='img'>
<img src='/home-assistant/images/blog/2022-10-03-short-term-solutions-save-energy-and-money-europe/shelly-trv.png'>
Shelly TRV 照片
</p>

## 智能恒温器

恒温器的工作方式是测量温度。如果当前温度低于你设定的目标温度，它就会开启供暖，直到室内达到合适温度。

如果你是租房，这一节可以跳过，因为升级恒温器通常并不可行。

恒温器最能帮你节能的方式，是控制锅炉，最好还能控制锅炉温度。加热水才是能源消耗的主要来源，所以你并不希望锅炉把水加热到高于达到目标室温所需的温度。

恒温器会通过自身设备测量温度。如果它安装在家里最后才变暖的位置，就可能让系统供暖过度。智能恒温器可以通过配对额外的温度传感器，获取家中不同房间的温度数据，从而让恒温器更早关闭供暖。

带远程控制功能的智能恒温器还有一个额外好处：如果你发现自己不会按计划时间回家，就可以随时调整温度。

如果你打算长期使用，并希望选择最省事的方案，那么你应该投资一个属于完整冷暖生态系统、并且带有 API 的智能恒温器。优化供暖能耗是一件复杂的事，而 Home Assistant 默认并不擅长直接处理这类优化。更好的做法是把这部分交给对应生态系统来管理，而 API 则能让你继续在 Home Assistant 中观察和影响它，把在家状态等生态系统本身不了解的数据也整合进来。

如果你想完全掌控家中供暖系统的每一个部分，那你不一定要走生态系统路线，而是可以投资支持本地控制的恒温器、温度传感器和 TRV，并通过 Home Assistant 把它们串联起来。[这里有一个入门示例。](https://community.home-assistant.io/t/smart-heating-scheduler-for-home-assistant-extra-multi-zones-edition/237966)

### 推荐的恒温器

这里很难给出唯一的产品推荐，因为供暖系统的配置差异非常大，而我们也不知道是否存在一个在所有场景下都最优的统一方案。请务必确认恒温器是否兼容你的锅炉或其他供暖系统。

Home Assistant 核心开发者 Frenck 几个月前曾为自己家研究过这个问题，最后选择了 [Plugwise](https://www.plugwise.com/)。它可以控制他的锅炉和暖气片，并且提供本地 API，可与 Home Assistant 集成。

另一个受欢迎的方案是 [Homematic IP](https://homematic-ip.com)。它同样提供本地 API，可与 Home Assistant 集成。

在 Home Assistant，我们更偏好能本地运行的设备。任何把你的数据存储在云端的设备，最终都需要想办法收回托管这些数据的成本。这也意味着，一旦公司倒闭，这些设备往往就无法继续使用。不过，我们也理解你现在最优先考虑的是节省能源。如果上面的方案并不适合你的家，你也可以考虑 [Netatmo](https://www.netatmo.com) 或 [Tado](https://www.tado.com)。

我们不推荐 Google Nest，因为它的生态功能还不够完整，不支持 TRV。

## 暖气片恒温阀（TRV）

TRV 会把你暖气片上原有的旋钮替换成智能版本。即使你是租房，这也同样适用：搬走时再把旧旋钮换回去即可。安装通常只需要 5 分钟。

TRV 的工作原理有点像家里的恒温器，不过它控制的是单个暖气片：你设定想达到的温度，它就会通过开启或关闭暖气片来实现该温度。

有了 TRV，你就可以根据作息时间或使用计划，单独调节各个房间的温度，比如只在早晨和睡前加热浴室。

TRV 应该用于决定某个房间是否参与供暖。由于锅炉加热水仍然是你家中最大的能耗来源，因此你不应该使用 TRV 来关闭家里所有暖气片，或统一降低全屋温度。这应该在锅炉层面完成，通常是通过恒温器来控制。让锅炉保持在刚好能把家里加热到目标温度、且不过高的温度，是你能做出的最大节能举措之一。

### 推荐的 TRV

我们推荐的三款智能恒温器，都属于包含 TRV 的产品系列。如果你已经选择了其中一种，我们建议你继续留在对应生态系统中。

我们还推荐两款设备。它们都可以独立工作，同时也提供本地 API，可接入 Home Assistant。

#### Shelly TRV

这款设备可以独立工作，不需要网关。官方宣称电池寿命可达 2 年。它提供本地 API，并且能与 Home Assistant 完美集成。

[购买 Shelly TRV](https://shop.shelly.cloud/shelly-trv-WiFi-smart-home-automation)

<lite-youtube videoid="9M1EVjEaHfI" videotitle="Home Assistant Shelly TRV 集成"></lite-youtube>

#### Aqara Smart Radiator Thermostat E1

这是刚刚发布的新产品。这款 TRV 可以通过 Zigbee 直接由 Home Assistant 控制，也可以通过 Aqara 网关来控制。该网关可以通过 [HomeKit Controller 集成](/home-assistant/integrations/homekit_controller/) 以本地方式接入 Home Assistant。

注意：厂商表示这款设备未来将支持 Matter。但从他们的文档中还无法确定，这款设备是会直接通过 Thread 使用 Matter，还是需要通过他们的网关来以 Matter 方式暴露设备。我们更倾向于后者，因为他们的 HomeKit 方案也是这么做的。

[购买 Aqara Smart Radiator Thermostat E1](https://www.aqara.com/eu/product/radiator-thermostat-e1)

<lite-youtube videoid="ibFYGcAzyDM" videotitle="Simple Smart Home Heating In Minutes!"></lite-youtube>

## 可以节省能源的自动化

当你已经能够控制恒温器和 TRV 之后，就可以通过供暖自动化开始节省能源。下面有 5 个实用的自动化思路，可以帮助你做到这一点。

<lite-youtube videoid="W9BdVneXTO8" videotitle="用 Home Assistant 节省能源和开支！5 个技巧！"></lite-youtube>

## 总结

遗憾的是，并不存在一个适用于所有人、所有地方的节能万能方案。希望上面的概述和建议，能帮助你顺利度过这个冬天。

如果还有一些地方不够清楚，欢迎到我们的论坛能源分类发帖交流，或者来 Discord 聊天服务器的 `#energy` 频道参与讨论。

[forums]: https://community.home-assistant.io/c/energy/57
[discord]: /join-chat/
