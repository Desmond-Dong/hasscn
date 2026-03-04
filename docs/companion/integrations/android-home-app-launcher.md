---
title: "Android 主屏幕应用（启动器）"
id: 'android-home-app-launcher'
---

<img src="/companion-assets/android.svg" alt="Android" style="height: 1em; vertical-align: middle;" />

Home Assistant 伴侣应用可以设置为设备的默认主屏幕应用（启动器）。这会将您的 Android 设备变成专用的 Home Assistant 控制面板，非常适合壁挂式平板电脑或信息亭。

## 什么是主屏幕应用？

主屏幕应用（也称为"启动器"）是您按下主页按钮时显示的应用。通过将 Home Assistant 设置为您的主屏幕应用，您的设备会直接启动到 Home Assistant，使其成为专用智能家居控制的理想选择。

## 使用场景

- 壁挂式平板电脑：为您的家创建一个专用控制面板。
- 厨房显示屏：快速访问计时器、购物清单和家居控制。
- 床头平板电脑：从床头柜控制灯光、闹钟和媒体。
- 信息亭模式：为访客或家庭成员设置访问受限的设备。
- 数字标牌：显示仪表板、摄像头或信息屏幕。

## 预期效果

当 Home Assistant 是您的默认主屏幕应用时：

- 没有应用抽屉：按下主页按钮时，您不会看到已安装应用的常规列表。
- 无法直接启动应用：您不能以传统方式启动其他应用。请按照[将 Home Assistant 用作主屏幕应用时打开其他应用](#将-home-assistant-用作主屏幕应用时打开其他应用)中的步骤操作
- 主页按钮：返回 Home Assistant（如果已打开则刷新）。
- 返回按钮：当导航栈为空时，按下返回将刷新应用而不是什么都不做。
- 启动：设备在重启后自动打开 Home Assistant。

## 启用 Home Assistant 作为主屏幕应用

1. 打开 Home Assistant 应用。
2. 转到[**设置**](https://my.home-assistant.io/redirect/config/) > **伴侣应用**。
3. 向下滚动到 **设备主屏幕**。
4. 启用 **用作主屏幕应用（启动器）**。

    <img alt="显示允许作为主屏幕应用的截图" src="/companion-assets/android/allow_as_home_app.png" width='400'/>

5. 要打开允许您选择主屏幕应用的系统屏幕，请选择 **更改主屏幕应用**。

    <img alt="显示选择主屏幕应用系统屏幕的截图" src="/companion-assets/android/select_home_app.png" width='400'/>

## 禁用 Home Assistant 作为主屏幕应用

如果您想切换回常规主屏幕应用：

1. 打开 Home Assistant 应用。
2. 转到[**设置**](https://my.home-assistant.io/redirect/config/) > **伴侣应用**。
3. 向下滚动到 **设备主屏幕**。
4. 要打开允许您选择 Home Assistant 以外的主屏幕应用的系统屏幕，请选择 **更改主屏幕应用**。

    <img alt="显示选择主屏幕应用系统屏幕的截图" src="/companion-assets/android/select_home_app.png" width='400'/>

## 创建信息亭模式设置

为了获得最佳的信息亭或壁挂平板体验，请考虑这些附加设置：

### 启用本地推送

启用[本地推送](/companion/notifications/local)以利用：

- 无限通知：来自您自动化的警报没有每日限制
- 无限命令：控制设备没有每日限制（更改音量、打开应用）
- 更快的响应：通知和命令以更低的延迟到达和运行
- 无需互联网即可工作：只要您有网络连接，即使互联网断开也能继续工作

### 保持屏幕开启

要防止屏幕关闭，请转到[**设置**](https://my.home-assistant.io/redirect/config/) > **伴侣应用**并向下滚动到 **其他设置**并启用 **保持屏幕开启**。

### 信息亭模式仪表板

通过设置专用仪表板创建简化的体验：

1. 在 Home Assistant 中创建一个仅包含该设备所需控件的仪表板。
2. 在[**设置**](https://my.home-assistant.io/redirect/config/) > **仪表板** > 选择您的仪表板 > **在此设备上设置为默认**中为设备用户设置为默认。

:::tip
为每个信息亭设备创建一个专用的 Home Assistant 用户。这允许您为每个设备设置不同的默认仪表板。
:::

## 将 Home Assistant 用作主屏幕应用时打开其他应用

由于 Home Assistant 没有应用抽屉，这里有两种启动其他应用的方法：

### 通过 Android 设置

1. 从屏幕顶部向下滑动以打开通知栏。
2. 点击 **设置齿轮** 图标。
3. 转到 **应用**，选择您想要的应用，然后点击 **打开**。

### 从您的仪表板

使用[通知命令](/companion/notifications/commands)创建直接启动应用的按钮。这对于快速访问摄像头查看器或音乐播放器等应用很有用。