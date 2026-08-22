---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: 伟大的迁移
---

Home Assistant 建立在 components 之上。其中一类 component 为某类设备（如 lights、switches 或 media players）提供 entity 抽象。从历史上看，要与这些抽象集成，你需要为该 component 创建一个 platform。如果 light component 是 `light/`，那么集成就会创建自己的 platform，如 `light/hue.py`。这样，所有与 lights 相关的逻辑就被集中在了一起。

随着 Home Assistant 的发展，我们集成的设备/服务的能力和规模也随之增长。现在，一个集成不再仅仅是某个 entity component 的 platform，而是五个 platform + 一个用于管理连接的 component。当集成变得如此庞大时，将文件分散在 `light/zwave.py`、`switch/zwave.py`、`cover/zwave.py` 等位置就变成了维护的噩梦。这也使得 custom components 的分发更加困难，因为现在用户需要在不同文件夹下创建文件。

因此，从 Home Assistant 0.87 开始，我们启动了迁移。我们不再像 `light/hue.py` 那样查找 entity component 的 platform，而是改为 `hue/light.py` 的形式。文件内容保持完全一致。通过将文件移出 entity component 文件夹，我们还能够将大型 entity component 拆分成多个文件，以提升可维护性。

这一变更在很大程度上是向后兼容的，但对 custom components 有一个小的 breaking change：如果你要覆盖一个内置 platform，现在必须使用新的 `hue/light.py` 文件名格式。

随着集成文件整合到单个文件夹中，我们还要强制实施一项新规则：所有 platform 都将从与 component 相同的来源加载。这意味着，如果你想要用自己的版本覆盖一个内置 component/platform，你需要复制所有的 component 和 platform 文件，而不仅仅是要加载的那一个。这样做可以防止 custom platforms 或 components 在 Home Assistant 升级移动内部文件/值时出现问题。

## 对 custom component 开发者的说明

- Components 创建在 `<config>/custom_components/<integration name>/`。务必在该文件夹中至少创建一个空的 `__init__.py` 文件。
- 如果你为某个 entity component 编写 platform，将其放在以 integration 命名的文件夹中：`<integration name>/light.py`
- 如果你想分享修改过的 Home Assistant integration 版本，请复制 ALL 文件。为用户着想，使用相对导入以避免升级时组件出现问题的发生。相对导入的示例：`from . import DATA_BRIDGE`。

## 资源

相关的架构议题：

 - [Embedded platforms and the road to packaged components](https://github.com/home-assistant/architecture/issues/124)
 - [Disable partial custom component overlays](https://github.com/home-assistant/architecture/issues/141)
 - [Config structure for embedded platforms](https://github.com/home-assistant/architecture/issues/142)