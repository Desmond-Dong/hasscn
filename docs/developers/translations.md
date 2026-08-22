---
title: "贡献翻译"
---

Home Assistant 的翻译通过 [Lokalise](https://lokalise.com/) 进行管理，这是一款在线翻译管理工具。我们的翻译分为四个项目：一个用于平台特定翻译的 backend 项目、一个用于 UI 翻译的 frontend 项目，以及两个用于官方 companion apps 的项目。点击下方链接即可加入对应项目！即使你的语言已经完成全部翻译，额外的 proofreading 也是非常大的帮助！欢迎审阅现有翻译，并为可能更合适的备选译文投票。

- [加入 frontend 翻译团队](https://app.lokalise.com/public/3420425759f6d6d241f598.13594006/)
- [加入 backend 翻译团队](https://app.lokalise.com/public/130246255a974bd3b5e8a1.51616605/)
- [加入 iOS 翻译团队](https://app.lokalise.com/public/834452985a05254348aee2.46389241/)
- [加入 Android 翻译团队](https://app.lokalise.com/public/145814835dd655bc5ab0d0.36753359/)

如需了解有关翻译编辑器和工具的更多信息，请参阅 [Lokalise 翻译与协作文档](https://docs.lokalise.com/en/collections/2909016-translate-and-collaborate)。

每次构建都会从 Lokalise 下载翻译，因此所有 major、minor、beta 版本以及 nightly builds 都将拥有最新的翻译。

## 翻译占位符

部分翻译字符串包含特殊的占位符，会在运行时被替换。

用方括号 `[]` 定义的占位符（在 Lokalise 中以绿色显示）是 [Lokalise key references](https://docs.lokalise.com/en/articles/1400528-key-referencing)。它们主要用于链接那些将会重复出现的翻译字符串，避免反复定义相同的翻译。在合理的情况下，译文应充分利用这些引用（方括号占位符的值可以通过在 Lokalise 编辑模式下点击 "Source Alt+0" 按钮轻松填入）。不同语言与英语的重复项可能并不一致，欢迎链接那些在英语中未建立关联的重复翻译。

用花括号 `{}` 显示的占位符是 [translation arguments](https://formatjs.github.io/docs/core-concepts/icu-syntax/)，会在 Home Assistant 运行时替换为实时值。原始字符串中出现过的任何 translation argument 占位符都必须包含在译文里，且绝不能被翻译！这些占位符可能包含用于定义复数或其他替换规则的特殊语法。上面链接的 format.js 指南说明了添加复数定义及其他规则的语法。

## 规则

1. 只有母语者才应提交翻译。
2. 遵循 [Material Design 指南](https://material.io/design/communication/writing.html)。
3. 不要翻译或更改 `Home Assistant`、`Supervisor` 或 `Hue` 等专有名词。
4. 对于区域特定翻译，那些应与基础翻译保持一致的 keys，应克隆源字符串。你可以在界面中通过 **Ctrl+Insert** 或选择 **Insert Source** 来完成。这有助于跟踪哪些内容已审阅、哪些尚未审阅，同时也能简化工作流程。
5. `state_badge` 键下的翻译将用于通知徽章显示。这些译文应足够简短，以适配徽章标签而不溢出。你可以在 Home Assistant UI 中测试这一点：要么用浏览器的开发工具编辑标签文本，要么使用 Home Assistant UI 中 Tools 的 States 标签。在 UI 中输入一个新的 entity ID（`device_tracker.test`），并在 state 中输入你想测试的文本。
6. 如果文本会在不同的翻译 key 之间重复出现，请尽可能使用 Lokalise 的 key reference 功能。基础翻译在 `states` 翻译下面提供了相关示例。更多细节请参阅 [Lokalise key referencing](https://docs.lokalise.com/articles/1400528-key-referencing) 文档。

## 添加新语言

如果你的语言尚未列出，可以在 [GitHub](https://github.com/home-assistant/frontend/discussions/new?category=localization) 上申请添加。请提供你语言的英文名称和本地名称，例如：

```txt
English Name: German
Native Name: Deutsch
```

:::info
区域特定翻译（`en-US`、`fr-CA`）只有在某个区域的翻译需要与基础语言翻译有所区别时，才会被纳入。
:::

### 维护者添加新语言的步骤

1. 语言标签必须符合 [BCP 47](https://tools.ietf.org/html/bcp47)。大多数语言标签的列表见：[IANA subtag registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)。示例：`fr`、`fr-CA`、`zh-Hans`。只有在包含国家特定覆盖且基础语言已被翻译时，才应包含国家代码。
2. 在 `src/translations/translationMetadata.json` 中添加语言标签和本地名称。示例："Français"、"Français (CA)"。
3. 在 Lokalise 中添加新语言。
注意：有时你需要在 Lokalise 中更改标签（Language -> Language settings -> custom ISO code）。

## 语言特定指南

大多数语言对一句话都有多种可能的译法。请在这里查看你所负责语言的指南，里面还有一些典型的错误示例供你避免。
各章节使用对应语言撰写，因为这更便于解释语法，同时也因为只有母语者才应提交翻译（参见[规则](#rules)）。

### 德语

- Du/Sie：翻译中使用 "Du"，不要使用正式的 "Sie"。

#### 典型错误

- 注意使用正确的祈使句。祈使句是命令形式，例如 "Gib mir das Wasser"。写成 "Gebe mir das Wasser" 则是错误的（参见[祈使句的构成](https://www.duden.de/sprachwissen/sprachratgeber/Bildung-des-Imperativs)）。

### 法语

- *Blueprint*：已决定不翻译该词，将其视为专有名词。这样可以避免与 *map* 和 *template* 的翻译产生混淆，也便于在互联网上搜索要导入的 Blueprint。因此应始终使用带首字母大写的 `Blueprint`。
