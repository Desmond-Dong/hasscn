# Sensibo

**Sensibo** 集成可将 [Sensibo](https://sensibo.com) 设备接入 Home Assistant。

## 前提条件

请访问[此处](https://home.sensibo.com/me/api)并注册以获取 API 密钥。

:::tip 提示
如果你使用专用用户（而不是主用户）创建 API 密钥，
那么在 Sensibo 应用日志中，你就能区分哪些操作来自应用本身，哪些操作来自 Home Assistant。

:::

## 支持的设备

**Sensibo** 集成支持以下设备和配件。

* **Sensibo Sky**: Smart AC control device.
* **Sensibo Air**: Smart AC control device.
* **Sensibo Air Pro**: Smart AC control device with air quality monitoring.
* **Sensibo Pure**: Smart air purifier.
* **Sensibo Elements**: Smart air quality monitoring.
* **Sensibo Room Sensor**: Motion sensor and temperature readings (needs to be connected with an Air device).

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API key:
  description: The previously created API key.
```

## 支持的功能

:::note 注意
部分实体默认处于禁用状态，因此你需要先[启用它们](/home-assistant/common-tasks/general/index.md#to-enable-or-disable-a-single-entity)才能使用。

根据设备支持情况，某些实体可能不会出现，因为对应设备并不支持这些功能。

:::

### Sensibo Sky、Air、Air Pro、Pure、Elements 和 Room Sensor

#### 数值实体

* **Temperature calibration**: Calibrate the temperature reading of the device.
* **Humidity calibration**: Calibrate the humidity reading of the device.

#### 更新实体

* **Firmware**: Firmware update available.

### Sensibo Sky、Air、Air Pro、Pure 和 Elements

#### 二进制传感器

* **Filter clean required**: Does the A/C's filter need cleaning.

#### 按钮

* **Reset filter**: Reset the filter timer after cleaning.

#### 气候实体

* **\[Name of device]**: The main climate entity for the device to control <abbr title="Heating, ventilation, and air conditioning">HVAC</abbr> mode.

#### 选择实体

* **Light**: Turn the light on/off or dim for the device.

#### 传感器

* **Filter last reset**: Last reset of the filter cleaning.

### Sensibo Sky、Air 和 Air Pro

#### 传感器

* **Feels like**: Feels like temperature.
* **Timer end time**: End time of timer.
* **Climate React type**: Climate React type: Temperature, Feels like, or Humidity.
* **Climate React low temperature threshold**: Low temperature threshold setting for Climate react.
* **Climate React high temperature threshold**: High temperature threshold setting for Climate react.

#### 开关

* **Timer**: Timer on/off. Enabling the timer, sets it to 10 minutes.
* **Climate React**: Enable/Disable Climate React.

### Sensibo Air、Air Pro 和 Elements

#### 传感器

* **TVOC**: TVOC reading from device.
* **Co2**: Co2 reading from device.

### Sensibo Elements

#### 传感器

* **PM2.5**: PM2.5 reading from device.
* **Ethanol**: Ethanol reading from device.
* **Air quality**: Air quality based on readings from device.

### Sensibo Pure

#### 二进制传感器

* **Pure Boost linked with AC**: Is Pure Boost linked with an A/C device.
* **Pure Boost linked with presence**: Is Pure Boost linked to presence.
* **Pure Boost linked with indoor air quality**: Is Pure Boost linked with indoor air quality.
* **Pure Boost linked with outdoor air quality**: Is Pure Boost linked with outdoor air quality.

#### 传感器

* **Pure AQI**: PM2.5 level indicated as 'Good', 'Moderate', and 'Bad'.
* **Pure Boost Sensitivity**: Sensitivity for Pure Boost.

#### 开关

* **Pure Boost**: Enable/Disable Pure Boost.

### Sensibo Room Sensor

#### 二进制传感器

* **Motion**: Is there motion
* **Connectivity**: Is the motion sensor alive and connected
* **Main sensor**: Is the connected motion sensor the main sensor for the connected Air device.
* **Room occupied**: Is there presence in the room of the connected Air device.

## 操作

### 获取设备模式能力

As the below custom actions [Full state](#set-full-state) and [Climate react](#enable-climate-react) both require their inputs to match the API requirements precisely, this custom action will provide the capabilities for the device for a certain HVAC mode to help the users on using those actions properly.

**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
HVAC mode:
  description: Select the HVAC mode for which you want to get the capabilities.
```

**Proposed action use:**

1. Go to [**Settings** > **Developer Tools** > **YAML**](https://my.home-assistant.io/redirect/server_controls/).
2. Switch to the **Actions** page.
3. Use the `sensibo.get_device_capabilities` action.
4. Select the `climate` entity as the target.
5. Select the `hvac_mode` from the available list.
6. Select **Perform action** to retrieve the available options.
7. Copy the case-sensitive options as needed to other action calls, automations or scripts.

### 设置完整状态

You can send a full state command to **Sensibo** instead of single commands using the `sensibo.full_state` action.

:::note
All fields are required to be according to Sensibo API specifications and are case-sensitive.

Only provide the fields which are supported by the device.

:::
**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
HVAC mode:
  description: Select the HVAC mode for which you want to get the capabilities.
Target temperature:
  description: Provide a target temperature if applicable.
Fan mode:
  description: Provide a fan mode if applicable.
Swing mode:
  description: Provide a swing mode if applicable.
Horizontal swing mode:
  description: Provide a horizontal swing mode if applicable.
Light:
  description: Provide a setting for the light if applicable.
```

:::tip
Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

:::

### 假定状态

An HVAC device often has a manual remote or other means of control which can put **Sensibo** out of sync with the HVAC device.

Use the `sensibo.assume_state` action to tell **Sensibo** if the HVAC device is currently on or off without sending a control to the actual device.

**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
State:
  description: Select if the HVAC device is on or off.
```

### 启用 Pure Boost

You can configure your Pure Boost settings using the `sensibo.enable_pure_boost` action.

:::note
AC integration and Geo integration needs to be pre-configured via the app before first use.

:::
**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
AC integration:
  description: Integrate with a HVAC device.
Geo integration:
  description: Integrate with presence.
Indoor air quality:
  description: Integrate with indoor air quality.
Outdoor air quality:
  description: Integrate with outdoor air quality.
Sensitivity:
  description: Set the sensitivity to `Normal` or `Sensitive`.
```

### 启用定时器

You can enable a timer to turn the HVAC device on or off for a certain time, using the `sensibo.enable_timer` action that is provided.

**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
Minutes:
  description: Number of minutes to turn the device on or off.
  mandatory: true
```

### 启用 Climate React

You can configure your Climate React settings using the `sensibo.enable_climate_react` action.

:::note
Configuring this action also turns Climate React on.

When using the action, the state needs to be set to precisely what Sensibo API expects. The first time, it's recommended to use the app to configure it.

:::
**Action configuration:**

```yaml
Target:
  description: Select the Sensibo climate entity.
Threshold high:
  description: When the trigger goes above this value.
State high threshold:
  description: The full state to configure above the high threshold.
Threshold low:
  description: When the trigger goes below this value.
State low threshold:
  description: The full state to configure below the low threshold.
Trigger type:
  description: The trigger type (`temperature`, `feelsLike`, or `humidity`).
```

:::tip
Use the [Get device mode capabilities](#get-device-mode-capabilities) action to provide a list of capabilities.

:::
**Example full state:**

```yaml
on: true
fanLevel: "high"
temperatureUnit: "C"
targetTemperature: 23
mode: "cool"
swing: "fixedBottom"
horizontalSwing: "fixedLeft"
light: "on"
```

## 示例

### 用模板开关控制 HVAC 设备开关

A simple switch which has `heat` or `off` as mode.

```yaml
switch:
  - platform: template
    switches:
      ac:
        friendly_name: "AC"
        value_template: "{{ is_state('climate.ac', 'heat') }}"
        turn_on:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "heat"
        turn_off:
          action: climate.set_hvac_mode
          target:
            entity_id: climate.ac
          data:
            hvac_mode: "off"
```

### 到家时启动 30 分钟定时器

```yaml
automation:
  alias: "Example timer"
  triggers:
    - trigger: zone
      entity_id: person.me
      zone: zone.home
      event: enter
  actions:
    - action: sensibo.enable_timer
      data:
        minutes: 30
      target:
        entity_id: climate.hvac_device
```

### 在晚上 6 点设置 HVAC 设备完整状态

```yaml
automation:
  alias: "Example full state"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: sensibo.full_state
      data:
        mode: "heat"
        target_temperature: 23
        fan_mode: "medium"
        swing_mode: "fixedMiddleTop"
        horizontal_swing_mode: "fixedCenter"
        light: "off"
      target:
        entity_id: climate.hvac_device
```

## 数据获取与限制

Data is polled from the **Sensibo** API once every minute for all devices.

If polling cannot happen because of no connectivity or a malfunctioning API, it will retry a few times before failing.
The user can use the [`homeassistant.update_entity`](/home-assistant/integrations/homeassistant.md#action-homeassistantupdate_entity) action to manually try again later, in the case the user has solved the connectivity issue.

## 故障排除

This service is reliant on an internet connection and that the **Sensibo** API is available. Here are the things you can try before raising an issue:

* Check that internet is available in your Home Assistant instance.
* Check that the **Sensibo** API is available by accessing the [Sensibo API page](https://home.sensibo.com/api/v1/users/me). If you have previously logged in to Sensibo web, you will get a JSON back with the provided information about your account. If not logged in, the API will respond with `login_required`.
* Use `curl` in a terminal on your Home Assistant instance using the same URL as previously opened in the browser. `curl https://home.sensibo.com/api/v1/users/me`

### 特定日志条目

**Log entry:** `Device [name of device] not correctly registered with remote on Sensibo cloud.`

When setting up a device the first time, a `remote` needs to be defined for the device in the **Sensibo** app, either automatically or manually.
The device will appear in Home Assistant, but won't be usable as no HVAC modes can be selected.

## 删除集成

### 从 Home Assistant 中删除集成实例

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
