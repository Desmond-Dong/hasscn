## 准备开发环境

### 检出源代码

主仓库位于 [github.com/home-assistant/operating-system/](https://github.com/home-assistant/operating-system/)，它通过 [br2-external 机制](https://buildroot.org/downloads/manual/manual.html#outside-br-custom) 包含 Buildroot 定制内容，以及辅助脚本和 GitHub Action CI 脚本。主仓库使用 Git Submodule 机制指向 Buildroot 本身。虽然大多数定制可以通过 br2 机制完成，但仍有一些修改直接作用于 Buildroot 本身。出于这个原因，我们还在 [github.com/home-assistant/buildroot/](https://github.com/home-assistant/buildroot/) 下维护一个 Buildroot 的 fork。我们的目标是尽量将基于上游 Buildroot 的补丁数量保持在最低水平。

确保你已经安装了 `git`，并按如下方式克隆 HAOS 主仓库：

```shell
git clone https://github.com/home-assistant/operating-system/
cd operating-system/
git submodule update --init
```

当你更新本地 git 仓库时，务必同时更新 `buildroot` 子模块。这样可以确保在 Buildroot 本身也更新时，你能获取与之匹配的版本。

```shell
git pull
git submodule update
```

要恢复到初始洁净状态，请使用以下两条命令（这会删除所有本地修改！）

```shell
git reset --hard
git submodule update --init --force
```

### 安装依赖

HAOS 使用构建容器来运行 Buildroot。安装 Docker 容器引擎，并确保你有一个可用的 `docker` 命令，允许运行 privileged 容器。构建脚本设计为由普通用户运行，但部分命令会使用特权，因此也需要一个可用的 `sudo` 命令。

虽然 Buildroot 可以直接运行在大多数 Linux 发行版上，但强烈建议使用基于 Debian 的构建容器。这样可以获得一个稳定且已知的构建环境，所有依赖均已预装。

:::info
构建容器必须以特权模式启动，因为在构建过程的某个阶段需要在 Docker 容器内挂载一个由 loopback 设备支持的新的文件系统镜像。因此，rootless 容器无法用于构建 HAOS。
:::

## 使用构建容器构建镜像

脚本 `scripts/enter.sh` 会构建构建容器镜像，并使用该镜像启动一个容器。传递给脚本的参数将在容器内部执行。

HAOS 为每个受支持的目标使用一个配置文件。要为特定目标（板卡）构建，需要将配置文件传递给 `make`。配置文件存放在 `buildroot-external/configs/` 中。注意，后缀 `_defconfig` 会自动追加，并且*绝不能*传递给 `make`。例如，要构建 Raspberry Pi 4 64 位配置 `buildroot-external/configs/rpi4_64_defconfig`，请使用以下命令：

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

这会在容器内的源代码仓库根目录中使用 `Makefile` 调用 make。这个 makefile 进而会调用 Buildroot 的 makefile。

根据你的机器速度，构建过程需要 0.5 到 1 小时。构建文件（目标文件、中间二进制文件等）存储在 `output/` 文件夹中。最终的镜像文件存放在 `output/images/` 目录中。

### 重新构建包

Buildroot 像常规发行版一样使用包。但 Buildroot 包不是简单地下一个预构建的包，而是下载源文件并直接编译二进制文件。Buildroot 会记住哪些包已经构建过。这使得第二次构建快得多，因为只有最终镜像会被重新生成。如果你想强制 Buildroot 重新构建某个特定包，只需从 `output/build/` 目录中删除它：

```shell
rm -rf output/build/linux-custom/
```

:::tip
你可以查看 `output/build/packages-file-list.txt` 来了解最终镜像中的文件分别属于哪个包。这样更容易找到你想要更改的包。
:::

### 为多个目标构建

要在同一个源代码目录中为多个目标构建，必须使用不同的输出目录。输出目录可以通过 `O=` 参数指定。推荐的做法是直接使用与目标配置文件同名的输出目录：

```shell
scripts/enter.sh make O=output_rpi4_64 rpi4_64
```

### 交互方式使用构建容器

如果不向 `scripts/enter.sh` 传递任何参数，就会呈现一个 shell。

```bash
$ scripts/enter.sh
[...]
builder@d3d7577663c9:/build$
```

从该 shell 中，可以使用 `make O=output_rpi4_64 rpi4_64` 启动上述相同的构建。

这样可以调用其他 Buildroot 目标，例如，[绘制包之间的依赖关系图](https://buildroot.org/downloads/manual/manual.html#_graphing_the_dependencies_between_packages)。要使用其他 Buildroot 目标，请确保切换到 `buildroot/` 目录并从那里执行命令

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

目标 OVA（Open Virtual Appliance）包含适用于各种虚拟机的镜像。其中一种镜像格式是 QCOW2，即 QEMU 的原生镜像格式。它可以用来通过 QEMU 测试新的 HAOS 构建。

由于 HAOS 需要 UEFI 支持，这比基于"经典"/传统 MBR 的镜像稍微复杂一些。在 *Debian* 主机上安装 [ovmf 包](https://packages.debian.org/stable/ovmf)，它提供"64 位 x86 虚拟机的 UEFI 固件"。该包将在 `/usr/share/OVMF/OVMF_CODE.fd` 安装一个派生自 **TianoCore** 的 QEMU UEFI 镜像，可用于在 QEMU 中启动生成的 QCOW2 镜像。

```bash
$ scripts/enter.sh make O=output_ova ova
[...]
$ unxz output_ova/images/haos_ova-7.0.dev20211003.qcow2.xz
$ qemu-system-x86_64 -enable-kvm -name haos -smp 2 -m 2G -drive file=output_ova/images/haos_ova-18.0.dev0.qcow2,index=0,media=disk,if=virtio,format=qcow2 -drive file=/usr/share/ovmf/x64/OVMF_CODE.fd,if=pflash,format=raw,readonly=on
```

这会显示 QEMU 的 SDL 界面，并应启动 Home Assistant Operating System。启动完成并显示 Home Assistant CLI 提示符 `ha > ` 后，你可以使用 `login` 访问 root shell。

## 创建 pull request 以供审核

当你对自己的修改满意后，创建一个单独的 git 分支并提交。尽量描述你认为这项更改*为什么*重要，以及*为什么*应该应用到 HAOS。例如，"更新内核"从更改本身来看也很明显。维护者更感兴趣的是你为什么认为内核需要更新。这个*为什么*可以非常简单（更新内核以确保我们跟上最新的更改），也可以包含一些有趣的细节（更新内核，因为最新版本修复了 xy 板上的以太网问题）。

fork 上游 [github.com/home-assistant/operating-system](https://github.com/home-assistant/operating-system) 仓库（如果你还没有的话），将你的分支推送到你的 forked GitHub 仓库中。然后打开一个新的 pull request。所有更改都应针对开发分支 `dev` 进行。如果你的更改希望出现在下一个稳定版本中，请添加 `rel-x` 标签，以便将其标记为待 backport。
