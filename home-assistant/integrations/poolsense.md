# PoolSense

[PoolSense](https://www.proautomation.co/) is a smart pool monitor that publishes data to the cloud via SigFox. PoolSense eliminates the time and effort spent fixing what’s wrong with your pool water. Accurate sensors, in the PoolSense smart pool monitor, send data to a cloud server in timed intervals.

There is currently support for the following information within Home Assistant:

* Chlorine Level
* pH
* Water Temperature
* Battery
* pH Status Indicator
* Chlorine Status Indicator

## Prerequisites

You will need to use the associated standalone app for this device to register a username and password.

* [Google](https://play.google.com/store/apps/details?id=co.proautomation.app.poolSense)
* [Apple](https://apps.apple.com/app/id1288535609)

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Tips

It is recommended that you create your own card with the following sensors:

* `sensor.poolsense_chlorine`
* `sensor.poolsense_ph`
* `sensor.poolsense_battery`
* `sensor.poolsense_temperature`
* `sensor.poolsense_last_seen`

Leave `sensor.poolsense_ph_status` and `sensor.poolsense_chlorine_status` as badges.
