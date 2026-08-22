---
author: J. Nick Koston
authorURL: https://github.com/bdraco
title: 通过 `async_register_static_paths` 使 http path 注册变为 async 安全
---

`hass.http.register_static_path` 已被弃用，因为它在 event loop 中执行阻塞 I/O，请改用 `await hass.http.async_register_static_paths([StaticPathConfig(url_path, path, cache_headers)])`。

`async_register_static_paths` 的参数与 `register_static_path` 相同，只是它们被包装在 `StaticPathConfig` `dataclass` 中，并接受它们的 `Iterable` 以便一次性注册多个 path，从而避免多个 executor job。

例如，如果您的集成调用了 `hass.http.register_static_path("/integrations/photos", "/config/photos", True)`，现在应改为调用 `await hass.http.async_register_static_paths([StaticPathConfig("/integrations/photos", "/config/photos", True)])`。

`StaticPathConfig` `dataclass` 应从 `homeassistant.components.http` 导入。

`hass.http.register_static_path` 将在 2025.7 中移除。

## 示例

```python
from pathlib import Path
from homeassistant.components.http import StaticPathConfig

should_cache = False
files_path = Path(__file__).parent / "static"
files2_path = Path(__file__).parent / "static2"

await hass.http.async_register_static_paths([
    StaticPathConfig("/api/my_integration/static", str(files_path), should_cache),
    StaticPathConfig("/api/my_integration/static2", str(files2_path), should_cache)
])
```
