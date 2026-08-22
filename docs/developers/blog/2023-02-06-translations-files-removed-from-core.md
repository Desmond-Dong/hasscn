---
author: Franck Nijhof
authorURL: https://twitter.com/frenck
authorImageURL: /img/profile/frenck.png
authorTwitter: frenck
title: 翻译文件已从 Core 仓库中移除
---

我们已从 Home Assistant Core 仓库中移除了所有翻译文件，
并放置了一个 helper script，用于从
翻译字符串文件（`strings.json`）编译英文翻译，
以供开发使用。

以前，所有翻译文件（包括所有语言）都是
Home Assistant Core 仓库的一部分。每天晚上我们都会通过
从 Lokalise 下载翻译并将它们提交到 Core 仓库来更新翻译。

现在，我们将此流程移至构建时。我们每次发布
新版本（包括 beta
和 nightly builds）时，会从 Lokalise 下载最新的
翻译。

这种方法带来了一些好处：

- 我们不再需要将翻译文件提交到 Core 仓库。
  这意味着作为开发者，这也不再是一种令人困惑的负担。
- 人们将不再（错误地）尝试通过 GitHub
  贡献语言翻译。
- 每个版本，包括 patch、beta 和 nightly 版本，
  现在也将拥有最新的翻译。

## 本地开发

对于本地开发，我们有翻译开发 helper script。此
脚本一直存在，但现在它可以一次性为所有集成编译英文
翻译。

```bash
python3 -m script.translations develop --all
```

当设置开发环境时，以及每次在 VSCode 中运行
Home Assistant 时（作为 pre-launch task），此脚本会自动运行。