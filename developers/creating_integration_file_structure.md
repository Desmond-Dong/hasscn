每个集成都存储在一个以其集成 domain 命名的目录中。domain 是由字符和下划线组成的短名称。该 domain 必须唯一，且无法更改。mobile app 集成的 domain 示例：`mobile_app`。因此，该集成的所有文件都在文件夹 `mobile_app/` 中。

该文件夹的最基本内容如下：

* `manifest.json`：manifest 文件描述该集成及其依赖。[更多信息](/developers/creating_integration_manifest.md)
* `__init__.py`：component 文件。如果该集成只提供了一个 platform，可以将此文件限制为一段介绍该集成的 docstring，例如 `"""The Mobile App integration."""`。

## 集成设备 - `light.py`、`switch.py` 等

如果你的集成需要集成一个或多个设备，你需要通过创建一个与实体集成交互的 platform 来实现。例如，如果你想在 Home Assistant 中表示一个灯光设备，就需要创建 `light.py`，其中将包含用于 light 集成的 light platform。

* 更多有关[可用实体集成](/developers/core/entity.md)的信息。
* 更多有关[创建 platform](/developers/creating_platform_index.md)的信息。

## 集成服务动作 - `services.yaml`

如果你的集成需要注册服务动作（service action），它需要提供可用动作的描述。该描述存储在 `services.yaml` 中。[更多有关 `services.yaml` 的信息。](/developers/dev_101_services.md)

## Data update coordinator - `coordinator.py`

你的集成可以通过多种途径接收数据，包括 push 或 poll。通常，集成会通过一次跨所有实体的协调 poll 来获取数据，这需要用到 `DataUpdateCoordinator`。
如果你打算使用它，并且选择创建一个它的子类，建议在 `coordinator.py` 中定义该 coordinator 类。[更多有关 `DataUpdateCoordinator` 的信息](/developers/integration_fetching_data.md#coordinated-single-api-poll-for-data-for-all-entities)。

## Home Assistant 在哪里查找集成

当 Home Assistant 在配置文件中看到对某个 domain 的引用（即 `mobile_app:`），或者它是另一个集成的依赖时，就会查找该集成。Home Assistant 会查看以下位置：

* `<config directory>/custom_components/<domain>`
* `homeassistant/components/<domain>`（内置集成）

你可以在 `<config directory>/custom_components` 文件夹中放置一个与内置集合同名 domain 的集成，从而覆盖内置集成。[当覆盖核心集成时，`manifest.json` 文件要求包含一个 version 标签](/developers/creating_integration_manifest.md#version)。一个被覆盖的核心集成可以通过概览中集成框右上角的特定图标来识别 [![打开你的 Home Assistant 实例并显示你的集成。](https://my.home-assistant.io/badges/integrations.svg)](https://my.home-assistant.io/redirect/integrations/)
注意，不建议覆盖内置集成，因为你不会再收到更新。建议使用一个唯一的名称。

## 品牌图片 - `brand/`

自定义集成可以通过在集成目录中添加 `brand/` 目录来包含其自己的品牌图片。
有关品牌图片及其提供方式的更多信息，请参阅 [品牌图片](/developers/core/integration/brand_images.md)。
