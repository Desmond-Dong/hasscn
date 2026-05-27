# Toon

**Toon** 集成平台可用于控制你的 Quby Toon 恒温器，
它目前以下列品牌销售：

* Eneco Toon
* Engie Electrabel Boxx
* Viesgo Toon

此集成为你的 Toon 恒温器添加一个 climate 设备，以及一些开关，
用于控制恒温器的程序模式和假日模式。

它还提供能耗、功率和燃气消耗传感器，太阳能发电传感器，
以及多个二进制传感器，用于显示锅炉燃烧器开/关、生活热水和
锅炉健康状态等信息。

要使 Toon 集成正常工作，你需要有效的 Toon 订阅
以及一个 Toon API 开发者账号。

Home Assistant 目前支持以下设备类型：

* [Binary sensor](#binary-sensor)
* [Climate](#climate)
* [Sensor](#sensor)
* [Switch](#switch)

## 设置开发者账号

要使用此集成，你需要注册一个免费的 Toon API 开发者账号。

1. 访问 [Toon API developers website](https://developer.toon.eu/)，并进行[登录](https://developer.toon.eu/user/login)。如果还没有账号，请先[创建账号](https://developer.toon.eu/user/register)。
2. 打开 "[My Apps](https://developer.toon.eu/user/me/apps)" 页面，点击右上角的 "Add a new App" 按钮。
3. "Add App" 页面会显示一个包含两个字段的表单：
   * **App Name**：可任意填写，例如填入 "Home Assistant" 即可。
   * **Callback URL**：`https://my.home-assistant.io/redirect/oauth`。
4. 点击 "Create App" 完成创建过程。
5. 再次打开 "[My Apps](https://developer.toon.eu/user/me/apps)" 页面，并点击你刚创建的应用。
6. 记下当前显示的两个值："Consumer Key" 和 "Consumer Secret"。
7. 将以下 Toon 配置添加到你的 `configuration.yaml` 中，然后重启 Home Assistant。

```yaml
# configuration.yaml 示例条目
toon:
  client_id: YOUR_CONSUMER_KEY
  client_secret: YOUR_CONSUMER_SECRET
```

```yaml
client_id:
  description: Toon API Consumer Key。
  required: true
  type: string
client_secret:
  description: Toon API Consumer Secret。
  required: true
  type: string
```

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

<details>
<summary>我已手动禁用 My Home Assistant</summary>

如果你的安装中没有启用 [My Home Assistant](/home-assistant/integrations/my.md)，
则可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为 Callback URL。

`<HOME_ASSISTANT_URL>` 必须与配置 / 认证过程中使用的地址一致。

内网示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。

</details>

## Binary sensor

Toon 集成提供以下二进制传感器：

* Boiler Burner（仅适用于 OpenTherm）
* Boiler Heating\*（仅适用于 OpenTherm）
* Boiler Module Connection\*
* Boiler Preheating\*（仅适用于 OpenTherm）
* Boiler Status（仅适用于 OpenTherm）
* Hot Tap Water（仅适用于 OpenTherm）
* OpenTherm Connection\*（仅适用于 OpenTherm）
* Thermostat Program Override\*

带 `*` 的二进制传感器默认禁用，但可在 UI 中点击设备并启用对应实体。

## Climate

Toon climate 平台允许你与你的 Toon 恒温器交互。

Home Assistant 支持 Toon 的四种预设：`Comfort`、`Home`、`Away` 和 `Sleep`。
它也支持手动设置温度。

Toon 没有禁用预设的选项。当恒温器的数值被修改时，预设会自动取消。

## Sensor

Toon 集成提供以下传感器：

* Average Daily Energy Usage\*
* Average Daily Gas Usage\*
* Average Daily Water Usage\*
* Average Gas Usage
* Average Power Usage\*
* Average Water Usage\*
* Average Solar Power Production to Grid\*（仅适用于太阳能模块）
* Boiler Modulation Level\*（仅适用于 OpenTherm）
* Current Gas Usage
* Current Power Usage
* Current Power Usage Covered By Solar（仅适用于太阳能模块）
* Current Solar Power Production（仅适用于太阳能模块）
* Current Water Usage\*
* Electricity Meter Feed IN Tariff 1\*
* Electricity Meter Feed IN Tariff 2\*
* Electricity Meter Feed OUT Tariff 1\*
* Electricity Meter Feed OUT Tariff 2\*
* Energy Cost Today
* Energy Produced To Grid Today\*（仅适用于太阳能模块）
* Energy Usage From Grid Today\*（仅适用于太阳能模块）
* Energy Usage Today
* Gas Cost Today
* Gas Meter
* Gas Usage Today
* Humidity\*
* Max Solar Power Production Today（仅适用于太阳能模块）
* Solar Energy Produced Today（仅适用于太阳能模块）
* Solar Power Production to Grid（仅适用于太阳能模块）
* Temperature
* Water Meter\*
* Water Usage Today\*
* Water Cost Today\*

带 `*` 的传感器默认禁用，但可在 UI 中点击设备并启用对应实体。

## Switch

Toon 集成提供以下开关：

* Thermostat Holiday Mode
* Thermostat Program
