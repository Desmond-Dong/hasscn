`DataUpdateCoordinator` 现在可以在 API 数据可比较时减少不必要的更新。

使用 `DataUpdateCoordinator` 时，轮询的数据通常预期大部分时间保持不变。例如，如果你轮询一个每周仅开启一次的灯，该数据几乎在所有时间都是相同的。默认行为是在数据更新时始终回调监听器，即使数据并未改变。如果 API 返回的数据可以通过 Python 的 `__eq__` 方法进行比较，则在创建 `DataUpdateCoordinator` 时设置 `always_update=False`，以避免不必要的回调和对 state machine 的写入。
