---
title: "拥有集成所有者"
sidebar_label: 🥈 integration-owner
---

## 原因

Home Assistant 集成了成千上万种不同的设备和服务，大多数集成是由项目核心维护者以外的人员贡献的。
我们鼓励添加和维护集成的贡献者成为"集成所有者"（integration owner）。
这个角色赋予贡献者在 GitHub 上处理该集成相关的 issue 和 pull request 时更大的权限，同时也意味着贡献者承担了该集成维护的责任。
每当有针对其集成的新 issue 或 pull request 时，集成所有者将自动收到通知。
在 GitHub 上，集成所有者被称为"codeowner"。

集成所有者记录在每个集成的 `manifest.json` 文件中。
要成为集成所有者，请提交一个 pull request，将你的 GitHub 用户名添加到 manifest 中的 `"codeowners"` 字段。
一个集成可以有多个所有者。

我们非常看重集成所有者！
我们相信拥有所有者的集成能得到更好的维护。
在代码评审中，我们将集成所有者视为该集成方面的专家，并赋予其意见更高的权重。

## 示例实现

集成所有者在 `manifest.json` 中设置。

```json {4} showLineNumbers
{
  "domain": "my_integration",
  "name": "My Integration",
  "codeowners": ["@me"]
}
```

## 更多资源

关于集成所有者的更多信息，请参见 [ADR-0008](https://github.com/home-assistant/architecture/blob/master/adr/0008-code-owners.md)。

## 例外

本规则没有例外。
