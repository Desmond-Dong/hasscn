import DiscussionBox from '../static/js/discourse\_discussion.jsx'

*本文介绍 Home Assistant climate integration 即将发生的变更。这些变更目前正在实施中，不再接受讨论。如果你希望看到变更，请考虑提出[架构议题](https://github.com/home-assistant/architecture/issues)。*

从 Home Assistant 0.96 开始，我们将交付 climate integrations 的大型架构清理。这项努力由 Pascal Vizeli 领导。

多年来，climate integration 从一个简单的恒温器位置，发展为容纳空调、热泵和通风系统。在此期间，出现了失误，导致设计混乱且难以使用。清理工作正在进行中，我们将在 Home Assistant 0.96 中交付。

我们犯的最大错误是将 operating mode 和 operation mode 混淆了。Operation mode 是你希望恒温器做的事，例如将房屋加热到 19 °C。Operating mode 是恒温器\_当前\_在做什么。是因为房屋太冷而在加热？还是已经达到了目标温度，当前处于 idle？

此外，我们发现许多 integrations 通过大量选项过度重载了 operation mode，如 "eco"、"comfort"、"boost" 或 "sleep"。在仔细分析了各种气候系统后，我们得出结论，这些替代 operation modes 是现有 operation modes（heat、cool、heat-cool）的变体，但可能有不同的目标温度范围，或者尝试以更慢的速度加热/冷却以节省能源。

为了尽可能支持多种恒温器，我们决定允许 climate devices 指定它们正在运行的新 "preset" mode。它涵盖 hold mode、away mode，或恒温器包含的任何自定义 operation mode。

你可能想知道，为什么要使用 preset 而不是允许重载 operation mode？乍一看，一个 integration 列出可能的选项和当前选择的选项似乎是可行的，很容易构建 UI。然而，这不是 Home Assistant 被使用的唯一方式。我们还作为单一地点为外部系统（如 Google Assistant 或 Amazon Alexa）控制任何恒温器。它们有一套有限的期望的 operation modes。

变更要点：

* `operation_mode` 已重命名为 `hvac_mode`，以强调该 mode 的用途。
* 我们将 HVAC mode `auto` 拆分为 `auto` 和 `heat_cool`。如果是 `heat_cool`，用户设定了设备必须使用加热和冷却来保持在内的温度范围。Auto mode 现在仅限于运行在 schedule 或 AI 上的设备。
* Climate entity 的 state 现在总是等于 HVAC mode。
* `hvac_action` 引入用于知道当前 action（heating、cooling、idle）的 integrations。
* `set_away_mode` 和 `set_hold_mode` 已合并为 `set_preset_mode`。因此，不再是 `turn_away_mode_on()`，现在我们将调用 `set_preset_mode("away")`。
* `is_on` 属性已移除。如果设备能够关闭，它应包含 hvac mode `HVAC_MODE_OFF`。
* 属性名已对齐，所有以 "\_list" 结尾的现在命名为 "\_modes"。

如果你是拥有 climate platform 的 integration 的维护者，或维护拥有 climate platform 的 custom component，请确保你[跟进该 pull request](https://github.com/home-assistant/core/pull/23899)，并在 beta 期间测试你的 integration，确保它按预期工作。

<!--truncate-->

## 评论

<div id='discourse-comments'></div>

<DiscussionBox discourseUrl="https://community.home-assistant.io/"
   discourseEmbedUrl="https://developers.home-assistant.io/blog/2019/07/03/climate-cleanup.html" />
