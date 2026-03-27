---
title: Assist 最佳实践
description: '为了获得最佳语音助手体验，你应该做几件事。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# Assist 最佳实践

为了获得最佳语音助手体验，你应该做几件事。

使用 Assist 的核心，就是说出受支持的命令，并让这些命令作用于已暴露的设备和实体。也就是说：

- 你可以控制 Assist 能访问哪些数据，以及它能控制什么。
- Home Assistant 中的每个实体都可以选择是否暴露给 Assist。

为了获得高效的设置，我们推荐以下最佳实践：

### 暴露（最少量的）实体

请参阅[将实体暴露给 Assist](/home-assistant/voice_control/voice_remote_expose_devices/)。

把所有实体都暴露给 Assist 看起来很诱人，但这样会带来性能损耗。解析器需要遍历的实体名称和别名越多，匹配花费的时间就越长。如果你使用基于 LLM 的对话代理，由于上下文更大，每次请求的成本也会更高。只暴露那些你确定会通过语音助手使用的最少实体即可。

### 检查名称并创建别名

Assist 非常依赖实体名称、域和区域。下面你会看到一些调整这些内容的建议，以确保获得最佳体验。除了暴露必要数据之外，还值得注意的是，你很可能会通过区域和楼层来定位实体，例如：

- *关闭办公室灯光*

因此，请确保你的设备和实体已正确分配到区域，而区域又已正确分配到楼层。
请在[这里](/home-assistant/voice_control/assign_areas_floors/)了解方法。

如果实体在日常说法中没有合适的叫法，会严重影响你使用 Assist 的语音体验。比如，你大概很难自然地要求 Assist “打开 Tuya 灯光 Controller 0E54B1 灯光 1”。因此，你应当以符合逻辑的方式命名设备和实体，使用类似 `<area> [<identifier_or_descriptor>] [<domain>]` 的模式。

例如，`light.living_room_lamp` 可能是 `Living room lamp` 的实体 ID。如果房间里只有一个灯具，那么 `light.kitchen` 叫作 `Kitchen light` 就已经足够。

请注意，这一命名约定只是建议，设备和实体的实际命名可能取决于你的语言或个人偏好。

如果你发现自己总是用某种特定说法提到某个设备或实体，请务必[把它添加为别名](/home-assistant/voice_control/aliases/)，因为那通常就是你最自然的称呼方式。

名称和别名同样适用于 `area`，你需要像处理实体一样精确地使用区域名称和区域别名。

### 注意语言特性

如果你在 Home Assistant 中用英语命名实体，但打算用其他语言使用 Assist，也不用担心。你可以为每个实体添加别名，让它们在任何语言中都能有对应名称。

英语的语法规则相对简单，但有些语言的定冠词会作为前缀或后缀附着在词上，名词还会有性和数的变化。各语言负责人都在努力支持这些语言中的大多数词形变化，但他们无法控制你自己命名的内容。因此，请考虑某个实体名称在句子中是否需要带定冠词，或者是否需要另一个形式；如果需要，也请把那个版本添加为别名。

### 检查域和设备类别

Assist 会利用域来决定动作所对应的正确动词（例如，对 `light` 或 `fan` 执行打开/关闭，对带有 `door` `device_class` 的 `cover` 执行打开/关闭，对 `valve` 执行打开/关闭，或对 `lock` 执行上锁/解锁）。

如果在 UI 中把 `switch.main_valve` 显示成开关而不是阀门，可能没人会介意，但你就无法要求 Assist 打开主阀门，因为主阀门被识别成了开关。如果它是 `valve.main_valve`，那前面的说法就可以正常工作。

为避免这种情况，你可以使用[更改开关集成的设备类型](/home-assistant/integrations/switch_as_x/)，或者通过 [template](/home-assistant/integrations/template/) 实体或 Generic X（例如 [generic thermostat](/home-assistant/integrations/generic_thermostat/)）创建虚拟实体。

某些设备类别也是同样的道理。例如，如果你有一个没有设置 `device_class` 的 `binary_sensor.bedroom_window`，你只能询问卧室窗户是否“打开着”，这甚至都不太符合语义。若要让你能够询问它是否“开着”，需要为该 `binary_sensor` 设置合适的 `device_class`，也就是 window。

## 准备好了吗？

当你的设备和实体已经：
- 暴露给 Assist
- 分配到区域

现在就可以开始和你的设备说话了。

要与 Assist 对话，你可以使用手机，也可以使用自定义设备（并利用它们的麦克风和扬声器）。请查看如何在 [Android](/home-assistant/voice_control/android/) 或 [Apple](/home-assistant/voice_control/apple/) 设备上使用。

### 帮你入门的一些示例

有一些示例命令可以帮助你开始使用，请参阅[语句入门包](/home-assistant/voice_control/builtin_sentences/)。

如果你没有得到正确回应，我们建议你检查别名。有时，不同家庭成员对同一个实体的叫法会不同。你可能会说 “TV”，而别人可能会说 “Television”。

你可以为已暴露的实体创建别名，以便通过不同名称用 Assist 来控制它们。别名可用于实体、区域和楼层。请参阅[别名教程](/home-assistant/voice_control/aliases/)。
