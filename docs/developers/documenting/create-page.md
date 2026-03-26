---
title: "添加集成页面"
---

如需创建新的集成页面，请按以下步骤操作：

1. 文档仓库主要使用两个分支：`current` 和 `next`：
   - 如果你在为代码中新加入的集成编写文档，请切换到 `next` 分支。
2. 复制一份[集成文档模板](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations/_integration_docs_template.markdown)并进行编辑。
3. 确保集成页面的文件名与该集成的 domain 名称一致。
   - [Integration overview](https://www.home-assistant.io/integrations/) 和 [Examples section](https://www.home-assistant.io/cookbook/) 会自动生成，因此不需要手动添加到这些页面的链接。
4. 请确保遵循文档规范中的以下内容：
   - [General style guide](/developers/documenting/general-style-guide)。
   - [YAML Style Guide](/developers/documenting/yaml-style-guide)
   - [Documentation structure and example text](/developers/documenting/integration-docs-examples)
5. 请确保已在 brands 仓库中添加[图标和 logo](#images-icons-and-logos)。
   - 如果你的集成原本是自定义集成（HACS），请将品牌文件移动到 `core_integrations` 目录。
6. 如有需要，请写明如何获取第三方服务或设备的 API key 或 access token。
7. 确保文档中不要引用自定义集成。步骤和示例（包括自动化示例）都不应依赖自定义卡片或自定义集成。
8. 如果已知该设备存在多个型号，请写明你测试过的设备类型（包括固件版本）。
9. 添加 blueprint 时，请将其上传到 [`https://github.com/home-assistant/home-assistant.io/tree/current/source/blueprints/integrations`](https://github.com/home-assistant/home-assistant.io/tree/current/source/blueprints/integrations) 下的 blueprints 目录，或发布到[论坛中的 blueprint exchange](https://community.home-assistant.io/c/blueprints-exchange)。同时在集成页面中添加指向 blueprint exchange 的链接。
10. 在将 PR 标记为 **Ready for review** 之前，请移除注释内容。

## 关于集成页面头部格式

如果页面是从零开始创建的，你需要先补充 header。不同类型的文档页面可能需要不同的 header 字段。

```text
---
title: "Awesome Sensor"
description: "home-assistant.io web presence"
ha_release: "0.38"
ha_category: Sensor
ha_platforms:
  - sensor
ha_iot_class: "Local Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: awesome
ha_integration_type: hub
related:
  - docs: /voice_control/s3_box_voice_assistant/
    title: Creating a ESP32-S3-BOX-3 voice assistant
  - url: https://esphome.io/projects/index.html
    title: ESPHome projects website
---

Content... Written in markdown.

### 标题头部
...
```

文件头部中其他常见字段说明：

- `title`：应与集成 manifest 文件中的集成名称保持一致。
- `ha_release`：表示该集成首次被纳入 Home Assistant 的版本。
  - 如果当前版本是 2025.8，请将 `ha_release` 写为 2025.9。
  - 对于 10 月版本（例如 `2025.10`），请使用 `' '` 包裹，否则末尾的 `0` 可能不会显示。
- `ha_category`：用于在 [Integration overview](https://www.home-assistant.io/integrations/) 中对集成进行分组。
- `ha_platforms`：列出该集成已实现的所有[平台](/developers/creating_platform_index)。
- `ha_iot_class`：表示设备行为类型的 [IoT class](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things)。
- `ha_quality_scale`：表示该集成在[质量等级](https://www.home-assistant.io/docs/quality_scale/)中的评级（如 bronze、silver、gold、platinum）。新集成请设为 `bronze`。该字段会在 Core 中质量等级变更时自动更新，无需手动修改文档。
- `ha_config_flow`：如果该集成支持 [Data Entry Flow](/developers/data_entry_flow_index)，请设为 `true`；否则省略。
- `ha_codeowners`：负责该集成的 GitHub 用户名或团队名（以 `@` 开头）。应与集成 manifest 文件中的 codeowners 保持一致。
- `ha_domain`：该集成在 Home Assistant Core 中的 domain，必须与[integration manifest](/developers/creating_integration_manifest) 文件中的名称一致。
- `ha_integration_type`：该集成在 Home Assistant Core 中的类型，必须与[integration manifest](/developers/creating_integration_manifest) 文件中的名称一致。
- `related`：可选。用于在页面末尾增加“相关主题”链接区。站内链接使用 `docs`，外部链接使用 `url`。如果使用 `docs`，则 `title` 可省略；未设置时会自动使用目标页面标题。

还有一些可用的[预定义变量](https://jekyllrb.com/docs/variables/)，但在编写文档时通常不需要使用。

### Configuration

每个集成页面都应该包含一个配置示例。对于支持 configuration flow 的集成，这通常意味着提供 UI 配置变量说明；对于尚不支持 configuration flow 的集成，则需要提供 YAML 配置示例。

### UI 变量

- 描述 **UI 变量** 时，请使用 `{% configuration_basic %}` 区块。

### 关于配置变量

- **Configuration variables** 章节只用于 YAML 配置。
- **Configuration variables** 章节必须使用 `{% configuration %}` 标签。
- 配置变量必须说明该项是否必填（`false` 或 `true`）。
- 如果有默认值，必须明确写出。
- 配置变量必须说明可接受的值类型（参见[配置变量说明](#configuration)）。
  - 如果某个配置项支持多种类型，请使用逗号分隔，例如 `string, integer`。

### 配置变量区块示例

```yaml
{% configuration %}
some_key:
  description: This is a description of what this key is for.
  required: false
  type: string
  default: Optional default value - leave out if there isn't one
{% endconfiguration %}
```

```text
{% configuration %}
api_key:
  description: The API key to access the service.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: The default name to use in the frontend.
  type: string
monitored_conditions:
  description: Conditions to display in the frontend.
  required: true
  type: map
  keys:
    weather:
      description: A human-readable text summary.
    temperature:
      description: The current temperature.
{% endconfiguration %}
```

可用字段：

- **`description:`**：该变量的用途说明。
- **`required:`**：该变量是否必填。

```text
required: true            #=> Required
required: false           #=> Optional
required: inclusive       #=> Inclusive
required: exclusive       #=> Exclusive
required: any string here #=> Any string here
```

- **`type:`**：变量类型。允许的值包括：`action`、`boolean`、`string`、`integer`、`float`、`time`、`template`、`device_class`、`icon`、`map`/`list`（表示条目列表）、`date`、`datetime`、`selector` 和 `any`。如果支持多种类型，可写成 `[string, integer]`。如果使用 `map`/`list`，则应定义 `keys:`（可参考 [`template` sensor](https://www.home-assistant.io/integrations/sensor.template/) 示例）。如果使用 `boolean`，则必须定义 `default:`。

### 嵌入代码

你可以使用[标准 Markdown 语法](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code) 来生成带语法高亮的代码块。行内代码请使用反引号包裹。

如果你写的是要在终端中执行的命令，请不要在前面加 `$`，否则会影响复制粘贴体验。但如果必须明确区分“输入的命令”和“命令输出”，则可以使用 `$` 前缀。

### 模板

在[配置模板](https://www.home-assistant.io/docs/configuration/templating/)中使用的是 [Jinja](http://jinja.pocoo.org/)。更多细节请参见[文档规范](/developers/documenting/standards)。

如果模板没有正确转义，它们会在网站上被直接渲染，最终显示为空白。

### HTML

文档支持直接使用 HTML，但通常不推荐这样做。提示框是少数例外场景之一。

```html
<div class='note warning'>
  You need to enable telnet on your router.
</div>
```

请注意，如果你想在 HTML 区块中使用 Markdown，需要在前后保留空行。

```html
<div class='note warning'>

  You need to enable [**telnet**](https://en.wikipedia.org/wiki/Telnet) on your router.

</div>
```

### 图片、图标与 logo

为集成配上 logo，可以让终端用户更快识别该集成。
从文档实现角度来看，启用 logo 本身不需要额外配置，但对应 logo 必须已经存在于我们的 Brands 仓库中。

- 如需为集成添加 logo 和 icon，请向 [Home Assistant Brands](https://github.com/home-assistant/brands) 提交 Pull Request。

- 如果要添加用于集成页面或其他文档页面的图片，请根据用途将图片放到对应目录中：

| Type        | Location                  |
| :---------- | :------------------------ |
| blog        | source/images/blog        |
| screenshots | source/images/integrations/your-integration |

### 从侧边栏添加链接

如果你新增了一个需要在侧边栏中显示链接的页面，请编辑以下文件之一：

- [`docs_navigation.html`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/asides/docs_navigation.html)
- [`docs_sitemap.html`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/asides/docs_sitemap.html)
