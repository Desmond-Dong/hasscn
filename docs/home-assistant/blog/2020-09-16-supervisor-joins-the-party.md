---
title: 监事入党
description: 为了庆祝 Home Assistant 七周年，我们推出了一些
  主管更新向您展示。
---

主管负责管理您的系统，以便您可以管理您的家庭。它是家庭助理操作系统的核心，可确保您的系统保持安全和最新状态。当出现问题时，主管会帮助您恢复系统。

今年早些时候，我们限制了 Supervisor 支持的系统范围。这使我们有机会投入更多的时间和资源来提高稳定性、可用性改进和新功能。

## 崩溃报告

Supervisor 现在可以与在 Supervisor 上工作的 Home Assistant 开发人员共享匿名诊断和崩溃信息。当然，此选项是选择加入并默认禁用的。启用此功能后，您无需打开问题即可提交问题！

![diagnostics graphic](/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/diagnostics.png)

自从我们推出此功能以来，已发送超过 25,000 个事件，产生约 120 个独特问题。我们已经解决了 80 多个问题！每次发布时，都会根据这些报告进行修复，使 Supervisor 更加稳定；由此可见它的威力有多大。

非常感谢 [Sentry][sentry]，为这个伟大的功能提供支持和赞助。

<blockquote>
“准确的信息是动力的关键部分。” - 玛丽·安·艾利森
</blockquote>

## 通过新的看门狗功能提高插件的可用性

Home Assistant 插件可让您轻松运行第三方应用程序。这些应用程序将受益于与管理 Home Assistant 安装相同的管理功能。

插件开发者将能够使用新的“watchdog”插件选项为其插件激活附加功能。这可以实现应用程序级别的监控，并允许主管检查插件是否使用开发人员指定的方式正确运行。

并非所有插件都具有此功能，并且插件仍然可能陷入无法恢复的问题，导致应用程序无法按预期工作并崩溃。为此，我们为高级用户引入了新的看门狗切换。该功能类似于 Docker 的运行状况检查，但在容器外部运行，使其成为更强大的选项。

![watchdog graphic](/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/watchdog.png)

When the watchdog is enabled for an 插件, the Supervisor will automatically 重启 the 插件 if it stops, regardless of the reason (crash/manual stop). The watchdog does not know if you’re testing an 插件 or playing around with different options, and so it might 重启 when you don’t need it. You should only enable the watchdog after you are finished setting the 插件 up and want to make sure it’s running 24/7.

<blockquote>
“永远不要停止，永远不要停止。” -Conner4Real
</blockquote>

## 网络管理员

最需要的功能就在这里！您现在可以从 Supervisor 界面管理网络设置。以前，您必须摆弄“nmcli”或完成从 USB 记忆棒导入配置文件的繁琐操作，只是为了为您的 Home Assistant 安装设置静态 IP 地址。随着主管网络管理器的引入，现在可以通过 Home Assistant UI 中的主管面板进行处理。您可以在系统选项卡下找到它。

![dialog graphic](/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/dialog.png)

这只是使高级主机管理更易于访问的开始，它只涉及我们能够用它做的事情的一小部分。作为可用性改进的一部分，稍后将提供对 Wi-Fi 和蓝牙的支持。

<blockquote>
“天啊。终于了。” - @cogneato
</blockquote>

## 观察者插件

Supervisor 使用“插件”提供了一些其他服务。插件是微服务，添加功能以帮助运行 Home Assistant + 插件并管理您的系统。最新添加的插件是[观察者插件][观察者]。观察员注视着主管。它在端口 `4357`(HELP) 上提供诊断门户。如果您无法访问主管，您可以转到观察者门户获取主管状态和日志并诊断问题所在（并与我们分享）。将其作为 Web 门户的好处是您不再需要将显示器和键盘连接到您的设备或了解 Linux 命令来获取信息。

这是第一个版本，将来将扩展更多信息和功能。

![observer graphic](/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/observer.png)

<blockquote>
“拥有而不需要，比需要而不拥有更好。” ——弗朗茨·卡夫卡
</blockquote>

## 改进的音频

今年年初，我们基于 [PulseAudio][pulseaudio] 构建了一个带有中央声音服务器的新音频层。有了这个系统，所有插件和家庭助理都可以同时使用音频设备，并且配对的蓝牙扬声器可以完美地工作。

![audio graphic](/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/audio.png)

未来我们将致力于通过 UI 公开更多这些功能，例如控制音量。命令行界面已经支持大部分功能，并且可以通过 SSH 和 Web 终端插件并输入 `ha audio --help` 进行访问。

<p class='img'>
   <img src='/home-assistant/images/blog/2020-09-16-supervisor-joins-the-party/spotify.png' alt='Screenshot of Spotify connected to Home Assistant as audio output.'>
来自社区的 <a href="https://github.com/hassio-addons/addon-spotify-connect">Spotify Connect 插件</a> 插件允许通过 Home Assistant 播放 Spotify
</p>

## 改进的 mDNS

网络上的主机名通常以 `.local` 结尾，例如 `http://homeassistant.local:8123`。这是一个称为 mDNS 的功能。对于 Home Assistant OS 和受监管模式系统来说，这并不总是能发挥应有的作用。这是使用 Docker 层为系统供电所带来的副作用。

去年我们推出了一个基于 [CoreDNS][coredns] 的新 DNS 。今年，我们通过 mDNS 支持扩展了 DNS 插件，并将所有多播流量从 mDNS 转发到 Supervisor 的内部网络。

这意味着我们现在到处都支持 `.local` 域，并且它在整个系统中都是透明的，包括 Home Assistant 和所有插件。

<blockquote>
“这不是 DNS。这不可能是 DNS。这是 DNS。-匿名
</blockquote>

＃＃ 就是这样！

主管有很多更新。最后，我们希望您不会注意到其中任何一个。因为如果主管完成了它的工作，您就可以实现家庭自动化，而无需担心系统的维护。

[coredns]: https://coredns.io/
[observer]: https://github.com/home-assistant/plugin-observer
[sentry]: http://sentry.io/
[pulseaudio]: https://www.freedesktop.org/wiki/Software/PulseAudio/About/
