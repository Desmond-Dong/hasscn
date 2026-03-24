---
title: Fail2Ban
description: 关于如何将 fail2ban 传感器集成到 Home Assistant 的说明。
ha_category:
  - Network
ha_iot_class: Local Polling
ha_release: 0.57
ha_domain: fail2ban
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**Fail2Ban** 集成允许在 Home Assistant 前端显示被 [fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) 封禁的 IP。

:::important
此集成仅在 Home Assistant Container 上可用。遗憾的是，它无法与 Home Assistant Operating System 一起使用。

:::
:::important
您的系统必须安装并正确配置了 `fail2ban`，此传感器才能工作。此外，`fail2ban` 日志文件必须挂载到 Home Assistant 容器才能读取它。


:::
## 配置

要启用此传感器，请将以下行添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
sensor:
  - platform: fail2ban
    jails:
      - ssh
      - hass-iptables
```

```yaml
jails:
  description: 要显示的已配置监狱列表。
  required: true
  type: list
name:
  description: 传感器的名称。
  required: false
  type: string
  default: fail2ban
file_path:
  description: fail2ban 日志的路径。
  required: false
  type: string
  default: /var/log/fail2ban.log
```

### Docker 中的 Fail2Ban

:::important
这些步骤假设您已经让 Home Assistant Docker 在 NGINX 后面运行，并且可以从外部访问。它还假设 Docker 使用 `--net='host'` 标志运行。


:::
对于我们使用 Docker 的用户，上面的教程可能不够。以下步骤专门概述了在 NGINX 后面的 Docker 中运行 Home Assistant 时如何设置 `fail2ban` 和 Home Assistant。测试此设置的设备是使用 linuxserver.io 的 [SWAG](https://github.com/linuxserver/docker-swag) 的 unRAID 服务器。

#### 设置 HTTP 日志记录器

在您的 "`configuration.yaml`" 文件中，将以下内容添加到 `logger` 集成，以确保 Home Assistant 将失败的登录尝试打印到日志中。

```yaml
logger:
  logs:
    homeassistant.components.http.ban: warning
```

#### 编辑 `jail.local` 文件

接下来，我们需要编辑上面链接的 Let's Encrypt Docker 中包含的 `jail.local` 文件。注意，对于本教程，我们将只实现 `[hass-iptables]` 监狱。

编辑 `/mnt/user/appdata/letsencrypt/fail2ban/jail.local` 并将以下内容附加到文件末尾：

```text
[hass-iptables]
enabled = true
filter = hass
action = iptables-allports[name=HASS]
logpath = /hass/home-assistant.log
maxretry = 5
```

#### 为 Home Assistant 监狱创建过滤器

现在我们需要为 `fail2ban` 创建一个过滤器，以便它可以正确解析日志。这是通过 `failregex` 完成的。在 `/mnt/user/appdata/letsencrypt/fail2ban` 的 `filter.d` 目录中创建一个名为 `hass.local` 的文件，并添加以下内容：

```text
[INCLUDES]
before = common.conf

[Definition]
failregex = ^%(__prefix_line)s.*Login attempt or request with invalid authentication from <HOST>.*$

ignoreregex =

[Init]
datepattern = ^%%Y-%%m-%%d %%H:%%M:%%S
```

#### 映射日志文件目录

首先，我们需要确保 fail2ban 日志可以传递给 Home Assistant，并且 Home Assistant 日志可以传递给 fail2ban。启动 Let's Encrypt Docker 时，您需要添加以下参数（根据您的设置调整路径）：

```text
/mnt/user/appdata/home-assistant:/hass
```

这会将 Home Assistant 配置目录映射到 Let's Encrypt Docker，允许 `fail2ban` 解析日志以查找失败的登录尝试。

现在对 Home Assistant Docker 执行相同操作，但这次我们将 `fail2ban` 日志目录映射到 Home Assistant，以便 fail2ban 传感器能够读取该日志：

```text
/mnt/user/appdata/letsencrypt/log/fail2ban:/fail2ban
```


#### 将客户端 IP 发送到 Home Assistant

默认情况下，Home Assistant 看到的 IP 地址将是容器的 IP（类似于 `172.17.0.16`）。这意味着对于任何失败的登录尝试，假设您已正确配置 `fail2ban`，Docker IP 将被记录为已封禁，但原始 IP 仍被允许尝试。我们需要 `fail2ban` 识别原始 IP 才能正确封禁它。

首先，我们必须将以下内容添加到位于 `/mnt/user/appdata/letsencrypt/nginx/site-confs/default` 的 NGINX 配置文件中。

```bash
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

此代码段应添加到您的 Home Assistant 配置中，因此您会有类似以下内容：

```bash
server {
    ...
    location / {
        proxy_pass http://192.168.0.100:8123;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/websocket {
        proxy_pass http://192.168.0.100:8123/api/websocket;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    ...
}
```

一旦添加到 NGINX 配置，我们需要修改 Home Assistant 的 "`configuration.yaml`"，以便可以解析 `X-Forwarded-For` 标头。这是通过将以下内容添加到 `http` 集成来完成的：

```yaml
http:
  use_x_forwarded_for: true
```

此时，一旦重新启动 Let's Encrypt 和 Home Assistant docker，Home Assistant 应该正确记录任何失败登录尝试的原始 IP。完成并验证后，我们可以进入最后一步。

#### 添加 fail2ban 传感器

现在我们已经为 Docker 正确设置了所有内容，我们可以使用以下内容将传感器添加到 "`configuration.yaml`"：

```yaml
sensor:
  - platform: fail2ban
    jails:
      - hass-iptables
    file_path: /fail2ban/fail2ban.log
```

假设您已遵循所有步骤，您应该在前端有一个 fail2ban 传感器 `sensor.fail2ban_hassiptables`。

### 其他调试提示

如果在遵循这些步骤后，您无法让 `fail2ban` 传感器工作，以下是一些可能有帮助的其他步骤：

- 将 `logencoding = utf-8` 添加到 `[hass-iptables]` 条目
- 确保您添加到 `filter.d/hass.local` 的 `failregex` 与 `home-assistant.log` 中的输出匹配
- 尝试通过添加以下条目来更改 `filter.d/hass/local` 中的 datepattern（根据您的需要更改 datepattern）。[来源](https://github.com/fail2ban/fail2ban/issues/174)
    ```text
    [Init]
    datepattern = ^%%Y-%%m-%%d %%H:%%M:%%S
    ```