---
title: Husqvarna Automower
description: 关于如何将 Husqvarna Automower 割草机器人集成到 Home Assistant 的说明。
ha_category:
  - Binary sensor
  - Button
  - Calendar
  - Device tracker
  - Event
  - Lawn Mower
  - Number
  - Select
  - Sensor
  - Switch
ha_release: 2024.3
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@Thomas55555'
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - device_tracker
  - diagnostics
  - event
  - lawn_mower
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_domain: husqvarna_automower
ha_quality_scale: silver
---

**Husqvarna Automower** 集成通过 Husqvarna 的云 API 与 Husqvarna Automower 割草机器人建立连接。仅支持带有 _Automower(R) Connect_ 或 _Automower(R) Connect Module_ 的割草机。

要使用此集成，你必须使用 Husqvarna 账户正确配置 OAuth2 凭据。有关整体流程的概览，请参阅[本指南](https://developer.husqvarnagroup.cloud/docs/get-started)。
你需要提供用于 _Automower(R) Connect_ 手机应用的 Husqvarna 账户用户名和密码。大多数人会在首次设置割草机时创建 Husqvarna 账户。

1. 前往 [Husqvarna Developer Portal](https://developer.husqvarnagroup.cloud)，并使用你的 Husqvarna 账户登录。出现提示时，授权 _Developer Portal_ 访问 Husqvarna 账户。

2. 登录后，你会自动跳转到 “My applications”。如果没有跳转，请前往 [Applications](https://developer.husqvarnagroup.cloud/applications)。

3. 创建新应用：
   - Name 为必填项，但名称可自定义，例如 “My Home Assistant”
   - Description 为可选项
   - Redirect URL：`https://my.home-assistant.io/redirect/oauth`
     确保复制粘贴后 URL 末尾没有附加多余空格。

    ![Create new Application](/home-assistant/images/integrations/husqvarna_automower/create_new_application.png)

   - 选择 **CREATE**。系统会生成并显示 _Application Key_ 和 _Application Secret_。请像保护用户名和密码一样保护它们。

4. 选择 **CONNECT NEW API**，然后连接 **Authentication API**。
   ![Authentication API*](/home-assistant/images/integrations/husqvarna_automower/connect_authentication_api.png)

5. 再次选择 **CONNECT NEW API**，然后连接 **Automower Connect API**。
   ![Automower Connect API](/home-assistant/images/integrations/husqvarna_automower/connect_automower_api.png)

6. 保持此浏览器标签页打开，然后继续进行 Home Assistant 配置。
   ![Application Overview](/home-assistant/images/integrations/husqvarna_automower/application_overview.png)


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

<details>
<summary>我已手动禁用 My Home Assistant</summary>


如果你的安装中没有 [My Home Assistant](/home-assistant/integrations/my)，
则可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置/身份验证过程中使用的地址相同。

内部地址示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。


</details>

```yaml
Name:
  description: "输入这组凭据的名称。你可以自行命名。"
OAuth Client ID:
  description: "输入 Husqvarna 开发者应用中的 Application key。"
OAuth Client Secret:
  description: "输入 Husqvarna 开发者应用中的 Application secret。"
```

## 故障排除

如果凭据有误，你可以在 [application credentials](/home-assistant/integrations/application_credentials/) 页面中将其删除。

## 实体

启用 Husqvarna Automower 集成后，你应该会看到以下实体：

### 二进制传感器

此集成会创建以下二进制传感器：

- Battery charging  
  _割草机当前正在充电。如果它因电量低而自主返回充电底座，或在充满电后离开底座开始割草，也会报告此状态。_
- Leaving dock  
  _割草机当前正在离开充电站，并前往起始点。_

### 按钮（如可用）

此集成会创建以下按钮：

- **Confirm Error**（如可用）：用于确认割草机的轻微错误。
- **Reset cutting blade usage time**（如可用）：重置割草刀片使用时间。
- **Sync clock**：将割草机时钟与 Home Assistant 中设置的时间同步。

### 日历

此集成会为所有割草机创建一个日历实体。该日历会显示当前和即将到来的所有计划。

### 设备追踪器（如可用）

此集成会创建一个设备追踪器实体，用于显示割草机的位置。

### 事件（如可用）

- 将最新错误显示为事件。
- 包含附加上下文：`severity`、`latitude`、`longitude` 和 `date_time`。

#### 属性示例

| Attribute     | Description                            |
|---------------|----------------------------------------|
| `event_type`  | 错误代码（如 `tilt_error`）            |
| `severity`    | 错误严重级别（如 `error`、`warning`） |
| `latitude`    | 错误发生位置的纬度                     |
| `longitude`   | 错误发生位置的经度                     |
| `date_time`   | 错误发生的时间戳                       |

#### 使用场景

- 当割草机被抬起或卡住时发送通知。
- 在地图上显示最近一次错误的位置。

:::note
只有在收到新消息时才会创建该实体。如果割草机尚未报告任何错误，则不会显示该实体。

:::
### 割草机

此集成会创建一个割草机实体来控制割草机。该实体可以：

- 恢复计划
- 暂停割草
- 停靠至下一个计划开始

### 数值（如可用）

#### 割草高度

此集成会创建一个数值实体，用于更改割草机的割草高度。该实体默认禁用，你需要手动启用。API 无法检测割草机是否支持远程调整割草高度。在启用此功能前，请查阅割草机文档。根据不同机型，该实体可能只能被动作为传感器使用，而不能主动更改割草高度。
可用值为 1（草更短）到 9（草更高）。

#### 工作区域割草高度

如果你的割草机支持工作区域，此集成会为每个工作区域创建一个数值实体，用于更改该区域的割草高度。割草高度可设置为默认割草高度的 0%（草更短）到 100%（草更高）。注意：目前还无法通过 Home Assistant 更改默认割草高度。

### 选择（如可用）

此集成会创建一个选择实体，用于选择割草机的前灯模式。

### 传感器

此集成会创建以下传感器：

- Battery level
- Cutting blade usage time（如可用）
- Error。例如：_Mower tilted_、_outside geofence_
- Downtime（如可用）
- Inactive reason（如可用）。例如：_Searching for satellites_ 或 _planning_
- Remaining charging time
- Restricted reason。例如：_Week schedule_、_frost_ 或 _daily limit_
- Mode
- Next start
- Number of charging cycles
- Number of collisions
- Total charging time
- Total cutting time
- Total drive distance
- Total running time
- Total searching time
- Uptime（如可用）
- Work area（如可用）。例如：_My lawn_、_Front lawn_、_Back lawn_

对于每个启用了系统化割草的工作区域，还会创建以下传感器：

- Progress（百分比）
- Last time completed

### 开关

#### Avoid（如可用）

此集成会为你为割草机定义的每个禁入区创建一个开关。开关打开时，割草机会避开对应区域。开关关闭时，割草机会进入对应区域。

#### Enable schedule

此集成会创建一个开关，用于启用或禁用割草机的计划。开关打开时，割草机会按计划割草。开关关闭时，割草机会返回底座并停靠，直到另行通知。

#### Work area（如可用）

此集成会为你为割草机定义的每个工作区域创建一个开关。开关打开时，割草机会割对应区域。开关关闭时，割草机不会割该区域。

## 操作

此集成提供以下操作：

### Override schedule

使用此操作，你可以让割草机在指定时间内割草或停靠。你可以使用 `override_mode` 属性选择覆盖模式。在此期间，所有现有计划都会被覆盖。持续时间可以用天、小时和/或分钟表示，范围必须在 1 分钟到 42 天之间。

```yaml
# Replace <name> with the name of your mower.
action: husqvarna_automower.override_schedule
target:
  entity_id: lawn_mower.<name>
data:
  duration:
    days: 1
    hours: 12
    minutes: 30
  override_mode: mow  ### alternative: `park`
```

### Override schedule work area（如可用）

使用此操作，你可以让割草机在指定工作区域内割草一段时间。你可以通过 `work_area_id` 属性指定工作区域。`work_area_id` 可从 `Work area` 传感器中获取。
![Work area sensor](/home-assistant/images/integrations/husqvarna_automower/work_area_sensor.png)
在此期间，所有现有计划都会被覆盖。持续时间可以用天、小时和/或分钟表示，范围必须在 1 分钟到 42 天之间。

```yaml
# Replace <name> with the name of your mower.
action: husqvarna_automower.override_schedule_work_area
target:
  entity_id: lawn_mower.<name>
data:
  duration:
    days: 1
    hours: 12
    minutes: 30
  work_area_id: 123456 ### Work area ID for the "Front lawn" from the example above.
```

## 已知限制

- 只有在 Automower Connect App 中配置的计划时段内，才能使用 `lawn_mower.start_mowing` 操作启动割草机。若要在计划时段外启动，请使用 `husqvarna_automower.override_schedule` 操作。这两种情况下都要求电池事先已充满。
- 配备 EPOS 技术的割草机不支持禁入区处理。

## 移除集成

你可以按照以下步骤移除此集成：

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
