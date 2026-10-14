Home Assistant frontend 过去使用 [Polymer Library](https://polymer-library.polymer-project.org/3.0/docs/about_30) 来处理 web components。Polymer 此后已被弃用，并由 [Lit](https://lit.dev) 取代。

在过去几年中，我们将大部分 frontend 迁移到了 Lit，只有少数地方和依赖仍在使用 Polymer。

这是好消息，因为 Lit 比 Polymer 快得多也轻量得多。

在 Home Assistant 2023.4 中，我们终于从 Home Assistant 的入口点移除了最后一块 Polymer，这意味着它在应用启动时不会加载，只有在组件需要它时才会加载。

对于自定义 cards 和 panels，我们在 window 对象上提供了 Polymer，以便于访问和使用。但现在几乎不再使用了，而且由于 Home Assistant 不再使用它，它主要是一大段未使用的代码，拖慢了 Home Assistant 的加载速度。

因此我们决定将其移除。

在 Home Assistant 2023.5 中，Home Assistant 将不再提供 Polymer。如果您现在使用 Polymer，我们建议您切换到 Lit。如果您想继续使用 Polymer，则需要自行加载 Polymer。

在 Home Assistant 2023.4 中，每次访问 Polymer 时我们都会记录一条警告。如果您收到日志消息，请找到使用 Polymer 的自定义 card、panel 或 more info，并通知作者此弃用信息。
