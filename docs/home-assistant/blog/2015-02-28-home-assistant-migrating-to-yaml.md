---
title: Home Assistant 正在迁移到 YAML
description: 'Home Assistant 现在使用 YAML(http://yaml.org/) 作为配置文件格式。YAML 支持列表结构，这会让配置文件更灵活、更实用。新的配置格式向后兼容现有组件，因此组件开发者无需更新自己的组件。 本页属于 Home Assistant 中文博客与更新记录。'
---
# Home Assistant 正在迁移到 YAML

Home Assistant 现在使用 [YAML](http://yaml.org/) 作为配置文件格式。YAML 支持列表结构，这会让配置文件更灵活、更实用。新的配置格式向后兼容现有组件，因此组件开发者无需更新自己的组件。

新文件名为 `configuration.yaml`。如果在你的配置目录中找不到该文件，Home Assistant 会继续尝试查找旧配置文件 `home-assistant.conf`。

`home-assistant.conf.example` 现已替换为更新后的 `configuration.yaml.example`。

建议 Home Assistant 用户尽快迁移，因为旧配置格式已被弃用。
