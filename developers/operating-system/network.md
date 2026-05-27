# 网络配置

Home Assistant Operating System 使用 NetworkManager 管理主机网络。

## 配置网络

默认情况下，设备会使用 DHCP。

基础网络设置可通过 Supervisor 前端的 System 标签页进行设置。
诸如 VLAN 之类的高级配置也可通过
`ha network` CLI 命令完成。

若要恢复默认配置，也可以使用 `ha network` CLI 命令：

```
ha network update default --ipv4-method auto
```

如果需要更高级的网络设置，可将网络连接文件放到 USB 驱动器中，
并按 [Configuration][configuration-usb] 中所述导入到主机。

## 手动网络配置

如果前端或 `ha network` CLI 无法满足你的使用场景，
仍然可以手动配置底层的 NetworkManager。

你可以阅读 [NetworkManager manual][nm-manual]，或在网上查找大量配置示例。请注意，目前不支持修改 `NetworkManager.conf`，仅支持连接 keyfiles。还请记住，系统是只读的。如果你不希望 IP 地址在每次启动时变化，应将 UUID 属性修改为通用的 [UUID4][uuid]。在 USB 驱动器或 SD 卡的 `\CONFIG\network\` 目录中，创建一个名为 `my-network` 的文件，并按下面示例填入适当内容：

**注意：请确保将此文件保存为 UNIX 换行（LF，而不是 Windows 默认的 CRLF）。现在用 Notepad 也可以做到！**

### Default

一个预装的有线网络连接配置会默认启用：

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

### 连接到局域网的有线网络

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

### 无线局域网 WPA/PSK

```ini
[connection]
id=my-network
uuid=72111c67-4a5d-4d5c-925e-f8ee26efb3c3
type=802-11-wireless

[802-11-wireless]
mode=infrastructure
ssid=MY_SSID
# Uncomment below if your SSID is not broadcasted
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

将配置替换为：

```ini
[ipv4]
method=manual
address=192.168.1.111/24;192.168.1.1
dns=8.8.8.8;8.8.4.4;
```

对于 `address`，分号前的值是 IP 地址和子网前缀位数。第二个值（分号后）是本地网关的 IP 地址。

## 提示

### 重置网络

如果你想将网络配置重置为使用 DHCP 的默认连接配置，请在主机控制台上使用以下命令：

```bash
# rm -r /mnt/overlay/etc/NetworkManager/system-connections
# reboot
```

Home Assistant OS 会在启动过程中重新创建默认连接配置。

### 启用 Wi-Fi

出于可靠性考虑，不建议使用 Wi-Fi。不过，如果你仍然想使用 Wi-Fi，可以通过 `ha network` 命令进行设置（以下示例以 Raspberry Pi 4 为例，请通过 `ha network info` 检查你的开发板是否支持 Wi-Fi 以及 Wi-Fi 设备名称）：

```bash
ha network update wlan0 --ipv4-method auto --wifi-auth wpa-psk --wifi-mode infrastructure --wifi-ssid "MY-SSID" --wifi-psk MY_PASS
```

### 节能

如果你在节能模式上遇到问题，可应用以下更改：

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

* 以 `root` 身份登录（无需密码）。在 `ha >` 提示符下，按提示输入 `login`。

然后使用 `nmcli` 配置工具。

* `# nmcli con show` 会列出当前使用的 "Home Assistant OS default" 连接。
* `# nmcli con show "Home Assistant OS default"` 会列出该连接的所有属性。

要开始编辑 "Home Assistant OS default" 的配置设置：

```bash
# nmcli con edit "Home Assistant OS default"
```

要添加静态 IP 地址（对于手动方法请选择 'yes'）：

```bash
nmcli> set ipv4.addresses 192.168.100.10/24
Do you also want to set 'ipv4.method' to 'manual'? [yes]:
```

此外，建议同时设置 DNS 服务器和本地网关。对于大多数家庭路由器，DNS 服务器的 IP 地址通常与路由器本身相同。如果你使用的是 Pi-Hole 或第三方 DNS 系统，也可以将 DNS 服务器设置为它们。

```bash
nmcli> set ipv4.dns 192.168.100.1
nmcli> set ipv4.gateway 192.168.100.1
```

`nmcli> print ipv4` 会显示该连接的 IPv4 属性。随后使用 `nmcli> save` 保存更改。

如果你此时查看默认连接 `cat /etc/NetworkManager/system-connections/default`，应能看到 method 已变为 manual，且 address 已设置。

执行 `nmcli con reload` 并不总是有效，因此请重启虚拟机或物理系统。

[nm-manual]: https://networkmanager.dev/docs/api/1.40/manpages.html

[configuration-usb]: /developers/operating-system/configuration.md

[uuid]: https://www.uuidgenerator.net/version4
