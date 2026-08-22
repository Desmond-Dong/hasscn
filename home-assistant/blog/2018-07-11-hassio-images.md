# 基于 HassOS 的全新 Hass.io 镜像

经过 4 个月的努力，我们很高兴发布基于 HassOS 的全新 Hass.io 镜像。HassOS 是我们专为运行 Hass.io 打造的全新操作系统。是的，它支持树莓派 3 B+！

## What is new

我们在 \[Buildroot] 框架之上构建了 HassOS。这个系统的目标是做成一个非常小巧且高效的操作系统，以类似 hypervisor 的方式运行 Docker。系统只安装了运行 Supervisor 所需的最小软件集。我们也重点加强了安全性，例如没有默认密码，并使用 \[AppArmor] 保护 HassOS 上的应用与容器。

主要特性：

* 通过 USB 或互联网（OTA）使用 \[Rauc] 进行安全更新
* 根文件系统与部分内存采用 LZ4 压缩
* 只读根文件系统，专为嵌入式系统设计
* 支持通过 D-Bus 连接主机服务
* 使用最新 LT Linux 内核
* 使用最新 Docker-ce 版本
* 完整支持 NetworkManager
* 通过 Bluez 提供蓝牙支持
* 支持多种不同硬件

## Migration

HassOS 与 ResinOS 的设计不同，因此我们无法提供从旧 ResinOS 系统到新 HassOS 系统的 OTA 更新。

你需要按以下步骤升级：

1. 如果你已安装蓝牙插件，请先移除，它已经不再需要。
2. 为当前系统创建 Hass.io snapshot，并下载到你的电脑。
3. 下载最新的 \[Hass.io stable]\[安装] 版本。
4. 使用 \[balenaEtcher] 将下载好的 Hass.io 镜像刷入 SD 卡。
5. 树莓派：如果你改过引导分区里的 `config.txt`，也需要把这些改动应用到 HassOS。请**不要**直接把旧配置文件复制到 HassOS，务必手动应用变更。
6. 如果你使用自定义网络配置，或配置了 SSH 开发访问，需要准备一个配置用 \[USB stick]。将 `resin-sample` 复制到 U 盘的 `network` 文件夹后插入设备。
7. 将刚刷好的 HassOS SD 卡装回设备并开机。
8. 通过 SSH 或 Samba 插件把 snapshot 拷贝到主机。
9. 通过 Hass.io 面板恢复你的 snapshot。
10. 完成！

## Future

HassOS 是一个非常棒的基础系统，让我们可以开始把各种强大功能集成进 Hass.io（并同步带到 UI 中）。例如我们计划把网络和蓝牙配置能力加入 UI。目标是打造功能完整、任何人都能上手的 Home Assistant 中枢系统。

Hass.io API 很全面，我们也会把更多能力引入 Home Assistant。例如可以监控插件乃至 Home Assistant 本身系统资源占用的传感器。

特别感谢所有捐款帮助我们购买硬件的朋友！我们已经开始让 HassOS 兼容更多硬件，目前目标是每 7-14 天发布对新设备的支持，并持续推进，直到覆盖主流 IoT 开发板。

欢迎加入项目，一起改进文档或参与其他能推动项目前进的工作。

\[Rauc]: Safe and Secure Updating
\[Buildroot]: https://buildroot.org/
\[AppArmor]: https://gitlab.com/apparmor/apparmor/wikis/home/
\[USB stick]: https://github.com/home-assistant/hassos/blob/rel-1/docs/configuration.md#automatic
\[安装]: /hassio/installation/
\[balenaEtcher]: https://www.balena.io/etcher
