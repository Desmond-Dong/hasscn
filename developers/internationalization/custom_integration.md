## Translation strings

与合并到 `home-assistant` 仓库中的本地化 strings 不同，custom integrations 无法利用 Lokalise 获取用户提交的翻译。然而，custom integration 作者仍然可以在其集成中包含翻译。这些翻译将从集成的源代码相邻的 `translations` 目录中读取。它们在 `translations` 目录中命名为 `<language_code>.json`，例如，德语翻译为 `de.json`。

该文件将包含 custom integration 提供的、需要翻译的各种内容的可翻译字符串。这些文件的格式与[后端 translation string 文件](internationalization/core.md)相同，但每个已翻译的语言都会有一个副本。

Language codes 遵循 [BCP47](https://tools.ietf.org/html/bcp47) 格式。

为确保翻译文件正确，请使用我们的集成验证工具 Hassfest 进行测试。[设置说明在此。](https://developers.home-assistant.io/blog/2020/04/16/hassfest)

:::caution Strings.json vs. Translations
**Custom components 不要使用 `strings.json`。**

`strings.json` 文件和占位符语法（例如 `[%key:common::config_flow::data::email%]`）是仅由 Home Assistant Core 使用的**build-time features**。

Custom integrations 不会运行内部的 translation build script。你必须手动创建 `translations/en.json` 文件，并为每个 key 包含完整的、扁平的英文文本。如果使用 `strings.json` 或占位符，你的 config flow 将无法加载翻译，并显示原始 key（例如显示 `username` 而非翻译值 `Enter Username`）。
:::
