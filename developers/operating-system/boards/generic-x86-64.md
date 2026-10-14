## 支持的硬件

此 board 配置旨在支持大多数通过 UEFI 启动的 x86-64 系统。主要目标是支持 Intel NUC 迷你 PC 及类似系统。经测试的硬件如下所示。

## 已测试的硬件

| 设备                | 发布日期 | 支持状态 | 配置      |
|---------------------|----------|----------|-----------|
| Intel NUC5CPYH        | 2015 Q3      | 是     | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC6CAYH        | 2016 Q4      | 是     | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC6CAYS        | 2016 Q4      | 是     | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC7i3DNHE	| 2017 Q3      | 是     | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Intel NUC10i3FNK2     | 2019 Q4      | 是     | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |
| Gigabyte GB-BPCE-3455 | 2017         | 是\*    | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) |

\* 如果需要 console，需要在 cmdline.txt 中添加 `nomodeset`

## 要求

* x86-64 支持
* UEFI 启动
* SATA/AHCI 或 eMMC 存储
* 受支持的 NIC：
  * Intel Gigabit NIC (e1000, igb - via Linux mainline)
  * Intel PCIe Gigabit NIC (e1000e - via *https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/package/intel-e1000e* 中的 out-of-tree module)
  * Realtek Gigabit NIC (r8169)
  * Intel Wireless Wifi 802.11ac (iwlwifi, 见下文)

## Wi-Fi

以下网卡受支持：

* Intel Wireless 3160
* Intel Wireless 7260
* Intel Wireless 7265
* Intel Wireless-AC 3165
* Intel Wireless-AC 3168
* Intel Wireless-AC 8260
* Intel Wireless-AC 8265
* Intel Wireless-AC 9260
* Intel Wireless-AC 9461
* Intel Wireless-AC 9462
* Intel Wireless-AC 9560

## 蓝牙

集成在 Intel Wireless 网卡中的 Bluetooth 工作正常，其他方案尚未测试。

## 安装

请确保已在 UEFI BIOS 设置中禁用 secure boot。

目前还没有漂亮的安装方法。检查清单如下：

* 使用 PXE 或 USB 将 PC 启动到 live environment
* 将 Home Assistant OS 镜像复制或下载到 live environment 中
* 使用 unxz 解压镜像，并通过 dd 写入本地硬盘
* 重启
