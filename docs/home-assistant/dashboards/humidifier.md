---
title: 加湿器卡片
description: '加湿器卡片让您可以控制和监控加湿器、除湿器和恒湿器设备。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 加湿器卡片

加湿器卡片让您可以控制和监控加湿器、除湿器和恒湿器设备。

<p class='img'>
  <img src='/home-assistant/images/dashboards/humidifier_card.png' alt='加湿器卡片截图'>
  加湿器卡片截图。
</p>

要将该卡片添加到您的用户界面：

1. 在屏幕右上角，选择编辑 `[mdi:edit]` 按钮。
   - 如果这是您第一次编辑仪表盘，会出现 **编辑仪表盘** 对话框。
     - 通过编辑仪表盘，您将接管此仪表盘的控制权。
     - 这意味着当新的仪表盘元素可用时，它不会再自动更新。
     - 一旦您接管了控制权，您将无法让此特定仪表盘恢复自动更新。但是，您可以创建一个新的默认仪表盘。
     - 要继续，在对话框中，选择三个点 `[mdi:dots-vertical]` 菜单，然后选择 **接管控制**。
2. [添加卡片并自定义动作和功能](/home-assistant/dashboards/cards/#adding-cards-to-your-dashboard) 到您的仪表盘。

此卡片的所有选项都可以通过用户界面进行配置。

## YAML 配置

当您使用 YAML 模式或只是在 UI 的代码编辑器中使用 YAML 时，可以使用以下 YAML 选项。

type:
  required: true
  description: "`humidifier`"
  type: string
实体:
  required: true
  description: "`humidifier` 域的实体 ID。"
  type: string
name:
  required: false
  description: "覆盖友好名称。可以是字符串或名称配置对象。请参阅 [命名文档](/home-assistant/dashboards/naming/)。"
  type: [string, map, list]
  default: 实体名称
theme:
  required: false
  description: "使用任何已加载的主题覆盖此卡片所使用的主题。有关主题的更多信息，请参阅 [前端文档](/home-assistant/integrations/frontend/)。"
  type: string
show_current_as_primary:
  required: false
  description: "将当前湿度显示为主要信息，而不是目标湿度。目标湿度将显示为次要信息。"
  type: boolean
  default: false
features:
  required: false
  description: "用于控制实体的额外小部件。请参阅 [可用功能](/home-assistant/dashboards/features)。仅支持加湿器相关功能。"
  type: list

### 示例

```yaml
type: humidifier
entity: humidifier.bedroom
name: Bedroom Humidifier
```