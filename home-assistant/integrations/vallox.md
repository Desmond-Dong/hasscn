# Vallox

**Vallox** 集成允许您控制所有受 [vallox\_websocket\_api](https://github.com/yozik04/vallox_websocket_api) 支持的 Vallox 新风设备（支持的机型请参阅链接中的列表）。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 平台

### 风扇

此集成的风扇平台允许您控制整台设备。您可以通过切换开关打开或关闭设备、调整风扇速度，以及选择通风模式。

### 传感器

传感器平台允许您监控多种指标，例如风扇转速、空气温度、湿度、滤网剩余寿命、核心状态等。

### 二进制传感器

二进制传感器平台允许您监控后置加热器的状态。

### 开关

开关平台允许您锁定热回收旁通功能。

### 数值

数值平台允许您控制送风温度。

### 日期

日期平台允许您设置滤网更换日期。

## 模式切换

为了便于在图形界面中切换通风模式，只需选择 `Vallox` 风扇实体，即可看到可供选择的下拉菜单。或者，您也可以使用 `fan/set_preset_mode` 操作。

支持以下四种标准 Vallox 模式：

* `Home`
* `Away`
* `Boost`
* `Fireplace`

## 风扇操作

### 操作：设置 Home 模式风速

`vallox.set_profile_fan_speed_home` 操作用于设置 `Home` 模式的风速。

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### 操作：设置 Away 模式风速

`vallox.set_profile_fan_speed_away` 操作用于设置 `Away` 模式的风速。

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### 操作：设置 Boost 模式风速

`vallox.set_profile_fan_speed_boost` 操作用于设置 `Boost` 模式的风速。

| Data attribute | Optional | Description                                     |
|------------------------|----------|-------------------------------------------------|
| `fan_speed`            |       no | Fan speed in %. `Integer`, between 0 and 100.   |

### 操作：设置模式

`vallox.set_profile` 操作用于设置模式，并可选择设置该模式保持激活的时长。

| Data attribute | Optional | Description                                                                                                                                                                           |
|----------------|---------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `profile`      |       no | Profile to set, one of `home`, `away`, `boost`, `fireplace`, or `extra`.                                                                                                              |
| `duration`     |      yes | Duration to activate the profile for; in minutes. `Integer` between 1 and 65535. Only applies to  `boost`, `fireplace` or `extra` profiles. 65535 sets the profile without a timeout. |
