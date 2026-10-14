## Android 目标

本文档概述了 Home Assistant 应用支持的各种 Android 目标。每个目标都有自己特定的要求和注意事项。

## 📱 应用（主要目标）

主要目标基于 Gradle `:app` 模块。它支持**最低 API 级别 21**。这是大多数用户主要使用的应用。

## 🚗 Automotive

Automotive 目标也基于 `:app` 模块，但包含了专门为 automotive 用例定制的 manifest 条目。它与主应用共享相同的源代码，并支持**最低 API 级别 29**。

## 📺 TV

该应用可以安装到 Android TV 上，尽管目前的导航体验并不理想。为了提供更好的体验，需要专门的 Gradle 模块和改进的导航支持。

## ⌚ Wear OS

Wear OS 目标将 Home Assistant 功能带入可穿戴设备。它支持**最低 API 级别 26**。它是一个**独立的应用**，但在 onboarding 和连接到服务器时需要移动应用。
