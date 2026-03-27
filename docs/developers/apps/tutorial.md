---
title: "教程：制作您的第一个应用程序"
description: '因此，您已经使用了 Home Assistant，并且一直在享受内置应用程序，但您缺少这个应用程序。是时候制作您自己的应用程序了！。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 教程：制作您的第一个应用程序

因此，您已经使用了 Home Assistant，并且一直在享受内置应用程序，但您缺少这个应用程序。是时候制作您自己的应用程序了！

要开始开发应用程序，我们首先需要访问 Home Assistant 查找本地应用程序的位置。为此，您可以使用[Samba](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_samba) 或[SSH](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) 应用程序。

对于 Samba，一旦启用并启动它，您的 Home Assistant 实例将显示在您的本地网络选项卡中，并共享一个名为“addons”的文件夹。这是存储您的自定义应用程序的文件夹。

:::tip
如果您使用的是 macOS 并且该文件夹没有自动显示，请转到 Finder 并按 CMD+K，然后输入 `smb://homeassistant.local`
:::

对于 SSH，您必须安装它。在启动之前，您必须拥有私钥/公钥对并将公钥存储在应用程序配置中 ([see docs for more info](https://github.com/home-assistant/addons/blob/master/ssh/DOCS.md#configuration))。启动后，您可以通过 SSH 连接到 Home Assistant 并将自定义应用程序存储在 `/addons` 目录中。

找到应用程序目录后，就可以开始了！

## 第 1 步：基础知识

- 创建一个名为`hello_world`的新目录
- 在该目录中创建三个文件：
  - @@保护0@@
  - @@保护0@@
  - @@保护0@@

### `Dockerfile` 文件

这是将用于构建您的应用程序的图像。

```dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Copy data for app
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

### `config.yaml` 文件

这是您的应用程序配置，它告诉主管要做什么以及如何展示您的应用程序。

有关所有有效应用程序配置选项的概述，请参阅[App configuration options](/developers/apps/configuration#app-configuration)。

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.0.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
  - armhf
  - armv7
  - i386
```

### `run.sh` 文件

这是您的应用程序启动时将运行的脚本。

```shell
#!/usr/bin/with-contenv bashio

echo "Hello world!"
```

:::note
确保您的编辑器使用类似 UNIX 的换行符 (LF)，而不是 DOS/Windows (CRLF)。
:::

## 第 2 步：安装并测试您的应用程序

现在到了有趣的部分，是时候打开 Home Assistant UI 并安装并运行您的应用程序了。

- 打开家庭助理前端
- 前往“设置”
- 点击“应用程序”
- 点击右下角的“应用商店”。

@@保护0@@](/developers/@@保护1@@)

- 在右上角的三点菜单上，单击“检查更新”按钮
- 需要时刷新您的网页
- 您现在应该在商店顶部看到一个名为“本地应用程序”的新部分，其中列出了您的应用程序！

!@@保护0@@

- 单击您的应用程序即可转到应用程序详细信息页面。
- 安装您的应用程序
- 启动您的应用程序
- 单击“日志”选项卡，然后刷新应用程序的日志，您现在应该看到“Hello world！”在你的日志中。

!@@保护0@@

### 我没有看到我的应用程序？！

哎呀！您在商店中点击了“检查更新”，但您的应用程序没有显示。或者您可能只是更新了一个选项，单击刷新并看到您的应用程序消失了。

发生这种情况时，请先尝试按 <kbd>Ctrl</kbd> + <kbd>F5</kbd> (Windows/Linux) 或 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> (macOS) 刷新浏览器缓存。如果这没有帮助，则意味着您的`config.yaml` 无效。它要么是[invalid YAML](http://www.yamllint.com/)，要么指定的选项之一不正确。要查看出了什么问题，请转到["Settings" → "System" → "Logs" and select "Supervisor" in the top-right drop-down menu](https://my.home-assistant.io/redirect/logs/?provider=supervisor)。这应该会将您带到包含主管日志的页面。滚动到底部，您应该能够找到验证错误。

修复错误后，请转到应用商店并再次单击“检查更新”。

## 第 3 步：托管服务器

到目前为止，我们已经能够做一些基本的事情，但还不是很有用。因此，让我们更进一步，托管我们在端口上公开的服务器。为此，我们将使用 Python 3 附带的内置 HTTP 服务器。

为此，我们需要按如下方式更新文件：

- `Dockerfile`：安装Python 3
- `config.yaml`：使容器中的端口在主机上可用
- `run.sh`：运行Python 3命令来启动HTTP服务器

更新您的`Dockerfile`：

```dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for app
RUN \
  apk add --no-cache \
    python3

# Python 3 HTTP Server serves the current working dir
# So let's set it to our app persistent data directory.
WORKDIR /data

# Copy data for app
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

将“端口”添加到`config.yaml`。这将使容器内端口 8000 上的 TCP 在端口 8000 上的主机上可用。

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.1.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
  - armhf
  - armv7
  - i386
startup: services
ports:
  8000/tcp: 8000
```

更新`run.sh`以启动Python 3服务器：

```shell
#!/usr/bin/with-contenv bashio

echo "Hello world!"

python3 -m http.server 8000
```

## 第 4 步：安装更新

由于我们更新了 `config.yaml` 中的版本号，Home Assistant 在查看应用程序详细信息时将显示更新按钮。您可能需要刷新浏览器或单击应用程序商店中的“检查更新”按钮才能显示。如果您没有更新版本号，也可以卸载并重新安装该应用程序。再次安装该应用程序后，请确保启动它。

现在导航到[http://homeassistant.local:8000](http://homeassistant.local:8000) 以查看我们的服务器正在运行！

!@@保护0@@

## 奖励：使用应用程序选项

在屏幕截图中，您可能已经看到我们的服务器仅提供 1 个文件：`options.json`。此文件包含此应用程序的用户配置。因为我们在`config.yaml` 中为`options` 和`schema` 键指定了两个空对象，所以生成的文件当前为空。

让我们看看是否可以将一些数据放入该文件中！

为此，我们需要指定默认选项以及供用户更改选项的架构。使用以下内容更改 `config.yaml` 中的选项和架构条目：

```yaml
...
options:
  beer: true
  wine: true
  liquor: false
  name: "world"
  year: 2017
schema:
  beer: bool
  wine: bool
  liquor: bool
  name: str
  year: int
...
```

重新加载应用程序商店并重新安装您的应用程序。您现在将在应用程序配置屏幕中看到可用的选项。当您现在返回到我们的 Python 3 服务器并下载 `options.json` 时，您将看到您设置的选项。 @@保护1@@

## 奖励：模板应用程序存储库

We maintain a full template example repository for apps you can use to get started.您可以在[`home-assistant/addons-example` repository](https://github.com/home-assistant/addons-example) 中找到它。