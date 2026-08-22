{/\* MDX 组件 \*/}
import {useState} from 'react';

export const RepositoryOpener = () => {
const \[value, setValue] = useState("");
const repoUrl = `vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=${encodeURIComponent(value)}`;
return <div>
\<input onInput={(ev) => setValue(ev.target.value)} style={{width: "80%", display: "inline-block", marginRight: 16}} /> <a href={repoUrl}>\<button style={{cursor: value === "" ? "default" : "pointer"}} disabled={value === ""}>Open</button></a>

  </div>
}

如果你想为 Home Assistant 开发新功能或 component，需要设置一个开发环境。继续阅读以了解如何设置。

## 使用 Visual Studio Code + devcontainer 进行开发

请按照我们的[devcontainer 开发环境](/developers/setup_devcontainer_environment.md)指南，先设置好合适的开发环境。

:::note
由于此方法使用容器，你可能会遇到在容器中暴露 USB 设备和适配器（板载蓝牙、Zigbee 等）进行测试的挑战。在 Linux 主机上进行开发时这是可能的；然而，如果你使用 Windows 或 MacOS 计算机进行开发，则无法直接访问此类硬件。
:::

**前提条件**

* [Docker](https://docs.docker.com/get-docker/)
* [Visual Studio code](https://code.visualstudio.com/)
* [Git](https://git-scm.com/)

**入门：**

1. 前往 [Home Assistant core 仓库](https://github.com/home-assistant/core) 并点击 **Fork**。
2. 复制你的 fork 的 URL 并粘贴到下方，然后点击 **Open**： <RepositoryOpener />
3. 浏览器会提示你是否使用 Visual Studio Code 打开该链接，点击 **Open Link**。
4. 当 Visual Studio Code 询问你是否要安装 Dev Containers 扩展时，点击 **Install**。
5. dev container 镜像将被构建（这可能需要几分钟），完成之后，你的开发环境就准备好了。
6. 你可以通过以下步骤验证 dev container 是否设置正确：
   1. 在 Visual Studio Code 中打开命令面板：
      * Mac: `Shift`+`Command`+`P`
      * Windows/Linux: `Ctrl`+`Shift`+`P`
   2. 选择 **Tasks: Run Task** -> **Run Home Assistant Core**
   3. 终端应该会打开并开始输出活动。检查是否有错误，并等待输出停止或减缓。
   4. 在浏览器中访问 `http://localhost:8123`，你应该能看到 Home Assistant 的设置屏幕。

将来，如果你想回到开发环境：打开 Visual Studio Code，点击侧边栏中的 **Remote Explorer** 按钮，在侧边栏顶部选择 **Containers**。

**故障排除**

* 如果你的容器因为依赖项过时或先前构建的 devcontainer 而无法构建，它可能使用的是你仓库的过时 fork。请按照以下步骤操作：
  * 确保你的 GitHub fork 与主 Home Assistant core 仓库保持最新。
  * 在终端中运行 `docker buildx prune` 清理本地 Docker 构建文件。
  * 如果构建仍然失败：
    * 选择"Open configuration in recovery devcontainer."
    * 打开终端（如果尚未打开）。
    * 运行 `git pull upstream dev` 并确保它应用了最新版本。
    * 在 Visual Studio Code 中打开命令面板 - `Shift`+`Command`+`P`（Mac）/ `Ctrl`+`Shift`+`P`（Windows/Linux）。
    * 选择"Dev Containers: Rebuild Container."

### 任务

dev container 附带了一些有用的任务，可帮助你进行开发。你可以通过 `Shift`+`Command`+`P`（Mac）/ `Ctrl`+`Shift`+`P`（Windows/Linux）打开命令面板，选择 **Tasks: Run Task**，然后选择要运行的任务来运行这些任务。

当某个任务正在运行时（例如文档的 `Preview`），可以通过打开命令面板并选择 **Tasks: Restart Running Task**，然后选择要重启的任务来重新启动它。

### 使用 Visual Studio Code 进行调试

如果 dev container 设置正确，它默认就支持开箱即用的调试。它提供了必要的调试配置，因此按下 F5 应该会启动 Home Assistant。代码中设置的所有断点都应该被触发，调试器会停止。

也可以通过按照[此处](https://www.home-assistant.io/integrations/debugpy/)描述的过程，调试一个远程的 Home Assistant 实例（例如生产实例）。

## 手动环境

*如果你不想使用 devcontainers，才需要这些说明。*

也可以设置一个更传统的开发环境。请在下方找到对应你操作系统的部分。确保你的 Python 版本是 3.14.2 或更高。

:::note
如果没有安装正确的 Python 版本就继续进行，你将得到一个与 Home Assistant 不兼容的虚拟环境。安装正确版本后，删除 `venv` 目录并继续设置，以使用正确版本重新创建它。
:::

### 在 Ubuntu / Debian 上开发

安装核心依赖项。

```shell
sudo apt-get update
sudo apt-get install python3-pip python3-dev python3-venv autoconf libssl-dev libxml2-dev libxslt1-dev libjpeg-dev libffi-dev libudev-dev zlib1g-dev pkg-config libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev libswscale-dev libswresample-dev libavfilter-dev ffmpeg libgammu-dev build-essential
```

### 在 Fedora 上开发

安装核心依赖项。

```shell
sudo dnf update
sudo dnf install python3-pip python3-devel python3-virtualenv autoconf openssl-devel libxml2-devel libxslt-devel libjpeg-turbo-devel libffi-devel systemd-devel zlib-devel pkgconf-pkg-config libavformat-free-devel libavcodec-free-devel libavdevice-free-devel libavutil-free-devel libswscale-free-devel ffmpeg-free-devel libavfilter-free-devel ffmpeg-free gcc gcc-c++ cmake
```

### 在 Arch / Manjaro 上开发

安装核心依赖项。

```shell
sudo pacman -Sy base-devel python python-pip python-virtualenv autoconf libxml2 libxslt libjpeg-turbo libffi systemd zlib pkgconf ffmpeg gcc cmake
```

### 在 NixOS 上开发

将下面的内容保存为 `default.nix` 并放入你检出的仓库中，然后使用例如 [direnv](https://direenv.net/) 来激活它。

```nix
let
  pkgs = import <nixpkgs> { };
in
pkgs.mkShell {
  packages = with pkgs; [
    autoconf
    clang
    cmake
    ffmpeg
    ffmpeg.dev
    gammu
    libffi.dev
    libjpeg.dev
    libxml2.dev
    libxslt.dev
    openssl_3.dev
    pkg-config
    python314
    zlib.dev
  ];
  env = {
    LD_LIBRARY_PATH = "${pkgs.libjpeg.out}/lib";
  };
}
```

### 在 Windows 上开发

要在 Windows 上开发，你需要使用 Linux 子系统（WSL）。请按照[WSL 安装说明](https://learn.microsoft.com/windows/wsl/install)操作，并从 Windows 商店安装 Ubuntu。一旦能够访问 Linux，就按照 Linux 的说明操作。

在 WSL 中工作时，请确保将所有代码/仓库保留在 WSL 环境中，以避免出现文件权限问题。

:::tip
如果你发现在使用 WSL 时无法通过 <http://localhost:8123> 访问开发实例，请改在 WSL 终端中运行 `ip addr show eth0` 查找 `eth0` 适配器的 `inet` 地址。然后使用该地址（排除 CIDR 块）来访问开发实例，例如，如果你的 `inet` 显示为 `172.20.37.6/20`，则使用 <http://172.20.37.6:8123>。
:::

:::tip
WSL 中的默认网络模式是 NAT。它有一些缺点，例如 Home Assistant 无法发现网络上的设备，并且使从 LAN 访问 Home Assistant 变得困难。或者，可以将网络模式设置为"Mirrored"，这将使 WSL 使用与主机相同的网络接口（它们甚至有相同的 IP），并且具有诸如支持 Multicast（启用 mDNS 设备发现）等好处。

请查看 [WSL Mirrored 模式网络文档](https://learn.microsoft.com/en-us/windows/wsl/networking#mirrored-mode-networking) 以获取有关如何启用它的详细信息。
:::

### 在 macOS 上开发

安装 [Homebrew](https://brew.sh/)，然后使用它安装依赖项：

```shell
brew install python3 autoconf ffmpeg cmake make
```

Home Assistant 的某些 Python 依赖项（如 `cryptography` 和 `orjson`）包含用 Rust 编写的扩展。如果你的 Python 版本和平台没有可用的预构建 wheel，pip 会从源代码构建它们，这需要 [Rust 工具链](https://www.rust-lang.org/tools/install)。如果下面的 `script/setup` 脚本因缺少 `rustc` 或 `cargo` 而失败，请同时安装 Rust：

```shell
brew install rust
```

如果在运行下面的 `script/setup` 脚本时遇到 `cryptography` 的构建问题，请查看 cryptography 文档中的[安装说明](https://cryptography.io/en/latest/installation/#building-cryptography-on-macos)。

### 设置本地仓库

访问 [Home Assistant Core 仓库](https://github.com/home-assistant/core) 并点击 **Fork**。
完成 fork 后，使用以下命令设置源代码的本地副本：

```shell
git clone https://github.com/YOUR_GIT_USERNAME/name_of_your_fork
cd name_of_your_fork
git remote add upstream https://github.com/home-assistant/core.git
```

使用一个名为 `setup` 的脚本安装 requirements。

```shell
script/setup
```

这将创建一个虚拟环境并安装所有必要的 requirements。现在你可以开始了！

每次你开始一个新的终端会话，都需要激活你的虚拟环境：

```shell
source .venv/bin/activate
```

之后你可以这样运行 Home Assistant：

```shell
hass -c config
```

如果在 *macOS* 上运行此命令时遇到崩溃（`SIGKILL`），这很可能是由于缺少蓝牙权限造成的。你可以通过为你的终端应用程序添加此权限来修复它（**System Preferences** -> **Security & Privacy** -> **Bluetooth**）。

Home Assistant 的配置存储在你的仓库根目录下的 `config` 目录中。
