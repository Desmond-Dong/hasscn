---
title: "模板句子语法"
description: '模板句子使用 Hassil，我们的模板匹配器(https://github.com/home-assistant/hassil) 的格式定义在 YAML 文件中。我们的模板句子存储在 GitHub(https://github.com/home-assistant/intents/tree/main/sent。'
---
# 模板句子语法

模板句子使用 [Hassil，我们的模板匹配器](https://github.com/home-assistant/hassil) 的格式定义在 YAML 文件中。我们的模板句子存储在 [GitHub](https://github.com/home-assistant/intents/tree/main/sentences) 上，并按语言组织到 `sentences/<language>/` 目录中：

  - `_common.yaml` - 供所有模板句子共用的 lists、expansion rules 和 skip words。
  - `<domain>_<intent>.yaml` - 某个[单一 intent](/developers/intent_builtin) 与 domain 的模板句子。

除了 `_common.yaml` 中的数据外，模板句子还可以使用 `name`、`area` 和 `floor` 这些 lists。这些 lists 会在 intent 识别期间由 Home Assistant 提供。

``` yaml
# Example light_HassTurnOn.yaml
language: "en"
intents:
  HassTurnOn:  # Intent name
    data:
      - sentences:
          - "<turn> on [all] [the] (light | lights) in [the] {area}"
          - "<turn> on [all] [the] {area} (light | lights)"
          - "<turn> [all] [the] (light | lights) in [the] {area} on"
        # 可选；用于在匹配到 intent 时设置固定的 slot 值
        slots:
          domain: "light"
```

上面的示例会将句子 `turn on all the lights in the living room` 匹配到 intent `HassTurnOn`，并提取 `living room` 这一 area。domain 的值被设置为 `light`。在 Home Assistant 中执行该 intent 时，它会打开 `living room` 区域中所有 `light` 类型的实体。

## 响应

句子模板文件可以为一组句子包含一个 response "key"：

``` yaml
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

在上面的示例中，response key "brightness" 指向文件 `responses/en/HassLightSet.yaml` 中的某个模板：

```yaml
language: en
responses:
  intents:
    HassLightSet:
      brightness: '{{ slots.name }} brightness set to {{ slots.brightness }}'
```

如果未提供 response key，则默认使用 `"default"`。

响应模板使用 [Jinja2 语法](https://jinja.palletsprojects.com/en/latest/templates/)，并且可以引用 `slots` 对象，其属性为匹配到的 intent 的 slot 值。

更多示例请参见所有[已翻译的响应](https://github.com/home-assistant/intents/tree/main/responses)。

## 句子模板语法

* 替代词、短语或词的一部分
  * `(red | green | blue)`
  * `turn(ed | ing)`
* 可选词、短语或词的一部分
  * `[the]`
  * `[this | that]`
  * `light[s]`
* Slot Lists
  * `{list_name}`
  * `{list_name:slot_name}` (if intent slot is named different)
  * 列表中的每个值都是一个不同的选项
  * 在 YAML 中，`list_name` 应定义在 `lists` 下
  * 文本列表使用 `values`，数字列表使用 `range`
* Expansion Rules
  * `<rule_name>`
  * 规则内容会替换 `<rule_name>`
  * 在 YAML 中，`rule_name` 应定义在 `expansion_rules` 下。如果 `rule_name` 包裹的是 slot 名称，它应与 slot 名称一致；否则应使用对应语言的本地表达。
* 2 个或更多项目的[排列](https://en.wikipedia.org/wiki/Permutation)
  * `(patience;you must have)`
  * 排列中的项目始终会用空格填充，以防止形成新的单词
  * 项目数量应限制在 2-4 个，因为 `n` 个项目的排列数量会随着 `n` 很快增长，即 `n! == 1 * 2 * ... * n`

## 公共文件

公共文件 `_common.yaml` 包含 lists、expansion rules 和 skip words，这些内容会在所有 intents 与 domains 的模板句子中复用。

### Lists

Lists 是 slot 的可能取值。Slots 是我们希望从句子中提取的数据。例如，我们可以创建一个 `color` 列表来匹配可能的颜色。

```yaml
lists:
  color:
    values:
      - "white"
      - "red"
      - "orange"
```

Home Assistant 中的 intent handlers 期望 color 以英文定义。为了让其他语言也能定义颜色，lists 支持 in-out 格式。这样你可以用母语定义一组值，而 intent handler 接收到的仍然是英文值。

```yaml
lists:
  color:
    values:
      - in: "rood"
        out: "red"
      - in: "oranje"
        out: "orange"
```

列表也可以是一个数字范围。这对于定义你想匹配的亮度值范围或温度范围很有用。

```yaml
lists:
  brightness:
    range:
      type: "percentage"
      from: 0
      to: 100
```

列表也可以匹配特定数字，例如通过关键词 maximum 返回 100。若要在句子中使用该列表来设置亮度，请使用以下语法：`{brightness_level:brightness}`。这会从列表中取值，并将其放入 brightness 对应的 slot 中。

```yaml
lists:
  brightness_level:
    values:
      - in: (max | maximum | highest)
        out: 100
      - in: ( minimum | lowest)
        out: 1
```

#### Wildcards

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

它将匹配诸如 "play the white album by the beatles" 这样的句子。`PlayAlbum` intent 会得到一个值为 "the white album " 的 `album` slot（注意结尾空格），以及一个值为 "the beatles" 的 `artist` slot。

#### 本地 lists

有时你并不需要一个对所有 intents 和句子都可用的 slot list，因此你可以在本地定义它，使其仅在定义它的 intent 数据上下文中可用（例如某一组句子）。例如：

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

### Expansion rules

许多模板句子都可以用类似的方式编写。为了避免重复相同的匹配结构，我们可以定义 expansion rules。例如，用户可能会在 area 名称前加上 "the"，也可能不会。我们可以定义一条 expansion rule 来同时匹配这两种情况。

Expansion rules 可以包含 slots、lists 以及其他 expansion rules。

```yaml
expansion_rules:
  name: "[the] {name}"
  area: "[the] {area}"
  what_is: "(what's | whats | what is)"
  brightness: "{brightness} [percent]"
  turn: "(turn | switch)"
```

#### 本地 expansion rules

Expansion rules 也可以在某组句子旁边本地定义，并且仅在这些模板中可用。这使你能够针对不同情况编写相似模板。例如：

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

相同的模板 `is the door <state>` 同时用于 binary sensors 和普通锁，但本地的 `state` expansion rules 分别引用了不同的 lists。

### Skip words

Skip words 是 intent 识别器在识别过程中会跳过的词。这对于那些不属于 intent、但在句子中经常出现的词很有用。例如，用户可能会在句子中使用 "please"，但它并不是 intent 的一部分。

```yaml
skip_words:
  - "please"
  - "can you"
```

### Requires/excludes context

Hassil 会返回它找到的第一个 intent 匹配结果，因此如果同一句子可能产生多个匹配，就可能需要额外的 **context**。

例如，考虑下面的模板：

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

如果你有一个名为 "kitchen light" 的实体，那么你就可以说 "set kitchen light brightness to maximum"。同样，如果你有一个名为 "kitchen" 的区域，那么 "set kitchen brightness to maximum" 也能工作。

但如果你有一个名为 "kitchen" 的媒体播放器呢？同一句子可能既匹配区域，也匹配媒体播放器。Hassil 需要更多 context 才能知道该怎么处理：

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

我们把句子拆分成了两组。第一组用于单个实体，并增加了 `requires_context`，其中 `domain` 为 `light`。这可以确保 Hassil 只有在 `{name}` 对应实体拥有正确 domain 时才生成匹配结果。由于区域没有 domain，因此我们需要把 `{area}` 的句子移动到单独的一组。

如果你希望同一个 intent 在不同情况下返回不同响应，context 也很有用：

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

第一组句子使用 `excludes_context` 来跳过 `cover` 实体，而第二组则专门匹配 `cover` 实体，并使用不同的[响应](#responses)。
