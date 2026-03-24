---
title: “[更好的解决方案！] TP-Link 提供了重新添加本地 API 的方法”
description: TP-Link 上周决定发布固件升级，删除了
  访问本地API。他们正在部分撤销这一决定。
---

**11 月 26 日更新：** TP-Link 现已宣布他们正在开发新固件来解决该问题。在 Twitter 上私信他们以获取信息。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re sorry the recent firmware 更新 has problems for the Kasa community. Since its 发布, we&#39;ve been busy creating a Beta firmware that&#39;ll enable people to continue to use third-party smart home software &amp; platforms using local APIs. Please DM if you&#39;d like the Beta firmware</p>&mdash; TP-LINK UK (@TPLINKUK) <a href="https://twitter.com/TPLINKUK/status/1331970582901100544?ref_src=twsrc%5Etfw">November 26, 2020</a>
</blockquote>

---

上周 TP-Link 发布了 HS100 和 HS110 插头的更新，删除了本地 API。这样做是出于“安全考虑”。我将其放在引号中，因为它尚未经过验证，并且之前在删除互操作性时已给出此原因。 TP-Link 通过 Twitter 传达了这一消息，以回应用户表达的担忧。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">There were security vulnerabilities on the plug for the local management, the latest firmware 版本 fixed these security issues. It is suggested to use the TP-Link official App KASA to manage the plug. If you have issues, pls feel free to let us know.</p>&mdash; TP-LINK UK (@TPLINKUK) <a href="https://twitter.com/TPLINKUK/status/1328687659133399043?ref_src=twsrc%5Etfw">November 17, 2020</a>
</blockquote>

许多用户理所当然地感到愤怒。他们购买插件时认为本地 API 是一项功能。删除此功能并强迫用户通过 TP-Link 云很糟糕。它消除了 TP-Link 在众多智能插头中脱颖而出的一项功能。

经过一周的愤怒用户之后，TP-Link 似乎已经倾听了……_某种程度上_。他们提供了一个临时解决方案来回滚固件。我们还没有找到任何公共文档，但有他们的员工 [here](https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030) 和 [here](https://community.tp-link.com/en/home/forum/topic/237614#topic-reply-520984) 的论坛帖子。

<p class='img'>
<img src='/home-assistant/images/blog/2020-11-23-tplink/forum-post-send-ticket.png' alt='TP-Link employee on the forums explaining how to downgrade the firmware'>
<a href="https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030">Forum post</a> 由 TP-Link 员工发送票证。
</p>

我们希望有更好的解决方案，但现在这是您应该做的：

1. ~~向 [technical support](https://www.tp-link.com/en/support/contact-technical-support/#E-mail-Support) 提交工单。确保包含您的插头的 MAC 地址。~~ 我们从 TP-Link 获得更新，不再需要此步骤。
2. 前往论坛并向 [this user](https://community.tp-link.com/en/home/uc/info/650029) 发送一条消息，其中包含您的 TP-Link ID、型号、硬件版本和 MAC 地址。

TP-Link，如果您正在阅读，请通过 hello@home-assistant.io 与我们联系，以便我们讨论更好的本地控制长期解决方案。聊得开心！
