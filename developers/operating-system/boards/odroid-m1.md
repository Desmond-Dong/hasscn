Home Assistant OS 10 及更高版本支持 ODROID-M1 板。

## SD-card

SD 卡启动通过板载 bootloader（SPL）或 recovery 按钮支持。

## eMMC

通过板载 bootloader 启动 eMMC 需要更新版本的 Petitboot
（spiboot 20230328 或更高版本）。要安装最新版本，请按如下方式从 [linuxfactory.or.kr][1] 下载 SPI boot image：

1. 下载 `spiupdate_odroidm1_20240415.img.xz`
2. 使用 balenaEtcher 或其他工具将更新程序刷入 SD 卡
3. 下载 `spiboot-20240109.img`
4. 将 `spiboot-20240109.img` 文件重命名为 `spiboot.img`。
5. 将 `spiboot.img` 文件粘贴到同一张 SD 卡的 FAT 分区中。
6. 将该 SD 卡插入 ODROID-M1。Petitboot 会自动更新自身，你可以在 HDMI 输出上确认进度。
7. 如果你在左上角看到版本 20240109，则安装成功。\
   如果在左上角看到任何其他版本，则安装失败。

更新 Petitboot 后，即可将 Home Assistant OS 直接刷入 eMMC。

## NVMe

不支持直接从 NVMe 启动。NVMe 卡可作为数据盘使用。

## 启动流程技术说明

Home Assistant OS 镜像可由 SoC 直接启动。这意味着无需借助 Hardkernel 提供并预装的 bootloader Petitboot。
然而，ODROID-M1 会自动从内部 SPI 启动。要直接从 SD 卡或 eMMC 启动，你需要按下 recovery 按钮。

通过 SPI 刷入的 U-Boot SPL 会尝试在 SD 卡上搜索 U-Boot 二进制文件
（并在使用 Petitboot 20230328 及更高版本时从 eMMC 搜索）。此机制允许你在不按下 recovery 按钮的情况下启动 Home Assistant OS U-Boot。

## Console

默认情况下，可在串口 header（CON1）和 HDMI 上获得控制台访问。
串口控制台的波特率默认为 1500000。

systemd 启动消息默认仅在串口控制台上显示。
若要在 HDMI 控制台上显示这些消息，请手动将 console 添加到 boot 分区上的 `cmdline.txt` 文件中（例如，`console=tty0`）。

[1]: http://ppa.linuxfactory.or.kr/images/petitboot/odroidm1/
