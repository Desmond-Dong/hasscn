---
title: "文档应说明所支持的功能，包括实体和平台"
---

## 理由

用户应当能够了解某个集成会为他们的设备带来哪些价值，这也有助于建立合理预期。

例如，如果用户正在挑选一台新冰箱，我们应尽量清楚说明该集成能提供哪些功能。
如果集成只支持检查门的开关状态，而用户期望查看冰箱温度，他们就会感到失望。

## 实现示例

示例一：按实体类型排序。

```markdown showLineNumbers
## Supported functionality

### Entities

The XY integration provides the following entities.

#### Buttons

- **Start backflush**
  - **Description**: Starts the backflush process on your machine. You got 15 seconds to turn the paddle after activation.
  - **Available for machines**: all

#### Numbers

- **Dose**
  - **Description**: Dosage (in ticks) for each key
  - **Available for machines**: GS3 AV, Linea Mini.
  - **Remarks**: GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default.

#### Sensors

- **Current coffee temperature**
  - **Description**: Current temperature of the coffee boiler.
  - **Available for machines**: all
  - **Remarks**: When the machine reaches temperature, this will be approximately 3 degrees higher than the `Coffee target temperature`, due to different measurement points.

- **Current steam temperature**
  - **Description**: Current temperature of the steam boiler.
  - **Available for machines**: Linea Micra, GS3 AV, GS3 MP.
  - **Remarks**: -

#### Updates

- **Gateway firmware**
  - **Description**: Firmware status of the gateway.
  - **Available for machines**: all

#### Selects

- **Prebrew/-infusion mode**
  - **Description**: Whether to use prebrew, preinfusion, or neither.
  - **Options**: Disabled, Prebrew, Preinfusion
  - **Available for machines**: Linea Micra, Linea Mini, GS3 AV

- **Steam level**
  - **Description**: The level your steam boiler should run at.
  - **Options**: 1, 2, 3
  - **Available for machines**: Linea Micra
```

示例二：按设备排序。

```markdown
## Supported functionality

### XYZ productname Air Purifier, Air Humidifier and Standing Fan

#### Sensors

- **Filter lifetime remaining**: The remaining life of the filter in number of years. Enabled by default.
- **Purify volume**: The volume of purified air in cubic meters. Disabled by default.

#### Numbers

- **Favorite level**: Set the favorite level. Possible values are 0 to 10. `0` means it is turned off.)
- **Volume**: Set the volume. In percent. `0%` means it is off.
```

## 例外

此规则没有例外。
