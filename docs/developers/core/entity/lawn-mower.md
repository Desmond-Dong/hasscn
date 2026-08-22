---
title: Lawn mower 实体
sidebar_label: Lawn mower
---

从 [`homeassistant.components.lawn_mower.LawnMowerEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/lawn_mower/__init__.py) 派生实体平台。

## 属性

:::tip
属性应始终仅返回内存中的信息，而不是执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| 名称     | 类型                                       | 默认值 | 描述
| -------- | ------------------------------------------ | ------- | -----------------
| activity | `LawnMowerActivity \| None`                | `None`  | 当前活动。

## 活动

| 活动 | 描述
| -------- | -----------
| `MOWING` | 割草机当前正在割草。
| `DOCKED` | 割草机已完成割草，当前已停靠。
| `PAUSED` | 割草机处于活动状态，现在已暂停。
| `RETURNING` | 割草机正在返回 dock。
| `ERROR`  | 割草机在活动过程中遇到错误，需要协助。

## 支持的功能

支持的功能通过使用 `LawnMowerEntityFeature` 枚举中的值来定义，并使用按位或（`|`）运算符进行组合。

| 值          | 描述                                          |
| -------------- | ---------------------------------------------------- |
| `START_MOWING` | 割草机支持 start mowing 命令。    |
| `PAUSE`        | 割草机支持暂停当前任务。    |
| `DOCK`         | 割草机支持返回 dock 命令。  |

## 方法

### `start_mowing` 或 `async_start_mowing`

开始或恢复割草任务。

### `dock` 或 `async_dock`

停止割草机，返回 dock。

### `pause` 或 `async_pause`

在当前操作过程中暂停割草机。
