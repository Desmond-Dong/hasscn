---
title: "自定义 集成 本地化"
description: '与 home-assistant 存储库中合并的本地化字符串不同，自定义 集成 无法利用 Lokalise 进行用户提交的翻译。但是，自定义 集成 作者仍然可以在其 集成 中包含翻译。这些将从与 集成 源相邻的 translations 目录中读取。它们在 translations 目录中被命名为。'
---
# 自定义 集成 本地化

## 翻译字符串

与 `home-assistant` 存储库中合并的本地化字符串不同，自定义 集成 无法利用 Lokalise 进行用户提交的翻译。但是，自定义 集成 作者仍然可以在其 集成 中包含翻译。这些将从与 集成 源相邻的 `translations` 目录中读取。它们在 `translations` 目录中被命名为 `<language_code>.json`，例如，德语翻译为 `de.json`。

该文件将包含不同的字符串，这些字符串可翻译为自定义 集成 提供的需要翻译的不同内容。这些文件遵循相同的格式[后端 翻译字符串文件](/developers/internationalization/core)，但每种翻译语言都会存在一个副本。

语言代码遵循[BCP47](https://tools.ietf.org/html/bcp47)格式。

为了确保您的翻译文件正确，请使用我们的 集成 验证器 Hassfest 进行测试。[在此设置说明。](https://developers.home-assistant.io/blog/2020/04/16/hassfest)

:::caution Strings.json vs. Translations
**请勿将 `strings.json` 用于自定义组件。**

`strings.json` 文件和占位符语法（例如，`[%key:common::config_flow::data::email%]`）是 **bUIld 时间功能**，仅由 Home Assistant Core 使用。

自定义 集成 不通过内部翻译 bUIld 脚本运行。您必须手动创建 `translations/en.json` 文件并包含每个键的完整、平面英文文本。如果您使用 `strings.json` 或占位符，您的 配置流 将无法加载翻译并显示原始密钥（例如，`username` 而不是翻译值 `Enter Username`）。
:::
