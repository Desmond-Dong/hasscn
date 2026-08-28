Home Assistant 的国际化项目包括为平台及前端准备本地化环境，以及实际翻译本地化字符串。

某些 components 和 platforms 会包含需要针对该平台专门本地化的字符串。这些字符串在核心的 [home-assistant](https://github.com/home-assistant/core) 仓库中进行管理。Home Assistant 后端会根据运行实例中加载的 components，向客户端提供相应的字符串。

还有一些可本地化的字符串仅存在于前端。这些字符串在 [home-assistant frontend](https://github.com/home-assistant/frontend) 仓库中进行管理。这些字符串与前端一起存储，不依赖于后端配置。

| Type              | Location |
| ----------------- | -------- |
| Entity states     | Core     |
| Config flows      | Core     |
| Options flows     | Core     |
| Device automation | Core     |
| Text in UI        | Frontend |

我们的字符串由社区使用在线翻译工具 [Lokalise](https://lokalise.com/) 进行翻译。
