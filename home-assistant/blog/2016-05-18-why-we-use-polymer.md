# Why we use web components and Polymer

我一直想写这篇文章，因为我们经常被问到类似的问题：*“为什么 Home Assistant 要用 Polymer？为什么不用 React、Redux 之类的？”*

这很容易理解。Polymer 在 Web 框架世界里确实属于“冷门选手”。有大公司背书并不等于一定流行，也不等于社区一定活跃，这一点从使用 Polymer 的项目数量上就能看出来。

不过，[我们确实在用 Polymer，而且它很棒][demo]。为了说明原因，我会经常拿 React 的工作流来对比，因为它在很多方面做得很好，同时也会说明这些事情在 Polymer 里是如何实现的。

Polymer 和 React 一样，都是做组件化 Web 开发，但 Polymer 依托的是 Web 标准：[web components]、[CSS variables]。这些标准目前还没有被所有浏览器完整原生支持，但主流浏览器都在实现它们，这就是未来。现在我们通过 polyfill 也能很好地运行；未来 Home Assistant 的 Web 应用可以直接在浏览器原生运行，速度会更快。

<!--more-->

Polymer 在开发者体验上还没有 React 加 [React Dev Tools] 那么成熟，但这只是时间问题。各家浏览器的开发者工具近几年进步很快，而每一次改进都在帮助 Web Components 获得更好的支持。

Polymer 对 Home Assistant 的另一个重要优势是我们可以[免费获得 Material Design][material design for free]。Polymer 自带的 Material Design 组件质量很高。Google 自己也在使用这些组件，并确保它们在性能以及屏幕阅读器/键盘可访问性方面表现优秀。作为一个开源项目，我们能“外包”出去的基础能力越多越好，这样贡献者就能把精力集中在核心产品上：家庭自动化。

那 Flux、数据管理，以及组件之间交互怎么办？其实和 React 或其他组件化框架很像。类 Flux 架构在 Polymer 里和在 React 里一样成立：当数据变化时，会更新组件属性，并继续向子组件传递。在 Home Assistant 中，我们使用 [NuclearJS]，配合我们[自定义的 Polymer 绑定][own Polymer bindings]。在子组件向父组件传递数据时，Polymer 的模式是用 DOM 事件而不是回调，但最终效果一致。它们相似到什么程度？我只花了两个小时，就基于核心逻辑做出了一个 [React Native 前端][ha-rn]。

那 Babel 和 ES2015 呢？这部分也有方案。每个 Web Component 都由一个 HTML 模板和一个 JavaScript 类组成。你可以把 HTML 模板理解为 React 里的 render 方法。在 Home Assistant 里，我们让 HTML 模板彼此导入，同时为每个组件背后的 JavaScript 类走独立的构建链。这使我们可以在 JavaScript 部分使用 Babel 和 NPM 模块（[more info here][tools-js]）。

当然，这也带来了与其他 JS 框架类似的缺点：浏览器在解析 JavaScript 时会阻塞页面绘制，而不是渐进式渲染页面。不过这在当前前端世界里几乎是默认前提，我们也期待模块打包工具最终能更好地解决这个问题。Tree shaking 在这方面就是一个很有前景的改进方向。

这篇博客的大部分内容都在把 Polymer 和 React 做比较。Polymer 在很多方面和 React 很像，但演进成熟度还没到同一水平。我喜欢 React，但我不认为它会永远是主流。参考过去热门 JS 框架的发展趋势，React 很可能也会被下一个更好的框架替代。

但 Web Components 不一样。它是 HTML 标准的一部分，会长期存在。这让我们在 Home Assistant 的“虚拟总部”里更安心：我们不需要担心为了追热点而被迫重写整个前端，也不用担心将来没人愿意为了一个“遗留系统”再引入一整套额外依赖。

以上，就是我们选择 Polymer 的原因。

[web components]: https://www.w3.org/standards/techs/components#w3c_all

[CSS variables]: https://www.w3.org/TR/css-variables/

[React Dev Tools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

[NuclearJS]: https://optimizely.github.io/nuclear-js/

[own Polymer bindings]: http://paulusschoutsen.nl/博客/2015/07/using-polymer-with-flux-and-a-global-app-状态/

[ha-rn]: https://github.com/balloob/home-assistant-react-native-ios

[tools-js]: https://github.com/home-assistant/home-assistant-polymer#building-the-app

[material design for free]: https://elements.polymer-project.org/browse?package=paper-elements

[demo]: /demo
