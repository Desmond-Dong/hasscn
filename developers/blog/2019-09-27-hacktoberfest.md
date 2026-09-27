import DiscussionBox from '../static/js/discourse\_discussion.jsx'

今年我们再次参与 [Hacktoberfest](https://hacktoberfest.digitalocean.com)。Hacktoberfest 是一项庆祝开源的全球活动。如果你在 10 月提交 4 个 pull request，你将获得一件免费的 Hacktoberfest t-shirt。

Home Assistant 目前正在向我们神奇的 1.0 版本冲刺。Home Assistant 1.0 注重用户友好性。作为其中的一部分，我们最近引入了 device automations，并扩展了 scenes 在 Home Assistant 中的工作方式。

Home Assistant 支持广泛的产品，因此并非我们构建的每个功能都支持每种产品类型。在本次 Hacktoberfest 中，我们准备了 issues，帮助 integrations 使用最新的 Home Assistant 功能。

为了更容易入门，我们引入了一个新的 scaffolding 脚本。该脚本能够创建向现有 entity integrations 添加新功能所需的所有样板代码，包括 tests！你只需专注于与特定 integration 配合工作的代码。每个链接的 issue 中都有使用说明。

如果你想查看所有可用 issues，而不是下面的精选列表，[请点击这里](https://github.com/issues?page=1\&q=is%3Aopen+is%3Aissue+org%3Ahome-assistant+archived%3Afalse+label%3AHacktoberfest\&utf8=%E2%9C%93)（需要登录 GitHub）。

**9 月 30 日更新：** 添加了文档部分，更新了 Almond 部分的链接，添加了指向所有 Home Assistant Hacktoberfest issues 的链接。

**10 月 1 日更新：** 添加了 Frontend 部分。

## 场景

Scenes 允许用户定义灯光应该看起来的样子（即，它应该是开启的，颜色应该是蓝色的）。当 scene 被激活时，由 Home Assistant 决定调用哪些 services 来实现。

Scenes 是强大的工具，用户易于理解。因此，改进我们的 scene 支持很重要。我们准备了以下 issues：

* [添加 `scene.create` service 用于即时创建 scenes。](https://github.com/home-assistant/core/issues/27023)
* \~~[添加 `scene.apply` service 用于应用定义为 service data 的 scene。](https://github.com/home-assistant/core/issues/26813)~~
* \~~[在 script 语法中添加 activate scene](https://github.com/home-assistant/core/issues/27026)~~
* [为 entity integrations 添加 reproduce state 支持。](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93\&q=label%3AHacktoberfest+reproduce_state+is%3Aopen+)（多个 issues）

<!--truncate-->

## 设备自动化

Device Automations 是一种面向设备的方式，让用户创建 automations。在定义 automation 的 trigger、condition 或 action 部分时，用户将从选择一个设备开始，查看该设备的可能选项列表。简单！

Device automations 依赖 integrations 为每个设备定义可能的选项。由于这是一项新技术，我们仍在寻求帮助，使所有 entity integrations（light、switch 等）支持它。我们准备了以下 issues：

* [为 entity integrations 添加 device trigger 支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93\&q=label%3AHacktoberfest+device_trigger+is%3Aopen+)（多个 issues）
* [为 entity integrations 添加 device condition 支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93\&q=label%3AHacktoberfest+device_condition+is%3Aopen+)（多个 issues）
* [为 entity integrations 添加 device action 支持](https://github.com/home-assistant/core/issues?utf8=%E2%9C%93\&q=label%3AHacktoberfest+device_action+is%3Aopen+)（多个 issues）

## Home Assistant 文档

猜猜什么永远做不完？文档。

* [为 integrations 填充缺失的文档](https://github.com/home-assistant/home-assistant.io/issues?q=is%3Aissue+is%3Aopen+label%3AHacktoberfest)
* [为 hass.io add-ons 填充缺失的文档](https://github.com/home-assistant/hassio-addons/issues?q=is%3Aissue+is%3Aopen+label%3AHacktoberfest)

## 前端

我们还需要在 Home Assistant 的 Frontend 上做些工作。
因此我们也准备了一些 issues 帮你入门：

* [使所有文本可翻译](https://github.com/home-assistant/frontend/issues?utf8=%E2%9C%93\&q=label%3AHacktoberfest+label%3Alocalization+is%3Aopen+)（多个 issues）
* [帮助使 Home Assistant 更易访问](https://github.com/home-assistant/frontend/issues?q=is%3Aopen+label%3AHacktoberfest+label%3Aaccessibility)（多个 issues）
* [以及大量其他小 UX issues](https://github.com/home-assistant/frontend/labels/Hacktoberfest?page=2\&q=is%3Aopen+label%3AHacktoberfest)

## 奖励：Almond - 虚拟助手

[Almond](https://almond.stanford.edu/) 是斯坦福大学的一个开放、保护隐私的虚拟助手。我们一直在[合作](https://github.com/stanford-oval/thingpedia-common-devices/pull/80)使其与 Home Assistant 配合工作。目前它仅限于控制 Home Assistant 中的 lights。

在本次 Hacktoberfest 中，让我们看看能否扩展支持类型的数量！要开始，请查看以下链接：

* [关于如何贡献 Home Assistant 特定类型的文档](https://almond.stanford.edu/doc/home-assistant-integration.md)
* [关于如何运行 tests 的文档](https://almond.stanford.edu/doc/thingpedia-testing.md)
* 在[家中](https://github.com/stanford-oval/almond-server)、[Android 版本](https://play.google.com/store/apps/details?id=edu.stanford.thingengine.engine\&hl=en_US)或 [Gnome 版本](https://flathub.org/apps/details/edu.stanford.Almond) 运行 Almond

## 评论

<div id='discourse-comments'></div>

<DiscussionBox discourseUrl="https://community.home-assistant.io/"
   discourseEmbedUrl="https://developers.home-assistant.io/blog/2019/09/27/hacktoberfest.html" />
