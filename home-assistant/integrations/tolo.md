> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# TOLO Sauna

The **TOLO Sauna** integration allows to control [Steamtec TOLO](https://www.tolosauna.com/) devices with Home Assistant.

## Prerequisites

To be able to connect to your TOLO system via Home Assistant, you need to have the TOLO App Control Box, which is also required to be able to control your TOLO system using your mobile phone.
Connect the TOLO App Control Box to your network.
For auto detection, your Home Assistant instance needs to be connected to the same network broadcast domain as your TOLO App Control Box (which is usually true for normal home networks).
However, you can also manually define the IP to which the Home Assistant TOLO integration should connect to.
Please use your router to find out the IP address of your TOLO App Control Box.

## Features

**General notice:**
A TOLO system can be equipped with many optional accessoires, such as [lights](#light-control), [fans](#fan-control), [aroma oil injectors](#aroma-therapy), [sole nebulizer](#salt-bath) and [descaling pump](#sweeping-and-descaling).
The TOLO system does not report back which optional accessories are attached. Therefore, the TOLO integration always provides all possible entities even if the features are not available due to missing optional accessories.

### Sauna operating mode

The TOLO integration offers a climate entity to control the general operating mode of your TOLO system.
This can either be _Off_, _Heat_, or _Dry_.

- _Off_: Energy is shut down, the water boiler is empty (or will be emptied soon, see [Sweeping and Descaling](#sweeping-and-descaling)).
- _Heat_: This is the normal operating mode for enjoying your sauna or steam bath.
  If _Power timer_ is set to a value greater than zero, the TOLO system will automatically turn off after the amount of minutes configured in the _Power timer_ setting.
  If _Power timer_ is set to zero, the TOLO system will run indefinitely, until it is turned off manually.
- _Dry_: In this mode, everything is turned off except the fan.
  This mode can be used when shutting down the TOLO system to reduce humidity in the room.
  After the time configured in _Fan timer_ (see [Fan Control](#fan-control)) has passed, the fan and the TOLO system will automatically turn to _Off_.

### Temperature and humidity

The TOLO system allows setting a target temperature between 35°C and 60°C.
The TOLO system will heat and continue to produce steam until the room temperature sensor reaches the configured target temperature.

Target humidity can be set between 60% and 99%.
Once the configured humidity is reached, the steam generator will stop producing steam.
If then the humidity is below 6% (this value is hardcoded by TOLO systems and cannot be changed by the TOLO integration), the TOLO system will start to produce steam again.
This setting is only recognized if the TOLO system is equipped with a humidity sensor (not part of the default configuration).
If no humidity sensor is present, steam production will only depend on the temperature.

### Light control

The TOLO system allows to connect RGB LEDs, which can be controlled by the TOLO integration.
The TOLO system provides two modes for LED operation, _manual_ and _automatic_.

- _Manual_: When turned on, the RGB LEDs will stick to the same color until it is manually changed by pressing the _Next color_ button.
- _Automatic_: When turned on, the RGB LEDs will slowly fade from one color to another.

### Fan control

The TOLO system allows to connect a fan, which can be used to reduce the humidity after the steam generation has been turned off.
Once activated, the fan will automatically turn off between 1 and 60 minutes, depending on the _Fan timer_ setting.

### Aroma therapy

The TOLO system allows to connect an aroma oil injector with slots for either one or two aroma flavors.
When enabled, the aroma pump will work every 5 minutes for 5 seconds each.
Unfortunately, the TOLO system does not allow to change these intervals.
For shorter intervals between pump activations, the TOLO manual suggests to manually disable and enable _Aroma therapy_.

### Salt bath

The TOLO system allows to connect a sole nebulizer, which can be used to inject salt spray in your sauna or steam bath room to allow for a salt bath.
Using the _Salt bath timer_, the salt bath feature can be configured to run indefinitely (set _Salt bath timer_ to 0) or for a pre-defined time between 1 and 60 minutes.

### Sweeping and descaling

The TOLO system has a built-in system for sweeping and descaling.
This feature is currently not supported by the TOLO integration and will be added in an upcoming release.

### Diagnostic information

Beside the controls described above, the TOLO integration provides following diagnostic information:

- _Power timer_:
  The remaining time the TOLO system will produce steam after it has been turned on.
- _Fan timer_:
  The remaining time the fan will be on after it has been turned on.
- _Salt bath timer_:
  The remaining time the salt bath will be active after it has been turned on.
- _Tank temperature_:
  Current temperature of the water in the water tank.
  Should be close to 100°C when in _Heat_ mode.
- _Water level_:
  The current water level in the water tank.
  This should be 0% when off and 100% when in _Heat_ mode.
- _Water in/out valves_:
  Indicates if the TOLO system currently lets water run in or out.
  When starting up, _Water in valve_ should be open while _Water out valve_ should be closed.
  During _Heat_ operation, both valves should be normally closed except short moments where consumed water needs to be refilled.
  When off, the _Water out valve_ should remain open.

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::
