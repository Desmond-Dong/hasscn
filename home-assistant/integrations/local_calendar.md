> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# Local calendar

**Local calendar** 集成可让您在 Home Assistant 中创建事件日历，用于驱动自动化。

日历实体的状态和属性仅表示下一个即将发生的事件。与使用实体状态相比，日历触发器是驱动自动化时更灵活、限制更少的方式。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 日历事件自动化

单个日&#x5386;_&#x4E8B;&#x4EF6;_&#x53EF;用于驱动如下自动化：

- 在名为 _Front Yard Light_ 的事&#x4EF6;_&#x5F00;&#x59CB;_&#x65F6;打开灯光
- &#x5728;_&#x4EFB;何事件开始前 5 分&#x949F;_&#x53D1;送通知
- 在名为 _Exercise_ 的事&#x4EF6;_&#x7ED3;束后 30 分&#x949F;_&#x505C;止媒体播放器

概览请参阅 [Calendar Automations](/home-assistant/integrations/calendar.md#automation)，并阅读 [Calendar Trigger Variables](/home-assistant/docs/automation/templating/index.md#calendar) 了解可在条件或操作中使用的信息，例如事件的 `summary`、`description`、`location` 等。
