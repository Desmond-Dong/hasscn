---
title: "添加状态卡片"
description: 'Home Assistant 的主界面是当前实体及其状态的列表。系统中的每个实体都会渲染一个 state card。State cards 会显示图标、实体名称、状态上次变化的时间，以及当前状态或与之交互的控件。 本页属于 Home Assistant 开发者文档。'
---
# 添加状态卡片

Home Assistant 的主界面是当前实体及其状态的列表。系统中的每个实体都会渲染一个 state card。State cards 会显示图标、实体名称、状态上次变化的时间，以及当前状态或与之交互的控件。

![Cards in the frontend](/developers/img/en/frontend/frontend-cards1.png)

不同的 card 类型可在[这里](https://github.com/home-assistant/frontend/tree/dev/src/state-summary)找到。

未分组的 sensors 会显示为所谓的 badges，位于 state cards 顶部。

![Badges in the frontend](/developers/img/en/frontend/frontend-badges.png)

不同的 badges 位于文件 [`/src/components/entity/ha-state-label-badge.ts`](https://github.com/home-assistant/frontend/blob/dev/src/components/entity/ha-state-label-badge.ts) 中。

添加一个自定义 card 类型只需几个简单步骤。这个示例将为 `camera` domain 添加一个新的 state card：

  1. 在文件 [/common/const.ts](https://github.com/home-assistant/frontend/blob/dev/src/common/const.ts) 中，将 `'camera'` 添加到数组 `DOMAINS_WITH_CARD`。
  2. 在文件夹 [/state-summary/](https://github.com/home-assistant/frontend/tree/dev/src/state-summary) 中创建文件 `state-card-camera.ts`。
  3. 在 [state-card-content.ts](https://github.com/home-assistant/frontend/blob/dev/src/state-summary/state-card-content.ts) 中添加 `import './state-card-camera.ts';`。
