---
title: 实体注册表
---

Entity registry 是 Home Assistant 用于跟踪实体的注册表。任何添加到 Home Assistant 且指定了 [`unique_id` 属性](/developers/core/entity#generic-properties) 的实体，都会被注册到注册表中。

被注册的好处是，同一个实体始终会获得相同的 entity ID。同时也会阻止其他实体使用该 entity ID。

用户还能够覆盖 entity registry 中实体的名称。当设置时，entity registry 中的名称会优先于设备自身可能给出的名称。

## Unique ID

重要的是用户不能更改 unique ID，因为系统会丢失与 unique ID 相关的所有设置。

实体在注册表中的查找基于 platform 类型（例如 `light`）、集成名称（domain，例如 hue）和实体的 unique ID 的组合。实体不应在它们的 Unique ID 中包含 `domain`（例如 `your_integration`）和 platform 类型（例如 `light`），因为系统已经考虑了这些标识符。

如果一个设备只有一个 unique id 但提供多个实体，请将 unique id 与实体的唯一标识符组合起来。例如，如果一个设备同时测量温度和湿度，你可以使用 `{unique_id}-{sensor_type}` 来唯一标识这些实体。

## Unique ID 要求

### 可接受的 Unique ID 来源示例

- 设备的序列号
- MAC 地址：使用 `homeassistant.helpers.device_registry.format_mac` 格式化；只能从设备 API 或 discovery handler 获取 MAC 地址。依赖读取 arp 缓存或本地网络访问的工具（如 `getmac`）在所有受支持的网络环境中都无法正常工作，因此不被接受。
- 纬度和经度或其他唯一的地理坐标
- 物理印在设备上或烧录在 EEPROM 中的唯一标识符

### 最后手段的 Unique ID

对于通过 config entry 设置的实体，如果无法获取其他 Unique ID，可以使用 `Config Entry ID` 作为最后手段。

### 不可接受的 Unique ID 来源

- IP 地址
- 设备名称
- 主机名
- URL
- 电子邮件地址
- 用户名
