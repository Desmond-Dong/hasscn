Supervisor 允许用户从 Home Assistant 内部管理他们的 Home Assistant 安装。Supervisor 有以下职责：

* 运行 Home Assistant Core
* 更新 Home Assistant Core。如果更新失败则自动回滚。
* 创建和恢复 backups
* 安装和运行 Home Assistant Apps（前身为 Home Assistant add-ons）
* 统一的 audio 系统
* 更新 Home Assistant operating system（在 Supervised 安装中禁用）

## 架构

<img class='invertDark' src='/img/en/architecture/ha_architecture_2020.png'
alt='Architecture Overview of Home Assistant' />

<!--
  https://docs.google.com/drawings/d/13-72kr05yK31HrQEMpt7Y45jPqKsMxBeFYX1PUatTuE/edit?usp=sharing
-->

* **Home Assistant Core**: 家庭自动化平台
* **Apps（前身为 add-ons）**: 用户希望在其服务器上运行的额外应用程序
* **DNS**: 允许 core 和 apps（前身为 add-ons）相互通信
* **Audio**: 允许 core 和 apps（前身为 add-ons）播放 audio
* **mDNS**: 帮助发现网络中的设备和连接服务
* **Supervisor**: 管理系统的所有部分并保持其最新
* **Docker**: 用于运行应用程序的 container 服务。
* **Operating System**: 基于 Linux 的操作系统
* **D-Bus**: 用于控制操作系统部分（如 network manager）的通信系统
