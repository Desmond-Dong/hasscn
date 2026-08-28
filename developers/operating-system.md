Home Assistant Operating System 是一个专门设计的操作系统，专为在单板计算机和 x86-64 系统上运行 Home Assistant 而打造。它旨在提供一个健壮且免维护的操作系统来运行 Home Assistant。

Home Assistant Operating System (HAOS) 使用 [Buildroot](https://buildroot.org/) 构建系统。Buildroot 并非传统意义上的 Linux 发行版。它提供用于构建 Linux 发行版的 infrastructure 和构建系统。Buildroot 允许我们为不同的架构进行交叉编译，这在为资源通常较为有限的架构（如基于 Arm 的系统）编译时尤其有用。HAOS 由一组较为常规的 Linux 和 GNU 软件栈组成，使用 Linux、GNU C library、systemd init daemon 以及 Home Assistant Supervisor 所需的 Docker container engine。

### Components

* **Bootloader:**
  * [GRUB](https://www.gnu.org/software/grub/) 用于支持 UEFI 的设备
  * [U-Boot](https://www.denx.de/wiki/U-Boot) 用于不支持 EFI 的设备
* **Operating System:**
  * [Buildroot](https://buildroot.org/) 构建系统，用于生成 Linux 发行版
* **File Systems:**
  * [SquashFS](https://www.kernel.org/doc/Documentation/filesystems/squashfs.txt) 用于只读文件系统（使用 LZ4 压缩）
  * [ZRAM](https://www.kernel.org/doc/Documentation/blockdev/zram.txt) 用于 `/tmp`、`/var` 和 swap（使用 LZ4 压缩）
* **Container Platform:**
  * [Docker Engine](https://docs.docker.com/engine/) 用于在容器中运行 Home Assistant components
* **Updates:**
  * [RAUC](https://rauc.io/) 用于 Over The Air (OTA) 和 USB 更新
* **Security:**
  * [AppArmor](https://apparmor.net/) Linux kernel security module
