---
title: Logitech 对本地 API 的立场
description: 'Logitech 曾决定移除其 Harmony Hub 上一个被广泛使用的本地 API。我们在这里博客-remove-api持续追踪了整个事件。这一变动在我们的用户以及其他接入 Harmony Hub 的智能家居用户中引发了大量讨论：很多人突然发现家里的自动化失效了。'
---
# Logitech 对本地 API 的立场

#### 本文最初讨论的是 Logitech 在移除其私有但被广泛使用的本地 API 后，不愿继续支持本地 API。该决定现已撤回，因此本文结论已不再适用于 Logitech。事件详情可见[这篇博客][博客-remove-api]。

Logitech 曾决定移除其 Harmony Hub 上一个被广泛使用的本地 API。我们在[这里][博客-remove-api]持续追踪了整个事件。这一变动在我们的用户以及其他接入 Harmony Hub 的智能家居用户中引发了大量讨论：很多人突然发现家里的自动化失效了。在本就忙碌的假期季，这显然不是一个好的开始。

在 2018 年，这类讨论大多发生在 Twitter 上。我们浏览讨论时，看到了 Logitech Smart Home 产品营销高级经理 [Todd Walker] 的这段表态：

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Currently, we do not plan to add support for 本地控制.</p>&mdash; Todd Walker (@ToddW_Logitech) <a href="https://twitter.com/ToddW_Logitech/status/1075222154726100993?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

我们对此也有很多看法，但 Home Assistant 贡献者 [Jon Maddox] 在 Twitter 上已经做了很到位的表达：

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">You realize that any kind of 设备 like this…with only cloud control…is an inferior experience right?<br><br>Why would you mandate the latency that round trip cloud requests incur? Please try harder to make the product better, not usurping more control over it.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075275432243666945?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">The Harmony smart assistant skills are limited to 1 hub. Will you guys be resolving that? <br><br>Your official implementations of things we’ve accomplished ourselves, are actually inferior.<br><br>I think people would be less upset if the case was different.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075275973086625792?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Why should we buy more than one Harmony hub if only one of them works with Alexa? We utilized the local api to create our own supported experience that allows for private, secure, faster, and more than 1 hub.<br><br>That means we BUY more than 1 hub. That’s a really great thing.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075276431985467392?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">And lastly, (to get it all off my chest 😄), locking down a local API and forcing 用户 to a complete cloud solution is not more secure. <br><br>Home networks are trusted 区域. Corporate clouds have proven time and time again to be revealed as less than secure.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075276977022689282?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I can be responsible for my own home network. I cannot be sure that yours is. <br><br>Consider embracing these 用户. Create an authenticated local API. 本地控制 is the only guaranteed private, secure, and RELIABLE way to control the future of 设备 at home.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075277380267229184?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

[博客-remove-api]: /博客/2018/12/17/logitech-harmony-removes-local-api/
[Todd Walker]: https://twitter.com/ToddW_Logitech
[Jon Maddox]: https://twitter.com/maddox
