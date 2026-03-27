---
title: 组织您的资产
description: '当您拥有越来越多的设备时，您可能希望在自动化中直接针对整组设备进行操作。同时，在列表中查找项目也会变得更困难。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
---
# 组织您的资产

当您拥有越来越多的设备时，您可能希望在自动化中直接针对整组设备进行操作。同时，在列表中查找项目也会变得更困难。

您可以使用多种方式来组织资产：[区域](#区域)、[楼层](#楼层)、[标签](#标签)、[分类](#分类) 和 [分组集成](#分组集成)。

| 分类方式 | 可用作自动化目标 | 实体可拥有多个 |
| -------- | ---------------- | -------------- |
| 区域     | `[openmoji:check-mark]` | `[openmoji:cross-mark]` |
| 楼层     | `[openmoji:check-mark]` | `[openmoji:cross-mark]` |
| 标签     | `[openmoji:check-mark]` | `[openmoji:check-mark]` |
| 分类     | `[openmoji:cross-mark]` | `[openmoji:cross-mark]` |
| 分组集成 | `[openmoji:check-mark]` | `[openmoji:cross-mark]` |

## 区域

- 对设备和实体进行分组。
- 可分配到一个楼层。
- 反映您家中的物理区域或房间。
- 可在自动化中使用：允许您通过一个动作针对整组设备。例如，关闭客厅中的所有灯光。
- 区域还可用于自动生成卡片，例如[区域卡片](/home-assistant/dashboards/area/)。

## 楼层

- 对区域进行分组。
- 设备和实体不能直接分配给楼层，只能分配给区域。
- 一个楼层可以包含多个区域。
- 可在自动化和脚本中作为动作目标。例如，睡觉时关闭楼下所有灯光。

<img class="no-shadow" src='/home-assistant/images/organizing/floors.png' alt='区域设置页面截图，显示按楼层分组后的区域。'>

## 标签

- 可分配给区域、设备、实体、自动化、场景、脚本和助手。
- 可在自动化和脚本中作为动作目标。
- 也可用于筛选表格数据。例如，仅显示带有 `heavy energy usage` 标签的设备，或在太阳能不足时关闭这些设备。

<img class="no-shadow" src='/home-assistant/images/organizing/labels.png' alt='显示为自动化分配标签的截图。'>

## 分类

- 用于在表格中对项目进行分组。
- 每个表格的分类互相独立。自动化页面可拥有与场景、脚本或助手设置页面不同的分类。

<img class="no-shadow" src='/home-assistant/images/organizing/categories.png' alt='显示新分类的截图。自动化按分类分组，更容易获得概览和进行筛选。'>

## 分组集成

- 旨在将多个实体合并为一个代表整个组的实体。
- 合并后的实体也可以拥有区域和标签。
- 可在自动化和脚本中作为动作目标。
- 不会像上面的方法那样帮助您在界面中组织实体。例如，您不能使用分组集成来排序或筛选其他实体。
