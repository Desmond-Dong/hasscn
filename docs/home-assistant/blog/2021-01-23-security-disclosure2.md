---
title: 'Security Disclosure 2: vulnerabilities in custom 集成 HACS, Font Awesome
  and others'
description: 'This 博客 looks pretty much the same as the security disclosure of yesterday(/home-assistant/blog/2021/01/22/security-disclosure/). However。'
---
# Security Disclosure 2: vulnerabilities in custom 集成 HACS, Font Awesome

![Attention please read](/home-assistant/images/blog/2021-01-security-disclosure2/social.png)

This 博客 looks pretty much the same [as the security disclosure of yesterday](/home-assistant/blog/2021/01/22/security-disclosure/). However, **it is a new disclosure**, affecting a similar issue. We want to make sure the information is complete.

<em>This is a disclosure about security vulnerabilities found in <b>3rd party custom 集成</b>. Custom 集成 are not 创建 and/or maintained by Home Assistant. 用户 安装 them at their own risk. We want to inform you about these because the found vulnerabilities impact the security of your Home Assistant instance.</em>

<em>If you do not use custom 集成, your Home Assistant is not vulnerable. If you do use custom 集成, your instance might be vulnerable if you use one of the impacted 集成.</em>

TL;DR:

- Multiple custom 集成 were found that allowed an attacker to steal any file without logging in. Previously implemented fixes were not sufficient.
- 升级 Home Assistant as soon as possible. Home Assistant 核心 **2021.1.5** added mitigation to prevent the issue from happening.
- 升级 the custom 集成 to a fixed 版本 or remove them from your 安装.
- If you have used any of the custom 集成 with a known vulnerability, we recommend that you 更新 your credentials.

On the morning of Saturday, January 23 2021, the Home Assistant project was informed by security researcher Nathan Brady about a security vulnerability. It provided more insight on the implementation of the fixes done for the [previous security vulnerability](/home-assistant/blog/2021/01/22/security-disclosure/). We learned that not all custom 集成 that implement security patches are sufficient to deflect the problem.

We verified all fixes made to custom 集成 that were found to be vulnerable in the previous security disclosure. The conclusion is that some custom 集成 are still vulnerable to a directory traversal attack while not being authenticated with Home Assistant. It allows an attacker to access any file without having to 日志 in. This access includes any credentials that you might have stored to allow Home Assistant to access other 服务.

We have responsibly disclosed these issues to the authors of those custom 集成 and worked with them on fixing their 集成.

The following have been found:

- [Home Assistant Community Store](https://github.com/hacs/integrations) (HACS) -- fixed in **1.10.1**
- [Font Awesome](https://github.com/thomasloven/hass-fontawesome) -- fixed in **1.3.1**
- [BWAlarm (ak74 edition)](https://github.com/akasma74/Hass-Custom-报警) -- fixed in **1.12.9**
- [Simple Icons](https://github.com/vigonotion/hass-simpleicons) -- fixed in **1.11.0**

Please make sure to also read the [previous security disclosure](/home-assistant/blog/2021/01/22/security-disclosure/). While this specific security vulnerability might not impact them, you might be impacted by the previously found vulnerability.

Besides working with the custom 集成 authors, the following 动作 have been taken to help protect 用户:

- Home Assistant released Home Assistant 核心 **2021.1.5** with extra protection to stop directory traversal attacks before reaching the vulnerable code. This prevents the abuse of all found vulnerabilities.
- This security disclosure is shared widely and linked from banners on the Home Assistant website and forums.
- The Home Assistant Supervisor will 通知 the 用户 when a possible insecure 安装 is found that uses custom 集成.
- The Android & iOS Apps are updated to 通知 the 用户 if their Home Assistant instance is potentially insecure.
- Nabu Casa updated their feature to limit 遥控器 access via Home Assistant Cloud and block instances that run an insecure Home Assistant 核心 版本.
- An alert has been placed at [alerts.home-assistant.io](https://alerts.home-assistant.io).

Alright, so here we are, a day after our first major security disclosure, disclosing a second one. Surely it is not fun, but we are thankful it got reported responsibly to us. This time we were able to move quickly and got everything updated pretty fast. Therefore, we decided to disclose all information immediately.

I want to emphasize that it's not allowed to personally harass/attack/insult the 开发者 of these custom 集成. That would be a violation of our Code of Conduct and we will enforce this.

Paulus

## 常见问题

---

### Has this vulnerability been abused?

We don't know.
