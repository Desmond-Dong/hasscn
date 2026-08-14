---
description: '在飞牛 NAS（fnOS）虚拟机中直接通过 qcow2 镜像安装 Home Assistant OS 极速版。 本页属于 Home Assistant 中文网文档内容，适合继续浏览相关安装、使用与进阶说明。'
---
# 飞牛（fnOS）虚拟机安装

飞牛使用的固件为 `qcow2` 版本，在[下载页](/download)下载对应的 `qcow2` 固件即可。

## 操作步骤

> 图片来源：[【fnNAS】在飞牛虚拟机里安装配置 Home Assistant OS 以及导入虚拟机](https://blog.csdn.net/m0_62518864/article/details/149086735)（CSDN）

1. 在[下载页](/download)下载对应的 `qcow2` 固件

2. 飞牛 NAS → 虚拟机 → 新建虚拟机

![新建虚拟机](./images/fnos/01.png)

- 主板固件选择 **UEFI**

![UEFI 配置](./images/fnos/02.png)

- CPU 至少 2 核、内存至少 2 GB

![CPU 与内存](./images/fnos/03.png)

- 磁盘分配 32 GB 以上

![磁盘配置](./images/fnos/04.png)

3. 创建完成后**不要启动**，进入虚拟机详情，将虚拟磁盘替换为下载好的 `qcow2` 固件

4. 开启 OVS，启动虚拟机

![开启 OVS](./images/fnos/05.png)

![启动虚拟机](./images/fnos/06.png)

5. 等待初始化完成后，浏览器访问 `http://<虚拟机IP>:8123`

![正在加载](./images/fnos/07.png)