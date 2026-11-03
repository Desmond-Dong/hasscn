# Nissan Leaf

The **Nissan Leaf** integration offers integration with the [NissanConnect EV](https://www.nissan.co.uk/dashboard.html) cloud service. NissanConnect EV was previously known as Nissan Carwings.

:::important
Please be aware that the `nissan_leaf` integration only works with Nissan vehicles from before 2019. Newer vehicles will not work with this integration.

:::
The integration offers offers:

* 用于电池状态、范围和充电状态的传感器。
* 启动和停止气候控制的开关。
* 请求汽车开始充电的按钮。
* 请求汽车更新的操作。

## Configuration

To use Nissan Leaf in your installation, add the following to your `configuration.yaml` file.
After changing the `configuration.yaml` file, [restart Home Assistant](/home-assistant/docs/configuration/index.md#reloading-the-configuration-to-apply-changes) to apply the changes. The integration is shown on the integrations page under [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/). Its entities are listed on the integration card itself and on the [**Entities**](https://my.home-assistant.io/redirect/entities/) tab.

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
```

```yaml
username:
  description: The username associated with your NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
password:
  description: The password for your given NissanConnect EV account. Enclose in quotes.
  required: true
  type: string
region:
  description: The region where the NissanConnect EV account is registered. Should be one of the following, NE (for Europe), NNA (USA), NCI (Canada), NMA (Australia), NML (Japan).
  required: true
  type: string
update_interval:
  description: The interval between updates if the climate control is off and the car is not charging. Set in any time unit (e.g.,  minutes, hours, days!). Providing a low interval will cause the service to refresh more frequently and can negatively impact your 12V battery. 
  required: false
  default: 1 hour
  type: time
update_interval_charging:
  description: The interval in minutes between updates if charging.
  required: false
  default: 15
  type: time
update_interval_climate:
  description: The interval in minutes between updates if climate control on.
  required: false
  default: 5
  type: time
```

## Full configuration sample

设置更新间隔的更高级示例：

```yaml
# Example configuration.yaml entry
nissan_leaf:
  username: "YOUR_USERNAME"
  password: "YOUR_PASSWORD"
  region: "YOUR_REGION"
  update_interval:
    hours: 1
  update_interval_charging:
    minutes: 15
  update_interval_climate:
    minutes: 5
  force_miles: true
```

## Starting a Charge

您可以使用“button.press”操作向 Nissan 服务器发送请求以开始充电。汽车必须插电！

```yaml
- action: button.press
  target:
    entity_id: button.start_NICKNAME_charging    # replace
```

## 使用自动化按需更新

您还可以使用“nissan\_leaf.update”操作来请求按需更新。要几乎完全通过操作进行更新，请在集成配置中将“update\_interval”设置为较高值。  该操作请求 VIN 号码，如上所述。

```yaml
- id: update_when_driver_not_home
  alias: "Update when driver not home"
  initial_state: on
  triggers:
    - trigger: time_pattern
      minutes: "/30"
  conditions:
    - condition: state
      entity_id: device_tracker.drivername   # replace
      state: "not_home"
  actions:
    - action: nissan_leaf.update
      data:
        vin: "1HGBH41JXMN109186"             # replace
```

## Hints

* 更新间隔至少为两分钟。
* 请求更新需要使用 12 V 电池的少量能量。当汽车未插电时，12 V 电池从主牵引电池充电。如果汽车长时间插电，或者主牵引电池电量非常低，则 12 V 电池可能会逐渐放电。更新间隔过短可能会导致 12 V 电池电量耗尽。  当 12 V 电池电量耗尽时，汽车将无法启动。 *不要将更新间隔设置得太低。  使用风险自负。*
* 此集成与 Nissan 服务器通信，然后与汽车通信。汽车和 Nissan 服务器之间的通信非常慢，最多需要五分钟才能从汽车获取信息，因此默认轮询间隔设置为一小时，以免压垮连接。
* 分别接收来自 Nissan 服务器的电池/续航里程、气候控制和位置的响应。 `updated_on` 属性将显示上次从服务器检索数据的时间。对于何时计划“next\_update”以及指示是否“update\_in\_progress”有单独的属性。 “nissan\_leaf.update”操作将重置“next\_update”属性。
* Nissan API 不允许远程停止充电。
* Nissan 服务器有不稳定的历史，因此请在报告错误之前确认 Nissan Leaf 官方应用程序/网站正常工作。
* 在英国，Carwings 的截止日期为 16 板 24 kWh 和 65 板 30 kWh。此后的汽车配备 NissanConnect。
* 自 2019 年 7 月 25 日起，MyCarFinder API 不再可用，因此 device\_tracker 支持已被删除。

请使用以下记录器配置报告错误。

```yaml
logger:
  default: critical
  logs:
    homeassistant.components.nissan_leaf: debug
    homeassistant.components.binary_sensor.nissan_leaf: debug
    homeassistant.components.button.nissan_leaf: debug    
    homeassistant.components.sensor.nissan_leaf: debug
    homeassistant.components.switch.nissan_leaf: debug
```
