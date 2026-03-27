---
title: 割草机实体
description: '平台实体派生自homeassistant.components.lawnmower.LawnMowerEntity(https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/lawnmower/i。'
sidebar_label: 割草机
---
# 割草机实体

平台实体派生自[`homeassistant.components.lawn_mower.LawnMowerEntity`](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/components/lawn_mower/__init__.py)

## 特性

:::tip
属性应该始终只从内存返回信息，而不执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::


| 名称 | 类型 | 默认值 | 说明
| -------- | ------------------------------------------ | ------- | -----------------
| activity | <code>LawnMowerActivity &#124; None</code> | `None` | 当前活动。

## 活动

| 活动 | 说明
| -------- | -----------
| `MOWING` | 割草机目前正在割草。
| `DOCKED` | 割草机已完成割草工作，目前已停靠。
| `PAUSED` | 割草机曾处于活动状态，现已暂停。
| `RETURNING` | 割草机正在返回码头。
| `ERROR` | 割草机在运行时遇到错误，需要帮助。

## 支持的功能

支持的功能通过使用 `LawnMowerEntityFeature` 枚举中的值来定义
和 使用按位或 (`|`) 运算符进行组合。

| 值 | 说明 |
| -------------- | ---------------------------------------------------- |
| `START_MOWING` | 割草机支持启动割草命令。 |
| `PAUSE` | 割草机支持暂停当前任务。 |
| `DOCK` | 割草机支持返回码头命令。 |

## 方法

### `start_mowing` 或 `async_start_mowing`

开始或恢复割草任务。

### `dock` 或 `async_dock`

停止割草机，返回码头。

### `pause` 或 `async_pause`

在当前操作期间暂停割草机。