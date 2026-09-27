为了确保 Home Assistant 的文档对所有读者一致且易于遵循，我们要求你在编写文档时遵循一套严格的标准。

## 样式指南

文档应遵循[文档 style guide](/developers/documenting/general-style-guide.md)和[Microsoft Style Guide](https://learn.microsoft.com/style-guide/welcome/)。

## 集成与 platform 页面

* 除非明确说明，所有示例都应格式化为可包含在 `configuration.yaml` 中。
  * 使用大写字母和 `_` 表示需要替换的值。例如，`api_key: YOUR_API_KEY` 或 `api_key: REPLACE_ME`。
* 集成和 platform 名称应链接到它们各自的文档页面。

### Deprecated features 或 integrations

当功能被废弃或集成从 Home Assistant 中移除时，删除其文档。有关执行废弃本身的操作，请遵循[deprecating](/developers/deprecating.md)。

* 如果功能被废弃，从集成页面中删除相关 section。
* 不要在文档中添加废弃通知。
* 如果整个集成被废弃，请遵循[删除集成页面](/developers/documenting/remove-page.md)中的步骤。

## YAML 和 Templates

对于 YAML 以及在 YAML 中使用 Jinja2 templates，请遵循[YAML Style Guide](/developers/documenting/yaml-style-guide.md)。

## 术语表与术语提示

文档应以人人可理解的方式编写。为此，我们有一个在 Home Assistant 各处（包括文档）使用的[术语表](https://www.home-assistant.io/docs/glossary/)。

如果使用不在术语表中的术语，请随意添加；或改进现有术语的定义。

此外，我们提供了一个术语 tooltip，可以在文档的任何地方添加并使用。当用户将鼠标悬停在其上时，该 tooltip 会显示术语的定义，并附有更多信息的链接。它为用户提供即时上下文，帮助他们理解可能不熟悉的术语。

添加术语 tooltip 的语法为：

```liquid
{% term <term> [<text>] %}
```

所引用的术语必须列在我们的术语表中，该术语表是 tooltip 的来源。

例如，如果编写关于 automations 的文本，可以添加如下 tooltip：

```liquid
This is an example text about {% term automations %}, which is used
to demonstrate the use of tooltips, in this case, for the term
"automations" earlier in this sentence.
```

`<text>` 是可选的，当你想为与术语本身不同的文本添加术语 tooltip 时非常有用。在下面的示例中，automation 术语的 tooltip 被添加到 "automate everything" 文本上：

```liquid
Awesome, because this allowed me to {% term automation "automate everything" %}
in my home! I love it!
```

### 添加 glossary 条目

要向术语表添加条目，请编辑 [`source/_data/glossary.yml`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_data/glossary.yml)。

## 重命名页面

有时集成或 platform 会被重命名，此时文档也需要相应更新。如果重命名页面，请按照下面所示在 `_redirects` 文件中添加条目。请在页面中添加详细说明，如版本号或旧的集成/platform 名称，放在[note](/developers/documenting/create-page.md#html)中。

```text
---
...
/getting-started/scripts /docs/scripts
---
```

如果在[文档](https://www.home-assistant.io/docs/)中重新组织内容，同样需要添加 redirect。
