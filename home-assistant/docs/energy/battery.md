# 集成您的家用电池

家用电池可以让家庭在太阳能发电量超过用电量时储存能量，或者在电价较低时从电网储存能量。

Home Assistant 允许您跟踪电池的充电和放电能量流。

## 硬件

Home Assistant 需要知道电池的充电和放电能量。这些数据可以通过多种方式跟踪。

### 由电池提供

一些电池供应商提供 API 将数据集成到您的 Home Assistant 实例中。例如 [Tesla Powerwall](/home-assistant/integrations/powerwall/index.md)。

### 使用 CT 钳式传感器

电流互感器 (CT) 钳式传感器通过检测通过电线的电流来测量您的能源使用情况。这使得计算能源使用量成为可能。在 Home Assistant 中，我们支持现成的 CT 钳式传感器，或者您也可以自己制作。

* 我们推荐的现成解决方案是 [Shelly EM](https://www.shelly.com/products/shelly-em-50a-clamp-1?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq)。该设备具有本地 API，更新会推送到 Home Assistant，并且有高质量的[集成](/home-assistant/integrations/shelly/index.md)。
* 您可以使用 ESPHome 的 [CT 钳式电流传感器](https://esphome.io/components/sensor/ct_clamp/)或像 [ATM90E32](https://esphome.io/components/sensor/atm90e32/) 这样的电能表传感器自己制作。对于 DIY 方案，请查看 [digiblur 的这个视频](https://www.youtube.com/watch?v=n2XZzciz0s4)入门。
* 使用树莓派，您可以使用来自 LeChacal 的 CT 钳式 HAT，称为 [RPICT hats](https://lechacal.com/docs/RPICT/Raspberrypi_Current_and_Temperature_Sensor_Adaptor/)。它们可以堆叠以扩展监测的线路数量。它们还为单相和三相安装提供有功功率、视在功率、无功功率和功率因数。它们通过 MQTT 与 Home Assistant 集成。

*注意！安装 CT 钳式传感器设备需要打开您的配电箱。这项工作应由熟悉电气布线的人员完成，在某些地区可能需要持证专业人士。您的合格安装人员会知道如何完成此工作。*

*免责声明：本节中的某些链接是联盟链接。*
