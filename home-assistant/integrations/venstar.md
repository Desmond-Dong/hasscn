# Venstar

**Venstar** 集成允许您通过 Home Assistant 控制 [Venstar](https://www.venstar.com/) 温控器。
Venstar 温控器提供本地 API，因此无需依赖其 Skyport 云服务即可实现自动化。

当前支持并经过测试的温控器包括：

* ColorTouch T7900
* ColorTouch T7850  (No Humidity control)
* Explorer Mini T2000
* Explorer IAQ T3950

当前支持的功能包括：

* 在温控器处于相应模式时设置制热或制冷温度
* 更改温控器工作模式（heat/cool/off/auto）
* 打开或关闭风扇
* 读取和设置湿度水平及限制（仅 T7900）
* 启用 away 预设
* 启用 hold mode 预设
* 远程温度传感器
* 温控器告警（如滤网更换等）
* 读取 IAQ 和 CO2 水平（仅受支持设备，如 T3950）
* 读取当前日程状态（morning/day/evening/night/inactive）

`preset_mode` 状态属性支持以下值：

* `none`：*启用*日程功能。
* `temperature`：*禁用*日程，并无限期保持设定温度。
* `away`：将温控器置于外出模式。

请注意：请确保将温控器更新到最新固件。最初在 5.10 固件上测试，目前在 VH6.79 上测试。

## 启用本地 API

需要直接在温控器上启用本地 API 模式。该功能无法通过 Venstar 移动应用或 Skyport 云服务启用。不同[系列](https://venstar.com/thermostats/)温控器的具体步骤有所不同：

* [ColorTouch](https://venstar.com/thermostats/colortouch/)
  * **Menu** > **WiFi** > **Local API Option** > **[Local API - ON](https://www.youtube.com/watch?v=kB_HcJ3kqCg\&t=51s)**.

* [EXPLORER](https://venstar.com/thermostats/explorer/) / [EXPLORER IAQ](https://venstar.com/thermostats/explorer-iaq/)
  * Press **SETUP**.
  * Press **MODE** repeatedly until you see [LOCAL API](https://www.youtube.com/watch?v=HRmWFwfQAhU\&t=276s).
  * Press **WARMER** to toggle "ON".
  * Press **SETUP** to exit.

* [EXPLORER Mini](https://venstar.com/thermostats/explorermini/)
  * Press and hold **MODE** + **FAN** together for 5 seconds.
  * Press **MODE** repeatedly until you see "API".
  * Press **WARMER** to toggle "ON".
  * Press **MODE** + **FAN** together to exit.

如果温控器已成功启用本地 API，在浏览器中访问其 IP 地址时，您应该能看到一些基本 API 信息：

```json
{"api_ver":7,"type":"commercial","model":"VYG-4800","firmware":"2.22.19"}
```

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
host:
  description: 温控器地址，例如 `192.168.1.32`。
username:
  description: 温控器用户名。
password:
  description: 温控器密码。
pin:
  description: 锁屏 PIN 码（启用锁屏时必填）。
ssl:
  description: 通信时是否使用 SSL。
```
