# Update

更新实体用于指示某个设备或服务是否有可用更新。这可以是任何类型的更新，包括灯泡、路由器等设备的固件更新，或附加组件、容器等的软件更新。

:::note Building block integration
This update is a building block integration that cannot be added to Home Assistant directly, but is used and provided by other integrations.
A building block integration differs from a typical integration that connects to a device or service. Instead, other integrations use this update building block to provide entities, actions, and other functionality that you can use in your automations or dashboards.
If one of your integrations uses this building block, this page documents the functionality the update building block offers.
:::

要查看提供更新实体的集成列表，请在集成页面中选择[“Update”类别](/home-assistant/integrations/index.md#update)。

## 更新实体的状态

更新实体的状态表示是否有可用更新。当状态为 **On** 时，表示有可用更新；当一切都是最新版本时，状态为 **Off**。

此外，该实体还可能具有以下状态：

* **Unavailable**：实体当前不可用。
* **Unknown**：状态尚未知晓。

该实体还会公开以下状态属性，以提供更多更新状态信息：

* `title`：可用软件或固件的标题或名称。由于设备名称或实体名称可以在 Home Assistant 中更改，此标题会显示软件或固件的实际名称。
* `installed_version`：当前已安装并正在使用的版本。
* `latest_version`：可供安装的最新版本。
* `skipped_version`：如果某个版本更新被跳过，将设置此属性，并显示被跳过的实际版本。
* `release_summary`：可用更新的发行说明摘要。
* `release_url`：指向可用更新完整发布公告的链接。

## 设备类别

A device class is a measurement categorization in Home Assistant. It influences how the entity is represented in the [dashboard](/home-assistant/dashboards/index.md). This can be modified in the [customize section](/home-assistant/docs/configuration/customizing-devices/index.md). For example, different states may be represented by different icons, colors, or text.

更新实体支持以下设备类别：

* **`None`**：通用软件更新。这是默认值，无需设置。
* **`firmware`**：此更新集成提供固件更新。

## 操作

更新实体公开了两个操作，可用于安装或跳过提供的软件更新。

### 操作：安装

`update.install` 操作可用于为设备或服务安装提供的更新。

只有在某个集成为更新实体提供此能力时，此操作才可用。另外，如果集成允许，此操作还支持安装指定版本，甚至可以在安装更新前创建备份。

#### 操作数据属性

```yaml
entity_id (required):
  description: "指向更新实体 `entity_id` 的字符串或字符串列表。要定位所有更新，请将 `entity_id` 设为 `all`。"
version:
  description: "要安装的指定更新版本。如果未提供，则会安装最新可用更新。此属性是否可用取决于集成。"
backup:
  description: "如果设为 `true`，将在安装更新前创建备份。此属性是否可用取决于集成。"
```

操作示例：

```yaml
action: update.install
target:
  entity_id:
    - update.my_light_bulb
```

### 操作：跳过

`update.skip` 操作可用于跳过设备或服务的某个可用更新。

跳过某个可用更新后，实体会返回到 `off` 状态，这表示当前没有可用更新。

```yaml
action: update.skip
target:
  entity_id:
    - update.my_light_bulb
```

即使某个更新已被跳过并显示为 `off`（表示没有更新），如果之后出现了更新版本，调用该实体上的 `update.install` 操作仍会安装最新版本。

### 操作：清除已跳过标记

`update.clear_skipped` 操作可用于移除之前已跳过的设备或服务更新版本标记。

跳过某个可用更新后，实体会返回到 `off` 状态，但在有新版本再次可用之前，它不会重新回到提示更新的状态。

使用 `update.clear_skipped` 操作后，可以移除已跳过版本的标记，这样实体会重新回到 `on` 状态，更新通知也会再次出现。

```yaml
action: update.clear_skipped
target:
  entity_id:
    - update.my_light_bulb
```

这在某些场景下很有帮助，比如你可以创建一个每周自动取消所有“已跳过”更新标记的自动化，用作更新提醒。

## 示例：发送更新可用通知

更新实体的一个常见用法，是在有更新可安装时向你发送通知。使用更新实体可以相当直接地实现这一点。

下面是一个 YAML 自动化示例，用于在灯泡有可用更新时发送通知。

```yaml
automation:
  - alias: "Send notification when update available"
    triggers:
      - trigger: state
        entity_id: update.my_light_bulb
        to: "on"
    actions:
      - alias: "Send notification to my phone about the update"
        action: notify.iphone
        data:
          title: "New update available"
          message: "New update available for my_light_bulb!"
```
