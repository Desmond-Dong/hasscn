从 Home Assistant Core 2022.8 开始，Store（来自 `homeassistant/helpers/storage.py`）被定义为 Generic `Store(Generic[_T])`。建议在 Store 定义中指定要存储的数据类型。它应该是 JSON 可序列化的（dict 或 list），例如：

* 使用 dict 的标准定义：`self._store = Store[dict[str, int]](hass, STORAGE_VERSION, STORAGE_KEY)`
* 使用 TypedDict：`self._store = Store[EnergyPreferences](hass, STORAGE_VERSION, STORAGE_KEY)`
* 访问现有 Store：`store: Store[dict[str, Any]] = hass.data[DOMAIN][DATA_STORE]`
* 继承 Store：`class MyCustomStorage(Store[list[int]]):`

有关 generics 的更多信息，请参阅 [PEP 483](https://peps.python.org/pep-0483/#generic-types)。
