# 更新系统

Home Assistant Operating System 使用 [RAUC](https://rauc.io/) 作为更新系统。RAUC 是一种面向嵌入式系统、基于镜像的更新系统。它支持多个启动槽位，因此支持 A/B 风格的更新机制。更新系统可与 U-Boot 等常见 bootloader 集成，也允许通过脚本与自定义启动流程集成。它使用 X.509 加密来对更新包进行签名和验证。

## RAUC and Home Assistant OS

RAUC 可直接通过 Buildroot 获取。HAOS 构建系统会生成更新包（`.raucb` 文件），并与初始安装所用的磁盘镜像文件一同上传。RAUC 更新包本质上包含 kernel、system partition 以及 boot partition；某些开发板还会包含名为 `SPL` 的 boot 镜像。生成磁盘镜像和更新包时使用的是同一套分区镜像。所有开发板都使用一个相似的 RAUC manifest，它由 `buildroot-external/ota/manifest.raucm.gtpl` 模板文件生成。该 manifest 定义了更新包的确切内容。

RAUC 自身已经在 [rauc.readthedocs.io](https://rauc.readthedocs.io/) 提供了出色的文档，本指南将主要聚焦于 RAUC 在实践中的使用，以及与 HAOS 相关的特定内容。

## 使用更新包

RAUC 在 HAOS 上作为 systemd 系统服务运行。该系统服务会暴露一个 D-Bus API。Supervisor 会使用这个 D-Bus API 来发起更新。更新包本身由 Supervisor 下载并交给 RAUC。从 RAUC 系统服务的角度看，这只是一次简单的本地更新安装。

在开发或测试场景中，可以在 shell 中使用 `rauc install` 命令安装 RAUC 更新包。例如，要在 HAOS shell 中手动更新某个开发板，可以直接运行以下命令：

```sh
# cd /mnt/data/
# curl -L -O https://github.com/home-assistant/operating-system/releases/download/11.5.rc3/haos_rpi5-64-11.5.rc3.raucb
# rauc install haos_rpi5-64-11.5.rc3.raucb
# systemctl reboot
```

:::note
On Raspberry Pi 5 which uses the `tryboot` mechanism, be sure to use `systemctl reboot`, as plain `reboot` wouldn't trigger booting from the other slot. Alternatively, explicit `reboot '0 tryboot'` is required.
:::

重启后，系统应会运行新安装的 HAOS 版本。

## 启动槽位

HAOS 有两个启动槽位，名称为 A 和 B。新安装总是从只部署了一个启动槽位（槽位 A）的状态开始。更新时，系统会写入另一个启动槽位，然后重启到该槽位。因此，新安装系统的第一次更新会安装到启动槽位 B。Supervisor 可通过 `ha os info` 显示启动槽位；在 OS shell 中，则可使用 `rauc status` 命令查看两个启动槽位的完整状态。

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

更新后，RAUC 会指示 bootloader 启动到另一个槽位（例如在 U-Boot 中通过写入 U-Boot environment variables 实现）。如果启动成功，该槽位会被标记为 good，之后系统将继续从该启动槽位启动。通常每个启动槽位会尝试启动三次，失败后再回退到另一个槽位，但具体逻辑取决于 bootloader 集成方式。

可以使用 `ha os boot-slot` 命令切换启动槽位。在使用 GRUB bootloader 的系统上，也可以使用启动菜单。在这种情况下，所选启动槽位会用于后续启动，直到再次手动更改或被 OS 更新更改。

## 安全性

HAOS 的 RAUC 更新包是经过签名的。HAOS 拥有自己的 PKI，包含开发和发布 CA。目前所有公开构建都使用 release CA 签名。相关证书预装在 OS 的 `/etc/rauc/keyring.pem` 中。

本地构建时，首次使用某个构建目录会生成一个自签名证书。该证书及其对应私钥会以 `key.pem` 和 `cert.pem` 的形式保存在构建目录根部（另见 `buildroot-external/scripts/rauc.sh`）。从此之后，该构建目录中的每次构建都会使用同一组自签名证书。该自签名证书也会自动添加到 HAOS 镜像自身的 keyring 中。这意味着，从本地构建镜像安装出的 HAOS 系统可以处理来自同一构建目录的更新包。

### 更新到开发构建

将现有的官方安装更新为本地自签名构建时，会因签名验证错误而失败：

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

不过，Home Assistant Operating System 并不是一个锁死的平台。它使用默认 keyring 来验证传入更新。只要能够以 root 身份访问 OS shell，就可以很容易地向 keychain 中添加另一个 keyring（可以只是一个自签名证书），从而更新到自签名 OS 构建：

```sh
# cp -r /etc/rauc/ /tmp/rauc
# cat /mnt/data/cert.pem >> /tmp/rauc/keyring.pem
# mount -o bind /tmp/rauc/ /etc/rauc/
# systemctl restart rauc
```

完成这一修改后，就可以安装本地构建。由于自签名证书是追加到 keychain 中的，因此从本地构建的 OS 安装官方更新仍然可行。也就是说，官方发布证书在本地构建环境下依然会被接受。这使得你可以从本地开发构建更新回官方发布版。
