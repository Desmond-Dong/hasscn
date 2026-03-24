---
title: Activating Tasker tasks from Home Assistant using command line 开关
description: Step-by-step guide how to start using Tasker on your Android phone with
  Home Assistant
---

<img src='/home-assistant/images/blog/2015-12-tasker/tasker-logo.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 12px;' width='200' />
在这篇教程中，我会说明如何通过 Home Assistant 的命令行开关触发 Tasker 任务。我们会设置一个开关，当你切换它时，你的 Android 设备会说出 "On" 或 "Off"。

你也可以改用自动化组件来实现，比如当你把家切换到睡眠模式时，让 Android 设备自动打开 Google Play Books 或 Kindle 应用并调暗灯光，不过这篇教程重点讲的是开关方式。

<!--more-->

### AutoRemote URL

首先，你需要在 Android 设备上安装 [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) 和 [AutoRemote](https://play.google.com/store/apps/details?id=com.joaomgcd.autoremote)，然后启动 AutoRemote。你会在二维码上方看到一个 URL，用浏览器打开后会看到一个类似下面的页面。

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-tasker/screenshot-1.png'>
</p>

现在在 `Message` 输入框中填入 `SayOn`，右侧会出现一个包含 URL 的框，这就是我们稍后在 Python 脚本中要用到的内容，先保存下来。再重复一次这一步，但把 `SayOn` 改成 `SayOff`。接着选择 `Send message now!` 按钮来测试命令是否能发送到 Android 设备；如果成功，你会在屏幕底部看到类似下面的 toast 消息。

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-tasker/screenshot-2.png' height='450' />
</p>

### Tasker 设置

打开 Tasker，确认你在 `PROFILES` 标签页，然后选择加号图标创建一个新的 profile。依次选择 `Event` -> `Plugin` -> `AutoRemote` -> `AutoRemote`，再选择铅笔图标来配置 AutoRemote 事件。选择 `Message Filter` 并输入 `SayOn`，然后返回，直到系统提示你选择任务。选择 `New task`，下一个字段保持为空，再选择勾选图标。
接下来配置任务：选择加号图标添加动作。选择 `Alert` -> `Say` 添加 Say 动作。在文本框中输入 `On`，然后返回测试任务。确认媒体音量已开启后选择播放图标，你应该会听到设备说出 "On"。

<p class='img'>
<img src='/home-assistant/images/blog/2015-12-tasker/screenshot-3.png' height='450' />
</p>

现在你可以回到 Tasker 主界面再创建一个 profile，这次把 `SayOn` 改成 `SayOff`，并把 `On` 改成 `Off`。完成后回到主界面，选择顶部菜单按钮，然后依次选择 `Exit` 和 `Save first`，确保所有内容都正确保存。

### Python 脚本

现在来设置脚本：新建一个 Python 脚本，命名为 `On.py`，然后输入以下代码：

```python
import requests
requests.get('[URL]')
```

填入你的 "On" URL 并保存。再创建另一个脚本，这次命名为 `Off.py`，并填入你的 "Off" URL。

### Home Assistant 配置

在 Home Assistant 配置中添加一个命令行开关：

```yaml
switch:
  platform: command_switch
  switches:
    tasker_say:
      oncmd: python "[LocationOfOnScript]"
      offcmd: python "[LocationOfOffScript]"
```

现在启动 Home Assistant，当你切换刚创建的开关时，Android 设备就会回应 "On" 或 "Off"。:-)
