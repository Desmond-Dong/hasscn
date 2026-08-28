对于 Home Assistant Core 2022.10，我们修改了 `async_track_unavailable` bluetooth API，使其向回调发送最后一个 `BluetoothServiceInfoBleak`，而不是 `address`。

以下是一个使用示例：

```python
from homeassistant.components import bluetooth

def _unavailable_callback(info: bluetooth.BluetoothServiceInfoBleak) -> None:
    _LOGGER.debug("%s is no longer seen", info.address)

cancel = bluetooth.async_track_unavailable(hass, _unavailable_callback, "44:44:33:11:23:42", connectable=True)
```
