# Hardkernel 开发板

## 支持的硬件

| 设备 | 发布时间 | 支持情况 | 配置 |
|----------------|---------------|--------------|-----------|
| ODROID-C2 | 2016 | 支持 | [odroid\_c2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c2_defconfig) |
| ODROID-C4 | 2020 | 支持 | [odroid\_c4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c4_defconfig) |
| ODROID-M1 | 2022 | 支持 | [odroid\_m1](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1_defconfig) |
| ODROID-M1S | 2023 | 支持 | [odroid\_m1s](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1s_defconfig) |
| ODROID-N2 | 2019 | 支持 | [odroid\_n2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_n2_defconfig) |
| ODROID-XU4 | 2015 | 支持 | [odroid\_xu4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_xu4_defconfig) |

请参阅各开发板对应的单独文档。

## 外接设备

### Wi-Fi

以下设备已在 Home Assistant OS 5.8 上测试：

* [Bluetooth Module 2](https://www.hardkernel.com/shop/bluetooth-module-2/)
* [WiFi Module 3](https://www.hardkernel.com/shop/wifi-module-3/)

[WiFi Module 5A](https://www.hardkernel.com/shop/wifi-module-5a/) 不推荐使用，因为没有可用的上游驱动支持。当前与较新的 Linux 内核版本兼容的驱动，在连接 5GHz 网络时似乎仍有问题。
