---
title: "展示你的 App"
sidebar_label: "展示你的 App"
---

如果你选择将你的 app（以前称为 add-on）向公众开放，提供清晰的信息、图形和安全保障将有助于吸引用户。下面的建议是展示 app 的参考指南。

## 添加介绍

介绍会显示在 app 商店中，向用户提供关于 app 功能的简短描述。

包含介绍的这个文件通常被称为"README"，一般以 `README.md` 文件发布。

## 添加文档

良好的文档有助于 app 的使用者理解其用法，解释配置选项，在用户有疑问或问题时为他们指明正确的方向，并包含 app 发布时所用的许可证。

包含文档的这个文件通常被称为"DOCS"，一般以 `DOCS.md` 文件发布。

## App 图标与标志

一图胜千言。因此，为你的 app 添加合适的图片图标和标志可以改进 app 的表现。这些图片在 Home Assistant Supervisor 面板中展示你的 app 时会使用到，并能显著提升 app 的视觉效果。

对 app 标志的要求：

- 标志必须是便携式网络图形格式（`.png`）。
- 文件名必须是 `logo.png`。
- 建议将标志尺寸保持在 250x100px 左右。你可以根据 app 的实际情况选择其他尺寸或宽高比。

对 app 图标的要求：

- 图标必须是便携式网络图形格式（`.png`）。
- 文件名必须是 `icon.png`。
- 图标的宽高比必须为 1x1（正方形）。
- 建议使用 128x128px 的图标尺寸。

## 维护更新日志

将来你很可能会发布 app 的更新版本。如果发生这种情况，app 的用户会看到升级通知，并希望了解最新版本中做了哪些更改。

更新日志是一个文件，其中包含按版本整理的、按时间顺序排列的重要更改列表，一般以 `CHANGELOG.md` 文件发布。

关于维护更新日志的建议，我们推荐 [keep a changelog](http://keepachangelog.com) 网站。他们制定了一项被世界各地许多开源项目使用的标准。

## 提供稳定版和 canary 版本

你可以考虑同时提供稳定版和"next"或"canary"分支。这些可以通过不同的分支来提供。在 Home Assistant 中添加 app 时，用户可以通过在仓库地址后附加 #分支名来选择所需的分支。

```text
https://github.com/home-assistant/hassio-addons-example#next
```

你应该将此信息添加到文档中。此外，你应该考虑在每个分支中为仓库设置不同的[名称](/developers/apps/repository#repository-configuration)，例如"Super app (stable)"和"Super app (beta)"。

## AppArmor

当 API 调用返回了作为开发者的你没有预料到的内容时，过多资源的访问权限可能成为用户的隐患。作为 app 开发者，确保你的 app 不会损坏用户的设备或执行你从未期望的操作是你的责任。AppArmor 在此发挥作用。

虽然这里不会评判你在输入验证、处理敏感数据及其他防御性编程技巧方面的能力，但 AppArmor 是你的 app 防范恶意 API 调用、错误设置或其他系统劫持形式时的第二道防线。

默认情况下，AppArmor 通过限制一些被认为不适合 Docker 容器的一般操作来提供一定程度的安全性。你可以在 [Docker Security page](https://docs.docker.com/engine/security/apparmor/) 上阅读更多关于 Docker 的 AppArmor 实现。

关于 Home Assistant 的实现，你可以将 `apparmor.txt` 文件放入你的 app 文件夹来启用自定义的 AppArmor profile。添加你自己的 `apparmor.txt` 后，该文件将被作为主要 AppArmor profile 加载，而不是默认的实现。除了让你的 app 以更受限且有效的方式运行之外，编写自定义的 `apparmor.txt` 文件还能在你的 app 安装后为其赢得一个安全积分，从而提升用户对你 app 的信心和认知。

`apparmor.txt` 放在与你的 `config.yaml` 文件相同的文件夹中。下面是一个示例 `apparmor.txt`。将 `ADDON_SLUG` 替换为你 app 配置中定义的 slug。

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

在为你的 app 做这项工作时，以下提示应能帮助你入门：

1. 其中 S6 部分相当标准化。你可能需要添加一些内容来适应你的 setup 脚本，但通常不要移除任何内容。
2. 如果运行的某个服务提供了 AppArmor profile，则对该服务应用此 profile。始终优先使用开发者编写的 profile。
3. 如果某个服务没有现成的 profile 而你想要创建一个，请执行以下操作：
   a. 添加你了解的最低必要权限。即你确定该服务需要的东西
   b. 在 profile 中添加 `complain` 作为 flag
   c. 运行 app 并使用 `journalctl _TRANSPORT="audit" -g 'apparmor="ALLOWED"'` 查看 audit 日志
   d. 按需添加权限，直到使用 app 不再产生任何 audit 警告
   e. 移除 `complain` flag，使未授权的访问被 DENIED 而非 ALLOWED
4. 在更新服务时重复第 3 步，因为可能需要新的权限

## Ingress

Ingress 允许用户通过 Home Assistant UI 访问 app 的 web 界面。认证由 Home Assistant 处理，因此用户和 app 开发者都无需关心安全性或端口转发。用户非常喜欢这个功能！它直接将用户连接到 app，能在 Home Assistant 中提供无缝的 UX，并为你的 app 提供 2 个安全积分。

以下是 Ingress 的要求：
- 必须启用 Ingress。在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中设置 `ingress: true`。
- 你的服务器可以运行在 8099 端口。如果它不运行在 8099 端口上，必须在 [`config.yaml`](/developers/apps/configuration#app-configuration) 中设置 `ingress_port: PORT_NUMBER` 以匹配你的配置。
- 仅允许来自 `172.30.32.2` 的连接。你应在 app 服务器中拒绝所有其他 IP 地址的访问。
- 用户已经通过 Home Assistant 进行了认证。无需再次认证。

:::tip
路径和端口信息可以通过 [apps info API endpoint](/developers/api/supervisor/endpoints#apps) 查询。如果你的 app 需要 Home Assistant URL，Ingress 会添加一个请求头 `X-Ingress-Path`，你可以通过过滤它来获取 base URL。
:::

Ingress API gateway 支持以下功能：

- HTTP/1.x
- 流式内容
- Websockets

## 使用 Nginx 的基础 Ingress 示例

以下是一个使用 Nginx 服务器的基础 Ingress 实现。它包含一个示例 `Dockerfile`、`config.yaml` 和 `ingress.conf` 配置。

`ingress.conf` 配置为仅接受来自 IP 地址 `172.30.32.2` 的连接，因为我们只为 Ingress 目的预期来自该 IP 地址的连接。任何其他 IP 地址都将被拒绝。使用 Ingress 端口 8099 可以减少配置工作量。如果你希望配置其他 Ingress 端口，也可以，但必须定义 `config.yaml` 选项 `ingress_port` 以匹配。

ingress.conf

```nginx
server {
    listen 8099;
    allow  172.30.32.2;
    deny   all;
}
```

我们的示例 `Dockerfile` 配置为仅支持我们的 Nginx 服务器，不像大多数 app 那样支持 `run.sh`。你可以用你自己的命令替换 `CMD`，以便在启动 app 时提供更多配置选项。此 Dockerfile 会 `RUN` 安装我们的 Nginx 依赖，`COPY` 上面示例 `ingress.conf` 到 app 容器，然后 `CMD` 启动 Nginx。

Dockerfile

```dockerfile
FROM ghcr.io/home-assistant/base:latest

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

为了启用 Ingress，我们的 `config.yaml` 文件必须包含 `ingress: true`，并可以指定 `ingress_port`，以及其它所需信息。

config.yaml

```yaml
name: "Ingress Example"
version: "1.0.0"
slug: "nginx-ingress-example"
description: "Ingress testing"
arch:
  - aarch64
  - amd64
ingress: true
```

app 启动后，你应能在 app 信息页面中点击"OPEN WEB UI"来查看你的 Ingress 服务器。

## 安全

App 安全应该是一件引以为傲的事。你应该努力达到你能达到的最高安全级别。如果你的 app 安全评级较低，用户就更不太可能信任它。

每个 app 的基础评级为 5，范围从 1 到 6。根据开发过程中所做的决定，你会基于某些操作获得评分。有些操作还有额外的后果。这些额外后果显示在下面的备注栏中。

| Action | Change | Notes |
|---|---|---|
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `ingress: true` | +2 | 覆盖 `auth_api` 评级 |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `auth_api: true` | +1 | 被 `ingress` 覆盖 |
| 使用自定义 [`apparmor.txt`](/developers/apps/presentation#apparmor)| +1| 评级在安装后应用 |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中设置 `apparmor: false` | -1 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `privileged: NET_ADMIN`、`SYS_ADMIN`、`SYS_RAWIO`、`SYS_PTRACE`、`SYS_MODULE` 或 `DAC_READ_SEARCH`，或使用 `kernel_modules:` | -1 | 如果使用了多个，评级仅应用一次。 |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `hassio_role: manager` | -1 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `host_network: true` | -1 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `hassio_role: admin` | -2 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `host_pid: true` | -2 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `host_uts: true` 和 `privileged: SYS_ADMIN` | -1 | |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `full_access: true` | Security 设为 1 | 覆盖所有其他调整 |
| 在 [`config.yaml`](/developers/apps/configuration#optional-configuration-options) 中使用 `docker_api: true` | Security 设为 1 | 覆盖所有其他调整 |
