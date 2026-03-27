---
title: Electricity Maps
description: 'Electricity Maps 集成（原名 CO2Signal）查询 Electricity Maps(https://electricitymaps.com/free-tier) API 获取特定区域的 CO2 强度。 可以通过使用家庭位置、纬度/经度或区域代码来收集您家庭的数据。'
ha_category:
  - Climate
  - Energy
  - Environment
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: co2signal
ha_platforms:
  - diagnostics
  - sensor
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
  - '@VIKTORVAV99'
---
# Electricity Maps

**Electricity Maps** 集成（原名 CO2Signal）查询 [Electricity Maps](https://electricitymaps.com/free-tier) API 获取特定区域的 CO2 强度。
可以通过使用家庭位置、纬度/经度或区域代码来收集您家庭的数据。

此 API 使用与 [Electricity Maps 应用](https://app.electricitymaps.com/map/) 相同的数据。
并非世界上所有国家/地区都受支持，因此在设置集成之前请检查应用以验证本地可用性。

## 使用场景

Electricity Maps 集成帮助您实时了解电网的碳强度。此信息可用于：

- 在碳强度较低的时段安排耗能任务（如给电动车充电或运行家电）。
- 创建响应电网条件变化的自动化。
- 可视化您所在地区向清洁能源转型的进展。
- 了解天气条件如何影响您所在地区的可再生能源可用性。
- 在 [**能源仪表板**](https://my.home-assistant.io/redirect/energy/) 中追踪您家庭能源使用的碳影响。

## 前提条件

要配置和使用此集成，您需要在 [Electricity Maps API 门户](https://electricitymaps.com/free-tier) 注册免费层产品以获取免费 API 密钥。

请注意，免费层 API 仅限于一个位置，称为区域。一个区域代表一个特定的电网区域。这些区域与您的公用事业提供商不匹配。创建账户时，您需要选择并指定您家庭位置的区域。例如，美国有多个区域，如 `US-CENT-SWPP`（西南电力联盟）、`US-CAR-DUK`（杜克能源卡罗来纳）或 `US-CAR-CPLE`（杜克能源进步东部）。

要查找您的区域标识符，您可以：
- 查看 [Electricity Maps 应用](https://app.electricitymaps.com/map/live/fifteen_minutes) 看哪个区域覆盖您的位置。您可以从 URL 获取确切的区域代码。对于法国，URL 看起来像 `.../map/zone/FR/live/...`。区域代码在 `.../zone/{区域代码}` 之后。在这个例子中，它是 `FR`。
- 使用[覆盖范围表](https://app.electricitymaps.com/coverage)按地理区域查找区域。


:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

集成在设置时提供以下配置选项：

```yaml
Location:
  description: 选择使用您的 Home Assistant 配置的家庭位置、特定的区域代码或自定义纬度/经度坐标。
API key:
  description: 从 Electricity Maps API 门户获取的 API 密钥。
```

当根据纬度/经度配置位置时，系统会提示您输入以下内容：

```yaml
Latitude:
  description: 您家庭位置的纬度。
Longitude:
  description: 您家庭位置的经度。
```

当根据区域代码配置位置时，系统会提示您输入以下内容：

```yaml
Zone key:
  description: 您家庭位置的区域代码。对于大多数国家，这是两位字母的 ISO 3166-1 alpha-2 国家代码（例如，`DE` 代表德国，`GB` 代表英国）。但是，对于美国，您需要指定包含特定电网区域的区域代码，如 `US-CENT-SWPP` 代表西南电力联盟、`US-CAR-DUK` 代表杜克能源卡罗来纳或 `US-CAR-CPLE` 代表杜克能源进步东部。您可以在 [Electricity Maps 应用](https://app.electricitymaps.com) 或使用 [区域 API 参考](https://app.electricitymaps.com/developer-hub/api/reference#zones) 中找到区域代码。
```

## 支持的功能

### 传感器

集成为每个配置的位置创建两个传感器：

- **碳强度**：显示您所在地区电力生产的碳强度，以 gCO2eq/kWh（每千瓦时等效 CO2 克数）为单位测量。
- **化石燃料百分比**：显示当前电网生产中依赖化石燃料的电力百分比。

## 示例

### 创建仪表板卡片

您可以创建一个仪表卡片来可视化您的电力碳强度：


```yaml
type: gauge
entity: sensor.electricity_maps_carbon_intensity
name: Carbon Intensity
min: 0
max: 500
severity:
  green: 0
  yellow: 150
  red: 300
```


### 自动化示例：在碳强度低时运行家电

此自动化在碳强度低于特定阈值时启动洗碗机：


```yaml
alias: "Run Dishwasher at Low Carbon Intensity"
description: "Starts the dishwasher when carbon intensity is low"
trigger:
  - platform: numeric_state
    entity_id: sensor.electricity_maps_carbon_intensity
    below: 100
    for:
      minutes: 10
condition:
  - condition: time
    after: "22:00:00"
    before: "06:00:00"
  - condition: state
    entity_id: binary_sensor.dishwasher_ready
    state: "on"
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.dishwasher
  - action: notify.mobile_app
    data:
      message: "Dishwasher started during low carbon intensity period ({{ states('sensor.electricity_maps_carbon_intensity') }} gCO2eq/kWh)"
```


### 创建历史图表追踪变化

将此添加到您的仪表板以追踪全天碳强度的变化：


```yaml
type: history-graph
entities:
  - entity: sensor.electricity_maps_carbon_intensity
    name: Carbon Intensity
hours_to_show: 24
refresh_interval: 60
```


### 能源仪表板集成

Electricity Maps 集成在设置后会自动用于能源仪表板。碳强度数据在能源仪表板中显示为实时仪表，展示您家庭用电的碳足迹。

您无需手动配置任何内容——集成会被能源仪表板自动检测并用于根据您的能源消耗和当前电网碳强度计算和显示您家庭的碳排放。

要查看此信息：
1. 导航到 [**能源仪表板**](https://my.home-assistant.io/redirect/energy/)。
2. 在仪表板中查找碳强度仪表。

如果您在能源仪表板中看不到碳信息：
1. 确保 Electricity Maps 集成已正确设置并正常工作。
2. 验证您已在 Home Assistant 中配置了能源监控。

## 数据更新

集成默认每 15 分钟从 Electricity Maps API 轮询数据。实际更新频率可能受您的 API 层级速率限制限制。

## 已知限制

- 免费层 API 仅限于一个区域。一个区域代表一个特定的电网区域。创建账户时您需要指定区域。如果需要更改区域，您需要删除并重新配置集成。
- 免费层 API 有每小时 50 次请求的限制，但集成设计的轮询速率不会超过此限制。
- 并非所有地理区域都被 Electricity Maps 支持。请检查其应用以查看您所在的区域是否有覆盖。

## 故障排除

### 集成设置失败

#### 症状：设置时出现"令牌无效"

如果您在设置时看到无效令牌错误，您的 API 密钥可能无效或已过期。

##### 解决方案

1. 验证您已正确从 Electricity Maps API 门户复制 API 密钥。
2. 检查您的 API 密钥在 Electricity Maps API 门户中是否仍然有效。
3. 如果问题持续存在，尝试生成新的 API 密钥。

#### 症状：设置时出现"所选位置无可用数据"

如果您收到"所选位置无可用数据"错误，您提供的坐标或区域代码可能不被 Electricity Maps 支持，或者可能存在区域不匹配。

##### 解决方案

1. 查看 [Electricity Maps 应用](https://app.electricitymaps.com) 验证您所在位置的覆盖范围。
2. 如果使用区域代码，验证您使用的是正确格式。例如，对于美国，您应该使用特定的区域代码如 `US-CENT-SWPP` 而不是仅仅 `US`。对于国家级数据，使用两位字母的 ISO 国家代码。
3. 确保您在 Home Assistant 中输入的区域代码与您创建 API 密钥时选择的区域匹配。如果需要更改区域，您需要创建新的 API 密钥并重新配置集成。
4. 尝试使用区域代码而不是坐标。这更准确且不易出错。
5. 如果您的确切位置不受支持，尝试使用最近的受支持位置。

### 传感器显示"不可用"

如果您的传感器在成功设置后显示为"不可用"，可能存在 API 连接问题。

#### 解决方案

1. 检查您的互联网连接。
2. 验证您的 API 密钥当天仍有可用配额。
3. 检查 Electricity Maps 服务是否正在经历停机。
4. 如果问题持续存在，重启 Home Assistant。

## 移除集成

此集成遵循标准集成移除流程。无需额外步骤。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.