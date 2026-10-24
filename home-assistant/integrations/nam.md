# Nettigo Air Monitor

The **Nettigo Air Monitor** integration allows you to read temperature, humidity, pressure and air quality data from Nettigo Air Monitor devices. [Nettigo Air Monitor](https://air.nettigo.pl/?setlang=en) is a DIY air quality monitoring system with open source firmware, based on an open hardware project.

:::note
The integration supports devices running Nettigo Air Monitor and [Sensor.Community firmware](https://github.com/opendata-stuttgart/sensors-software).

:::
该集成目前支持以下传感器：

* BH1750
* BME280
* BMP180
* BMP280
* DHT22
* DS18B20
* 赫卡
* MH-Z14A
* PMSx003
* SDS011
* SHT3X
* SPS30

## Configuration

To add the **Nettigo Air Monitor** device to your Home Assistant instance, use this My button:

[![Open Add integration in your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=nam)

Nettigo Air Monitor can be auto-discovered by Home Assistant. If an instance is found, it will be shown as **Discovered** and can be set up right away.

<details>
<summary>Manual configuration steps</summary>

* Browse to your Home Assistant instance.
* Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
* In the lower-right corner, select [**Add integration**](https://my.home-assistant.io/redirect/config_flow_start/?domain=nam).
* From the list, select **Nettigo Air Monitor**.
* Follow the instructions on screen to complete the setup.

</details>
