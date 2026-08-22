每当用户点击或选中一张卡片时，都会显示一个 more info 对话框。此对话框的 header 将是 state card，紧接着是过去 24 小时该 entity 的历史记录。在这之下会渲染该 entity 的 more info component。More info component 可以显示更多信息或允许更多的控制方式。

<img
src='/img/en/frontend/frontend-more-info-light.png'
alt='一个 light 的 more info 对话框允许用户控制颜色和亮度。'
/>

添加 more info 对话框的说明与添加新的卡片类型非常相似。本示例将为 domain `camera` 添加一个新的 more info component：

1. 在文件 [/common/const.ts](https://github.com/home-assistant/frontend/blob/dev/src/common/const.ts) 中，将 `'camera'` 添加到数组 `DOMAINS_WITH_MORE_INFO`。
2. 在文件夹 [/dialogs/more-info/controls](https://github.com/home-assistant/frontend/tree/dev/src/dialogs/more-info/controls) 中创建文件 `more-info-camera.js`。
3. 在 [/dialogs/more-info/more-info-content.ts](https://github.com/home-assistant/frontend/blob/dev/src/dialogs/more-info/more-info-content.ts) 中添加 `import './more-info-camera.js';`
