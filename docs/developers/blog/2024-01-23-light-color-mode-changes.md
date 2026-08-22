---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "lights 显示 effect 时 light color mode 的变更"
---

## 背景

引入 light color modes 的主要原因是 light 的 state 不应含糊不清。例如，一个同时支持 color 和可调节 color temperature 的白色光的 light，必须处于 color mode `hs`（举例）或 `color_temp` 中。

然而，effects 使情况变得复杂，因为当同一盏 light 正在渲染 effect 时，`hs_color`、`color_temp` 或 `brightness` state 属性可能都没有意义。

## 变更

### light 渲染 effect 时，对 `color_mode` 的要求不那么严格

当 effect 激活时，允许使用比 light 通常支持的限制性更高的 color modes：
- 支持 colors 的 light 在被 effect 控制时，允许指示 color modes `on_off` 和 `brightness`
- 支持 brightness 的 light 在被 effect 控制时，允许指示 color mode `on_off`

例如，一个 supported_color_modes 设置为 `{"hs", "color_temp"}` 的 light，在渲染无法调节的 effect 时允许将其 `color_mode` 设置为 `on_off`，在渲染允许控制 brightness 的 effect 时允许设置为 `brightness`。

### 新增了一个表示无 effect / 关闭 effect 的特殊 effect `EFFECT_OFF`

此前，支持 effects 的 light 没有标准方式来表示当前没有 effect 激活。
现在通过添加预定义 effect `EFFECT_OFF` 来解决此问题，用于指示没有 effect 激活。

更多详情可在[文档](/developers/core/entity/light#color-modes)和[架构讨论 #960](https://github.com/home-assistant/architecture/discussions/960)中找到。
