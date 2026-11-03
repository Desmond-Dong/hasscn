# Bayesian

**贝叶斯**传感器是一个虚拟二值传感器，通过使用概率组合其他传感器的状态来确定其状态。

这种方法可以检测不易直接测量的复杂事件，如做饭、洗澡、在床上或开始早晨例行程序。此外，它可以在传感器可能不可靠的可测量事件中提高置信度和可靠性，例如某些存在检测器。

贝叶斯通过应用[贝叶斯定理](https://en.wikipedia.org/wiki/Bayes%27_theorem)工作。它根据基准概率（称为"先验"）和"观察"传感器的状态的组合来估计特定事件正在发生的可能性。当计算的概率（称为"后验"）超过定义的 `probability_threshold` 时，`bayesian` 传感器将变为 `on`；否则将为 `off`。

支持 UI 和 YAML 设置，重要的是 YAML 使用 `0` 到 `1` 的概率，而 UI 使用百分比 `0` 到 `100`。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

创建贝叶斯助手后，您可以在此添加和编辑"观察"：
[![Open Settings > Devices & services in your Home Assistant instance.](https://my.home-assistant.io/badges/integration.svg)](https://my.home-assistant.io/redirect/integration/?domain=bayesian)

要配置 YAML 贝叶斯传感器，请使用以下结构将条目添加到您的 "`configuration.yaml`" 文件中。
:::tip
更改配置后需要重启 Home Assistant。
:::

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  - platform: bayesian
    name: "Kitchen Occupied by Humans"
    prior: 0.3 # 厨房大约 30% 的时间有人
    probability_threshold: 0.5 # 我同样关心假阳性和假阴性
    observations:
      - entity_id: "binary_sensor.kitchen_motion"
        prob_given_true: 0.95 # 当人在厨房时，运动传感器 95% 的时间能检测到他们
        prob_given_false: 0.33 # 当厨房没有人时，猫 33% 的时间会触发运动传感器
        platform: "state"
        to_state: "on"
```

```yaml
prior:
  description: >
     事件的基准概率（0 到 1）。在任何给定时间
     （如果您对"观察"一无所知），此事件发生的可能性有多大？
  required: true
  type: float
probability_threshold:
  description: >
    传感器应触发为 `on` 的后验概率。
    使用更高的值来减少假阳性（并增加假阴性）
    注意：如果阈值高于 `prior`，则默认状态将为 `off`
  required: false
  type: float
  default: 0.5
name:
  description: 在前端使用的传感器名称。
  required: false
  type: string
  default: Bayesian Binary Sensor
unique_id:
  description: 唯一标识此贝叶斯实体的 ID。如果两个实体具有相同的唯一 ID，Home Assistant 将引发异常。
  required: false
  type: string
device_class:
  description: 设置[设备类别](/home-assistant/integrations/binary_sensor/)，更改设备状态和前端显示的图标。
  required: false
  type: string
observations:
  description: 应该影响给定事件正在发生的概率的观察。
  required: true
  type: list
  keys:
    platform:
      description: >
        支持的平台有 `state`、`numeric_state` 和 `template`。
        它们以自动化触发器为模型，
        需要 `to_state`（对于 `state`）、`below` 和/或 `above`（对于 `numeric_state`）和 `value_template`（对于 `template`）。
      required: true
      type: string
    entity_id:
      description: 要监控的实体名称。`state` 和 `numeric_state` 必需。
      required: false
      type: string
    to_state:
      description: 定义观察的实体状态。（对于 `state`）必需。
      required: false
      type: string
    value_template:
      description: 定义要使用的模板，应评估为 `True` 或 `False`。`template` 必需。
      required: false
      type: template
    prob_given_true:
      description: >
        假设贝叶斯二值传感器为 `on`，实体状态发生的概率。
      required: true
      type: float
    prob_given_false:
      description: 假设贝叶斯二值传感器为 `off`，实体状态发生的概率。
      required: true
      type: float
```

## 理论

贝叶斯定理的一个基本概念是*给定观察的事件*概率与*给定事件的观察*概率之间的区别。这两个概率不可互换，必须分别考虑。虽然在某些情况下它们可能相似——例如，当运动传感器准确时，*给定*检测到运动的房间有人的概率通常接近*给定*房间有人时检测到运动的概率。

现在考虑上述情况，但在有猫的家中。*给定*检测到运动时房间有人占用的概率可能很低（例如 20%，p=0.2），如果房间很受猫欢迎。然而，*给定*房间有人占用时检测到运动的概率很高（例如 95%，p=0.95），如果我们的运动传感器准确。简而言之，并非所有运动都是人类，但所有人类都会移动。

在配置这些条件概率时，定义传感器观察（例如检测到运动）*给定*您试图估计的事物（例如房间的人类占用）的概率。

## 估计概率

1. 避免 `0` 和 `1`；这些会干扰赔比，而且很少是真实的——传感器会失败。
2. 当使用 `0.99` 和 `0.001` 时，`9` 和 `0` 的数量很重要。
3. 大多数概率将基于时间——某事为真的时间比例也是它将为真的概率。
4. 使用您的 Home Assistant 历史记录来帮助估计概率。
   * **贝叶斯传感器为 `on` 时的概率**（`prob_given_true:`）- 在您认为 `bayesian` 传感器应该为 `on` 的时间范围内选择相关传感器。`prob_given_true:` 是传感器处于 `to_state:` 的时间比例。
   * **贝叶斯传感器为 `off` 时的概率**（`prob_given_false:`）- 在您认为 `bayesian` 传感器应该为 `off` 的时间范围内选择相关传感器。`prob_given_false:` 是传感器处于 `to_state:` 的时间比例。
5. 不要通过调整 `prob_given_true:` 和 `prob_given_false:` 来强制获得期望的结果；使用准则 #4 尽可能准确地估计概率。如果行为仍然不符合预期，考虑添加更多传感器或参见 #6。
6. 如果您的贝叶斯传感器最终太容易触发 `on`，请重新检查概率是否合理，然后考虑增加 `probability_threshold:`，反之亦然。

## 完整示例

这些是许多详细示例，您可能会发现它们对每种观察类型有帮助。虽然这些是 YAML 示例，但 UI 配置的工作方式相同，只是概率以百分比表示。

### 状态

以下是仅使用测试实体 `state` 精确匹配的观察的示例。

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  platform: "bayesian"
  name: "in_bed"
  unique_id: "172b6ef1-e37e-4f04-8d64-891e84c02b43" # 在 https://www.uuidgenerator.net/ 生成
  prior: 0.25 # 我每天在床上睡 6 小时，6hr/24hr 是 0.25 
  probability_threshold: 0.8 # 我将使用此传感器关灯，所以我只想在我确定时激活
  observations:
    - platform: "state"
      entity_id: "sensor.living_room_motion"
      prob_given_true: 0.05 # 如果我在床上，那我不应该在客厅，不过偶尔有客人
      prob_given_false: 0.2 # 我的传感器历史显示，如果我不在床上，我大约五分之一的时间在客厅
      to_state: "on"
    - platform: "state"
      entity_id: "sensor.basement_motion"
      prob_given_true: 0.5 # 我的传感器历史显示，当我在床上时，我的地下室运动传感器大约一半时间是活动的，因为我的猫
      prob_given_false: 0.3 # 同上，但我的猫在我醒着时倾向于花更多时间在楼上或外面，我很少使用地下室
      to_state: "on"
    - platform: "state"
      entity_id: "sensor.bedroom_motion"
      prob_given_true: 0.5 # 我的传感器历史显示，当我在床上时，传感器大约一半时间能检测到我
      prob_given_false: 0.1 # 我的传感器历史显示，我在清醒时间大约 10% 在卧室
      to_state: "on"
    - platform: "state"
      entity_id: "sun.sun"
      prob_given_true: 0.7 # 如果我在床上，那么太阳很可能下山了，但在夏天早晨我可能还在床上
      prob_given_false: 0.45 # 如果我醒着，那么太阳在地平线下的合理机会——特别是在冬天
      to_state: "below_horizon"
    - platform: "state"
      entity_id: "sensor.android_charger_type"
      prob_given_true: 0.95 # 当我在床上时，我几乎总是插上手机充电
      prob_given_false: 0.1 # 当我醒着时，我偶尔给手机 AC 充电
      to_state: "ac"
```

### 数值状态

接下来是使用 `numeric_state` 的示例——测试数值实体的状态是否落在指定范围内，如配置所示，它需要 `below` 和/或 `above` 而不是 `to_state`。

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  name: "Heat On"
  platform: "bayesian"
  prior: 0.2
  probability_threshold: 0.9
  observations:
    - platform: "numeric_state"
      entity_id: "sensor.outside_air_temperature_fahrenheit"
      prob_given_true: 0.95
      prob_given_false: 0.05
      below: 50
```

### 模板

这是一个 `template` 观察的示例，如配置所示，它需要 `value_template`。如果设备跟踪器 `device_tracker.paulus` 在过去 5 分钟内没有被看到，此模板将评估为真。

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  name: "Paulus Home"
  platform: "bayesian"
  device_class: "presence"
  prior: 0.5
  probability_threshold: 0.9
  observations:
    - platform: template
      value_template: >
        {{is_state('device_tracker.paulus','not_home') and ((as_timestamp(now()) - as_timestamp(states.device_tracker.paulus.last_changed)) > 300)}}
      prob_given_true: 0.05
      prob_given_false: 0.99
```

### 每个实体的多个状态和数值条目

最后，一个示例说明当有超过两个感兴趣的状态和多个可能的数值范围时如何配置贝叶斯。当一个实体可以持有超过 2 个感兴趣的值（数值范围或状态）时，您可能希望为每个可能的值指定概率。一旦您指定了多个，贝叶斯无法推断未指定的状态或数值，就像通常那样，因此建议包括所有可能的值。如上所述，所有可能状态的 `prob_given_true` 之和应为 1，`prob_given_false` 之和也应为 1。如果观察到未指定的值，则观察将被忽略，就像实体是 `UNKNOWN` 或 `UNAVAILABLE` 一样。

当为同一实体定义多个范围时，`below` 对于任何指定它的范围都是包含的（≤）。对于单个范围，`above` 和 `below` 仍然是排除的。

这是一个可以检测垃圾箱是否被留在路边并需要移近房子的示例传感器。它结合了一个理论上的存在传感器，提供数值信号强度，以及一个来自当地政府的 API 传感器，可以有 3 种可能状态：`due` 表示收集在接下来 24 小时内到期，`collected` 表示收集在过去 24 小时内发生，`not_due` 在其他时间。

```yaml
# 示例 configuration.yaml 条目
binary_sensor:
  name: "Bins need bringing in"
  platform: "bayesian"
  prior: 0.14 # 垃圾箱通常一周大约被放在外面一天
  probability_threshold: 0.5
  observations:
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.01 # 如果垃圾箱在外面需要收回，我们只有 1% 的机会获得高于 10 的强信号
      prob_given_false: 0.3 # 如果垃圾箱不在外面，我们仍然倾向于不获得这么强的信号
      above: 10
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.02
      prob_given_false: 0.5 # 如果垃圾箱不在外面，我们经常获得这么强的信号
      above: 5
      below: 10
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.07
      prob_given_false: 0.1
      above: 0
      below: 5
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.3
      prob_given_false: 0.07
      above: -10
      below: 0
    - platform: "numeric_state"
      entity_id: "sensor.signal_strength"
      prob_given_true: 0.6 # 如果垃圾箱在外面，我们经常获得这么弱甚至更弱的信号
      prob_given_false: 0.03
      below: -10
    # 然后假设我们想将其与一个虚构的 sensor.bin_collection 结合，它读取当地政府 API，可以有三个值之一（collected、due、not due）
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.8 # 如果垃圾箱需要收回，通常是因为刚被收集
      prob_given_false: 0.05 # 
      to_state: "collected"
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.05 # 如果垃圾箱需要收回，那么 sensor.bin_collection 不应该是'due'
      prob_given_false: 0.11 # 传感器将在大约一周的一天为'due'（收集前 24 小时）
      to_state: "due"
    - platform: "state"
      entity_id: "sensor.bin_collection"
      prob_given_true: 0.15 # 所有 prob_given_true 应加起来为 1
      prob_given_false: 0.84 # 所有 prob_given_false 应加起来为 1
      to_state: "not due"
```
