---
title: 了解家庭能源管理
description: 了解如何在 Home Assistant 中开始使用家庭能源管理。
---

Home Assistant 的家庭能源管理功能可帮助您掌握家庭能耗情况。您可以获得新的洞察、优化太阳能电池板发电、规划用能时间，并节省开支。

家庭能源管理依赖三种不同类型的信息来源。即使您只连接了其中一种，也可以开始使用。每新增一种来源，都会与其他来源互补，让您对家中的能源状况有更全面的了解。

Home Assistant 是开放平台，因此家庭能源管理不受特定硬件限制。任何能与 Home Assistant 集成的能源监测硬件都可以作为数据来源。请查看以下章节，了解更深入的说明和硬件建议。

- [集成电网用电数据](/home-assistant/docs/energy/electricity-grid/)
- [集成太阳能电池板数据](/home-assistant/docs/energy/solar-panels/)
- [集成家用电池数据](/home-assistant/docs/energy/battery/)
- [集成燃气消耗数据](/home-assistant/docs/energy/gas/)
- [集成用水数据](/home-assistant/docs/energy/water/)
- [集成单个设备数据](/home-assistant/docs/energy/individual-devices/)

如果您有一个返回瞬时功率读数（W 或 kW）的传感器，并且想添加一个返回能量使用量或发电量（kWh）的传感器，请参阅 [Riemann sum integral 集成](/home-assistant/integrations/#energy)。

您也可以在能源仪表板中同时配置功率传感器和能量传感器。功率输入接受带有 `state_class: measurement` 且单位合适的传感器，例如 `W` 或 `kW`。

<img src='/home-assistant/images/docs/energy/energy-overview.png' alt='展示不同能源形式之间关系的示意图。' style='border: 0;box-shadow: none;'>
