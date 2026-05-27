# 开发板支持概览

## 概览

当前支持以下开发板和设备：

* Nabu Casa
  * [Home Assistant Green](https://www.home-assistant.io/green/)
  * [Home Assistant Yellow](https://www.home-assistant.io/yellow/)（基于定制载板，并由 Raspberry Pi 4 Compute Module 提供算力）
  * [Home Assistant Blue](https://www.home-assistant.io/blue/)（基于 ODROID-N2+）
* Raspberry Pi
  * Pi 5（[4 GB](https://www.raspberrypi.com/products/raspberry-pi-5/?variant=raspberry-pi-5-4gb) 和 [8 GB](https://www.raspberrypi.com/products/raspberry-pi-5/?variant=raspberry-pi-5-8gb) 型号）64 位
  * Pi 4 Model B（[1 GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-1gb)、[2 GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-2gb)、[4 GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-4gb) 和 [8 GB](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/?variant=raspberry-pi-4-model-b-8gb) 型号）64 位
  * [Pi 3 Model B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/) 和 [B+](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/) 64 位
* Hardkernel
  * [ODROID-C2](https://www.hardkernel.com/shop/odroid-c2/)（已停产）
  * [ODROID-C4](https://www.hardkernel.com/shop/odroid-c4/)
  * [ODROID-M1](https://www.hardkernel.com/shop/odroid-m1/)
  * ODROID-M1S [4 GB](https://www.hardkernel.com/shop/odroid-m1s-with-4gbyte-ram/) 或 [8 GB](https://www.hardkernel.com/shop/odroid-m1s-with-8gbyte-ram/)
  * [ODROID-N2](https://www.hardkernel.com/shop/odroid-n2/)（已停产）
  * ODROID-N2+ [2 GB](https://www.hardkernel.com/shop/odroid-n2-with-2gbyte-ram-2/) 或 [4 GB](https://www.hardkernel.com/shop/odroid-n2-with-4gbyte-ram-2/)
  * [ODROID-XU4](https://www.hardkernel.com/shop/odroid-xu4-special-price/)
* Asus
  * [Tinker Board](https://tinker-board.asus.com/product/tinker-board.html)
* 通用 x86-64（UEFI，不适用于虚拟化）
  * [Intel NUC5CPYH](https://www.intel.com/content/www/us/en/products/sku/85254/intel-nuc-kit-nuc5cpyh/specifications.html)
  * [Intel NUC6CAYH](https://www.intel.com/content/www/us/en/products/sku/95062/intel-nuc-kit-nuc6cayh/specifications.html)
  * [Intel NUC10I3FNK2](https://www.intel.com/content/www/us/en/products/sku/195503/intel-nuc-10-performance-kit-nuc10i3fnk/specifications.html)
  * [Gigabyte GB-BPCE-3455](https://www.gigabyte.com/Mini-PcBarebone/GB-BPCE-3455-rev-10/sp#sp)
  * 一般来说，只要支持 x86-64 架构并使用 UEFI 启动的计算机都可以工作
* 虚拟设备（x86\_64/UEFI）：
  * VMDK
  * OVA ?
  * VHDX ?
  * VDI ?
  * QCOW2 ?

说明：

* 请参见上面的 `?`：这些目前是否受支持？另见 OVA 文档，其中解释了之前 OVA 发布方式存在的问题。

## 开发板详情

| 开发板 | 构建命令 | 配置 | 文档 |
|-----|----|------|------|
| Green | `make green` | [green](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/green_defconfig) | - |
| Yellow | `make yellow` | [yellow](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/yellow_defconfig) | - |
| Pi5 64 位 | `make rpi5_64` | [rpi5\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi5_64_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| Pi4B 64 位 | `make rpi4_64` | [rpi4\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi4_64_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| Pi4B 32 位 | `make rpi4` | [rpi4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi4_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| Pi3B 64 位 | `make rpi3_64` | [rpi3\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi3_64_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| Pi3B 32 位 | `make rpi3` | [rpi3](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi3_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| Pi2 | `make rpi2` | [rpi2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/rpi2_defconfig) | [raspberrypi](/developers/operating-system/boards/raspberrypi.md) |
| ODROID-C2 | `make odroid_c2` | [odroid\_c2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c2_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| ODROID-C4 | `make odroid_c4` | [odroid\_c4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_c4_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| ODROID-M1 | `make odroid_m1` | [odroid\_m1](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| ODROID-M1S | `make odroid_m1s` | [odroid\_m1s](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_m1s_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| ODROID-N2/N2+ | `make odroid_n2` | [odroid\_n2](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_n2_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| ODROID-XU4 | `make odroid_xu4` | [odroid\_xu4](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/odroid_xu4_defconfig) | [hardkernel](/developers/operating-system/boards/hardkernel.md) |
| Tinker Board | `make tinker` | [tinker](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/tinker_defconfig) | [asus](/developers/operating-system/boards/asus.md) |
| 通用 x86-64 | `make generic_x86_64` | [generic\_x86\_64](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/generic_x86_64_defconfig) | [generic-x86-64](/developers/operating-system/boards/generic-x86-64.md) |
| OVA | `make ova` | [ova](https://github.com/home-assistant/operating-system/tree/dev/buildroot-external/configs/ova_defconfig) | [ova](/developers/operating-system/boards/ova.md) |
