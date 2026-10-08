# UTM 安装（Mac）

UTM 使用适用于 Apple Silicon（aarch64）的 `qcow2` 固件，在[下载页](/download.md)下载对应的 `qcow2` 固件即可。

## 操作步骤

> 图片来源：[【笔记】MacOS上通过UTM安装HAOS](https://loli.fj.cn/2025/08/21/MacOS%E4%B8%8A%E9%80%9A%E8%BF%87UTM%E5%AE%89%E8%A3%85HAOS/)（57uv6Z6g）

1. 安装 UTM 与 qemu

```bash
brew install utm
brew install qemu
```

2. 在[下载页](/download.md)下载对应的 `qcow2` 固件

3. 扩容磁盘（可选）

```bash
qemu-img resize haos_generic-aarch64.qcow2 +128G
```

4. UTM 新建虚拟机

![UTM 新建虚拟机](../images/utm/01.webp)

* 选择 `虚拟化`

![虚拟化](../images/utm/02.webp)

* 操作系统选择 `其他`

![其他](../images/utm/03.webp)

* `启动设备` 选择 `无`

![启动设备](../images/utm/04.webp)

* 内存设置为 `4096 Mib`

![内存](../images/utm/05.webp)

* 磁盘容量设置为 `128 Gib`

![磁盘](../images/utm/06.webp)

5. 导入下载好的固件

* 删除默认的 VirtIO 驱动器

![删除默认驱动器](../images/utm/09.webp)

* 选择 `导入`，导入固件

![导入固件](../images/utm/11.webp)

![选择固件](../images/utm/12.webp)

6. 配置网络与显示

* `网络模式` 设置为 `桥接（高级）`

![桥接网络](../images/utm/13.webp)

* `虚拟显卡` 设置为 `virtio-gpu-pci`

![虚拟显卡](../images/utm/14.webp)

7. 启动虚拟机，等待初始化完成后即可访问

![启动虚拟机](../images/utm/15.webp)

![完成](../images/utm/16.webp)

![截图](../images/utm/17.webp)
