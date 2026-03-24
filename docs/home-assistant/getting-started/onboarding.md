---
title: Home Assistant 初始设置
description: Home Assistant 配置指南
---

在设备上[安装](/home-assistant/installation/) Home Assistant 后，需要完成 5 个步骤来设置 Home Assistant。

1. 在浏览器地址栏中输入以下 URL：[http://homeassistant.local:8123/](http://homeassistant.local:8123/)。
   - **结果**：您现在看到 **正在准备 Home Assistant** 页面。根据您的硬件和网络连接，准备可能需要一些时间。
     - Home Assistant 正在下载最新版本的 **Home Assistant Core**（约 700 MB）。
   - 如果此步骤遇到问题，请参阅[安装故障排除](/home-assistant/installation/troubleshooting/)。
   - 准备完成后，将显示欢迎屏幕。

    ![Home Assistant 准备页面](/home-assistant/images/getting-started/onboarding_preparing_01_.png)

2. 您可以创建新安装或从备份恢复现有安装：
   - **选项 1：新安装**：如果这是您的首次安装，我们将创建 Home Assistant 的所有者账户。
     - 此账户是管理员账户，可以更改所有设置。
      - 选择 **创建我的智能家居**。
     - 输入名称、用户名和密码。
       - 确保用户名是小写且不含空格。
       - **提示**：**名称**是在界面中显示的人名，用户名用于登录。

        ![设置用户名和密码](/home-assistant/images/getting-started/onboarding_username.png)
     - 将名称、用户名和密码保存在安全的地方。无法恢复所有者凭据。
      - 选择 **创建账户**。

   - **选项 2：从备份恢复**：如果您想从以前的安装备份恢复，请按照[从备份恢复](/home-assistant/common-tasks/general/#restoring-a-backup)的步骤操作。
       - 如果您有 Home Assistant Yellow，请按照 [Yellow 备份恢复文档](https://support.nabucasa.com/hc/articles/25454643790237)操作。
       - 如果您有 Home Assistant Green，请按照 [Green 备份恢复文档](https://support.nabucasa.com/hc/articles/25160431579165)操作。

3. 输入您的家庭位置。
   - 家庭位置用于配置时区、单位系统和货币。
   - 它还用于创建家庭[区域](/home-assistant/integrations/zone/)，默认半径为 100 米。
   - 您可以稍后在设置中更改此信息。
   - 此家庭区域可用于自动化，例如显示天气、日出时打开窗帘或离家时启动吸尘器。
   - 找到位置后，选择 **下一步**。

    ![设置您的位置](/home-assistant/images/getting-started/onboarding_location.png)

4. 选择您愿意分享的信息。
    - 默认情况下禁用分享。但我们鼓励您分享一些数据。
    - 此信息帮助我们了解需要支持哪些平台以及在哪里集中精力。
    - 数据是匿名和聚合的。要查看我们根据此数据生成的图表，请查看我们的[分析页面](https://analytics.home-assistant.io/)。
     - 确认后，选择 **下一步**。
    ![分享匿名化数据](/home-assistant/images/getting-started/onboarding_share_anonymized_info.png)

5. 您的 Home Assistant 已经启动运行。
   - 按 **完成**，您现在可以看到默认[仪表盘](/home-assistant/dashboards/)。

:::info [概念与术语](/home-assistant/getting-started/concepts-terminology/)
:::
