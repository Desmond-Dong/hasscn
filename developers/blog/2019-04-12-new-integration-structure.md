我们已经完成了[伟大的迁移](/developers/blog/2019-02-19-the-great-migration.md)。结果将作为 Home Assistant 0.92 的一部分发布。由于我们有大量的问题需要修复，发布时间略有延迟！随着迁移的完成，我们现在将共享相同名称的 components 和 platforms 视为同一个 integration。每个 integration 要么是一个单一的 Python 文件，要么是一个包含 `__init__.py` 文件的文件夹。我们已更新文档，并引入了一个新的[ integrations 章节](/developers/creating_integration_file_structure.md)。

Home Assistant 0.92 为 integrations 引入了一个新的 [`manifest.json`](/developers/creating_integration_manifest.md)。此文件对 custom components 是可选的，用于指定元数据：名称、文档链接、dependencies、requirements 和 code owners。我们正在探索利用 `manifest.json` 实现更多未来功能，如跟踪 breaking changes，或允许 custom components 提供 config flows 并被 discovered。

随着所有这些变更，我们必须移除一些已弃用的内容并更改一些行为：

* Platforms 不再可以放在 entity component 的目录中，如 `light/my_platform.py`。相反，在你的 custom\_components 中创建一个新的 `my_platform` 文件夹，创建一个空的 `__init__.py` 文件，并将 `light/my_platform.py` 移动到 `my_platform/light.py`。
* Platforms 不再能够拥有 dependencies 或 requirements。相反，在 `my_platform` 文件夹中创建一个 [`manifest.json`](/developers/creating_integration_manifest.md) 来指定它们，或者在 `__init__.py` 文件中添加 `REQUIREMENTS` 或 `DEPENDENCIES` 常量。
* Platform 现在总是要求在可用时先设置好 component。
* 不再能够为包含在单个 Python 文件中的 component 提供 translations。将它们转换为[目录形式](/developers/creating_integration_file_structure.md)的 integration。
* 如果你想覆盖一个内置 integration，你需要为你的 custom integration 指定一个 `manifest.json`。请注意，我们强烈不鼓励覆盖内置 integration。相反，如果你想运行带有自定义更改的 integration，请更改 integration 名称。例如，如果你想运行一个 MQTT integration 的自定义版本（在 Home Assistant 中名为 `mqtt`）：
  * 将 [Home Assistant 仓库](https://github.com/home-assistant/core/tree/dev/homeassistant/components/mqtt) 中 `mqtt` 文件夹的内容复制到新文件夹 `<config>/custom_components/mqtt_custom/`
  * 打开 `mqtt_custom/manifest.json`，将 `domain` 的值从 `mqtt` 改为 `mqtt_custom`
  * 打开 `mqtt_custom/__init__.py`，将 `DOMAIN` 的值从 `mqtt` 改为 `mqtt_custom`
  * 在配置中所有引用 `mqtt` 的地方，改为引用 `mqtt_custom`。例如，使用 `mqtt_custom:` 来指定 host，在指定 platform 时使用 `platform: mqtt_custom`。
