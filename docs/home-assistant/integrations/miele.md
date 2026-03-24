---
title: Miele
description: 关于如何在 Home Assistant 中设置 Miele 集成的说明。
ha_category:
  - Binary sensor
  - Button
  - Climate
  - Fan
  - Hub
  - Light
  - Select
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Push
ha_release: '2025.5'
ha_domain: miele
ha_codeowners:
  - '@astrandb'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - climate
  - diagnostics
  - fan
  - light
  - select
  - sensor
  - switch
  - vacuum
ha_integration_type: hub
ha_zeroconf: true
ha_quality_scale: platinum
---

**Miele** 集成允许你通过[官方第三方 API](https://www.miele.com/developer)集成家用电器。

Miele 以高端烹饪、衣物护理和地面清洁设备制造商而闻名。

## 使用场景

- 监控设备的多个传感器，并根据这些传感器触发自动化
- 监控设备的程序状态
- 控制设备上的设置

:::note
可用功能取决于设备型号。

:::
## 支持的设备

你可以在 [Miele 网站](https://www.miele.com/developer/capabilities.html)上查看支持设备的一般信息。此集成支持任何连接到 Miele 用户账户的 Miele 设备。Miele WiFiConn@ct 设备可以通过 Wi-Fi 路由器直接连接。Miele Zigbee 设备必须使用 Miele@home Gateway XGW3000。

设备必须通过 Miele 应用连接到 Miele CloudService。

:::note
新一代洗烘一体机和新一代吸尘器：
用于这些新一代产品的端点尚未可用，预计将在 2025 年秋季发布。

:::
## 前提条件

请确保你已经准备好 Miele 账户的用户名、密码和国家/地区信息。

<details>
<summary>我已手动禁用 My Home Assistant</summary>


如果你的安装中没有启用 [My Home Assistant](/home-assistant/integrations/my)，你可以改用 `<HOME_ASSISTANT_URL>/auth/external/callback` 作为重定向 URI。

`<HOME_ASSISTANT_URL>` 必须与配置或身份验证过程中使用的地址一致。

内部地址示例：`http://192.168.0.2:8123/auth/external/callback`、`http://homeassistant.local:8123/auth/external/callback`。


</details>


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成配置过程中可能会要求输入 *Client ID* 和 *Client Secret*。更多信息请参阅下方的[故障排除](/home-assistant/integrations/miele/#troubleshooting)以及 [Application Credentials](/home-assistant/integrations/application_credentials)。

## 支持的功能

:::note
- 实体是否可用取决于设备类型和产品代数，某些设备可能不支持其类型下的全部实体。请参阅产品说明书了解具体功能实现细节
- 由于 Miele 第三方 API 的限制，专业和半专业系列产品通常不受支持
- 某些设备在关闭时不会上报数据，因此在 Miele 集成加载后，相关实体可能要等到设备开启后才会出现

:::
### 二进制传感器

<details>
<summary>二进制传感器列表</summary>


- **Operation state**：
  - **Door**：显示设备门当前是打开还是关闭
  - **Full remote control**：显示支持此功能的设备上“完全远程控制”功能的状态
  - **Mobile start**：显示支持此功能的设备上“移动启动”功能的状态
  - **Notification active**：显示设备上是否有通知消息处于活动状态。API 不提供通知详情
  - **Problem**：显示设备上是否有错误消息处于活动状态。API 不提供错误详情
  - **Smart grid**：显示支持此功能的设备上 Smart grid 功能的状态

</details>

### 按钮

<details>
<summary>按钮实体列表</summary>


按钮实体用于控制洗衣机、烘干机、洗碗机、扫地机器人等设备的程序进度。不同产品型号对按下按钮的响应可能略有不同，但结果通常是直观的。API 会根据设备的实际状态启用或禁用按钮。大多数设备都需要你手动启用 mobile start 或 remote control 模式。

- **Start**：启动或恢复程序
- **Pause**：暂停程序
- **Stop**：停止程序


</details>

### 气候

<details>
<summary>气候实体列表</summary>


气候实体用于控制冰箱、冷冻柜和酒柜的目标温度。根据设备能力，可以控制一个、两个或三个区域。


</details>

### 风扇

<details>
<summary>风扇实体列表</summary>


- **Fan**：在许多抽油烟机以及带集成抽风装置的组合式电磁炉中，可以监控和控制抽风风扇的速度


</details>

### 灯光

<details>
<summary>灯光实体列表</summary>


- **Light**：在许多烤箱、抽油烟机和酒柜型号中，可以打开或关闭照明
- **Ambient light**：某些抽油烟机型号带有环境灯光，可打开或关闭

</details>

### 选择器

<details>
<summary>选择实体列表</summary>


- **Mode**：为冷冻柜和冰箱选择运行模式。可用模式因设备型号而异

</details>

### 传感器

<details>
<summary>传感器列表</summary>


- **Operation state**：
  - **Status**：表示设备当前的运行状态。默认实体名称通常只是设备类型，例如“Dishwasher”
  - **Program**：显示当前激活的程序。在咖啡机上，程序传感器还会提供额外状态属性 `profile`，用于区分当前使用的是哪个配置文件
  - **Program phase**：显示当前运行程序的阶段
  - **Program type**：显示当前程序类型
  - **Spin speed**：显示洗衣机当前程序所选的脱水转速
  - **Energy consumption**：显示当前程序周期中的能耗。程序结束后，该值会重置
  - **Energy forecast**：显示某个周期预计将消耗的最大能量百分比
  - **Water consumption**：显示当前程序周期中的用水量。程序结束后，该值会重置
  - **Water forecast**：显示某个周期预计将消耗的最大水量百分比
  - **Temperature**：表示冰箱、冷冻柜和烤箱中的当前温度。根据设备能力，最多可创建 3 个区域的实体。对于第 2 和第 3 区域，温度传感器会在设备开启并上报有效数值时动态创建
  - **Target temperature**：显示烤箱和洗衣机设置的目标温度
  - **Core temperature**：显示带适用温度探针的烤箱中食物的核心温度。该传感器会在设备开启、程序启动且温度探针连接到设备时动态创建
  - **Target core temperature**：显示带适用温度探针的烤箱中食物设置的目标核心温度。该传感器会在设备开启、程序启动且设备上设置了目标核心温度时动态创建
  - **Drying step**：显示滚筒烘干机所选的烘干步骤
  - **Elapsed time**：显示当前程序已经运行的分钟数
  - **Remaining time**：显示当前程序周期预计剩余的分钟数。这个值在程序运行期间可能会因负载脏污程度或加热时间而波动
  - **Start in**：如果已设置延迟启动，则显示距离程序开始还剩多少分钟
  - **Start**：显示程序开始的日期和时间。如果设置了延迟启动，这里显示设备实际开始运行周期的时间
  - **Finish**：显示程序预计完成的日期和时间。如果设置了延迟启动，这里显示包含延迟时间在内的预计完成时间
  - **Plate**：四到六个传感器，用于显示灶台加热板的当前状态。状态与实际灶台上的显示一致。例如，0 表示关闭，5 表示大约 50% 功率，而 `B` 表示增强功率。Home Assistant 只能监控这些加热板，不能控制它们
  - **TwinDos level**：两个传感器，用于显示适用洗衣机中洗涤剂容器的剩余量。如果设备不支持此传感器，值会显示为 `Unknown`
  - **Descaling, degreasing, milk pipework cleaning cycles counter**：一组传感器，用于显示设备已运行的维护程序总次数。这些传感器仅在支持相关维护程序的设备上可用，比如咖啡机或带蒸汽功能的烤箱
  - **PowerDisk level**：显示适用洗碗机中洗涤剂容器剩余量的传感器。如果设备不支持此传感器，值会显示为 `Unknown`
  - **Rinse aid level**：显示洗碗机中漂洗剂容器剩余量的传感器
  - **Salt level**：显示洗碗机中盐容器剩余量的传感器

</details>

### 开关

<details>
<summary>开关实体列表</summary>


- **Power**：Power 开关在不同设备型号上的行为略有不同。对于某些设备，它更像传统电源开关；而对另一些设备，它更像唤醒/休眠切换。API 会根据设备的运行状态控制该开关是否可用
- **Supercooling**：控制冰箱的 Supercooling 模式
- **Superfreezing**：控制冷冻柜的 Superfreezing 模式

</details>

### 吸尘器

<details>
<summary>吸尘器实体列表</summary>


- **Robot vacuum cleaner**：Miele 扫地机器人可以在一定程度上被监控和控制。你可以启动、停止和暂停设备，也可以设置风扇速度

</details>

## 操作

### 操作 `miele.set_program`

为适用设备设置并启动程序。请注意，设备必须处于可接受新程序的状态。例如，大多数洗衣机必须处于 `on` 状态，而且很多设备需要你预先手动设置为 `MobileStart` 或 `MobileControl`。如果设备未接受该操作命令，会显示错误信息。
这个操作可以在 **Automations** 编辑器中通过 UI 设置，也可以在 **Developer tools** 中执行。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  在 GUI 模式下选择设备，然后切换到 YAML 模式查看 `device_id`。                                                   |
| `program_id`   | no       |  输入 `program_id` 数字。最简单的查找方式是在开发者工具中使用 `get_programs` 操作。你也可以在实际程序运行时下载诊断信息，在键 `state.programId.value_raw` 中找到对应数值。|

### 操作 `miele.set_program_oven`

为烤箱设备设置并启动程序。请注意，设备必须处于可接受新程序的状态。例如，大多数烤箱必须处于 `on` 状态，而且很多设备需要你预先手动设置为 `MobileStart` 或 `MobileControl`。如果设备未接受该操作命令，会显示错误信息。
这个操作可以在 **Automations** 编辑器中通过 UI 设置，也可以在 **Developer tools** 中执行。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  在 GUI 模式下选择设备，然后切换到 YAML 模式查看 `device_id`。                                                   |
| `program_id`   | no       |  输入 `program_id` 数字。最简单的查找方式是在开发者工具中使用 `get_programs` 操作。你也可以在实际程序运行时下载诊断信息，在键 `state.programId.value_raw` 中找到对应数值。|
| `duration`     | yes      |  为烤箱程序设置可选的持续时间。                                                                                  |
| `temperature`  | yes      |  为烤箱程序设置可选的目标温度。                                                                                  |

### 操作 `miele.get_programs`

获取适用设备可用程序及其关联参数列表。如果设备不支持程序，比如冷冻柜，API 会返回空列表。设备状态要求与前面 `set_program` 操作中描述的一样。

| Data attribute | Optional |  Description                                                                                                      |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `device_id`    | no       |  在 GUI 模式下选择设备，然后切换到 YAML 模式查看 `device_id`。                                                   |

## 自动化示例

从这些自动化示例开始上手。

### 当设备程序结束时发送通知

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Notify when program ends"
triggers:
  - trigger: state
    entity_id:
      - sensor.washing_machine
    to: program_ended
actions:
  - action: notify.notify
    data:
      message: "The appliance has finished the program."
```


</details>

### 设置程序并启动洗衣机

先装好洗衣物，然后在机器上手动启用 mobile start 或 remote control 模式。

<details>
<summary>YAML 配置示例</summary>


```yaml
alias: "Wash cottons early in the morning"
description: "Set cottons program and start washing machine early in the morning"
triggers:
  - trigger: time
    at: "04:00:00"
actions:
  - action: miele.set_program
    data:
      device_id: <Your washing machine's device_id>
      program_id: 1
```


</details>

## 数据更新

此集成通过 Miele API 的服务器发送事件接收来自设备的实时更新。
配置条目加载时，或者在流式传输出错后（例如断开连接后），集成会请求所有设备的全部数据，比如设备信息、可用命令、程序、设置和状态。

## 已知限制

- Miele 第三方 API 与 Miele 应用并不完全一致。应用中可见的某些程序、选项或设置，可能无法通过 API 访问或使用
- 此集成只支持一个集成条目，因为 Miele 第三方 API 无法唯一标识一个账户

## 故障排除

<details>
<summary>手动输入身份验证凭据</summary>


只有在开发者或 Miele 支持团队要求你这样做时，才需要遵循以下说明。正常使用此集成时不需要这样做。

- 访问 [https://www.miele.com/developer](https://www.miele.com/f/com/en/register_api.aspx) 并注册开发者账户
- 为连接输入任意名称，并填写你原始 Miele 应用登录所用的电子邮箱
- 注册成功后，你会收到一封带激活链接的邮件。选择 **Activate** 按钮。记下 client ID 和 secret，下一步会用到
- 系统可能会提示你创建一个 [Application - 提供的 Miele 用户账户邮箱地址必须全部使用小写，否则会导致身份验证失败。
- 密码不应包含特殊字符。即使它在 Miele 应用中可用，也可能无法通过 API 使用
- 请等待几分钟以接收激活邮件。开发者门户中的所有更改都需要几分钟才会生效。请保存好凭据，后续会用到


</details>

<details>
<summary>问题：设备的实体不可用</summary>


重新加载 Miele 集成后，原本可用的某个设备相关实体现在变得不可用。

实体不可用可能有多种原因：

- 设备已关闭。关闭后设备会断开连接，API 无法获取设备信息
- 设备存在网络问题
- Miele API 出现问题

请按以下步骤尝试解决：

1. 打开设备并重新加载 Miele 集成。
2. 如果设备已打开但问题仍存在，请检查设备的网络连接，并对设备执行软重置。
3. 如果问题仍存在，请通过 Miele 应用检查设备与 Miele API 的连接情况。
   1. 打开 Miele 应用。
   2. 进入出现问题的设备。
   3. 选择齿轮图标以查看更多信息。
4. 如果一切都正常但问题仍存在，请联系 Miele 支持。
   - [Miele service and contact](https://www.miele.com/)
   - [Miele developer Help & Support](https://www.miele.com/developer)


</details>

<details>
<summary>问题：程序或程序阶段未知</summary>


最常见的原因是 API 返回了集成尚未识别的代码。缺失代码的详细信息可以在 Home Assistant 日志或诊断文件中找到。请将日志中的详细信息提交到 GitHub issue，同时附上出现该消息时处于活动状态的程序或程序阶段信息。

如果 API 上报的状态本身就是 unknown，也可能显示 Unknown，这通常是云服务暂时异常导致的。


</details>

## 删除集成

此集成遵循标准的集成删除流程。如果你输入过自己的凭据，系统会询问你是保留还是删除它们。如果你想稍后删除，可以在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 中通过三点菜单完成。

1. 进入 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 并选择集成卡片。
2. 从设备列表中，选择你要删除的集成实例。
3. 在条目旁边，选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Delete**。
