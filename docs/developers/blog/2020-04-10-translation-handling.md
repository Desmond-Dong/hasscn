---
author: Paulus Schoutsen
authorURL: https://twitter.com/balloob
authorImageURL: /img/profile/paulus.jpg
authorTwitter: balloob
title: Translations 2.0
---

我们已经将 Home Assistant Core 仓库中的翻译脚本迁移到单个命名空间下。现在都可以通过 `python3 -m script.translations` 调用。

| 旧命令                    | 新命令                               |
| ------------------------------ | ----------------------------------------- |
| `script/translations_develop`  | `python3 -m script.translations develop`  |
| `script/translations_upload`   | `python3 -m script.translations upload`   |
| `script/translations_download` | `python3 -m script.translations download` |
| `script/translations_clean`    | `python3 -m script.translations clean`    |

这将帮助我们为 [Translations 2.0 effort](https://github.com/home-assistant/architecture/blob/master/adr/0009-translations-2.0.md) 做准备，它将清理 translations 并使其更好地扩展。