---
layout: doc
title: "Home Assistant OS Turbo - Frequently Asked Questions"
description: "Frequently Asked Questions about Home Assistant OS Turbo, covering installation, configuration, and usage details"
keywords: "Home Assistant OS Turbo, FAQ, common questions, installation guide, configuration guide"
og:
  title: "Home Assistant OS Turbo - Frequently Asked Questions"
  description: "Frequently Asked Questions about Home Assistant OS Turbo, covering installation, configuration, and usage details"
  type: "article"
  image: "/icon.png"
  locale: "en_US"
  site_name: "Home Assistant China"
---
# Home Assistant OS Turbo
:::info Name Origin
Chinese Name: `Home Assistant OS 极速版` borrows its name from "HACS 极速版" because that accelerates HACS connectivity and use; this OS does the same for the system.

English Name: `🇨🇳 Home Assistant OS Turbo` highlights both speed and its focus on the Chinese user base.
:::

:::tip Why make the Turbo version?
I saw many users having trouble using the official Home Assistant, whether during system initialization or upgrading, so I wanted to do something within my ability to make things easier for everyone.
:::

:::tip What are the differences from the official version?
Apart from replacing the download images with domestic (China-based) ones, there are indeed some differences (all aimed at acceleration). For details, check [here](/haoscn) or [here](/Changelog).

All official addon repositories that are unstable or inaccessible in China ([Official Addons](https://github.com/home-assistant/addons), [Official Community Addons](https://github.com/hassio-addons/repository), [Music Assistant](https://github.com/music-assistant/home-assistant-addon)) have been removed and replaced with accelerated sources [See link](https://gitee.com/desmond_GT/hassio-addons).

Turbo version HACS (Alone) [HACS China](https://github.com/hacs-china) is also integrated, allowing users to use HACS without a GitHub account and without a VPN.
:::

:::tip There’s already a “Winter Melon” version in China—why repeat the work?
I have a preference for original, clean systems, and many users are like me. The “Winter Melon” version is closed-source, so I have no way of knowing what has been changed inside.
:::

:::tip What’s the difference compared to the Winter Melon version?
The biggest difference is open vs closed source. I honestly don't know what changes or code are present in the closed-source solution, so I can't really compare.
:::

:::tip What hardware is supported now? Will you support more devices in the future?
Currently, only hardware officially supported is built. Once the version stabilizes, I may consider compiling for more devices. However, progress may be slow due to lack of hardware on hand, unless someone with the hardware can contribute to my repository to speed things up.
:::

:::tip Will there be a Turbo Docker version?
No! The Docker version is the same as the Core in my OS, both pull the official image. If you can find an acceleration mirror, you can already install the Docker version. If you are asking, you may not yet have the technical ability required; I recommend just using the OS version.
:::

:::tip Is the system open source?
It is now, and will remain open source. **Always open source.** See the [Github repository](https://github.com/ha-china/HAOS-CN). But I don’t guarantee the build process will be fully public, to prevent misuse (which has already happened).
:::

:::tip Why open source and not closed source?
Because I like sharing.
And to shut up those who accuse my system of having backdoors.
:::

:::tip Could the acceleration scheme fail?
It shouldn’t—with just one acceleration solution in the system, and backup links in hand.
:::

:::tip What if all public acceleration schemes fail?
I will seek sponsorships (not just servers, but also technical support), and resort to self-hosted servers for distribution.
:::

:::tip If an existing source fails, do I need to reinstall to switch sources?
No, you do not.
:::

:::tip Will you stop updating this system?
No. Over 95% of the steps are fully automated. Even if I get extremely busy, the system can still be compiled and distributed automatically.
:::

:::tip Can companies use this free system?

Yes, you can. If you’re willing to [support the project](sponsor) so it continues, I would be very grateful.

:::

:::tip Will the system be commercialized in the future?
No. As I said above, most of the resources for this system are contributed by other people or organizations. On one hand, I don’t think it’s right to profit; on the other, it goes against my efforts to promote Home Assistant's development in China.

Even if I decide to commercialize, it would only be by starting another branch with custom features while keeping the open-source version free and stable, so both can coexist.
:::

:::tip What resources do you need the most right now?
Passionate people, and anyone with the ability and hardware to help adapt the system to more devices, who’s willing to contribute.
:::


