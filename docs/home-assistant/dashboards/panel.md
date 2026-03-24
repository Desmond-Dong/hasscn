---
title: 面板视图
description: 面板视图会以全屏宽度显示一张卡片。
---
面板视图必须且只能包含一张卡片。这张卡片会以全宽方式渲染。

<p class='img'>
<img src='/home-assistant/images/dashboards/panel_view.png' alt='面板视图的截图'>
面板视图的截图。
</p>

此视图不支持徽章。

当您使用 [地图](/home-assistant/dashboards/map/)、[水平堆叠](/home-assistant/dashboards/horizontal-stack/)、[垂直堆叠](/home-assistant/dashboards/vertical-stack/)、[图片元素](/home-assistant/dashboards/picture-elements/) 或 [图片概览](/home-assistant/dashboards/picture-glance/) 这类卡片时，此视图会很适合。

type:
  required: true
  description: "`panel`"
  type: string
