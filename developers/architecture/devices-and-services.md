集成可以在 Home Assistant 中表示设备与服务。数据点以实体（entities）的形式表示。实体由 `light`、`switch` 等其他集成进行标准化。标准化实体附带用于控制的 actions，但集成也可以提供自己的 service actions，以应对尚未标准化的功能。

实体封装了 Home Assistant 的内部工作机制。作为集成开发者，你无需关心 service actions 或状态机是如何工作的。你只需扩展一个实体类，并为所集成的设备类型实现必要的属性和方法。

<img className='invertDark'
src='/img/en/architecture/integrating-devices-services.svg'
alt='集成设备与服务' />

<!--
  https://docs.google.com/drawings/d/1oysZ1VMcPPuyKhY4tequsBWcblDdLydbWxlu6bH6678/edit?usp=sharing
-->

配置由用户通过 [Config Entry](/developers/config_entries_index.md) 提供，或在特殊/遗留场景下通过 [configuration.yaml](/developers/core/integration/yaml_configuration.md) 提供。

设备集成（即 `hue`）将使用此配置与设备/服务建立连接。它会将 config entry 转发（遗留方式使用 discovery helper）以在各自的集成（light、switch）中设置实体。设备集成还可以为尚未标准化的功能注册自己的 service actions。这些 actions 发布在集成的 domain 下，例如 `hue.activate_scene`。

实体集成（即 `light`）负责定义抽象实体类以及用于控制实体的 services。

Entity Component 辅助类负责将配置分发到各平台，转发 discovery 并收集实体以执行 service calls。

Entity Platform 辅助类管理该平台的所有实体，并在必要时对其进行轮询以获取更新。在添加实体时，Entity Platform 负责将实体注册到设备和实体注册表中。

集成平台（即 `hue.light`）使用配置来查询外部设备/服务并创建待添加的实体。集成平台还可以注册 entity services。这些 services 将作用于设备集成中该实体集成下的所有实体（即所有 Hue 灯的实体）。这些 services 发布在设备集成的 domain 下。

## 实体与 Home Assistant Core 的交互

继承自实体基类的集成实体类负责获取数据和处理 service calls。如果禁用了轮询，它还负责在数据可用时通知 Home Assistant。

<img className='invertDark'
src='/img/en/architecture/entity-core-interaction.svg'
alt='实体与核心交互' />

<!--
  https://docs.google.com/drawings/d/12Z0t6hriYrQZ2L5Ou7BVhPDd9iGvOvFiGniX5sgqsE4/edit?usp=sharing
-->

实体基类（由实体集成定义）负责格式化数据并将其写入状态机。

对于当前没有实体对象支持的任何已注册实体，实体注册表将写入 `unavailable` 状态。

## 实体数据层级

\<img className='invertDark'
style={{maxWidth: "200px"}}
src='/img/en/architecture/entity-data-hierarchy.svg'
alt='实体层级' />

<!--
  https://docs.google.com/drawings/d/1TorZABszaj3m7tgTyf-EMrheYCj3HAvwXB8YmJW5NZ4/edit?usp=sharing
-->

删除、禁用或重新启用任何对象，其下方的所有对象都将相应调整。
