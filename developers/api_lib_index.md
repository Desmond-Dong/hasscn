Home Assistant 的基础规则之一是，我们不包含任何特定协议的代码。相反，这类代码应该放入一个独立的 Python 库并发布到 PyPI。本指南将介绍如何开始！

## Basic library requirements

* 库必须提供 source distribution packages，不允许依赖仅具有 binary distribution packages 的包。
* 发布在 PyPi 上的库版本应与公开在线仓库中标记的 releases 相对应。
* PyPi 上的发布必须是自动化的。
* 与外部设备或服务通信的外部 Python 库必须启用 issue trackers。
* 如果库主要用于 Home Assistant，并且你是该 integration 的 code owner，建议使用带有指向 [Home Assistant Core Issues](https://github.com/home-assistant/core/issues) 链接的 issue template picker。例如：[zwave-js-server-python - New Issue](https://github.com/home-assistant-libs/zwave-js-server-python/issues/new/choose)
* 库及其可能的子依赖必须使用 [OSI-approved license](https://opensource.org/license) 许可。这应在库的 metadata 中反映出来。

在本指南中，我们将假设我们正在为可通过 HTTP 访问并返回 JSON 对象结构化数据的 Rest API 构建库。这是我们最常见的 API 类型。这些 API 可以在设备本身访问，也可以在云端访问。

本指南并不完美适用于所有 API。你可能需要对示例进行调整。

:::info
如果你是正在为产品设计新 API 的制造商，[请阅读此处关于为产品添加最佳 API 类型的建议](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#local-device-pushing-new-state)。
:::

HTTP API 请求由四个不同的部分组成：

* URL。这是我们要从中获取数据的路径。对于 Rest API，URL 将唯一标识资源。URL 的示例有 `http://example.com/api/lights` 和 `http://example.com/api/light/1234`。
* HTTP method。它定义了我们希望从 API 获得什么。最常见的有：
  * `GET` 用于获取信息，例如 light 的状态
  * `POST` 用于执行操作（例如打开 light）
* Body。这是我们要发送到服务器的数据，用于标识需要执行的操作。对于 `POST` 请求，这就是我们发送命令的方式。
* Headers。它包含描述请求的 metadata。它将用于将 authorization 附加到请求中。

## 构建库的结构

我们的库将包含两个不同的部分：

* **Authentication：** 负责向 API endpoint 发起经过认证的 HTTP 请求并返回结果。这是唯一实际与 API 交互的代码部分。
* **Data models：** 表示数据并提供与数据交互的命令。

## 在 Home Assistant 中试用你的库

如果你想将库发布到 PyPI 之前在 Home Assistant 中试用它，需要运行可编辑版本的库。

进入你的 Home Assistant 开发环境，激活虚拟环境并输入：

```shell
pip3 install -e ../my_lib_folder
```

现在运行 Home Assistant 时跳过从 PyPI 安装依赖，以避免覆盖你的包。

```shell
hass --skip-pip-packages my_lib_module_name
```
