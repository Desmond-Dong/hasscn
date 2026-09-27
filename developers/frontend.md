Home Assistant 前端允许用户浏览和控制其房屋的状态，管理自动化并配置集成。

前端被设计为 mobile-first 的体验。它是一个 progressive web application，为用户提供了类似 app 的体验。

Home Assistant 前端需要快速响应。但它也需要在大量老旧设备上工作。为此，我们发布两个版本的前端：

* **Latest:** 此构建版本兼容最新两个版本的 evergreen 浏览器，并针对速度进行了优化。
* **ES5:** 此构建版本兼容近 5+ 年来发布的浏览器，并针对兼容性进行了优化。

运行最新技术的设备未必就快。你可以买到运行最新 Android 版本、可访问最新 Firefox 和 Chrome 浏览器，但搭载低功耗芯片组和有限内存的廉价 Android 手机。我们的 latest 构建也需要在这些设备上流畅运行。

若要深入了解我们的前端及其设计选择，请参见[这篇博客](/developers/blog/2019-05-22-internet-of-things-and-the-modern-web.md)。

![Home Assistant 前端截图](/img/en/frontend/frontend-hero.png)
