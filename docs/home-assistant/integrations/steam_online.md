---
title: Steam
description: 有关如何在 Home Assistant 中设置 Steam 传感器的说明。
ha_category:
  - Social
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: steam_online
ha_platforms:
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: service
---

**Steam** 集成可让您跟踪公开 [Steam](https://steamcommunity.com) 账户的在线状态。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

:::important
Steam 的好友列表隐私功能会影响传感器的便捷添加，从而难以跟踪好友活动。在初始设置期间将好友列表设置为 Public，可让该集成发现这些好友并方便添加。之后**不必**继续保持好友列表为 Public。

前往您的个人资料页面，选择 `Edit Profile`，再选择 `Privacy Settings`。

:::
<p class='img'>
  <img src='/home-assistant/images/screenshots/steam_privacy_settings.png' />
</p>

## 设置

您需要一个[免费 API key](https://steamcommunity.com/dev/apikey) 才能使用该平台。域名字段看起来不会产生实际影响，但仍建议填写为您的 Home Assistant 域名。如果您想避免长期使用 Steam 官方移动应用（因为创建 API key 需要 Steam Guard Mobile Authenticator），可以临时在应用中启用 Steam Guard，创建 API key 后再取消启用 Steam Guard。新创建的 API key 仍可继续使用。

要查找某个账户的 64 位 SteamID：

1. 打开 Steam。
2. 打开以您的用户名命名的下拉菜单。
3. 选择 **Account details**。
   - 您的 **Steam ID** 会显示在 **Your-Account-Name Account** 标签下方。

## 示例

例如，如果您想将这些账户加入一个组，可以这样写：

```yaml
# configuration.yaml 示例条目
group:
  steam:
    name: Steam
    entities:
      - sensor.steam_account1
      - sensor.steam_account2
```
