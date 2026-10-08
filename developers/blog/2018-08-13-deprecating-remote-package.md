随着 Home Assistant 0.76 的发布，`homeassistant.remote` 包中的函数将被弃用，并将在 0.77 中移除。该包包含以非 async 方式调用 Home Assistant REST API 的函数。

移除的原因有两点：首先，这些代码在 Home Assistant 内部并未使用，因此不应属于 Home Assistant。其次，它与新的 auth 系统不兼容，我们也不想花费时间去使其兼容。

如果你想继续使用 `homeassistant.remote` 中的方法，欢迎将[这些代码](https://github.com/home-assistant/core/blob/0.75.0/homeassistant/remote.py)复制到你自己的项目中。
