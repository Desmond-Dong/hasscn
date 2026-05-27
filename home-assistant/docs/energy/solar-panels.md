# 集成您的太阳能电池板

通过将太阳能电池板集成到 Home Assistant 来深入了解您的能源生产情况。

如果您还设置了[太阳能预测集成](/home-assistant/integrations/forecast_solar.md)，您将能够查看预期的太阳能发电量，并根据计划发电量进行自动化控制。

<img src='/home-assistant/images/docs/energy/solar.png' alt='显示能源从太阳能电池板流向 Home Assistant 并回馈到电网的图示。' style='border: 0;box-shadow: none; display: block; max-height: 400px; margin: 0 auto;'>

## 硬件

Home Assistant 需要知道正在产生的能源量。这可以通过多种方式实现。

### 使用 CT 钳式传感器

电流互感器 (CT) 钳式传感器通过检测电线中通过的电流来测量您的能源使用情况。这使得计算能源使用量成为可能。在 Home Assistant 中，我们支持现成的 CT 钳式传感器，您也可以自己制作。

* 我们推荐的现成解决方案是 [Shelly EM](https://www.shelly.com/products/shelly-em-50a-clamp-1?tracking=A7FsiPIfUWsFpnfKHa8SRyUYLXjr2hPq)。该设备具有本地 API，更新会推送到 Home Assistant，并且拥有高质量的[集成](/home-assistant/integrations/shelly/index.md)。
* 您可以使用 ESPHome 的 [CT 钳式电流传感器](https://esphome.io/components/sensor/ct_clamp/)或像 [ATM90E32](https://esphome.io/components/sensor/atm90e32/) 这样的电能表传感器自己制作。对于 DIY 方案，请查看 [digiblur 的这个视频](https://www.youtube.com/watch?v=n2XZzciz0s4)作为入门指南。
* 使用树莓派时，您可以使用 LeChacal 提供的 CT 钳式扩展板，称为 [RPICT hats](https://lechacal.com/docs/RPICT/Raspberrypi_Current_and_Temperature_Sensor_Adaptor/)。它们可以堆叠以扩展监控的线路数量。它们还提供单相和三相安装的有功功率、视在功率、无功功率和功率因数。它们通过 MQTT 与 Home Assistant 集成。

*注意！安装 CT 钳式传感器设备需要打开您的配电箱。这项工作应由熟悉电气布线的人员完成，在某些地区可能需要持证专业人员。您的合格安装人员会知道如何操作。*

*免责声明：本节中的某些链接是联盟链接。*

### 连接到您的逆变器

某些太阳能逆变器具有可被 Home Assistant 读取的 API。

[能源集成](/home-assistant/integrations/index.md#energy)
