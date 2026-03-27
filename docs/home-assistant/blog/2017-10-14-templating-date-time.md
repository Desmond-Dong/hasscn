---
title: 模板、日期与时间
description: '这个 拉取请求(https://github.com/home-assistant/home-assistant/pull/9868) 很清楚地展示了：如果文档写得不够好，会发生什么。简而言之，这篇文章讲的是 模板(/home-assistant/docs/configuration/templating/)。'
---
# 模板、日期与时间

这个 [拉取请求](https://github.com/home-assistant/home-assistant/pull/9868) 很清楚地展示了：如果文档写得不够好，会发生什么。简而言之，这篇文章讲的是 [模板](/home-assistant/docs/configuration/templating/)，以及当相关内容没有被记录下来时，人们会如何开始想出各种有创意的方法来解决问题。假设我们想获取当前年份，可以使用下面几种方法：

- 使用 [`rest` 传感器](/home-assistant/integrations/rest) 和 `value_template:` 去查询 [JSON Test](http://date.jsontest.com/)。
- 使用 [`time_date` 传感器](/home-assistant/integrations/time_date) 和模板 ``。
- 用任意语言写一个脚本，然后配合 [`command` 传感器](/home-assistant/integrations/sensor.command_line/) 使用，或者直接把 `date +"%Y"` 作为 `command:`。

<!--more-->

我们当然希望事情更简单，对吧？[模板](/home-assistant/docs/configuration/templating/) 提供了 `now()` 和 `utcnow()`。这篇博客里我们用 `now()` 举例，但同样也适用于 `utcnow()`。我们的文档当时是这样写的：

<blockquote>
  `now()` 会渲染为你所在时区的当前时间。
</blockquote>

嗯，......好吧，算是个开始。那要怎么拿到年份呢？`` 会返回 `2017-10-14 20:27:23.700401+02:00`，这比我们真正想要的内容多得多。作为用户，你并不想一头扎进代码里，但答案其实就在那里。`` 返回的是一个 [Python `datetime` 对象](https://docs.python.org/3.6/library/datetime.html#datetime.datetime)。这意味着你在模板里可以访问到比想象中更多的内容：

- 时间相关：`now().microsecond`、`now().second`、`now().minute` 和 `now().hour`
- 日期相关：`now().day`、`now().month` 和 `now().year`
- 其他：`now().weekday()` 和 `now().isoweekday()`

如果是年份，就可以写成：``。我猜 `now().resolution`、`now().min` 和 `now().max` 也会有一些比较少见的使用场景。

[Hacktoberfest](/home-assistant/blog/2017/09/29/hacktoberfest/) 还在进行中。参与文档工作其实很简单。如果你知道什么不错的[技巧](/home-assistant/examples/)，想帮忙改进某个平台页面，或者只是修正一个拼写错误，都欢迎参与。我们的[网站和文档部分](/home-assistant/developers/docs/)里列出了一些要求，这些要求定义在[文档规范](/home-assistant/developers/docs/standards/)中，而「[创建页面](/home-assistant/developers/docs/create_page/)」文档里还有其他有用的细节。

感谢 [Egor Tsinko](https://github.com/etsinko) 让我们注意到这个问题。

