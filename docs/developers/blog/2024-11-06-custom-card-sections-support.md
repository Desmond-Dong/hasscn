---
author: piitaya
authorURL: https://github.com/piitaya
authorImageURL: https://avatars.githubusercontent.com/u/5878303?v=4
title: "Sections view 中自定义卡片支持尺寸设置"
---

从 Home Assistant `2024.11` 起，"sections" view 已成为构建 dashboard 时的默认视图。该视图类型的新特性之一是调整卡片尺寸。

虽然调整尺寸功能默认支持所有卡片，但自定义卡片可以实现一个新方法，以提供最佳的默认尺寸以及最小和最大尺寸，确保卡片在任何情况下看起来都良好。

sections 使用 12 列网格。在下面的示例中，卡片默认占用 6 列 2 行，最小尺寸为 2 列 x 2 行。

```js
public getGridOptions() {
  return {
    rows: 2,
    columns: 6,
    min_rows: 2,
    min_columns: 3,
  };
}
```

更多详情请参阅 [custom card sizing](/developers/frontend/custom-ui/custom-card#sizing-in-sections-view) 文档。