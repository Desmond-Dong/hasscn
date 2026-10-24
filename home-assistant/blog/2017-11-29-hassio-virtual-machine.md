# Set up Hass.io on top of a virtual machine

The 图像 for the 树莓派 family and the Intel NUC are an easy way to get started with [Hass.io](/home-assistant/getting-started.md). For a test or if you have a system which is already hosting virtual machines then the [**Hass.io installer**](/home-assistant/installation/index.md) is an option to use Hass.io in a virtualized environment. In this guide the host is a Fedora 27 system with [libvirt](https://libvirt.org/) support and the guest will be running Debian 9. Hass.io will be 已安装 on the guest.

<!--more-->

Assuming that you already have 设置 `libvirtd`. You might need to 安装 `virt-builder` and `virt-viewer` additionally.

```bash
sudo dnf -y install libguestfs-tools-c virt-install virt-viewer
```

We will create a virtual machine with Debian 9 and a 10 GB disk 图像 in the QCOW format. Use `$ virt-builder --list` to get an 概述 about what's operating systems are available if you prefer to use a different system.

```bash
$ sudo virt-builder debian-9 \
    --output /var/lib/libvirt/images/hassio.img \
    --format qcow2 \
    --size 10G \
    --root-password password:test123 \
    --hostname hassio \
    --firstboot-command "dpkg-reconfigure openssh-server"
[...]
[ 147.6] Finishing off
                   Output file: /var/lib/libvirt/images/hassio.img
                   Output size: 10.0G
                 Output format: qcow2
            Total usable space: 9.3G
                    Free space: 8.1G (87%)
```

Now, we are making our new virtual machine available for `libvirtd`. If you get an 错误 that the OS is unknown, use `$ osinfo-query os` to get the name to use with `--os-variant`. To access the virtual machine is connected to the bridge `bridge0`.

```bash
$ sudo virt-install --name hassio --import --ram 1024 \
     --os-variant debian9 -w bridge=bridge0 \
     --autostart --disk /var/lib/libvirt/images/hassio.img
```

<p class='img'>
  <img src='/home-assistant/images/blog/2017-11-hassio-virtual/virtual-machine-manager.png' />
  Hass.io virtual machine in Virtual Machine Manager
</p>

Depending on your preferences you can use the Virtual Machine Manager (`virt-manager`) or `virsh` to manage the 创建 virtual machine. 日志 in and create an 用户 with `# useradd ha` and set a 密码 with `# passwd ha`. We will need that 用户 to make a SSH connection to the virtual machine.

日志 in as `ha` with the given 密码. If your are using the default network of `libvirtd` then the DHCP range is defined in `/var/lib/libvirt/dnsmasq/default.conf`. In this guide the virtual machine is present at 192.168.0.109.

```bash
$ ssh ha@192.168.0.109
ha@192.168.0.109's password: 
Linux hassio 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2+deb9u3 (2017-08-06) x86_64
[...]
$ 
```

安装 the requirements after you 开关 the 用户 to `root`.

```bash
$ su
Password: 
root@hassio:/home/ha# 
root@hassio:/home/ha# apt-get update
root@hassio:/home/ha# apt-get install bash socat jq curl avahi-daemon \
    apt-transport-https ca-certificates
```

We want the latest Docker 发布. This requires additional steps to set it up as unlike other distributions Debian is lacking behind with current packages.

```bash
root@hassio:/home/ha# wget https://download.docker.com/linux/debian/gpg 
root@hassio:/home/ha# apt-key add gpg
OK
root@hassio:/home/ha# echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee -a /etc/apt/sources.list.d/docker.list
root@hassio:/home/ha# apt-get update
```

Now, it's possible to 安装 a current 发布 of [Docker](https://www.Docker.com/).

```bash
root@hassio:/home/ha# apt-get -y install docker-ce
```

Start `docker` and enable it.

```bash
root@hassio:/home/ha# systemctl start docker && systemctl enable docker
```

An [安装 脚本](https://github.com/home-assistant/hassio-build/tree/master/安装#安装-hassio) will take care about the 设置 of all moving parts.

```bash
root@hassio:/home/ha# curl -sL https://raw.githubusercontent.com/home-assistant/hassio-build/master/install/hassio_install | bash -
[INFO] Install supervisor docker
[INFO] Install generic HostControl
[INFO] Install startup scripts
[INFO] Init systemd
Created symlink /etc/systemd/system/multi-user.target.wants/hassio-supervisor.service → /etc/systemd/system/hassio-supervisor.service.
[INFO] Start services
```

If it's done, then there will be two new 容器.

```bash
root@hassio:/home/ha# docker ps
CONTAINER ID        IMAGE                                    COMMAND                  CREATED             STATUS              PORTS               NAMES
ada5bbfc74f0        homeassistant/qemux86-64-homeassistant   "/usr/bin/entry.sh..."   4 minutes ago       Up 4 minutes                            homeassistant
5954ac452ffc        homeassistant/amd64-hassio-supervisor    "/usr/bin/entry.sh..."   7 minutes ago       Up 7 minutes                            hassio_supervisor
```

After a connection to the 容器 which is containing Home Assistant is made, you will see the 日志 output.

```bash
root@hassio:/home/ha# docker attach --sig-proxy=false ada5bbfc74f0
2017-11-28 19:24:30 INFO (MainThread) [homeassistant.core] Bus:Handling <Event state_changed[L]: entity_id=sun.sun, old_state=<state sun.sun=below_horizon; next_dawn=2017-11-29T06:17:58+00:00,...
```

For further details about the 容器, `inspect` can help.

```bash
root@hassio:/home/ha# docker inspect bb32b525d1ad
[...]
            "OnBuild": null,
            "Labels": {
                "io.hass.arch": "amd64",
                "io.hass.machine": "qemux86-64",
                "io.hass.type": "homeassistant",
                "io.hass.version": "0.58.1"
            }
[...]
```

Hass.io is now ready. The 前端 is available at <http://192.168.0.109:8123>. Yes, the IP address is the one of the guest.

<p class='img'>
  <img src='/home-assistant/images/blog/2017-11-hassio-virtual/hassio.png' />
  Hass.io 概述
</p>

Keep in mind that there are limitations with this approach. Not all [add-ons](/home-assistant/addons/) will work and some don't make sense to use as the hardware is not present. E.g., use the [SSH community add-on](https://github.com/hassio-addons/addon-ssh) instead of the default [SSH add-on](/home-assistant/addons/ssh/).
