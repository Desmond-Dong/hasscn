大家新年好！2021 年终于到来了 🎉

你可能已经知道，最近我们意识到几个流行的 custom integrations 中存在安全问题。你可以在此处阅读更多：

* https://www.home-assistant.io/blog/2021/01/14/security-bulletin/
* https://www.home-assistant.io/blog/2021/01/22/security-disclosure/
* https://www.home-assistant.io/blog/2021/01/23/security-disclosure2/

鉴于这些事件。从刚刚发布的 Home Assistant 2021.2.0 beta 开始，我们正在更改两件会影响 custom integrations 的事情。

## 已弃用的 utilities

位于 `homeassistant.utils` 包中的 `sanitize_filename` 和 `sanitize_path` helper 已被弃用，并等待移除。这将在计划于今年 4 月第一周发布的 Home Assistant 2021.4.0 中发生。

我们添加了 `raise_if_invalid_filename` 和 `raise_if_invalid_path` 作为替代品。它们位于同一个 `homeassistant.utils` 包中。这些新函数将抛出 `ValueError`，而不是依赖开发者比较函数输出与输入是否不同。这将防止滥用。

## 版本

第二个变更非常酷！版本！

[`manifest.json` 文件][manifest] 现在增加了对 `version` key 的支持。Version 应该是包含 major、minor 和 patch 版本的字符串。例如，`"1.0.0"`。

这个 version 将帮助用户向你传达他们遇到问题的 version。并且如果你发现 custom integration 中存在安全问题，Home Assistant 将能够阻止使用不安全的版本。

**从 Home Assistant 2021.6 版本开始，`version` key 是必需的**

## Hassfest 已更新

`hassfest` 是我们在 Home Assistant 中用于验证所有 integrations 的内部工具。今年 4 月，我们将其作为一个 GitHub Action 提供，帮助你发现 custom integration 中的问题。该 action 可用于任何托管在 GitHub 上的 custom integration。如果你还没有将它添加到仓库中，现在正是时候！[在此处阅读更多][hassfest]。

如果你正在使用 `hassfest` GitHub action，现在当你缺少 [`manifest.json` 文件][manifest] 中的 `version` key 时，它运行时将开始显示警告。当 `version` key 完全成为 custom integrations 的必需项时，此警告将成为错误。

## 提供文件

使用户能够访问资源是 custom integrations 的常见用例，无论是 images、panels，还是用户可以在 Lovelace 中使用的增强功能。从路径提供静态文件的唯一方式应使用 `hass.http.async_register_static_paths`。请使用此方法，避免使用自己的方法，因为这可能导致严重的 bug 或安全问题。

```python
from pathlib import Path
from homeassisant.components.http import StaticPathConfig

should_cache = False
files_path = Path(__file__).parent / "static"
files2_path = Path(__file__).parent / "static2"

await hass.http.async_register_static_paths([
    StaticPathConfig("/api/my_integration/static", str(files_path), should_cache),
    StaticPathConfig("/api/my_integration/static2", str(files2_path), should_cache)
])
```

关于 custom integrations 的更新就这些。继续做很棒的事情！下次见 👋

[AwesomeVersion]: https://github.com/ludeeus/awesomeversion

[CalVer]: https://calver.org/

[SemVer]: https://semver.org/

[hassfest]: /blog/2020/04/16/hassfest

[manifest]: /docs/creating_integration_manifest
