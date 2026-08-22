---
title: "网络配置"
sidebar_label: 网络
---

Home Assistant Operating System 使用 NetworkManager 来控制主机网络。

## 配置网络

默认情况下，设备将处于 DHCP 状态。

基本网络设置可以通过 Supervisor 前端在 System 选项卡中设置。VLAN 等附加设置也可以通过 `ha network` CLI 命令配置。

要恢复默认配置，也可以使用 `ha network` CLI 命令：

```
ha network update default --ipv4-method auto
```

对于前端或 CLI 不支持的网络设置，底层 NetworkManager 的连接配置可以放在 USB 驱动器上，并按照 [Configuration][configuration-usb] 中的描述导入到主机。

## 手动网络配置

如果前端或 `ha network` CLI 无法满足你的用例，仍然可以手动配置底层的 NetworkManager。

你可以阅读 [NetworkManager manual][nm-manual]，或者在网上找到许多配置示例。注意，目前不支持对 `NetworkManager.conf` 的更改，仅支持连接 keyfiles。请记住系统是只读的。如果你不希望 IP 地址在每次启动时都发生变化，应该将 UUID 属性修改为通用的 [UUID4][uuid]。在 USB 驱动器或 SD 卡的 `\CONFIG\network\` 目录中，创建一个名为 `my-network` 的文件，并添加以下适当内容：

**注意：请确保将此文件以 UNIX 行尾（LF，而不是 Windows 默认的 CRLF）保存。你可以使用 Notepad 来完成！**

### 默认

有线网络的预装连接配置文件默认为活动状态：

```ini
[connection]
id=Home Assistant OS default
uuid=f62bf7c2-e565-49ff-bbfc-a4cf791e6add
type=802-3-ethernet
llmnr=2
mdns=2

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

### 有线连接至 LAN

```ini
[connection]
id=my-network
uuid=d55162b4-6152-4310-9312-8f4c54d86afa
type=802-3-ethernet
llmnr=2
mdns=2

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

### 无线 LAN WPA/PSK

```ini
[connection]
id=my-network
uuid=72111c67-4a5d-4d5c-925e-f8ee26efb3c3
type=802-11-wireless

[802-11-wireless]
mode=infrastructure
ssid=MY_SSID
# 如果你的 SSID 未广播，请取消下方注释
#hidden=true

[802-11-wireless-security]
auth-alg=open
key-mgmt=wpa-psk
psk=MY_WLAN_SECRET_KEY

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

### 静态 IP

替换以下配置：

```ini
[ipv4]
method=manual
address=192.168.1.111/24;192.168.1.1
dns=8.8.8.8;8.8.4.4;
```

对于 `address`，分号前面的值就是 IP 地址和子网前缀长度。第二个值（分号后面）是本地网关的 IP 地址。

## 提示

### 重置网络

如果你希望将网络配置重置回使用 DHCP 的默认连接配置文件，请在主机控制台上使用以下命令：

```bash
# rm -r /mnt/overlay/etc/NetworkManager/system-connections
# reboot
```

Home Assistant OS 将在启动过程中重新创建默认连接配置文件。

### 启用 Wi-Fi

出于可靠性考虑，不建议使用 Wi-Fi。但如果你仍希望使用 Wi-Fi，可以使用 `ha network` 命令来设置 Wi-Fi（以 Raspberry Pi 4 为例，使用 `ha network info` 检查你的板卡是否支持 Wi-Fi 以及 Wi-Fi 设备的名称）：

```bash
ha network update wlan0 --ipv4-method auto --wifi-auth wpa-psk --wifi-mode infrastructure --wifi-ssid "MY-SSID" --wifi-psk MY_PASS
```

### 节能

如果 powersave 出现问题的话，应用以下更改：

```ini
[wifi]
# Values are 0 (use default), 1 (ignore/don't touch), 2 (disable) or 3 (enable).
powersave=0
```

## 使用 `nmcli` 设置静态 IPv4 地址

通过控制台登录 Home Assistant OS 基础系统：

```bash
Welcome to Home Assistant
homeassistant login:
```

- 以 `root` 身份登录（无需密码）。在 `ha >` 提示符下，输入 `login`（按照指示）。

从那里你可以使用 `nmcli` 配置工具。

- `# nmcli con show` 将列出正在使用的"Home Assistant OS default"连接。
- `# nmcli con show "Home Assistant OS default"` 将列出该连接的所有属性。

要开始编辑"Home Assistant OS default"的配置设置：

```bash
# nmcli con edit "Home Assistant OS default"
```

添加你的静态 IP 地址（对 manual method 选择 'yes'）：

```bash
nmcli> set ipv4.addresses 192.168.100.10/24
Do you also want to set 'ipv4.method' to 'manual'? [yes]:
```

此外，建议设置 DNS 服务器和本地网关。对于大多数家用路由器，DNS 服务器的 IP 地址与路由器本身相同。如果你使用的是 Pi-Hole 或第三方 DNS 系统，则可以将 DNS 服务器设置为其。

```bash
nmcli> set ipv4.dns 192.168.100.1
nmcli> set ipv4.gateway 192.168.100.1
```

`nmcli> print ipv4` 将显示此连接的 IPv4 属性。通过 `nmcli> save` 你可以保存更改。

如果你现在查看默认连接 `cat /etc/NetworkManager/system-connections/default`，你应该看到 method 是 manual 且 address 已设置。

执行 `nmcli con reload` 并不总是有效，因此请重启虚拟机或物理系统。

[nm-manual]: https://networkmanager.dev/docs/api/1.40/manpages.html
[configuration-usb]: configuration.md
[uuid]: https://www.uuidgenerator.net/version4
