---
title: 开发者工具
description: 开发者工具的说明。
---

仪表盘包含一个名为**开发者工具**的部分。

<p class='img'>
<img src='/home-assistant/images/screenshots/developer-tools.png' />
Home Assistant 开发者工具的截图。
</p>

| 部分       | 描述                                                   |
| ---------- | ------------------------------------------------------ |
| YAML       | 让您验证配置并触发重载或重启                           |
| 状态       | 设置实体的表示                                         |
| 动作       | 执行来自集成的动作                                     |
| 模板       | 渲染模板                                               |
| 事件       | 触发事件                                               |
| 统计       | 显示长期统计实体列表                                   |
| Assist     | 让您查看 Home Assistant Assist 如何处理一个句子        |

## 开发者工具可以做什么？

开发者工具是为**所有**用户（不仅仅是开发者）设计的，用于快速尝试各种操作——比如执行动作、更新状态、触发事件以及在 MQTT 中发布消息。对于那些手动编写自定义自动化和脚本的用户来说，这也是一个必要的工具。下面将详细描述每个部分。

## YAML 选项卡

YAML 选项卡提供按钮来触发配置文件检查和重载配置。重载是使您对配置所做的更改生效所必需的。

这几乎与**设置** > 三个点 `[mdi:dots-vertical]` 菜单（右上角）> **重启 Home Assistant** > **快速重载**下的选项相同。唯一的区别是**快速重载**会重载所有配置，而这个 YAML 选项卡允许您一次只重载一个特定配置。

### 重载 YAML 配置

要使配置更改生效，必须重载配置。Home Assistant 中的大多数集成（不与设备或交互的）可以在不需要重启 Home Assistant 的情况下重载在 **`configuration.yaml`** 中对其配置所做的更改。

1. 前往 [**开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/) 并向下滚动到 YAML 配置重载部分（或者，在 UI 的任何地方按 ["c"](/home-assistant/docs/tools/quick-search/) 并搜索"重载"）。
   - 你会看到一个集成列表，例如**自动化**或**对话**。

    ![重载配置更改](/home-assistant/images/docs/configuration/reloading_config.png)

2. 根据您在列表中找到的内容，您可以继续重载，或者需要重启 Home Assistant：
   - 如果集成已列出，选择它以重载设置。
     - 例如，如果你更改了[常规设置](/home-assistant/docs/configuration/basic/)，你可以选择**位置和自定义**来应用这些更改。
   - 如果集成未列出，你需要**重启** Home Assistant 才能使更改生效。

## 状态选项卡

此部分显示所有可用实体、其对应的状态和属性值。状态和属性信息是 Home Assistant 在运行时看到的内容。要使用新状态或新属性值更新实体，请选择该实体，滚动到顶部，修改值，然后选择**设置状态**按钮。

请注意，这是设备在 Home Assistant 内的状态表示。这意味着，这是 Home Assistant 所看到的内容，它不会以任何方式与实际设备通信。更新的信息仍可用于触发事件和状态更改。要与实际设备通信，建议在上方的**动作**部分执行动作，而不是更新状态。

例如，将 `light.bedroom` 状态从 `off` 更改为 `on` 并不会打开灯光。如果有一个自动化在 `light.bedroom` 状态更改时触发，它将被触发——即使实际的灯泡没有打开。此外，当灯泡状态更改时——状态信息将被覆盖（可以使用刷新图标来检索 Home Assistant 拥有的最新信息）。换句话说，通过**状态**部分所做的更改是临时的，建议仅用于测试目的。

包含所有实体的表格可以按每一列进行筛选。这里使用的是通配符搜索，这意味着如果您在实体列筛选器中输入 `office`，就会显示所有 ID 匹配 `*office*` 的实体。您也可以在搜索框中添加自己的通配符，例如 `office*light`。
属性筛选器支持对属性名称和值进行单独筛选，以冒号":"分隔。因此，筛选器"location:3"将使表格显示所有具有包含"location"的属性名且属性值包含"3"的实体。

## 动作选项卡

此部分用于执行 Home Assistant 中可用的动作。

**动作**下拉列表中的动作列表是根据配置、自动化和脚本文件中找到的集成自动填充的。如果所需的动作不存在，则意味着集成配置不正确或未在配置、自动化或脚本文件中定义。

当选择一个动作时，如果该动作需要传递 `entity_id`，**实体**下拉列表将自动填充相应的实体。

动作可能还需要传递额外的输入。这通常称为“动作数据”。动作数据使用 YAML 格式，根据动作不同，这些数据可能是可选的。

当从实体下拉列表中选择一个实体时，它会自动用相应的 `entity_id` 填充动作数据。然后可以修改动作数据 YAML 以传递额外的[可选]参数。以下是如何执行 `light.turn_on` 动作的示例。

要打开灯光，请使用以下步骤：

1. 从**动作**下拉列表中选择 `light.turn_on`。
2. 从实体下拉列表中选择实体（通常是灯光）（如果未选择 entity_id，它将打开所有灯光）
3. 如果选择了一个实体，动作数据将填充将传递给动作的基本 YAML。也可以通过如下更新 YAML 来传递额外数据。

```yaml
entity_id: light.bedroom
brightness: 255
rgb_color: [255, 0, 0]
```

## 模板编辑器选项卡

模板编辑器提供了一种在将模板放入自动化和脚本之前快速测试它们的方法。左侧是代码编辑器，右侧预览中显示你的实时输出。

默认情况下，这将包含示例代码，说明如何编写和测试模板。可以删除此示例代码并替换为你自己的代码。你可以通过按代码编辑器下方的**重置为演示模板**按钮来恢复默认示例。

有关 Jinja2 的更多信息，请访问 [Jinja2 文档](https://jinja.palletsprojects.com/en/latest/templates/)，并阅读[此处](/home-assistant/docs/configuration/templating)的模板文档。

## 事件选项卡

在事件部分，你可以在事件总线上触发事件或订阅事件类型以查看事件数据 JSON。

### 触发事件

要触发事件，只需输入事件名称，并以 JSON 格式传递事件数据。
例如，要触发自定义事件，输入 `event_type` 为 `event_light_state_changed`，事件数据 JSON 为

```yaml
state: on
```

如果有自动化处理该事件，它就会被触发，例如：

```yaml
- alias: "Capture Event"
  triggers:
    - trigger: event
      event_type: event_light_state_changed
  actions:
    - action: notify.notify
      data:
        message: "Light is turned "
```

### 订阅事件

要订阅事件，请在**监听事件**下输入事件类型并选择**开始监听**。某些事件类型在**事件**部分的**活动监听器**下列出。你通常可以在特定集成的文档中找到有关该集成事件类型的信息。然后，你可以检查事件数据 JSON 以找到自动化的正确参数。

例如，订阅 Shelly 集成的事件类型 `shelly.click`，在按下按钮时返回类似于以下的事件数据 JSON。

```json
Event 0 fired 9:53 AM:
{
    "event_type": "shelly.click",
    "data": {
        "device_id": "e09c64a22553484d804353ef97f6fcd6",
        "device": "shellybutton1-A4C12A45174",
        "channel": 1,
        "click_type": "single"
    },
    "origin": "LOCAL",
    "time_fired": "2021-04-28T08:53:12.755729+00:00",
    "context": {
        "id": "e0f379706563aaa0c2c1fda5174b5a0e",
        "parent_id": null,
        "user_id": null
    }
}
```

## 统计选项卡

**统计**选项卡显示长期统计实体列表。如果某个实体的长期统计不工作，将显示**修复问题**链接。选择它可查看问题描述。可能还有修复问题的选项。

![统计问题消息](/home-assistant/images/docs/developer-tools/statistics_issue.png)

[统计开发者工具](https://my.home-assistant.io/redirect/developer_statistics/)的另一个用途是更正测量值。选择
<svg width="24" height="24" viewBox="0 0 24 24"><path d="M22,13V22H2V19L22,13M21.68,7.06L16.86,4.46L17.7,7.24L7.58,10.24C6.63,8.95 4.82,8.67 3.53,9.62C2.24,10.57 1.96,12.38 2.91,13.67C3.85,14.97 5.67,15.24 6.96,14.29C7.67,13.78 8.1,12.97 8.14,12.09L18.26,9.09L19.1,11.87L21.68,7.06Z" /></svg>
图标。使用日期和时间搜索错误的数据点并调整数值。

![显示调整长期统计历史数值的截图](/home-assistant/images/docs/developer-tools/adjust-statistics.png)

## Assist 选项卡

**Assist** 选项卡让您查看 Home Assistant 的 Assist 如何处理一个句子。

如果没有找到匹配的意图，则 Assist 无法解释该句子。如果找到了匹配的意图，则会提供有关将在哪个实体上执行什么动作的信息。以下示例显示如何解析以下句子：*办公室里有哪些灯开着*。

- Assist 找到了匹配的意图：*HassGetState*。
- 它找到了与域匹配的实体：*light*。
- light 的状态为*开启*。
- light 位于*办公室*区域。
- 目标是范围内筛选出的实体。

![Assist 开发者工具使用示例](/home-assistant/images/docs/developer-tools/Assist.png)
