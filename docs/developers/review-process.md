---
title: "Pull Request 评审流程"
---

Home Assistant 项目由许多较小的子项目组成，分布在多个 GitHub repositories 中，它们共同构成了我们所熟知和喜爱的 Home Assistant。

我们通过 GitHub Pull Requests 收到了大量的贡献，这真是太棒了。我们对此深表感激。本页描述了我们的 review process，以便你在提交 PR 时了解会发生什么。

本页提供了关于创建 pull requests 以及如何处理它们的通用提示和指南。它并非创建 PR 的完整指南；不过，本页中的大多数内容同样适用于向任何开源项目贡献。

## 谁负责 review PR？

Home Assistant 是一个开源项目。我们项目中发生的一切几乎都是志愿者完成的。我们有一个 core team 的开发者，负责 Home Assistant 的整体架构，他们负责合并 PR（同样是志愿者）。不过，他们并不是唯一 review PR 的人。

任何人都可以帮忙 review PR，我们鼓励大家这么做。

因此，当你打开一个 PR 后，请考虑查看是否有可以帮忙处理的 open PR。任何 review 评论、改进建议，甚至只是“我用……测试过，可以工作”，都是非常受欢迎的。此外，查看他人的代码也是学习更多关于 Home Assistant 知识的绝佳方式。

## 创建 PR 之前

**遵守架构决策。**

所有与 Home Assistant 项目相关的架构决策都记录在 [ADR folder](https://github.com/home-assistant/architecture/tree/master/adr) 中。在创建 PR 之前，请确保遵循这些规则和指南，以避免因 PR 未遵循这些规则而需要后续调整。如有必要，可以在提交 PR 进行 review 之前发起新的 [discussion](https://github.com/home-assistant/architecture/discussions)，以做出必要的决策。

## 创建完美的 PR

不存在完美的 PR，但有些事情可以让你的 PR 更容易被 review。这不仅有助于 reviewers，也作为贡献者可以帮助你更快地合并更改，让最终用户更早地使用上你的改进。

1. **让 PR 尽可能小。**
   一个 PR 应该只 refactor 一件事、修复一件事、添加一个功能，或在文档中调整一个主题。如果你想改多件事，请创建多个 PR。更小的 PR 范围更小、需要更少 review 时间、更少发生冲突，并且通常需要的 review 轮次也更少。

2. **一次只改一件事。**
   这与前面一点相同，但更具体。你可能很想顺便改进附近你注意到的那一两行代码，但请不要这么做。把它们放到单独的 PR 中。PR 中的无关更改会让人分心，并且常常引发疑问。相反，在一个独立的 PR 中，这会是一个快速而简单的 review 和合并。

3. **在创建 PR 之前先测试你的更改**。
   这听起来显而易见，但我们经常看到包含根本无法运行的代码的 PR，或者在生成的页面上看不到的文档更改。当然，这对你和 reviewer 都是一种精力浪费；它增加了一次不必要的 review 轮次。请确保至少运行并物理测试你的更改。确保它们按预期工作（对于文档：按预期呈现）。

4. **确保 PR 基于 dev upstream branch 的最新版本。**
   在创建 PR 之前，确保拉取了最新的 upstream 更改。在你编写更改的过程中，upstream 可能已经发生了变化。这可能导致 merge 冲突、测试失败，或你的更改无法按预期工作。

5. **创建 (feature) branch。**
   当你创建 PR 时，它基于一个 branch（通常是 dev branch）。你必须为每一个创建的 PR 新建一个 feature branch。这有助于保持 dev branch 与 upstream branch 同步，也便于在 PR 合并后删除该 branch。

6. **遵循 PR template 并添加清晰的 title 和详尽的 description。**
   当你打开 PR 时，会提供一个 PR template。使用 template 并尽可能多地填写字段。花时间写一个良好、清晰且简洁的 title，并添加对更改的详尽 description。务必为你的 PR 添加一个 motivation（或使用场景），以便 reviewer 理解你为什么要做这项更改（或为什么做出某些决策）。

7. **在独立 PR 中更新依赖。**
   当你需要 bump 一个依赖时，尽量在独立 PR 中完成。PR 中只应包含兼容性代码调整或小型相关的 bug fixes。如果你有依赖新依赖的新功能，可以在后续 PR 中添加。在 review 新功能或较大的 bug fixes 时，这也将使 CI 迭代运行得快得多，因为它将测试限制在单个 integration 上。请确保 PR description 中至少包含以下一项（或多项）：
   - 指向该包版本的 release notes 的链接，以及其间所有版本的链接。
   - 指向该包 changelog 的链接。
   - 指向从当前版本到 bump 后版本的 Git(Hub) diff/compare 视图的链接。
   这使我们能够 review upstream 的更改，这是决定该更改是否按预期工作以及/或者是否可以将其包含在例如 Home Assistant 的 patch release 中所必需的。

## 接收 review comments

当你的 PR 打开后，总会有人在某个时刻查看你的代码。Reviewer 可能会对你的代码提出一些 comments，甚至提出更改请求。

**请务必牢记，这些 review comments 并非针对个人。** Reviewer 并不是想要侮辱你或让你感觉不好。他们是在帮助你改进 PR，以便其能够被合并。和你一样，他们也是志愿者，并且都在努力让 Home Assistant 变得更好。我们的目标是一样的。

无论你的经验多么丰富，总是可以从他人身上学到东西，所以不要反感，欣然接受。不要害怕提问，或要求澄清。如果你不理解某些内容，尽管问！

## 需要更改时 PR 会被设为 draft

如果你的 PR 收到了更改请求，我们的 bot 会自动将你的 PR 标记为 draft。这意味着该 PR 目前尚不能合并或进一步 review。

Draft PR 会告诉其他查看所有 PR 列表的 reviewers，该 PR 目前正在进行中，暂时不需要他们的关注。

一旦你完成了所请求的更改，可以通过点击 "Ready for review button" 将 PR 重新标记为 ready for review：

![The ready for review button in the bottom of a PR in draft mode](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/ready-for-review.png)

在点击 "Ready for review" 按钮之前，请确保你已经处理了所有请求的更改，并且我们所有的 CI jobs 和 checks 都成功通过。

一旦点击了 "Ready for review" 按钮，PR 将恢复到正常状态，我们的 bot 会自动通知那些提出更改请求的 reviewers，PR 已准备好！

## 加快 review process

1. **Build/CI 失败？将 PR 设为 draft！**
   打开了 PR，但 build 失败了？别担心，这种事我们都会遇到。如果你确信失败与你的更改无关，你可以让 PR 保持打开。不过，如果失败与你的更改有关，你应该在解决期间将 PR 标记为 draft。这样可以防止 reviewers 在 PR 准备好之前查看它。

   ![Putting a PR in draft is something you can do too](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/convert-to-draft.png)

2. **监控你的 PR 并使其保持最新。**
   即使你的 PR 尚未被 review，你也应该主动监控它。确保没有引入 merge 冲突（GitHub 会在发生这种情况时提醒你），并在经过一周不活动后[用最新的 development branch 更新它](/developers/development_catching_up)。这确保了在 review process 开始时，你的 PR 已经准备就绪。

3. **添加 tests。**
   如果你正在添加新功能，请确保添加 tests。如果你正在修复一个 bug，请确保添加一个能够捕获该 bug 的 test。如果你正在 refactor 代码，请添加 tests 以确保你的 refactor 没有破坏任何东西。Tests 有助于证明你的代码按预期工作，但更重要的是，它确保一切在未来也能持续正常工作。虽然 tests 增加了需要 review 的代码量，但它也帮助 reviewers 以不同的方式理解你所解决的问题。

4. **回顾、调整，并精雕细琢至完美。**
   有时，稍后回头看看自己的代码会教会你新的东西，并帮助你自行发现不完美或问题。在等待 review 时，正是确保你的 PR 尽可能好的完美时机。

5. **帮忙 review 队列。**
   帮助加快 review process 的最佳方式是参与 review process！你所接手的任何 review 工作都有助于加快所有人的 review process。此外，其他人可能会注意到你的 review，并回报你。

## 不要做的事

- 不要直接联系 contributors、code owners、core team members 或其他 reviewers 关于某个 PR，或在 PR 中 ping/mention 他们来请求 review。虽然你可能是出于友好，但这可能会被看作是令人烦恼或强人所难。相反，我们的 bots 会处理 ping 正确的人员：请保持一点耐心 :)

- 不要在 PR description 中请求 review。这是多余的，因为 PR 本身已经表明了这个意图 😉。如果有需要，我们的 bots 会通知相关人员；请避免自己这么做。

- 不要提交依赖于其他仍处于 open/unmerged 状态的 PR 的新的 pull requests。这会在队列中创建不必要的、无法操作的 PR。

- 不要打开超过 5 个 pull requests。如果你有超过 5 个 open PR，我们会要求你关闭其中一些，直到其他一些被合并。类似于依赖性的 pull requests，请等待一个 PR 被批准后，再将这种方法应用到多个 PR。

- 如果你不打算继续工作，就不要打开 PR。如果你在打开 PR 后无法继续工作，请告诉我们并关闭它。关闭 PR 并不可耻；不过，如果是卡住了，请随时在我们的 [#devs channel in our Discord chat](https://www.home-assistant.io/join-chat) 中寻求帮助。

## 我的 PR 已经合并了！

恭喜！

**最重要的是：非常感谢！❤️**

你刚刚让 Home Assistant 变得更好。你帮助我们改进了代码、文档、tests、用户体验，或社区。你帮助我们让 Home Assistant 对所有人来说都更好。

保持势头！随意打开另一个 PR，或帮忙 review 其他 PR。

如果这是你的第一个 PR，别担心，我们保证，每次经历这个过程都会变得更轻松。

## 常见问题

1. **如何让我的 PR 被合并？**
   不能保证你的 PR 一定会被合并。我们有很多 contributors，我们必须确保不会破坏任何东西。我们会尽快 review 你的 PR，但请保持耐心。如果你想加快流程，请阅读上面关于如何加快 review process 的章节。

2. **我的 PR 已经等待 review 好几天了，什么时候会被 review？**
   视 repository 而定，可能需要一段时间你的 PR 才会被 review。这取决于很多因素。例如，修复 bug、改进代码质量、较小或提供 tests 的 PR（以及这些的组合）通常优先于添加新功能的 PR。PR 的规模和复杂度也是一个因素，因为它意味着更少的人愿意或有能力接手你的 PR。你总是可以考虑将 PR 变得更小、更专注，以加快 review process。还有一些 PR 可能需要或需要具有特定知识的人来 review（例如架构更改或需要 code owner 批准的更改），这可能会导致更长的等待时间。

3. **这么多小的 PR 不是超级低效吗？**
   这是一个常见的误解。虽然 review 大量小 PR 看起来像是很多工作，但实际上它更高效。小 PR 更容易被更多人 review，这意味着更多人可以加入帮忙 review。它们可以在更短的时间内被快速接手，并且更不容易与其他 PR 冲突。一般来说，review 较小的 PR 会得到更好的 review，并且不太可能引入新的 bug，因为在大型 PR 中更容易忽略某些东西。

4. **Bot 说我的 PR 即将 stale，这是什么意思？**
   Bot 会在一段时间不活动后自动将 PR 标记为 stale。如果 PR 继续保持不活动，bot 会关闭它。这可能意味着 PR 正在等待你的更改，或者等待我们项目的 review。请确保前一种情况不是事实；如果你是在等待 review，只需留言说明。通过回复 bot，它会知道情况并非 stale，从而不再行动。同时，[用最新的 development branch 更新它](/developers/development_catching_up) 是个好主意，以确保你完全同步了最近的更改。

5. **我有一个应该进入 hotfix/patch release 的 PR，该怎么做？**
   像平常一样创建 PR，并在 PR description 中非常明确地说明该 PR 是一个需要包含在 patch release 中的 hotfix。Reviewer 随后会进行双重检查，并通过给 PR 打上下一个 patch milestone 标签来确保它被包含在下一次 patch release 中。

## 仓库特定信息

我们的一些 repositories 有特定的要求或指南，这些是在本通用指南之上的额外要求。

### Home Assistant 核心

[Home Assistant Core](https://github.com/home-assistant/core) repository 有许多要求和指南，以确保代码质量。在创建对 Core repository 的贡献时，以下 developer documentation 页面可能会有所帮助：

- [Development checklist](/developers/development_checklist)
- [Development checklist for integrations](/developers/creating_component_code_review)
- [Submitting your work](/developers/development_submitting)
- [Style guidelines](/developers/development_guidelines)
- [Testing your code](/developers/development_testing)
- [Catching up with reality](/developers/development_catching_up)
- [Tips and Tricks](/developers/development_tips)

### Home Assistant 文档

要了解贡献文档的相关信息，请参阅 [Contributing to documentation](/developers/documenting)。

### Home Assistant 前端

[Home Assistant Frontend](https://github.com/home-assistant/frontend) 在 [Frontend development page](/developers/frontend/development#creating-pull-requests) 上提供了开发和贡献 frontend 的指引。

### Home Assistant 意图

构建 voice assistant 是一项复杂的任务。它需要多种不同的技术协同工作，因此有一些指南可以参考：

- [Contributing template sentences](/developers/voice/intent-recognition/contributing)
- [Response Style Guide](/developers/voice/intent-recognition/style-guide)

## 帮助？！我还有更多问题！

Developer documentation 中有很多信息，甚至更多关于贡献和 pull requests 的信息，因此请务必使用页面右上角的搜索功能来查找你需要的内容。

不过，你可能仍然卡住，或者有一个文档中没有回答的问题。在这种情况下，请随时在我们的 [#devs channel in our Discord chat](https://www.home-assistant.io/join-chat) 中提问。

我们很多人都会在那里，并且总有人愿意帮助你。
