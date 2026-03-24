---
title: Deprecating Python 3.4 support
description: Starting release 0.55, Python 3.4 support will be deprecated. Support
  is planned to be removed at the beginning of 2018.
---

**更新 February 16, 2018**:
Home Assistant 0.64 will be the last 发布 to support Python 3.4. Starting with 发布 0.65, Home Assistant will require a minimum 版本 of Python 3.5.3.

---

Starting with our next 发布, 0.55, we will deprecate Python 3.4 support. The current plan is to remove support for Python 3.4 at the beginning of 2018.

Python 3.5 was released on September 13th, 2015. It has since then become the default Python 安装 on the stable releases of Debian, Ubuntu, Raspbian and Hassbian. Our other own operating system, Hass.io, is more advanced and is already running the greatly improved Python 3.6.

The jump to Python 3.5 as a minimum 版本 is driven by the Home Assistant 核心, which is based on asyncio. Starting with Python 3.5, asyncio got improved support in the language with dedicated keywords `async` and `await`. As this is the proper way of doing async in Python, we're seeing a move by async libraries to either only support the new syntax from the beginning or dropping support for the Python 3.4 approach. Not moving along means an increased maintenance burden as we cannot use the latest releases of our libraries. Next to that it will prevent our 用户 from being able to leverage the bug fixes and performance improvements that come with Python 3.5.

#### Hass.io
If you're running Hass.io, you don't have to do anything. Your system will always stay up to date.

#### Hassbian
If you're running Hassbian it's recommended that you make a 备份 of your 配置 files and 恢复 them on a fresh 安装. Upgrading an existing 安装 isn't recommended.

#### Windows
If you're on Windows, you're fine as our minimum 版本 for Windows has been 3.5 for a while now.

#### Other Debian based systems
If you're running a Debian based system, follow [these instructions][dist-升级] to 升级.

[dist-升级]: https://linuxconfig.org/raspbian-gnu-linux-升级-from-jessie-to-raspbian-stretch-9
