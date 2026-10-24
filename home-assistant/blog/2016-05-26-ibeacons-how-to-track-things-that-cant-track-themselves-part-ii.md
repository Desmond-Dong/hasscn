# iBeacons: How to track things that can’t track themselves (part II)

*本文由 Home Assistant 贡献者 [Greg Dowling](https://github.com/pavoni) 撰写。*

在 [Part 1](/home-assistant/blog/2016/04/30/ibeacons-part-1-making-presence-detection-work-better) 中，我介绍了如何使用 iBeacons 改善在场追踪。在第 2 部分里，我会讲如何用 iBeacons 追踪像钥匙这种无法自我追踪的物品。

### 使用 iBeacons 追踪物品

在第一部分中我提到，iBeacons 只会发送 *I’m here* 数据包，我们利用这一点在你的手机靠近固定 beacon 时触发一次更新。

但 beacon 不一定非要固定。

你的手机大致知道自己所在位置（基于移动基站、Wi-Fi 网络或 GPS）。如果手机看到了 *I’m here* 消息，它就知道 beacon 在附近。

如果你的手机能够记住（或告知服务器）它上次看到 iBeacon 时的位置，那么它也就知道 beacon 当时在哪里。因此，即使 iBeacon 本身不具备追踪技术，你依然可以追踪它的位置。

所以如果你把 iBeacon 放在钥匙上或车里，就可以追踪它们。

<p class='img'>
  <img  width='200' src='/home-assistant/images/blog/2016-05-ibeacons/keys_with_beacon.jpg'>
  这是我的钥匙，上面粘了一个 Estimote Nearable iBeacon。虽然不太好看，但很有效！
</p>

<!--more-->

相比我在 Part 1 里讲的固定 beacon，让 OwnTracks 和 HA 追踪移动 beacon 更容易，因为你只需要在 OwnTracks 中配置 iBeacon，完全不需要配置 HA。

:::警告
OwnTracks 目前仅在 iOS 上支持移动 beacon。
:::

你可以按照 part 1 中的相同方式设置 beacon。唯一的区别是，region 不再使用位置名称（例如 -drive），而是使用你想追踪的设备名称（例如 -keys）。记得保留前导的 `-`，这样连接会更可靠。

<p class='img'>
  <img  width='200' src='/home-assistant/images/blog/2016-04-ibeacons/owntracks_beacon_setup.png'>
</p>

添加 iBeacon 后，你应该能在 OwnTracks 的 region 页面看到它。如果手机能够接收到该 beacon 的数据包，OwnTracks 会把对应的 Region 标成红色。

由于你为该 region 打开了 *Share*，当 OwnTracks 看到 beacon 时会向 HA 发送一条消息。如果 HA 之前没见过这个 beacon，就会把它添加为一个被追踪的设备。因此你会在 HA 中看到一个名为 `device_tracker.beacon_[name]` 的新设备，它的位置就是你的手机上次看到该 beacon 时认为的所在地。

<p class='img'>
  <img  width='200' src='/home-assistant/images/blog/2016-05-ibeacons/keys_device.png'>
</p>

如果你的手机在仍处于 beacon 范围内时移动并向 HA 发送新位置，HA 就会更新 beacon 的位置。所以当你开车出行时，你会看到手机和 *device\_tracker.beacon\_car* 一起移动。

如果你把车停好去购物，*device\_tracker.beacon\_car* 就会停止移动。

当基础追踪可用后，你可以使用自动化来实现例如“车辆回家时打开大门”这类功能。

```yaml
automation:
    - alias: "Open gate"
      trigger:
        - platform: state
          entity_id: device_tracker.beacon_car
          from: "not_home"
          to: "home"
      condition:
        - condition: state
          entity_id: switch.gate
          state: "off"
      action:
          service: switch.turn_on
          target:
            entity_id: switch.gate
```

或者在你把钥匙落下时提醒你。

```yaml
automation:
  - alias: "Forgotten keys"
    trigger:
      platform: template
      value_template: ''
    condition:
      condition: template
      value_template: ''
    action:
      service: script.turn_on
      target:
        entity_id: script.send_key_alert

  - alias: "Forgotten keys - cancel"
    trigger:
      platform: template
      value_template: ''
    condition:
      - condition: state
        entity_id: script.send_key_alert
        state: "on"
    action:
      service: script.turn_off
      target:
        entity_id: script.send_key_alert
```

```yaml
script:
  send_key_alert:
    sequence:
      - delay:
          minutes: 2
      - service: notify.notify
        data:
            message: "You forgot your keys"
            target: "device/gregs_iphone"
```

(需要延迟有两个原因：

1. HA 更新 beacon 和手机位置的时间点会略有差异，所以你不希望自动化在两次更新之间的空档被触发
2. 我发现 beacon（尤其是低功耗的 Estimote Nearables）有时会断连几秒，因此最好先等一两分钟再判断你是否真的把钥匙落下了)

### 同时使用两种 iBeacon

当然，你也可以同时使用固定和移动 beacon。我希望开车到家时大门自动打开，所以我在车里放了一个 iBeacon 来追踪车辆，在车道上放了另一个 iBeacon 来在我到达时触发位置更新。我还尝试过把高功率 beacon 放进车道上的防水盒里，效果看起来不错，能很好地识别我何时回家。

### 购买 Beacon

这不是一篇购买指南，但我想简单提一下我正在使用的 iBeacon。我认为你基本可以把任何 iBeacon 与 HA 和 OwnTracks 搭配使用。通常你无法在本地电子商店买到 beacon，所以我简要介绍一下我目前用过的两家供应商。

我从一家叫 Blue Sense Networks 的公司买了不少 iBeacon。我在英国科技创业行业工作，选择他们部分是因为他们是本地初创公司，值得支持。他们的产品、支持和软件看起来都不错。我用了他们多个型号的 beacon，从简单的 USB dongle 到长距离 beacon 都有。它们的产品都可以更换电池（外接电源的 USB 设备则不需要电池），而且可以通过他们的软件配置你想要的各种参数。我曾遇到过一次软件问题，技术支持周末就回复了我（！），并且两天后通过软件发布解决了问题。

这些 beacon 总体表现都不错，而且长距离型号的有效范围确实比我其他 beacon 更远。

我还从一家美国/波兰的初创公司 [Estimote](http://estimote.com/) 买过一些 beacon，他们可能更有名。我买的是他们的 10 个 *nearables* 开发包，这些设备除了是 iBeacon 之外，还会通过自有协议发送其他数据（方向和运动）。如果你在开发自己的应用，这很有意思；但对 OwnTracks 和 HA 来说，它们就是普通 beacon。它们体积小且自带粘性，可以贴在物品上（比如钥匙）。这些设备并不能调整全部参数（UUID/Major/Minor 固定），而且电池不能更换。我还“用坏”过一个 Estimote beacon（我猜是电池没电了），因为我带着它跑了几个月，还摔了很多次！不过它们价格不错、体积小而且防水。

我主要把这些用作“要追踪的设备”，而不是“位置 beacon”。Estimote 也有卖稍大一点、可更换电池的 iBeacon。之前我搞不清如何编辑它们 beacon 参数时，Estimote 支持回复很快，也很愿意帮助（虽然最终答案是“目前还不行”）。

更大一些的 Blue Sense Network beacon 在保持连接方面看起来比 Estimote 更好，不过这也可能是因为 Estimote 的电池不可更换，我不太愿意把功率开到最大并缩短发包间隔。

### 结论

正如我在 [part 1](/home-assistant/blog/2016/04/30/ibeacons-part-1-making-presence-detection-work-better) 里提到的，我发现 iBeacons 是提升在场检测效果的好方法。我也用它们来追踪像汽车、钥匙这类无法自我追踪的设备。

我还在继续尝试，希望能用 iBeacons 做更多事情。也希望这篇文章能鼓励你一起尝试；如果你实践了，欢迎分享你的经验。

### 备注

有关文档信息，请查看 [notes at the end of Part 1](/home-assistant/blog/2016/04/30/ibeacons-part-1-making-presence-detection-work-better/#tips)。
