---
title: "展示您的应用程序"
description: '如果您选择向公众提供您的应用程序（以前称为插件），提供清晰的信息、图形和安全保证将有助于吸引用户。以下建议是展示您的应用程序的指南。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 展示您的应用程序

如果您选择向公众提供您的应用程序（以前称为插件），提供清晰的信息、图形和安全保证将有助于吸引用户。以下建议是展示您的应用程序的指南。

## 添加简介

这会显示在应用程序商店中，并向用户提供应用程序功能的简短描述。

这个包含简介的文件通常称为“README”，通常作为`README.md` 文件发布。

## 添加文档

良好的文档可以帮助应用程序的使用者了解其用法、解释配置选项、在用户有疑问或问题时为用户指明正确的方向，并包含发布应用程序所依据的许可证。

该包含文档的文件通常称为“DOCS”，通常发布为`DOCS.md` 文件。

## 应用程序图标和徽标

一张图胜过一千个字。因此，您的应用程序可以通过添加适当的图像图标和徽标来改进。这些图像在 Home Assistant Supervisor 面板中显示您的应用程序时使用，并将显着改善您的应用程序的视觉表现。

您的应用程序徽标的要求：

- 徽标必须采用便携式网络图形格式 (`.png`)。
- 文件名必须是`logo.png`。
- 建议将徽标尺寸保持在 250x100px 左右。您可以选择使用您认为适合您的应用的不同尺寸或长宽比。

您的应用程序图标的要求：

- 该图标必须采用便携式网络图形格式 (`.png`)。
- 文件名必须是`icon.png`。
- 图标的长宽比必须为 1x1（正方形）。
- 建议使用 128x128px 的图标尺寸。

## 保留变更日志

您将来可能会发布应用程序的新版本。如果发生这种情况，您的应用程序的用户将看到升级通知，并且可能想知道最新版本中进行了哪些更改。

更改日志是一个文件，其中包含应用程序每个版本的按时间顺序排列的显着更改的精选列表，通常作为 `CHANGELOG.md` 文件发布。

有关保留变更日志的指导，我们推荐 [keep a changelog](http://keepachangelog.com) 网站。他们开发了一个被世界各地许多开源项目使用的标准。

## 提供稳定版和金丝雀版

您可以考虑提供一个稳定的分支和“下一个”或“金丝雀”分支。这些可以使用不同的分支来提供。在 Home Assistant 中添加应用程序时，用户可以通过在主题标签后附加其名称来从给定存储库中选择所需的分支。

```text
https://github.com/home-assistant/hassio-addons-example#next
```

您应该将此信息添加到您的文档中。另外，您应该考虑在每个分支中使用不同的[names for the repositories](/developers/apps/repository#repository-configuration)，例如“超级应用程序（稳定）”和“超级应用程序（测试版）”。

## 应用装甲

如果 API 调用返回您（作为开发人员）没有预料到的内容，则访问过多资源可能会给您的用户带来负担。作为应用程序开发人员，您有责任确保您的应用程序不会破坏用户的计算机，或执行您意想不到的操作。这就是 AppArmor 的用武之地。

虽然这里不会评判您在输入验证、处理敏感数据和其他防御性编程策略方面的才能，但 AppArmor 是您的应用程序针对恶意 API 调用、格式错误的设置或其他形式的系统劫持的第二道防线。

默认情况下，AppArmor 通过限制一些被认为不适合 Docker 容器的常规操作来为您提供一定程度的安全性。您可以在 [Docker Security page](https://docs.docker.com/engine/security/apparmor/) 上阅读有关 Docker 的 AppArmor 实现的更多信息。

至于 Home Assistant 的实现，您可以通过将 `apparmor.txt` 文件放入您的应用程序文件夹来激活您自己的自定义 AppArmor 配置文件。添加您自己的 `apparmor.txt` 会将该文件加载为主要 AppArmor 配置文件，而不是默认实现。除了知道您的应用程序将以受限且有效的方式运行之外，编写您自己的自定义 `apparmor.txt` 文件将为您的应用程序在安装后赢得一个安全点，从而提高用户对您的应用程序的信心和认知。

`apparmor.txt` 与 `config.yaml` 文件位于同一文件夹中。下面是一个示例`apparmor.txt`。将 `ADDON_SLUG` 替换为应用程序配置中定义的 slug。

apparmor.txt

```txt
#include <tunables/global>

profile ADDON_SLUG flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/base>

  # Capabilities
  file,
  signal (send) set=(kill,term,int,hup,cont),

  # S6-Overlay
  /init ix,
  /bin/** ix,
  /usr/bin/** ix,
  /run/{s6,s6-rc*,service}/** ix,
  /package/** ix,
  /command/** ix,
  /etc/services.d/** rwix,
  /etc/cont-init.d/** rwix,
  /etc/cont-finish.d/** rwix,
  /run/{,**} rwk,
  /dev/tty rw,

  # Bashio
  /usr/lib/bashio/** ix,
  /tmp/** rwk,

  # Access to options.json and other files within your addon
  /data/** rw,

  # Start new profile for service
  /usr/bin/myprogram cx -> myprogram,

  profile myprogram flags=(attach_disconnected,mediate_deleted) {
    #include <abstractions/base>

    # Receive signals from S6-Overlay
    signal (receive) peer=*_ADDON_SLUG,

    # Access to options.json and other files within your addon
    /data/** rw,

    # Access to mapped volumes specified in config.json
    /share/** rw,

    # Access required for service functionality
    /usr/bin/myprogram r,
    /bin/bash rix,
    /bin/echo ix,
    /etc/passwd r,
    /dev/tty rw,
  }
}
```

当您为自己的应用程序处理此问题时，以下提示应该可以帮助您入门：

1. S6部分是相当标准的。您可能需要添加一些内容来适应您的设置脚本，但通常不要删除任何内容。
2. 如果正在运行的服务提供 AppArmor 配置文件，请将其应用到该服务。总是更喜欢开发人员编写的。
3. 如果某项服务没有可用的服务，而您想要制作一个，请执行以下操作：
一个。添加您所知的最低要求的访问权限。您肯定知道的服务需求
b.将 `complain` 作为标志添加到配置文件中
c.运行应用程序并使用 `journalctl _TRANSPORT="audit" -g 'apparmor="ALLOWED"'` 查看审核日志
d.根据需要添加访问权限，直到使用该应用程序不会生成任何审核警告
e.删除 `complain` 标志，以便拒绝不允许未授予的访问权限
4. 更新服务时重复#3，因为可能需要新的访问权限

## 入口

Ingress 允许用户通过 Home Assistant UI 访问应用程序 Web 界面。身份验证由 Home Assistant 处理，因此用户和应用程序开发人员都不需要关心安全性或端口转发。用户喜欢这个功能！它将您的用户直接连接到应用程序，可以在 Home Assistant 中提供无缝的用户体验，并为您的应用程序提供 2 点安全保护。

以下是 Ingress 的要求：
- 必须启用 Ingress。在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中设置`ingress: true`。
- 您的服务器可能在端口 8099 上运行。如果它不在 8099 上运行，则必须在 [`config.yaml`](/developers/apps/configuration#app-config) 中设置 `ingress_port: PORT_NUMBER` 以匹配您的配置。
- 仅允许来自 `172.30.32.2` 的连接。您应该拒绝访问应用程序服务器内的所有其他 IP 地址。
- 用户之前已通过 Home Assistant 进行身份验证。不需要身份验证。

:::tip
路径和端口信息的配置可以通过[apps info API endpoint](/developers/api/supervisor/endpoints#addons)查询。如果您的插件需要 Home Assistant URL，Ingress 会添加一个请求标头 `X-Ingress-Path`，可以对其进行过滤以获得基本 URL。
:::

Ingress API 网关支持以下功能：

- HTTP/1.x
- 流媒体内容
- 网络套接字

## Nginx 的基本入口示例

以下是使用 Nginx 服务器的基本入口实现。其中包含示例`Dockerfile`、`config.yaml` 和`ingress.conf` 配置。

`ingress.conf` 配置为仅接受来自 IP 地址 `172.30.32.2` 的连接，因为我们仅期望来自此 IP 地址的连接用于 Ingress 目的。任何其他 IP 地址都将被拒绝。利用入口端口8099来减少配置工作。如果您希望配置不同的入口端口，则可以，但`config.yaml` 选项`ingress_port` 必须定义为匹配。

入口配置文件

```nginx
server {
    listen 8099;
    allow  172.30.32.2;
    deny   all;
}
```

我们的示例 `Dockerfile` 配置为仅支持我们的 Nginx 服务器，而不像大多数应用程序一样支持 `run.sh`。您可以将 `CMD` 替换为您自己的命令，以便在启动应用程序时允许更多配置选项。这个Dockerfile将`RUN`安装我们的Nginx依赖项，`COPY`我们的示例`ingress.conf`从上面到应用程序容器，然后`CMD`启动Nginx。

Dockerfile

```dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM

#Add nginx and create the run folder for nginx.
RUN \
  apk --no-cache add \
    nginx \
  \
  && mkdir -p /run/nginx

#Copy our conf into the nginx http.d folder.
COPY ingress.conf /etc/nginx/http.d/

#Launch nginx with debug options.
CMD [ "nginx","-g","daemon off;error_log /dev/stdout debug;" ]
```

为了启用 Ingress，我们的 `config.yaml` 文件必须包含 `ingress: true` 并可以指定 `ingress_port` 以及其他所需信息。

配置.yaml

```yaml
name: "Ingress Example"
version: "1.0.0"
slug: "nginx-ingress-example"
description: "Ingress testing"
arch:
  - amd64
  - armhf
  - armv7
  - i386
ingress: true
```

应用程序启动后，您应该能够通过单击应用程序信息屏幕中的“OPEN WEB UI”来查看您的 Ingress 服务器。

## 安全

应用程序安全性应该是值得骄傲的事情。您应该争取尽可能达到的最高安全级别。如果您的应用程序的安全评级较低，那么用户信任它的可能性就会降低。

每个应用程序的基本评分为 5 分，评分范围为 1 到 6。根据开发过程中做出的决策，您将根据某些操作获得分数。有些行为会产生额外的后果。这些额外的后果出现在下表的注释部分中。

|行动 | 改变 | 笔记|
|---|---|---|
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`ingress: true` | +2 | 覆盖`auth_api`评级|
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`auth_api: true` | +1 | 被`ingress`覆盖|
|应用程序已使用 [CodeNotary](https://cas.codenotary.com/) 进行签名 | +1 | |
|使用自定义[`apparmor.txt`](/developers/apps/presentation#apparmor) | +1 | 安装后应用评级|
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中设置`apparmor: false` | -1 |  |
|使用[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用的`privileged: NET_ADMIN`、`SYS_ADMIN`、`SYS_RAWIO`、`SYS_PTRACE`、`SYS_MODULE`或`DAC_READ_SEARCH`或`kernel_modules:`@​​@ | -1 | 如果使用多个，则评级仅应用一次。|
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`hassio_role: manager` | -1 |  |
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`host_network: true` | -1 |  |
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`hassio_role: admin` | -2 |  |
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`host_pid: true` | -2 |  |
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`host_uts: true`和`privileged: SYS_ADMIN` | -1 |  |
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`full_access: true` | 安全设置为 1 | 覆盖所有其他调整|
|在[`config.yaml`](/developers/apps/configuration#optional-configuration-options)中使用`docker_api: true` | 安全设置为 1 | 覆盖所有其他调整|