Home Assistant Operating System 使用 [RAUC](https://rauc.io/) 作为更新系统。RAUC 是一个面向嵌入式系统的基于镜像的更新系统。它支持多个 boot slot，因此支持 A/B 样式的更新机制。更新系统集成了诸如 U-Boot 等流行的 bootloader，但也允许通过脚本与自定义启动流程集成。它使用 X.509 密码学来签名和验证更新包。

## RAUC 与 Home Assistant OS

RAUC 可以直接从 Buildroot 获取。HAOS 构建系统会创建更新包（`.raucb` 文件），它们与初始安装所用的磁盘镜像文件一起上传。RAUC 更新包本质上包含内核和系统分区以及 boot 分区，对于某些板卡还包括一个名为 `SPL` 的 boot 镜像。相同的分区镜像用于生成磁盘镜像和更新包。所有板卡都使用从 `buildroot-external/ota/manifest.raucm.gtpl` 处的模板文件生成的类似 RAUC manifest。该 manifest 定义了更新包的确切内容。

RAUC 在 [rauc.readthedocs.io](https://rauc.readthedocs.io/) 上拥有优秀的文档，本指南主要关注 RAUC 的实用方面以及 HAOS 特有的内容。

## 使用更新包

RAUC 在 HAOS 上作为 systemd 系统服务运行。系统服务暴露了一个 D-Bus API。Supervisor 利用这个 D-Bus API 来发起更新。更新包本身由 Supervisor 下载并传递给 RAUC。从 RAUC 系统服务的角度来看，更新只是一个简单的本地更新安装。

出于开发或测试目的，RAUC 更新包可以通过 shell 上的 `rauc install` 命令安装。例如，手动更新特定板卡可以直接在 HAOS shell 中运行以下命令完成：

```sh
# cd /mnt/data/
# curl -L -O https://github.com/home-assistant/operating-system/releases/download/11.5.rc3/haos_rpi5-64-11.5.rc3.raucb
# rauc install haos_rpi5-64-11.5.rc3.raucb
# systemctl reboot
```

:::note
在 Raspberry Pi 5 上使用 `tryboot` 机制时，务必使用 `systemctl reboot`，因为普通的 `reboot` 不会触发从另一个 slot 启动。或者，需要显式使用 `reboot '0 tryboot'`。
:::

重启后，系统应运行新安装的 HAOS 版本。

## 启动槽位

HAOS 有两个 boot slot，分别命名为 A 和 B。新安装总是从单个 boot slot（Slot A）开始部署。更新时，会写入另一个 boot slot，系统随后重启进入另一个 boot slot。因此，新安装系统上的第一次更新将安装到 boot slot B 中。Supervisor 使用 `ha os info` 显示 boot slot，在 OS shell 上可以使用 `rauc status` 命令来查看两个 boot slot 的完整状态。

```sh
# rauc status
=== System Info ===
Compatible:  haos-rpi5-64
Variant:     
Booted from: kernel.0 (A)

=== Bootloader ===
Activated: kernel.0 (A)

=== Slot States ===
  [spl.0] (/dev/disk/by-partlabel/hassos-boot, raw, inactive)

  [boot.0] (/dev/disk/by-partlabel/hassos-boot, vfat, inactive)

x [kernel.0] (/dev/disk/by-partlabel/hassos-kernel0, raw, booted)
        bootname: A
        boot status: good
    [rootfs.0] (/dev/disk/by-partlabel/hassos-system0, raw, active)

o [kernel.1] (/dev/disk/by-partlabel/hassos-kernel1, raw, inactive)
        bootname: B
        boot status: good
    [rootfs.1] (/dev/disk/by-partlabel/hassos-system1, raw, inactive)
```

更新后，RAUC 会指示 bootloader 启动到另一个 slot（例如，通过使用 U-Boot 环境变量写入）。如果启动成功，该 slot 将被标记为 good，系统将继续启动到该 boot slot。通常，每个 boot slot 在回退到另一个 boot slot 之前会尝试三次，但具体逻辑取决于 bootloader 的集成方式。

可以使用 `ha os boot-slot` 命令更改 boot slot。在使用 GRUB bootloader 的系统上，也可以使用启动菜单。在这种情况下，所选的 boot slot 将被用于未来的启动，直到再次手动或通过 OS 更新进行更改。

## 安全

HAOS RAUC 更新包是经过签名的。HAOS 拥有自己的 PKI，包含 development 和 release 的 CA。目前，所有公开发布版本都使用 release CA 进行签名。证书预装在 OS 的 `/etc/rauc/keyring.pem` 中。

在本地构建时，第一次使用构建目录时会生成一个自签名证书。证书及其关联的私钥存储在构建目录的根目录中，分别为 `key.pem` 和 `cert.pem`（另请参见 `buildroot-external/scripts/rauc.sh`）。从那时起，每次构建都使用相同的自签名证书。这个自签名证书也会被自动添加到 HAOS 镜像本身的 keyring 中。这意味着从本地构建的镜像安装的 HAOS 可以处理来自同一构建目录的更新包。

### 更新到开发构建

将现有的官方安装更新到本地的自签名构建会因签名验证错误而失败：

```sh
# rauc install haos_rpi5-64-11.6.dev0.raucb
installing
  0% Installing
  0% Determining slot states
  20% Determining slot states done.
  20% Checking bundle
  20% Verifying signature
  40% Verifying signature failed.
  40% Checking bundle failed.
100% Installing failed.
LastError: signature verification failed: Verify error:self signed certificate
Installing `/mnt/data/haos_rpi5-64-11.6.dev0.raucb` failed
```

然而，Home Assistant Operating System 不是一个锁定平台。它使用默认 keyring 来验证传入的更新。使用 root 访问 OS shell，向 keychain 中添加另一个 keyring（可以是单个自签名证书）是相当简单的，因此可以更新到自签名的 OS 构建：

```sh
# cp -r /etc/rauc/ /tmp/rauc
# cat /mnt/data/cert.pem >> /tmp/rauc/keyring.pem
# mount -o bind /tmp/rauc/ /etc/rauc/
# systemctl restart rauc
```

有了这个更改，就可以安装本地构建。从本地构建的 OS 安装官方更新仍然是可能的，因为自签名证书被追加到了 keychain 中。这意味着即使是本地构建，官方 release 证书仍然被接受。这允许从本地开发构建更新到官方 release。
