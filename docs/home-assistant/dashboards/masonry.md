---
title: 瀑布流视图
description: '瀑布流视图会根据卡片大小，将卡片排列到不同列中。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 瀑布流视图

瀑布流视图会根据卡片大小，将卡片排列到不同列中。

<p class='img'>
<img src='/home-assistant/images/getting-started/lovelace.png' alt='瀑布流视图截图'>
瀑布流视图截图。
</p>

瀑布流会按大小对卡片进行分列，并将下一张卡片放在仪表盘中当前高度最小的那张卡片下方。

<p class='img'>
<img src='/home-assistant/images/dashboards/masonry.png' alt='展示瀑布流如何按大小排列卡片的图片。'>
瀑布流会根据大小排列卡片。
</p>

如果要对卡片分组，您需要使用[水平堆叠](/home-assistant/dashboards/horizontal-stack/)、[垂直堆叠](/home-assistant/dashboards/vertical-stack/)或[网格](/home-assistant/dashboards/grid/)卡片。

type:
  required: false
  description: "`masonry`"
  type: string
