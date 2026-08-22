---
title: "架构概览"
---

Home Assistant 提供了一个家庭控制与家庭自动化平台。Home Assistant 不仅仅是一个应用程序：它是一个嵌入式系统，提供类似于其他消费级产品的体验：引导设置、配置和更新都通过易于使用的界面完成。

- [操作系统](operating-system.md) 提供了运行 Supervisor 和 Core 所需的最小 Linux 环境。
- [Supervisor](supervisor.md) 管理系统。
- [Core](architecture/core.md) 与用户、supervisor 和 IoT 设备及服务交互。

<img
  src='/img/en/architecture/full.svg'
  alt='Home Assistant 全貌'
/>

## 运行部分堆栈

用户对家庭自动化平台有不同的需求。因此，可以只运行 Home Assistant 堆栈的一部分。更多信息请参见[安装说明](https://www.home-assistant.io/installation/)。
