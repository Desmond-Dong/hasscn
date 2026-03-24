---
title: '0.31：为你播报新闻、一些严肃事项、Hacktoberfest，以及破坏性 Z-Wave 变更'
description: 支持 Alexa Flash Briefing API、持久通知中的 Markdown、全新的 updater 组件、Hacktoberfest，以及破坏性的 Z-Wave 变更。
---

朋友，你好，又见面了。

最近怎么样？今天过得好吗？我们过得相当不错。如果你今天状态一般，希望这篇内容能让你开心一点……

每隔一个周末，我们这里都会进入一阵忙碌，然后在向世界发布 Home Assistant 新版本时长舒一口气。这次也一样。我们的开发者社区再次带来了一个漂亮的新发布，包含大量新功能与改进。希望你会喜欢。

开始之前还有最后一件事要提醒你……[@balloob] 这周稍微偷了个懒，于是又让我（[@robbiet480]）来写这篇博客并发布版本。看来我在 [0.27][zero-two-seven-发布] 里表现还不算差。至于这次会有什么惊喜，你永远猜不到。好了，铺垫结束，开始正题……

## 统计更新
遗憾的是，这次没有特别炸裂的数据可以分享，不过我们最近确实突破了 7,000 次提交！本次发布共有 45 位贡献者参与。希望借助新的 updater 组件，我们能在 0.32 的博客文章里给你带来更有意思的统计数据。

## Hacktoberfest

![Hacktoberfest logo][logo]

十月就意味着 Hacktoberfest，我们的社区这次也交出了非常出色的改进和新增内容。在写这篇文章时，[home-assistant 仓库][hacktoberfest-ha-prs]已合并 194 个、仍有 41 个打开的拉取请求；[home-assistant.github.io 仓库][hacktoberfest-site-prs]已合并 209 个、仍有 28 个打开的拉取请求。如果你也想一起参与，欢迎看看我们的 [Hacktoberfest][hacktoberfest-博客] 博客文章或 [Hacktoberfest 官方网站][hacktoberfest-website]。只要你在十月里有 4 个拉取请求被合并，就能免费拿到一件超棒的 T 恤！我们甚至还有一些非开发者只需一点点努力就能完成的任务。不过要抓紧了，只剩 9 天，而且大多数简单任务已经被领走了！

## ⚠️ 大幅改进的 updater 组件（请务必阅读！）⚠️

这个发布对我们的 [updater] 组件进行了更新。updater 组件的职责是检查是否有新版本可用，并在有更新时通知用户。

过去，这个组件会通过 [PyPi]（Python 包管理平台）检查是否有新更新。这会带来几个问题：

  1. 我们无法进行渐进式发布
  2. 我们无法向用户展示额外信息（比如更新日志链接或发布日期）
  3. 我们无法就关键安全更新向用户发出警告

为了解决这些问题，我们决定自行托管版本检查服务。既然本来就要搭建基础设施，我们就顺势更进一步。这就引出了这次更新里最重要的部分：

### 你需要了解的内容（重点）

还记得我在标题里说过这次发布有点“严肃内容”吗？我们在 updater 组件中加入了基础分析数据，这些数据会发送到服务器并存储下来，帮助我们更好地了解用户群体。

每个运行 updater 组件的 Home Assistant 实例都会生成一个[唯一 ID][UUID]（基于 UUIDv4），用于区分不同实例。这个 UUID 会保存在你配置目录中的 `.uuid` 文件里。

#### 选择退出

你有两种方式选择退出。第一种是使用 updater 的新选项 `opt_out`。这样 updater 仍会继续检查更新，但不会向我们共享你的系统信息。

```yaml
updater:
  reporting: false
```

你也可以从 `configuration.yaml` 中移除 `updater:` 来彻底禁用 updater 组件，不过**我们不建议你这样做**，因为你会错过关键更新。

最后，你也可以删除 `.uuid` 文件并重启 Home Assistant，以重置唯一标识符。

#### Home Assistant 更新服务器上存储的数据

下面是我生产环境 Home Assistant 实例在服务器端看到的数据：

| Name                  | Description                                | Example                            |
|-----------------------|--------------------------------------------|------------------------------------|
| `arch`                | CPU 架构                                    | `x86_64`                           |
| `distribution`        | Linux 发行版名称（仅 Linux）                 | `Ubuntu`                           |
| `docker`              | 是否在 Docker 内运行                         | `false`                            |
| `os_name`             | 操作系统名称                                 | `Darwin`                           |
| `os_version`          | 操作系统版本                                 | `10.12`                            |
| `python_version`      | Python 版本                                | `3.5.2`                            |
| `timezone`            | 时区                                        | `America/Los_Angeles`              |
| `user_agent`          | 提交分析数据时使用的 user agent              | `python-requests/2.11.1`           |
| `uuid`                | 唯一标识符                                  | `10321ee6094d4a2ebb5ed55c675d5f5e` |
| `version`             | Home Assistant 版本                        | `0.31.0`                           |
| `virtualenv`          | 是否在 virtualenv 内运行                    | `true`                             |

除了上述采集的数据外，服务器还会基于你的 IP 地址进行地理查询，以确定你所在的城市。这里要非常、非常明确地说明：__Home Assistant updater 不会：在数据库中存储你的 IP 地址，也不会上传你 `configuration.yaml` 中的位置配置信息。__

<p class='img'>
  <img src='/home-assistant/images/blog/2016-10-flash-briefing-updater-hacktoberfest/map.png' />
  我的 IP 经过地理查询后定位到 Oakland，经纬度指向该城市的地理中心。
</p>

服务器还会为数据增加两个时间戳：首次看到该实例 UUID 的时间，以及最近一次看到该实例的时间。因此会得到以下额外数据：

| Name                  | Description                                | Example                            |
|-----------------------|--------------------------------------------|------------------------------------|
| `first_seen_datetime` | 首次提交实例 ID 的时间                       | `2016-10-22T19:56:03.542Z`         |
| `geo_city`            | GeoIP 判定的城市                            | `Oakland`                          |
| `geo_country_code`    | GeoIP 判定的国家代码                        | `US`                               |
| `geo_country_name`    | GeoIP 判定的国家名称                        | `United States`                    |
| `geo_latitude`        | GeoIP 判定的纬度（城市级）                   | `37.8047`                          |
| `geo_longitude`       | GeoIP 判定的经度（城市级）                   | `-122.2124`                        |
| `geo_metro_code`      | GeoIP 判定的都会区代码                       | `807`                              |
| `geo_region_code`     | GeoIP 判定的地区代码                         | `CA`                               |
| `geo_region_name`     | GeoIP 判定的地区名称                         | `California`                       |
| `geo_time_zone`       | GeoIP 判定的时区                             | `America/Los_Angeles`              |
| `geo_zip_code`        | GeoIP 判定的邮编                             | `94602`                            |
| `last_seen_datetime`  | 最近一次提交实例 ID 的时间                    | `2016-10-22T19:56:03.542Z`         |

这些数据会在最高等级的安全措施下保存。更新系统运行在由我（[@robbiet480]）持有的安全 Amazon Web 服务账户中。我本人有 5 年复杂 AWS 部署经验和深厚的安全背景。我已审计整个系统，并确保采取了一切必要措施来保护数据，包括严格限制访问权限（只有 [@balloob] 和我本人）。虽然这些数据并不直接指向个人身份，但我们完全理解有些用户会对此顾虑。请理解，我们收集这些信息仅用于更好地了解用户群体，以便提供比现在更好的长期支持和功能开发。

我们目前没有任何公开披露这些信息的计划。如果未来有这类计划，我们当然会提前通知你。还需要明确的是，我们绝不会出售这些信息，也不会允许其被用于 Home Assistant 之外的用途。

感谢你理解我们收集这些数据的原因。我们希望你保持该功能开启，但如果你对此感到不适，我们也完全理解。

_本段已于 10 月 24 日更新，以更清楚地说明地理查询仅在城市级别进行。[查看原始版本。][博客-orig]_

现在，回到有趣的内容……

## 晚上好。我是 Ron Burgundy，下面为你带来今晚世界正在发生的事。

最近 Home Assistant 突然有了个疯狂想法：它觉得自己做得还不够多，还想继续挑战极限。我也不太明白它怎么冒出这个奇怪念头，但它现在显然认为，自己最新的“业余爱好”应该是兼职当个新闻主播。

0.31 新增了对全新 [Alexa Flash Briefing API](https://developer.amazon.com/alexa-skills-kit/flash-briefing) 的支持，让你在请求 Alexa 播报简报时，随时获得来自 Home Assistant 的更新。你可能会问这有什么用？比如现在我每天早上起床听简报时，Home Assistant 会在末尾补上这段内容：

> Drive time with traffic is 35 minutes. There is an UberPOOL that will cost $11.52, estimated to be 2 minutes away, for a total of 37 minutes. BART is currently estimated to take 29 minutes. You should take BART, as it is estimated to be faster by 8 minutes.

这样我每天早上就知道怎么最快去 [我的本职工作][runway] 了（不，Home Assistant _并不是_ 我的本职工作，虽然有时候看起来很像）。这显然不是最典型的家庭自动化示例，但你应该已经明白思路了。你完全可以用它来播报昨晚家里发生的重要事件，或者朗读你所在区域的本地天气。得益于音频支持，你甚至可以把 Alexa Flash Briefing 默认来源全部换成你自己的新闻源。Home Assistant 同时支持文本和音频内容，也支持在 Alexa App 中展示数据。还要特别说明一点：与现有 Skill 集成不同，Flash Briefing API _不要求_ HTTPS（_但如果可以，你仍然应该使用 HTTPS_）。更多信息请查看新的[文档][flash-briefing-docs]。

<p class='img'>
  <img src='/home-assistant/images/blog/2016-10-flash-briefing-updater-hacktoberfest/stay-classy.jpg'>
  继续保持优雅，圣地亚哥。（这个梗好笑在于 balloob 就住在圣地亚哥）
</p>

## Z-Wave 即将迎来重大不兼容变更

最近 [@lukas-hetzenecker] 发现了一个相当棘手的 Z-Wave [问题][Z-Wave-issue]。如果你有多个同型号 Z-Wave 设备，它们有不小概率会尝试使用同一个实体 ID。为了解决这个问题，我们现在会把内部 Z-Wave 索引追加到所有 Z-Wave 实体 ID 的末尾。

这对所有 Z-Wave 用户意味着：你需要更新配置来适配这项变化。我自己有不少（17 个）Z-Wave 设备，这周刚完整走过一遍。下面是我做的事情：

- 更新自定义配置（customizations）
- 更新分组（groups）
- 更新我的 `zwave.customize` 配置段
- 更新使用旧实体 ID 的 Alexa skills
- 因为我在 Alexa 中使用了 `emulated_hue`，且 `emulated_hue` 以实体 ID 作为唯一标识，所以我还需要先从 Alexa 删除所有 Z-Wave 设备，再重新添加

你的待办清单可能和我不完全一样，我只是把自己做过的步骤列出来，帮你梳理需要考虑的点。整个过程并不算难，尤其是在 Sublime Text 里用全局查找替换时更快，不过我也大概花了 20 分钟才完成。

我知道这真的很烦人，尤其是我们曾在 [0.12][zero-one-two-发布] 里说过 Z-Wave ID 理论上不该再变化了，但这次我们不得不收回那句话。我依然会说，未来 Z-Wave ID 应该不会再改动，不过显然我们也看到了这种承诺的风险。总结一下这部分：抱歉，但这次真的不得不改。

## All changes

- [Updater] component ([@infamy], [@robbiet480], [@kellerza])
- Continue to 设置 other platforms when 1 platform config is invalid ([@kellerza])
- Create [persistent 通知][pers-通知] when a platform contains invalid config ([@kellerza])
- Logbook: Allow [filtering] domains and 实体 to be shown ([@wokar])
- HTTP: Change `approved_ips` from string to CIDR validation ([@mweinelt])
- Persistent 通知: Allow using [markdown][pers-通知] ([@justweb1])
- Netatmo: Add [discovery][netatmo-discovery] support ([@jabesq])
- Netatmo Welcome 摄像头: Add [二元sensor][netatmo-bin] ([@jabesq])
- Support added for [HaveIBeenPwned] ([@joyrider3774])
- 设备 tracker: `known_devices.yaml` reading and writing tweaks and fixes ([@kellerza])
- Fix 温控 platforms showing the wrong temperature unit ([@rcloran])
- Lots of voluptuous love ([@fabaff])
- Ensure proper attribution for 天气 platforms ([@fabaff])
- Fix Telegram in Docker ([@jeanregisser])
- Support recursive config inclusions in YAML ([@lwis])
- 摄像头: [Synology] SS 摄像头 now supported ([@jgriff2])
- History: Allow filtering domains and 实体 to be shown ([@wokar])
- Media Player - Squeezebox: Now able to show artist and album ([@ih8gates])
- Alexa: Flash Briefing skill support added ([@robbiet480])
- 设备 Tracker: Add support for Bbox Modem Router ([@HydrelioxGithub])
- 传感器: Add support for Bbox Modem Router ([@HydrelioxGithub])
- Input select: 服务 added to pick next and prev option ([@persandstrom])
- 传感器: [ARWN] now supported ([@sdague])
- Pushbullet: Push an URL note if an url is provided inside data ([@jabesq])
- Z-Wave: Allow certain 设备 to be not added to Home Assistant ([@lukas-hetzenecker])
- New support for [Zoneminder] added ([@Khabi])
- 天气: Allow tracking severe 天气 alerts with [WUnderground] ([@tchellomello])
- 传感器: New support added to track [min/max/mean][min] ([@fabaff])
- Convert EntityComponent to be async ([@pvizeli], [@balloob])
- Z-Wave: Add association 服务 ([@turbokongen])
- 前端 - 服务 dev tool: persist 状态 and tweak UI ([@justweb1])
- 传感器: Support added for [scraping][scrape] websites ([@fabaff])
- Clean up of tests ([@capellini])
- New `fail` filter added to 模板 to raise on UndefinedError ([@jaharkes])
- Support added for [Emoncms history][emoncms] ([@joyrider3774])
- Support for [Apple Push 通知 服务][APNS] ([@sam-io])
- Thermostat: Netatmo now supported ([@gieljnssns])
- 报警 control 面板: [Concord232] now supported ([@JasonCarter80])
- 通知: [Matrix] support added ([@mweinelt])
- 设备 tracker - nmap: Allow specifying multiple inputs for [nmap] ([@hcooper])
- 设备 Tracker - snmp: SNMPv3 now supported ([@T3m3z])
- 通知: Telstra SMS now supported ([@nvella])
- 摄像头: [Verisure] now supported ([@turbokongen])
- Support added for [Neato] Connected Robot ([@jabesq])
- Media player: More options for [Yamaha] AVR ([@ehagan])
- 传感器: Support for [Pilight] 传感器 ([@DavidLP])
- iOS support ([@robbiet480])
- Minor features and bug fixes by [@mtl010957], [@molobrakos], [@flyte], [@fabaff], [@phardy], [@sander76], [@T3m3z], [@c-w], [@balloob], [@robbiet480], [@StaticCube], [@vittoriom], [@hartmms], [@kirichkov], [@mezz64], [@ishults], [@Danielhiversen] and [@tchellomello].

### 发布 0.31.1 - October 24

 - Identify special character encoding 错误 in YAML files ([@kellerza], [@lwis])
 - iOS app component bug fixes ([@robbiet480])
 - Fix a spelling problem on 用户-facing 错误 ([@robbiet480])
 - YAML includes will ignore dirs/files prefixed with . ([@lwis])

## Backward-incompatible changes

 - The [HTTP] component now takes a different format for authenticating IPs
 - 配置 format has changed for [Proximity]
 - The [Arduino] platform are now covered by the 配置 check. Please check the 文档 to see how.
 - The Z-Wave 实体 ID change mentioned above

## 如果你需要帮助

如果你需要帮助，欢迎使用我们的 [论坛](https://community.home-assistant.io/)，或者加入我们的 [聊天室](https://discord.gg/c5DvZ4e)。发布说明也开放了评论，但我们更希望你使用前面的那些交流渠道。谢谢。

## 下次见

感谢你读完上面的全部内容，尤其是这周的文章确实有点长。我们应该会在 11 月 5 日左右带着介绍 0.32 的新文章回来。

-- Robbie

[@balloob]: https://github.com/balloob
[@capellini]: https://github.com/capellini
[@c-w]: https://github.com/c-w
[@Danielhiversen]: https://github.com/Danielhiversen
[@DavidLP]: https://github.com/DavidLP
[@ehagan]: https://github.com/ehagan
[@fabaff]: https://github.com/fabaff
[@flyte]: https://github.com/flyte
[@gieljnssns]: https://github.com/gieljnssns
[@hartmms]: https://github.com/hartmms
[@hcooper]: https://github.com/hcooper
[@HydrelioxGithub]: https://github.com/HydrelioxGithub
[@ih8gates]: https://github.com/ih8gates
[@infamy]: https://github.com/infamy
[@ishults]: https://github.com/ishults
[@jabesq]: https://github.com/jabesq
[@jaharkes]: https://github.com/jaharkes
[@JasonCarter80]: https://github.com/JasonCarter80
[@jeanregisser]: https://github.com/jeanregisser
[@jgriff2]: https://github.com/jgriff2
[@joyrider3774]: https://github.com/joyrider3774
[@justweb1]: https://github.com/justweb1
[@kellerza]: https://github.com/kellerza
[@Khabi]: https://github.com/Khabi
[@kirichkov]: https://github.com/kirichkov
[@lukas-hetzenecker]: https://github.com/lukas-hetzenecker
[@lwis]: https://github.com/lwis
[@mezz64]: https://github.com/mezz64
[@molobrakos]: https://github.com/molobrakos
[@mtl010957]: https://github.com/mtl010957
[@mweinelt]: https://github.com/mweinelt
[@Nixon506E]: https://github.com/Nixon506E
[@nvella]: https://github.com/nvella
[@persandstrom]: https://github.com/persandstrom
[@phardy]: https://github.com/phardy
[@pvizeli]: https://github.com/pvizeli
[@rcloran]: https://github.com/rcloran
[@robbiet480]: https://github.com/robbiet480
[@sam-io]: https://github.com/sam-io
[@sander76]: https://github.com/sander76
[@sdague]: https://github.com/sdague
[@StaticCube]: https://github.com/StaticCube
[@T3m3z]: https://github.com/T3m3z
[@tchellomello]: https://github.com/tchellomello
[@turbokongen]: https://github.com/turbokongen
[@vittoriom]: https://github.com/vittoriom
[@wokar]: https://github.com/wokar

[Arduino]: /integrations/arduino/
[APNS]: /integrations/apns
[ARWN]: /integrations/arwn
[Concord232]: /integrations/concord232#报警-control-面板
[HTTP]: /integrations/http/
[HaveIBeenPwned]: /integrations/haveibeenpwned
[Matrix]: /integrations/matrix/#通知
[Neato]: /integrations/neato#开关
[Pilight]: /integrations/pilight#传感器
[Proximity]: /integrations/proximity/
[PyPi]: https://pypi.python.org/pypi
[Synology]: /integrations/synology
[UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier
[Verisure]: /integrations/verisure
[WUnderground]: /integrations/wunderground
[Yamaha]: /integrations/yamaha
[Zoneminder]: /integrations/zoneminder/
[emoncms]: /integrations/emoncms_history/
[filtering]: /integrations/logbook/
[flash-briefing-docs]: /integrations/alexa/
[hacktoberfest-博客]: /博客/2016/10/02/hacktoberfest/
[hacktoberfest-ha-prs]: https://github.com/home-assistant/home-assistant/labels/Hacktoberfest
[hacktoberfest-site-prs]: https://github.com/home-assistant/home-assistant.io/labels/Hacktoberfest
[hacktoberfest-website]: https://hacktoberfest.digitalocean.com/
[logo]: /images/blog/2016-10-hacktoberfest/hacktoberfest.png
[min]: /integrations/min_max
[netatmo-bin]: /integrations/netatmo#binary-传感器
[netatmo-discovery]: /integrations/netatmo/
[nmap]: /integrations/nmap_tracker
[pers-通知]: /integrations/persistent_notification/
[runway]: http://runway.is
[scrape]: /integrations/scrape
[updater]: /integrations/updater/
[Z-Wave-issue]: https://github.com/home-assistant/home-assistant/pull/3759
[zero-one-two-发布]: /博客/2016/01/30/insteon-lifx-twitter-and-Zigbee/#backwards-incompatible-changes
[zero-two-seven-发布]: /博客/2016/08/28/通知-hue-fake-unification/
[twitter]: https://twitter.com/home_assistant
[robbie-twitter]: https://twitter.com/robbie
[博客-orig]: https://github.com/home-assistant/home-assistant.io/blob/c937242d154e509d2d84d10c51f654e20556fa21/source/_posts/2016-10-22-flash-briefing-updater-hacktoberfest.markdown
