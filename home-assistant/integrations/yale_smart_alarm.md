# Yale Smart Living

The **Yale Smart Living** integration provides connectivity with the Yale Smart Alarm systems and Smart Hub through Yale's API.

There is currently support for the following device types within Home Assistant:

* Alarm
* Binary sensor
* Button
* Lock
* Select
* Sensor
* Switch

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## Alarm control panel

Actions provided are `armed_away`, `armed_home`, and `disarmed`.

No code is required to operate the alarm.

## Binary sensors

Provides support for contact sensors for doors/windows

* Door/window is open or closed.
* Battery is low on contact sensor

## Button

Provides support for pressing the panic button to trigger the alarm. Be careful as another press does not reset/turn off panic mode.

## Lock

The lock platform requires a code for unlocking but no code for locking.

## Select

Provides support for setting the volume on locks, available options are "High", "Low" and "Off". The entity is only available for supported door locks.

## Sensor

Provides support for smoke detector temperature sensors.

## Switch

Provides support for enable/disable autolock on locks. Entity is only available for supported door locks.

The integration can be configured to provide a default code that is used if no code is supplied and the number of digits required.
