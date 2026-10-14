# Demo

**Demo** 集成允许您使用带有演示实现的集成。演示实体是虚拟的，但它们可以向您展示真实平台在 Home Assistant 中的外观。这样，您就可以像使用在线 [Home Assistant 演示](/home-assistant/demo/) 一样运行自己的演示实例，同时又能结合您自己的真实平台。

可用的演示平台：

* [空气质量](/home-assistant/integrations/air_quality/index.md) (`air_quality`)
* [报警控制面板](/home-assistant/integrations/alarm_control_panel/index.md) (`alarm_control_panel`)
* [二进制传感器](/home-assistant/integrations/binary_sensor/index.md) (`binary_sensor`)
* [按钮](/home-assistant/integrations/button/index.md) (`button`)
* [日历](/home-assistant/integrations/calendar/index.md) (`calendar`)
* [摄像头](/home-assistant/integrations/camera/index.md) (`camera`)
* [气候](/home-assistant/integrations/climate/index.md) (`climate`)
* [遮盖](/home-assistant/integrations/cover/index.md) (`cover`)
* [设备跟踪器](/home-assistant/integrations/device_tracker/index.md) (`device_tracker`)
* [风扇](/home-assistant/integrations/fan/index.md) (`fan`)
* [地理位置](/home-assistant/integrations/geo_location/index.md) (`geo_location`)
* [加湿器](/home-assistant/integrations/humidifier/index.md) (`humidifier`)
* [图像处理](/home-assistant/integrations/image_processing/index.md) (`image_processing`)
* [灯光](/home-assistant/integrations/light/index.md) (`light`)
* [门锁](/home-assistant/integrations/lock/index.md) (`lock`)
* [媒体播放器](/home-assistant/integrations/media_player/index.md) (`media_player`)
* [通知](/home-assistant/integrations/notify/index.md) (`notify`)
* [数字](/home-assistant/integrations/number/index.md) (`number`)
* [遥控](/home-assistant/integrations/remote/index.md) (`remote`)
* [选择](/home-assistant/integrations/select/index.md) (`select`)
* [传感器](/home-assistant/integrations/sensor/index.md) (`sensor`)
* [警报器](/home-assistant/integrations/siren/index.md) (`siren`)
* [开关](/home-assistant/integrations/switch/index.md) (`switch`)
* [文本](/home-assistant/integrations/text/index.md) (`text`)
* [文本转语音](/home-assistant/integrations/tts/index.md) (`tts`)
* [更新](/home-assistant/integrations/update/index.md) (`update`)
* [吸尘器](/home-assistant/integrations/vacuum/index.md) (`vacuum`)
* [阀门](/home-assistant/integrations/valve/index.md) (`valve`)
* [热水器](/home-assistant/integrations/water_heater/index.md) (`water_heater`)
* [天气](/home-assistant/integrations/weather/index.md) (`weather`)

要在 Home Assistant 中启用演示平台，请将以下内容添加到 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
demo:
```

```yaml
"[component]":
  description: 配置示例列表上方说明的集成名称。
  required: true
  type: string
```
