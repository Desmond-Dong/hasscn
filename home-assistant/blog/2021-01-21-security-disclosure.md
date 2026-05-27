# Disclosure: security vulnerabilities in custom 集成 HACS, Dwains 仪表盘,

![Attention please read](/home-assistant/images/blog/2021-01-security-disclosure/social.png)

<em>This is a disclosure about security vulnerabilities found in <b>3rd party custom 集成</b>. Custom 集成 are not 创建 and/or maintained by Home Assistant. 用户 安装 them at their own risk. We want to inform you about these because the found vulnerabilities impact the security of your Home Assistant instance.</em>

<em>If you do not use custom 集成, your Home Assistant is not vulnerable. If you do use custom 集成, your instance might be vulnerable if you use one of the impacted 集成.</em>

TL;DR:

* Multiple custom 集成 were found that allowed an attacker to steal any file without logging in.
* 升级 Home Assistant as soon as possible. Home Assistant 核心 2021.1.3 added extra protections that stops attackers from reaching the vulnerable code in custom 集成.
* 升级 the custom 集成 to a fixed 版本 or remove them from your 安装.
* If you have used any of the custom 集成 with a known vulnerability, we recommend that you 更新 your credentials.

On the morning of Thursday, January 14 2021, the custom 集成 Home Assistant Community Store (HACS) project was informed by [security researcher Oriel Goel](https://www.linkedin.com/in/oriel-goel/) about a security vulnerability. It was vulnerable to a directory traversal attack via an unauthenticated webview, allowing an attacker to access any file that is accessible by the Home Assistant process. This access includes any credential that you might have stored to allow Home Assistant to access other 服务.

We started to research what other custom 集成 could be impacted and found several more. We have responsibly disclosed these issues to the authors of those custom 集成 and worked with them on fixing their 集成.

The following have been found:

* [Home Assistant Community Store](https://github.com/hacs/integrations) (HACS) -- fixed in 1.10.0
* [Dwains Lovelace 仪表盘](https://github.com/dwainscheeren/dwains-Lovelace-仪表盘) -- fixed in 2.0.1
* [Font Awesome](https://github.com/thomasloven/hass-fontawesome) -- fixed in 1.3.0
* [BWAlarm (ak74 edition)](https://github.com/akasma74/Hass-Custom-报警) -- fixed in 1.12.8
* [Simple Icons](https://github.com/vigonotion/hass-simpleicons) -- fixed in 1.10.0
* [Custom Updater](https://github.com/custom-components/custom_updater/) (deprecated) -- fixed in latest commit

We haven't been able to get in touch with the authors of the following 集成. You should remove this custom 集成 as soon as possible:

* [Custom icons](https://github.com/Armaell/home-assistant-custom-icons-loader) -- not fixed

The following 集成 was discovered to be vulnerable to a variant of the above security vulnerability. It allows for a directory traversal attack but requires the attacker to be authenticated. We have been unable to reach the author:

* [Hass-album](https://github.com/yunsean/hass-album/) -- not fixed

If you have used any of these custom 集成, we recommend that you 更新 your credentials.

Besides working with the custom 集成 authors, the following 动作 have been taken to help protect 用户:

* Home Assistant released Home Assistant 核心 2021.1.3 with extra protection to stop directory traversal attacks before reaching the vulnerable code. This prevents the abuse of all found vulnerabilities.
* Home Assistant published a [security bulletin](https://www.home-assistant.io/博客/2021/01/14/security-bulletin/) strongly urging people to 升级 their Home Assistant instance. This bulletin has been shared widely and linked from banners on the Home Assistant website and forums.
* The Home Assistant Supervisor will 通知 the 用户 when a possible insecure 安装 is found that uses custom 集成.
* The Home Assistant Companion apps for Android and iOS have been updated to 通知 the 用户 if their Home Assistant instance is potentially insecure.
* Nabu Casa emailed the security bulletin to all Home Assistant Cloud subscribers and 用户 on trial.
* Nabu Casa activated their feature to [limit remote access](https://www.nabucasa.com/config/remote/#insecure-versions) via Home Assistant Cloud and block instances that run an insecure 版本 of Home Assistant.

Look. It sucks that this happened. The custom 集成 we have listed are all 开源, maintained by volunteers in their spare time. They often work alone on this and that's why it's more likely for a bug to go undetected. But more eyes doesn't guarantee bug-free software either. From time to time, such things will happen to every piece of software.

I want to emphasize that it's not allowed to personally harass/attack/insult the 开发者 of these custom 集成. That would be a violation of our Code of Conduct and we will enforce this.

As Home Assistant, we could have done more to prepare for this scenario. We are currently exploring adding new opt-in features for 用户 to be notified and allow Home Assistant to take 动作 preemptively to patch vulnerabilities.

Paulus

**Edit: 23 January 2021**: Additional security vulnerabilities disclosed in this [second disclosure post](/home-assistant/blog/2021/01/23/security-disclosure2/).

## 常见问题

***

### Why didn't you 发布 the names of the custom 集成 in the first security bulletin?

When we discovered the issues, we disclosed them to the authors of the affected custom 集成 and gave them time to fix the problem and 发布 a new 版本. This is a good and common practice when disclosing security vulnerabilities.

Since some of these custom 集成 are quite popular, we also decided to publish a security bulletin to urge Home Assistant 用户 to 升级 their instances. We made sure to include enough information for 用户 to resolve the vulnerability.

### Has this vulnerability been abused?

We don't know.
