---
title: '[Update: new 用户 only] Nest to turn off their API'
description: Nest has announced that they will shut down their API in August, no longer
  allowing you to access your data.
---

**更新 May 16:** Nest 刚刚在[一篇博文](https://博客.google/products/google-nest/updates-works-with-nest/)中宣布调整计划。它仍会在 8 月底关闭 Works with Nest 项目，但不会再切断现有 API 用户的访问权限。不过，它依然会在 8 月底停止接收新用户。

目前，每位 Home Assistant 用户都需要自行创建开发者账号，才能配置自己的 Nest 集成。我们会联系 Nest，看看是否能成为合作伙伴，好让 8 月之后加入 Home Assistant 的用户仍然可以继续使用 Nest。

---

唉，又来一个。而且这次还不是小事：Nest 正在关闭他们的 API。

我们早在 1 月时就已经[看到了这个危险信号](/home-assistant/blog/2019/01/24/nest-cannot-access-data/)，而现在它已经[正式确认](https://开发者.nest.com/)：Google 宣布 Nest API 将于 2019 年 8 月底关闭。这意味着再过三个多月，你将无法再取回那些 Google 在你家中收集的数据，也无法按自己的意愿使用这些数据。

<p class='img'>
<img src='/home-assistant/images/blog/2019-05-nest-data-bye-bye/notice.png' alt='Screenshot of the Nest developer website.'>
Notice posted on the Nest developer website.
</p>

Nest 给出的关闭 API 理由是，他们要把重心放在打造“Works with Google Assistant”这个更有帮助、也更智能的家庭生态系统上。然而最关键的问题在于：Google Assistant 生态是一条单行道。你可以把数据送进去，却永远拿不出来。他们也在[官方常见问题](https://nest.com/whats-happening/)中承认了这一点：

<p class='img'>
<img src='/home-assistant/images/blog/2019-05-nest-data-bye-bye/faq.png' alt='Screenshot of the 常见问题 on the Nest developer website.'>
常见问题 Nest developer website.
</p>

## 雪上加霜

Google 还[宣布](https://nest.com/博客/2019/05/07/introducing-google-nest/)，他们将把 Nest 生态全面并入 Google 体系，要求你把所有 Nest 设备都绑定到 Google 账号上。这会怎么运作？我们就把 [《金融时报》这篇文章](https://www.ft.com/content/d8cbd5e6-70de-11e9-bf5c-6eeb837566c5) 里的这段内容放在这里，大家自行体会：

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Well that&#39;s reassuring <a href="https://t.co/SKFkE8cAyR">https://t.co/SKFkE8cAyR</a> <a href="https://t.co/zmjMjm23h0">pic.twitter.com/zmjMjm23h0</a></p>&mdash; David Meyer (@superglaze) <a href="https://twitter.com/superglaze/status/1126043166031994880?ref_src=twsrc%5Etfw">May 8, 2019</a>
</blockquote>

我们的建议始终不变：购买那些支持本地通信的设备。
