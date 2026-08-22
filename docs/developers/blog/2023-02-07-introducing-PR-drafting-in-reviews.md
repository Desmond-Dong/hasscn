---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorImageURL: /img/profile/frenck.png
authorTwitter: frenck
title: 在 review 流程中引入 PR drafting
---

Home Assistant 收到了大量贡献，这真是太棒了！但是
当有大量 PR 时，就很难追踪它们的状态。

为此，我们在 review 流程中引入了一项新流程，
当 PR 需要更多工作才能再次 review（或合并）时，
会自动将其标记为 draft。

我们已调整 bot，如果 review 请求了更改，则自动将 PR 标记为 draft。一旦更改完成，PR 的作者可以
点击 "Ready for review" 按钮将 PR 从 draft 中取消，使其准备好
再次接受 review。

![The ready for review button in the bottom of a PR in draft mode](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/ready-for-review.png)

在点击 "Ready for review" 按钮之前，请确保已处理
所有请求的更改，且所有 CI jobs 和 checks 均成功通过。

## 什么是 draft PR？

Draft PR 是指尚未准备好接受 review 的 PR。它是一种让其他人
知道您正在处理某事的方式，但它尚未准备好接受 review 和
合并。

Draft PR 在 PR 右上角有 "Draft" 标签，并且在 GitHub UI 各处
都以灰色合并图标显示。

![This is what a PR in draft looks like](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/pr-in-draft.png)

这并不意味着您应该打开 PR 来开始处理某事；请
仅在您认为已准备好接受 review 和合并时才打开 PR。然而，
在打开 PR 后，可能出于某种原因需要将其重新设置为 draft 状态。

例如，打开 PR 会自动触发我们的 CI jobs
和 checks。这些 checks 可能会发现您代码中需要调整的问题，
或者确实进行了 review 并请求了更改。

您可以随时通过将 PR 右上角的 "Convert to draft" 链接点击，
将任何 PR 重新设置为 draft。

![Putting a PR in draft is something you can do too](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/convert-to-draft.png)

## 我们为什么要这样做？

作为 reviewer，您会面对大量 PR。有些已准备好接受
review，有些则没有。通常，唯一的方法就是打开
PR 并查看，结果发现它仍在进行中。

这不仅浪费时间，也浪费精力。尤其是
考虑到这种情况会发生在多个 reviewer 身上，且每天在同一个 PR 上发生多次。

PR 的 draft 状态在 GitHub 的所有地方都是可见的。在通知、
搜索以及 PR 的概览中。最重要的是，它易于筛选。

这让 reviewer 能够更好地专注于当前真正需要他们关注的内容。

更多背景信息可以在
[此 Google Document](https://docs.google.com/document/d/11_x2YUmAD07JN7JMM4YIIAWVGTJsOB0UptN8hlmWFWg/edit?usp=sharing) 中找到。

或者，[在此页面阅读有关我们 review 流程的所有内容](/developers/review-process)。