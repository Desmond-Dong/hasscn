# Security Bulletin

![Attention please read](/home-assistant/images/blog/2021-01-security-bulletin/social.png)

It has come to our attention that certain custom 集成 have security issues and could potentially leak sensitive information. Home Assistant is not responsible for custom 集成 and you use custom 集成 at your own risk.

The latest 版本 of Home Assistant 核心 has extra protection to help secure your instance.

**更新 your Home Assistant instance as soon as possible.**

To 更新 Home Assistant, click on the Supervisor menu item to see if an 更新 to 2021.1.3 (or newer) is available. If you don’t have the Supervisor menu item, follow the [更新 instructions](/home-assistant/docs/installation/updating/). Home Assistant 2021.1.3 is still compatible with Python 3.7 and an 升级 is possible.

**If you cannot 更新 Home Assistant at this time, we strongly advise you to disable all custom 集成.** You can disable your custom 集成 by renaming the `custom_components` folder inside your Home Assistant 配置 folder to something else. Please be sure to 重启 Home Assistant after you’ve renamed it.

If you need additional help with upgrading, we are happy to help you out on our [Discord chat](/home-assistant/join-chat/) server.

We will provide more details about impacted custom 集成 in the future.

Paulus

**Edit: 15 January 2021**: 博客 post updated to 状态 2021.1.3, which added some additional checks.

**Edit: 16 January 2021**: 博客 post updated to remove supervisor 重载 instructions, as latest 版本 is now generally available. Added note that Python 3.7 is still supported.

**Edit: 22 January 2021**: More details are now available in the [disclosure post](/home-assistant/blog/2021/01/22/security-disclosure/).

**Edit: 23 January 2021**: Additional security vulnerabilities disclosed in this [second disclosure post](/home-assistant/blog/2021/01/23/security-disclosure2/).
