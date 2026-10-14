# Mill

Integrates Mill heater into Home Assistant.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

You can configure it for cloud access or local access.
Local access requires Generation 3 heaters (Sold from Autumn 2021).
A number entity can configure the maximum power of the heaters.

## Actions

### Action: Set room temperature

The `mill.set_room_temperature` action sets the temperature for the room connected to heater in the Mill app.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room_name` | no | String with room name.
| `away_temp` | yes | Integer with temperature
| `comfort_temp` | yes | Integer with temperature
| `sleep_temp` | yes | Integer with temperature
