---
title: "依赖透明度"
related_rules:
  - async-dependency
---
import RelatedRules from './_includes/related_rules.jsx'

## 推理

Home Assistant 使用大量依赖项来工作。
这些依赖项将随新版本的 Home Assistant 一起提供。
为了让项目信任依赖项，我们希望依赖项满足一组要求。

- 依赖项的源代码必须在 OSI 批准的许可证下可用。
- 该依赖项必须在 PyPI 上可用。
- 发布到 PyPI 的包应该内置在公共 CI 管道中并从公共 CI 管道中发布。
- PyPI 上发布的依赖项版本应与开放在线存储库中的标记版本相对应。

## 例外情况

这条规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>