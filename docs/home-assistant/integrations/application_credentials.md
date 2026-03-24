---
title: Application credentials
description: 允许用户将账号与支持 OAuth2 的集成关联
ha_release: 2022.6
ha_domain: application_credentials
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

**Application credentials** 集成用于支持 OAuth2 的集成，以便将您的账号关联到 Home Assistant。最常见且推荐的方式是通过 Home Assistant Cloud 完成账号关联，但并非所有云服务提供商都支持这种方式，因此有些集成会使用 Application Credentials。您也可以自行选择使用 Application Credentials，而不是 Home Assistant Cloud 账号关联。

## 自动设置

某些集成（如 [Google Calendar](/home-assistant/integrations/google/)）会在您添加集成时自动创建应用凭据。

## 查看已保存的应用凭据

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Application credentials**。

    ![设备与服务溢出菜单](/home-assistant/images/integrations/application_credentials/devices-and-services-menu.png)

    ![应用凭据列表](/home-assistant/images/integrations/application_credentials/application-credentials.png)

## 手动设置

某些集成不支持云端关联。它们会在首次设置时提示您配置 Application Credentials。您也可以按以下步骤手动输入凭据：

1. 从云服务提供商处获取 OAuth *Client ID* 和 *Client Secret*。对应集成通常会提供具体说明。
2. 在 Home Assistant 中，前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。
3. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Application credentials**。
4. 选择对应的集成，输入 *Name*、OAuth *Client ID* 和 *Client Secret*。
5. 保存凭据。

    ![手动设置](/home-assistant/images/integrations/application_credentials/application-credential-setup.png)

6. 然后，您可以前往 **Integrations** 并设置该集成。

## 删除应用凭据

如果您想删除某个应用凭据（例如您已创建了新的凭据），请按以下步骤操作：

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)。

    ![设备与服务溢出菜单](/home-assistant/images/integrations/application_credentials/devices-and-services-menu.png)

2. 在右上角，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Application credentials**。
3. 在列表中选择该凭据，打开三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。

    ![应用凭据列表](/home-assistant/images/integrations/application_credentials/application-credential_delete.png)
