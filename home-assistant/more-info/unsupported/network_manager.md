# NetworkManager

## 问题

Supervisor 利用主机上的 Network Manager 向加载项提供网络信息，并让您可以选择通过 UI 或命令行管理网络接口。

这要求 NetworkManager 已安装、处于活动状态，并且控制主机上至少一个网络接口。

当前最低支持的 NetworkManager 版本为：1.14.6。

## 解决方案

如果您尚未安装，请在主机上安装或更新 NetworkManager。

安装完成后，您需要确保它管理至少一个接口，[请参阅 network manager 的文档](https://wiki.debian.org/NetworkManager)。

以下是一些示例文件，可用于让 NetworkManager 控制所有物理接口。

`/etc/NetworkManager/NetworkManager.conf`：

```text
[main]
dns=default
plugins=keyfile
autoconnect-retries-default=0
rc-manager=file

[keyfile]
unmanaged-devices=type:bridge;type:tun;driver:veth

[logging]
backend=journal
```

`/etc/NetworkManager/system-connections/default`：

```text
[connection]
id=Supervisor default
uuid=b653440a-544a-4e4f-aef5-6c443171c4f8
type=802-3-ethernet
llmnr=2
mdns=2

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

`/etc/network/interfaces`：

```text
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback
```

您也可以直接重新运行我们的[便捷安装脚本](https://github.com/home-assistant/supervised-installer)。

如果您没有在主机上手动进行任何网络操作，您应该直接重新运行便捷安装脚本。

当您手动或使用脚本更改网络配置后，应该重启主机，以便将更改传播到所有需要它的服务。
