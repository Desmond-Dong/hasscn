# Local calendar

**Local calendar** 集成可让您在 Home Assistant 中创建事件日历，用于驱动自动化。

日历实体的状态和属性仅表示下一个即将发生的事件。与使用实体状态相比，日历触发器是驱动自动化时更灵活、限制更少的方式。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 日历事件自动化

单个日历*事件*可用于驱动如下自动化：

* 在名为 *Front Yard Light* 的事件*开始*时打开灯光
* 在*任何事件开始前 5 分钟*发送通知
* 在名为 *Exercise* 的事件*结束后 30 分钟*停止媒体播放器

概览请参阅 [Calendar Automations](/home-assistant/integrations/calendar.md#automation)，并阅读 [Calendar Trigger Variables](/home-assistant/docs/automation/templating/index.md#calendar) 了解可在条件或操作中使用的信息，例如事件的 `summary`、`description`、`location` 等。
