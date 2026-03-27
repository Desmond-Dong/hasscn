---
title: "Hardkernel ODROID-M1"
description: 'Home Assistant OS 10 及更高版本支持 ODROID-M1 开发板。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
sidebar_label: ODROID-M1
---
# Hardkernel ODROID-M1

Home Assistant OS 10 及更高版本支持 ODROID-M1 开发板。

## SD-card

支持通过板载 bootloader（SPL）或 recovery button 从 SD 卡启动。

## eMMC

通过板载 bootloader 从 eMMC 启动需要较新的 Petitboot 版本
（spiboot 20230328 或更高）。要安装最新版本，请按如下方式从 [linuxfactory.or.kr][1] 下载 SPI 启动镜像：

1. 下载 `spiupdate_odroidm1_20240415.img.xz`
2. 使用 balenaEtcher 或其他工具将更新器刷写到 SD 卡
3. 下载 `spiboot-20240109.img`
4. 将 `spiboot-20240109.img` 文件重命名为 `spiboot.img`。
5. 将 `spiboot.img` 文件复制到同一张 SD 卡的 FAT 分区。
6. 将该 SD 卡插入你的 ODROID-M1。Petitboot 会自行更新，你可以通过 HDMI 输出查看进度。
7. 如果左上角显示版本 20240109，则表示安装成功。\
   如果显示的是其他版本，则说明安装失败。

Petitboot 更新完成后，你就可以直接将 Home Assistant OS 刷写到 eMMC。

## NVMe

不支持直接从 NVMe 启动。NVMe 卡可作为数据盘使用。

## 启动流程技术说明

Home Assistant OS 镜像可由 SoC 直接启动。这意味着无需依赖 Hardkernel 预装的 bootloader Petitboot。
不过，ODROID-M1 会自动从内部 SPI 启动。若要直接从 SD 卡或 eMMC 启动，你需要按下 recovery button。

刷写在 SPI 中的 U-Boot SPL 会尝试在 SD 卡上查找 U-Boot 二进制文件
（若使用 Petitboot 20230328 或更高版本，也会在 eMMC 中查找）。该机制允许你在不按 recovery button 的情况下启动 Home Assistant OS 的 U-Boot。

## 控制台

默认情况下，可通过串口排针（CON1）和 HDMI 访问控制台。
串口控制台默认波特率为 1500000。

systemd 启动消息默认只会出现在串口控制台上。
若想改为在 HDMI 控制台显示这些消息，请手动将对应控制台
添加到 boot 分区的 `cmdline.txt` 文件中（例如 `console=tty0`）。

[1]: http://ppa.linuxfactory.or.kr/images/petitboot/odroidm1/
