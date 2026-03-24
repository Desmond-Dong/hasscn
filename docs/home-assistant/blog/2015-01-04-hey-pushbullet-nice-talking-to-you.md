---
title: 你好 PushBullet，很高兴和你对话
description: 介绍新的通知组件与 PushBullet 平台
---

Home Assistant 过去一直缺少一个与用户沟通的方式。比如家里没人时灯却被打开了，若能及时收到消息不是很好吗？由于 Home Assistant 前端在手机上是以 Web 应用形式运行，我们无法主动把自己切到前台。这正是新通知组件发挥作用的地方，而它由 PushBullet 驱动。

新的通知组件会接收消息并发送给用户。当前由非常棒的 [PushBullet](https://www.pushbullet.com/) 提供支持，但也可以很容易扩展到其他消息平台。

<p class='img'>
  <img src='/home-assistant/images/screenshots/pushbullet_moto360.png' />
  由 simple_alarm 组件触发的消息，通过 PushBullet 显示在 Moto360 上。
</p>

继续阅读，了解如何启用通知组件并与其他组件集成。

<!--more-->

### 启用通知组件

要启用新的通知组件，请在 `home-assistant.conf` 中添加以下内容：

```text
[notify]
platform=pushbullet
api_key=ABCDEFGHJKLMNOPQRSTUVXYZ
```

你可以在 [PushBullet 账户页面](https://www.pushbullet.com/#settings/account) 获取 API key。

### 从你的组件发送消息

要发送消息，通知组件必须先成功加载并初始化。

```python
import homeassistant.loader as loader

def setup(hass, config):
    notify = loader.get_component('notify')
    notify.send_message(hass, "Hello from my component!")
```
