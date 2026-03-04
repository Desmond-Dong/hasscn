---
title: "概览"
id: "carplay"
---

<img src="/companion-assets/iOS.svg" alt="iOS" style="height: 1em; vertical-align: middle;" />

Home Assistant 提供 CarPlay 体验。这允许您在驾驶时安全地与各种实体交互。

### 设置

要使用此集成，您需要一部 iPhone 以及支持 CarPlay 的车载信息娱乐系统。用 iPhone 登录后，您就可以使用 CarPlay 主屏幕上的 Home Assistant 图标了。

默认情况下，您不会在 CarPlay 中看到任何相关信息，您需要打开 ***伴侣应用设置 → CarPlay***，并创建您的配置。您可以选择要显示的标签页。

### 标签页

CarPlay 有 4 个标签页：

- **快速访问：** 在 CarPlay 配置中，您可以决定在 **快速访问** 标签页上显示哪些实体。

- **区域：** 方便您从家中区域访问实体。
- **控制：** 让您按域分组访问实体。
- **服务器：** 允许您在服务器之间切换。

![CarPlay](/companion-assets/ios/CarPlay.png)

### 支持的可操作域

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`