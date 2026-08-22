---
title: "在 Lollipop 模拟器上测试"
sidebar_label: "Lollipop 模拟器"
---

## 概述

要在运行 Lollipop（Android API 21）的 Android 模拟器上测试应用，你需要更新过时的 WebView 以确保兼容性。如果不更新，WebView 将会崩溃。

## 更新 WebView

要更新 WebView，请下载最新的 WebView APK 并遵循此 [StackOverflow 帖子](https://stackoverflow.com/a/79514205/3289338)中的说明。

如果你正在构建自己的 frontend，请在构建过程中将 `ES5` 标志设置为 `1`。这确保与旧版 WebView 的兼容性。

```bash
ES5=1 script/develop
```
