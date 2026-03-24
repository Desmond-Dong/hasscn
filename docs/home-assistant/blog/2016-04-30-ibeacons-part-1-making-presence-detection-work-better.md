---
title: 'iBeacons: Making 在场 detection work better (part I)'
description: A step by step guide how to vastly improve your 在场 detection by
  integrating iBeacons.
---

_本文由 Home Assistant 贡献者 [Greg Dowling](https://github.com/pavoni) 撰写。_

2013 年，Apple 推出了 iBeacon：这是一类低功耗蓝牙（LE）设备，会向附近的设备（包括大多数智能手机）广播自己的标识符。乍看之下，你可能很难想象它有什么用。在这篇分为两部分的博客里，我会尽量解释它为什么有用，以及你如何在 Home Assistant 中使用它。

我开始使用 iBeacon 的原因，是为了提升 presence detection（我想大多数人也是这个原因），所以这会是 _part 1_ 的重点。在 _part 2_ 里，我会讲如何用 iBeacon 跟踪那些无法自行上报位置的设备。

### 使用 beacon 改善 OwnTracks 位置数据

当你在 OwnTracks 中使用标准的 _major move_ 模式时（这个模式更省手机电量），它有时不会在你希望的时候更新。以我自己为例：我经常在回家路上收到一次位置更新，但到家后反而不更新。结果就是 Home Assistant 以为我还在离家 500 米的地方，需要过很久才意识到我已经回家了。这也让“我回家时自动开灯”的自动化效果很差！甚至有几次，我手机在凌晨 2 点更新位置，直接把灯打开了。好在我太太非常有耐心。

好在 OwnTracks 支持 iBeacon，所以我可以用它来让 presence detection 更可靠。只要 OwnTracks 看到它识别的 beacon，就会发送一次更新。这意味着：如果你把一个 beacon 放在前门，你回家后几秒内 OwnTracks 就能看到它，并发送“已检测到该 iBeacon”的更新。

<!--more-->

### 开始之前

要做到这一点，你首先需要在 Home Assistant 里配置好 [MQTT] 和 [OwnTracks]，并确认 HA 已经可以跟踪你的手机。

[MQTT]: /integrations/MQTT/#picking-a-broker
[OwnTracks]: /integrations/owntracks

接下来你需要做两件事：

- A) 告诉 Home Assistant beacon 在哪里
- B) 告诉 OwnTracks 识别这个 beacon

#### A. 告诉 Home Assistant beacon 在哪里

你可以通过创建一个包含 beacon 经纬度的区域，来告诉 Home Assistant 这个固定位置在哪里。你还需要给该区域命名，这个名字稍后在 OwnTracks 里也会用到。下面这个示例区域表示我家车道的位置。

**`configuration.yaml` 示例条目**

````yaml

zone:
    - name: 'Drive'
      latitude: XXX
      longitude: YYY
      radius: 100
````

`radius` 不会被 beacon 逻辑使用，但会被 GPS 定位逻辑使用。稍后我会再讲这一点。现在你可以先填 50 或 100。

创建好 zone 后，你需要重启 HA。下一步是：

#### B. 告诉 OwnTracks 跟踪你的 beacon

1. 打开手机上的 OwnTracks 应用
2. 点按屏幕底部的 `Regions` 菜单
3. 点按右上角的 `+` 按钮
4. 给 beacon 起个名字，例如 `-drive`（名称以 `-` 开头，原因见下文）
5. 将 Share 设置为 `On`
6. 跳过 `Circular Region` 部分
7. 输入你的 beacon 的 `UUID`。这个值可能印在 beacon 本体上，也可以从 iBeacon 配套管理 app 里复制。它通常很长，能复制就尽量复制。
8. 输入 iBeacon 的 `Minor` 和 `Major` 数值，或者都保留为 0（这样会匹配该 `UUID` 下的所有 beacon）

<p class='img'>
  <img  width='200' border='2' src='/home-assistant/images/blog/2016-04-ibeacons/owntracks_beacon_setup.png'>
</p>

添加 iBeacon 后，你应该能在 OwnTracks 的 region 页面看到它。如果手机能接收到该 beacon 的广播包，OwnTracks 会把对应 Region 标成红色。

<p class='img'>
  <img width='200' src='/home-assistant/images/blog/2016-04-ibeacons/owntracks_red_beacon.png'>
</p>

当 OwnTracks 看到 beacon（并把 region 变红）时，它也会向 HA 发送一条 MQTT 消息，表示你已经进入该区域。

按上面的配置，当你的手机看到 beacon 时，`device.phone` 的位置会被设置为 `Drive`（GPS 位置设置为 XXX,YYY）。

按这些步骤做完后，你就能提高手机跟踪的可靠性，并及时把更新发给 HA。我在自己家这样配置后，步行回家时灯会在我走到门口前亮起；开车回家时，通常到家几秒内就会亮灯，快到我还没走到前门。

我也很高兴地说，现在不会再在凌晨 2 点收到一次“到家”事件把灯误打开了。希望我已经说服你：iBeacon 值得一试！

### 混合使用 beacon 与 GPS 定位

你很可能会用 beacon 来提升“进入现有 GPS 区域”的可靠性。默认情况下，beacon 或 GPS 位置都可以触发你进入某个 zone。HA 也有一套逻辑来让两者协同工作（当你在 iBeacon Zone 内时，会忽略 GPS 更新）。

不过，beacon 还可以用于 GPS 效果不佳的场景。

比如两个区域挨得太近，甚至上下重叠。
举个例子：我太太在隔壁上班。因为 GPS 精度不够，我没法准确判断她是在家还是在办公室。但用两个 beacon 就可以做到。

要实现这种 presence detection，你需要把 Home Assistant 中某个 zone 设为 `passive`，也就是关闭这个 zone 的 GPS 进入判断。这很重要，否则 HA 会在数据不足的情况下尝试在两个很近的 zone 之间做判断，效果通常不好。

被动 zone 只能通过 iBeacon 进入，因此 GPS 更新总会落到另一个 zone。

我的做法是把 Home zone 设为普通区域，把 Office zone 设为 passive。这样 Home zone 仍可像平常一样通过 GPS 或 beacon 进入。

**`configuration.yaml` 示例条目**

````yaml

zone:
    - name: 'Office'
      latitude: XXX
      longitude: YYY
      radius: 3
      passive: true
````

你也可以用这个技巧尝试判断一个人在哪个房间。即便客厅和卧室是上下楼关系，也可能区分出来（当然，beacon 信号会穿过墙壁和楼板）。

要达到理想效果，你大概率需要调试 beacon 的发射功率，让信号覆盖范围更贴合你要跟踪的位置。如果你成功做到了，欢迎告诉我（我家是开放式格局，所以这个方法对我不太适用）。

### 结论

Presence tracking 听起来很简单，但它是家庭自动化里非常关键、也非常容易踩坑的一环。真正做起来你会发现，要把 presence detection 做准并不容易。对我来说，iBeacon 显著提升了位置判断的可靠性和及时性，也希望这篇文章能鼓励你试试看。

### 提示

关于 OwnTracks 和 beacon 的配置，你可以在 [here](http://owntracks.org/booklet/features/beacons/) 了解更多。

关于在 Home Assistant 中使用 beacon 的配置说明，见 [here](/home-assistant/integrations/owntracks)。

#### 连接与断连

在 OwnTracks 里，region 名称如果以 `-` 开头，会被当作一个提示：不要因为丢失单个数据包就断开连接。这有助于保持与 beacon 的持续连接。

不过，即使启用了这个特性，我也发现仍然可能断连（而且不同 beacon 厂商和型号差异明显，我会在 _part 2_ 展开说）。所以在 HA 里最好预先考虑到“误触发进入/离开事件”的可能性。你可以通过提高 beacon 的广播频率、增强发射功率来改善这个问题（但两者都会更快耗电）。这些参数通常可以在 iBeacon 厂商提供的 app 中调整。你也可以选择一些高功率 beacon（对我来说效果不错）。

在自动化里，你可以使用 `for:` 来避免短暂断连时触发，也可以用带延时的脚本。_part 2_ 里我会给出示例。

#### 在同一个 Zone 中使用多个 beacon
iBeacon 包含一个 `UUID`（同一厂商的 beacon 往往相同），以及 `minor` 和 `major` 编号。如果你把两个 beacon 设置成完全相同的参数，OwnTracks 会认为它们位于同一位置。

这意味着你可以在家里布置多个 beacon；只要连上其中任意一个，OwnTracks 和 HA 都会把它判定为 `home`。这样能减少断连影响。

你也可以用同一个 `UUID`，但让 `major` / `minor` 不同；再把 OwnTracks 中该 region 的 `major` / `minor` 设为 0，这样也能达到相同效果。

_也别忘了看 [part II](/home-assistant/blog/2016/05/26/ibeacons-how-to-track-things-that-cant-track-themselves-part-ii/)，我会在那里介绍如何用 iBeacon 跟踪任意物品。_
