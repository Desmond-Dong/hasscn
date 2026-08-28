## 统一使用一种编码来表示测量单位中的 μ

单位前缀 μ 被用于 μV 和 μS 等测量单位常量。
然而 μ 有两种不同的 Unicode 编码：

1. [MICRO SIGN](https://www.compart.com/en/unicode/U+00B5)
2. [Greek Small Letter Mu](https://www.compart.com/en/unicode/U+03BC)

Home Assistant 以前混用了这两种编码，这导致问题，因为两种编码之间的字符串比较会失败，从而导致测量单位验证失败。

我们选择了"Greek Small Letter Mu"，因为"MICRO SIGN"编码是为了与旧的 8 位西欧字符集兼容而存在的，Unicode 联盟建议不要使用它。

通过 [#144853](https://github.com/home-assistant/core/pull/144853)，我们通过一致地使用 Greek Small Letter Mu 版本来编码 μ，修复了 Home Assistant 核心中的这个问题。在 Python 字面量字符串中，此变体编码为 `"\u03bc"`。

开发者应检查其代码和库是否依赖有歧义的 MICRO SIGN（μ）`"\u00b5"`，并将代码迁移为使用 Greek Small Letter Mu `"\u03bc"` 以避免问题。

`sensor` 和 `number` entity 平台现在包含一个内置功能，可自动转换使用有歧义的 MICRO SIGN（μ）编码的 unit。

## 在 Visual Studio Code 中查找实例

在 Visual Studio Code 中，在 **Search**（文件）面板中启用 **Match Case**，以仅查找所选编码。从上方复制确切的 μ 字符并粘贴到搜索框中。编辑器的页面搜索会匹配所有变体；请使用全局搜索。

## 新的 linter

为了避免新代码或已更改代码中的问题，[#144853](https://github.com/home-assistant/core/pull/144853) 添加了一个 linter，会对使用非首选编码的 μ 的字面量赋值发出警告。
