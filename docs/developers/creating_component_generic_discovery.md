---
title: "多平台集成"
sidebar_label: 多个平台
---

大多数集成只包含单个平台。在这种情况下，只需定义该平台即可。但是，如果你要添加第二个平台，就需要将连接逻辑集中管理。这需要在组件（`__init__.py`）内部完成。

如果你的集成可以通过 `configuration.yaml` 配置，那么你的配置入口点将会发生变化，因为用户现在需要直接设置你的集成，而平台的设置则由你的集成负责。

## 通过 config entry 配置时加载平台

如果你的集成通过 config entry 设置，你需要将 config entry 转发给相应的集成以设置你的平台。更多信息，请参阅 [config entry 文档](config_entries_index.md#for-platforms)。

## 通过 configuration.yaml 配置时加载平台

如果你的集成没有使用 config entries，则需要使用我们的 discovery helpers 来设置平台。注意，这种方式不支持卸载。

为此，你需要使用 discovery helper 中的 `load_platform` 和 `async_load_platform` 方法。

- 参见一个[实现此逻辑的完整示例](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_load_platform/)
