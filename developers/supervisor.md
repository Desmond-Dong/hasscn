# Home Assistant Supervisor 开发

Supervisor 允许用户直接在 Home Assistant 中管理自己的安装环境。Supervisor 主要负责以下内容：

* 运行 Home Assistant Core
* 更新 Home Assistant Core；如果更新失败会自动回滚。
* 创建并恢复备份
* 管理加载项（Add-ons）
* 提供统一音频系统
* 更新 Home Assistant 操作系统（在 Supervised 安装中禁用）

## 架构

<img class='invertDark' src='/developers/img/en/architecture/ha_architecture_2020.png'
alt='Home Assistant 架构概览' />

<!--
  https://docs.google.com/drawings/d/13-72kr05yK31HrQEMpt7Y45jPqKsMxBeFYX1PUatTuE/edit?usp=sharing
-->

* **Home Assistant Core**：家庭自动化平台
* **Add-ons**：用户希望在服务器上运行的加载项应用
* **DNS**：允许 Core 与加载项（Add-ons）相互通信
* **Audio**：允许 Core 与加载项（Add-ons）播放音频
* **mDNS**：帮助发现并连接网络中的设备和服务
* **Supervisor**：管理系统的所有部分并使其保持最新状态
* **Docker**：用于运行应用程序的容器平台。
* **Operating System**：基于 Linux 的操作系统
* **D-Bus**：用于控制操作系统部分组件（如网络管理器）的通信系统
