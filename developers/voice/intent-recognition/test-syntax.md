# 意图匹配测试语法

为了确保模板句子按预期工作，我们提供了一套完善的测试。该测试套件基于 YAML 文件，其中包含输入句子列表，以及期望匹配到的 intent 和 slots。

测试存储在 [GitHub](https://github.com/home-assistant/intents/tree/main/tests) 上，并按语言组织到 `tests/<language>/` 目录中：

* `_fixtures.yaml` - 测试期间可引用的虚拟实体和区域
* `<domain>_<intent>.yaml` - 某个[单一 intent](/developers/intent_builtin.md) 与 domain 的句子。这些文件应只测试在同名[匹配句子文件](/developers/voice/intent-recognition/template-sentence-syntax.md)中定义的句子。

```yaml
# Example homeassistant_HassTurnOn.yaml
language: "en"
tests:
  # 你可以有多个测试块，每个块都有不同的期望匹配数据
  - sentences:
      # 可以一次测试多个句子
      - "turn on the ceiling fan"
      - "turn the ceiling fan on"
    # 期望的匹配数据
    intent:
      name: "HassTurnOn"
      slots:
        name: "fan.ceiling"
```

## Fixtures

当 Home Assistant 进行句子匹配时，它会提供一组可在句子中引用的区域和实体。对于测试，我们在 `_fixtures.yaml` 中定义这些内容。

```yaml
# Example _fixtures.yaml for English
language: "en"
areas:
  - name: "Kitchen"
    id: "kitchen"
  - name: "Living Room"
    id: "living_room"
entities:
  - name: "Kitchen Switch"
    id: "switch.kitchen"
    area: "kitchen"
  - name: "Curtain Left"
    id: "cover.curtain_left"
    area: "living_room"
```

请确保 fixtures 不使用像 "garage door" 或 "curtains" 这样过于通用的名称。应改用像 "garage door left" 或 "curtains left" 这样的唯一名称。这样才能基于通用名称定义匹配句子，例如 "open the garage door"。
