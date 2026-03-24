---
title: OpenRouter
description: "有关如何将 OpenRouter 集成为对话代理的说明"

ha_category:
  - AI
  - Voice
ha_release: 2025.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: open_router
ha_integration_type: service
ha_platforms:
  - conversation
ha_quality_scale: bronze
---

**[OpenRouter](https://openrouter.ai/)** integration 允许您在 Home Assistant 中将 OpenRouter API 用作对话代理。

这种集成提供了一种与 OpenRouter 上可用的各种 AI 模型进行交互的方法，而计费则由 OpenRouter 处理。
您甚至可以使用自己的第三方（如 OpenAI）API 密钥。

## Configuration

To add the **OpenRouter** service to your Home Assistant instance, use this My button:

[![Open **Add integration** in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=open_router)

<details>
<summary>Manual configuration steps</summary>

- Browse to your Home Assistant instance.
- Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
- In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=open_router).
- From the list, select **OpenRouter**.
- Follow the instructions on screen to complete the setup.

</details>

## 生成 API 密钥

API 密钥用于验证对 OpenRouter 的请求。要生成 API 密钥，请执行以下步骤：

- 登录 [OpenRouter](https://openrouter.ai/) 或注册账户。
- 转到帐户设置中的 **API 密钥** 部分。
- 要生成新密钥，请选择 **创建 API 密钥**。
- 为密钥命名，并确保设置计费限额。

## 支持的功能

## 使用 AI 生成内容

OpenRouter 集成允许您使用 OpenRouter 提供的 AI 模型生成内容。您可以在自动化、脚本中，或直接在 Home Assistant 界面中使用此功能。

## 删除集成

此集成遵循标准集成删除，不需要额外的步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
