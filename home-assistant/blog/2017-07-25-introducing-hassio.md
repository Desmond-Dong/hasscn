# Introducing Hass.io

**TL;DR:** Today we're introducing [Hass.io]. Hass.io is an operating system that will take care of installing and updating Home Assistant, is managed from the Home Assistant UI, allows creating/restoring snapshots of your 配置 and can easily be extended using [Hass.io 插件][插件] including [Google Assistant] and [Let's Encrypt].

***

Home Assistant is 2 months away from being 4 years old. In that time the Internet of Things has really taken off and we've seen many new 设备 and 服务. We saw the introduction of voice assistants like Google Home and new standards like Apple HomeKit.

Some things have been supported natively in Home Assistant, others have been integrated into Home Assistant via third party applications. All these moving parts caused our 用户 to spend a lot of time maintaining their systems and applications instead of automating their homes.

So we decided to take a step back from day-to-day Home Assistant development and see if we could offer a solution that makes updating a breeze for our 用户. A solution that you can flash to your 树莓派 and no longer worry about. A solution that would still be local first and respect the 用户's privacy.

And this is how [Pascal Vizeli] came up with Hass.io, an operating system based on [ResinOS] and [Docker]. Hass.io will take care of installing and updating Home Assistant, is managed from the Home Assistant UI, allows taking/restoring snapshots of your 配置 and can easily be extended using [Hass.io 插件][插件].

<p class='img'>
<img src='/home-assistant/images/hassio/screenshots/file_explorer.png'>
Hass.io 仪表盘
</p>

To 安装 插件, a 用户 can browse the built-in 插件 store and 安装, 配置 and 更新 any available application. Want to turn your 设备 into a Google Assistant or make your 配置 accessible via Samba/Windows networking? Both are a couple of clicks away! ([Video demo - 38s, no audio][安装-demo])

At launch we have included a couple of [built-in 插件][插件] like [Google Assistant], [Let's Encrypt] and [Duck DNS]. Besides our internal 插件, it is also possible to create and share your own 插件 repositories. During our beta period we've already seen some great 插件 being shared: [Homebridge][olivierg], [InfluxDB][bestlibre], [HASS Configurator][danielperna] and [AppDaemon][vkorn].

As we strongly believe in the openness of technology, we are releasing Hass.io as [开源] under the Apache 2.0 license. That way any 用户 can make sure that the code that runs in their homes is secure and safe.

* [Learn more about Hass.io][Hass.io]
* [安装 Hass.io][安装]
* [Available 插件][插件]

*Some frequently asked questions are answered below in the read more section.*

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XWPluWcYRMI" frameborder="0" allowfullscreen></iframe>
</div>

Hass.io has been built by [Pascal Vizeli], the UI has been made by [Paulus Schoutsen] and [BRUHAutomation] made the introduction video. Big thanks to [Resin.io] for building ResinOS and helping us get started with it. Also a big thanks to the community for early feedback, helping out with the 文档 and 插件 development ❤️

<!--more-->

#### Will Hass.io be the only way to run Home Assistant?

Hass.io is and will always be optional. You can still run Home Assistant wherever you can run Python.

#### Which 设备 are supported at launch?

Initially we support the 树莓派 1, 2, 3 and Intel NUC. Advanced 用户 can also [安装 Hass.io on a Linux server][advanced-安装].

#### Can I 安装 packages or 脚本 on the machine?

No, this is not possible as we're using stateless Docker 容器. To 安装 a package you'll have to write a local 插件 that interacts with Home Assistant. See \[our 教程]\[run-local].

#### Can I 恢复 a snapshot on a different 设备?

Yes, any Hass.io snapshot can be restored on any 设备.

#### The Hass.io 配置 面板 contains powerful tools. Why is there no extra security besides the Home Assistant login?

This is in the works. We have already implemented [the 后端](https://github.com/home-assistant/hassio/pull/41) and plan to 发布 the UI soon.

#### Is there a roadmap?

We use [Pivotal Tracker] to track things that are in progress and what we might work on.

[Hass.io]: /hassio

[安装]: /hassio/安装

[Homebridge]: https://github.com/nfarina/homebridge

[hb-hass]: https://github.com/home-assistant/homebridge-homeassistant

[Pascal Vizeli]: https://github.com/pvizeli/

[Paulus Schoutsen]: https://github.com/balloob/

[ResinOS]: https://resinos.io/

[Docker]: https://www.Docker.com/

[插件]: /apps/

[bestlibre]: https://community.home-assistant.io/t/repository-bestlibre-addons-repository/18037

[danielperna]: https://community.home-assistant.io/t/repository-hass-configurator/17838

[olivierg]: https://community.home-assistant.io/t/repository-homebridge-add-on/18569

[vkorn]: https://community.home-assistant.io/t/repository-few-addons/20659

[安装-demo]: https://youtu.be/NfyavpAg4as

[BRUHAutomation]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w

[开源]: https://github.com/home-assistant/hassio

[Google Assistant]: /插件/google_assistant/

[Let's Encrypt]: /插件/lets_encrypt/

[Duck DNS]: /插件/duckdns/

[advanced-安装]: /hassio/installation/#alternative-安装-on-generic-linux-server

[Pivotal Tracker]: https://www.pivotaltracker.com/n/projects/2020851

[Resin.io]: https://resin.io
