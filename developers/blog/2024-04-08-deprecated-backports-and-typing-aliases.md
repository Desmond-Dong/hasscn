在过去，我们从上游 CPython backport 了一些功能，以便提前使用并改善用户和开发者的体验。Home Assistant 仅支持 Python 3.12，因此这些功能可以直接从 Python 中使用。这些 backports 现在已被弃用，并将于未来移除。

| Deprecated | Replacement | Python version |
| ---------- | ----------- | -------------- |
| `homeassistant.backports.enum.StrEnum` | `enum.StrEnum` | >= 3.11 |
| `homeassistant.backports.functools.cached_property` | `functools.cached_property` | >= 3.8, >= 3.12 (performance improvement) |

此外，一些 typing alias 现在也被弃用了。

| Deprecated | Replacement |
| ---------- | ----------- |
| `homeassistant.helpers.typing.ContextType` | `homeassistant.core.Context` |
| `homeassistant.helpers.typing.EventType` | `homeassistant.core.Event` |
| `homeassistant.helpers.typing.HomeAssistantType` | `homeassistant.core.HomeAssistant` |
| `homeassistant.helpers.typing.ServiceCallType` | `homeassistant.core.ServiceCall` |
