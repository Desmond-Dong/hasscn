---
title: '2022.5.3：Ukraine Alarm 集成，空袭或炮击警报即时提醒'
description: '2022 年 2 月，俄罗斯入侵乌克兰(https://en.wikipedia.org/wiki/2022RussianinvasionofUkraine)。此后两国一直处于战争状态。乌克兰平民随时可能遭遇交火，或成为俄军蓄意攻击目标。乌克兰推出了 Ukraine。'
---
# 2022.5.3：Ukraine Alarm 集成，空袭或炮击警报即时提醒

2022 年 2 月，[俄罗斯入侵乌克兰](https://en.wikipedia.org/wiki/2022_Russian_invasion_of_Ukraine)。此后两国一直处于战争状态。乌克兰平民随时可能遭遇交火，或成为俄军蓄意攻击目标。乌克兰推出了 [Ukraine 报警](https://www.ukrainealarm.com/) 服务，用于在附近出现战事时向民众发出通知。

今天我们发布了 Home Assistant 的一个特别版本，让全新的 Ukraine 报警 集成面向所有人开放。该集成由 [Paul Annekov](https://github.com/PaulAnnekov) 贡献。此集成会跟踪用户所在区域的警报，并以安全二元传感器的形式呈现。你可以在自动化中使用这些传感器，在危险来临时提醒家中成员。

使用这个 My 按钮将 Ukraine 报警添加到你的 Home Assistant：

Бережіть себе,<br>
Paulus

_(英文截图位于乌克兰语截图下方)_

<img src="/home-assistant/images/blog/2022-05-ukraine-alarm/integration_uk.png" class='no-shadow' alt="乌克兰语截图：Home Assistant 中 Ukraine 报警集成提供的安全传感器。">

<!--more-->

<img src="/home-assistant/images/blog/2022-05-ukraine-alarm/automation_uk.png" class='no-shadow' alt="乌克兰语截图：基于安全传感器可实现的自动化示例。">

<img src="/home-assistant/images/blog/2022-05-ukraine-alarm/integration.png" class='no-shadow' alt="截图：Home Assistant 中 Ukraine 报警集成提供的安全传感器。">

<img src="/home-assistant/images/blog/2022-05-ukraine-alarm/automation.png" class='no-shadow' alt="截图：基于安全传感器可实现的自动化示例。">
