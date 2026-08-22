---
title: "Hardkernel boards"
sidebar_label: Hardkernel boards
---

## 支持的硬件

| 设备         | 发布日期  | 支持状态      | 配置    |
|--------------|-----------|--------------|---------|
| ODROID-C2      | 2016          | 是          | [odroid_c2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c2_defconfig) |
| ODROID-C4      | 2020          | 是          | [odroid_c4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c4_defconfig) |
| ODROID-M1      | 2022          | 是          | [odroid_m1](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1_defconfig) |
| ODROID-M1S     | 2023          | 是          | [odroid_m1s](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1s_defconfig)|
| ODROID-N2      | 2019          | 是          | [odroid_n2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_n2_defconfig) |
| ODROID-XU4     | 2015          | 是          | [odroid_xu4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_xu4_defconfig)|

请参阅各开发板的单独文档。

## 联网设备

### Wi-Fi

以下设备已在 Home Assistant OS 5.8 上测试通过：

- [Bluetooth Module 2](https://www.hardkernel.com/shop/bluetooth-module-2/)
- [WiFi Module 3](https://www.hardkernel.com/shop/wifi-module-3/)

[WiFi Module 5A](https://www.hardkernel.com/shop/wifi-module-5a/) 不推荐使用，
因为没有可用的 upstream driver 支持。目前与近期 Linux kernel 版本兼容的
driver 在连接到 5GHz 网络时似乎存在问题。
