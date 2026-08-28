Template sentences 在 YAML 文件中使用 [Hassil（我们的 template matcher）](https://github.com/home-assistant/hassil) 的格式来定义。我们的 template sentences 存储在 [GitHub](https://github.com/home-assistant/intents/tree/main/sentences) 上，组织方式为每种语言在 `sentences/<language>/` 下有一个文件目录：

* `_common.yaml` - 列出了所有 template sentences 共用的 lists、expansion rules 和 skip words。
* `<domain>_<intent>.yaml` - 针对单个 [intent](/developers/intent_builtin.md) 和 domain 的 template sentences。

除了 `_common.yaml` 中的数据外，template sentences 还可以使用 `name`、`area` 和 `floor` 这些 lists。这些 lists 由 Home Assistant 在 intent recognition 期间提供。

```yaml
# Example light_HassTurnOn.yaml
language: "en"
intents:
  HassTurnOn:  # Intent name
    data:
      - sentences:
          - "<turn> on [all] [the] (light | lights) in [the] {area}"
          - "<turn> on [all] [the] {area} (light | lights)"
          - "<turn> [all] [the] (light | lights) in [the] {area} on"
        # Optional; used to set fixed slot values when the intent is matched
        slots:
          domain: "light"
```

上述示例会将句子 `turn on all the lights in the living room` 匹配到 intent `HassTurnOn`，并提取出 area `living room`。domain 值被设为 `light`。在 Home Assistant 中，当该 intent 被执行时，它会打开 area `living room` 中所有类型为 `light` 的 entities。

## 响应

Sentence template 文件可以包含一组句子的 response "key"：

```yaml
# Example light_HassLightSet.yaml
language: "en"
intents:
  HassTurnOn:
    data:
      - sentences:
          - "set {name} brightness to maximum"
        slots:
          brightness: 100
        response: "brightness"
```

在上面的示例中，response key "brightness" 指的是文件 `responses/en/HassLightSet.yaml` 内的一个 template：

```yaml
language: en
responses:
  intents:
    HassLightSet:
      brightness: '{{ slots.name }} brightness set to {{ slots.brightness }}'
```

如果没有提供 response key，则假定为 `"default"`。

Response templates 使用 [Jinja2 语法](https://jinja.palletsprojects.com/en/latest/templates/)，可以引用 `slots` 对象，其属性是匹配到的 intent 的 slot 值。

请参阅所有 [translated responses](https://github.com/home-assistant/intents/tree/main/responses) 以获取更多示例。

## 句子模板语法

* 替代词、短语或单词的一部分
  * `(red | green | blue)`
  * `turn(ed | ing)`
* 可选词、短语或单词的一部分
  * `[the]`
  * `[this | that]`
  * `light[s]`
* Slot Lists
  * `{list_name}`
  * `{list_name:slot_name}`（如果 intent slot 名称不同）
  * list 中的每个值都是一个不同的选项
  * 在 YAML 中，`list_name` 应位于 `lists` 下
  * 文本列表使用 `values`，数字列表使用 `range`
* Expansion Rules
  * `<rule_name>`
  * rule 的主体会被 `<rule_name>` 替换
  * 在 YAML 中，`rule_name` 应位于 `expansion_rules` 下。如果 `rule_name` 包裹了 slot name，则应与 slot name 匹配。否则应使用本地语言。
* 2 个或更多项的 [Permutations](https://en.wikipedia.org/wiki/Permutation)
  * `(patience;you must have)`
  * Permutation 项始终以空格进行填充，以防止生成新词
  * 将项数限制在 2-4 个，因为 `n` 项的排列数会随 `n` 迅速增加，该数字为 `n! == 1 * 2 * ... * n`

## 公共文件

Common 文件 `_common.yaml` 包含在所有 intents 和 domain 的 template sentences 中使用的 lists、expansion rules 和 skip words。

### 列表

Lists 是 slot 的可能值。Slots 是我们希望从句子中提取的数据。例如，我们可以创建一个 `color` list 来匹配可能的颜色。

```yaml
lists:
  color:
    values:
      - "white"
      - "red"
      - "orange"
```

Home Assistant 中的 intent handlers 期望 color 以英文定义。为了允许其他语言定义颜色，lists 支持 in-out 格式。这样你就可以用本地语言定义一组值，但 intent handler 接收到的值将是英文。

```yaml
lists:
  color:
    values:
      - in: "rood"
        out: "red"
      - in: "oranje"
        out: "orange"
```

List 也可以是一个数字范围。这对于定义你想要匹配的 brightness 值范围或温度范围很有用。

```yaml
lists:
  brightness:
    range:
      type: "percentage"
      from: 0
      to: 100
```

List 还可以匹配特定数字，例如从关键词 maximum 返回 100。要在句子中使用该 list 来设置 brightness，请使用以下语法：`{brightness_level:brightness}`。这会从 list 中获取值，但将其放入 brightness 的 slot 中。

```yaml
lists:
  brightness_level:
    values:
      - in: (max | maximum | highest)
        out: 100
      - in: ( minimum | lowest)
        out: 1
```

#### 内联数字范围

数字范围 list 也可以在 sentence template 内联定义：

```yaml
language: en
intents:
  SetBrightness:
    data:
      - sentences:
          - set brightness to {0..100:brightness} percent
```

这将匹配从 0 到 100 的数字，并将值放入 `brightness` slot。数字单词同样有效，因此 "set brightness to 50 percent" 和 "set brightness to fifty percent" 都会匹配，并将 `brightness` slot 设为 50。

#### 通配符

Wildcard lists 可以匹配任意文本，例如：

```yaml
language: en
intents:
  PlayAlbum:
    data:
      - sentences:
          - play {album} by {artist}
lists:
  artist:
    wildcard: true
  album:
    wildcard: true
```

它将匹配诸如 "play the white album by the beatles" 这样的句子。`PlayAlbum` intent 会有一个 `album` slot，值为 "the white album "（注意末尾的空格），以及一个 `artist` slot，值为 "the beatles"。

#### 本地列表

有时你不需要一个可供所有 intents 和 sentences 使用的 slot list，因此你可以在本地定义一个，使其仅在其定义的 intent data（如一组 sentences）的上下文中可用。例如：

```yaml
language: en
intents:
  AddListItem:
    data:
      - sentences:
          - add {item} to [my] shopping list
        lists:
          item:
            wildcard: true
```

### 展开规则

很多 template sentences 可以以相似的方式编写。为了避免多次重复相同的匹配结构，我们可以定义 expansion rules。例如，用户可能在 area 名称前面加上 "the"，也可能不加。我们可以定义一个 expansion rule 来匹配这两种情况。

Expansion rules 可以包含 slots、lists 以及其他 expansion rules。

```yaml
expansion_rules:
  name: "[the] {name}"
  area: "[the] {area}"
  what_is: "(what's | whats | what is)"
  brightness: "{brightness} [percent]"
  turn: "(turn | switch)"
```

#### 本地展开规则

Expansion rules 也可以在 sentences 列表旁边本地定义，并且仅在那些 templates 内可用。这允许你为不同场景编写相似的 templates。例如：

```yaml
language: en
intents:
  GetLocked:
    data:
      - sentences:
          - is the door <state>
        requires_context:
          domain: binary_sensor
        expansion_rules:
          state: "{binary_state}"

      - sentences:
          - is the door <state>
        requires_context:
          domain: lock
        expansion_rules:
          state: "{lock_state}"

lists:
  binary_state:
    values:
      - in: "locked"
        out: "off"
      - in: "unlocked"
        out: "on"
  lock_state:
    values:
      - "locked"
      - "unlocked"

```

相同的 template `is the door <state>` 同时用于 binary sensors 和普通 locks，但本地的 `state` expansion rules 指向不同的 lists。

### 跳过词

Skip words 是 intent recognizer 在识别期间会跳过的单词。对于不是 intent 一部分、但在句子中经常使用的单词很有用。例如，用户可能在句子中使用单词 "please"，但它不是 intent 的一部分。

```yaml
skip_words:
  - "please"
  - "can you"
```

### 需要/排除上下文

Hassil 返回它能找到的第一个 intent match，因此如果同一句子可能产生多个匹配，可能需要额外的 **context**。

例如，考虑以下 template：

```yaml
language: "en"
intents:
  HassLightSet:
    data:
      - sentences:
          - "set {name} brightness to maximum"
          - "set {area} brightness to maximum"
        slots:
          brightness: 100
```

如果你有一个名为 "kitchen light" 的 entity，那么你就可以说 "set kitchen light brightness to maximum"。类似地，如果你有一个名为 "kitchen" 的 area，那么 "set kitchen brightness to maximum" 也会生效。

但如果你有一个名为 "kitchen" 的 media player 呢？同一句子可能匹配 area 或 media player。Hassil 需要更多 context 才能知道该怎么做：

```yaml
language: "en"
intents:
  HassLightSet:
    data:
      - sentences:
          - "set {name} brightness to maximum"
        requires_context:
          domain: "light"
        slots:
          brightness: 100
      - sentences:
          - "set {area} brightness to maximum"
        slots:
          brightness: 100
```

我们将 sentences 分成了两组。第一组针对单个 entities，现在包含了 `requires_context`，且 `domain` 为 `light`。这确保 Hassil 只有当 `{name}` 中的 entity 具有正确的 domain 时才会产生匹配。由于 areas 没有 domains，我们需要将 `{area}` sentence 移到其自己的组中。

如果希望在同一 intent 内使用不同的 responses，context 也很有用：

```yaml
language: "en"
intents:
  HassTurnOn:
    data:
      - sentences:
          - "activate {name}"
        excludes_context:
          domain: "cover"
        response: "default"
      - sentences:
          - "activate {name}"
        requires_context:
          domain: "cover"
        response: "cover"
```

第一组 sentence 使用 `excludes_context` 跳过 `cover` entities，而第二组则专门匹配 `cover` entities，并使用不同的 [response](#responses)。
