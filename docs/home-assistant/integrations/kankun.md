---
title: Kankun
description: 'Kankun 集成可让您切换经过自定义改造的 Kankun SP3 Wi-Fi 开关。这些开关需要加入 json.cgi(https://github.com/homedash/kankun-json/blob/master/cgi-bin/json.cgi) 脚本，以提供 HTTP API。'
ha_category:
  - Switch
ha_release: 0.36
ha_iot_class: Local Polling
ha_domain: kankun
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Kankun

**Kankun** 集成可让您切换经过自定义改造的 Kankun SP3 Wi-Fi 开关。这些开关需要加入 [json.cgi](https://github.com/homedash/kankun-json/blob/master/cgi-bin/json.cgi) 脚本，以提供 HTTP API。

所需改造步骤原先发布在现已关闭的 HomeAutomationForGeeks 网站上，不过仍可通过 [archive.org 存档链接](https://web.archive.org/web/20170628063659/http://www.homeautomationforgeeks.com/openhab_http.shtml) 查看相关信息（请务必安装上方链接中的 JSON 版本脚本）。

## 配置

要启用此集成，请将以下内容添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
switch:
  platform: kankun
  switches:
    bedroom_heating:
      host: hostname_or_ipaddr
```

```yaml
switches:
  description: 包含所有 Kankun 开关的映射。
  required: true
  type: map
  keys:
    identifier:
      description: Kankun 开关的 slug 名称。可添加多个条目。
      required: true
      type: map
      keys:
        host:
          description: 开关在本地网络中的主机名或 IP 地址。
          required: true
          type: string
        name:
          description: 开关的友好名称。
          required: false
          type: string
        port:
          description: HTTP 连接端口。
          required: false
          default: 80
          type: integer
        path:
          description: CGI 脚本路径。
          required: false
          default: "/cgi-bin/json.cgi"
          type: string
        username:
          description: 基本身份验证的用户名。
          required: false
          type: string
        password:
          description: 基本身份验证的密码。
          required: false
          type: string
```
