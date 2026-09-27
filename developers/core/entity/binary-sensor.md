Binary sensor 是一种只能有两个 states 的 sensor。从 [`homeassistant.components.binary_sensor.BinarySensorEntity`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/binary_sensor/__init__.py) 派生 entity platforms。

## 属性

:::tip
Properties 应该只从内存中返回信息，不要执行 I/O（如网络请求）。实现 `update()` 或 `async_update()` 来获取数据。
:::

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| is\_on| `bool \| None` | `None` | **必需**。Binary sensor 当前是 on 还是 off。
| device\_class | `BinarySensorDeviceClass \| None` | `None` | Binary sensor 的类型。

### 可用的设备类型

| Constant | Description
| ----- | -----------
| `BinarySensorDeviceClass.BATTERY` | On 表示电量低，Off 表示正常。
| `BinarySensorDeviceClass.BATTERY_CHARGING` | On 表示正在充电，Off 表示未充电。
| `BinarySensorDeviceClass.CO` | On 表示检测到一氧化碳，Off 表示无一氧化碳（正常）。
| `BinarySensorDeviceClass.COLD` | On 表示温度低，Off 表示正常。
| `BinarySensorDeviceClass.CONNECTIVITY` | On 表示已连接，Off 表示已断开连接。
| `BinarySensorDeviceClass.DOOR` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.GARAGE_DOOR` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.GAS` | On 表示检测到燃气，Off 表示无燃气（正常）。
| `BinarySensorDeviceClass.HEAT` | On 表示温度高，Off 表示正常。
| `BinarySensorDeviceClass.LIGHT` | On 表示检测到光线，Off 表示无光线。
| `BinarySensorDeviceClass.LOCK` | On 表示打开（未锁定），Off 表示关闭（已锁定）。
| `BinarySensorDeviceClass.MOISTURE` | On 表示湿润，Off 表示干燥。
| `BinarySensorDeviceClass.MOTION` | On 表示检测到移动，Off 表示无移动（正常）。
| `BinarySensorDeviceClass.MOVING` | On 表示正在移动，Off 表示未移动（已停止）。
| `BinarySensorDeviceClass.OCCUPANCY` | On 表示有人，Off 表示无人（正常）。
| `BinarySensorDeviceClass.OPENING` | On 表示打开，Off 表示关闭。
| `BinarySensorDeviceClass.PLUG` | On 表示已插上，Off 表示未插上。
| `BinarySensorDeviceClass.POWER` | On 表示检测到电流，Off 表示无电流。
| `BinarySensorDeviceClass.PRESENCE` | On 表示在家，Off 表示外出。
| `BinarySensorDeviceClass.PROBLEM` | On 表示检测到问题，Off 表示无问题（正常）。
| `BinarySensorDeviceClass.RUNNING` | On 表示正在运行，Off 表示未运行。
| `BinarySensorDeviceClass.SAFETY` | On 表示不安全，Off 表示安全。
| `BinarySensorDeviceClass.SMOKE` | On 表示检测到烟雾，Off 表示无烟雾（正常）。
| `BinarySensorDeviceClass.SOUND` | On 表示检测到声音，Off 表示无声音（正常）。
| `BinarySensorDeviceClass.TAMPER` | On 表示检测到拆改，Off 表示无拆改（正常）。
| `BinarySensorDeviceClass.UPDATE` | On 表示有 update 可用，Off 表示已是最新。应避免使用此 device class，请考虑改用 [`update`](/developers/core/entity/update.md) entity。
| `BinarySensorDeviceClass.VIBRATION` | On 表示检测到振动，Off 表示无振动。
| `BinarySensorDeviceClass.WINDOW` | On 表示打开，Off 表示关闭。
