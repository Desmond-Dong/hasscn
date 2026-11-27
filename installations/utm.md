> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

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

![UTM 新建虚拟机](/static/image/01.0cf16ba300.webp)
- 选择 `虚拟化`

![虚拟化](/static/image/02.d08f73c625.webp)
- 操作系统选择 `其他`

![其他](/static/image/03.28aa575c1b.webp)
- `启动设备` 选择 `无`

![启动设备](/static/image/04.6edf602bc9.webp)
- 内存设置为 `4096 Mib`

![内存](/static/image/05.9506f8cb44.webp)
- 磁盘容量设置为 `128 Gib`

![磁盘](/static/image/06.05d6fead1f.webp)
5. 导入下载好的固件

- 删除默认的 VirtIO 驱动器

![删除默认驱动器](/static/image/09.3e804fa3de.webp)
- 选择 `导入`，导入固件

![导入固件](/static/image/11.05d6ba60b0.webp)
![选择固件](/static/image/12.cff0608792.webp)
6. 配置网络与显示

- `网络模式` 设置为 `桥接（高级）`

![桥接网络](/static/image/13.ebc6366ff6.webp)
- `虚拟显卡` 设置为 `virtio-gpu-pci`

![虚拟显卡](/static/image/14.73158fa949.webp)
7. 启动虚拟机，等待初始化完成后即可访问

![启动虚拟机](/static/image/15.81bcc8cfc5.webp)
![完成](/static/image/16.c3229cd354.webp)
![截图](/static/image/17.66a4c7b348.webp)