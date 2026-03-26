---
title: "该文档描述了所有集成安装参数"
---

## 推理

设置集成时，没有什么比不知道需要哪些信息更令人沮丧的了。
为了改善用户体验，文档应描述安装过程中所需的所有参数。
这应该有助于用户在开始安装过程之前收集所有必要的信息。

## 实施示例

如果通过配置流使用集成:

```markdown showLineNumbers
{% configuration_basic %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** > **Local API**."
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** > **Local API**."
{% endconfiguration_basic %}
```

如果通过 `configuration.yaml` 中的 YAML 集成设置:

```markdown showLineNumbers
{% configuration %}
Host:
    description: "The IP address of your bridge. You can find it in your router or in the Integration app under **Bridge Settings** -> **Local API**."
    required: false
    type: string
Local access token:
    description: "The local access token for your bridge. You can find it in the Integration app under **Bridge Settings** -> **Local API**."
    required: false
    type: string
{% endconfiguration %}
```

## 例外情况

这条规则没有例外。
