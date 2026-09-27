要创建新的集成页面，请按照以下步骤操作：

1. 文档仓库有两个主要分支：`current` 和 `next`：
   * 如果正在为即将添加到代码中的新集成编写文档，切换到 `next` 分支。
2. 复制[integration documentation template](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations/_integration_docs_template.markdown)并进行编辑。
3. 确保集成页面的文件名与集成的 domain 名称匹配。
   * [Integration overview](https://www.home-assistant.io/integrations/)和[Examples section](https://www.home-assistant.io/cookbook/)是自动生成的，因此无需向这些页面添加链接。
4. 确保遵循我们的文档[标准](documenting/standards.md)，包括：
   * [General style guide](/developers/documenting/general-style-guide.md)
   * [YAML Style Guide](/developers/documenting/yaml-style-guide.md)
   * [Documentation structure and example text](/developers/documenting/integration-docs-examples.md)
5. 确保为 brands 仓库添加[icon 和 logo](#images-icons-and-logos)。
   * 如果你的集成原本是 custom integration（HACS），现在变为 core integration，将 brand 文件移入 `core_integrations` 文件夹。
   * 在 PR 模板中，添加指向该 brands PR 的链接。
6. 在[codeowners file](https://github.com/home-assistant/home-assistant.io/blob/next/CODEOWNERS)中添加集成和 codeowners。
7. 如有需要，记录获取第三方服务或设备 API keys 或 access token 所需的步骤。
8. 确保文档不引用 custom integrations。步骤和示例（包括 automation 示例）不应依赖于 custom cards 或 custom integrations。
9. 当你知道有多种设备时，添加已测试的设备类型（包括 firmware）。
10. 添加 blueprints 时，将其上传到 [`https://github.com/home-assistant/home-assistant.io/tree/current/source/blueprints/integrations`](https://github.com/home-assistant/home-assistant.io/tree/current/source/blueprints/integrations) 下的 blueprints 文件夹，或上传到[forums 上的 blueprint exchange](https://community.home-assistant.io/c/blueprints-exchange)。在集成页面中，添加指向 blueprint exchange 的链接。
11. 在将 PR 标记为 **Ready for review** 之前，删除注释。

## 关于集成页面标题格式

每个集成页面都以一个 YAML front matter 头部开始，提供关于集成的元数据。这些元数据驱动集成概览页面、discovery、quality badges 等。包含的 key 取决于集成的功能。

```text
---
title: "Awesome Sensor"
description: "home-assistant.io web presence"
ha_release: 2026.6
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

### 标题头
...
```

以下 key 可用于集成页面文件头部：

* `description`：集成页面的简短描述。
* `featured`：设为 `true` 可在集成分页中突出显示该集成。这不是 `ha_` 前缀的 key。不要使用。
* `ha_bluetooth`：如果集成支持通过 Bluetooth 发现，则设为 `true`，否则省略。
* `ha_brand`：如果页面代表[品牌](/developers/creating_integration_brand.md)而非真正的集成，则设为 `true`，否则省略。品牌将同一制造商的多个集成或产品归在一个名称下，方便用户查找。它与[virtual integration](/developers/creating_integration_manifest.md#virtual-integration)不同。例如，`google` 品牌页面将 `google` 和 `google_sheets` 集成归为一组，`inovelli` 品牌页面则指向其设备使用的 Zigbee 和 Z-Wave IoT 标准。常规集成页面请省略此 key。
* `ha_category`：此条目用于在[Integration overview](https://www.home-assistant.io/integrations/)中对集成进行分组。
* `ha_codeowners`：负责该集成的 GitHub 用户名或团队名称（以 `@` 开头）。应与集成 manifest 文件中列出的 codeowners 匹配。
* `ha_config_flow`：如果集成有[Data Entry Flow](/developers/data_entry_flow_index.md)，则设为 `true`，否则省略。
* `ha_dhcp`：如果集成支持通过 DHCP 发现，则设为 `true`，否则省略。
* `ha_domain`：集成在 Home Assistant Core 中的 domain。必须与[integration manifest](/developers/creating_integration_manifest.md)文件中的名称匹配。
* `ha_homekit`：如果集成支持通过 HomeKit 发现，则设为 `true`，否则省略。
* `ha_integration_type`：集成在 Home Assistant Core 中的类型。必须与[integration manifest](/developers/creating_integration_manifest.md)文件中的名称匹配。
* `ha_iot_class`：[IoT class](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things)是对设备行为的分类器。
* `ha_iot_standard`：仅用于"IoT standards"类型的[virtual integration](/developers/creating_integration_manifest.md#virtual-integration)。产品用于连接性的 IoT 标准。必须与 virtual integration 的[manifest](/developers/creating_integration_manifest.md)文件中的 `iot_standards` 值匹配。它用于指导你使用相应标准添加设备。可以列出以下一个或多个标准：
  * `homekit`：产品通过 HomeKit 连接。
  * `zigbee`：产品通过 Zigbee 连接。
  * `zwave`：产品通过 Z-Wave 连接。
* `ha_mqtt`：如果集成支持通过 MQTT 发现，则设为 `true`，否则省略。
* `ha_platforms`：此条目列出所有实现的[platforms](/developers/creating_platform_index.md)。
* `ha_quality_scale`：集成在[quality scale](https://www.home-assistant.io/docs/quality_scale/)上的评级（如 bronze、silver、gold、platinum 或 internal）。对于新集成，请设为 `bronze`。此字段在从 Core 代码库进行文档同步期间更新。通常无需手动更新文档。
* `ha_release`：集成被包含时的 Home Assistant 版本。
  * 如果当前版本是 2025.8，则将 `ha_release` 设为 2025.9。
  * 对于 10 月版本，即 '2025.10'，需要用引号引起来，否则前导零不会显示。
* `ha_ssdp`：如果集成支持通过 SSDP 发现，则设为 `true`，否则省略。
* `ha_supporting_domain`：仅用于"supported by"类型的[virtual integration](/developers/creating_integration_manifest.md#virtual-integration)。为此产品提供实际实现的集成的 domain。必须与 virtual integration 的[manifest](/developers/creating_integration_manifest.md)文件中的 `supported_by` 值匹配。例如，`dacia` virtual integration 将 `ha_supporting_domain` 设为 `renault`，因为它由 Renault 集成实现。
* `ha_supporting_integration`：仅用于"supported by"类型的[virtual integration](/developers/creating_integration_manifest.md#virtual-integration)。`ha_supporting_domain` 中引用的 supporting integration 的人类可读名称（例如 `Renault`）。用于生成的 stub 页面中，告知你使用哪个集成。
* `ha_zeroconf`：如果集成支持通过 mDNS/Zeroconf 发现，则设为 `true`，否则省略。
* `related`：可选。在页面末尾添加一个包含相关主题链接的部分。本地链接使用 `docs`，外部链接使用 `url`。使用 `docs` 时，`title` key 是可选的。如果不设置，将使用你所指向页面的标题。
* `title`：此标题应与集成 manifest 文件中编写的集成名称匹配。
* `works_with`：不要使用。通常此 key 由维护者添加。一个值列表，表示品牌或产品是 [Works with Home Assistant](https://works-with.home-assistant.io/) 合作伙伴计划的一部分。添加此 key 会显示 "Works with Home Assistant" 徽章，并在页面中生成特定于计划的文本。每个条目代表产品获得认证的连接方式。以下值被识别：
  * `zwave`：产品通过 Z-Wave 连接。渲染为 "Z-Wave"，并添加 Z-Wave onboarding 文本和徽章。
  * `zigbee`：产品通过 Zigbee 连接。渲染为 "Zigbee"，并添加 Zigbee onboarding 文本和徽章。
  * `matter`：产品通过 Matter 连接。渲染为 "Matter"，并添加 Matter onboarding 文本和徽章。
  * `bluetooth`：产品通过 Bluetooth 连接。
  * `local`：产品在本地集成（例如通过本地网络）。
  * 任何其他值将在生成的文本中原样使用（首字母大写）。
  * 当产品获得多种连接方式认证时，可以列出多个值（例如同时列出 `zigbee` 和 `matter`）。

### 配置

每个集成页面都应包含配置示例。对于有 config flow 的集成，这包括 UI 变量描述；对于尚不支持 config flow 的集成，则包括 YAML 配置。

### UI 变量

* 描述**UI 变量**时使用 `{% configuration_basic %}` section。
* `{% configuration_basic %}` block 与 `{% configuration %}` block 类似，但没有 `required` 或 `type` 字段。

### 关于配置变量

* **Configuration variables** section 仅用于 YAML 配置。
* **Configuration variables** section 必须使用 `{% configuration %}` tag。
* 配置变量必须记录默认值（如果有）。
* 配置变量必须记录该变量是否必需（`false` 或 `true`）。如果变量有默认值，则它不是必需的，`required` 字段应设为 `false`。
* 配置变量必须记录接受的值类型（见[configuration variables details](#configuration)）。
  * 对于接受多种类型的配置变量，用逗号分隔类型（即 `string, integer`）。

### 示例配置变量 block

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

可用的 key：

* **`description:`**：该变量的用途说明。
* **`required:`**：该变量是否必需。

```text
required: true            #=> Required
required: false           #=> Optional
required: inclusive       #=> Inclusive
required: exclusive       #=> Exclusive
required: any string here #=> Any string here
```

* **`type:`**：变量的类型。允许的值：`action`、`boolean`、`string`、`integer`、`float`、`time`、`template`、`device_class`、`icon`、`map`/`list`（用于条目列表）、`date`、`datetime`、`timedelta`、`selector` 和 `any`。对于多种可能性，使用 `[string, integer]`。如果使用 `map`/`list`，则应定义 `keys:`（参见 [`template` sensor](https://www.home-assistant.io/integrations/sensor.template/) 作为示例）。如果使用 `boolean`，则必须定义 `default:`。

### 嵌入代码

可以使用[默认 markdown 语法](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code)生成语法高亮的代码。对于 inline code，用反引号包裹代码。

编写将在终端上执行的代码时，不要以 `$` 为前缀，因为这样会使复制粘贴命令变得困难。不过，当需要区分输入的命令和命令输出时除外。在这些情况下，必须用 `$` 为命令加前缀。

### 模板

[configuration templating](https://www.home-assistant.io/docs/configuration/templating/) 使用 [Jinja](http://jinja.pocoo.org/)。更多详情，请参阅[文档标准](documenting/standards.md)。

如果不转义 templates，它们将被渲染并在网站上显示为空白。

### HTML

支持直接使用 HTML，但不推荐。Note boxes 是一个例外。

```html
<div class='note warning'>
  You need to enable telnet on your router.
</div>
```

请注意，如果想在 HTML block 内使用 Markdown，它必须前后各有一个空行。

```html
<div class='note warning'>

  You need to enable [**telnet**](https://en.wikipedia.org/wiki/Telnet) on your router.

</div>
```

### 图像、图标和标志

为集成添加 logo 可以让最终用户快速识别该集成。
从文档的角度来看，无需特定配置即可启用 logo 的使用，但 logo 必须存在于我们的 Brands 仓库中。

* 要为集成添加 logo 和 icon，请在 [Home Assistant Brands](https://github.com/home-assistant/brands) 仓库中提交 pull request。

* 要添加其他图片（显示在集成页面或任何其他文档页面上），请根据用途将图片存储在相应目录中：

| Type        | Location                  |
| :---------- | :------------------------ |
| blog        | source/images/blog        |
| screenshots | source/images/integrations/your-integration |

### 从侧边栏链接

如果要添加需要从侧边栏链接的新页面，请编辑：

* [`docs_navigation.html`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/asides/docs_navigation.html)
* [`docs_sitemap.html`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/asides/docs_sitemap.html)
