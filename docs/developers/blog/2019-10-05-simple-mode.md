---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: Home Assistant 1.0 中的 Simple Mode
---

import DiscussionBox from '../static/js/discourse_discussion.jsx'

:::info
本博文引用了 simple 和 advanced mode。后来已重命名为 standard mode 和 advanced mode。
:::

Home Assistant UI 有两种不同的模式。一种是 simple mode，另一种是 advanced mode。Simple mode 最近已在 [Home Assistant 0.96](https://www.home-assistant.io/blog/2019/07/17/release-96/#advanced-mode) 中引入。在本文中，我想概述我对 Home Assistant 1.0 中 simple mode 的愿景。

**在 simple mode 中，我们专注于核心 Home Assistant 体验。我们正在努力回答这个问题：我们希望任何人都能做什么。我们能否使其足够直观，让人们（无论老少）都能安装 Home Assistant 并使用它。**

## 核心概念

Simple mode 是非高级用户的简化界面。这是默认 UI。Simple mode 提供 Home Assistant 的直观子集：易于理解且易于使用。

在 simple mode 中，我们将按照用户对房屋的理解来组织配置：

- Inputs：devices 和 persons
- Outputs：scenes、scripts、automations

<center>
![Configuration concepts. Inputs are users, integrations, zones, persons, devices. Outputs are scenes, scripts and automations.](/img/en/blog/2019-10-simple-mode/config-concepts.png)
</center>

<!-- https://docs.google.com/drawings/d/1021ATCQ_Q3eBQQ1Ei5Bq7rSBfn6YtLh9113HimpsYWs/edit?usp=sharing -->

还有其他 inputs，但它们用于支持 devices 和 persons：

- Integrations 允许你与设备交互
- Users 允许 persons 登录并访问 Home Assistant
- Areas 允许将 devices 分组
- Zones 在地图上标记位置，以跟踪携带 GPS 发射设备的人员

作为 simple mode 中的用户，你将不会被暴露于 events、entity IDs、YAML 或 services。

<!--truncate-->

## 集成要求

Integrations 需要能够为 simple mode 中的用户提供 inputs。这意味着在 integration 被纳入 simple mode 之前，必须满足一些要求。

- Integration 的所有 entities 都需要有唯一的 ID
- Integration 的所有 entities 都需要提供 device info

Integrations 应通过 discovery 或 account linking 进行设置。在极少数情况下，我们可以允许通过 IP 地址配置 integration。

## 扩展发现

在 onboarding 期间以及用户访问 integrations 页面时，我们将触发 extended discovery。默认情况下，Home Assistant 使用 SSDP 和 zeroconf discovery 协议扫描网络。在 extended discovery 中，我们将为流行的 integrations（如 Plex 或 Unifi）运行自定义 discovery 协议。

## 无 YAML

Simple mode 将完全通过 UI 控制。不应暴露需要用户打开文本编辑器的功能。例如，需要用户在 configuration.yaml 中添加 client_id/secret 的 config flow 不应属于 simple mode。

## 无 add-ons 的 Hass.io

在 simple mode 中，Hass.io 将是用户管理硬件设置和更新的地方。

Simple mode 的初始版本不会显示安装 Hass.io add-ons 的功能。这是为了控制 Home Assistant 1.0 的范围。未来我们将重新审视这一点，并决定哪些 add-ons 适合我们的 simple mode。

## 场景

用户将使用 scenes 而不是 services，从 scripts 和 automations 控制设备。通过 scenes，你可以对设备的当前 state 进行快照，并在将来某个时刻恢复。易于解释，也易于使用。我们管理 scenes 的 UI 将围绕 devices 和 areas 构建。

## 自动化与脚本

Automations 和 scripts 将使用当前编辑器，但 triggers、conditions 和 actions 的类型将限制为与我们 inputs 匹配的那些。

- Trigger 类型将限制为 time、sun、zone 和 device triggers。
- Condition 类型将限制为 time、zone、sun 和 device conditions。
- Action 类型将限制为 activate scene 和 device actions。

## 我是 power user，为什么要在乎？

通过集中精力在 simple mode 上，我们正在使 Home Assistant 对所有用户（无论是初学者还是 power users）都更容易使用。

一个最近受 simple mode 驱动但对每个人都有益的功能的绝佳例子是 device automations。使用 device automations，配置 Zigbee 遥控器变得轻而易举。你可以直接从列表中选择应该触发你的 automation 的按钮。与此相比，以前的方式是：你需要在 event dev tool 中监听 `zha_event`，然后按下按钮以学习事件数据，用于 event trigger 的匹配。

另一个将使所有人受益的正在进行的工作是，我们在 Hacktoberfest 中重点关注将 scenes 变为[一等公民](https://github.com/home-assistant/core/issues/25681)。

## 评论

<div id='discourse-comments'></div>

<DiscussionBox discourseUrl="https://community.home-assistant.io/"
      discourseEmbedUrl="https://developers.home-assistant.io/blog/2019/10/05/simple-mode.html" />