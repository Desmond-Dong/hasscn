---
title: "文档描述了集成所有的安装参数"
sidebar_label: 🥈 docs-installation-parameters
---

## 原理说明

在设置集成时，没有什么比不知道需要填写哪些信息更令人沮丧了。
为了提升用户体验，文档应描述安装过程中所需的所有参数。
这将帮助用户在开始安装过程之前收集好所有必要的信息。

## 示例实现

如果集成通过 config flow 使用：

```markdown showLineNumbers
{% configuration_basic %}
Host：
    description: "您的 bridge 的 IP 地址。您可以在路由器中找到，或在集成应用的 **Bridge Settings** > **Local API** 下找到。"
Local access token：
    description: "您的 bridge 的本地访问令牌。您可以在集成应用的 **Bridge Settings** > **Local API** 下找到。"
{% endconfiguration_basic %}
```

如果集成通过 `configuration.yaml` 中的 YAML 设置：

```markdown showLineNumbers
{% configuration %}
Host：
    description: "您的 bridge 的 IP 地址。您可以在路由器中找到，或在集成应用的 **Bridge Settings** -> **Local API** 下找到。"
    required: false
    type: string
Local access token：
    description: "您的 bridge 的本地访问令牌。您可以在集成应用的 **Bridge Settings** -> **Local API** 下找到。"
    required: false
    type: string
{% endconfiguration %}
```

## 例外情况

本规则没有例外。
