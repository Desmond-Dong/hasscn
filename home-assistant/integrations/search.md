# Search

**Search** 集成是 Home Assistant Core 内部使用的集成。

Home Assistant 中存储的所有数据彼此互相关联，因此可视为一个图结构。
这意味着它可以按图结构进行搜索。

此集成允许 Home Assistant 内部搜索区域、设备、实体、配置条目、[场景](/home-assistant/integrations/scene/index.md)、[脚本](/home-assistant/integrations/script/index.md) 和 [自动化](/home-assistant/integrations/automation/index.md) 等对象之间的关系。

目前，这些关系会显示在更多信息对话框中的 “Related” 选项卡，以及设备信息页面中。

Search 集成会随 Home Assistant 前端自动加载，无需单独配置。
