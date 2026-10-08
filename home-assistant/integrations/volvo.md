# Volvo

**Volvo** 集成用于接入您的 [Volvo](https://www.volvocars.com/) 车辆。

## 使用场景

### 监控车辆安全与状态

持续关注车门和车窗状态，一旦有变化即可立即收到通知。您还可以创建自动化，在车辆需要保养或车门未关好时发出提醒。

### 管理充电和电池

跟踪电池电量、预计纯电续航和当前充电状态。您可以根据电池电量、出发时间或电价设置自动化，并通过集成提供的传感器监控进度。

**注意：** 此集成不提供直接启动或停止充电的控制。如需真正开始或停止充电，请使用您的充电器对应的集成。

### 预热座舱和电池

在出行前预热或预调节座舱和电池，以提升舒适性和效率。您可以根据出发时间安排预热/预调节，也可以根据室外温度触发。

## 支持的车辆

* 2010 款及之后的车型。
* 位于欧洲、中东、非洲、美国、加拿大和拉丁美洲地区的车辆。您也可以查看[完整的国家列表](https://developer.volvocars.com/terms-and-conditions/apis-supported-locations/)。

:::important
可用功能取决于车型、年份和所在地区。

:::

## 前提条件

1. 前往 [Volvo 开发者门户](https://developer.volvocars.com/)。
2. 注册账号。
3. 打开 [API applications 页面](https://developer.volvocars.com/account/#your-api-applications)。
4. 创建一个 **API application**，并为其设置一个有意义的名称。

建议为每辆要添加的车辆分别创建一个 API application。每个 API key 每天可发出的请求数存在上限。

:::note
Home Assistant 将使用 Nabu Casa 提供的账户关联功能与 Volvo 进行身份验证。该服务**免费提供**，不需要 Nabu Casa 订阅，也是使用此集成的首选方式。

如果您已禁用 [cloud 集成](/home-assistant/integrations/cloud.md)，请阅读“**Using custom application credentials**”部分。

:::

<details>
<summary>使用自定义应用凭据</summary>

:::important
自定义 Volvo 应用凭据的授权期有限，这意味着每到一个授权周期结束后，您都需要重新向 Volvo 进行身份验证。
具体时长可在开发者门户中的 [Refresh the access token](https://developer.volvocars.com/apis/docs/authorisation/) 部分查看。
授权过期后，数据更新将停止工作，直到您重新完成身份验证。

为了获得更好的使用体验，建议优先使用默认的 Nabu Casa 账户关联方式。

:::

1. 在 Volvo 的 API application 页面中，选择您应用下方的 **Publish** 按钮。
2. 在随后出现的页面中填写所有必填字段。请特别注意：
   * **Scopes**：请确保全部选中（需要展开各个分组）。
   * **Redirect URI(s)**：添加 `https://my.home-assistant.io/redirect/oauth`。
3. 选择 **View summary** 并 **confirm**。
4. 从确认页面获取 `client id` 和 `client secret`，并将其**添加**到您的 [application credentials](/home-assistant/integrations/application_credentials.md) 中。

要使其生效，您需要配置 [My Home Assistant](https://my.home-assistant.io/)，让它指向您的本地 Home Assistant 实例。有关该功能的更多信息，请参阅 [FAQ](https://my.home-assistant.io/faq/)。

</details>

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
API key:
    description: "输入您在前提条件步骤中获取的 API key。"
VIN:
    description: "如果此账户下有多辆车，您可以选择要添加车辆的车辆识别码（VIN）。"
```

## 支持的功能

**Volvo** 集成提供以下实体。

### 所有动力类型

#### 二进制传感器

* **Brake fluid**：指示制动液液位是否过低。
* **Brake light center**：警告中央刹车灯是否故障。
* **Brake light left**：警告左侧刹车灯是否故障。
* **Brake light right**：警告右侧刹车灯是否故障。
* **Coolant level**：指示发动机冷却液液位是否过低。
* **Daytime running light left**：警告左侧日间行车灯是否故障。
* **Daytime running light right**：警告右侧日间行车灯是否故障。
* **Door front left**：检测左前门是打开还是关闭。
* **Door front right**：检测右前门是打开还是关闭。
* **Door rear left**：检测左后门是打开还是关闭。
* **Door rear right**：检测右后门是打开还是关闭。
* **Engine status**：显示发动机当前是否正在运行。
* **Fog light front**：警告前雾灯是否故障。
* **Fog light rear**：警告后雾灯是否故障。
* **Hazard lights**：警告双闪灯是否故障。
* **High beam left**：警告左侧远光灯是否故障。
* **High beam right**：警告右侧远光灯是否故障。
* **Hood**：检测引擎盖是打开还是关闭。
* **Low beam left**：警告左侧近光灯是否故障。
* **Low beam right**：警告右侧近光灯是否故障。
* **Oil level**：指示机油液位警告及保养需求。
* **Position light front left**：警告左前示宽灯是否故障。
* **Position light front right**：警告右前示宽灯是否故障。
* **Position light rear left**：警告左后示宽灯是否故障。
* **Position light rear right**：警告右后示宽灯是否故障。
* **Registration plate light**：警告牌照灯是否故障。
* **Reverse lights**：警告倒车灯是否故障。
* **Service**：指示车辆是否需要保养。
* **Side mark lights**：警告侧标志灯是否故障。
* **Sunroof**：检测天窗是打开还是关闭。
* **Tailgate**：检测尾门是打开还是关闭。
* **Tank lid**：检测油箱盖是打开还是关闭。
* **Tire front left**：指示左前轮胎压警告。
* **Tire front right**：指示右前轮胎压警告。
* **Tire rear left**：指示左后轮胎压警告。
* **Tire rear right**：指示右后轮胎压警告。
* **Turn indication front left**：警告左前转向灯是否故障。
* **Turn indication front right**：警告右前转向灯是否故障。
* **Turn indication rear left**：警告左后转向灯是否故障。
* **Turn indication rear right**：警告右后转向灯是否故障。
* **Washer fluid**：指示玻璃水液位是否过低。
* **Window front left**：检测左前车窗是打开还是关闭。
* **Window front right**：检测右前车窗是打开还是关闭。
* **Window rear left**：检测左后车窗是打开还是关闭。
* **Window rear right**：检测右后车窗是打开还是关闭。

#### 按钮

* **Start climatization**：启动空调系统，对车内温度进行预调节。
* **Stop climatization**：停止空调系统。
* **Flash**：短暂闪烁车辆灯光。
* **Honk**：短时间鸣响车辆喇叭。
* **Flash & honk**：同时执行闪灯和鸣笛。
* **Lock reduced guard**：以降低防护模式锁定车辆。

:::important
Volvo 已从官方应用中移除了 **Honk** 和 **Flash** 按钮，因为它们可能会耗尽车辆的 12 V 电池。
请谨慎使用！

:::

#### 设备追踪器

请前往 Volvo 开发者门户查看[可用性](https://developer.volvocars.com/apis/location/v1/overview/#availability)。

* **Location**：车辆当前位置。

#### 锁

* **Lock**：锁定或解锁车辆，并报告车辆当前锁定状态。

#### 传感器

* **Car connection**：车辆连接状态。
* **Direction**：车辆当前行驶方向。
* **Distance to service**：距离下次保养还剩余的里程。
* **Odometer**：里程表。
* **Service**：指示是否需要保养以及原因。
* **Time to engine service**：距离下次发动机保养还剩余的发动机工作小时数。
* **Time to service**：距离下次保养还剩余的时间。
* **Trip automatic average speed**：自动行程计的平均速度。
* **Trip automatic distance**：自动行程计的总里程。
* **Trip manual average speed**：手动行程计的平均速度。
* **Trip manual distance**：手动行程计的总里程。

### 纯电和插电混动

#### 传感器

* **Average energy consumption since charge**：自上次充电以来的平均能耗。
* **Battery**：电池当前电量。
* **Battery capacity**：电池总容量。
* **Distance to empty battery**：纯电续航里程。

#### 特定车型的传感器

请前往 Volvo 开发者门户查看[支持的车型列表](https://developer.volvocars.com/apis/energy/v2/overview/#availability)。

* **Charging connection status**：充电连接状态。
* **Charging limit**：车辆中配置的充电上限。
* **Charging power**：当前充电功率。
* **Charging power status**：指示当前是否正在供电。
* **Charging status**：指示车辆是否正在充电。
* **Charging type**：交流电或直流电。
* **Estimated charging time**：达到目标电池电量所需的预计充电时间。
* **Trip automatic average energy consumption**：自动行程计的平均能耗。
* **Target battery charge level**：车辆中配置的目标电池充电电量。
* **Trip manual average energy consumption**：手动行程计的平均能耗。

### 燃油和插电混动

#### 按钮

* **Start engine**：启动发动机 15 分钟。
* **Stop engine**：停止发动机。

#### 传感器

* **Distance to empty tank**：剩余燃油续航里程。
* **Fuel amount**：剩余燃油量。
* **Trip automatic average fuel consumption**：自动行程计的平均油耗。
* **Trip manual average fuel consumption**：手动行程计的平均油耗。

## 操作

### 获取图片 URL

`get_image_url` 操作用于获取您车辆专属图片的 URL。
您可以一次性获取全部 URL，也可以只选择一个或多个角度。

```yaml
Entry:
  description: "要获取车辆图片的条目 ID。"
Images:
  description: "要获取的图片角度。留空则获取全部图片。"
```

## 示例

### 车门未关时发送通知

如果至少有一个车门保持打开状态 5 分钟，则向您的手机发送通知。

```yaml
alias: Notify me if doors are left open for 5 minutes
description: ""
triggers:
  - trigger: state
    entity_id:
      - binary_sensor.volvo_YOUR_MODEL_door_front_left
      - binary_sensor.volvo_YOUR_MODEL_door_front_right
      - binary_sensor.volvo_YOUR_MODEL_door_rear_left
      - binary_sensor.volvo_YOUR_MODEL_door_rear_right
      - binary_sensor.volvo_YOUR_MODEL_tailgate
    to: "on"
    for:
      hours: 0
      minutes: 5
      seconds: 0
conditions: []
actions:
  - data:
      data:
        url: /lovelace/volvo
      title: 🚘 Volvo
      message: You've left some doors open. Don't give thiefs a chance!
    action: notify.mobile_app_phone_john_doe
mode: single
```

### 预计充电完成时间

Volvo API 仅提供预计充电时长（单位为分钟）。若要计算完成时间，您可以使用下面的模板创建一个 **Template sensor** 辅助实体。

```jinja
{% set charging_time = states('sensor.volvo_YOUR_MODEL_estimated_charging_time') | int(0) %}
{% if charging_time > 0 -%}
  {% set new_time = now() + timedelta(minutes=charging_time) %}
  {{ new_time }}
{%- else -%}
  {{ this.state }}
{%- endif %}
```

请将 **Device class** 设为 **Timestamp**，并可根据需要在 **Device** 中选择您的车辆。

## 数据更新

**Volvo** 集成会以不同的时间间隔从 API 获取数据：

* **每 30 分钟**：车辆连接性、诊断信息、轮胎和警告信息。
* **每 15 分钟**：制动、发动机警告、位置和里程表。
* **每 2 分钟**：能耗数据、发动机状态、燃油状态和统计信息。
* **每 1 分钟**：车门、锁和车窗状态。

如果您决定自定义轮询间隔，请注意每天最多只能发出 10,000 次请求。
每次轮询大约会消耗十几次调用（具体取决于车型）。

## 已知限制

Volvo 官方应用可访问功能更丰富的 API。因此，此集成无法提供实时更新、显示轮胎压力数值、启动空气净化、安排空调预调节、显示预调节状态等功能。

## 故障排除

### `charging_power_status` 实体显示 `fault` 或不可用

* 某些车型在已连接但充电器未供电时（例如充电器被暂停）会报告 `fault`。
* 该字段在 API 中文档不足，因此我们需要逐步了解其可能的取值。如果检测到未知值，实体会变为 `unavailable`，并记录一条警告日志。如果还没有其他人提交，请根据日志中提到的值[创建一个 issue](https://github.com/home-assistant/core/issues/new?template=bug_report.yml)。

### Recharge API

#### 症状

**Volvo** 集成未显示 recharge 实体，或这些实体不可用。
出现这种情况是因为 Volvo recharge API 有时不能正常响应。

#### 解决方法

一旦 API 恢复可用，集成会自动重新启用 recharge 实体。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，请前往 Volvo 开发者门户中的 [API applications 页面](https://developer.volvocars.com/account/#your-api-applications)，删除您为 Home Assistant 集成所使用的应用。
