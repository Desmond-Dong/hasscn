# 调试 Home Assistant 操作系统

:::info
本节不面向终端用户。终端用户应使用 \[SSH app（原 add-on）] 通过 SSH 登录 Home Assistant。这里的内容仅适用于 Home Assistant 的**开发者**。如果你在使用这些选项，请不要寻求常规支持。
:::

[SSH app]: https://github.com/home-assistant/addons/tree/master/ssh

## 启用对主机的 SSH 访问

:::info
通过 [SSH app] 提供的 SSH 访问（默认端口 22）仅授予有限权限，并且在输入 `login` 命令时会要求你输入用户名和密码。请按以下步骤启用一个独立于该 app 的 SSH 访问通道（端口 22222），它可直接以完整权限访问 Home Assistant OS（即“主机”）。
:::

1. 使用一个带有名为 `CONFIG` 分区（区分大小写）的 USB 驱动器，并将其格式化为 FAT、ext4 或 NTFS。创建一个 `authorized_keys` 文本文件（不带扩展名），其中按行写入你的公钥，每行一个，然后将其放到该 USB 驱动器 `CONFIG` 分区的根目录下。文件必须使用 POSIX 标准换行符（LF），不能使用 Windows 的换行符（CR LF），并且需要采用 ASCII 字符编码（也就是说，注释中不能包含特殊字符）。

   如果你需要帮助生成密钥，请参见下方的 [Generating SSH Keys](#generating-ssh-keys) 章节。

2. 将 USB 驱动器连接到你的 Home Assistant OS 设备，然后通过 `ha os import` 命令显式导入其中内容（例如通过端口 22 登录 [SSH app] 后执行），或者保持 USB 驱动器插入并重启设备，系统会自动触发导入。

:::tip
将公钥复制到 USB 驱动器根目录时，请务必将文件正确命名为 `authorized_keys`，不要带 `.pub` 扩展名。
:::

现在你应该可以通过端口 22222 以 root 身份通过 SSH 连接到设备。在 Mac/Linux 上，使用：

```shell
ssh root@homeassistant.local -p 22222
```

如果你使用的是较旧的安装，或者修改过主机名，则可能需要相应调整上面的命令。你也可以直接使用设备的 IP 地址，而不是主机名。

登录后你将以 root 身份进入系统，工作目录为 `/root`。 [Home Assistant OS] 是 Docker 的宿主系统。关于 Supervisor 的信息，请参阅 [Supervisor Architecture] 文档。Supervisor 提供了一个 API，用于管理主机和正在运行的 Docker 容器。Home Assistant 本身以及所有已安装的 addons 都运行在各自独立的 Docker 容器中。

[Home Assistant OS]: https://github.com/home-assistant/operating-system

[Supervisor Architecture]: /architecture_index.md

## 禁用对主机的 SSH 访问

1. 使用一个带有名为 `CONFIG` 分区（区分大小写）的 USB 驱动器，并将其格式化为 FAT、ext4 或 NTFS。从该分区根目录中删除现有的 `authorized_keys` 文件。

2. 当 Home Assistant OS 设备插着该驱动器重启时，所有现有 SSH 公钥都会被移除，同时端口 22222 上的 SSH 访问会被禁用。

## 检查日志

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

Windows 上如何使用 Putty 生成和使用私钥/公钥的说明可见 [here][windows-keys]。请不要按照其中的 droplet 说明，而应按上文要求添加公钥。

适用于 Mac、Windows 和 Linux 的替代说明可见 [here](https://docs.github.com/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。请按照其中 *Generating a new SSH key* 一节的步骤操作（其他章节不适用于 Home Assistant，可忽略）。

请务必复制你刚创建的 SSH 密钥对中&#x7684;***公钥***。默认情况下，公钥文件名为 `id_ed25519.pub`（Ed25519 椭圆曲线算法）或 `id_rsa.pub`（较旧的 RSA 算法），也就是说它应带有 `.pub` 文件后缀。它会保存在与私钥相同的目录中（私钥默认名为 `id_ed25519` 或 `id_rsa`）。
