---
title: Elvia
description: Elvia 集成的文档。
ha_category:
  - Energy
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ludeeus'
ha_domain: elvia
ha_config_flow: true
ha_integration_type: service
---

**Elvia** 集成将导入您的历史电网消耗。
无论您订阅哪个供应商，只要 Elvia 运营电网，您就可以使用 Elvia 集成。如果您不确定这是否适合您，请登录 [Min side](https://www.elvia.no/logg-inn/) 并检查。如果您在那里看到电表，就可以使用它。

与大多数其他集成不同，此集成不提供任何实体。导入的数据可以在[能源仪表板](/home-assistant/docs/energy/)和[统计图表卡片](/home-assistant/dashboards/statistics-graph/)中使用。

## 前提条件

要使用此集成，您需要创建一个 API 令牌。

1. 首先登录您的 [Min side](https://www.elvia.no/logg-inn/)。
2. 登录后，选择您的主账户（通常是带有您名字的那个）。
3. 选择 **Tilganger** 选项卡。
4. 在 **Tilgang til data** 部分下，选择 **Opprett token for målerverdier i API**。
5. 在对话框中，选择您要导入值的电表（[有关多个电表，请参阅下面的说明](#multiple-meters-for-a-single-api-token)），为其命名（如"Home Assistant integrasjon"），然后使用 **Opprett** 按钮创建您的令牌。
6. 复制对话框中显示的令牌并将其粘贴到集成配置中。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 更新

集成将每小时获取新数据。
首次运行时，将导入过去三年的数据。

集成计划每小时更新一次，因此与 [Min side](https://www.elvia.no/logg-inn/) 和 Elvia 移动应用程序相比，您在 Home Assistant 中看到更新数据会有一些延迟。

如果您对实时监控感兴趣，此集成不适合您。在这种情况下，您需要使用实时计量集成，如 [Tibber](/home-assistant/integrations/tibber/)。

## 单个 API 令牌的多个电表

虽然您可以在创建令牌时选择多个电表，但每个配置集成只允许 1 个电表。
因此，如果您为多个电表使用相同的令牌，则必须多次添加集成并每次选择不同的电表。