---
title: Roborock
description: 'Roborock 集成允许您将 Roborock(https://us.roborock.com/pages/robot-vacuum-cleaner) 扫地机器人接入 Home Assistant。Roborock 吸尘器是智能家居清洁机器人，具体功能会因设备不同而异，可能包括拖地能力、激光导航。'
ha_category:
  - Binary sensor
  - Button
  - Image
  - Number
  - Select
  - Sensor
  - Switch
  - Time
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2023.5
ha_config_flow: true
ha_codeowners:
  - '@Lash-L'
  - '@allenporter'
ha_domain: roborock
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - image
  - number
  - select
  - sensor
  - switch
  - time
  - vacuum
ha_integration_type: hub
ha_quality_scale: silver
ha_dhcp: true
---
# Roborock

**Roborock** 集成允许您将 [Roborock](https://us.roborock.com/pages/robot-vacuum-cleaner) 扫地机器人接入 Home Assistant。Roborock 吸尘器是智能家居清洁机器人，具体功能会因设备不同而异，可能包括拖地能力、激光导航，以及调整清洁性能或家庭内清扫位置等选项。此集成让您可以直接在 Home Assistant 中控制并监控 Roborock 吸尘器。

该集成还支持自动化，并可与其他智能家居设备联动。例如，您可以在吸尘器卡住时发送通知，或在媒体播放器开始播放音乐时暂停吸尘器。

## 兼容性说明

新发布的 [Q-Series](https://us.roborock.com/pages/roborock-store#Q-Series) 设备尚未获得完整支持。Roborock 已更改这类设备的交互协议。目前尚不清楚 Q 系列之外的新设备会继续使用现有协议还是新协议。大多数 Q-Series 设备应可通过 [Matter](/home-assistant/integrations/matter/) 集成获得部分支持。

## 先决条件

1. 下载 iOS 或 Android 版 Roborock App。
2. 创建账户并登录。
3. 将您的 Roborock 设备添加到 Roborock App 中（例如通过扫描二维码）。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Email address:
    description: "The email address used to sign in to the Roborock app. A verification code will be sent to this email address when adding the Roborock integration."
Roborock server Region:
    description: "The region that your Roborock account was created in. Leave this set to **Auto** unless you are having issues. See troubleshooting steps below."
Verification code:
    description: "The verification code that is sent to your email address when adding the Roborock integration."
```

## Options

To define options for Roborock, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).
2. If multiple instances of Roborock are configured, choose the instance you want to configure.
3. On the card, select the cogwheel `[mdi:cog-outline]`.
   - If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

此集成可配置在地图上显示哪些 Roborock App 功能元素。

```yaml
Charger:
  description: 在地图上显示充电座。
Cleaned area:
  description: 在地图上显示已清扫区域。
Go-to path:
  description: 在地图上显示前往目标点的路径。
Ignored obstacles:
  description: 在地图上显示已忽略障碍物。
Ignored obstacles with photo:
  description: 在地图上显示带照片的已忽略障碍物。
Mop path:
  description: 在地图上显示拖地路径。
No carpet zones:
  description: 在地图上显示禁地毯区域。
No-go zones:
  description: 在地图上显示禁区。
No mopping zones:
  description: 在地图上显示禁拖区域。
Obstacles:
  description: 在地图上显示障碍物。
Obstacles with photo:
  description: 在地图上显示带照片的障碍物。
Path:
  description: 在地图上显示路径。
Predicted path:
  description: 在地图上显示预测路径。
Vacuum position:
  description: 在地图上显示吸尘器位置。
Virtual walls:
  description: 在地图上显示虚拟墙。
Zones:
  description: 在地图上显示区域。
Show background:
  description: 在地图后方显示蓝色背景，而不是透明背景。
```

## 数据更新

此集成同时使用本地和云端轮询，并通过 MQTT 接收云端推送事件。在可能的情况下会优先使用本地通信。
地图数据和例程始终通过云端获取，而 Dyad 和 Zeo 设备仅支持云端。

集成会通过云 API 自动发现您的 Roborock 设备，并在设备支持的情况下获取与其进行本地通信所需的信息。请确保 Home Assistant 实例能够访问设备的本地 IP。我们建议为 Roborock 吸尘器设置静态 IP，以帮助避免后续问题。设备通过 58867 端口通信。
根据您的防火墙配置，可能需要允许 Home Assistant 通过该端口与吸尘器通信。


## 支持的功能

Roborock 设备支持的功能因型号不同而异。只有您的设备支持的实体才会被添加到集成中。

### 扫地机器人设备

#### Vacuum

vacuum 实体可控制吸尘器的大多数功能，例如开始清扫、返回充电座或设置风机速度。

#### Image

- **Map**
  - **Description**: 显示 Roborock 吸尘器清扫区域的实时地图。

#### Select

- **Mop mode**
  - **Description**: 描述拖地方式。在某些固件中，它被称为 `mop route`。

- **Mop intensity**
  - **Description**: 指定拖地强度。

- **Selected map**
  - **Description**: 选择吸尘器当前加载的地图。

- **Empty mode**
  - **Description**: 可设置 `empty mode`，包括 Max、Light、Balanced 和 Smart。
  - **Availability**: 仅适用于配备自动集尘座的吸尘器。

#### Binary sensor

- **Charging**
  - **Description**: 表示吸尘器当前是否正在充电。

- **Cleaning**
  - **Description**: 表示吸尘器当前是否正在清扫。当机器人正在移动，或因电量低返回充电座但清扫任务仍处于活动状态并会稍后继续时，该实体也会处于开启状态。

- **Mop attached**
  - **Description**: 表示拖布当前是否已安装。

- **Mop drying status**
  - **Description**: 仅适用于具备烘干能力的底座 - 表示拖布当前是否正在烘干。

- **Water box attached**
  - **Description**: 表示水箱当前是否已安装。

- **Water shortage**
  - **Description**: 表示水箱是否缺水；如果未检测到缺水，则显示 `Ok`。

- **Cleaning fluid**
  - **Description**: 仅适用于支持清洁液的底座 - 表示底座清洁液是否不足，或清洁液容器未安装。

- **Clean water box**
  - **Description**: 仅适用于内置清水箱的底座。表示底座是否缺少清水，或清水箱未安装。

- **Dirty water box**
  - **Description**: 仅适用于内置污水箱的底座。表示污水箱是否已满，或污水箱未安装。


#### Sensor

- **Cleaning area**
  - **Description**: 吸尘器本次清扫已清洁的面积。如果当前未在清扫，则显示上一次清扫的面积。

- **Cleaning time**
  - **Description**: 吸尘器本次清扫持续的时间。如果当前未在清扫，则显示上一次清扫耗时。

- **Cleaning progress**
  - **Description**: 仅适用于部分较新设备 - 表示当前清扫已完成的百分比。

- **Dock error**
  - **Description**: 仅适用于非基础底座 - 表示吸尘器当前错误；若无错误则显示 `Ok`。

- **Main brush time left**
  - **Description**: 距离 Roborock 建议更换主刷还剩多少时间。

- **Mop drying remaining time**
  - **Description**: 仅适用于非基础底座 - 距离拖布烘干完成并可继续清扫还剩多少时间。

- **Side brush time left**
  - **Description**: 距离 Roborock 建议更换边刷还剩多少时间。

- **Filter time left**
  - **Description**: 距离 Roborock 建议更换吸尘器滤网还剩多少时间。

- **Maintenance brush time left**
  - **Description**: 距离 Roborock 建议更换底座维护刷还剩多少时间。

- **Strainer time left**
  - **Description**: 距离 Roborock 建议更换底座滤网还剩多少时间。具体可能指水过滤器或清洁托盘，取决于您的设备。

- **Status**
  - **Description**: 吸尘器当前状态。通常表示当前正在执行的动作，例如 `spot_cleaning` 或 `docking`。

- **Last clean begin**
  - **Description**: 吸尘器上一次开始清扫的时间。

- **Last clean end**
  - **Description**: 吸尘器上一次完成清扫的时间。

- **Total cleaning time**
  - **Description**: 吸尘器的累计清扫时长。

- **Total cleaning area**
  - **Description**: 吸尘器的累计清扫面积。

- **Total cleaning count**
  - **Description**: 吸尘器的累计清扫次数。

- **Vacuum error**
  - **Description**: 吸尘器当前错误（如果有）。

#### Time

- **Do not disturb begin**
  - **Description**: 启用 _Do not disturb_ 后，吸尘器在此时间点之后不会运行，也不会发声。

- **Do not disturb end**
  - **Description**: 启用 _Do not disturb_ 后，吸尘器在此时间点之前不会运行，也不会发声。

#### Switch

- **Child lock**
  - **Description**: 禁用吸尘器上的实体按键。按下按键不会有任何反应。

- **Status indicator light**
  - **Description**: 这是吸尘器顶部的 LED。其颜色会根据吸尘器状态变化。

- **Do not disturb**
  - **Description**: 在您于 App 或 time 实体中设置的时间段内启用 _Do not disturb_。启用后，吸尘器不会运行，也不会发声。

#### Number

- **Volume**
  - **Description**: 允许您控制机器人的语音音量。例如播报 “Starting cleaning” 时的音量。通过该实体可将音量设为 0%，而 App 最低仅允许设置到 20%。

#### Button

目前有四个按钮可用于重置吸尘器的不同维护项目。按钮一旦按下便无法撤销。因此，这些按钮默认禁用，以避免误触。

- **Reset sensor consumable**
  - **Description**: 吸尘器传感器建议每使用 30 小时后清洁一次。

- **Reset side brush consumable**
  - **Description**: 边刷建议每 200 小时更换一次。

- **Reset main brush consumable**
  - **Description**: 主刷/滚刷建议每 300 小时更换一次。

- **Reset air filter**
  - **Description**: 空气滤网建议每 150 小时更换一次。

此外，某些吸尘器支持在 App 中设置例程。每个例程都会创建一个按钮实体，允许您直接触发它。

#### 操作

##### 操作：设置吸尘器前往指定位置

`roborock.set_vacuum_goto_position` 操作用于让吸尘器前往指定坐标。

- **Data attribute**: `entity_id`
  - **Description**: 仅作用于指定机器人。
  - **Optional**: 否。
- **Data attribute**: `x`
  - **Description**: X 坐标，整数值。充电座位于 x=25500。
  - **Optional**: 否。
- **Data attribute**: `y`
  - **Description**: Y 坐标，整数值。充电座位于 y=25500。
  - **Optional**: 否。

##### 操作：获取吸尘器当前位置

`roborock.get_vacuum_current_position` 操作用于获取吸尘器当前位置。
这是一次云端调用，应仅用于诊断，不适合在自动化中频繁使用。
频繁请求可能会触发速率限制。

- **Data attribute**: `entity_id`
  - **Description**: 仅作用于指定机器人。
  - **Optional**: 否。

示例：

```yaml
action: roborock.get_vacuum_current_position
target:
  entity_id: vacuum.roborock_s7
data: {}
```

- **Result**: 您会得到类似如下的响应：

  ```yaml
  vacuum.roborock_s7:
    x: 28081
    y: 25168
  ```

##### 操作：获取地图

`roborock.get_maps` 操作会返回设备上可用的地图，以及每张地图上已命名房间的详细信息。

- **Data attribute**: `entity_id`
  - **Description**: 获取指定设备的地图。
  - **Optional**: 否。

该操作会返回地图名称、房间名称及其 ID。有关如何使用地图响应的更多信息，请参阅 [我该如何清扫指定房间？](#how-can-i-clean-a-specific-room)。

### Dyad 设备

Roborock 干湿两用吸尘器目前通过 MQTT 连接暴露部分实体，因此当前依赖云端。

#### Sensor

- **Status**
  - **Description**: 当前设备状态。通常表示当前正在执行的动作，例如 `drying` 或 `charging`。

- **Battery**
  - **Description**: 当前设备电量。

- **Filter time left**
  - **Description**: 距离 Roborock 建议清洁/更换滤网还剩多少时间。

- **Brush time left**
  - **Description**: 距离 Roborock 建议清洁/更换刷头还剩多少时间。

- **Error**
  - **Description**: 当前设备错误；如果没有错误，则显示 `None`。

- **Total cleaning time**
  - **Description**: 干湿两用吸尘器的累计清洁时长。


### Zeo 实体

Roborock Zeo One 当前通过 MQTT 连接暴露部分实体，因此目前依赖云端。

#### Sensor

- **State**
  - **Description**: 洗衣机当前状态。例如 `washing` 或 `rinsing`。

- **Countdown**
  - **Description**: 距离机器开始运行的倒计时。

- **Washing left**
  - **Description**: 距离洗衣结束还剩多少时间。

- **Error**
  - **Description**: Zeo 当前错误（如果有）。

## 删除集成

此集成遵循标准删除流程，无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.


## 常见问题

### 我可以把 Mi Home App 与此集成一起使用吗？
不可以。此集成在设置时需要使用 Roborock App 中的信息，并通过 Roborock 协议与设备通信。您的吸尘器必须已同步到 Roborock App。

### 我可以阻止该设备访问互联网吗？
目前还不行。当吸尘器与互联网断开时，它会尝试断开 Wi-Fi 并不断重新连接，直到能够访问 Roborock 服务器。

### 支持哪些设备？
如果您的设备可以添加到 Roborock App 中，那么通常就是受支持的。不过，一些较旧的吸尘器（例如 Roborock S5）必须通过 Mi Home App 连接，并可在 Home Assistant 中通过 [Xiaomi Miio](/home-assistant/integrations/xiaomi_miio/) 集成进行设置。

### 未来会支持哪些功能？
我们正在为核心集成增加更多功能。我们已经逆向分析出超过 [100 条命令](https://python-roborock.readthedocs.io/en/latest/api_commands.html)。目前文档仍较为基础，我们也希望用户帮助我们将其补充得更完整。以下是我们计划添加到 Home Assistant Core 的一些功能，感谢您的耐心等待。
- 按房间选择性清扫
- 底座控制
- 手动遥控吸尘器
- 错误、清扫时间、耗材等状态信息
- 查看摄像头
- 查看地图

### 我该如何清扫指定房间？ {#how-can-i-clean-a-specific-room}
我们计划在未来简化这一流程，但目前仍需要多步操作。
1. 先确保已在 Roborock App 中为房间命名；否则它们不会出现在调试日志中。
2. 前往 [**Settings** > **Developer tools** > **Actions** > **Roborock: Get Maps**](https://my.home-assistant.io/redirect/developer_call_service/?service=roborock.get_maps)。将您的吸尘器选作实体。请注意，房间 ID 和名称只会针对当前选中的地图更新。

   - **Request**: 您的请求应类似如下：

      ```yaml
      action: roborock.get_maps
      target:
        entity_id: vacuum.s7_roborock
      ```

   - **Result**: 您会得到类似如下的响应：

      ```json
      vacuum.s7_roborock:
        maps:
          - flag: 0
            name: Downstairs
            rooms:
              "16": Kitchen
              "17": Living room
      ```

3. 返回 [**Settings** > **Developer tools** > **Actions** > **Vacuum: Send Command**](https://my.home-assistant.io/redirect/developer_call_service/?service=vacuum.send_command)，然后将命令填为 `app_segment_clean`，并在 `segments` 中填入您想清扫的两位数房间 ID 列表。接着添加 `repeat`，并填入 1 到 3 之间的数字，用来指定这些区域要清扫几次。

示例：

```yaml
action: vacuum.send_command
data:
  command: app_segment_clean
  params:
    - segments:
        - 22
        - 23
      repeat: 2
target:
  entity_id: vacuum.s7_roborock

```

## 故障排除

### 我收到 invalid 或 no user agreement 错误，但 App 中什么也没显示

Roborock 服务器要求您先接受用户协议才能使用 API，这可能会在设置期间阻止 Home Assistant。此外，即便您之前已经接受过，Roborock 也可能会再次要求您重新确认用户协议。要让 Home Assistant 能使用 Roborock API，请执行以下步骤：
1. 打开 Roborock App。
2. 进入 **Profile** > **About Us** > **User Agreement & Privacy Policy**。
3. 点击 **Revoke authorization**。
4. 重新登录并接受协议。
5. 重新加载 Roborock 集成！

### 集成提示无法连接我的吸尘器、正在使用云 API，或我遇到了网络问题

此集成既能通过云 API 控制设备，也能通过本地 API 控制设备。如果本地 API 无法访问，它就会退回到云 API。我们建议尽量只使用本地 API，以帮助避免触发速率限制。

修复此问题所需的具体步骤取决于您的网络环境。以下是一些通用排查建议：

1. 确保吸尘器可以通过 8883 端口访问外网。
2. 确保吸尘器可以通过 TCP 58867 和 UDP 58866 端口与 Home Assistant 实例通信。
3. 如果您使用了 Pi-Hole、AdGuard 或其他会修改 DNS 的工具，请确保吸尘器被加入例外名单。
4. 为吸尘器设置静态 IP。
5. 检查路由器管理页面。如果设备频繁掉线，您需要优先改善 Wi-Fi 网络质量。

### 我的设备每天凌晨 3 点左右会变为 unavailable，该怎么解决？

每天夜里，吸尘器都会与互联网断开约一分钟，然后自动重新连接。在设备重新可达之前，集成会显示为 unavailable。这并不是集成本身的问题，而是集成对设备状态变化的正常反应。

### 集成提示未找到设备，但我的账户里明明有设备

某些设备由于使用了不同于其他设备的协议，因此尚未获得支持。请确保您使用的是最新版本的 Home Assistant。

### 日志中出现 rate limiting 相关信息，我该怎么办？

此集成所依赖的 Python 包内置了速率限制机制。这是为了避免您的实例向 Roborock 服务器发送过多请求，从而导致 IP 被封。最佳做法是先将该集成停用 24 小时。

同时，也建议尽量找出在您环境中触发该错误的根本原因。一个常见原因是：有些用户写了脚本，一旦集成变为 unavailable 就自动重载。如果设备卡住并耗尽电量，系统就会频繁重载集成，从而触发速率限制。

### 添加集成时提示 region 不正确

我们建议将区域设置为 `Auto`。如果由于您在多个区域拥有账户而导致此方法无效，请尝试以下步骤：

1. 如果您曾误在错误的 Roborock 服务器区域创建过账户，请使用 Roborock App 将其删除。
2. 您账户所在的 Roborock 服务器区域不一定与实际国家一致。设置集成时，您可以选择要登录的 Roborock 服务器区域，可选项有 US、EU、RU 和 CN；您可能需要尝试一个与预期不同的区域。大多数俄罗斯和中国以外的用户都位于 US 或 EU 服务器区域。
3. 请注意，App 中显示的 `Region` 实际上是您账户注册所在的国家，并不总是与集成所需的区域一致。
