---
title: 优化 Home Assistant 移动网页应用
description: 这是一份完整清单，介绍了我们为提升移动网页应用性能所做的优化。
---

_这篇博客会详细介绍最近为 Home Assistant 前端进行的一系列性能优化。如果你还不熟悉这个应用，可以先看看[演示][demo]和[源码][hap]。_

一句话总结：不要硬改框架，拆分职责，少发一些代码，使用服务工作线程，并拥抱（未来的）Web 标准。

今年在 Google I/O 上，我看了 Polymer 团队的 Monica 分享关于 Web Components 和性能的演讲。她在演讲中提到，他们团队为了让东西更快，有一句信条：**少做事，并且保持懒惰**。

少做事，并且保持懒惰。听起来实在太显而易见了，而我花了一些时间才真正领会这句话。我觉得自己写的大多数代码本来就挺快的，但我并不常停下来，更认真地审视它在真实环境中是如何、又是在什么时候运行的。我们到底什么时候需要结果？它能不能再晚一点？

于是，我开始认真审视 Home Assistant 应用是如何工作的，以及怎样让它变得更快。下面就是我为提升速度所做的各种事情。

我希望这份清单也能对其他人有帮助，成为大家优化自己应用、或者在构建新应用时避开陷阱的一份参考。

第一步永远是测量。Home Assistant 前端是一个移动网页应用，所以我们不应该在一台 8 核、几 GB 内存的机器上做测量，而应该在你预期它会运行的设备上测量：手机。下面是分别在 Home Assistant 0.18.2（优化前）和 Google Chrome 53 下记录的两条时间线。**在我的 Mac 上，应用启动需要 1400 毫秒，而在我的 Nexus 5x 上则需要大约 6500 毫秒（慢了约 4.5 倍！）。**

<p class='img'>
  <img
    src='/home-assistant/images/blog/2016-08-optimizing-web-app/performance-timeline-0.18.2.png'
    alt='Home Assistant 0.18.2 中前端加载时间线' />
</p>

虽然这个应用在我手机上要花 6500 毫秒才能加载完成，但在那之后它的表现其实不错。尽管如此，这样的初始加载时间仍然不可接受。你期待在手机上打开一个应用时，它能很快就可用。应用完下面描述的所有改动之后，我把启动时间缩短到了 Mac 上的 900 毫秒（-35%），以及 Nexus 5x 上的 2400 毫秒（-63%）。[点这里查看演示。][demo]

<p class='img'>
  <img
    src='/home-assistant/images/blog/2016-08-optimizing-web-app/performance-diagram.png'
    alt='并排展示新旧加载时间的图表' />
  <img
    src='/home-assistant/images/blog/2016-08-optimizing-web-app/performance-timeline-0.26.png'
    alt='Home Assistant 0.26 中前端加载时间线' />
</p>

<!--more-->

## 技术背景

Home Assistant 前端由两部分组成。其一是 [Home Assistant JS][hajs]，负责所有数据以及 JavaScript 与服务器之间的交互。它采用基于 Flux 的架构，并使用了 [NuclearJS] 和 [ImmutableJS]。其二是用 [Home Assistant Polymer][hap] 实现的 UI，基于 [Polymer] 和 Web Components。

# 不要硬改框架

我当时自以为很聪明。我把所有 Web Components 里的 JavaScript 部分拆出来，并用 Webpack 单独打包，这样就能通过 BabelJS 使用 ES2015（参见[架构][es2015-arch]）。但这并不是 Polymer 组件的标准写法，这意味着我既无法使用社区中已有的工具链，也很难轻松拆分 bundle（后面还会提到这一点）。

于是我把所有 Web Components 又从闪亮漂亮的 ES6 回退成了 ES5。结果你知道吗？其实也没那么糟。没错，不能使用简洁的对象写法和箭头函数，确实会让代码更啰嗦一些。但最终在浏览器里运行的，本来就是同样的代码。

让每个 Web Component 都保留自己的 `<script>` 标签还有另一个好处：浏览器会一个接一个地处理它们，这让浏览器能在中间有机会渲染我们的加载 spinner 动画。

正如你在时间线里看到的，我们成功消除了大部分会阻塞组件加载的情况。

<p class='img'>
  <img
    src='/home-assistant/images/blog/2016-08-optimizing-web-app/timeline-no-more-es2015.png'
    alt='优化前后前端加载时间线' />
</p>

# 拆分职责

每当你学会一种新技术时，总会觉得自己获得了超能力。哇，只要两行代码就能做到这些？！我在学会打包时也有同样的感觉。

一开始，我非常执着于只发布一个包含应用所需一切内容的单一文件。入口点是我的主组件，它会引入所有 Flux 和 UI 依赖。然后就在真正渲染之前，再去检查是否已经认证，并开始拉取数据。

这是一种非常糟糕的模式。它意味着，直到你的 UI 准备好渲染之前，你都不会开始获取任何数据。更好的做法是尽可能早地发起数据请求，而在请求发往服务器的同时，让页面去加载所有 UI 组件。

为了做到这一点，我把应用核心从主 bundle 中提取了出来。在当前优化后的版本中，它 gzip 后只有 31.1 KB。它会在其他任何脚本之前加载，这样就能尽早开始获取数据。

<p class='img'>
  <img
    src='/home-assistant/images/blog/2016-08-optimizing-web-app/timeline-corejs.png'
    alt='优化前后前端加载时间线' />
</p>

如果数据在 UI 加载完成前就返回了，我们就可以在真正开始渲染 UI 之前先处理它，因为所有 Web Components 都是分别处理的。这意味着，在组件第一次渲染时，我们不需要先显示一个加载画面，而是可以直接带着所需数据把组件渲染出来。

# 少发一些代码

这个思路很简单：如果我们能让浏览器接收更少的代码，它需要处理的内容就更少，启动自然也会更快。

## 只加载当前页面真正需要的组件

Home Assistant 移动网页应用有 10 个不同的面板（页面）。除此之外，它还为每一种设备类型提供了一个显示更多信息的对话框。这意味着组件和界面其实非常多，而启动时真正需要的只有很小的一部分。这也意味着，我们正在发送大量浏览器在首次渲染之前不得不处理、但其实并不必要的数据！

我把应用中的每个面板都拆成了独立的 bundle，按需加载。仅仅嵌入式地图这一项，就节省了 250 KB 的预 gzip 体积！不过，这个改动也要求我们对构建流程做出相当大的调整。

在 JavaScript 中拆分应用之所以复杂，是因为每个模块都会显式导入自己的依赖。在拆成多个文件之后，这件事在浏览器中仍然必须正常工作。Web Components 就没有这个问题，因为这是平台本身的一部分，浏览器自己就是注册表！一个尚未注册的 Web Component 在完成注册前，只会被渲染成一个空的 `span` 元素。加载顺序并不重要。

```javascript
// 展示 Web Components 灵活性的示例。
var spinner = document.createElement('paper-spinner');
spinner.active = true;
document.body.appendChild(spinner);
```

因为浏览器会追踪你的 Web Components，所以为应用的不同部分创建独立 bundle 非常容易：

- 找出主 bundle 中已经包含的全部依赖（使用 [hydrolysis]）
- 为每个面板（页面）创建独立 bundle，同时过滤掉已经包含在主 bundle 中的依赖

负责打包并压缩主 bundle 和各面板 bundle 的构建脚本不到 100 行。

## 将 JavaScript 打包工具切换到 Rollup

`core.js` 仍然是纯 JavaScript，所以还是需要打包。在我为了缩小 bundle 而不断尝试的过程中，我先从 [Webpack] 换到 Webpack 2，再换到 [Rollup]。每走一步，bundle 都更小。Rollup 是这里最大的赢家，因为它不会把所有模块都包进函数调用里，而是尽量少做改动地把所有文件直接拼接起来。这不仅缩小了文件大小，也提升了加载速度。原因在于，JavaScript 引擎不再需要为了解析每个 `import` 去调用一个函数，它要做的事情更少了。这对电脑来说也许不算什么，但在手机上，每一点都很重要。

## 严格审视依赖项

如果目标是少发一些代码，那就该认真看看依赖项了。我们太常会因为某个 NPM 包能让事情更轻松一点，就顺手把它加进来，但代价往往是体积，而这些体积通常来自你可能永远也用不上的功能。

### 移除 Lodash

我意识到自己其实只用到了 lodash 里的少数几个方法。Lodash（以及更早之前的 underscore）曾经几乎是我每次开始新项目时最先加入的依赖之一。但在 Home Assistant 这个场景下，我已经无法再为它辩护了。哪怕有 dead code tree shaking，它也不值得被包含进来。没错，它们确实支持很多边界情况，但那些对我的实际使用场景并不重要。而且单独拆出来的 lodash 包[依然很大][lodash.range]。我唯一没法用自己几行代码替代的是 debounce，不过我后来找到了[一个只有 40 行的替代实现][debounce]。

### 用 Fecha 替换 moment.js

Moment.js 是那种功能非常强大的库。几乎任何日期相关问题，它都能处理。但这显然也要付出体积代价。[Fecha] 这个日期格式化库的体积大约只有 moment.js 的 8%（预 gzip 仅 4.7 KB）。而它唯一缺少的是日期运算功能，而这一部分在我们的应用里根本没有使用到。

# 使用服务工作线程让应用瞬间加载

借助服务工作线程，我们可以把所有应用组件和核心 JavaScript 都存储在浏览器中。这意味着，在第一次访问之后，浏览器只需要通过网络从服务器获取最新数据。

使用 [sw-precache] 这样一个服务工作线程生成工具，创建服务工作线程非常容易。

如果浏览器不支持服务工作线程，Home Assistant 会提供带指纹的静态资源，并对其进行强缓存。只有在内容发生变化时，客户端才会重新下载这些资源。

为了让 sw-precache 与资源指纹配合使用，我们还绕了一些弯路。[最终的构建脚本在这里。][build-sw]

# 让它感觉起来更快

这一点更偏向心理层面：没有人喜欢盯着一片白屏，因为白屏是模糊的——我们到底是在加载内容、网络太差，还是脚本报错了？所以，尽快在屏幕上渲染出某些东西，告诉用户其余内容还在加载，是非常重要的。

Home Assistant 的落地页只包含足够渲染加载画面的 CSS 和 HTML，不包含动画。

既然应用现在已经足够快了，我可能会把这个轻量加载画面换成一个空的工具栏轮廓。这样会让人感觉 UI 已经快到了。

# 使用建立在 Web 标准之上的框架

_我把这一点放到最后，主要是因为这并不是我能控制的。就在我优化应用的这段时间里，Polymer 恰好发布了一次更新，而它显著提升了加载速度。_

使用 Polymer 的好处在于，我们今天就能用上明天的 Web 标准。这依赖于 polyfill。polyfill 会用 JavaScript 来模拟原本应该由 Web 标准负责的行为。随着浏览器不断进步，越来越多的工作可以从 polyfill 回到浏览器本身。这非常棒，因为浏览器能更好地优化这些工作，因此也会更快。

Polymer 1.6 在 6 月底发布，它让应用能够在 Chrome 和 Firefox 中利用原生 [CSS variables][css-vars]。它还引入了延迟注册。这两项都极大地加快了我们的加载时间。

# 未来的优化方向

虽然我们已经做了很多优化，但这段旅程永远不会真正结束。依然还有很多机会可以把速度做得更快。下面是我接下来准备探索的一些想法：

- 使用 shadow DOM，而不是 shady DOM polyfill
- 使用 [closure compiler][closure] 来优化 JavaScript
- 减少需要加载的图标数量
- 在未使用服务工作线程时，把初始 API 响应直接嵌入页面
- 继续缩小初始 bundle，把那些首屏不可见的内容都移出去，比如显示实体更多信息的对话框
- 使用 `<link rel="preload" …>` 预取其他页面

[demo]: /demo
[hap]: https://github.com/home-assistant/home-assistant-polymer
[mantra]: https://www.youtube.com/watch?v=zfQoleQEa4w&feature=youtu.be&t=1380
[sw-precache]: https://github.com/GoogleChrome/sw-precache
[hydrolysis]: https://github.com/Polymer/hydrolysis
[hajs]: https://github.com/home-assistant/home-assistant-js
[es2015-arch]: https://github.com/home-assistant/home-assistant-polymer/wiki/Using-Polymer-with-ES2015,-Babel-and-NPM
[NuclearJS]: https://optimizely.github.io/nuclear-js/
[ImmutableJS]: https://immutable-js.github.io/immutable-js/
[Polymer]: https://www.polymer-project.org/
[Webpack]: https://webpack.github.io/
[Rollup]: http://rollupjs.org/
[lodash.range]: https://github.com/lodash/lodash/blob/3.1.7-npm-packages/lodash.range/index.js
[debounce]: https://github.com/component/debounce
[Fecha]: https://github.com/taylorhakes/fecha
[build-sw]: https://github.com/home-assistant/home-assistant-polymer/blob/master/脚本/sw-precache.js
[css-vars]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
[closure]: https://开发者.google.com/closure/compiler/
