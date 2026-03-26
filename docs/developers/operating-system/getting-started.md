---
title: "开始进行 Home Assistant 操作系统开发"
sidebar_label: 入门
---

## 准备开发环境

### 检出源代码

位于 [github.com/home-assistant/operating-system/](https://github.com/home-assistant/operating-system/) 的主仓库包含通过 [br2-external mechanism](https://buildroot.org/downloads/manual/manual.html#outside-br-custom) 实现的 Buildroot 定制内容，以及辅助脚本和 GitHub Action CI 脚本。主仓库通过 Git Submodule 指向 Buildroot 本体。虽然大多数定制都可以通过 br2 机制完成，但仍有一部分修改是直接应用在 Buildroot 本身上的。因此，我们还维护了一个 Buildroot fork：[github.com/home-assistant/buildroot/](https://github.com/home-assistant/buildroot/)。目标是尽可能减少叠加在上游 Buildroot 之上的补丁数量。

请确保系统中可用 `git`，然后按如下方式克隆主 HAOS 仓库：

```shell
git clone https://github.com/home-assistant/operating-system/
cd operating-system/
git submodule update --init
```

更新本地 git 仓库时，请确保同时更新 `buildroot` 子模块。这样可以确保在 Buildroot 本身也更新时，你得到与之匹配的版本。

```shell
git pull
git submodule update
```

如果要恢复到一个干净状态，可使用以下两条命令（这会删除所有本地修改！）

```shell
git reset --hard
git submodule update --init --force
```

### 安装前置依赖

HAOS 使用构建容器来运行 Buildroot。请安装 Docker 容器引擎，并确保 `docker` 命令可用，且可以运行特权容器。构建脚本设计为由普通用户执行，但部分命令需要权限，因此还需要可用的 `sudo` 命令。

虽然 Buildroot 可在大多数 Linux 发行版上原生运行，但仍强烈建议使用基于 Debian 的构建容器。这样可以获得一个稳定、已知且预装所有依赖的构建环境。

:::info
构建容器必须以特权方式启动，因为在构建过程中会有一个由 loopback 设备支持的文件系统镜像被挂载到 Docker 容器内部。因此，rootless 容器无法用于构建 HAOS。
:::

## 使用构建容器构建镜像

脚本 `scripts/enter.sh` 会构建构建容器镜像，并使用该镜像启动一个容器。传递给该脚本的参数会在容器内部执行。

HAOS 为每个受支持目标都提供了一个配置文件。要为特定目标（开发板）构建，需要将该配置文件传递给 `make`。配置文件位于 `buildroot-external/configs/`。请注意，后缀 `_defconfig` 会自动追加，因此*不要*传给 `make`。例如，要构建 Raspberry Pi 4 64-bit 的配置 `buildroot-external/configs/rpi4_64_defconfig`，请使用以下命令：

```
$ scripts/enter.sh make rpi4_64
[sudo] password for whoever:
[+] Building 32.5s (10/10) FINISHED                                                                                                                                                                                                                     [...]
=== Using rpi4_64_defconfig ===
/usr/bin/make -C /build/buildroot O=/build/output BR2_EXTERNAL=/build/buildroot-external "rpi4_64_defconfig"
[...]
=== Building rpi4_64 ===
[...]
```

该命令会在容器内使用源码仓库根目录的 `Makefile` 调用 make，而这个 makefile 又会进一步调用 Buildroot 的 makefile。

构建过程耗时取决于你的机器速度，通常为 0.5 到 1 小时。构建文件（目标文件、中间二进制文件等）会存放在 `output/` 目录中（在 rel-6 及更早分支中位于 `buildroot/output/`）。最终镜像文件存放在 `release/` 目录中。

### 重新构建软件包

Buildroot 像常规发行版一样使用软件包。但与直接下载预构建包不同，Buildroot 软件包会下载源码并直接编译二进制文件。Buildroot 会记住哪些软件包已经构建过，因此第二次构建会快得多，因为只需重新生成最终镜像。如果你想强制 Buildroot 重新构建某个特定软件包，只需将它从 `output/build/` 目录中删除：

```shell
rm -rf output/build/linux-custom/
```

:::tip
你可以查看 `output/build/packages-file-list.txt`，了解最终镜像中的每个文件分别属于哪个软件包。这会让你更容易找到想要修改的软件包。
:::

### 为多个目标构建

若要在同一个源码目录中构建多个目标，必须使用不同的输出目录。可通过 `O=` 参数指定输出目录。推荐做法是直接使用以目标配置文件命名的输出目录：


```shell
scripts/enter.sh make O=output_rpi4_64 rpi4_64
```

### 交互式使用构建容器

如果不给 `scripts/enter.sh` 传任何参数，将会进入一个 shell。

```bash
$ scripts/enter.sh
[...]
builder@d3d7577663c9:/build$
```

在这个 shell 中，可以使用 `make O=output_rpi4_64 rpi4_64` 启动与上面相同的构建。

这样你还可以调用其他 Buildroot 目标，例如[生成软件包依赖图](https://buildroot.org/downloads/manual/manual.html#_graphing_the_dependencies_between_packages)。要使用其他 Buildroot 目标，请确保切换到 `buildroot/` 目录后再执行命令。

```bash
builder@c6dfb4cd4036:/build$ cd buildroot/
builder@c6dfb4cd4036:/build$ make O=../output_rpi4_64 graph-depends
Getting dependency tree...
dot  -Tpdf \
        -o /build/output_rpi4/graphs/graph-depends.pdf \
        /build/output_rpi4/graphs/graph-depends.dot
builder@c6dfb4cd4036:/build$
```

## 使用 Qemu 测试镜像

目标 OVA（Open Virtual Appliance）包含适用于多种虚拟机的镜像。其中一种镜像格式是 QCOW2，这是 QEMU 的原生镜像格式。你可以使用它在 QEMU 中测试新的 HAOS 构建。

由于 HAOS 需要 UEFI 支持，这比使用“经典”(/legacy) 的 MBR 镜像稍微复杂一些。在 *Debian* 主机上，请安装 [ovmf package](https://packages.debian.org/stable/ovmf)，它提供“64-bit x86 虚拟机的 UEFI firmware”。该软件包会在 `/usr/share/OVMF/OVMF_CODE.fd` 安装一个基于 **TianoCore** 的 QEMU UEFI 镜像，可与 QEMU 一起用于启动生成的 QCOW2 镜像。

```bash
$ scripts/enter.sh make O=output_ova ova
[...]
$ unxz release/haos_ova-7.0.dev20211003.qcow2.xz
$ qemu-system-x86_64 -enable-kvm -name haos -smp 2 -m 1G -drive file=release/haos_ova-7.0.dev20211003.qcow2,index=0,media=disk,if=virtio,format=qcow2 -drive file=/usr/share/ovmf/x64/OVMF_CODE.fd,if=pflash,format=raw,readonly=on
```

这会显示 QEMU 的 SDL 界面，并应当启动 Home Assistant Operating System。启动完成并出现 Home Assistant CLI 提示符 `ha > ` 后，你可以使用 `login` 进入 root shell。

## 创建 pull request 以供审核

当你对修改满意后，请创建一个单独的 git 分支并提交。请尽量说明你认为该变更为什么重要、为什么应该应用到 HAOS。比如“update kernel”从修改本身就已经很明显了。维护者更关心的是你为什么认为应该更新内核。这个“为什么”可以很简单（例如更新内核以跟进最新变化），也可以包含一些有价值的细节（例如因为该新版本修复了某块开发板上的以太网问题，所以更新内核）。

如果你还没有 fork 上游 [github.com/home-assistant/operating-system](https://github.com/home-assistant/operating-system) 仓库，请先 fork，然后将你的分支推送到你自己的 GitHub fork 仓库，并创建一个新的 pull request。所有变更都应基于开发分支 `dev`。如果你希望该变更进入下一个稳定版本，请添加 `rel-x` 标签，以标记其需要回移植。
