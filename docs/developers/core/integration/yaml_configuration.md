---
title: "通过 YAML 配置集成"
sidebar_label: "YAML 配置"
---

`configuration.yaml` 是由用户定义的配置文件。它由 Home Assistant 在首次启动时自动创建。它定义了要加载哪些组件。

:::info 关于设备和/或服务 YAML 配置的说明

与设备和/或服务通信的集成通过 config flow 进行配置。在极少数情况下，我们可以做例外处理。现有但不应该有 YAML 配置的集成被允许并鼓励实现 config flow 并移除 YAML 支持。对于这些现有集成的 YAML 配置的更改将不再被接受。

更多详细信息请阅读 [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md#decision)
:::

## 预处理

Home Assistant 将根据指定要加载的组件对配置进行一些预处理。

### CONFIG_SCHEMA

如果组件定义了变量 `CONFIG_SCHEMA`，传入的 config 对象将是 config 通过 `CONFIG_SCHEMA` 运行后的结果。`CONFIG_SCHEMA` 应是一个 voluptuous schema。

### PLATFORM_SCHEMA

:::info

下面描述的 platform-key 配置结构（配置列在实体组件 domain 下，如 `switch`）是实体组件的现有机制。新集成不得使用它。根据 [ADR-0007](https://github.com/home-assistant/architecture/blob/master/adr/0007-integration-config-yaml-structure.md)，如果存在，集成的所有 YAML 配置必须放在集成自己的 domain key 下，通过 `discovery.async_load_platform` 加载 platforms。现有集成中 platform 部分中的 YAML 配置在该集成被重构前被冻结。

:::

如果组件定义了变量 `PLATFORM_SCHEMA`，该组件将被视为实体组件。实体组件的配置是一个 platform 配置列表。

Home Assistant 将收集该组件的所有 platform 配置。它会通过在组件的 domain（即 `light`）下以及任何 domain + 附加文本的条目下查找配置条目来完成此操作。

在收集 platform 配置时，Home Assistant 会对其进行验证。它会检查 platform 是否存在，如果 platform 定义了 `PLATFORM_SCHEMA`，则验证是否符合该 schema。如果未定义，则验证配置是否符合组件中定义的 `PLATFORM_SCHEMA`。任何引用不存在的 platforms 或包含无效配置的内容都将被移除。

以下 `configuration.yaml`：

```yaml
unrelated_component:
  some_key: some_value

switch:
  platform: example1

switch living room:
  - platform: example2
    some_config: true
  - platform: invalid_platform
```

将被传递给组件如下：

```python
{
    "unrelated_component": {
        "some_key": "some_value"
    },
    "switch": [
        {
            "platform": "example1"
        },
        {
            "platform": "example2",
            "some_config": True
        }
    ],
}
```
