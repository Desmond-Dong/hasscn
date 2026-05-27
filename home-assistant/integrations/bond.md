# Bond

**Bond** 集成允许您通过 [Bond Bridge](https://bondhome.io/) 控制设备。复制您的 RF 遥控器。

支持的设备（请参阅下面的要求部分）：

* 吊扇
* 遮阳帘
* 壁炉

## 已测试的 Bond 设备

以下设备已通过 Home Assistant 测试并确认正常工作：

* Bond Bridge v1 (snowbird)
* Bond Bridge v2 (zermatt)
* Bond Bridge Pro (zermatt-pro)
* Smart By Bond Fans (breck)

## 前提条件

要在您的安装中使用 Bond 控制的设备，请从集成页面添加您的 Bond 集线器主机和访问令牌。有关如何获取访问令牌的说明可以在 [Bond Local API](http://docs-local.appbond.com/#section/Getting-Started/Get-Device-Information) 文档中找到，其中包括如何获取[设备 IP 地址](http://docs-local.appbond.com/#section/Getting-Started/Finding-the-Bond-IP)的部分，您需要获取访问令牌。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 要求

此集成支持固件版本 v2.10.x 及以上的 Bond 集线器。
固件版本 v2.9.x 及以下的 Bond 集线器将**无法**正常工作。请先从 Bond 应用升级固件，然后再添加此集成。

## BPUP 支持（推送更新）

推送更新需要固件版本 2.10.8 或更新版本。集成将对低于 .8 的 2.10.x 版本回退到轮询。

### 动作 `bond.set_fan_speed_tracked_state`

设置 Bond 风扇的跟踪风扇速度。
调用此动作将更改风扇的跟踪速度，但不会传输任何信号使设备更改速度。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | `entity_id` 的字符串或字符串列表。
| `speed` | 否 | 速度百分比。

### 动作 `bond.set_switch_power_tracked_state`

设置 Bond 开关的跟踪电源状态。
调用此动作将更改任何 Bond 开关的跟踪电源状态，但不会传输任何信号使设备更改其状态。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | `entity_id` 的字符串或字符串列表。
| `power_state` | 否 | 布尔电源状态。

### 动作 `bond.set_light_power_tracked_state`

设置 Bond 灯光的跟踪电源状态。
调用此动作将更改任何 Bond 灯光的跟踪电源状态，但不会传输任何信号使设备更改其状态。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | `entity_id` 的字符串或字符串列表。
| `power_state` | 否 | 布尔电源状态。

### 动作 `bond.set_light_brightness_tracked_state`

设置 Bond 灯光的跟踪亮度状态
调用此动作将更改任何 Bond 灯光的跟踪亮度状态，但不会传输任何信号使设备更改其状态。

| 数据属性 | 可选 | 描述 |
| ---------------------- | -------- | ----------- |
| `entity_id` | 否 | `entity_id` 的字符串或字符串列表。
| `brightness` | 否 | 亮度为 0 到 255 之间的整数
