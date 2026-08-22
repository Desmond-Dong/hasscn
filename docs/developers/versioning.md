---
title: "版本管理"
---

Home Assistant Core 使用 [calendar versioning](https://calver.org/) (CalVer)。一个版本由三个用点分隔的部分组成：

```
YYYY.MM.PATCH
```

| Part | Meaning |
| --- | --- |
| `YYYY` | 发布的年份（例如 `2026`）。 |
| `MM` | 发布的月份，**不**补零（例如 `5`，而不是 `05`）。 |
| `PATCH` | 该月度发布内的 patch 号，从 `0` 开始。 |

例如，`2026.5.0` 是 2026 年 5 月的初始发布，而 `2026.5.1` 和 `2026.5.2` 是同月的后续 patch releases。关于发布计划和渠道，请参阅 [release FAQ](https://www.home-assistant.io/faq/release/)。

## 预发布版本和开发版本

版本遵循 [PEP 440](https://peps.python.org/pep-0440/)，因此 `PATCH` 部分可以带有表示非稳定构建的 suffix：

| Kind | Format | Example |
| --- | --- | --- |
| Stable release | `YYYY.MM.PATCH` | `2026.5.0`, `2026.5.2` |
| Beta | `YYYY.MM.PATCH` + `b<N>` | `2026.5.0b0` |
| Nightly | `YYYY.MM.PATCH` + `.dev<YYYYMMDDHHMM>` | `2026.7.0.dev202607241254` |
| Development | `YYYY.MM.PATCH` + `.dev<N>` | `2026.7.0.dev0` |

## 版本号的设定方式

版本被硬编码在 [`homeassistant/const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py) 中，作为 `MAJOR_VERSION`、`MINOR_VERSION` 和 `PATCH_VERSION` 常量。`dev` branch 始终将即将到来的发布作为一个 development version（例如 `2026.7.0.dev0`）。

版本不是自动从 tags 或日期推导出来的；它是通过使用 [`script/version_bump.py`](https://github.com/home-assistant/core/blob/dev/script/version_bump.py) helper 显式 bump 的，该 helper 知道如何推进每种类型的版本（`minor`、`patch`、`dev`、`beta` 和 `nightly`）。例如，发布第一个 beta 会将 `2026.7.0.dev0` 变成 `2026.7.0b0`，而最终发布则去掉 suffix 变为 `2026.7.0`。

:::note

当你需要根据 Home Assistant Core 版本来 gate 行为时，请使用 [AwesomeVersion](https://github.com/ludeeus/awesomeversion) 来比较版本，而不是自己解析字符串，以便 pre-releases、development 和 patch releases 能够正确排序。

:::
