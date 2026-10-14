好，你的 Home Assistant 已经运行起来了，内置的 app 让你乐在其中，但你现在缺了某一个应用。是时候自己做一个 app 了！

要开始开发 app，我们首先需要访问 Home Assistant 查找本地 app 的位置。为此你可以使用 [Samba](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_samba) 或 [SSH](https://my.home-assistant.io/redirect/supervisor_addon/?addon=core_ssh) 这两个 app。

对于 Samba，启用并启动它之后，你的 Home Assistant 实例会出现在本地网络选项中，并共享一个名为"addons"的文件夹。这就是存放自定义 app 的文件夹。

:::tip
如果你使用的是 macOS 且文件夹没有自动显示，请到 Finder 中按 CMD+K，然后输入 `smb://homeassistant.local`
:::

对于 SSH，你需要先安装它。在启动之前，你必须有一对私钥/公钥，并将公钥存储在 app 配置中（[更多信息请参见文档](https://github.com/home-assistant/addons/blob/master/ssh/DOCS.md#configuration)）。启动后，你可以 SSH 到 Home Assistant，并将自定义 app 存储在 `/addons` 目录中。

一旦你找到了 app 目录，就可以开始了！

## 第 1 步：基础

* 创建一个名为 `hello_world` 的新目录
* 在该目录中创建三个文件：
  * `Dockerfile`
  * `config.yaml`
  * `run.sh`

### `Dockerfile` 文件

这是用于构建你 app 的镜像。

```dockerfile
FROM ghcr.io/home-assistant/base:latest

# Copy data for app
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

### `config.yaml` 文件

这是你的 app 配置，它告诉 Supervisor 该做什么以及如何展示你的 app。

有关所有有效 app 配置选项的概述，请参见 [App configuration options](/developers/apps/configuration.md#app-configuration)。

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.0.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
```

### `run.sh` 文件

这是你的 app 启动时运行的脚本。

```shell
#!/usr/bin/with-contenv bashio

echo "Hello world!"
```

:::note
请确保你的编辑器使用类 UNIX 换行符（LF），而不是 DOS/Windows（CRLF）。
:::

## 第 2 步：安装和测试你的 app

现在到了有趣的部分，打开 Home Assistant UI 并安装、运行你的 app。

* 打开 Home Assistant 前端
* 进入"Settings"
* 点击"Apps"
* 点击右下角的"App store"。

[![Open your Home Assistant instance and show the Supervisor app store.](https://my.home-assistant.io/badges/supervisor_store.svg)](https://my.home-assistant.io/redirect/supervisor_store/)

* 在右上角的三点菜单中，点击"Check for updates"按钮
* 根据需要刷新网页
* 你现在应该能在商店顶部看到一个名为"Local apps"的新版块，其中列出了你的 app！

![Screenshot of the local repository card](/img/en/hass.io/screenshots/local_repository.png)

* 点击你的 app 进入 app 详情页面
* 安装你的 app
* 启动你的 app
* 点击"Logs"标签页，并刷新你的 app 日志，你现在应该在日志中看到"Hello world!"

![Screenshot of the app logs](/img/en/hass.io/tutorial/addon_hello_world_logs.png)

### 我看不见我的 app？!

糟糕！你在商店中点击了"Check for updates"，但你的 app 没有显示。或者也许你只是更新了一个选项，点击刷新后看到你的 app 消失了。

发生这种情况时，请先尝试按下 <kbd>Ctrl</kbd> + <kbd>F5</kbd>（Windows/Linux）或 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>（macOS）来刷新浏览器的缓存。如果这没有帮助，那就说明你的 `config.yaml` 无效。它要么是[无效的 YAML](http://www.yamllint.com/)，要么是指定的某个选项不正确。要查看出了什么问题，请转到["Settings" → "System" → "Logs"，并在右上角的下拉菜单中选择"Supervisor"](https://my.home-assistant.io/redirect/logs/?provider=supervisor)。这会带你进入一个包含 supervisor 日志的页面。滚动到底部，你应该能找到验证错误。

修复错误后，回到 app 商店，再次点击"Check for updates"。

## 第 3 步：托管服务器

到目前为止我们只做了一些基本的事情，但这还不是很实用。所以让我们再进一步，托管一个我们在端口上公开的服务器。为此，我们将使用 Python 3 自带的内置 HTTP 服务器。

要做到这一点，我们需要按以下方式更新文件：

* `Dockerfile`：安装 Python 3
* `config.yaml`：将容器中的端口在主机上公开
* `run.sh`：运行 Python 3 命令启动 HTTP 服务器

更新你的 `Dockerfile`：

```dockerfile
FROM ghcr.io/home-assistant/base:latest

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

在 `config.yaml` 中添加"ports"。这将使容器内 8000 端口的 TCP 在主机上以 8000 端口可用。

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.1.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
startup: services
ports:
   8000/tcp: 8000
```

更新 `run.sh` 以启动 Python 3 服务器：

```shell
#!/usr/bin/with-contenv bashio

echo "Hello world!"

python3 -m http.server 8000
```

## 第 4 步：安装更新

由于我们在 `config.yaml` 中更新了版本号，Home Assistant 在查看 app 详情时会显示一个更新按钮。你可能需要刷新浏览器，或在 app 商店中点击"Check for updates"按钮才能看到它。如果你没有更新版本号，你也可以卸载并重新安装 app。重新安装 app 后，请确保启动它。

现在导航到 <http://homeassistant.local:8000> 查看我们的服务器运行效果！

![Screenshot of the file index served by the app](/img/en/hass.io/tutorial/python3-http-server.png)

## 奖励：使用 app 选项

在上面的截图中，你可能注意到我们的服务器只提供了一个文件：`options.json`。这个文件包含此 app 的用户配置。因为我们在 `config.yaml` 中为 `options` 和 `schema` 键指定了两个空对象，所以生成的文件当前是空的。

让我们看看能否向该文件中写入一些数据！

为此，我们需要指定默认选项和一个让用户修改选项的 schema。用以下内容更改 `config.yaml` 中的 options 和 schema 条目：

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

重新加载 app 商店并重新安装你的 app。你现在会在 app 配置屏幕中看到可用的选项。当你回到我们的 Python 3 服务器并下载 `options.json` 时，你会看到你设置的选项。[options.json 在 `run.sh` 中使用的示例](https://github.com/home-assistant/apps-example/blob/main/example/rootfs/etc/services.d/example/run#L12-L17)

## 奖励：模板 app 仓库

我们维护了一个完整的模板示例仓库，你可以用它来开始构建 app。你可以在 [`home-assistant/addons-example` 仓库](https://github.com/home-assistant/addons-example) 中找到它。
