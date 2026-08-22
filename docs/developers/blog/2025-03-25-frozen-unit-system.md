---
author: Shay Levy
authorURL: https://github.com/thecode
title: "UnitSystem dataclass 现已冻结"
---

`UnitSystem` 类已更改为冻结的 data class，所有派生自它的实例现在也是冻结的。

以下派生自 `UnitSystem` 类的 unit system 现在已冻结：

- `METRIC_SYSTEM`
- `US_CUSTOMARY_SYSTEM`

进行此项变更的原因是，Unit system 是不应被修改的常量。修改这些常量的集成可能会破坏 unit 转换，并导致 Home Assistant 其他组件产生不期望的输出。

使用冻结的 data class 时，尝试修改 UnitSystem 常量将会失败：

```python
dataclasses.FrozenInstanceError: cannot assign to field 'temperature_unit'
```

此项变更引入于 [home assistant core PR #140954](https://github.com/home-assistant/core/pull/140954)。