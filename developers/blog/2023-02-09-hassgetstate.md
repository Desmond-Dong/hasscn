我们新增了一个[内置 intent](/developers/intent_builtin.md)：`HassGetState`

一旦我们在 [intents 仓库](https://github.com/home-assistant/intents/) 中添加翻译，此 intent 将使用户能够向 [Assist](https://www.home-assistant.io/docs/assist) 提问。
您可以通过添加 [自定义句法](https://www.home-assistant.io/docs/assist/custom_sentences) 来试用：

```yaml
# Example <config>/custom_sentences/en/get_state.yaml

language: en
intents:
  HassGetState:
    data:
      - sentences:
          - what is <name> [in <area>]
          - is <name> {state} [in <area>]

responses:
  intents:
    HassGetState:
      default: "{{ slots.name }} is {{ state.state_with_unit }}"

lists:
  state:
    values:
      - "on"
      - "off"
      - open
      - closed
      - locked
      - unlocked
      - wet
      - dry
```

通过这些句法，您现在可以向 Assist 提问 "what is the outside temperature?"、"is the front door locked?" 或 "is the floor in the basement wet?" 等问题。
当然，这依赖于 entity 名称（或别名）设置正确。例如，一个名为 "outside temperature" 的传感器，以及一个名为 "floor" 的二进制湿度传感器位于 "basement" 区域。

随着我们添加更多翻译，将支持更多类型的问题，如 "which lights are in the living room?" 和 "are any doors unlocked?"
