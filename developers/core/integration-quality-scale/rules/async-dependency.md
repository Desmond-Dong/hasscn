import RelatedRules from './\_includes/related\_rules.jsx'

## 理由

Home Assistant 使用 asyncio 来高效处理任务。
为避免在 asyncio event loop 和其他线程之间切换上下文（这在性能上代价很高），理想情况下你的库也应使用 asyncio。

这不仅使系统更高效，代码也更加整洁。

## 附加资源

有关如何创建库的更多信息，请参阅[文档](/developers/api_lib_index.md)。

## 例外

此规则没有例外。

## 相关规则

<RelatedRules relatedRules={frontMatter.related_rules}></RelatedRules>
