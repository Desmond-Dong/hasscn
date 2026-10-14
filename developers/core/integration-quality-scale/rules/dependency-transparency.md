import RelatedRules from './\_includes/related\_rules.jsx'

## 原理说明

Home Assistant 的运行依赖大量第三方依赖项。
这些依赖项将随 Home Assistant 的新版本一起发布。
为了让项目能够信任这些依赖项，我们制定了一套依赖项应满足的要求。

* 该依赖项的源代码必须采用 OSI 批准的许可证发布。
* 该依赖项必须在 PyPI 上可用。
* 发布到 PyPI 的包应当由公开 CI 流水线构建并从中发布。
* PyPI 上发布的依赖项版本应对应一个开放在线仓库中的带标签（tagged）版本。

## 例外情况

本规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
