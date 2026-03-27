---
title: Tesla Fleet
description: 'Tesla Fleet 集成可通过 Tesla Fleet API(https://developer.tesla.com/) 让你控制 Tesla 车辆和能源站点。 本页属于 Home Assistant 中文文档，适合查阅安装部署、集成、自动化与日常使用说明。'
ha_category:
  - Binary sensor
  - Button
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 2024.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: tesla_fleet
ha_platforms:
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
---
# Tesla Fleet

**Tesla Fleet** 集成可通过 [Tesla Fleet API](https://developer.tesla.com/) 让你控制 Tesla 车辆和能源站点。

## 先决条件

你需要配置开发者凭据并托管公钥文件，Home Assistant 才能与你的 Tesla 账户通信。

- 一个已验证邮箱的 [Tesla](https://tesla.com) 账户
- 一个用于托管公钥文件的 Web 域名：
  - [NGINX Home Assistant SSL proxy app](https://github.com/home-assistant/addons/blob/master/nginx_proxy/DOCS.md)（推荐）
  - 外部托管服务（[FleetKey.net](https://fleetkey.net)、[MyTeslamate.com](https://app.myteslamate.com/fleet) 等）

:::warning
此集成当前不支持中国区。

:::
## Tesla 开发者应用

创建 Tesla 开发者应用，将 Home Assistant 连接到 Tesla Fleet API。

1. 创建开发者应用：
   - 前往 [developer.tesla.com/request](https://developer.tesla.com/request)
   - 在下拉列表中选择你的 Tesla 账户

2. 填写应用信息：
   - 应用名称：用于标识该应用
   - 描述：简要说明你的集成用途
   - Usage Purpose：说明 API 使用目的（例如 `Home Assistant`）

3. 配置客户端信息：
   - OAuth Grant Type：选择 **Authorization Code and Machine-to-Machine**
   - Allowed Origin URL(s)：填写你的域名 URL，例如 `https://yourdomain.com/`
   - Allowed Redirect URI：填写 `https://my.home-assistant.io/redirect/oauth`
   - Allowed Returned URL(s)：留空（非必填）

4. 选择所需 API scope：
   - Vehicle Information（车辆必需）
   - Vehicle Location（推荐）
   - Vehicle Commands（推荐）
   - Energy Product Information（能源产品必需）
   - Energy Product Settings（推荐）

5. 设置计费（可选）：
   - Tesla 为个人使用提供每月 10 美元额度
   - 你可以稍后再补充计费信息

6. 保存凭据：
   - 创建应用后，前往 **View Details** > **Credentials & APIs**
   - 记录 **Client ID** 和 **Client Secret**，配置 Home Assistant 时会用到

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

1. 添加应用凭据
   - 输入 Tesla 开发者应用中的 Client ID 和 Client Secret
   - 如果你已配置且仅配置了一个 Tesla Fleet [application credential](/home-assistant/integrations/application_credentials/)，将跳过此步骤

2. 使用 Tesla 账户认证：
   - 你将被重定向到 Tesla 登录页
   - 输入 Tesla 账户凭据
   - 在授权页选择 **Select All**，然后选择 **Allow**，授予之前选择的所有 scope

3. 跳回 Home Assistant：
   - 确认你要 **Link account to Home Assistant**

4. 输入域名
   - 输入你计划托管公钥的域名
   - 该域名应与 origin 域名相同或为其子域名，并且必须使用有效的 SSL 证书

5. 注册公钥
   - 将显示出的公钥上传到你在步骤 4 输入的域名路径：`.well-known/appspecific/com.tesla.3p.public-key.pem`

6. 安装虚拟钥匙
   - 使用手机扫描二维码，或输入地址，在 Tesla App 中将公钥安装到你的车辆
   - 该步骤需要对每辆车重复执行，2021 年前生产的 Model S 和 Model X 除外

## 使用 NGINX app 托管（可选）

1. 创建 NGINX 配置：

   ```bash
   echo 'location /.well-known/appspecific/com.tesla.3p.public-key.pem {
   root /share/tesla;
   }' > /share/nginx_proxy_default_tesla.conf
   ```

2. 将设置流程中显示的公钥复制到 `/share/tesla`

3. 配置 NGINX app：
   - 前往 **Settings** > **Apps** > **NGINX Home Assistant SSL proxy** > **Configuration**
   - 将 `customize.active` 从 `false` 改为 `true`
   - `config.default` 保持默认值 `nginx_proxy_default*.conf`

4. 重启 NGINX app，并确认可通过以下地址访问公钥：
   `https://yourdomain.com/.well-known/appspecific/com.tesla.3p.public-key.pem`

## 数据更新

当车辆处于唤醒状态时，此集成会每 10 分钟 polls 一次。这个频率可让多数用户保持在 Tesla 每月 10 美元额度内，你可以在 [Tesla Developer Dashboard](https://developer.tesla.com/en_US/dashboard) 监控用量。能源产品 API 免费。

如果你需要不同的轮询间隔，可以[定义自定义轮询间隔](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval)。

## 指令签名

部分车辆（包括 2023 年末以来生产的所有车辆）要求使用私钥对车辆指令签名。如果需要签名但密钥未正确配置，所有车辆实体动作都会失败并报错。

你必须访问 `https://tesla.com/_ak/YOUR_DOMAIN` 并按 Tesla App 指引，将公钥添加到每辆需要签名的车辆上。
如果你使用 iPhone，可能需要使用 Safari 打开该页面完成配置。

更多信息请参阅 [Tesla Fleet API vehicle commands documentation](https://developer.tesla.com/docs/fleet-api/endpoints/vehicle-commands#key-pairing)。

## 生成自己的密钥对

此集成会自动在 `config/tesla_fleet.key` 生成私钥。你也可以在配置集成前替换为自己的密钥（例如来自另一个 Home Assistant 实例的密钥）。如需自行生成密钥对，请参考 [Tesla 文档](https://developer.tesla.com/docs/fleet-api/getting-started/what-is-fleet-api#step-3-generate-a-public-private-key-pair)。

## 实体

以下是 Tesla Fleet 集成可提供的实体。并非所有实体默认启用，也并非所有数值始终可用。

### 车辆

| Domain         | Name                                       | Enabled |
| -------------- | ------------------------------------------ | ------- |
| Binary sensor  | Battery heater                             | No      |
| Binary sensor  | Cabin overheat protection actively cooling | No      |
| Binary sensor  | Charge cable                               | Yes     |
| Binary sensor  | Charger has multiple phases                | No      |
| Binary sensor  | Dashcam                                    | No      |
| Binary sensor  | Front driver door                          | Yes     |
| Binary sensor  | Front driver window                        | Yes     |
| Binary sensor  | Front passenger door                       | Yes     |
| Binary sensor  | Front passenger window                     | Yes     |
| Binary sensor  | Preconditioning enabled                    | No      |
| Binary sensor  | Preconditioning                            | No      |
| Binary sensor  | Rear driver door                           | Yes     |
| Binary sensor  | Rear driver window                         | Yes     |
| Binary sensor  | Rear passenger door                        | Yes     |
| Binary sensor  | Rear passenger window                      | Yes     |
| Binary sensor  | Scheduled charging pending                 | No      |
| Binary sensor  | Status                                     | Yes     |
| Binary sensor  | Tire pressure warning front left           | No      |
| Binary sensor  | Tire pressure warning front right          | No      |
| Binary sensor  | Tire pressure warning rear left            | No      |
| Binary sensor  | Tire pressure warning rear right           | No      |
| Binary sensor  | Trip charging                              | No      |
| Binary sensor  | User present                               | Yes     |
| Button         | Flash lights                               | Yes     |
| Button         | HomeLink                                   | Yes     |
| Button         | Honk horn                                  | Yes     |
| Button         | Keyless driving                            | Yes     |
| Button         | Play fart                                  | Yes     |
| Button         | Wake                                       | Yes     |
| Climate        | Cabin overheat protection                  | No      |
| Climate        | Climate                                    | Yes     |
| Cover          | Charge port door                           | Yes     |
| Cover          | Frunk                                      | Yes     |
| Cover          | Sunroof                                    | No      |
| Cover          | Trunk                                      | Yes     |
| Cover          | Vent windows                               | Yes     |
| Device tracker | Location                                   | Yes     |
| Device tracker | Route                                      | Yes     |
| Lock           | Charge cable lock                          | Yes     |
| Lock           | Lock                                       | Yes     |
| Media player   | Media player                               | Yes     |
| Number         | Charge current                             | Yes     |
| Number         | Charge limit                               | Yes     |
| Select         | Seat heater front left                     | Yes     |
| Select         | Seat heater front right                    | Yes     |
| Select         | Seat heater rear center                    | No      |
| Select         | Seat heater rear left                      | No      |
| Select         | Seat heater rear right                     | No      |
| Select         | Seat heater third row left                 | No      |
| Select         | Seat heater third row right                | No      |
| Select         | Steering wheel heater                      | Yes     |
| Sensor         | Battery level                              | Yes     |
| Sensor         | Battery range                              | Yes     |
| Sensor         | Charge cable                               | No      |
| Sensor         | Charge energy added                        | Yes     |
| Sensor         | Charge rate                                | Yes     |
| Sensor         | Charger current                            | Yes     |
| Sensor         | Charger power                              | Yes     |
| Sensor         | Charger voltage                            | Yes     |
| Sensor         | Charging                                   | Yes     |
| Sensor         | Distance to arrival                        | Yes     |
| Sensor         | Driver temperature setting                 | No      |
| Sensor         | Estimate battery range                     | No      |
| Sensor         | Fast charger type                          | No      |
| Sensor         | Ideal battery range                        | No      |
| Sensor         | Inside temperature                         | Yes     |
| Sensor         | Odometer                                   | No      |
| Sensor         | Outside temperature                        | Yes     |
| Sensor         | Passenger temperature setting              | No      |
| Sensor         | Power                                      | No      |
| Sensor         | Shift state                                | No      |
| Sensor         | Speed                                      | No      |
| Sensor         | State of charge at arrival                 | No      |
| Sensor         | Time to arrival                            | Yes     |
| Sensor         | Time to full charge                        | Yes     |
| Sensor         | Tire pressure front left                   | No      |
| Sensor         | Tire pressure front right                  | No      |
| Sensor         | Tire pressure rear left                    | No      |
| Sensor         | Tire pressure rear right                   | No      |
| Sensor         | Traffic delay                              | No      |
| Sensor         | Usable battery level                       | No      |
| Switch         | Auto seat climate left                     | Yes     |
| Switch         | Auto seat climate right                    | Yes     |
| Switch         | Auto steering wheel heater                 | Yes     |
| Switch         | Charge                                     | Yes     |
| Switch         | Defrost                                    | Yes     |
| Switch         | Sentry mode                                | Yes     |
| Update         | Update                                     | Yes     |

### 能源站点

| Domain        | Name                           | Enabled |
|--------------|--------------------------------|---------|
| Binary sensor | Backup capable                 | Yes     |
| Binary sensor | Grid services active           | Yes     |
| Binary sensor | Grid services enabled          | Yes     |
| Binary sensor | Storm watch active             | Yes     |
| Number        | Backup reserve                 | Yes     |
| Number        | Off grid reserve               | Yes     |
| Select        | Allow export                   | Yes     |
| Select        | Operation mode                 | Yes     |
| Sensor        | Battery power                  | Yes     |
| Sensor        | Consumer imported from battery | No      |
| Sensor        | Consumer imported from generator| No      |
| Sensor        | Consumer imported from grid    | No      |
| Sensor        | Consumer imported from solar   | No      |
| Sensor        | Energy left                    | Yes     |
| Sensor        | Generator exported             | Yes     |
| Sensor        | Generator power                | No      |
| Sensor        | Grid exported                  | Yes     |
| Sensor        | Grid exported from battery     | No      |
| Sensor        | Grid exported from generator   | No      |
| Sensor        | Grid exported from solar       | No      |
| Sensor        | Grid imported                  | No      |
| Sensor        | Grid power                     | Yes     |
| Sensor        | Grid services exported         | No      |
| Sensor        | Grid services imported         | No      |
| Sensor        | Grid services power            | Yes     |
| Sensor        | Home usage                     | Yes     |
| Sensor        | Island status                  | Yes     |
| Sensor        | Load power                     | Yes     |
| Sensor        | Percentage charged             | Yes     |
| Sensor        | Solar exported                 | No      |
| Sensor        | Solar generated                | Yes     |
| Sensor        | Solar power                    | Yes     |
| Sensor        | Total pack energy              | No      |
| Sensor        | Version                        | Yes     |
| Sensor        | VPP backup reserve             | Yes     |
| Switch        | Allow charging from grid       | Yes     |
| Switch        | Storm watch                    | Yes     |

### 壁挂充电器

| Domain | Name        | Enabled |
| ------ | ----------- | ------- |
| Sensor | Fault state | No      |
| Sensor | Power       | Yes     |
| Sensor | State       | Yes     |
| Sensor | Vehicle     | Yes     |

## 车辆休眠

持续 API 轮询会阻止多数 2021 年前生产的 Model S 和 Model X 进入休眠。此集成会在这些车辆无活动后自动停止轮询 15 分钟。你可以调用 `homeassistant.update_entity` 动作强制轮询，这会重置计时器。

:::note
除上述车型外，其他车型通常不会出现无法休眠的问题。 
:::
## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

- 删除集成不会删除你的 Tesla 开发者应用；如不再需要，可在 [Tesla Developer Dashboard](https://developer.tesla.com/dashboard) 手动删除。

## 故障排除

- **设置报错**：确认你的公钥可通过正确 URL 访问，并已完成所有 Tesla 注册步骤
- **命令失败**：确认 `tesla_fleet.key` 存在于 Home Assistant 配置目录，并通过 `https://tesla.com/_ak/YOUR_DOMAIN` 将公钥添加到车辆
- **集成停止工作**：在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) > **Tesla Fleet** 使用重新配置选项
- **Access to this resource is not authorized**：检查 [Tesla Developer Dashboard](https://developer.tesla.com/dashboard) 用量是否超限，并在需要时补充计费信息。在部分国家，*Fart*（远程 boombox）命令因法律限制也会触发该错误

如果你的凭据有问题，可以在 [Application Credentials](https://my.home-assistant.io/redirect/application_credentials/) 界面删除这些凭据。
