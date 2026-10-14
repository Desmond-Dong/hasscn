# Hyperion

**Hyperion** 集成允许您将 [Hyperion](https://docs.hyperion-project.org/) 集成到 Home Assistant 中。Hyperion 是一个开源的 Ambilight 实现，可在许多平台上运行。

**注意**：支持 [Hyperion-NG](https://github.com/hyperion-project/hyperion.ng)，不支持原始的[已停止维护的 Hyperion](https://github.com/hyperion-project/hyperion)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 集成的额外配置

所有配置选项都从前端提供。在 `集成` 页面的相关条目下选择 `选项`。

支持的选项：

* **优先级**：颜色和效果的优先级。Hyperion 将选择优先级数字最低的源作为活动输入。如果您配置了其他源（非来自 Home Assistant），请确保此选项低于 Hyperion 本身中这些源的优先级（通常低于 200 比较合适）。
* **要隐藏的效果**：可从灯光效果列表中隐藏的效果可选选择。添加到 Hyperion 服务器的新效果将默认显示。

## Hyperion 实例

此集成支持在单个 Hyperion 服务器上运行多个 Hyperion 实例。随着在 Hyperion UI 上添加/删除实例，它们将自动从 Home Assistant 添加/删除。

## 灯光实体

默认灯光实体将在集成设置期间配置的优先级上向 Hyperion 发送数据。关闭时，它将再次清除配置的优先级。在 Hyperion 中配置的其他独立于 Home Assistant 的灯光源可能仍然处于活动状态并导致发光。为了完全关闭灯光输出而不管活动的灯光源，您可以启用 LED 设备实体作为全局开关（参见高级实体）。

## 效果

效果列表从 Hyperion 服务器动态拉取。此外，还会有一个"纯色"效果来切换（回）仅显示纯色。

## Hyperion 摄像头

创建一个 Hyperion 摄像头实体，显示 Hyperion 输入的流（例如，USB 采集设备）。这可以用于在电视控件旁边显示一个小"预览窗口"。

请注意，只有当前活动的 Hyperion 优先级可以流式传输，只有可流式传输的源才会实际流式传输内容（例如，USB 采集设备可以工作，但静态颜色不会）。

## 传感器

传感器（可见优先级）提供所选实例的 Hyperion 服务器当前显示的效果。此传感器的属性提供有关效果性质的更多详细信息。有关详细描述，请参阅 [Hyperion API](https://docs.hyperion-project.org/en/json/ServerInfo.html#priorities)。

## 高级实体

Hyperion 集成附带一系列默认禁用的实体，用于高级用例。这些实体公开"原始"底层 Hyperion API 组件，以改进可扩展性和互操作性，这在有多个 Hyperion 服务器客户端（其中 Home Assistant 是一个）的情况下特别有用。

可以通过访问 `集成` 页面，选择相关实体并切换 `启用实体`，然后点击 `更新` 来启用这些实体。

### 控制外部源：屏幕采集和 USB 采集

提供用于控制外部源的实体：

* `switch.[instance]_component_platform_capture`：切换 `屏幕采集` 源
* `switch.[instance]_component_usb_capture`：切换 `USB 采集` 源
* `switch.[instance]_component_audio_capture`：切换 `音频采集` 源

### 控制 Hyperion 功能

更多用于控制 Hyperion 功能的高级实体：

* 将有额外的 `switch.[instance]_component_[component]` 实体，可用于切换 Hyperion 服务器 `远程控制` 页面上 `组件控制` 下显示的相关底层 Hyperion 组件。这允许精细控制 Hyperion 功能（例如 `黑条检测`）或设备状态（`LED 设备`）。
* `switch.[instance]_component_all`：指的是控制 Hyperion 服务器 `仪表板` 页面上切换开关的整个 Hyperion 实例状态。

## 示例

要使用效果启动 Hyperion，请使用以下自动化：

```yaml
automation:
- alias: "灯打开时打开 Hyperion 效果"
  triggers:
    - trigger: state
      entity_id: light.hyperion
      to: "on"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hyperion
      data:
        effect: "Full color mood blobs"
```

要在暂停、空闲或关闭媒体播放器（如 Plex）时让灯光播放效果，您可以使用此示例：

```yaml
- alias: "播放后设置 hyperion 效果"
  triggers:
    - trigger: state
      entity_id: media_player.plex
      to: "off"
    - trigger: state
      entity_id: media_player.plex.plex
      to: "paused"
    - trigger: state
      entity_id: media_player.plex.plex
      to: "idle"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hyperion
      data:
        effect: "Full color mood blobs"
```

要在播放媒体播放器上的内容时采集 USB 采集设备上的屏幕，您可以使用此示例：

```yaml
- alias: "播放开始时设置 hyperion"
  triggers:
    - trigger: state
      entity_id: media_player.plex
      to: "playing"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.[instance]_component_usb_capture
```

要将 LED 设备与灯光实体一起切换，以便为所有源打开或关闭灯光输出。在此示例中，两个实体一起打开，创建另一个具有相反值的自动化以关闭两者：

```yaml
- alias: "Hyperion 灯光激活时打开 LED 设备"
  triggers:
    - trigger: state
      entity_id:
        - light.hyperion
      from: "off"
      to: "on"
  conditions:
    - condition: state
      entity_id: switch.[instance]_component_led_device
      state: "off"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.[instance]_component_led_device
```
