---
title: Free Mobile
description: 关于如何将 Free Mobile SMS 通知添加到 Home Assistant 的说明。
ha_category:
  - Notifications
ha_release: 0.11
ha_iot_class: Cloud Push
ha_domain: free_mobile
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

**免费移动**集成使用法国移动运营商 [Free Mobile](http://mobile.free.fr/) 将短信发送到您自己的手机。

## 先决条件

在执行任何操作之前，您必须在免费移动帐户中激活 SMS API 选项（在“Gérer mon compte -> Mes Options”中）。激活此选项将自动生成配置中所需的令牌。

<p class='img'>
<img src='/home-assistant/images/integrations/free_mobile/token.png' />
</p>

此 API 仅发送经典 SMS 消息，并且仅发送至帐户所有者的手机。因此，您只需在有效负载中提供一条短信。

:::note
如果您禁用并重新启用 SMS API 选项，请务必更新配置中的令牌。

:::
＃＃ 配置

要在安装中使用此通知平台，请将以下内容添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: free_mobile
    username: YOUR_ACCOUNT_ID
    access_token: TOKEN
```

```yaml
姓名：
描述：“可选参数名称允许创建多个通知程序。通知程序将绑定到 `notify.NOTIFIER_NAME` 操作。”
必填：假
类型：字符串
默认：通知
用户名：
描述：这是 FreeMobile 提供的用于访问您的在线帐户的 ID。
必填：真实
类型：字符串
访问令牌：
描述：您可以通过激活在线帐户中的 SMS API 来获取此令牌。
必填：真实
类型：字符串
```
