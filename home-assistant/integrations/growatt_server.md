# Growatt

**Growatt** 集成可让您从 Growatt 逆变器获取数据，并控制部分逆变器设置。

完成配置后，此集成会连接到您的 Growatt 账户，并为您的电站和逆变器创建实体，让您能够在 Home Assistant 中监控发电情况并控制相关设置。设置过程中，您可以从多个区域服务器端点中进行选择，以确保账户所在地区获得最佳连接性。

如果您的 Growatt 账户下注册了多个电站，可以在设置过程中选择要集成哪一个。

## 前提条件

* 一个 Growatt 系统和账户
* 您的 Growatt 账户登录凭据（用户名和密码）或 API 令牌

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

在设置过程中，系统会要求您提供以下参数：

```yaml
Server:
  description: "选择与您的 Growatt 账户所在地区匹配的服务器区域。可用选项请参见下方的 **Server regions** 章节。"
Username:
  description: "您的 Growatt 账户用户名（通常是邮箱地址）。使用用户名和密码认证时为必填项。"
Password:
  description: "您的 Growatt 账户密码。使用用户名和密码认证时为必填项。"
API token:
  description: "用于认证的 Growatt API 令牌。使用 API 令牌认证时为必填项。"
Plant:
  description: "如果您的 Growatt 账户下注册了多个电站，请选择要集成的电站。"
```

### 服务器区域

**Server** 参数提供以下选项：

* **North America**：适用于在美国或加拿大注册的账户。使用 `https://openapi-us.growatt.com/`
* **Australia/New Zealand**：适用于在澳大利亚或新西兰注册的账户。使用 `https://openapi-au.growatt.com/`
* **China**：适用于在中国注册的账户。使用 `https://openapi-cn.growatt.com/`
* **Other regions**：除上述地区外，全球其他地区默认使用此选项。使用 `https://openapi.growatt.com/`
* **SMTEN server**：适用于 SMTEN 品牌系统。使用 `http://server.smten.com/`
* **Era server (Atess Power)**：适用于 Atess Power 系统。使用 `http://ess-server.atesspower.com/`

为账户所在地区选择正确的服务器区域可提升数据采集的可靠性和性能。

## 身份验证

此集成支持两种身份验证方式：

* **Username and password**：使用您的 Growatt 账户凭据进行认证。
* **API token**：使用 API 令牌进行认证。这是 Growatt 官方支持的方式，具有更好的安全性、更多功能和更高稳定性。并非所有逆变器型号都已支持，请查看下方 **Compatibility** 章节确认您的逆变器是否受支持。

### 获取 API 令牌

您可以通过网页界面或 ShinePhone 移动应用生成 API 令牌。

<details>
<summary>通过网页界面生成 API 令牌</summary>

1. 在 [Growatt server](https://server.growatt.com/) 上登录您的 Growatt 账户。
2. 进入 **Settings** > **Account Management** > **API Key**。
3. 选择 **Generate** 或 **Retrieve** 获取 API 令牌。
4. 复制该令牌，并在 Home Assistant 中设置集成时使用。

</details>

<details>
<summary>通过 ShinePhone 移动应用生成 API 令牌</summary>

1. 从 [App Store (iOS)](https://apps.apple.com/us/app/shinephone/id1500039308) 或 [Google Play Store (Android)](https://play.google.com/store/apps/details?id=com.growatt.shinephone) 下载并安装 **ShinePhone** 应用。
2. 使用您的账户管理员用户名登录（访客账户无法生成 API 令牌）。
3. 进入 **Me** 标签页。
4. 选择您的用户名。
5. 选择 **API Token**。
6. 选择 **Reopen** 生成新的 API 令牌。
7. 复制该令牌，并在 Home Assistant 中设置集成时使用。

</details>

### 兼容性

#### Classic API

使用用户名和密码认证时，Growatt 集成使用与 ShinePhone 应用相同的 API。因此，如果您的逆变器可以通过 ShinePhone 应用控制，那么 Growatt 集成通常也能访问相同的数据。

#### API token

当前，使用 API 令牌认证支持以下逆变器型号。若要让集成支持更多型号，必须先由 [Growatt Python library](https://github.com/indykoning/PyPi_GrowattServer) 提供支持。

**MIC 600-3300TL-X Series**: 600TL-X, 750TL-X, 800TL-X, 1000TL-X, 1500TL-X, 2000TL-X, 3000TL-X, 3300TL-X

**MIN 2500-6000TL-X Series**: 2500TL-X, 3000TL-X, 3600TL-X, 4200TL-X, 4600TL-X, 5000TL-X, 6000TL-X

**MIN 2500-6000TL-XE Series**: 2500TL-XE, 3000TL-XE, 3600TL-XE, 4200TL-XE, 4600TL-XE, 5000TL-XE, 6000TL-XE

**MIN 2500-6000TL-XH Series**: 2500TL-XH, 3600TL-XH, 4200TL-XH, 4600TL-XH, 5000TL-XH, 6000TL-XH

**MIN 2500-6000TL-XA Series**: 2500TL-XA, 3000TL-XA, 3600TL-XA, 4200TL-XA, 4600TL-XA, 5000TL-XA

**MIN 3000-7600TL-XH US Series**: 3000TL-XH US, 3800TL-XH US, 5000TL-XH US, 6000TL-XH US, 7600TL-XH US, 8200TL-XH US, 9000TL-XH US, 10000TL-XH US, 11400TL-XH US

**MOD 3-10KTL3-XH Series**: 3000TL3-XH, 4000TL3-XH, 5000TL3-XH, 6000TL3-XH, 7000TL3-XH, 8000TL3-XH, 9000TL3-XH, 10KTL3-XH

**MID 11-30KTL3-XH Series**: 11KTL3-XH, 12KTL3-XH, 13KTL3-XH, 15KTL3-XH, 17KTL3-XH, 20KTL3-XH, 25KTL3-XH, 30KTL3-XH

## 已知限制

### 用户名/密码认证的速率限制

Classic API（用户名/密码认证）具有严格的速率限制，超出限制后可能导致您的账户被锁定最长 24 小时。为避免此问题，请使用以下方案之一：

* **方案 1：您的逆变器支持 API token**：改用令牌认证，因为它使用的是 Growatt 官方 V1 API，不存在此限制。
* **方案 2：您的逆变器不支持 API token**：避免一切不必要的集成重载，因为重载会触发通过 Growatt classic API 重新登录。

## 逆变器控制

使用 API 令牌认证时，此集成会提供额外的控制实体：

:::warning
这些控制会直接修改逆变器的运行设置。只有在您明确了解这些设置对系统影响的情况下才应更改。不正确的设置可能损坏电池、降低系统效率或导致保修失效。请自行承担风险。
:::

### 数值实体

* **Charge power**
  * **Description**: 将充电功率设置为百分比（0-100%）
* **Charge stop SOC**
  * **Description**: 设置停止充电时的荷电状态百分比（0-100%）
* **Discharge power**
  * **Description**: 将放电功率设置为百分比（0-100%）
* **Discharge stop SOC**
  * **Description**: 设置停止放电时的荷电状态百分比（0-100%）

### 开关实体

* **AC charge**
  * **Description**: 启用或禁用 AC 充电

## 操作

此集成为管理 MIN 逆变器上的分时电价（TOU）电池计划提供以下操作：

### 操作：更新时间段

`growatt_server.update_time_segment` 操作用于配置单个时间段（1-9）的电池运行模式、时间范围以及启用/禁用状态，以实现自动化的电池充放电计划。

:::warning
此操作会修改逆变器的 TOU 调度设置。错误配置可能影响电池的充放电行为和电费成本。请在更改前确保您了解自己的电价结构。
:::

**数据属性：**

* **device\_id** *(string, optional)*：逆变器的设备 ID。仅在存在多个设备时需要
* **segment\_id** *(integer, required)*：时间段编号（1-9）
* **batt\_mode** *(string, required)*：系统的能量优先模式：

  * `load_first`：优先使用可用能源（太阳能/电池）为家庭负载供电，并在需要时放电以满足家庭用电
  * `battery_first`：优先使用可用能源（太阳能/电网）为电池充电
  * `grid_first`：优先将可用能源（太阳能/电池）输出到电网，并会为并网输出而让电池放电

  :::note
  电池模式控制的是何时以及为何放电。实际放电速率由 **Discharge power** 数值实体（0-100%）控制。
  :::
* **start\_time** *(time, required)*：该时间段的开始时间（HH:MM 格式）
* **end\_time** *(time, required)*：该时间段的结束时间（HH:MM 格式）
* **enabled** *(boolean, required)*：该时间段是否启用

### 操作：读取时间段

`growatt_server.read_time_segments` 操作用于从逆变器读取全部 9 个时间段的当前配置，并返回完整的 TOU 调度配置。

**数据属性：**

* **device\_id** *(string, optional)*：MIN 逆变器的设备 ID。仅在存在多个设备时需要

## 示例

### 低谷时段充电计划

在低电价时段为电池充电（例如午夜到早上 6 点）：

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 1
  batt_mode: "battery_first"
  start_time: "00:00"
  end_time: "06:00"
  enabled: true
  # For multiple devices, add device_id: "MIN12345"
```

:::note
请记得同时设置 **Charge power** 数值实体（0-100%），以控制该时间段内的充电功率。
:::

### 峰时并网输出计划

在高电价时段将电池电力输出到电网（例如下午 4 点到晚上 8 点）：

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 2
  batt_mode: "grid_first"
  start_time: "16:00"
  end_time: "20:00"
  enabled: true
```

:::note
请记得同时设置 **Discharge power** 数值实体（0-100%），以控制该时间段内的放电功率。
:::

### 白天家庭优先计划

在常规用电时段优先满足家庭用电（例如早上 6 点到晚上 10 点）：

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 3
  batt_mode: "load_first"
  start_time: "06:00"
  end_time: "22:00"
  enabled: true
```

### 读取当前 TOU 配置

检查当前的时间段设置：

```yaml
action: growatt_server.read_time_segments
```

## 故障排除

### API 令牌认证显示 “No plant found” 错误

如果您在使用 API 令牌认证时收到 “No plant found” 错误，而用户名/密码认证工作正常，那么问题通常与 API 令牌的创建方式有关。

有人反馈，通过网页界面生成的 API 令牌有时无法正常工作，而通过 ShinePhone 移动应用生成的令牌则可以正常使用。

请尝试以下步骤：

1. 使用 **ShinePhone mobile app** 而不是网页界面重新生成 API 令牌。
2. 在 Home Assistant 中重新配置 Growatt 集成以使用新的 API 令牌。有关通过移动应用生成和使用令牌的详细说明，请参阅上方 **Obtaining an API token** 章节。

### 账户被锁定或身份验证失败

如果您遇到身份验证失败或账户被锁定的情况：

1. **接受新的条款与条件**：打开 ShinePhone 移动应用并使用您的 Growatt 账户登录。在集成能够成功访问您的账户之前，您可能需要先接受更新后的条款与条件。

2. **因速率限制导致账户被锁定**：如果您使用的是用户名/密码认证，并且账户因速率限制被锁定：
   * 等待锁定期结束（最长可达 24 小时）。
   * 如果您的逆变器支持 API 令牌认证，请考虑切换过去。
   * 避免频繁重载集成，因为这会触发速率限制。

3. **防止在 Home Assistant 重启期间被锁定**：
   * 如果您经常遇到账户锁定，可在重启 Home Assistant 前临时禁用该集成。
   * 禁用方法：前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，选择 Growatt 集成，点击三点菜单 `[mdi:dots-vertical]`，然后选择 **Disable**。
   * 等 Home Assistant 完全重启后再重新启用。

### 启用调试日志

为了帮助诊断问题，请启用调试日志：

1. 将以下内容添加到您的 `configuration.yaml` 文件中：

   ```yaml
   logger:
     logs:
       homeassistant.components.growatt_server: debug
   ```

2. 重启 Home Assistant。

3. 尝试设置或重新加载该集成。

4. 在 [**Settings** > **System** > **Logs**](https://my.home-assistant.io/redirect/logs/) 中查看日志。

有关调试日志的更多信息，请参阅 [debug logs and diagnostics](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。

### 报告问题

如果您遇到了无法通过上述故障排除步骤解决的问题：

1. 为该集成启用 [debug logging](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。
2. 在 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) 中重新加载该集成：选择 **Growatt**，打开三点菜单 `[mdi:dots-vertical]`，然后选择 **Reload**。
3. 等待问题再次出现，或尝试复现问题。
4. 从 [**Settings** > **System** > **Logs**](https://my.home-assistant.io/redirect/logs/) 下载日志。
5. 如果可以，也请下载该集成的 [diagnostics](/home-assistant/integrations/diagnostics.md) 数据。
6. 在 GitHub 上[报告问题](https://github.com/home-assistant/core/issues)，并附上：
   * 调试日志
   * diagnostics 数据
   * 您的逆变器型号
   * 截图
   * 对问题的清晰描述
   * 复现步骤

提供调试日志将显著加快问题的定位和解决速度。

## 删除集成

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
