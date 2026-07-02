# Risco

此集成可通过以下两种方式之一连接 Risco 报警系统：

## Risco cloud（推荐）

该集成会通过 [Risco Cloud](https://riscocloud.com/) 连接您的报警系统。
这种方式最容易配置，支持也最广泛，但依赖云端并且需要轮询。

:::important
自 2021 年 1 月起，Risco 开始对其云功能收费。

:::
:::tip
建议您在 Risco 应用/网站中使用一个普通账户（非所有者账户），并为此集成使用另一个不同的普通账户。Risco 对不同用户的并发使用有限制，尤其是在权限级别不同的情况下。

:::
会根据事件类别（Status、Alarm、Trouble 和 Other）创建 4 个传感器用于存储事件。每个传感器都会将事件时间戳作为状态，并将其他事件信息存储为属性。

如果您有多个站点，仅会使用第一个站点。

## 本地连接（高级）

该集成会直接在本地连接到您的系统。
这种方式不依赖云端，更新也几乎是即时的，但设置更复杂。
您需要系统的面板访问码（默认是 5678）。此访问码**不是**安装人员/子安装人员代码；对于较旧型号，您可能还需要将系统与云端断开，或设置一个代理，以同时支持本地和云端连接。

本地版集成不支持事件以及 `arming` 状态，但会为每个分区额外提供一个带 `_alarmed` 后缀的二进制传感器，用于指示该分区当前是否正在触发警报。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 选项

您可以在集成面板中点击对应卡片上的 **Options** 来配置额外行为：

```yaml
Require pin code to arm:
  description: 选中后，通过 Home Assistant 布防时需要输入 PIN 码。
Require pin code to disarm:
  description: 选中后，通过 Home Assistant 撤防时需要输入 PIN 码。
How often to poll Risco Cloud (in seconds):
  description: "该值越小，实体反映变化越快，但资源开销也越高。仅在使用 Cloud 时可用，并且只会在高级模式下显示。"
Maximum concurrent requests in Risco local:
  description: "较低值会让集成加载更慢，较高值则可能导致错误。仅在使用 Local 时可用，并且只会在高级模式下显示。"
```

除了这些选项外，您还可以自定义 Home Assistant 报警状态与 Risco 布防模式之间的映射。
这是一个高级配置；除非您正在使用分组布防，否则默认映射通常已经是最佳选择。
这是双向映射，这意味着您可以映射：

* 当 Risco 以特定模式布防时，您的分区实体在 Home Assistant 中应报告什么状态。
* 从 Home Assistant 使用某种模式进行布防时，应使用哪种 Risco 布防模式。请注意，在这一步中，您只能选择与上一步中彼此映射的组合。

默认映射：

|Risco Arming Mode | Home Assistant State |
|---|---|
| Arm (AWAY) | Armed Away |
| Partial Arm (STAY) | Armed Home |
| Group A | Armed Home |
| Group B | Armed Home |
| Group C | Armed Home |
| Group D | Armed Home |

反向映射如下：

| Home Assistant Mode | Risco Arming Mode |
|---|---|
| Arm Away | Arm |
| Arm Home | Partial Arm |

## 支持的平台

* [Alarm control panel](/home-assistant/integrations/alarm_control_panel/index.md)
* [Binary sensor](/home-assistant/integrations/binary_sensor/index.md)
* [Sensor](/home-assistant/integrations/sensor/index.md)
* [Switch](/home-assistant/integrations/switch/index.md)

## 操作

### 设置时间

`risco.set_time` 操作用于在本地连接模式下设置面板时间。

| 数据属性    | 必填 | 说明 |
| ----------------- | -------- | ------------------------------------------------------------------------------------------ |
| `config_entry_id` | 是      | 报警面板的配置项 ID。 |
| `time`            | 否       | 要发送到报警面板的时间。留空则使用 Home Assistant 系统时间。 |
