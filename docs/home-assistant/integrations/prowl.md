---
title: Prowl
description: 有关如何将 Prowl 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_release: 0.52
ha_iot_class: Cloud Push
ha_domain: prowl
ha_platforms:
  - notify
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

**Prowl** 集成使用 [Prowl](https://www.prowlapp.com/) 将 Home Assistant 的推送通知发送到您的 iOS 设备。

前往 [Prowl 网站](https://www.prowlapp.com/)并创建新的 API 密钥。

要在您的安装中添加 Prowl 通知，请将以下内容添加到 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: prowl
    api_key: YOUR_API_KEY
```

```yaml
name:
  description: 设置可选参数 `name` 可创建多个通知器。该通知器将绑定到 `notify.NOTIFIER_NAME` 动作。
  required: false
  default: notify
  type: string
api_key:
  description: 要使用的 Prowl API 密钥。
  required: true
  type: string
```

### Prowl 动作数据

可在 `data` 中放入以下属性以扩展功能。

| 数据属性 | 可选 | 默认值 | 描述                                                                                                     |
| ---------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `priority`             | yes      | 0       | 优先级。更多信息请参阅 [Prowl API documentation](https://www.prowlapp.com/api.php#add)。     |
| `url`                  | yes      | n/a     | 要附带的 URL。更多信息请参阅 [Prowl API documentation](https://www.prowlapp.com/api.php#add)。 |

要使用通知功能，请参阅[自动化入门页面](/home-assistant/getting-started/automation/)。
