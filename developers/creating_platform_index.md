Home Assistant 有各种内置的 integrations，它们对 device types 进行了抽象。有 [lights](/developers/core/entity/light.md)、[switches](/developers/core/entity/switch.md)、[covers](/developers/core/entity/cover.md)、[climate devices](/developers/core/entity/climate.md)，以及[更多](/developers/core/entity.md)。你的 integration 可以通过创建 platform 来接入这些 integrations。对于你要集成的每一个 integration，你都需要一个 platform。

要创建 platform，你需要创建一个文件，文件名为你为其构建 platform 的 integration 的 domain name。因此，如果你正在构建一个 light，你会在你的 integration folder 中添加一个新文件 `light.py`。

我们创建了两个示例 integrations，可以让你了解其工作原理：

* [Example sensor platform](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_sensor/): platform 的 hello world。
* [Example light platform](https://github.com/home-assistant/example-custom-config/tree/master/custom_components/example_light/): 展示最佳实践。

### 与 devices 交互

Home Assistant 的一条规则是 integration 永远不要直接与 devices 交互。相反，它应该与一个第三方 Python 3 library 交互。这样，Home Assistant 可以与 Python 社区共享代码，并保持项目的可维护性。

一旦你的 Python library [准备就绪并发布到 PyPI](/developers/api_lib_index.md)，将其添加到 [manifest](/developers/creating_integration_manifest.md) 中。现在，是时候实现你为其创建 platform 的 integration 所提供的 Entity base class 了。

在 [entity index](/developers/core/entity.md) 中找到你的 integration，以查看可以实现的 methods 和 properties。
