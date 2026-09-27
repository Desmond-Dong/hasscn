排除 state 属性不参与 recording 的方式已发生改变。

recorder platform 已被两个新属性所取代，可在从 `Entity` 派生的类中设置：

* `_entity_component_unrecorded_attributes: frozenset[str]` - 应由 base component entity 类（例如 `LightEntity`）设置
* `_unrecorded_attributes: frozenset[str]` - 应由派生 platform 类（例如 `HueLight`）设置，以排除额外的、集成特有的属性不参与 recording

更多详情可在[entity 文档](/developers/core/entity.md#excluding-state-attributes-from-recorder-history)中找到。

变更的背景在[架构讨论 #964](https://github.com/home-assistant/architecture/discussions/964)中。
