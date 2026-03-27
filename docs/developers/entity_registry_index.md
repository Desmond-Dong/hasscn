---
title: 实体注册表
description: '实体注册表是 Home Assistant 用于跟踪实体的注册表。任何添加到 Home Assistant 的实体，只要指定了uniqueid 属性(/developers/core/entitygeneric-properties)，就会在注册表中登记。'
---
# 实体注册表

实体注册表是 Home Assistant 用于跟踪实体的注册表。任何添加到 Home Assistant 的实体，只要指定了[`unique_id` 属性](/developers/core/entity#generic-properties)，就会在注册表中登记。

注册的优点是同一个实体始终会获得相同的实体 ID，也会阻止其他实体使用该实体 ID。

用户还可以覆盖实体注册表中实体的名称。设置后，实体注册表中的名称将用于代替设备可能给自己指定的名称。

## 唯一ID

重要的是，用户不可能更改唯一 ID，因为系统将丢失与唯一 ID 相关的所有设置。

注册表会根据平台类型（例如 `light`）、集成名称（域）（例如 hue）以及实体的唯一 ID 组合来查找实体。实体不应在其唯一 ID 中包含 `domain`（例如 `your_integration`）和平台类型（例如 `light`），因为系统已经考虑了这些标识符。

如果设备具有单个唯一 ID，但提供多个实体，则应将唯一 ID 与实体的唯一标识符组合。例如，如果设备同时测量温度和湿度，则可以使用 `{unique_id}-{sensor_type}` 唯一标识实体。

## 唯一 ID 请求UIrements

### 唯一 ID 可接受的来源示例

- 设备的序列号
- MAC 地址：使用 `homeassistant.helpers.device_registry.format_mac` 格式；仅从设备 API 或发现处理程序获取 MAC 地址。依赖读取 arp 缓存或本地网络访问（例如 `getmac`）的工具无法在所有受支持的网络环境中运行，因此不可接受。
- 纬度和经度或其他独特的地理位置
- 物理打印在设备上或烧录到 EEPROM 中的唯一标识符

### 最后手段的唯一ID

对于由配置条目设置的实体，如果没有其他唯一 ID 可用，则可以使用 `Config Entry ID` 作为最后的手段。

### 唯一 ID 的不可接受来源

- IP地址
- 设备名称
- 主机名
- 网址
- 电子邮件地址
- 用户名
