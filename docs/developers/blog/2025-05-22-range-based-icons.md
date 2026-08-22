---
author: Frenck
authorURL: https://github.com/frenck
authorTwitter: frenck
title: "图标翻译现已支持范围"
---

图标翻译现在支持基于数值范围定义图标。这意味着集成作者可以定义根据数值变化的图标，而无需在代码中实现自定义逻辑。

以前，图标翻译仅支持基于 state 的图标，即特定的 state 映射到特定的图标。虽然这对"on"/"off"等离散状态效果很好，但处理电池电量或信号强度等数值时，需要自定义代码。

基于范围的图标定义在 `icons.json` 文件中：

```json
{
  "entity": {
    "sensor": {
      "battery_level": {
        "default": "mdi:battery",
        "range": {
          "0": "mdi:battery-outline",
          "10": "mdi:battery-10",
          "20": "mdi:battery-20",
          "30": "mdi:battery-30",
          "40": "mdi:battery-40",
          "50": "mdi:battery-50",
          "60": "mdi:battery-60",
          "70": "mdi:battery-70",
          "80": "mdi:battery-80",
          "90": "mdi:battery-90",
          "100": "mdi:battery"
        }
      }
    }
  }
}
```

系统会选择与小于或等于 entity 当前值的高范围值相关联的图标。例如：

- 值为 15 时显示 `mdi:battery-10` 图标
- 值为 45 时显示 `mdi:battery-40` 图标
- 值为 100 时显示 `mdi:battery` 图标

关于实现细节，请参阅[图标翻译文档](/developers/core/integration-quality-scale/rules/icon-translations#range-based-icons)。