:::info
本节不适用于终端用户。终端用户应使用 \[SSH app（原 add-on）] 通过 SSH 连接 Home Assistant。本节面向 Home Assistant 的**开发者**。如果你正在使用这些选项，请不要寻求支持。
:::

[SSH app]: https://github.com/home-assistant/addons/tree/master/ssh

## 启用对主机的 SSH 访问

:::info
通过 [SSH app] 的 SSH 访问（默认为端口 22）仅提供有限的权限，输入 'login' 命令时你需要输入用户名和密码。按照以下步骤启用一个独立的 SSH 访问端口 22222，它独立于 app 工作，并为你提供对 Home Assistant OS（"主机"）的直接访问，具有完全权限。
:::

1. 使用一个包含名为 `CONFIG`（区分大小写）分区的 USB 驱动器，格式化为 FAT、ext4 或 NTFS。创建一个 `authorized_keys` 文本文件（不带文件扩展名），每行一个，包含你的公钥（多个则各占一行），并将其放在 USB 驱动器 `CONFIG` 分区的根目录中。该文件必须使用 POSIX 标准的换行控制字符（LF），而不是 Windows 的（CR LF），并且需要是 ASCII 字符编码（即在注释中不得包含任何特殊字符）。

   如果你需要帮助生成密钥，请参见下面的 [生成 SSH 密钥](#generating-ssh-keys) 部分。

2. 将 USB 驱动器连接到 Home Assistant OS 设备，然后通过 `ha os import` 命令明确导入驱动器内容（例如，通过 SSH 连接端口 22 上的 [SSH app]），或者在保留驱动器连接的情况下重启设备，这将自动触发导入。

:::tip
在将公钥复制到 USB 驱动器根目录时，请确保将文件正确命名为 `authorized_keys`，不带 `.pub` 文件扩展名。
:::

你现在应该能够以 root 身份通过端口 22222 的 SSH 连接到设备。在 Mac/Linux 上使用：

```shell
ssh root@homeassistant.local -p 22222
```

如果你的安装版本较旧或更改了主机名，可能需要相应调整上述命令。你也可以使用设备的 IP 地址代替主机名。

你将以 root 身份登录，工作目录设置为 `/root`。[Home Assistant OS] 是 Docker 的 hypervisor。请参见 [Supervisor Architecture] 文档了解关于 Supervisor 的信息。Supervisor 提供了一个 API 来管理主机和运行 Docker 容器。Home Assistant 本身以及所有安装的 addons 都在单独的 Docker 容器中运行。

[Home Assistant OS]: https://github.com/home-assistant/operating-system

[Supervisor Architecture]: /architecture_index.md

## 禁用对主机的 SSH 访问

1. 使用一个包含名为 `CONFIG`（区分大小写）分区的 USB 驱动器，格式化为 FAT、ext4 或 NTFS。从该分区的根目录中移除任何现有的 `authorized_keys` 文件。

2. 当 Home Assistant OS 设备在插入该驱动器的情况下重启时，任何现有的 SSH 公钥都将被移除，端口 22222 上的 SSH 访问将被禁用。

## 查看日志

```shell
# Host OS 上 supervisor 服务的日志
journalctl -f -u hassos-supervisor.service

# Supervisor 日志
docker logs hassio_supervisor

# Home Assistant 日志
docker logs homeassistant
```

## 访问容器 bash

```shell
docker exec -it homeassistant /bin/bash
```

[windows-keys]: https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/create-with-putty/

### 生成 SSH 密钥

关于如何使用 Putty 生成并使用私钥/公钥的 Windows 说明，请参见[这里][windows-keys]。按照上述说明添加公钥（而不是 droplet 说明）。

Mac、Windows 和 Linux 的替代说明请参见[这里](https://docs.github.com/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。按照 *Generating a new SSH key* 下的步骤操作（其他部分不适用于 Home Assistant，可以忽略）。

确保复制你刚刚创建的 SSH 密钥对&#x7684;***公钥***。默认情况下，公钥文件名为 `id_ed25519.pub`（对于 Ed25519 椭圆曲线算法）或 `id_rsa.pub`（对于较旧的 RSA 算法），即它应该带有 `.pub` 文件名后缀。它保存在与私钥相同的文件夹中（私钥默认命名为 `id_ed25519` 或 `id_rsa`）。
