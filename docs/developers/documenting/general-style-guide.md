---
title: "文档风格指南"
---

Home Assistant 的文档使用 Markdown 编写，遵循 [GitHub Flavored Markdown specification](https://github.github.com/gfm/)。

总体而言，文档应遵循 [Microsoft Style Guide](https://learn.microsoft.com/style-guide/welcome/)。需要更多细节时，参考 [Merriam-Webster Dictionary](https://www.merriam-webster.com/)。Microsoft Style Guide 本身也使用 Merriam-Webster。本页汇总了我们额外遵循的一些更具体的指导原则。

## 语言与语气

- 文档使用美式英语。
- 在包含三个或更多项的列表中，连词前使用序列逗号（又称 Oxford comma）。例如："Through the use of additional adapters, Home Assistant allows the use of Zigbee, Z-Wave, and other protocols"。
- 遵循语法和句法规则。例如，句末加句号。
- 避免过度使用 em dash（AI 生成的内容常出现）。如使用 em dash，请遵循 [Merriam-Webster style](https://www.merriam-webster.com/grammar/em-dash-en-dash-how-to-use)，em dash 两侧不留空格。
  - 一般来说，可考虑将句子拆分为较短的句子。
  - 如果 em dash 用于引入列表，改用冒号。
  - 如果用于插入语，可考虑改用括号。
- 保持客观，不偏袒任何性别，不引起分裂，不涉及种族或宗教不当内容。不符合此要求的贡献可能违反我们的 [Code of Conduct](https://github.com/home-assistant/core/blob/master/CODE_OF_CONDUCT.md)。
- 不要使用 "e.g."。改用 _for example_、_such as_ 或 _like_。
- [不要使用 "master/slave"](https://learn.microsoft.com/en-us/style-guide/a-z-word-list-term-collections/m/master-slave)。改用 "client/server"、"leader/follower"、"main/replica" 或 "controller/device" 等替代词。
- 品牌名、服务名、协议名、集成名和平台名的大小写必须与其官方对应。例如，"Z-Wave"，_不是_ "Zwave"、"Z-wave"、"Z Wave" 或 "ZWave"。同样，"Input Select"，_不是_ "input select" 或 "Input select"。

## 格式基础

以下是最常见的格式问题：

- 不限制行长度。采用流畅的段落式写法。
- 句号后不要加两个空格。

## 标题

页面中的第一个标题是其页面标题，在页面顶部的 front matter 中定义：

```markdown
---
title: "Documentation style guide"
---
```

使用 Markdown 的 2 至 6 级标题：

```markdown
## 标题级别 2
### 标题级别 3
#### 标题级别 4
##### 标题级别 5
###### 标题级别 6
```

使用 [sentence-style capitalization](https://learn.microsoft.com/en-us/style-guide/capitalization)。

不要跳过标题级别。

右侧目录中只显示 2 级和 3 级标题。

## 强调

要强调某个词，使用斜体。
用下划线（`_`）表示斜体，例如：`_emphasized words_`。不要用星号（`*`）。

不要使用全大写表示强调。

## UI 元素与操作步骤

引用 UI 元素时使用粗体。
用双星号（`**`）表示粗体，例如：`**bolded words**`。

书写 UI 步骤时，在面包屑导航中使用大于号（`>`）。
不要加粗。

例如：

```markdown
1. Under **Settings**, select the three dots menu.
2. Select **Restart Home Assistant** > **Quick reload**.
```

另请参见：[My links](#my-links)。

### 选择 UI 元素

避免使用 "click" 这个动词。它仅适用于鼠标操作。改用适用于多种设备的动词，如 "select"。

描述具体鼠标动作时，可以使用 "click"。例如 "right-click" 或 "double-click"。

## 文件路径、文件名、变量与文本输入

引用文件路径、文件名、变量名或在字段中输入的文本时使用反引号。
例如：

- `/boot/config.txt` 文件
- `this` 变量
- 输入 `/newbot`

## 列表

- 无序列表使用 `-`，不要用 `*`。
- 有序列表使用递增数字。

  ```yaml
  # Good
  1. List item 1.
  2. List item 2.
  3. List item 3.

  # Bad
  1. List item 1.
  1. List item 2.
  1. List item 3.
  ```

## 代码块

使用 Markdown 代码块，以三个反引号分隔：

````markdown
```markdown
1. Under **Settings**, select...
```
````

要在代码块中嵌套代码块（如上面的示例），外部代码块使用四个或更多反引号：

`````markdown
In general, use Markdown code blocks, delimited by three backticks:

````markdown
```markdown
1. Under **Settings**, select...
```
````
`````

在开引号后，可以指定用于语法高亮的语言，例如：

- `markdown`
- `shell`
- `yaml`

所有支持的语言见 [list of Rouge lexers](https://github.com/rouge-ruby/rouge/wiki/list-of-supported-languages-and-lexers)。

## 表格

- 避免使用表格。改用列表。如无法避免表格，尽量减少列数，并将文本内容尽可能缩短：
  - 过宽的表格在手持设备上难以浏览。
  - 内容更少使表格更易读。
  - 如果表格只有两列，它很可能应该是一个列表。
- 当无法限制文本量时，考虑使用其他数据结构来表示信息。例如，可以使用列表或 `{% configuration_basic %}`。

## 链接

- 不要使用文件的扩展名（`.markdown`、`.md`、`.mdx`），改用斜杠。
  例如：`[ZBT-2](/connect/zbt-2/)` 而不是 `[ZBT-2](/connect/zbt-2.markdown)`。
- 链接到同一仓库中的页面时：
  - 使用绝对链接，但忽略 `source` 目录。
  - 忽略第一级目录前的下划线（`_`）。

  例如，要链接到 `source/_integrations/date.markdown`，使用：`[Date](/integrations/date/)`。
- 不要使用联盟链接或追踪链接。
- 不要使用裸 URL：`https://example.org` 或 `<https://example.org>`。

### 图片

如果使用图片，请上传到文档仓库中的 `images` 文件夹及其相关子文件夹。
不要链接到外部图片，例如你自己的私人 GitHub 仓库中的图片。

对于截图，使用 Markdown 语法：

```markdown
![descriptive alt text](/images/my_image.png)
```

也可以使用 HTML：

- 在文档以深色模式查看时反转图片颜色，请使用带 `invertDark` class 的 HTML。
- 要添加说明文字，将其放入 `<p>` 标签中。

例如：

```html
<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/glossary-term_tooltip.png'
    alt='Styling of a glossary term tooltip'
  />
  词表术语 tooltip 的样式
</p>
```

添加集成时关于图片的内容，请参见 [Images, icons, and logos](/developers/documenting/create-page#images-icons-and-logos)。

#### 灯箱

当文档页面和博客文章中的图片足够大，且不是链接、按钮、SVG、内联图标、品牌 logo 或被标记为排除时，可以点击并在 lightbox 中打开。

若要防止图片在 lightbox 中打开，请在 `<img>` 标签或其父元素上添加 `data-no-lightbox` 属性或 `no-lightbox` class。

例如：

```html
<img
  src="/images/example.png"
  alt="Description of the image"
  data-no-lightbox
>
```

```html
<img
  class="no-lightbox"
  src="/images/example.png"
  alt="Description of the image"
>
```

### 视频

使用以下语法引用 YouTube 上的视频。

使用 `videoStartAt` 可在视频的特定时间开始播放。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/youtube_ref_start_at.webp'
    alt='YouTube video starting at a specified time'
  />
  在指定时间开始的 YouTube 视频
</p>

`videoid` 使用 YouTube URL 中 `watch?v=` 之后的部分。

```html
<lite-youtube
  videoid="ZgoaoTpIhm8"
  videoStartAt="3907"
  videotitle="Introducing the Home Assistant Voice Preview Edition - Voice: Chapter 8"
></lite-youtube>
```

## 可复用文本

对于某些主题，有预定义的文本元素可供复用。

要引入 [`source/_includes`](https://github.com/home-assistant/home-assistant.io/tree/current/source/_includes) 中的片段，使用以下 Liquid 语法：

```liquid
{% include path/to/file.md %}
```

关于编写集成文档时有用的示例，请参见 [Configuration](/developers/documenting/create-page#configuration)。

## Liquid 语法

我们在 Markdown 中使用 [Liquid](https://shopify.github.io/liquid/) 语法进行模板渲染。

### 我的链接

要指示 UI 中的位置，请使用 [My link](https://www.home-assistant.io/docs/tools/quick-search/#my-links)。
选择 My link 会在用户自己的 Home Assistant 安装中打开对应页面。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/my-links_formatting.png'
    alt='Styling of My links'
  />
  Styling of My links
</p>

例如：

```markdown
1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select your integration.
```

```markdown
- {% my areas title="**Settings** > **Areas, labels & zones**" %}
- {% my automations title="**Settings** > **Automations & scenes**" %}
- {% my backup title="**Settings** > **System** > **Backups**" %}
- {% my general title="**Settings** > **System** > **General**" %}
- {% my logs title="**Settings** > **System** > **Logs**" %}
- {% my network title="**Settings** > **System** > **Network**" %}
- {% my profile title="**User profile**" %}
```

要在 Home Assistant 中识别 My link，打开感兴趣的页面并按 `m` 键。

### 术语表引用

一些 Home Assistant 的术语和概念在 [the glossary](https://www.home-assistant.io/docs/glossary/) 中有解释。
如果添加了术语定义的引用，术语定义将作为 tooltip 显示。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/glossary-term_tooltip.png'
    alt='Styling of a glossary term tooltip'
  />
  词表术语 tooltip 的样式
</p>

语法：

```markdown
{% term <term> [<text>] %}
```

使用示例：

```markdown
{% term integration %}
{% term entity %}
{% term "configuration.yaml" %}
{% term "Home Assistant Operating System" %}
```

关于 glossary 用法的更多推荐信息，请参见 [Glossary & terminology tooltips](/developers/documenting/standards#glossary--terminology-tooltips)。

### 缩写和缩略语

如果可能，尽量避免使用缩写和首字母缩略词。
如需使用，可以添加缩写标签，将全称作为 tooltip 显示。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/abbreviation_tooltip.png'
    alt='Styling of an abbreviation tooltip'
  />
  缩写 tooltip 的样式
</p>

示例：

```markdown
<abbr title="Audio & video">A/V</abbr>,
<abbr title="current transformers">CT</abbr>,
<abbr title="Dutch smart meter requirement">DSMR</abbr>,
<abbr title="embedded MultiMediaCard">eMMC</abbr>,
<abbr title="flash video">FLV</abbr>,
<abbr title="Large Language Models">LLMs</abbr>,
<abbr title="Model Context Protocol">MCP</abbr>,
<abbr title="pan, tilt, and zoom">PTZ</abbr>,
<abbr title="real-time messaging protocol">RTMP</abbr>,
<abbr title="real-time streaming protocol">RTSP</abbr>,
or <abbr title="USB-On-The-Go">USB-OTG</abbr>.
```

### 内联图标

要引用 UI 中的图标，可以使用来自 [Iconify library](https://icon-sets.iconify.design/mdi/) 的图标。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/inline_icons.png'
    alt='Some inline icons'
  />
  一些内联图标
</p>

使用示例：

```markdown
- Three dots menu: {% icon "mdi:dots-vertical" %}
- Hamburger menu: {% icon "mdi:menu" %}
- Edit: {% icon "mdi:edit" %}
- Revert {% icon "mdi:restore" %}
- Eye: {% icon "mdi:eye" %}
- Trash: {% icon "mdi:trash" %}
- Cog: {% icon "mdi:cog" %}
- Cog outline: {% icon "mdi:cog-outline" %}
- Drag: {% icon "mdi:drag" %}
- Move-cursor: {% icon "mdi:cursor-move" %}
- Arrow left: {% icon "mdi:arrow-left-bold" %}
- Arrow right: {% icon "mdi:arrow-right-bold" %}
- Checkbox list: {% icon "mdi:order-checkbox-ascending" %}
- Upload network: {% icon "mdi:upload-network" %}
- Security network: {% icon "mdi:security-network" %}
- Routes: {% icon "mdi:routes" %}
```

### 可折叠文本块

使用 details 块使文本块可折叠。不要使用 HTML5 变体，而应使用我们的 Liquid 变体。

<p class='img'>
<img class='invertDark'
    src='/img/en/documentation/collapsible_text_block.webp'
    alt='Behavior of a collapsible text block'
  />
  可折叠文本块的行为
</p>

例如：

```markdown
{% details "Generate Client ID and Client Secret" %}

1. Your Fitbit account must be registered as a Developer account at the [Fitbit Developer Portal](https://dev.fitbit.com), and have a verified email address.
2. Visit the [fitbit developer page](https://dev.fitbit.com/apps/new) to register an application.
3. Enter an **Application Name** of your choosing, for example **Home Assistant**.
4. ...
{% enddetails %}
```

### 文本框

使用文本框突出显示重要信息。
不要过度使用，因为它们可能会在视觉上使文档过载。

<p class='img'>
  <img class='invertDark'
      src='/img/en/documentation/text_boxes.png'
      alt='Example text boxes'
    />
    文本框示例：
</p>

#### 提示

```liquid
{% tip %}
使用 tip 来突出推荐。
{% endtip %}
```

#### 备注

```liquid
{% note %}
使用 note 来突出一个章节。
{% endnote %}
```

#### 重要

```liquid
{% important %}
使用 "important" 来突出你认为非常重要的章节。
{% endimportant %}
```

#### 注意

```liquid
{% caution %}
使用 "caution" 来建议不要执行可能导致数据丢失、意外行为或其他难以撤销后果的操作。
{% endcaution %}
```

#### 警告

```liquid
{% warning %}
使用 warning 来提醒用户注意可能危及系统安全性或完整性，或造成人身伤害的风险。
{% endwarning %}
```

#### 实验功能

在文档化 Labs 中的功能时使用此文本框：

```liquid
{% labs %}
Requires the **Feature Name** Labs preview feature. Enable it at {% my labs title="**Settings** > **System** > **Labs**" %}.
{% endlabs %}
```

#### YAML 示例

使用此文本框为某些元素提供交互式语法高亮。要查看下面的渲染效果，请参见 [Automation: sync a ceiling fan speed to the ceiling light](https://www.home-assistant.io/triggers/light.brightness_changed/#automation-sync-a-ceiling-fan-speed-to-the-ceiling-light)。

```liquid
{% example %}
automation: |
  alias: "Match fan to ceiling light"
  triggers:
    - trigger: light.brightness_changed
      target:
        entity_id: light.living_room_ceiling
      options:
        threshold: 10
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.living_room
      data:
        percentage: "{{ state_attr('light.living_room_ceiling', 'brightness_pct') | int }}"
{% endexample %}
```

第一行的单词（此处为 `automation`）会渲染在代码块上方。

可用的单词（在 [`plugins/example.rb`](https://github.com/home-assistant/home-assistant.io/blob/current/plugins/example.rb) 的 `INPUT_TYPES` 中定义）：

- `action`
- `automation`
- `condition`
- `script`
- `template`
- `trigger`

此外，还可以使用 `output` 渲染代码的结果。在文档化 template 时非常有用。例如：

```liquid
{% example %}
template: |
  {% from 'formatter.jinja' import format_entity %}
  {{ format_entity('sensor.outdoor_temperature') }}
  {{ format_entity('sensor.indoor_temperature') }}
output: |
  Outdoor temperature: 22.5
  Indoor temperature: 21.0
{% endexample %}
```
