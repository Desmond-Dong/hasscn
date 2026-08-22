---
author: Erik Montnemery
authorURL: https://github.com/emontnemery
title: "Recorder statistics API 的变更"
---

注入和修改 statistics 的 Python 和 WS API 已发生变更。

以下是对 WS API 所做的变更：
- WS 命令 `recorder/update_statistics_metadata` 接受指向用于 unit 转换的 unit converter 的 `unit_class`。如果没有兼容的 unit converter，`unit_class` 应设置为 `null`。不指定 `unit_class` 已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/import_statistics` 中包含的 `metadata` 对象接受指向用于 unit 转换的 unit converter 的 `unit_class`。如果没有兼容的 unit converter，`unit_class` 应设置为 `null`。不指定 `unit_class` 已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/import_statistics` 中包含的 `metadata` 对象接受 `mean_type`，用于指定 mean 的类型（`0` 表示无 mean，`1` 表示算术 mean，`2` 表示圆周 mean）。`mean_type` 替换了 bool 标志 `has_mean`。不指定 `mean_type` 已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/list_statistic_ids` 和 `recorder/get_statistics_metadata` 的响应中的 items 包含 `mean_type` 和 `unit_class`。
- WS 命令 `recorder/list_statistic_ids` 和 `recorder/get_statistics_metadata` 的响应中 items 的 `has_mean` 已被弃用，并将在 Home Assistant Core 2026.11 中移除。

以下是对 Python API 所做的变更：
- 函数 `async_update_statistics_metadata` 接受指向用于 unit 转换的 unit converter 的 `new_unit_class`。如果没有兼容的 unit converter，`new_unit_class` 应设置为 `None`。不指定 `new_unit_class` 已被弃用，并将在 Home Assistant Core 2025.11 中停止工作。
- 传递给函数 `async_import_statistics` 和 `async_add_external_statistics` 的 metadata 对象接受指向用于 unit 转换的 unit converter 的 `unit_class`。如果没有兼容的 unit converter，`unit_class` 应设置为 `None`。不指定 `unit_class` 已被弃用，并将在 Home Assistant Core 2025.11 中停止工作。
- 传递给函数 `async_import_statistics` 和 `async_add_external_statistics` 的 metadata 对象接受类型为 `StatisticMeanType` 的 `mean_type`，用于指定 mean 的类型（`NONE`、`ARITHMETIC` 或 `CIRCULAR`）。`mean_type` 替换了 bool 标志 `has_mean`。不指定 `mean_type` 已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- 函数 `async_list_statistic_ids` 返回值中的 items 包含 `mean_type` 和 `unit_class`。
- 函数 `async_list_statistic_ids` 返回值中 items 的 `has_mean` 已被弃用，并将在 Home Assistant Core 2026.11 中移除。