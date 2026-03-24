---
title: KIWI
description: 关于如何集成 KIWI 智能锁和智能门禁的说明。
ha_category:
  - Lock
ha_release: 0.72
ha_iot_class: Cloud Polling
ha_domain: kiwi
ha_platforms:
  - lock
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**KIWI** 集成可让您打开 KIWI 智能锁和智能门禁设备。

开始使用前，您只需要一个 KIWI 账户。您可以在 [KIWI 网站](https://kiwi.ki/login/) 注册。

## 配置

要启用 KIWI 集成，请将其添加到您的 `configuration.yaml` 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# configuration.yaml 示例条目
lock:
  - platform: kiwi
    username: mail@example.com
    password: mySecretPassword
```

```yaml
username:
  required: true
  description: 您的 KIWI 账户用户名。
  type: string
password:
  required: true
  description: 您的 KIWI 账户密码。
  type: string
```
