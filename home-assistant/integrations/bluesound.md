# Bluesound

**Bluesound** 集成允许您从 Home Assistant 控制 [Bluesound](https://www.bluesound.com/) HiFi 无线扬声器和音频集成设备。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 按钮

以下是可用的按钮实体：

* `button.speaker_name_set_sleep_timer`：设置睡眠定时器。
* `button.speaker_name_sleep_timer`：清除睡眠定时器。

将 `speaker_name` 替换为您的扬声器名称。

### 按钮 `button.speaker_name_set_sleep_timer`

设置一个定时器，该定时器将关闭扬声器。每次调用此按钮时，时间将增加一步。步骤为（分钟）：15、30、45、60、90、0。
如果您增加一个正在进行的定时器，例如 13 分钟，它将增加到 15。如果定时器设置为 90，它将移除时间（因此为 0）。

:::note
此按钮默认禁用。

:::

### 按钮 `button.speaker_name_clear_sleep_timer`

清除扬声器上的睡眠定时器（如果已设置）。

:::note
此按钮默认禁用。

:::

## 动作

Bluesound 集成除了[标准媒体播放器动作](/home-assistant/integrations/media_player/index.md#actions)外，还提供了一些自定义动作。

### 动作：加入

`bluesound.join` 动作允许您将播放器分组到单个主扬声器下。这将创建一个新组或加入现有组。

| 数据属性 | 可选 | 描述                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------- |
| `master`               | 否       | 将成为/保持主扬声器的单个 `entity_id`。            |
| `entity_id`            | 否       | 将分组到主扬声器的单个 `entity_id` 的字符串或列表。 |

### 动作：取消加入

`bluesound.unjoin` 动作允许您从扬声器组中移除一个或多个扬声器。如果未提供 `entity_id`，则所有扬声器都将取消加入。

| 数据属性 | 可选 | 描述                                                                      |
| ---------------------- | -------- | -------------------------------------------------------------------------------- |
| `entity_id`            | 是      | 将与其主扬声器分离的 `entity_id` 的字符串或列表。 |

### 动作：设置睡眠定时器

:::note
此动作已弃用。请改用 `button.<player_name>_set_set_timer`。

:::
`bluesound.set_sleep_timer` 动作允许您设置一个定时器，该定时器将关闭扬声器。每次调用此动作时，时间将增加一步。步骤为（分钟）：15、30、45、60、90、0。
如果您增加一个正在进行的定时器，例如 13 分钟，它将增加到 15。如果定时器设置为 90，它将移除时间（因此为 0）。

| 数据属性 | 可选 | 描述                                                     |
| ---------------------- | -------- | --------------------------------------------------------------- |
| `entity_id`            | 否       | 将设置定时器的 `entity_id` 的字符串或列表。 |

### 动作：清除睡眠定时器

:::note
此动作已弃用。请改用 `button.<player_name>_clear_set_timer`。

:::
`bluesound.clear_sleep_timer` 动作允许您清除扬声器上的睡眠定时器（如果已设置）。

| 数据属性 | 可选 | 描述                                                         |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| `entity_id`            | 否       | 将清除定时器的 `entity_id` 的字符串或列表。 |

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
