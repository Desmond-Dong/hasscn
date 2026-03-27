---
title: Opower
description: 'The Opower integration allows you to get energy information from utilities that use Opower(https://www.oracle.com/utilities/opower-energy-efficiency/).。'

ha_category:
  - Energy
  - Sensor
ha_release: 2023.8
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@tronikos'
ha_domain: opower
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---
# Opower

The **Opower** integration allows you to get energy information from utilities that use [Opower](https://www.oracle.com/utilities/opower-energy-efficiency/).

超过 175 个公用事业公司使用 Opower。目前此集成仅支持以下实用程序：

- 美国电力 (AEP) 子公司
  - AEP 俄亥俄州
  - AEP 德克萨斯州
  - 阿巴拉契亚电力
  - 印第安纳密歇根电力
  - 肯塔基电力
  - 俄克拉荷马州公共服务公司 (PSO)
  - 西南电力公司（SWEPCO）
- 伯班克水电公司 (BWP)
- 奥斯汀市公用事业
- 爱迪生联合公司 (ConEd) 及其子公司
  - 奥兰治和罗克兰公用事业公司 (ORU)
- 杜肯照明公司 (DQE)
- 埃弗吉
- 永源
- Exelon 子公司
  - 大西洋城电力
  - 巴尔的摩天然气电力公司 (BGE)
  - 联邦爱迪生 (ComEd)
  - 德尔马瓦电力
  - PECO能源公司（PECO）
  - 波托马克电力公司（Pepco）
- 格伦代尔水电 (GWP)
- 国家电网美国子公司
  - 马萨诸塞州国家电网
  - 国家电网纽约长岛
  - 国家电网纽约地铁
  - 国家电网纽约州北部
- 太平洋天然气与电力公司 (PG&E)
- 波特兰通用电气 (PGE)
- 普吉特海湾能源 (PSE)
- 萨克拉门托市政公用事业区 (SMUD)
- 西雅图城市之光 (SCL)
- 南马里兰电力合作社 (SMECO)
- 西南天然气

当您将 Opower 集成添加到 Home Assistant 时，您将需要提供公用事业帐户的身份验证详细信息，以便检索您的能源数据。
这通常与访问公用事业公司网站所需的信息相同。

## 实用程序身份验证要求

对于许多实用程序，只需用户名和密码即可访问您的帐户。某些实用程序需要额外的身份验证信息。
可能需要使用与 Opower 集成兼容的身份验证方法来配置您的实用程序帐户。
下面列出了特定于实用程序的身份验证要求：

### 伯班克水电 (BWP)

您需要首先在 <https://bwp.opower.com/> 创建一个帐户，并在设置集成时使用这些凭据。

### 联合爱迪生公司 (ConEd)

您的 ConEd 帐户必须设置为使用基于时间的一次性密码 (TOTP) 的双因素身份验证。不支持其他身份验证方法，例如秘密问题。

添加 Opower ConEd 集成时，您需要提供用于将身份验证器应用程序（例如 Google Authenticator）同步到您的 ConEd 帐户的 TOTP 密钥。

注意：TOTP 秘密不是基于时间的 6 位数字代码之一。
它是一个大约 16 个字符的字符串，包含共享密钥，使您的身份验证器应用程序能够在适当的时间生成正确的基于时间的代码。
用于设置 TOTP 帐户的二维码包含该秘密。
使用 TOTP 密钥，Opower 集成在需要向 ConEd 网站进行身份验证时将能够生成正确的基于时间的代码。

如果您设置了现有的 TOTP，可以使用多种方法从身份验证器应用程序导出帐户，然后使用工具从编码字符串中获取 TOTP 密钥。

或者，您可以为您的帐户创建一个新的 TOTP 密钥，并使用“无摄像头扫描”选项来捕获 TOTP 密钥。您可能还想通过拍照或使用二维码扫描仪来捕获二维码。有一些工具可以解码 QR 码中的 TOTP 数据。

**注意：目前，ConEd 每个账户仅设置一个 TOTP。因此，在 Opower 和身份验证器应用程序中为 ConEd 访问配置相同的 TOTP 密钥非常重要。**

**故障排除：“2FA 代码无效”错误**

如果尽管凭据和 TOTP 密码正确，身份验证仍失败，这可能是由于您的 Home Assistant 服务器的时钟和 ConEd 服务器的时钟不同步。 TOTP 代码仅在 30 秒窗口内有效。尝试更新并重新启动 Home Assistant Core，这可能会解决该问题。一些用户报告需要重新启动多次才能解决问题。

### Exelon 子公司（ACE、BGE、ComEd、Delmarva、PECO、Pepco）

该集成通过发送到电子邮件或手机短信的代码正确支持 Exelon 子公司的多重身份验证 (MFA)。这些子公司自动为客户开启MFA，
但是您可能没有添加电话号码。此集成支持此用例，但请注意，一旦添加手机，您很可能无法将其完全删除。
系统会定期要求您通过 MFA 重新进行身份验证。

### 太平洋天然气和电力公司 (PG&E)

该集成通过电子邮件或电话正确支持 PG&E 的多重身份验证 (MFA)。
系统会要求您每 180 天通过 MFA 重新进行身份验证。

## Configuration

To add the **Opower** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=opower)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=opower).
- From the list, select **Opower**.
- Follow the instructions on screen to complete the setup.

</details>

## Sensors

该集成为每个帐户添加了以下诊断传感器：

- Last changed
- Last updated

仅当您的公用事业公司提供预测的使用情况/成本时，集成才会添加以下传感器：

For electricity:

- 迄今为止的当前账单用电量
- 迄今为止的当前账单电费
- 当前账单电力预测使用情况（账单的前几天为 0）
- 当前账单电费预测成本（账单前几天为 0）
- 每月典型用电量（基于往年同月，不填充一年以下的账户）
- 典型的每月电费（基于往年同月，未填充一年以下的账户）

For gas:

- 迄今为止的当前账单燃气使用量
- 迄今为止的当前账单燃气成本
- 当前账单燃气预测使用量（账单的前几天为 0）
- 当前账单燃气预测成本（账单前几天为 0）
- 典型的每月燃气使用量（基于往年同月，不填充一年以下的账户）
- 典型的每月天然气成本（基于前几年的同月，不填充一年以下的账户）

请注意，气体的单位是 CCF（厘立方英尺）。 1 CCF 是一百立方英尺，相当于 1 热量。

## Energy

Because utilities only release usage/cost data with a 48-hour delay, the integration inserts data into statistic objects.
You can find the statistics in [**Settings** > **Developer tools** > **Statistics**](https://my.home-assistant.io/redirect/developer_statistics/) and search for "opower".
**This delay means that there will be no data in the energy dashboard for today and likely yesterday** (depending on time of day you are checking).

在初始设置时，集成会提取自帐户激活以来的历史每月使用情况/成本。如果公用事业公司提供更精细的数据，它会提取过去 3 年的每日使用量/成本以及过去 2 个月的每小时使用量/成本（注意：通常，公用事业公司仅提供每月或每日的天然气数据）。
初始设置后，集成会持续提取过去 30 天内的数据（每天两次），以便对来自公用事业公司的数据进行任何更正。

In the configuration of the energy dashboard (**[Settings > Dashboards > Energy](https://my.home-assistant.io/redirect/config_energy/)**):

For electricity:

1. 选择**电网**下的**添加消耗**。
2. 选择**Opower {公用设施名称} elec {帐号}消耗**作为**消耗的能源**。
3. 选择单选按钮**使用跟踪总成本的实体**。
4. 为**具有总成本的实体**选择**Opower {公用事业名称} elec {帐号}成本**。

<details>
<summary>Track return to grid energy and compensation</summary>


1. 选择**电网**下的**添加回报**。
2. 选择**Opower {公用事业名称} elec {帐号}返回**，以获取**能量返回电网**。
3. 选择单选按钮**使用跟踪收到的总金额的实体**。
4. 为**具有总补偿的实体**选择**Opower {公用事业名称} elec {账号}补偿**。


</details>

您的**配置网格消耗**现在应该如下所示：
![配置网格消耗屏幕截图](/home-assistant/images/integrations/opower/configure_grid_consumption.png)

For gas:

1. 在**气体消耗量**中选择**添加气源**。
2. 在**燃气用量**中选择**Opower {公用设施名称}燃气{帐号}消耗**。
3. 选择单选按钮**使用跟踪总成本的实体**。
4. 为**具有总成本的实体**选择**Opower {公用事业名称}天然气{帐号}成本**。

您的**配置气体消耗**现在应该如下所示：
![配置gas消耗截图](/home-assistant/images/integrations/opower/configure_gas_consumption.png)

With the above changes your (**[Settings > Dashboards > Energy](https://my.home-assistant.io/redirect/config_energy/)**) page should now look like this:

![能量配置屏幕截图](/home-assistant/images/integrations/opower/energy_config.png)

## Known limitations

- 传感器和统计数据获得最新数据会有延迟，通常长达几天。
- 对于某些公用事业，此集成没有添加使用/成本传感器。
- 对于某些公用事业公司，使用/成本传感器可能会在账单周期开始时消失或变得不可用。
- 对于不满一年的帐户，不会填充典型每月使用情况和成本的传感器。
- 许多实用程序提供精细的使用情况（例如，每日或每小时），但不提供成本。它们仅提供计费周期（例如，月）的成本。这会导致成本显示为 0。

## Troubleshooting

- 在提出问题之前，请确保您可以访问公用事业网站上的能源使用部分/仪表板，并验证其中的数据是否是最新的。
- 在 Home Assistant 的能源仪表板中，确保使用统计数据而不是传感器。

## Removing the integration

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

If you remove the integration, the statistics are not automatically deleted.
You can find and delete the statistics in [**Settings** > **Developer tools** > **Statistics**](https://my.home-assistant.io/redirect/developer_statistics/) and search for "opower".
