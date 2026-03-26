---
title: 集成页面结构
---

本页展示推荐的集成页面结构，以及一些可复用的常用文案。

本页给出了集成页面的高层结构建议。
请结合以下文档一起使用：

- The integration documentation template in the `home-assistant.io` repository under [/_integrations/_integration_docs_template.markdown](https://github.com/home-assistant/home-assistant.io/tree/current/source/_integrations/_integration_docs_template.markdown).
- [Documentation standards](/developers/documenting/standards).
- [Documentation style guide](/developers/documenting/general-style-guide).
- The documentation rules of the [Integration Quality Scale](/developers/core/integration-quality-scale).

## 集成页面的基础结构

- Introduction
  - Use case
- Supported/unsupported devices
- Prerequisites
- Configuration
- Configuration options
- Supported functionality
- Actions
- Examples
- Data updates
- Known limitations
- Troubleshooting
- Community notes
- Removing the integration

## 集成文档可复用内容

你可以复用那些在多个页面中反复出现的[通用文本片段](/developers/documenting/general-style-guide#reusable-text)。

下面这些片段在集成页面中尤其常用。

### Configuration

<p class='img'>
<img class='invertDark'
    src='/developers/img/en/documentation/config_flow.png'
  alt='显示预定义配置文本块的截图'
  />
  显示预定义配置文本块的截图
</p>

要使用这个元素，请加入以下内容：

```markdown
{% include integrations/config_flow.md %}
```

当前片段内容可参考 [`config_flow.md`](https://github.com/home-assistant/home-assistant.io/blob/current/source/_includes/integrations/config_flow.md)。

### `configuration_basic` 区块

如果你的集成通过 config flow 完成设置，请使用 `configuration_basic` 区块描述配置项。

<p class='img'>
  <img class='invertDark'
      src='/developers/img/en/documentation/configuration_variables_ui.png'
      alt='显示通过 UI 设置的集成配置变量区块的截图'
    />
    显示通过 UI 设置的集成配置变量区块的截图
</p>

```markdown
{% configuration_basic %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
{% endconfiguration_basic %}
```

### 面向 YAML 集成的 `configuration` 区块

如果你的集成只能通过 YAML 配置，请使用 `configuration` 区块描述配置项。

<p class='img'>
  <img class='invertDark'
      src='/developers/img/en/documentation/configuration_variables_yaml.png'
      alt='显示 YAML 集成配置变量区块的截图'
    />
    显示 YAML 集成配置变量区块的截图
</p>

```markdown
{% configuration %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
    required: false
    type: string
{% endconfiguration %}
```
