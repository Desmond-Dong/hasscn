# 30 分钟在 Pi Zero W 上安装 Home Assistant

<p class="img">
  <img src="/home-assistant/images/blog/2017-05-hassbian-pi-zero/home_assistant_plus_rpi_600x315.png" />
</p>

:::warning

*这是一篇非常过时的指南。* 如果你按照它操作，你将安装一个非常过时的 Hassbian 版本，而且还是在一个只适合测试的硬件平台上。*我们强烈建议你不要按照这篇文章操作。*

:::

你昨天看到了 [HASSbian 1.21 的发布公告](/home-assistant/blog/2017/04/30/hassbian-1.21-its-about-time/)，是不是很兴奋？

今天，我们会把最新的 HASSbian 刷入一台 [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero/)。
额外的好处是，除了供电用的 USB 线之外，你不需要再接任何线缆。

你需要准备：

* 一台 Raspberry Pi Zero W（这是一台内置 Wi-Fi 的超小型电脑）
* 一张 microSD 卡
* 一个 USB 电源
* WiFi
* 一台台式机或笔记本电脑

开始吧！

首先，从[这里](https://github.com/home-assistant/pi-gen/releases/tag/v1.21)下载 HASSbian 1.21 镜像。

将其解压。

将镜像刷入 microSD 卡。如果你需要刷写工具，可以试试 [balenaEtcher](https://www.balena.io/etcher)。

刷写完成后，先拔出卡，再重新插入。你应该会看到一个名为 `boot` 的驱动器。

直接在这个驱动器的根目录下创建一个名为 `wpa_supplicant.conf` 的文件，不要放在任何文件夹里。

配置文件的内容应类似如下：
（你可能需要根据自己的网络环境调整，提示请参见[这里](https://www.raspberrypi.org/docs/configuration/wireless/wireless-cli.md)）

```text
network={
    ssid="YOUR_WIFI_NETWORK_NAME_HERE"
    psk="YOUR_WIFI_PASSWORD_HERE"
    key_mgmt=WPA-PSK
}
```

接着，把 SD 卡插入 Raspberry Pi Zero W，然后通电启动。

大约一分钟后，使用 SSH 客户端连接到 HASSbian（如果你使用 Mac，也可以连接 `hassbian.local`），用户名是 `pi`。默认密码是 `raspberry`。

建议你修改默认密码。可以使用 `passwd` 命令完成。

接下来，在 SSH 终端中输入以下两条命令：

```bash
sudo systemctl enable install_homeassistant.service
sudo systemctl start install_homeassistant.service
```

等待大约 15 到 20 分钟，完成后，你就能在 Raspberry Pi Zero W 上运行 Home Assistant 了。

要试用它，请打开 `http://hassbian:8123`，如果你使用的是 Mac，则可以访问 `http://hassbian.local:8123`。

如需了解 HASSbian 的更多细节，请查看文档。
