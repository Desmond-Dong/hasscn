---
title: "文档规范"
description: '为了让 Home Assistant 文档对新手和资深用户都保持一致、清晰、易于理解，我们要求在编写文档时遵循一套较为严格的规范。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 文档规范

为了让 Home Assistant 文档对新手和资深用户都保持一致、清晰、易于理解，我们要求在编写文档时遵循一套较为严格的规范。

## 风格指南

文档应遵循[文档风格指南](/developers/documenting/general-style-guide)和 [Microsoft Style Guide](https://learn.microsoft.com/style-guide/welcome/)。

## 集成与平台页面

- 除非另有明确说明，所有示例都应写成可直接放入 `configuration.yaml` 的格式。
  - 需要用户自行替换的值，请使用大写字母和 `_` 表示，例如 `api_key: YOUR_API_KEY` 或 `api_key: REPLACE_ME`。
- 集成和平台名称应链接到各自对应的文档页面。

## YAML 与模板

对于 YAML，以及 YAML 中使用的 Jinja2 模板，请遵循 [YAML 风格指南](/developers/documenting/yaml-style-guide)。

## 术语表与术语提示

文档应尽量写得让所有人都能理解。为此，我们维护了一份
[术语表](https://www.home-assistant.io/docs/glossary/)，收录了 Home Assistant
及其文档中常用的术语。

如果你使用了术语表中尚未收录的术语，欢迎补充；如果现有定义不够准确，也可直接改进。

此外，我们还提供了可在整站文档中使用的术语提示功能。用户将鼠标悬停在术语上时，会显示术语定义，并附带查看更多信息的链接。这能帮助读者快速理解不熟悉的概念。

添加术语提示的语法如下：

```liquid
{% term <term> [<text>] %}
```

被引用的术语当然必须已收录在术语表中，因为术语提示的数据就来自那里。

例如，如果你在撰写有关自动化的内容，可以这样添加术语提示：

```liquid
This is an example text about {% term automations %}, which is used
to demonstrate the use of tooltips, in this case, for the term
"automations" earlier in this sentence.
```

`<text>` 是可选项。当你想把术语提示附加到与术语本身不同的一段文字上时，它会很有用。下面的例子中，`automation` 的术语提示被加在了 “automate everything” 这段文字上：

```liquid
Awesome, because this allowed me to {% term automation "automate everything" %}
in my home! I love it!
```

### 添加术语表条目

如需向术语表中新增条目，请编辑 [`source/_data/glossary.yml`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_data/glossary.yml)。

## 重命名页面

有时某个集成或平台会改名，这种情况下文档也需要同步调整。如果你重命名了页面，请按下面示例在 `_redirects` 文件中添加对应条目。也建议你在页面中通过 [note](/developers/documenting/create-page#html) 说明一些背景信息，例如版本号或旧的集成 / 平台名称。

```text
---
...
/getting-started/scripts /docs/scripts
---
```

如果你只是移动了[文档](https://www.home-assistant.io/docs/)中的内容位置，也同样需要补充重定向。
