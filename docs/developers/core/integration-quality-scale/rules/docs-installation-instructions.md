---
title: "该文档提供了集成的分步安装说明，包括（如果需要）先决条件"
description: '我们希望用户在设置集成时拥有流畅的体验。 这意味着文档应提供有关如何安装集成的清晰简洁的说明。 这包括安装集成所需的任何先决条件。 本页属于 Home Assistant 开发者文档，适合查阅集成、前端、系统、语音与 API 相关实现说明。'
---
# 该文档提供了集成的分步安装说明，包括（如果需要）先决条件

## 推理

我们希望用户在设置集成时拥有流畅的体验。
这意味着文档应提供有关如何安装集成的清晰简洁的说明。
这包括安装集成所需的任何先决条件。

## 实施示例

```markdown showLineNumbers
## Prerequisites

1. Open the app store and install the **MyProduct** app.
2. Create an account.
3. Add a device to the app.
4. Open the app and go to the **Settings** page.
5. Select **Expose API**.

{% include integrations/config_flow.md %}
```

## 例外情况

这条规则没有例外。