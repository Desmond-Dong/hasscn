---
title: Flux
description: 关于如何使用 Home Assistant 根据时间自动调整灯光色温的说明
ha_category:
  - Automation
ha_release: 0.21
ha_quality_scale: internal
ha_domain: flux
ha_iot_class: Calculated
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

**Flux** 集成将使用昼夜节律改变灯的温度，类似于计算机上通量的工作方式。它们在白天会很亮，在晚上逐渐褪成红色/橙色。 `flux` 交换机启动后恢复其上次状态。

该集成将根据一天中的时间更新您的灯光。它只会影响打开并在通量配置中列出的灯。

白天（在 `start_time` 和 `sunset_time` 之间），它会将 `start_colortemp` 的灯光减弱到 `sunset_colortemp`。日落后（`sunset_time` 和 `stop_time` 之间），灯光将从 `sunset_colortemp` 逐渐减弱到 `stop_colortemp`。如果 `stop_time` 之后灯仍然亮着，它将继续将灯更改为 `stop_colortemp`，直到灯关闭。淡入淡出效果是通过定期更新灯光来创建的。

`sunset_time` 的值是根据 [Home Assistant configuration](/home-assistant/docs/configuration/basic) 中指定的位置自动计算的。

色温以开尔文指定，可接受的值在 1000 到 4000 开尔文之间。较低的值看起来更红，而较高的值看起来更白。

如果您想以可变的时间间隔进行更新，则可以将开关保持关闭状态，并使用自动化规则，只要您希望更新灯光，就会使用 `switch.<name>_update` 操作，其中 `<name>` 等于开关配置中的 `name:` 属性。

要在安装中使用 Flux 开关，请将以下内容添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
    lights:
      - light.desk
      - light.lamp
```

```yaml
灯：
描述：灯光实体的数组列表。
必填：真实
类型：列表
姓名：
描述：显示此开关时使用的名称。
必填：假
默认值：通量
类型：字符串
开始时间：
描述：开始时间。
必填：假
默认：日出
类型：时间
停止时间：
描述：停止时间。
必填：假
默认：黄昏
类型：时间
开始颜色温度：
描述：开始时的色温。
必填：假
默认值：4000
类型：整数
日落色温：
描述：太阳设定色温。
必填：假
默认值：3000
类型：整数
停止颜色温度：
描述：结束时的色温。
必填：假
默认值：1900
类型：整数
亮度：
描述： 灯的亮度恒定。除了色温之外，亮度也会被调整，除非这里指定了一个值。
必填：假
类型：整数
禁用亮度调整：
描述：如果为true，则不会调整亮度，只会调整色温。
必填：假
类型：布尔值
默认值：假
模式：
描述：选择色温传递给灯光的方式。有效值为 `xy`、`mired`（开尔文的别名）和 `rgb`。
必填：假
默认值：xy
类型：字符串
过渡：
描述：灯光变化的过渡时间（以秒为单位）（并非所有灯光型号都支持高值）。
必填：假
默认值：30
类型：整数
间隔：
描述：灯光更新的频率（以秒为单位）。
必填：假
默认值：30
类型：整数
唯一ID：
描述：唯一标识该交换机的ID。将其设置为唯一值以允许通过 UI 进行自定义。
必填：假
类型：字符串
```

“`configuration.yaml`”文件中条目的完整示例：

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
    lights:
      - light.desk
      - light.lamp
    name: Fluxer
    start_time: "7:00"
    stop_time: "23:00"
    start_colortemp: 4000
    sunset_colortemp: 3000
    stop_colortemp: 1900
    brightness: 200
    disable_brightness_adjust: true
    mode: xy
    transition: 30
    interval: 60
```
