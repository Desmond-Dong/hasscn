---
title: "文档描述了支持的功能，包括实体和平台"
sidebar_label: 🥇 docs-supported-functions
---

## 原理说明

用户应能够了解该集成将为他们（计划购买的）设备带来什么价值。
这将有助于建立用户的预期。

例如，如果用户正在寻找一款新冰箱，我们应清楚地说明他们能从该集成中获得什么。
如果集成仅支持查看门是开还是关，而用户却期望能看到冰箱温度，那他们将会失望。

## 示例实现

按实体类型排序的示例：

```markdown showLineNumbers
## 支持的功能

### 实体

XY 集成提供以下实体。

#### 按钮

- **Start backflush**
  - **描述**：启动机器的回冲过程。激活后您有 15 秒时间拨动手柄。
  - **适用机器**：所有

#### 数字

- **Dose**
  - **描述**：每个按键的剂量（以刻度为单位）
  - **适用机器**：GS3 AV、Linea Mini
  - **备注**：GS3 会多次出现此项，每个物理按键（1-4）各一次，且这些实体默认为禁用状态。

#### 传感器

- **Current coffee temperature**
  - **描述**：咖啡锅炉的当前温度。
  - **适用机器**：所有
  - **备注**：当机器达到温度时，由于测量点不同，该值将比 `Coffee target temperature` 高约 3 度。

- **Current steam temperature**
  - **描述**：蒸汽锅炉的当前温度。
  - **适用机器**：Linea Micra、GS3 AV、GS3 MP
  - **备注**：-

#### 更新

- **Gateway firmware**
  - **描述**：网关的固件状态。
  - **适用机器**：所有

#### 选择器

- **Prebrew/-infusion mode**
  - **描述**：是否使用 prebrew、preinfusion，或都不使用。
  - **选项**：Disabled、Prebrew、Preinfusion
  - **适用机器**：Linea Micra、Linea Mini、GS3 AV

- **Steam level**
  - **描述**：蒸汽锅炉应运行的档位。
  - **选项**：1、2、3
  - **适用机器**：Linea Micra
```

按设备排序的示例：

```markdown
## 支持的功能

### XYZ 产品名空气净化器、空气加湿器和落地扇

#### 传感器

- **Filter lifetime remaining**：滤网剩余寿命（以年为单位）。默认为启用状态。
- **Purify volume**：已净化空气的体积（以立方米为单位）。默认为禁用状态。

#### 数字

- **Favorite level**：设置偏好档位。可能的取值为 0 到 10。`0` 表示关闭。
- **Volume**：设置音量。以百分比表示。`0%` 表示关闭。
```

## 例外情况

本规则没有例外。
