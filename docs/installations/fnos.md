---
description: '在飞牛 NAS（fnOS）虚拟机中安装 Home Assistant OS 极速版。 本页属于 Home Assistant 中文网文档内容，适合继续浏览相关安装、使用与进阶说明。'
---
# 飞牛（fnOS）虚拟机安装

飞牛使用的固件为 `qcow2` 或 `img` 版本，可在[下载页](/download)下载。

## 操作步骤

> 图片来源：[飞牛 NAS 虚拟机 安装 Home Assistant OS（HAOS）](https://www.wamano.com/2025/4200.html)（wamano.com）

1. 从[下载页](/download)下载所需的固件

2. 打开飞牛虚拟机，新建虚拟机

![打开虚拟机](./images/fnos/01.png)

- 取一个名称，如 `haos`

![新建虚拟机](./images/fnos/02.png)

- 启动模式选择 **UEFI**，主板选择 **Q35**

![UEFI 配置](./images/fnos/03.png)

- 分配至少 4 核 CPU、4 GB 内存

![硬件配置](./images/fnos/04.png)

- 磁盘分配 50 GB

![磁盘大小](./images/fnos/05.png)

- 查看网卡配置

![网卡配置](./images/fnos/06.png)

- 开启 OVS

![开启 OVS](./images/fnos/07.png)

- 网卡型号选择 **E1000**

![网卡型号](./images/fnos/08.png)

- 确认硬件直通等配置

![硬件直通](./images/fnos/09.png)

3. 开机并进入 VNC 控制台

![开机](./images/fnos/10.png)

![进入 VNC](./images/fnos/11.png)

4. 在 PE 环境中使用写盘工具将固件写入虚拟磁盘

- 打开此电脑，进入 CD 驱动器

![此电脑](./images/fnos/12.png)

- 运行 IMG 写盘工具

![写盘工具](./images/fnos/13.png)

- 选择固件并写入

![选择固件](./images/fnos/14.png)

5. 写入完成后关机，移除 ISO 启动镜像，重新启动

![移除镜像](./images/fnos/15.png)

6. 等待自动加载完成后，浏览器访问 `http://<IP>:8123`

![开机完成](./images/fnos/16.png)