---
title: 关于蓝图
description: '本节提供蓝图的高级介绍。要查看用于创建有效蓝图的 YAML 模式说明，请参阅蓝图模式(/home-assistant/docs/blueprint/schema/)章节。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 关于蓝图

本节提供蓝图的高级介绍。要查看用于创建有效蓝图的 YAML 模式说明，请参阅[蓝图模式](/home-assistant/docs/blueprint/schema/)章节。

## 什么是蓝图？

蓝图是一种脚本、自动化或[模板实体](/home-assistant/integrations/template/)配置，其中某些部分被标记为可配置。这使您能够基于同一个蓝图创建不同的脚本、自动化或模板实体。

想象一下，您想根据运动来控制灯光。蓝图会提供通用框架，同时让您选择特定的运动传感器作为输入，以及要控制的灯光。这样，一个蓝图就可以用来创建两个自动化。每个自动化都有自己的配置，并且彼此独立运行，但它们共享同一套基础自动化配置，因此您不必每次都从头设置。

自动化会继承蓝图，因此对蓝图所做的更改会在下次重新加载自动化时应用到所有基于该蓝图创建的自动化中。这会在 Home Assistant 启动时发生。要手动重新加载自动化，请前往 [**设置** > **开发者工具** > **YAML**](https://my.home-assistant.io/redirect/server_controls/) 并重新加载自动化。

蓝图由社区在[蓝图社区论坛][blueprint-forums]分享。

[blueprint-forums]: /get-blueprints
