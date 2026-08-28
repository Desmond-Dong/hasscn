# Home Assistant 与 SSH

大多数系统工程师都非常熟悉 [SSH (Secure shell)](https://en.wikipedia.org/wiki/Secure_Shell)。这个工具由服务端和客户端两部分组成，用于以安全的方式访问远程系统。如果你正在运行 Home Assistant，但又不想把它直接暴露在公网中，它同样能帮上忙。在 Linux 系统上，SSH 通常默认可用。如果你使用的是 Windows 安装，则需要额外步骤，而这些内容不在本文讨论范围内。

在这篇博客文章中，我们将使用 SSH 的隧道功能来建立一条安全连接，并把 Home Assistant 前端转发到本地系统。

<!--more-->

涉及的双方如下：

* **远程系统**：运行 Home Assistant 的地方，通常位于你的家庭网络中。
* **本地系统**：你想查看前端的设备。

前提条件是，你需要在路由器上把 22 端口转发到家庭网络中运行 Home Assistant 的那台设备。你可能还需要在远程系统上通过 `$ sudo systemctl start sshd` 启用 SSH 守护进程，并调整主机防火墙设置。如果你运行的是 [Hass.io](/home-assistant/hassio/)，那就启用 [SSH Server add-on](/home-assistant/addons/ssh/)。你还必须具备一个公网 IP 地址或主机名，这可以通过动态 DNS 提供（例如 [NO-IP](https://www.noip.com/) 或 [DuckDNS](https://www.duckdns.org/)）。
在本地系统上，你只需要一个 SSH 客户端，并且你所在的网络允许 SSH 连接即可。

先来看一下我们要使用的命令。更多信息可以通过 `man ssh` 获取。

```bash
$ ssh -L 8000:localhost:8123 user@[IP_ADDRESS_REMOTE]
      |  |    |         |    |    |
      |  |    |         |    |    |_ IP address or hostname of your router.
      |  |    |         |    |_ Username on the remote system.
      |  |    |         |_ Port where the application is running.
      |  |    |_ We want the frontend on this system.
      |  |_ The port on our local system to use (above 1024).
      |_ We want to do local port forwarding.
```

一个可能的示例如下。

```bash
ssh -L 8000:localhost:8123 ha@192.168.0.11
```

第一次建立连接时，你需要接受指纹。

```bash
The authenticity of host '192.168.0.11 (192.168.0.11)' can't be established.
ECDSA key fingerprint is SHA256:asdf2faasd4gk45454fadr78wfadfasdfeg4vvvsae33.
ECDSA key fingerprint is MD5:44:d4:f7:44:d4:aa:b8:de:ef:09:3e:0d:4e:12:11:09.
Are you sure you want to continue connecting (yes/no)?
Warning: Permanently added '192.168.0.162' (ECDSA) to the list of known hosts.
ha@192.168.0.11's password:
Last login: Fri Oct 27 17:50:09 2017
[ha@home-assistant ~]$
```

现在你就可以在本地系统上使用前端了：`http://localhost:8000`

需要记住的几点：

* 如果你想通过互联网使用它，就需要公网 IP 地址或主机名（动态 DNS 也可以）。
* 你需要在路由器上设置端口转发。
* 不要允许 `root` 使用 SSH。请在远程系统上设置 `PermitRootLogin no`。
* 本地端口必须大于 1024。只有 `root` 才能转发 1024 以下的特权端口。
* 使用 [SSH keys for authentication](http://docs.fedoraproject.org//en-US/Fedora/14/html/Deployment_Guide/s2-ssh-configuration-keypairs.html) 而不是密码，以避免暴力破解攻击。
