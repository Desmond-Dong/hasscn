# ODROID

## 安装 Home Assistant Operating System

本指南介绍如何在 ODROID 设备上安装 Home Assistant。

## 推荐硬件

* ODROID-N2+（Home Assistant Blue 使用的主板）
* ODROID-M1
* ODROID-C4
* ODROID-M1S

## 将镜像写入存储介质

### 方法 1：使用 Balena Etcher

1. 下载并安装 [Balena Etcher](https://www.balena.io/etcher/)。
2. 下载适用于您的 ODROID 型号的 Home Assistant OS 镜像。
3. 将存储介质（eMMC 或 SD 卡）连接到计算机。
4. 打开 Balena Etcher。
5. 选择 **从文件烧录** 并选择下载的镜像。
6. 选择目标存储介质。
7. 点击 **烧录** 开始写入。

### 方法 2：通过 USB-OTG 刷写 ODROID-N2+

ODROID-N2+ 可以通过 USB-OTG 直接连接到计算机进行刷写。

#### 所需材料

* HDMI 线和显示器
* USB 键盘
* USB 2.0 转 micro-USB 线

#### 启用 SPI 启动模式

1. 断开 ODROID-N2+ 的电源。
2. 找到启动模式切换开关，将其从 MMC 切换到 SPI。
3. 通过 USB-OTG 端口将 ODROID-N2+ 连接到计算机。
4. 连接 USB 键盘和 HDMI 显示器。
5. 接通电源。

#### 启用 USB 驱动器模式

1. 在菜单中选择 `Exit to shell`。
2. 运行命令确认存储设备：
   ```bash
   ls /dev/mmc*
   ```
3. 启用 USB 大容量存储模式：
   ```bash
   ums /dev/mmcblk0
   ```

#### 刷写 Home Assistant

1. 当 ODROID-N2+ 被识别为 USB 存储设备时，使用 Etcher 刷写镜像。
2. 刷写完成后，断开连接。
3. 将启动模式切换开关改回 MMC。
4. 连接以太网线并接通电源。

## 访问 Home Assistant

几分钟后，您可以在浏览器中访问 <a href="http://homeassistant.local:8123" target="_blank">homeassistant.local:8123</a>。

如果您的路由器支持 mDNS，您可以在 `http://homeassistant.local:8123` 访问安装。否则，使用 ODROID 的 IP 地址，例如 `http://192.168.0.9:8123`。

## 下一步

继续进行 [初始设置](/home-assistant/getting-started/onboarding/index.md)。
