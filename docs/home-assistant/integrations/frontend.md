---
title: Home Assistant frontend
description: 为 Home Assistant 提供前端。
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/frontend'
ha_domain: frontend
ha_integration_type: system
---

这提供了控制 Home Assistant 的官方前端。此集成默认启用，除非您从 "`configuration.yaml`" 文件中禁用或删除了 [`default_config:`](/home-assistant/integrations/default_config/) 行。如果是这种情况，以下示例展示了如何在 "`configuration.yaml`" 文件中手动启用此集成。

```yaml
# 示例 configuration.yaml 条目
frontend:
```

```yaml
  themes:
    description: 允许您定义不同的主题。详情请参见下文。
    required: false
    type: map
    keys:
      "[identifier]":
        description: 在前端使用的名称。
        required: true
        type: [list, map]
        keys:
          "[css-identifier]":
            description: CSS 标识符。
            required: true
            type: [list, string]
  extra_module_url:
    description: "在 `latest` JavaScript 模式下要加载的额外 JavaScript 模块列表。"
    required: false
    type: list
  extra_js_url_es5:
    description: "在 `es5` JavaScript 模式下要加载的额外 JavaScript 代码列表。"
    required: false
    type: list
  development_repo:
    description: "允许您指向包含前端文件的目录，而不是从预构建的 PyPI 包中获取。适用于前端开发。更多信息，请参阅[前端开发](https://developers.home-assistant.io/docs/frontend/development)。"
    required: false
    type: string
  development_pr:
    description: "允许您指向包含前端文件的特定前端[拉取请求](https://github.com/home-assistant/frontend/pulls)，而不是从预构建的 PyPI 包中获取。适用于前端开发。这需要设置 `github_token`。更多信息，请参阅[前端开发](https://developers.home-assistant.io/docs/frontend/development#test-an-existing-pr)。"
    required: false
    type: integer
  github_token:
    description: "从特定拉取请求获取前端文件时使用的 GitHub 令牌。当设置 `development_pr` 时需要。更多信息，请参阅[创建 GitHub 令牌](https://developers.home-assistant.io/docs/frontend/development#creating-a-github-token)。"
    required: false
    type: string
```

## 定义主题

### 主题格式

前端集成允许您创建自定义主题来影响用户界面的外观和感觉。
"`configuration.yaml`" 文件中的配置条目示例：

```yaml
# 示例 configuration.yaml 条目
frontend:
  themes:
    happy:
      primary-color: pink
      accent-color: orange
    sad:
      primary-color: steelblue
      accent-color: darkred
```

上面的示例定义了两个名为 `happy` 和 `sad` 的主题。对于每个主题，您可以为 CSS 变量设置值。如果您想提供十六进制颜色值，请将它们用引号括起来，否则 YAML 会将它们视为注释（`primary-color: "#123456"`）。

### 支持的主题变量

#### 主色调和强调色

主色调和强调色是应用程序的主要颜色。
它们可以通过 `primary-color` 和 `accent-color` 变量进行修改。

#### 状态颜色

每个实体都有自己的颜色，基于 `domain`、`device_class` 和 `state`，以便于识别。这些颜色用于[仪表板](/home-assistant/dashboards/)和[历史记录](/home-assistant/integrations/history/)。Home Assistant 具有适合大多数用例的默认颜色规则。

以下是支持颜色的域列表：`alarm_control_panel`、`alert`、`automation`、`binary_sensor`、`calendar`、`camera`、`climate`、`cover`、`device_tracker`、`fan`、`group`、`humidifier`、`input_boolean`、`light`、`lock`、`media_player`、`person`、`plant`、`remote`、`schedule`、`script`、`siren`、`sun`、`switch`、`timer`、`update` 和 `vacuum`。

颜色规则可以使用主题变量进行自定义：

1. `state-{domain}-{device_class}-{state}-color`
2. `state-{domain}-{state}-color`
3. `state-{domain}-(active|inactive)-color`
4. `state-(active|inactive)-color`

请注意，变量将按列出的顺序使用，因此如果有多个变量匹配您的实体，将使用第一个匹配的变量（即最具体的那个）。

```yaml
# 示例 configuration.yaml 条目
frontend:
  themes:
    my_theme:
      state-cover-garage-open-color: "#ff0000"
      state-media_player-inactive-color: "#795548"
```

上面的示例为打开的车库门定义了红色，为非活动的媒体播放器定义了棕色。

### 不支持的主题变量

尽管我们尽力保持功能正常，但其他主题变量的行为可能会在版本之间发生变化。有关主前端使用的变量部分列表，请参见 [color.globals.ts](https://github.com/home-assistant/frontend/blob/master/src/resources/theme/color/color.globals.ts)。

### 深色模式支持

也可以创建基于默认深色模式主题的主题。新主题还可以同时支持浅色和深色模式，并允许用户在用户资料页面上切换：

[![Open **User profile** in your Home Assistant instance.](https://my.home-assistant.io/badges/profile.svg)](https://my.home-assistant.io/redirect/profile/)

扩展示例以显示模式定义。

```yaml
# 示例 configuration.yaml 条目
frontend:
  themes:
    happy:
      primary-color: pink
      text-primary-color: purple
    sad:
      primary-color: steelblue
      modes:
        dark:
          secondary-text-color: slategray
    day_and_night:
      primary-color: coral
      modes:
        light:
          secondary-text-color: olive
        dark:  
          secondary-text-color: slategray
```

主题 `happy`：与前面的示例相同。这种传统格式仍然受支持，将像以前一样工作，并自动使用默认浅色主题作为基础。

主题 `sad`：通过使用新的 `modes` 键加上子键 `dark`，此主题现在将基于默认深色主题。最终的主题规则分三步确定：首先，应用默认深色主题 CSS 变量，然后应用主题顶层的与模式无关的 CSS 变量（此示例中的 `primary-color: steelblue`），最后将特定模式的 CSS 变量叠加在上面（`secondary-text-color: slategray`）。

注意：由于此示例主题只定义了 `dark` 模式，该模式将自动使用。

主题 `day_and_night`：此主题同时具有 `light` 和 `dark` 模式部分。这告诉前端允许用户从用户资料中选择要使用的模式（默认选择基于系统设置）。无论选择如何，主色调都将设置为珊瑚色，但根据所选模式，将使用默认浅色或深色主题作为渲染基础，次要文本颜色将分别为橄榄色或石板灰色。

### 主题配置拆分

与所有配置一样，您可以：

- 直接在您的 "`configuration.yaml`" 文件中指定主题。
- 将它们放入单独的文件（例如 `themes.yaml`）并在配置中包含该文件（`themes: !include themes.yaml`）。
- 创建一个专用文件夹（例如 `my_themes`）并包含该文件夹中的所有文件（`themes: !include_dir_merge_named my_themes`）。

有关将配置拆分为多个文件的更多详细信息，请参阅[此页面](/home-assistant/docs/configuration/splitting_configuration/)。

查看我们的[社区论坛](https://community.home-assistant.io/c/29)以找到可使用的主题。

## 设置主题

有两个与主题相关的动作：

- `frontend.reload_themes`：从您的 "`configuration.yaml`" 文件重新加载主题配置。
- `frontend.set_theme`：设置后端首选的主题名称。

### 动作：设置主题

`frontend.set_theme` 动作允许您设置前端使用的主题。

| 数据属性 | 描述                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `name`         | 默认使用的主题名称。设置 `default` 以使用默认 _Home Assistant_ 主题。如果省略，将保留之前的设置。 |
| `name_dark`    | 深色模式下默认使用的主题名称。设置 `default` 以使用默认 _Home Assistant_ 主题，或 `none` 以删除深色模式覆盖。如果省略，将保留之前的设置。 |

如果从未设置过深色模式，或通过将 `name_dark` 设置为 `none` 已删除，则浅色模式主题也将用于深色模式。

主题设置将被保存并在 Home Assistant 重启时恢复。

### 手动选择主题

当在 "`configuration.yaml`" 文件中启用主题时，用户资料页面中将显示一个新选项（通过单击侧边栏底部的用户账户首字母访问）。然后您可以从下拉列表中选择任何已安装的主题，它将立即应用。
这将覆盖上述动作设置的主题设置，并保存到您的用户资料中，因此它适用于该用户的所有设备。

<p class='img'>
  <img src='/home-assistant/images/frontend/user-theme.png' />
  设置主题
</p>

## 加载额外的 JavaScript

从版本 0.95 开始，您可以加载额外的自定义 JavaScript。

示例：

```yaml
# 示例 configuration.yaml 条目
frontend:
  extra_module_url:
    - /local/my_module.js
  extra_js_url_es5:
    - /local/my_es5.js
```

模块将在支持它的设备上使用 `import({{ extra_module }})` 加载（`latest` 模式）。
对于其他设备（`es5` 模式），您可以使用 `extra_js_url_es5`，这将使用 `<script defer src='{{ extra_module }}'></script>` 加载。

ES5 和模块版本永远不会同时加载，根据设备是否支持 `import`，将加载模块或 ES5 版本。

### 手动选择语言

浏览器语言会自动检测。要使用不同的语言，请转到用户资料页面（通过单击侧边栏底部的用户账户首字母访问）并选择一种。它将立即应用。

<p class='img'>
  <img src='/home-assistant/images/frontend/user-language.png' />
  选择语言
</p>