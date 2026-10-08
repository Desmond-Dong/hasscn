# 此实体没有唯一 ID？

如果您尝试在 Home Assistant 中访问某个实体的配置对话框，可能会看到以下消息：

![无唯一 ID 弹窗截图](/home-assistant/images/faq/faq_no_unique_id.jpg)

这意味着该实体没有唯一标识符，例如序列号或其他保证静态且永不变的标识符。因此，无法通过用户界面更改各种设置（如实体 ID、图标、友好名称等）的常规编辑过程在此不适用。

通常，当您使用 YAML 手动创建实体时会看到此消息，但如果提供该实体的集成无法确定唯一 ID，也可能出现此情况。这不是错误，而是您所使用集成的限制。少数集成（如 [`template`](/home-assistant/integrations/template/index.md) 和 [`mqtt`](/home-assistant/integrations/mqtt/index.md)）允许您定义唯一 ID。

### 用在哪里？

**唯一 ID：**

* 仅在 Home Assistant 内部使用。

**实体 ID：**

* 具有唯一 ID 的实体：实体 ID 仅用作引用，例如在自动化或仪表盘中。
* 没有唯一 ID 的实体：实体 ID 作为不存在唯一 ID 的替代，同时也作为引用，例如在自动化或仪表盘中。

### 可以更改吗？

**唯一 ID：**

* 不可以。它是一个静态标识符。

**实体 ID：**

* 具有唯一 ID 的实体：实体 ID 可以自由调整（只要遵循格式 `<domain>.<id>` 且不会在 Home Assistant 中产生重复）。请注意，如果您更改实体 ID，还需要更新引用，例如在自动化和仪表盘中。<br>
* 没有唯一 ID 的实体：实体 ID 被视为固定的静态标识符，无法更改。

如果您的实体没有唯一 ID，因此无法通过 UI 更改，可以通过 YAML 文件直接进行一些[手动自定义选项](/home-assistant/docs/configuration/customizing-devices.md)。

### 我可以自己添加唯一 ID 吗？

不可以，作为最终用户，您无法为没有唯一 ID 的实体添加唯一 ID。唯一 ID 是必须由集成本身提供的功能。这是因为唯一 ID 需要在重启后保持持久性，并应始终标识相同的物理设备或服务。

如果某个集成目前不为其实体提供唯一 ID，这意味着该集成可能需要进行现代化改造以包含此功能。但是，提供唯一 ID 目前并非所有集成的强制性要求。

Home Assistant 项目始终欢迎通过代码贡献来增强集成的这项能力。如果您有兴趣改进集成以提供唯一 ID，可以向 Home Assistant 项目贡献代码。有关贡献的更多信息，请访问[开发者文档](https://developers.home-assistant.io/docs/development_index)。

如果您想进一步了解唯一 ID，请前往[开发者文档页面](https://developers.home-assistant.io/docs/entity_registry_index/)。
