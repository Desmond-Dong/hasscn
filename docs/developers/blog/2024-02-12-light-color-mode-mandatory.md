---
author: Erik Montnémery
authorURL: https://github.com/emontnemery
title: "lights 现在必须设置 color mode"
---

## 变更

Light entities 现在必须设置 `supported_color_modes` 和 `color_mode` 属性，如果没有这样做，将记录警告并提示用户报告 issue。

此外，如果 light 报告了无效的 `supported_color_modes` 组合，或报告了 `ColorMode.UNKNOWN` 以外的、未包含在 light 的 `supported_color_modes` 中的 `color_mode`，也将记录警告。

在 Home Assistant 2025.3 版本中，警告将被移除，仍未升级到 color mode 或违反 color mode 规则的 lights 将不再工作。

更多详情可在[文档](/developers/core/entity/light#color-modes)中找到。
