# Tesla Powerwall

**Tesla Powerwall** 集成允许您将 [Tesla Powerwall](https://www.tesla.com/powerwall) 接入 Home Assistant。

## 支持的设备

已知此集成支持以下设备：

* Tesla Powerwall 2

## 不支持的设备

此集成不支持以下设备：

* Tesla Powerwall 1
* Tesla Powerwall 3

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 支持的功能

当前在 Home Assistant 中支持以下设备类型：

* [Binary sensor](#binary-sensor)
* [Sensor](#sensor)
* [Switch](#switch)

### 二进制传感器

每个 Backup Gateway 会添加以下二进制传感器：

* Grid Services - On/ Off
* Grid Status - On/ Off
* Powerwall Charging - Charging/ Not Charging
* Powerwall Connected to Tesla - Connected / Not Connected
* Powerwall Status - On/ Off

### 传感器

针对每个 Backup Gateway，会添加以下汇总所有 Powerwall 数据的传感器：

* Powerwall Backup Reserve - Reserve energy for grid outages in %
* Powerwall Battery Now - Power in kW (negative for charging)
* Powerwall Charge - Percent charge remaining in %
* Powerwall Generator Now - Power in kW (if applicable)
* Powerwall Load Now - Power in kW
* Powerwall Solar Now - Power in kW (if applicable)
* Powerwall Site Now - Power in kW (negative for grid export)
* Powerwall Backup Reserve - Percentage of battery which will be reserved for a grid outage
* Frequency/ Average Current/ Average Voltage Now - in Hertz, Amps and Volts

以下传感器用于统计累计能量流：

* Powerwall Solar Export - Solar energy exported in kWh
* Powerwall Solar Import - Solar energy imported in kWh (generally near zero)
* Powerwall Site Export - Site energy exported in kWh
* Powerwall Site Import - Site energy imported in kWh
* Powerwall Battery Export - Battery energy exported in kWh
* Powerwall Battery Import - Battery energy imported in kWh
* Powerwall Load Export - Load energy exported in kWh (generally zero)
* Powerwall Load Import - Load energy imported in kWh
* Powerwall Generator Export - Generator energy exported in kWh
* Powerwall Generator Import - Generator energy imported in kWh

对于连接到 Powerwall Gateway 的每块电池，都会创建一个 Powerwall battery 设备，并包含以下传感器：

* Powerwall Battery Capacity - Energy in kWh
* Powerwall Battery Remaining - Remaining energy in kWh
* Frequency/ Average Current/ Average Voltage Now in Hertz, Amps and Volts
* Powerwall Battery Power - Battery power in kW (negative for charging)
* Powerwall Battery Export - Battery energy exported in kWh
* Powerwall Battery Import - Battery energy imported in kWh
* Powerwall Grid State - Battery grid compliance

### 开关

Powerwall Backup Gateway 会添加以下开关：

* Off-Grid operation - Take your Powerwall off-grid (simulate a grid outage)

### 设备信息

* Model Number
* Firmware Revision
