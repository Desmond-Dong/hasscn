---
title: "在棒棒糖模拟器上测试"
description: '要在运行 Lollipop (Android API 21) 的 Android 模拟器上测试应用程序，您需要更新过时的 WebView 以确保兼容性。如果没有此更新，WebView 将崩溃。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: "棒棒糖模拟器"
---
# 在棒棒糖模拟器上测试

## 概述

要在运行 Lollipop (Android API 21) 的 Android 模拟器上测试应用程序，您需要更新过时的 WebView 以确保兼容性。如果没有此更新，WebView 将崩溃。

## 更新 Web 视图

要更新 WebView，请下载最新的 WebView APK 并按照此 [StackOverflow post](https://stackoverflow.com/a/79514205/3289338) 中提供的说明进行操作。

如果您正在构建自己的前端，请在构建过程中将 `ES5` 标志设置为 `1`。这确保了与旧版 WebView 的兼容性。

```bash
ES5=1 script/develop
```