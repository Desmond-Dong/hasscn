---
title: EufyHome
description: 关于如何将 EufyHome 设备集成到 Home Assistant 的说明。
ha_category:
  - Hub
  - Light
  - Switch
ha_release: 0.68
ha_iot_class: Local Polling
ha_domain: eufy
ha_platforms:
  - light
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**EufyHome** 集成是将 [eufy](https://eufy.com/) EufyHome 产品线下销售的设备接入 Home Assistant 的主集成。

目前，Home Assistant 支持以下设备类型：

- 灯光
- 开关

将 EufyHome 集成添加到 `configuration.yaml` 文件后，受支持的设备会被自动发现。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
eufy:
  username: EMAIL_ADDRESS
  password: PASSWORD
```

其中，`username` 和 `password` 是您在 EufyHome 应用中配置的账号和密码。或者，对于无法自动发现的 EufyHome 设备，您也可以手动进行静态配置。

```yaml
eufy:
  devices:
    - address: 192.168.1.10
      access_token: 1234567890abcdef
      type: T1012
      name: Smart Light
    - address: 192.168.1.11
      access_token: abcdef1234567890
      type: T1201
      name: Smart Switch
```

`access_token` 可通过运行以下命令获取：

```bash
$ curl -H "Content-Type: application/json" \
   -d '{"client_id":"eufyhome-app", "client_Secret":"GQCpr9dSp3uQpsOMgJ4xQ", "email":"USERNAME", "password":"PASSWORD"}' \
   https://home-api.eufylife.com/v1/user/email/login
```

请将其中的 `USERNAME` 和 `PASSWORD` 替换为您的 EufyHome 用户名和密码。执行后会返回一个 `access_token`。然后继续运行：

```bash
$ curl -H token:TOKEN -H category:Home \
   https://home-api.eufylife.com/v1/device/list/devices-and-groups
```

请将其中的 `TOKEN` 替换为上一步命令返回的 `access_token`。这样您就能获取每个设备对应的 `local_code`。
