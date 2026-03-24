---
title: 实体和域
description: 描述 Home Assistant 中的实体和域是什么。
---

您的设备在 Home Assistant 中表示为实体。实体是 Home Assistant 中存储数据的基本构建块。实体在 Home Assistant 中代表传感器、执行器或功能。实体用于监测物理属性或控制其他实体。实体通常是设备或服务的一部分。实体具有[状态](/home-assistant/docs/configuration/state_object/)和[状态属性](/home-assistant/docs/configuration/state_object/#about-entity-state-attributes)。

您所有的实体都列在实体表中，位于 [**设置** > **设备与服务** > **实体**](https://my.home-assistant.io/redirect/entities/)。

<p class='img'><img src='/home-assistant/images/getting-started/entities.png' style='border: 0;box-shadow: none;' alt="显示实体表的截图">实体表的截图。每一行代表一个实体。</p>

## 域

Home Assistant 中的每个集成都有一个唯一标识符：域。Home Assistant 中所有可用的实体和动作都由集成提供，因此都属于某个域。实体或动作中 `.` 之前的第一部分表示它们所属的域。例如，`light.bed_light` 是灯光域中的一个实体。`bed_light` 是该实体的 ID。

域提供实体、服务和其他功能，供其他集成使用。例如，IKEA 和 Philips Hue 都使用灯光集成提供的功能。这就是为什么它们在 Home Assistant 中的外观、感觉和行为相似的原因。

域分为不同类型：集成域和实体域：

- 集成域主要为其自身提供功能：例如 Hue、Matter 或 Zigbee。
- 实体域本身不使用自己的功能，但为其他集成提供功能。

以下列出的集成可作为实体域使用。它们也被称为*构建块集成*或*实体集成*：

- [AI 任务](/home-assistant/integrations/ai_task)
- [空气质量](/home-assistant/integrations/air_quality)
- [告警控制面板](/home-assistant/integrations/alarm_control_panel)
- [Assist 卫星](/home-assistant/integrations/assist_satellite)
- [二进制传感器](/home-assistant/integrations/binary_sensor)
- [按钮](/home-assistant/integrations/button)
- [日历](/home-assistant/integrations/calendar)
- [摄像头](/home-assistant/integrations/camera)
- [气候](/home-assistant/integrations/climate)
- [对话](/home-assistant/integrations/conversation)
- [封面](/home-assistant/integrations/cover)
- [日期](/home-assistant/integrations/date)
- [日期/时间](/home-assistant/integrations/datetime)
- [设备追踪器](/home-assistant/integrations/device_tracker)
- [事件](/home-assistant/integrations/event)
- [风扇](/home-assistant/integrations/fan)
- [地理位置](/home-assistant/integrations/geo_location)
- [加湿器](/home-assistant/integrations/humidifier)
- [图像](/home-assistant/integrations/image)
- [图像处理](/home-assistant/integrations/image_processing)
- [割草机](/home-assistant/integrations/lawn_mower)
- [灯光](/home-assistant/integrations/light)
- [门锁](/home-assistant/integrations/lock)
- [媒体播放器](/home-assistant/integrations/media_player)
- [通知](/home-assistant/integrations/notify)
- [数字](/home-assistant/integrations/number)
- [遥控器](/home-assistant/integrations/remote)
- [场景](/home-assistant/integrations/scene)
- [选择器](/home-assistant/integrations/select)
- [传感器](/home-assistant/integrations/sensor)
- [警报器](/home-assistant/integrations/siren)
- [语音转文本 (STT)](/home-assistant/integrations/stt)
- [开关](/home-assistant/integrations/switch)
- [标签](/home-assistant/integrations/tag)
- [文本](/home-assistant/integrations/text)
- [时间](/home-assistant/integrations/time)
- [待办事项列表](/home-assistant/integrations/todo)
- [文本转语音 (TTS)](/home-assistant/integrations/tts)
- [更新](/home-assistant/integrations/update)
- [吸尘器](/home-assistant/integrations/vacuum)
- [阀门](/home-assistant/integrations/valve)
- [唤醒词检测](/home-assistant/integrations/wake_word)
- [热水器](/home-assistant/integrations/water_heater)
- [天气](/home-assistant/integrations/weather)
