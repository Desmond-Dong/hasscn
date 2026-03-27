---
title: "添加更多信息对话框"
description: '当用户点按或点击任意 card 时，会显示一个 more info dialog。该对话框的头部会是 state card，后面跟着该实体最近 24 小时的历史记录。其下方会渲染该实体的 more info 组件。more info 组件可以显示更多信息，或提供更多控制方式。'
---
# 添加更多信息对话框

当用户点按或点击任意 card 时，会显示一个 more info dialog。该对话框的头部会是 state card，后面跟着该实体最近 24 小时的历史记录。其下方会渲染该实体的 more info 组件。more info 组件可以显示更多信息，或提供更多控制方式。

<img
  src='/developers/img/en/frontend/frontend-more-info-light.png'
  alt='灯光的 more info dialog 允许用户控制颜色和亮度。'
/>

添加 more info dialog 的说明与添加新 card 类型非常相似。这个示例将为 `camera` domain 添加一个新的 more info 组件：

  1. 在文件 [/common/const.ts](https://github.com/home-assistant/frontend/blob/dev/src/common/const.ts) 中，将 `'camera'` 添加到数组 `DOMAINS_WITH_MORE_INFO`。
  2. 在文件夹 [/dialogs/more-info/controls](https://github.com/home-assistant/frontend/tree/dev/src/dialogs/more-info/controls) 中创建文件 `more-info-camera.js`。
  3. 在 [/dialogs/more-info/more-info-content.ts](https://github.com/home-assistant/frontend/blob/dev/src/dialogs/more-info/more-info-content.ts) 中添加 `import './more-info-camera.js';`
