---
title: "集成平台"
sidebar_label: "平台"
---

Home Assistant 内置了多种用于抽象设备类型的实体平台，例如[灯](/developers/core/entity/light)、[开关](/developers/core/entity/switch)、[cover](/developers/core/entity/cover)、[气候设备](/developers/core/entity/climate)以及[更多实体类型](/developers/core/entity)。您的集成可以通过创建平台来接入这些实体类型。对于要支持的每一种实体类型，通常都需要对应的一个平台。

要创建平台，您需要在集成目录中创建一个与实体类型同名的文件。例如，如果要实现灯实体，就需要在集成目录中添加 `light.py`。

我们提供了两个示例集成，帮助您理解其工作方式：

- [传感器示例平台](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_sensor/)：平台的入门示例。
- [灯平台示例](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_light/)：展示最佳实践。

### 与设备交互

Home Assistant 的一项原则是，集成不应直接连接设备，而应通过第三方 Python 3 库与设备交互。这样可以与 Python 社区共享代码，并提升项目的可维护性。

在您的 Python 库[准备完成并发布到 PyPI](/developers/api_lib_index)后，请将其添加到[manifest](/developers/creating_integration_manifest) 中。接下来，就可以开始实现对应实体类型的基类，并为该实体类型编写平台代码。

您可以在[实体索引](/developers/core/entity)中查看各类实体可实现的方法与属性。
