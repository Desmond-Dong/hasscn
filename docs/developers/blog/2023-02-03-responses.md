---
author: Michael Hansen
authorURL: https://twitter.com/rhasspy
authorImageURL: /img/profile/mike_hansen.png
authorTwitter: rhasspy
title: Intent Responses 和 Whitespace
---

为 [Assist](https://www.home-assistant.io/docs/assist) 提供支持的 [intents 仓库](https://github.com/home-assistant/intents/) 有两个重要变更。

首先，intents YAML 中的 data block 现在可以有一个 `response` key。例如：

```yaml
language: en
intents:
  HassTurnOn:
    data:
      - sentences:
          - "open {name}"
        response: cover
```

必须在 `responses/<language>/<intent>.yaml` 中定义具有匹配 key 的 response：

```yaml
language: en
responses:
  intents:
    HassTurnOn:
      cover: "Opened {{ slots.name }}"
```

Response 模板采用 [Jinja2 格式](https://www.home-assistant.io/docs/configuration/templating/)，可以访问匹配 intent 的 `slots` 以及受影响 entity 的 `state`。

第二个变更来自 [hassil](https://github.com/home-assistant/hassil)，它是我们的 [intent template 语法](/developers/voice/intent-recognition/template-sentence-syntax)的解析器。除了解析速度提升 8-10 倍之外，模板中的 whitespace 将被按字面处理。

以前，像 `light(s | ing)` 这样的模板会同时匹配 "lights" 和 "lighting"。现在，由于 `|` 周围的额外空格，将匹配 "light s" 和 "light ing"。正确的模板应为 `light(s|ing)`