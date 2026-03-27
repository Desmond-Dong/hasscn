---
title: Fido
description: '将您的 Fido(https://www.fido.ca/) 帐户信息集成到 Home Assistant 中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Network
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: fido
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---
# Fido

将您的 [Fido](https://www.fido.ca/) 帐户信息集成到 Home Assistant 中。

＃＃ 配置

要启用此传感器，请将以下行添加到“`configuration.yaml`”文件中。
：：：提示
更改配置后需要重启Home Assistant。
:::

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fido
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - fido_dollar
     - balance
     - data_used
```

```yaml
用户名：
描述：您的 Fido 用户名（您的 Fido 电话号码或电子邮件）。
必填：真实
类型：字符串
密码：
描述：您的 Fido 密码。
必填：真实
类型：字符串
数字：
描述：您的 Fido 电话号码（如果为空，它将使用您的用户名）。
必填：假
类型：字符串
受监控变量：
描述：要监视的变量。
必填：真实
类型：列表
键：
fido_美元：
描述：您的 Fido 美元余额
平衡：
描述：您的账户余额
使用的数据：
描述：当前使用的数据
数据限制：
描述：当前数据限制
剩余数据：
描述：当前剩余数据
使用的文本：
描述：短信已发送
文本限制：
描述：短信限制
剩余文本：
描述：短信剩余
使用的彩信：
描述：彩信已发送
彩信限制：
描述：彩信限制
mms_剩余：
描述：彩信剩余
text_int_used：
描述：国际短信发送
text_int_limit：
描述：国际短信限制
text_int_remaining：
描述：国际短信剩余
谈话使用：
描述：已用通话时间
谈话限制：
描述：通话时间限制
剩余谈话：
描述：剩余通话时间
其他谈话使用：
描述：使用的其他通话时间（可能是国际电话）
其他谈话限制：
描述：其他通话时间限制
其他谈话剩余：
描述：剩余通话时间
```
