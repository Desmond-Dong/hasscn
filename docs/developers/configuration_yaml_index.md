---
title: "通过 YAML 进行集成配置"
---

`configuration.yaml` 是由用户定义的配置文件。Home Assistant 会在首次启动时自动创建它。它用于定义要加载哪些组件。

:::info 关于设备和/或服务 YAML 的说明

与设备和/或服务通信的集成应通过配置流程进行配置。在极少数情况下，我们可以作出例外。对于那些本不应提供 YAML 配置的现有集成，允许并鼓励其实现配置流程并移除 YAML 支持。对于这些现有集成，其现有 YAML 配置的变更将不再被接受。

更多细节请阅读 [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md#decision)
:::

## 预处理

Home Assistant 会根据指定要加载的组件，对配置进行一些预处理。

### CONFIG_SCHEMA

如果组件定义了变量 `CONFIG_SCHEMA`，则传入的 config 对象将是配置经过 `CONFIG_SCHEMA` 处理后的结果。`CONFIG_SCHEMA` 应当是一个 voluptuous schema。

### PLATFORM_SCHEMA

如果组件定义了变量 `PLATFORM_SCHEMA`，该组件将被视为实体组件。实体组件的配置是一个平台配置列表。

Home Assistant 会收集该组件的所有平台配置。它不仅会查找位于组件 domain（例如 `light`）下的配置项，也会查找任何采用“domain + 额外文本”形式的配置项。

在收集平台配置时，Home Assistant 会对其进行验证。它会检查平台是否存在；如果平台定义了 `PLATFORM_SCHEMA`，则会依据该 schema 进行验证。若未定义，则会依据组件中定义的 `PLATFORM_SCHEMA` 来验证配置。任何引用不存在平台或包含无效配置的配置项都会被移除。

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

将会以如下形式传递给组件

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
