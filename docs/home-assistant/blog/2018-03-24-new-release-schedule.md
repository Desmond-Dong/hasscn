---
title: 更新发布节奏
description: '这个周末我们会稍微调整一下发布方式。今天我们不会直接发布新版本，而是先发布新版本的 beta：0.66.0.beta0。经过一周 beta 测试后，这个版本会晋升为新的稳定版发布。在 beta 期间，我们也会像往常一样继续在 dev 分支接收下一个版本的贡献。'
---
# 更新发布节奏

这个周末我们会稍微调整一下发布方式。今天我们不会直接发布新版本，而是先发布新版本的 beta：`0.66.0.beta0`。经过一周 beta 测试后，这个版本会晋升为新的稳定版发布。在 beta 期间，我们也会像往常一样继续在 `dev` 分支接收下一个版本的贡献。

<p class='img'>
<img
    src='/home-assistant/images/blog/2018-03-release-schedule/release-schedule-diagram.png'
    alt='Diagram showing the updates 发布 cycle containing a week extra time before 发布.'
>
新发布节奏示意图
</p>

我们的目标是让首次正式发布更稳定，尽量减少紧急热修复的需要。所以如果你希望更快体验新功能，并且可以接受偶发 bug 的风险，现在就可以切换到 beta 通道：

 - Hass.io 用户可在系统设置里启用 `dev` 通道。
 - Docker 用户可以通过 `rc` 标签获取 beta 版本。
 - 我们也会把 beta 版本发布到 PyPI。由于它是 beta 发布，`pip` 默认不会安装，需在命令中显式指定：`pip3 install --pre --upgrade homeassistant`。

beta 版本文档见 [https://rc.home-assistant.io/](https://rc.home-assistant.io/)。

如果你在预发布版本的代码或文档中发现问题，请在[对应位置](/home-assistant/help/#bugs-feature-requests-and-alike)提交 issue，或者更好的是直接提交 pull request 修复。
