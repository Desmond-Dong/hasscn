> For AI agents: the complete documentation index is available at /llms.txt, the full documentation bundle is available at /llms-full.txt.

# HomematicIP Cloud

The [HomematicIP](https://www.homematic-ip.com/) integration is used as an interface to the cloud server. Since there is no official documentation about this API, everything was done via reverse engineering. Use at your own risk.

There is currently support for the following device types within Home Assistant:

- Alarm
- Binary sensor
- Button
- Climate
- Cover
- Event
- Light
- Lock
- Sensor
- Switch
- Valve
- Weather

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Manual configuration

Generate the authentication token:

`hmip_generate_auth_token.py`

Add the information to your "`configuration.yaml`" file:

```yaml
homematicip_cloud:
  - accesspoint: IDENTIFIER
    authtoken: AUTHTOKEN
  - name: Location2
    accesspoint: IDENTIFIER2
    authtoken: AUTHTOKEN2
```

```yaml
name:
  required: false
  description: Name to identify your access point, this will be used to prefix your device names.
  type: string
accesspoint:
  required: true
  description: This is the access point ID (SGTIN).
  type: string
authtoken:
  required: true
  description: "Authentication token generated with `generate_auth_token.py`."
  type: string
```

## Adding and removing devices and group via native HomematicIP APP

Devices and groups are instantly removed from Home Assistant when removed in the native HomematicIP APP.
Groups are instantly created in Home Assistant when created in the native HomematicIP APP.
Devices are created with a delay of 30 seconds in Home Assistant when created in the native HomematicIP APP.
Within this delay the device registration should be completed in the App, otherwise the device name will be a default one based on the device type. This can easily be fixed in the Home Assistant entity registry afterwards.

## Use HmIP-DLD Door Lock Drive in Home Assistant

If you are unable to control the **HmIP-DLD** device via Home Assistant, you may need to allow the Home Assistant device to control the **HmIP-DLD** in the HomematicIP app.

To do this, navigate to the **Access Control** section in your HomematicIP app and enable the necessary permissions.

Currently, the **HmIP-DLD** can only be used in Home Assistant without a PIN. Ensure that no PIN is set for the device in the HomematicIP app.

## Implemented and tested devices

- homematicip_cloud.alarm_control_panel
  - Combined Alarm Control Panal with INTERNAL and EXTERNAL Security zones (_HmIP-SecurityZone_)

- homematicip_cloud.binary_sensor
  - Access Point Cloud Connection (_HmIP-HAP, HmIP-HAP-B1_)
  - Acceleration Sensor (_HMIP-SAM_)
  - Inclination and vibration Sensor (_HMIP-STV_)
  - Window and door contact (_HmIP-SWDO, HmIP-SWDO-PL, HmIP-SWDO-I, HmIP-SWDM, HmIP-SWDM-B2_)
  - Contact Interface flush-mount – 1x channel (_HmIP-FCI1_)
  - Contact Interface flush-mount – 6x channels (_HmIP-FCI6_)
  - Contact Interface (_HmIP-SCI_)
  - Window Rotary Handle Sensor (_HmIP-SRH_)
  - Smoke sensor and alarm (_HmIP-SWSD_)
  - Motion Detector with Brightness Sensor - indoor (_HmIP-SMI_)
  - Motion Detector with Brightness Sensor - outdoor (_HmIP-SMO_)
  - Presence Sensor – indoor (_HmIP-SPI_)
  - Rain Sensor (_HmIP-SRD_)
  - Water Sensor (_HmIP-SWD_)
  - Remote Control - 8x buttons (_HmIP-RC8_) (battery only)
  - Wall-mount Remote Control - 2x buttons (_HmIP-WRC2_) (battery only)
  - Wall-mount Remote Control - flat - 2x buttons (_HmIP-WRCC2_) (battery only)
  - Wall-mount Remote Control - 6x buttons (_HmIP-WRC6_) (battery only)
  - Key Ring Remote Control - 4x buttons (_HmIP-KRC4_) (battery only)
  - Key Ring Remote Control - alarm  (_HmIP-KRCA_) (battery only)
  - Alarm Siren (_HmIP-ASIR, -B1_) (battery only)
  - Remote Control for brand switches – 2x buttons (_HmIP-BRC2_) (battery only)
  - Pluggable Power Supply Monitoring (_HmIP-PMFS_)
  - Wired Inbound module – 32x channels (_HMIPW-DRI32_)

- homematicip_cloud.button
  - Wall Mounted Garage Door Controller (_HmIP-WGC_)

- homematicip_cloud.climate
  - Climate group (_HmIP-HeatingGroup_)
  - This includes temperature/humidity measures for climate devices of a room delivered by:
    - Wall-mounted thermostat (_HmIP-WTH, HmIP-WTH-2, HmIP-WTH-B, HmIP-WTH-1_)
    - Brand Wall-mounted thermostat (_HmIP-BWTH, HmIP-BWTH-24_)
    - Radiator thermostat (_HmIP-eTRV, HmIP-eTRV-2, HmIP-eTRV-C_) - should also work with (_HmIP-eTRV-2-UK, HmIP-eTRV-2-B, HmIP-eTRV-2-B1_)
    - Temperature and humidity sensor (_HmIP-STH_)
    - Temperature and humidity Sensor with display (_HmIP-STHD_)
    - Alpha IP Wall Thermostat Display (_ALPHA-IP-RBG_)
    - Alpha IP Wall Thermostat Display analog (_ALPHA-IP-RBGa_)
  - There is no need to directly support the following devices by Home Assistant, because their integration is done by the required wall thermostats:
    - Floor Heating Actuator – 6x channels, 230V (_HMIP-FAL230-C6_)
    - Floor Heating Actuator – 10x channels, 230V (_HMIP-FAL230-C10_)
    - Floor Heating Actuator – 6x channels, 24V (_HMIP-FAL24-C6_)
    - Floor Heating Actuator – 10x channels, 24V (_HMIP-FAL24-C10_)
    - Floor Heating Actuator – 12x channels, motorized (_HMIP-FALMOT-C12_)

- homematicip_cloud.cover
  - Shutter actuator for brand-mount (_HmIP-BROLL_)
  - Shutter actuator for flush-mount (_HmIP-FROLL_)
  - Blind Actuator for brand switches (_HmIP-BBL_)
  - Blind Actuator for DIN rail mount – 4x channels (_HMIP-DRBLI4_)
  - Blind Actuator for flush-mount (_HmIP-FBL_)
  - Garage door module for Tormatic (_HmIP-MOD_TM_)
  - Module for Hoermann drives (_HMIP-MOD-HO_)
  - Hunter Douglas & erfal window blinds (_HMIP-HDM1_)

- homematicip_cloud.event
  - Doorbell Event for devices _HmIP-DSD-PCB_ and others where ChannelRole equals DOOR_BELL_INPUT

- homematicip_cloud.light
  - Switch actuator and meter for brand switches (_HmIP-BSM_)
  - Dimming actuator for brand switches (_HmIP-BDT_)
  - Dimming actuator flush-mount (_HmIP-FDT_)
  - Pluggable Dimmer – trailing edge (_HmIP-PDT_)
  - Switch Actuator for brand switches – with signal lamp (_HmIP-BSL_)
  - Wired Dimmer module – 3x channels (_HMIPW-DRD3_)

- homematicip_cloud.lock
  - Door Lock Drive - currently, usage just without a pin is possible (_HmIP-DLD_)

- homematicip_cloud.sensor
  - Access Point Duty Cycle (_HmIP-HAP, HmIP-HAP-B1_)
  - Wall Mounted Thermostat (_HmIP-WTH, HmIP-WTH2, HmIP-WTH-B_)
  - Radiator thermostat (_HmIP-eTRV, HmIP-eTRV-2, HmIP-eTRV-C_) - should also work with (_HmIP-eTRV-2-UK, HmIP-eTRV-2-B, HmIP-eTRV-2-B1_)
  - Temperature and Humidity Sensor without display - indoor (_HmIP-STH_)
  - Temperature and Humidity Sensor with display - indoor (_HmIP-STHD_)
  - Temperature and Humidity sensor - outdoor (_HmIP-STHO, -A_)
  - Temperature sensor with external probes - 2-way (_HmIP-STE2-PCB_)
  - Motion Detector with Brightness Sensor - indoor (_HmIP-SMI_)
  - Motion Detector with Brightness Sensor - outdoor (_HmIP-SMO_)
  - Presence Sensor – indoor (_HmIP-SPI_)
  - Light Sensor - outdoor (_HmIP-SLO_)
  - Passage Sensor with Direction Recognition (_HmIP-SPDR_) (delta counter)
  - Alpha IP Wall Thermostat Display (_ALPHA-IP-RBG_)
  - Alpha IP Wall Thermostat Display analog (_ALPHA-IP-RBGa_)
  - Floor Heating Actuator – 12x channels, motorized - Valve positions (_HmIP-FALMOT-C12_)

- homematicip_cloud.switch
  - Pluggable Switch (_HmIP-PS_)
  - Pluggable Switch and Meter (_HmIP-PSM_) - should also work with (_HmIP-PSM-CH, HmIP-PSM-IT, HmIP-PSM-UK, HmIP-PSM-PE_)
  - Switch Actuator and Meter – flush-mount (_HmIP-FSM, HmIP-FSM16_)
  - Switch Actuator with Push-button Input – flush-mount (_HmIP-FSI16_)
  - Open Collector Module Receiver - 8x channels (_HmIP-MOD-OC8_)
  - Multi IO Box - 2x (_HmIP-MIOB_)
  - Switch Circuit Board - 1x channels (_HmIP-PCBS_)
  - Switch Circuit Board - 2x channels (_HmIP-PCBS2_)
  - Printed Circuit Board Switch Battery (_HmIP-PCBS-BAT_)
  - Switch Actuator for heating systems – 2x channels (_HmIP-WHS2_)
  - Wired Switch Actuator – 8x channels (_HMIPW-DRS8_)
  - Switch Actuator for DIN rail mount – 4x channels (_HMIP-DRSI4_)
  - Switch Actuator for DIN rail mount – 1x channels (_HMIP-DRSI1_)
  - Switch Actuator - 2x channels (_HmIP-BS2_)

- homematicip_cloud.valve
  - Smart Watering Actuator (_ELV-SH-WSM_)

- homematicip_cloud.weather
  - Weather Sensor – basic (_HmIP-SWO-B_)
  - Weather Sensor – plus (_HmIP-SWO-PL_)
  - Weather Sensor – pro (_HmIP-SWO-PR_)

## What to do, if a device is missing in Home Assistant

In order for a device to be integrated into Home Assistant, it must first be implemented in the upstream library. A dump of your configuration is required for this, which is then attached to a new issue in the [upstream lib's](https://github.com/hahn-th/homematicip-rest-api) GitHub repository.

1. Create a dump of your access point configuration in Home Assistant:
   [**Settings** > **Developer tools** > **Actions**](https://my.home-assistant.io/redirect/developer_call_service/) > Select `homematicip_cloud.dump_hap_config` > **Execute**.
   The default dump is anonymized and is written to your configuration directory (`hmip_config_XXXX.json`).
2. Create a [new issue](https://github.com/hahn-th/homematicip-rest-api/issues/new) at this GitHub repository and attach the created dump file.

Please be patient, wait for the implementation and a new release of the upstream library.
Afterward, this device can be implemented into Home Assistant.

## Actions

Executable by all users:

- `homematicip_cloud.activate_eco_mode_with_duration`: Activate eco mode with duration.
- `homematicip_cloud.activate_eco_mode_with_period`: Activate eco mode with period.
- `homematicip_cloud.activate_vacation`: Activates the vacation mode until the given time.
- `homematicip_cloud.deactivate_eco_mode`: Deactivates the eco mode immediately.
- `homematicip_cloud.deactivate_vacation`: Deactivates the vacation mode immediately.
- `homematicip_cloud.set_active_climate_profile`: Set the active climate profile index.
- `homematicip_cloud.set_home_cooling_mode`: Enable or disable cooling for the home.

Executable by administrators or within the context of an automation:

- `homematicip_cloud.dump_hap_config`: Dump the configuration of the Homematic IP Access Point(s).
- `homematicip_cloud.reset_energy_counter`: Reset energy counter of measuring actuators.

### Action examples

`accesspoint_id` (SGTIN) is optional for all actions and only relevant if you have multiple Homematic IP Accesspoints connected to HA. If empty, the action will be performed for all configured Homematic IP Access Points.
The `accesspoint_id` (SGTIN) can be found on top of the integration page, or on the back of your Homematic IP Accesspoint.

Activate eco mode with duration.

```yaml
...
actions:
  - action: homematicip_cloud.activate_eco_mode_with_duration
    data:
      duration: 60
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Activate eco mode with period.

```yaml
...
actions:
  - action: homematicip_cloud.activate_eco_mode_with_period
    data:
      endtime: 2019-09-17 18:00
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Activates the vacation mode until the given time.

```yaml
...
actions:
  - action: homematicip_cloud.activate_vacation
    data:
      endtime: 2019-09-17 18:00
      temperature: 18.5
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Deactivates the eco mode immediately.

```yaml
...
actions:
  - action: homematicip_cloud.deactivate_eco_mode
    data:
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Deactivates the vacation mode immediately.

```yaml
...
actions:
  - action: homematicip_cloud.deactivate_vacation
    data:
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

Set the active climate profile index.

The index of the climate profile is 1-based.
You can get the required index from the native Homematic IP App.

```yaml
...
actions:
  - action: homematicip_cloud.set_active_climate_profile
    target:
      entity_id: climate.livingroom
    data:
      climate_profile_index: 1
```

Dump the configuration of the Homematic IP Access Point(s).

```yaml
...
actions:
  - action: homematicip_cloud.dump_hap_config
    data:
      anonymize: True
```

Reset energy counter of measuring actuators.

```yaml
...
actions:
  - action: homematicip_cloud.reset_energy_counter
    target:
      entity_id: switch.livingroom
```

Enable (or disable) Cooling mode for the entire home. Disabling Cooling mode will revert to Heating.

```yaml
...
actions:
  - action: homematicip_cloud.set_home_cooling_mode
    data:
      cooling: True
      accesspoint_id: 3014xxxxxxxxxxxxxxxxxxxx
```

## Additional info

Push button devices are only available with a battery sensor. This is due to a limitation of the vendor API (eq3).
It's not possible to detect a key press event on these devices at the moment.

- Remote Control - 8x buttons (_HmIP-RC8_)
- Wall-mount Remote Control for brand switches - 2x buttons (_HmIP-BRC2_)
- Motion Detector for 55mm frames - indoor (HmIP-SMI55)(Push button)
- Wall-mount Remote Control - 2x buttons (_HmIP-WRC2_)
- Wall-mount Remote Control - flat - 2x buttons (_HmIP-WRCC2_)
- Wall-mount Remote Control - 6x buttons (_HmIP-WRC6_)
- Key Ring Remote Control - 4x buttons (_HmIP-KRC4_)
- Key Ring Remote Control - alarm  (_HmIP-KRCA_)
- Wall-mount Remote Control – flat (_HmIP-WRCC2_)
- Rotary Button (_HmIP-WRCR_)
