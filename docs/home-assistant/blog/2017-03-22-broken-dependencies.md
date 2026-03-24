---
title: 0.40.2 and broken dependencies
description: Due to a bug in our dependency 安装, some older versions can
  get into a broken state.
---

TL; DR: We have just released 版本 0.40.2 that includes a fix related to the 安装 of dependencies.

Some 用户 in the last few days have been reporting that their Home Assistant 安装 fails to start with an 错误 in the http component:

```text
ImportError: No module named 'aiohttp.file_sender'
```

The problem is that Home Assistant did not handle the case where a dependency would want to 安装 a 核心 dependency of Home Assistant that is newer than what Home Assistant works with. For now, we have identified the following two components that can cause this issue:

  - AppleTV (0.38+)
  - Android IP Webcam (0.40+)

This issue has been resolved by 0.40.2. If you are on an impacted 版本 and cannot 升级 to the latest 版本 just yet, a temporary workaround will be to remove the `<config dir>/deps` directory and stop using the above mentioned 集成. In the case of AppleTV, you will also have to disable the discovery component to prevent it from being auto-detected.
