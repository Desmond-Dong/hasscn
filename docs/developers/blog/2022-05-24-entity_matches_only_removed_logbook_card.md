---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: "Logbook API 移除 entity_matches_only 标志"
---

在 2022.6 之前，`entity_matches_only` 标志阻止 logbook 提供 context data，以换取在查询特定实体时的性能提升。采用新的 logbook 设计后，为特定实体选择 context data 不再是一个密集过程。无需立即采取行动，因为该标志将被忽略，你可以在方便时从任何活动代码路径中移除该标志。
