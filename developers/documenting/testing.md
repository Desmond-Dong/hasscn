Home Assistant 文档仓库使用 GitHub Actions 测试文档变更。
当前的 workflow 见 [`test.yml`](https://github.com/home-assistant/home-assistant.io/blob/current/.github/workflows/test.yml)。

该 workflow 运行两个 lint 任务：

* **Lint Markdown** 使用 remark 检查 Markdown 结构和格式。
* **Lint Text** 使用 textlint 检查拼写、术语和措辞。

该 workflow 还会检查 `source/_integrations` 中的集成页面使用 `.markdown` 文件扩展名而非 `.md`。

## 在本地运行测试

在 `home-assistant.io` 仓库中安装 Node.js 依赖：

```shell
npm install
```

然后运行与 CI 相同的命令：

```shell
npm run markdown:lint
npm run textlint
```

这些命令定义在 [`package.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package.json) 中。

## Markdown 检查

Markdown 检查在 CI 中使用 [remark](https://remark.js.org/)。
`markdown:lint` 脚本运行：

```shell
remark --quiet --frail .
```

remark 规则定义在 [`.remarkrc.js`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkrc.js) 中。
配置包括对代码块卫生、标题卫生、列表一致性和禁用字符串的检查。

remark 忽略的文件和目录列在 [`.remarkignore`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkignore) 中。

### 添加 remark 规则

要添加 Markdown 规则：

1. 使用 `npm install --save-dev <package-name>` 安装 remark lint 规则包。这会更新 [`package.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package.json) 和 [`package-lock.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package-lock.json)。
2. 在 [`.remarkrc.js`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkrc.js) 中启用并配置该规则。
3. 运行 `npm run markdown:lint`。
4. 修复现有的违规项，或在 [`.remarkignore`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkignore) 中添加有充分理由的排除项。

## 文本检查

文本检查使用 [textlint](https://textlint.github.io/)。
`textlint` 脚本检查选定的文档目录，包括：

* `source/_docs`
* `source/_faq`
* `source/_integrations`
* `source/_dashboards`
* `source/cloud`
* `source/getting-started`
* `source/hassio`
* `source/dashboards`

textlint 规则定义在 [`.textlintrc.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.textlintrc.json) 中。
当前配置使用：

* `common-misspellings` 用于常见拼写错误。
* `terminology` 用于产品名称、推荐术语和措辞替换。
* `comments` 使贡献者可以在需要时禁用特定 section 的 textlint。
* `allowlist` 用于 textlint 应忽略的文本。

### 添加术语条目

在 [`.textlintrc.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.textlintrc.json) 中将术语条目添加到 `terminology` 规则的 `terms` 列表中。

对于必须保持拼写或大小写不变的接受术语，使用字符串：

```json
"Home Assistant",
"Z-Wave",
"GitHub"
```

对于标记一种拼写或短语并建议另一种的替换对，使用替换对：

```json
["addon", "add-on"],
["Github", "GitHub"],
["repo\\b", "repository"]
```

替换对中的第一个值是 textlint 要匹配的 pattern。
第二个值是显示给贡献者的建议替换。
对 JSON 或正则表达式中具有特殊含义的字符进行转义。

将新条目放在相关现有条目附近。
更改术语后，在 `home-assistant.io` 仓库中运行 `npm run textlint`。

### 内联禁用 textlint

对于误报，可以在受影响文本周围使用 HTML 注释禁用 textlint：

```html
<!-- textlint-disable -->

Text that textlint should ignore.

<!-- textlint-enable -->
```

要仅禁用一个规则，添加规则名称：

```html
<!-- textlint-disable terminology -->

Text that textlint should ignore for this rule.

<!-- textlint-enable terminology -->
```

内联禁用应尽可能范围狭窄。
textlint 注释前后各留一个空行，除非这样会破坏周围的 Markdown 结构。
不要将这些注释放在 [Liquid text boxes](/developers/documenting/general-style-guide.md#text-boxes) 内。

### 添加 textlint 规则

要添加文本规则：

1. 在 [`package.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package.json) 中添加 textlint 规则包，并更新 [`package-lock.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package-lock.json)。
2. 在 [`.textlintrc.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.textlintrc.json) 中启用并配置该规则。
3. 运行 `npm run textlint`。
4. 修复现有的违规项，或在 [`.textlintrc.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.textlintrc.json) 的 `allowlist` section 中添加范围狭窄的排除项。

## Markdownlint 配置

仓库中有一个 [`.markdownlint.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.markdownlint.json) 文件。
该文件定义了 markdownlint 兼容的设置，例如禁用行长度规则和允许 inline HTML。
推荐的 VS Code 扩展在 [`.vscode/extensions.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.vscode/extensions.json) 中包含了 markdownlint，因此贡献者可能会在编辑器中看到 markdownlint 警告。

Markdownlint 不会由当前的 GitHub Actions 测试 workflow 或 `package.json` 脚本运行。
如果添加或更改 markdownlint 规则，且该规则必须在 pull request 中强制执行，也请添加一个 script 和 CI step。
