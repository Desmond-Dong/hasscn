为确保 template sentences 按预期工作，我们拥有一个全面的 test suite。该 test suite 基于 YAML 文件，这些文件包含一组输入 sentences 以及预期匹配的 intent 和 slots。

测试存储在 [GitHub](https://github.com/home-assistant/intents/tree/main/tests) 上，组织方式为每种语言在 `tests/<language>/` 下有一个文件目录：

* `_fixtures.yaml` - 测试期间可引用的伪造 entities 和 areas
* `<domain>_<intent>.yaml` - 针对单个 [intent](/developers/intent_builtin.md) 和 domain 的 sentences。这些文件应仅测试在 [match sentences file](/developers/voice/intent-recognition/template-sentence-syntax.md) 中同名的句子里定义的 sentences。

```yaml
# Example homeassistant_HassTurnOn.yaml
language: "en"
tests:
  # You can have multiple blocks of tests, each with different expected match data
  - sentences:
      # Multiple sentences can be tested at once
      - "turn on the ceiling fan"
      - "turn the ceiling fan on"
    # Expected match data
    intent:
      name: "HassTurnOn"
      slots:
        name: "fan.ceiling"
```

## 测试夹具

当 Home Assistant 匹配 sentences 时，它会提供一份可在句子中引用的 areas 和 entities 列表。对于测试，我们在 `_fixtures.yaml` 中定义这些。

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

请确保 fixtures 不要使用 "garage door" 或 "curtains" 这样泛泛的名称。取而代之，使用像 "garage door left" 或 "curtains left" 这样的唯一名称。这对于允许基于泛泛名称定义匹配句子（如 "open the garage door"）是必要的。
