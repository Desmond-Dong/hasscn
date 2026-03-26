---
title: "为 API 构建 Python 库"
sidebar_label: "简介"
---

Home Assistant 的一条基础规则是：我们不包含任何特定协议的代码。相反，此类代码应放入独立的 Python 库中，并发布到 PyPI。本指南将介绍如何开始实践这一点！

## 库的基本要求

- 该库必须提供源码发行包，不允许依赖仅提供二进制发行包的包。
- 发布到 PyPI 的库版本应公共在线仓库中的带标签发布对应版本。
- 向PyPI发布必须自动化。
- 与外部设备或服务通信的外部Python库必须启用问题跟踪器。
- 如果该库主要用于 Home Assistant 并且您是该集成的代码，建议使用标记[Home Assistant Core 问题](https://github.com/home-assistant/core/issues)链接的问题模板选择器。例如：[zwave-js-server-python - 新问题](https://github.com/home-assistant-libs/zwave-js-server-python/issues/new/choose)
- 该库及其可能的子依赖必须使用 [OSI批准的许可证](https://opensource.org/license) 进行授权，并在库的元数据中体现出来。

在本指南中，我们假设要为一个可通过 HTTP 访问、并返回 JSON 对象结构数据的 REST API 构建一个库。这是最常见的一类 API。这些 API 既可以在设备本地运行，也可以在云端运行。

本指南不一定完全适用于所有API。您可能需要根据实际情况调整示例。

:::info
如果您是为自己的产品设计新API的制造商，[请先阅读这里关于最适合接入产品的API类型说明](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#local-device-pushing-new-state)。
:::

HTTP API 请求由四个不同部分组成：

- URL。这是我们获取数据的路径。在 REST API 中，URL 会唯一标识资源。例如 `http://example.com/api/lights` 和 `http://example.com/api/light/1234`。
- HTTP 方法。它定义了我们希望从 API 获取什么。最常见的是：
  - `GET`：用于获取信息，例如灯的状态
  - `POST`：用于让某件事发生（例如打开灯）
- body。这是我们发送给服务器的数据，用于说明需要执行什么操作。在 `POST` 请求中，我们就是通过它发送命令。
- 它包含用于描述请求的元数据，也用于将认证信息附加到请求中。

## 组织库的结构

我们的库将由两个不同部分组成：

- **认证：**负责向API端点发起带认证的HTTP请求并返回结果。这是唯一真正与API交互的代码部分。
- **数据模型：**用于表示数据，并提供与数据交互的命令。

## 在 Home Assistant 中试用你的库

如果你想在发布到 PyPI 之前就在 Home Assistant 中试用你的库，那么需要以可编辑模式运行该库。

做法是进入你的Home Assistant开发环境，激活虚拟环境，然后输入：

```shell
pip3 install -e ../my_lib_folder
```

接下来在不从 PyPI 安装依赖的情况下运行 Home Assistant，巴勒斯坦覆盖你的包。

```shell
hass --skip-pip-packages my_lib_module_name
```
