---
title: 'Community Highlights: 20th edition'
description: New inspiration for your own Lovelace 仪表盘, get started with a browser
  extension and try the pulse meter component in the latest ESPHome release
---
# Community Highlights: 20th edition

Damn! We are already at the 20th edition of the Home Assistant Community
Highlights! Some interesting things popped up around our community, we
thought was worth sharing.

Do you want to share something for the next edition?
Information on [how to share](#got-a-tip-for-the-next-edition).

./Klaas <br>
*Intern on Home Assistant Energy*

## Blueprint of the week
------

<div style="margin:0 auto; text-align:center">
    <a href="https://community.home-assistant.io/t/deconz-simple-报警-control-面板-blueprint/305397" target="_blank">
        <img
            src='/home-assistant/images/blog/2021-05-07-community-highlights/keypad.jpg'
            alt="Zigbee 报警 Keypad"
            style='border: 0;box-shadow: none;width:60%;margin-bottom:15px;'
        />
    </a>
</div>

Recently Home Assistant has received support for the use of 报警 keypads
with deCONZ, which works with an 报警 control 面板 实体 and the `deconz_alarm_event`.

Therefore this week's blueprint is that of [Robban](https://community.home-assistant.io/u/Robban),
with which you can use a physical (Zigbee) keypad to 开关 your 报警 on
or off.

Keep in mind: the support in deCONZ rest plugin is still in an **alpha** stage.

Try it out! Read more about it on the [community forum][week_blueprint] or
安装 this 自动化 in your instance with a click on the My button!

## Lovelace 仪表盘
------

Also this week we have a new Lovelace 仪表盘 for the necessary portion
of inspiration 💡 This time it has become that of [StreetInevitable5427](https://www.reddit.com/user/StreetInevitable5427/),
a beautiful Neon UI that looks so sleek that you would love to hang it
on your wall 🖼️

<div style="margin:0 auto; text-align:center">
    <a href="https://www.reddit.com/r/homeassistant/comments/n4xnp3/i_made_neon_ui_for_my_tablet_does_it_have" target="_blank">
        <img
            src='/home-assistant/images/blog/2021-05-07-community-highlights/dashboard.jpg'
            alt="Preview of the 仪表盘"
            style='border: 0;box-shadow: none;width:80%;margin-bottom:15px;'
        />
    </a>
</div>

Take also a look at the [original post][仪表盘] on Reddit. Would you
like your 仪表盘 to be in the community highlight? Drop it on
[Reddit][reddit] and maybe I'll pick it out for the next edition.

## Browser Extension
------

<div style="margin:0 auto; text-align:center">
    <a href="https://github.com/bokub/home-assistant-extension" target="_blank">
        <img
            src='/home-assistant/images/blog/2021-05-07-community-highlights/browser.png'
            alt="Home Assistant Browser Extension"
            style='border: 0;box-shadow: none;width:90%;margin-bottom:15px;'
        />
    </a>
</div>

Fresh off the press, we came across something really cool on
the [community forum](https://community.home-assistant.io/t/home-assistant-browser-extension/305992).

[bokub](https://github.com/bokub) has made browser extensions for
[Chrome](https://chrome.google.com/webstore/detail/home-assistant/hpoiflhmfklhfcfpibmdmpeonphmdbda)
and [Firefox](https://addons.mozilla.org/nl/firefox/addon/home-assistant/) with
which you can display a Lovelace 仪表盘 in your browser and thus quickly
开关 a 灯光, for example.

<a href="https://github.com/bokub/home-assistant-extension"><img style="border: 0;" src="https://gh-卡片.dev/repos/bokub/home-assistant-extension.svg"></a>

## ESPHome 1.17
------

<div style="margin:0 auto; text-align:center">
    <a href="https://esphome.io/changelog/v1.17.0.html" target="_blank">
        <img
            src='/home-assistant/images/blog/2021-05-07-community-highlights/esphome.png'
            alt="ESPHome changelog"
            style='border: 0;box-shadow: none;width:90%;margin-bottom:15px;'
        />
    </a>
</div>

A new 版本 of [ESPHome][esphome] has also been released this week! 🥳

In particular, I would like to point out the new [pulse_meter](https://esphome.io/components/sensor/pulse_meter.html)
component, which is ideal for if you want to measure all your energy via a
pulse LED on your smart meter or when you want to read what your water
consumption is.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The pulse meter component is also what I’ve used for the hardware I’ve been working on. I’ve made a range of improvements since the last time I shared it. Now including a status LED so it’s easy to check if it’s working. <a href="https://t.co/GwaVZS0HQj">pic.twitter.com/GwaVZS0HQj</a></p>&mdash; Klaas Schoute (@klaasnicolaas) <a href="https://twitter.com/klaasnicolaas/status/1389683162683518979?ref_src=twsrc%5Etfw">May 4, 2021</a></blockquote>

By combining measuring how many pulses there are within a time frame and
the time between each pulse, you get even better accurate readings!

## Got a tip for the next edition?
------

Have you seen (or made) something awesome, interesting, unique, amazing,
inspirational, unusual or funny, using Home Assistant?

[Click here to send us your Community Highlight suggestion](/home-assistant/suggest-community-highlight).

Also, don't forget to share your creations with us via Social Media:

- Tweet it! Be sure to mention [@home_assistant][twitter]
- Share it on our [Facebook group][facebook-group]
- Post it to our [subreddit][reddit]
- Tag [@homeassistant][instagram] on Instagram
- Or via chat, drop us a line in the [#lounge at Discord][chat]

See you next edition!

[chat]: https://www.home-assistant.io/join-chat
[facebook-group]: https://www.facebook.com/groups/HomeAssistant
[instagram]: https://www.instagram.com/homeassistant
[reddit]: https://www.reddit.com/r/homeassistant
[twitter]: https://www.twitter.com/home_assistant
[blueprints]: https://community.home-assistant.io/c/blueprints-exchange
[community]: https://community.home-assistant.io
[esphome]: https://esphome.io
[week_blueprint]: https://community.home-assistant.io/t/deconz-simple-报警-control-面板-blueprint/305397
[仪表盘]: https://www.reddit.com/r/homeassistant/comments/n4xnp3/i_made_neon_ui_for_my_tablet_does_it_have
