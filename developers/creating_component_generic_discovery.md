# 包含多个平台的集成

大多数集成都只包含一个平台，这种情况下只需定义单个平台即可。但如果您要添加第二个平台，就需要将连接逻辑集中起来处理，这通常在集成入口文件 `__init__.py` 中完成。

如果您的集成通过 `configuration.yaml` 配置，那么配置入口点也会发生变化：用户配置的是您的集成本身，再由集成去负责加载对应的平台。

## 通过配置条目加载平台

如果您的集成通过配置条目设置，那么需要把配置条目转发到对应的平台，以完成平台初始化。更多信息请参阅[配置条目文档](/developers/config_entries_index.md#for-platforms)。

## 通过 `configuration.yaml` 加载平台

如果您的集成不使用配置条目，则必须使用 discovery helper 来加载平台。请注意，这种方式不支持卸载。

为此，您需要使用 discovery helper 中的 `load_platform` 和 `async_load_platform` 方法。

* 另请参阅[实现该逻辑的完整示例](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_load_platform/)
