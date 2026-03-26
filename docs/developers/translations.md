---
title: "贡献翻译"
---

Home Assistant 的翻译通过 [Lokalise](https://lokalise.com/) 这一在线翻译管理工具进行管理。我们的翻译分为四个项目：一个用于平台相关翻译的后端项目，一个用于 UI 翻译的前端项目，以及两个用于官方配套应用的项目。点击下方链接即可加入！即使您的语言已经翻译完成，额外的校对仍然很有帮助。欢迎随时查看现有翻译，并为更合适的替代方案投票。

- [加入前端翻译团队](https://app.lokalise.com/public/3420425759f6d6d241f598.13594006/)
- [加入后端翻译团队](https://app.lokalise.com/public/130246255a974bd3b5e8a1.51616605/)
- [加入 iOS 翻译团队](https://app.lokalise.com/public/834452985a05254348aee2.46389241/)
- [加入 Android 翻译团队](https://app.lokalise.com/public/145814835dd655bc5ab0d0.36753359/)

有关翻译编辑器和工具的更多信息，请参阅 [Lokalise 翻译与协作文档](https://docs.lokalise.com/en/collections/2909016-translate-and-collaborate)。

每次构建都会从 Lokalise 下载翻译，因此所有主要版本、次要版本、测试版本和夜间构建都会包含最新翻译。

## 翻译占位符

某些翻译字符串将包含特殊占位符，这些占位符将在运行时被替换。

方括号 `[]` 中定义的占位符（在 Lokalise 中显示为绿色）是[键引用](https://docs.lokalise.com/en/articles/1400528-key-referencing)。它们主要用于引用重复出现的翻译字符串，而不是反复定义相同内容。在适合的情况下，翻译应优先使用这些引用（在 Lokalise 编辑模式中，点击“Source Alt+0”即可轻松查看方括号占位符的值）。不同语言中的重复情况可能与英语不同，因此也欢迎为英语中尚未引用的重复翻译建立链接。

大括号 `{}` 中显示的占位符是 [ICU 语法参数](https://formatjs.github.io/docs/core-concepts/icu-syntax/)，Home Assistant 运行时会将其替换为实际值。原始字符串中出现的所有参数占位符都必须保留在译文中，且不得翻译。这些占位符还可能包含用于定义复数或其他替换规则的特殊语法。上方链接的 FormatJS 指南解释了添加复数定义及其他规则的写法。

## 规则

1. 只有母语人士才应提交翻译。
2. 遵循 [Material Design 写作指南](https://material.io/design/communication/writing.html)。
3. 请勿翻译或更改 `Home Assistant`、`Supervisor` 或 `Hue` 等专有名词。
4. 对于特定于区域的翻译，与基本翻译相同的键应克隆源字符串。您可以使用 **Ctrl+Insert** 或在界面中选择 **Insert Source** 来执行此操作。这有助于跟踪已审核或未审核的内容，同时还简化了工作流程。
5. `state_badge` 键下的翻译会用于通知徽章显示。这些翻译应尽量简短，以便放入徽章标签而不溢出。您可以在 Home Assistant UI 中进行测试：使用浏览器开发者工具编辑标签文本，或使用 Home Assistant UI 的开发者工具中的“状态”选项卡。在 UI 中输入新的实体 ID（`device_tracker.test`），再在状态字段中输入要测试的文本。
6. 如果文本会在多个翻译键中重复出现，请尽可能使用 Lokalise 的键引用功能。基础翻译中 `states` 相关内容提供了这方面的示例。更多信息请参阅[键引用文档](https://docs.lokalise.com/articles/1400528-key-referencing)。

## 添加新语言

如果您的语言未列出，您可以在以下地址请求：[GitHub](https://github.com/home-assistant/frontend/discussions/new?category=localization)。请提供您所用语言的英文名称和母语名称。例如：

```txt
English Name: German
Native Name: Deutsch
```

:::info
仅当某个地区的翻译确实需要与基础语言版本不同时，才会包含地区特定翻译（`en-US`、`fr-CA`）。
:::

### 维护者添加新语言的步骤

1. 语言标签必须遵循 [BCP 47](https://tools.ietf.org/html/bcp47)。大多数语言标签可在 [IANA 语言子标签注册表](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 中找到。示例：`fr`、`fr-CA`、`zh-Hans`。只有在存在国家/地区特定覆盖，且基础语言已翻译完成时，才应包含国家/地区代码。
2. 在 `src/translations/translationMetadata.json` 中添加语言标签和本地名称，例如：`Français`、`Français (CA)`。
3. 在 Lokalise 中添加新语言。
注意：有时您需要在 Lokalise 中修改标签（语言 -> 语言设置 -> 自定义 ISO 代码）。

## 特定语言指南

大多数语言对同一句话都可能有多种译法。请查看适用于您语言的指南，其中也列出了一些常见错误，帮助您避免踩坑。
这些部分使用对应语言编写，因为这样更便于解释语法细节，而且只有母语人士才应提交翻译（请参阅[规则](#规则)）。

### 德语

- Du/Sie：Duze in den Übersetzungen，und verwende nicht das 正式的“Sie”。

#### 典型费勒

- Achte auf den richtigen 命令。 Der Imperativ ist die Befehlsform，z。 B.“Gib mir das Wasser”。 Falsch wäre hier：“Gebe mir das Wasser”（siehe[命令式教育](https://www.duden.de/sprachwissen/sprachratgeber/Bildung-des-Imperativs)).

### 法语

- *Blueprint*：il a été décidé de ne pas traduire ce mot et de le considérer comme un nom propre. Cela évite la confusion avec les traductions de *plan* ou de *modèle* et facilite aussi l'importation de blueprints depuis Internet. Si vous utilisez `Blueprint`, cela ne fonctionnera pas correctement.
