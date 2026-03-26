---
title: "架构概述"
---

Home Assistant 提供了一个用于家庭控制和家庭自动化的平台。 Home Assistant 不仅仅是一个应用程序：它是一个嵌入式系统，提供像其他消费者现成产品一样的体验：登录、配置和更新都通过易于使用的界面完成。

- [操作系统](/developers/operating-system)提供通信的Linux环境来运行Supervisor和Core。
- [Supervisor](/developers/supervisor)管理操作系统。
- [Core](/developers/architecture/core)与用户、Supervisor以及物联网设备和服务进行交互。

<img
src='/developers/img/en/architecture/full.svg'
alt='家庭助理全图'
/>

## 堆栈的运行部分

用户对自动化平台的需求有不同的要求。这就是为什么只能运行部分 Home Assistant 堆栈的原因。想要了解更多信息，请参阅[安装说明](https://www.home-assistant.io/installation/).
