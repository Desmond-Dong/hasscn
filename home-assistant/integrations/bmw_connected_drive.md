# BMW Connected Drive

**BMW Connected Drive** 集成允许您从 MyBMW 门户（以前称为 BMW Connected Drive）获取您的 BMW 或 MINI 车辆数据。

:::note
Home Assistant 中可用的实体很大程度上取决于您车辆的功能（车型年份、主机单元等）。集成将确保所有可用的车辆属性都添加为实体。

:::

## 前提条件

您需要拥有一个已连接车辆的 MyBMW 活跃账户。对于 MINI 车辆，您需要在 MINI Connected 注册。

有关您 BMW 车辆的兼容性，请查看 GitHub 上的 [bimmer\_connected 页面](https://github.com/bimmerconnected/bimmer_connected)。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Username:
  description: |
    您的 MyBMW/MINI Connected 账户用户名。

    &nbsp;
    
    **中国**：您的用户名/电话号码必须以 `86` 为前缀，即 `8612345678`。
Password:
  description: "您的 MyBMW/MINI Connected 账户密码。"
Region:
  description: "您的 MyBMW/MINI Connected 账户所在区域。"
  options: china, north_america, rest_of_world
Captcha token (第二步，仅适用于北美和世界其他地区):
  description: |
    **北美**和**世界其他地区**需要解决验证码挑战，这意味着您需要验证您不是机器人。

    - 输入登录数据后，第二步将要求提供 `Captcha token` 并为您提供指向网站的**链接**。 
    - 打开此链接，解决**"您是人类吗？"**挑战并按**提交**。
    - 将生成的令牌复制到 Home Assistant 并继续。

    在此步骤中，不会与任何第三方共享您的 Home Assistant 实例数据。
```

## Options

To define options for BMW Connected Drive, follow these steps:

1. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/).

2. If multiple instances of BMW Connected Drive are configured, choose the instance you want to configure.

3. On the card, select the cogwheel `[mdi:cog-outline]`.

   * If the card does not have a cogwheel, the integration does not support options for this device.

   ![Screenshot showing the cogwheel icon on an integration card in the Settings > Devices & services page](/home-assistant/images/screenshots/device-options.png)

4. Edit the options, then select **Submit** to save the changes.

```yaml
Read-only:
  description: 不对车辆执行动作。您只能通过 `notify` 向车辆发送兴趣点（POI）。
```

## 数据更新

集成将按以下间隔从 MyBMW/MINI 服务器拉取数据：

| 区域        | 间隔   |
|---------------|------------|
| 中国         | 5 分钟  |
| 北美 | 10 分钟 |
| 世界其他地区 | 5 分钟  |

:::note
这只会刷新 BMW/MINI 服务器的数据，而**不会**刷新您车辆的数据。从车辆到服务器的更新通常发生在：

* 对于**内燃机**车辆，当车辆停放且发动机关闭时。
* 对于**电动**车辆，当车辆停放并关闭或正在充电时。

行驶时，服务器不会更新。

:::

### 定义自定义轮询间隔

If you want to define a specific interval at which your device is polled for data, you can disable the default polling interval and create your own polling automation.

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), and select your integration.
2. On the integration entry, select `[mdi:dots-vertical]`.
   * Then, select **System options** and toggle the button to disable polling.
     ![Disable polling for updates](/home-assistant/images/screenshots/custom_polling_01.png)
3. To define your custom polling interval, create an automation.
   * Go to [**Settings** > **Automations & scenes**](https://my.home-assistant.io/redirect/automations/) and create a new automation.
   * Define any trigger and condition you like.
   * Select **Add action**, then select **Other actions**.
   * Select **Perform action**, and from the list, select the [`homeassistant.update_entity` action](/home-assistant/integrations/homeassistant/index.md#action-homeassistantupdate_entity).
   * Choose your targets by selecting the **Choose area**, **Choose device**, **Choose entity**, or **Choose label** buttons.
     ![Update entity](/home-assistant/images/screenshots/custom_polling_02.png)
4. Save your new automation to poll for data.

## 可用平台

此集成提供以下平台：

* 二值传感器：车门、车窗、基于条件的服务、检查控制消息、驻车灯、门锁状态、充电状态（电动汽车）和连接状态（电动汽车）。
* 设备跟踪器：您车辆的位置。
* [门锁](/home-assistant/integrations/bmw_connected_drive/index.md#lock)：控制您车辆的门锁。
* 传感器：里程、剩余续航、剩余燃油、剩余充电时间（电动汽车）、充电状态（电动汽车）、电动续航（电动汽车）。
* [通知](/home-assistant/integrations/bmw_connected_drive/index.md#notifications)：向您的车辆发送兴趣点（POI）。
* [按钮](/home-assistant/integrations/bmw_connected_drive/index.md#buttons)：打开空调、鸣笛、闪灯、更新车辆位置和更新状态。
* [选择器](/home-assistant/integrations/bmw_connected_drive/index.md#selects)：显示和控制（PH）EV 的充电相关设置。
* [开关](/home-assistant/integrations/bmw_connected_drive/index.md#switches)：显示和切换您车辆的设置。
* [数字](/home-assistant/integrations/bmw_connected_drive/index.md#numbers)：显示和控制（PH）EV 的数值充电相关设置。

:::warning
除**二值传感器**和**传感器**外，每个平台都可以更改您车辆的状态。一旦您在 Home Assistant 中更改状态，就会向您的车辆发送命令。

:::
 

:::important
`北美`和`世界其他地区`需要解决验证码挑战，即您需要验证您是人类。
输入登录数据后，第二步将要求提供 `Captcha token` 并提供指向网站的链接。
请打开此链接，解决"您是人类吗？"挑战并按`提交`。
将生成的令牌复制到 Home Assistant 并继续。

在此步骤中，不会与任何第三方共享您的 Home Assistant 实例数据。

:::
:::note
对于`中国`，您的用户名/电话号码必须以 `86` 为前缀，即 `8612345678`。

:::

### 通知

**BMW Connected Drive** 集成提供通知动作。使用此动作，您可以向您的车辆发送兴趣点（POI）。在您的车辆中，您可以选择此 POI，导航将自动开始使用该 POI 作为目的地。
该动作的名称为 `notify.bmw_connected_drive_<your_vehicle>`。

### 向您的车辆发送兴趣点

```yaml
...
actions:
  - action: notify.bmw_connected_drive_<your_vehicle>
    data:
      message: POI 的名称 # 这会显示在 iDrive 仪表板上
      data:
        latitude: 48.177024
        longitude: 11.559107
        street: 街道名称  # 可选
        city: 城市名称  # 可选
        postal_code: 邮政编码  # 可选
        country: 国家  # 可选
```

### 门锁

车辆可以通过为每辆车自动创建的门锁集成进行锁定和解锁。

:::note
如果您的车辆不提供当前状态（未创建传感器实体），您也无法看到当前的门锁状态。您仍然可以锁定/解锁车辆。

:::

### 按钮

按钮用于触发车辆中的动作。按钮会自动创建，可以从 UI 或使用 `button.press` 动作按下/执行。有关更多信息，请参阅[按钮文档](/home-assistant/integrations/button/index.md)。

#### 空调

车辆的空调可以通过 `button.<your_vehicle>_activate_air_conditioning` 按钮激活。

这里具体启动什么取决于车辆类型。可能只是通风、辅助加热或真正的空调。如果您的车辆配备辅助加热，仅在车辆停放在安全使用的地方时触发此动作（例如，不要在地下停车场或封闭车库内）。

#### 鸣笛

`button.<your_vehicle>_sound_horn` 按钮使车辆鸣笛。此选项在某些国家（包括英国）不可用。请负责任地使用此功能，因为它可能会打扰您的邻居。

#### 闪灯

`button.<your_vehicle>_light_flash` 按钮使车辆闪灯。

#### 车辆查找

`button.<your_vehicle>_find_vehicle` 按钮请求车辆更新 GPS 位置。这可用于不自动发送更新 GPS 位置的旧车辆。

:::warning
使用此动作将**把您的 Home Assistant 位置发送给 BMW**，因为 API 要求这样做（就像与 MyBMW 应用共享您的手机位置以进行车辆跟踪一样）。
如果您不希望这样做，请从您的手机触发 `vehicle_finder` 动作，它应该在 5 分钟内在 Home Assistant 中更新。

:::
:::note
在某些旧车（2014 年 7 月之前生产的非 i3/i8 系列）上，如果车辆距离您的 Home Assistant 实例位置超过 1.5 公里，此动作将无法获取您的车辆位置。这是 BMW API 的限制。

:::

### 选择器

如果您有（PH）EV，您可以通过 Home Assistant 控制充电过程。选择器根据您车辆的功能自动创建，可以从 UI 或使用 `select.select_option` 动作按下/执行。有关更多信息，请参阅[选择器文档](/home-assistant/integrations/select/index.md)。

* **充电模式**：车辆可以设置为 `IMMEDIATE_CHARGING`（插入后立即充电）或 `DELAYED_CHARGING`（仅在充电窗口内充电）。如果充电窗口设置正确，可用于开始/停止充电。
* **交流充电限制**：车辆充电的最大电流。并非所有 EV 都可用。

### 开关

如果您的车辆支持，您可以显示和切换具有启动/停止功能的远程动作。

* **气候**：切换车辆空调。无法强制加热或冷却；车辆将自行决定。如果开启，它将运行 30 分钟（就像通过 MyBMW 应用切换一样）。
* **充电**：如果已插入，切换车辆充电。仅在某些电动汽车上可用。

### 数字

如果您有（PH）EV，您可以通过 Home Assistant 控制充电过程。数字实体根据您车辆的功能自动创建，可以从 UI 或使用 `number.set_value` 动作更改。有关更多信息，请参阅[数字文档](/home-assistant/integrations/number/index.md)。

* **目标 SoC**：车辆将充电直到达到此电池电量。并非所有 EV 都可用。

## 故障排除

<details>
<summary>问题：身份验证无效</summary>

这可能发生在初始登录或一段时间后。请执行以下步骤：

* 登录您的 MyBMW **网站**并验证您的凭据（例如，确保用户名和密码正确）。
* 如果您无法在网站上登录，请**停用**轮询（参见[定义自定义轮询间隔](#defining-a-custom-polling-interval)）并等待**至少 24 小时**。
* 一旦您可以登录网站，通过 [**设置** > **设备与服务**](https://my.home-assistant.io/redirect/integrations/) 重新配置/重新验证集成，点击 `[mdi:dots-vertical]` 并选择**重新配置**。
* 再次激活轮询

</details>

<details>
<summary>问题：验证码验证缺失</summary>

有时，您的账户可能会被强制登出。对于**北美**和**世界其他地区**，恢复需要手动干预。

Home Assistant 将显示一个修复问题以**重新配置**集成。按照步骤重新登录。

</details>

## 已知限制

* Home Assistant 可用的实体取决于您的车辆。即使在相同的型号代码内（例如，BMW X1 的 U11），您也会看到不同的实体，具体取决于您特定车辆的功能。
* 并非所有功能都已实现，主要与（PH）EV 的充电控制相关。如果您在 MyBMW/MINI 应用中有尚未可用的功能，请在 [`bimmer_connected` 讨论](https://github.com/bimmerconnected/bimmer_connected/discussions)中搜索现有的功能请求或创建新的请求。

## 移除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

## 免责声明

此软件不隶属于 BMW Group，也不受其认可。
