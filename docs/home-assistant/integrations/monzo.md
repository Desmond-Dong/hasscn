---
title: Monzo
description: 'Monzo 集成允许您将 Monzo 银行账户连接到 Home Assistant。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'

ha_category:
  - Finance
  - Sensor
ha_release: 2024.6
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@jakemartin-icl'
ha_config_flow: true
ha_domain: monzo
ha_platforms:
  - sensor
ha_integration_type: service
---
# Monzo

**Monzo** 集成允许您将 Monzo 银行账户连接到 Home Assistant。


## 前提条件与授权

1. 在添加 Monzo 集成之前，您需要先创建一个 [Monzo 开发者账户](https://developers.monzo.com/)。
2. 然后前往 **Clients** > **New OAuth Client**，创建一个供 Home Assistant 使用的新 OAuth 客户端。
3. 接着按如下方式填写表单，并务必**复制显示出的 URL**，不要替换成您自己的 URL：
   - Name：Home Assistant
   - Logo URL：可留空
   - Redirect URLs：<https://my.home-assistant.io/redirect/oauth>
   - Description：例如：Used by the Monzo Home Assistant Integration
   - Confidentiality：Confidential

4. 提交后，您就可以继续添加集成。
   - 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并添加 **Monzo** 集成。
   - 填写您在 Monzo 开发者门户中创建的客户端 OAuth 详细信息。
   - **重要** - 通过电子邮件授权 Home Assistant 访问后，出于安全原因，您还需要在 Monzo 应用内再次验证。
     - 在完成安装前，Home Assistant 会显示相应提醒；在您于手机应用弹窗中完成此步骤前，请不要继续。
     - 如果您忘记执行此操作，集成将无法加载，但您只需接受弹窗并重新加载集成，无需再次输入详细信息。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

### 添加第二个账户

1. 要在 Home Assistant 中添加第二个 Monzo 账户，请重复上述创建 OAuth 客户端的流程。
2. 然后，在 Home Assistant 中，先添加新的凭据，再尝试添加新的条目。
   - 在 **设备与服务** 页面右上角，选择三点 `[mdi:dots-vertical]` 菜单，打开 **Application Credentials**，然后选择 **Add application credentials**。
   - 建议在 *Name* 字段中加入对应人员的名字，以便后续区分。
3. 添加完成后，您可以返回 **Devices & services** > **Monzo** > **Add Entry** 继续认证流程。

## 传感器

此集成会为您的每个账户和储蓄罐（pot）创建设备。对于账户或 pot，您将拥有：

- Balance：账户当前余额。

此外，账户还会具有：

- Total Balance：该账户当前余额加上其所有 pot 的总余额。
