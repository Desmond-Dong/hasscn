---
title: Anova
description: 关于将 Anova Wi-Fi Sous Vide 集成到 Home Assistant 的说明。
ha_category:
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_release: 2023.5
ha_codeowners:
  - '@Lash-L'
ha_domain: anova
ha_integration_type: hub
ha_platforms:
  - sensor
---

**Anova** 集成允许您控制具有 Wi-Fi 功能的 [Anova](https://anovaculinary.com/pages/find-your-anova-precision-cooker) 低温慢煮机。

支持的设备（已测试）：
- AN500-10 (Anova Precision Cooker)
- AN500-US00 (Anova Precision Cooker)
- AN600-10 (Anova Precision Cooker Pro)


"nano"版本的低温慢煮机不受支持，但只要您的应用程序连接到低温慢煮机，数据就应该会更新。使用 BLE 而不是 API 调用会更好地服务它们。

要将此平台添加到您的安装中，您需要 Anova 用户名和密码，并且您的账户上至少需要连接一台低温慢煮机。

:::important
Anova 集成通过电子邮件和密码登录。

如果您的 Anova 账户登录是通过 Google/Facebook/Apple，您需要切换到密码登录方式。

您可以通过 [Anova 密码重置页面](https://anovaculinary.io/ali/password-reset)完成此操作，然后在 Anova 集成配置中输入您的新密码。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 传感器

- 烹饪时间 - 低温慢煮机已烹饪的时间（秒）
- 模式 - 低温慢煮机的当前模式（"空闲"、"烹饪"、"水位低"）。
- 状态 - 低温慢煮机的当前状态（"预热中"、"烹饪中"、"保温中"）。
- 目标温度 - 低温慢煮机设定要加热到的温度。
- 剩余烹饪时间 - 烹饪剩余时间（秒）。
- 加热器温度 - 加热器的当前温度。
- Triac 温度 - triac 的当前温度。
- 水温 - 水的当前温度。