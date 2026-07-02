# 0.9: Rollershutters, 门锁, binary 传感器 and InfluxDB

过去几周里，我们成功打磨出了一个不错的 Home Assistant 新版本带给大家！

<img src='/home-assistant/images/supported_brands/homematic.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' /><img src='/home-assistant/images/supported_brands/ecobee.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' /><img src='/home-assistant/images/supported_brands/influxdb.png' style='clear: right; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='238' />

* New [门锁 component] including [Wink][门锁.wink] support ([@miniconfig])
* New [二元sensor component] including [aRest][binary_sensor.arest] and [MQTT][binary_sensor.MQTT] support ([@fabaff])
* New rollershutter component including MQTT support ([@sfam])
* New [InfluxDB component] to store data in InfluxDB ([@fabaff])
* Thermostat: [Ecobee] now supported ([@nkgilley])
* Thermostat: [Homematic] now supported ([@goir])
* Support for [parsing JSON values] received over MQTT ([@mcdeck])
* Bunch of bug fixes and optimizations

要更新，请运行 `pip3 install --upgrade homeassistant`。

[门锁 component]: /integrations/门锁/

[门锁.wink]: /integrations/wink#门锁

[二元sensor component]: /integrations/binary_sensor/

[binary_sensor.arest]: /integrations/arest#binary-传感器

[binary_sensor.MQTT]: /integrations/binary_sensor.MQTT/

[InfluxDB component]: /integrations/influxdb/

[Ecobee]: /integrations/ecobee/#thermostat

[Homematic]: /integrations/homematic/

[parsing JSON values]: /integrations/MQTT/#processing-json

[@miniconfig]: https://github.com/miniconfig

[@fabaff]: https://github.com/fabaff

[@sfam]: https://github.com/sfam

[@fabaff]: https://github.com/fabaff

[@nkgilley]: https://github.com/nkgilley

[@mcdeck]: https://github.com/mcdeck

[@goir]: https://github.com/goir

<p class='img'>
<img src='/home-assistant/images/screenshots/lock-and-rollershutter-card.png'>
</p>
