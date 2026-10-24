# Oculus Quest 遇见智能家居！

![Android 应用的截图](/home-assistant/images/blog/2022-01-android/quest_sensors.png)

大家好！希望你和家人都度过了一个愉快的新年和假期！刚刚过去的节日季里出现了不少超酷的新玩具，而对我们来说，酷玩具就意味着又多了些可以折腾的新东西。今年最热门的礼物之一无疑就是 Oculus Quest，说真的，这怎么可能不让人心动呢？

当然，在开发 Android 应用时，我们中的一些人也很好奇：这个应用在这样的设备上会是什么表现？答案是：它真的运行得不错，而且你今天就可以开始基于自己的使用方式来构建自动化！

<a href="https://sidequestvr.com/app/6427/home-assistant" style="display:inline-block"><img width="200" class="download-badge" alt="Get it on SideQuest" src="https://sidequestvr.com/assets/images/branding/Get-it-on-SIDEQUEST.png" style='box-shadow:none;border:0'></a>

## Home Assistant 中的 Oculus Quest 数据

Home Assistant Companion for Quest 让你可以在 Home Assistant 中访问耳机的 40 多项数据。例如，我们的[交互式传感器]会在屏幕点亮时立刻更新，这意味着你正戴着耳机。这可以帮助你确保环境光足够，适合游玩 VR。

你有没有过一直玩到头显没电，只能把它放在一边等充电的经历？借助电池传感器，你可以在头显充满电、准备好开始下一轮时收到通知。

玩游戏时还想保留背景音乐？你可以根据 Quest 麦克风是否静音，自动调整媒体播放器的音量。

这也不只是自动化而已。你可以在 Quest 上打开 Home Assistant 界面（2D），查看是谁按了门铃。如果你的门铃支持，甚至还可以直接回应！

这只是一个开始。和往常一样，我们的用户总是很擅长发现那些我们自己都没想到的独特用例。所以，赶快拿起你的设备，[使用 SideQuest 完成设置]、[安装应用]，然后开始自动化吧！

![Quest 上的应用截图](/home-assistant/images/blog/2022-01-android/app_on_quest.png)

<!--more-->

## 你好，SideQuest！

等等，SideQuest 是什么？SideQuest 是 Oculus Quest 的一个替代应用商店。

用 VR 术语来说，我们的应用属于“2D 应用”。Oculus Quest 官方商店直到最近才开始允许 2D 应用，而我们仍在开发符合其要求的版本。所以在等待期间，我们想先发布一个版本，以便收集你如何使用它来做自动化的反馈。

SideQuest 上提供的应用是 Home Assistant Companion Android 应用的[精简版本]。虽然 Quest 运行的是 Android，但它并不包含 Google 服务。这意味着没有小组件、没有快捷方式，也不支持标准通知。

## Android 2022.1 发布

我们总不能发这样一篇文章，却完全不提几天前刚发布的手机应用新版本，对吧？！虽然 2022.1 可能没有 2021.12 那么内容满满，但我们还是加入了一些很巧妙的新功能。

* 一个新的传感器，可以判断你的设备[工作配置文件]是否由 [zmarties] 激活。一旦检测到状态变化，这个传感器就会更新，让你可以根据当前启用的配置文件创建独特的自动化。
* [dshokouhi] 添加了一个新的传感器，让你可以知道[最近使用的应用]是什么。把这个新传感器和 Quest 配合起来，你就可以根据当前正在玩的游戏做出特定自动化！

![最近使用应用的截图](/home-assistant/images/blog/2022-01-android/last_used_app.png)

* [jpelgrom] 持续改进我们的 WebSocket 实现，并最终把区域支持带进了应用。设备控制是第一个获得区域支持的功能，因此你现在可以轻松从某个区域中添加实体。区域信息也会显示在设备控制按钮本身上。接下来应用的其他部分也会逐步加入更多区域支持，这应该会让查找实体变得更加容易。
* [JBassett] 也在 WebSocket 实现方面带来了更多改进，引入了更好的错误处理，避免应用崩溃并减少大量无意义的报错。
* 在 Wear OS 应用方面，[SkechyWolf] 增加了对返回按钮的支持，让应用的正常操作和退出都更加顺畅。

非常感谢所有贡献者和用户，带来了这些很棒的功能以及宝贵的反馈和问题报告。我们期待在 2022 年继续改进 Android 应用！和往常一样，欢迎把你的功能请求和错误报告提交到 GitHub。

## 变更日志

* 2022.1.1 - https://github.com/home-assistant/android/releases/tag/2022.1.1

[zmarties]: https://github.com/zmarties

[dshokouhi]: https://github.com/dshokouhi

[JBassett]: https://github.com/JBassett

[SkechyWolf]: https://github.com/SkechyWolf

[jpelgrom]: https://github.com/jpelgrom

[使用 SideQuest 完成设置]: https://sidequestvr.com/setup-howto

[安装应用]: https://sidequestvr.com/app/6427/home-assistant

[工作配置文件]: https://companion.home-assistant.io/docs/core/sensor#work-profile-sensor

[最近使用的应用]: https://companion.home-assistant.io/docs/core/sensor#last-used-app-sensor

[精简版本]: https://companion.home-assistant.io/docs/core/android-flavors

[交互式传感器]: https://companion.home-assistant.io/docs/core/sensor#interactive-sensor

[环境光足够]: https://support.oculus.com/articles/headsets-and-accessories/using-your-headset/turn-off-tracking/
