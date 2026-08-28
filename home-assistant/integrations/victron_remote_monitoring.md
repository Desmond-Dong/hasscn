# Victron Remote Monitoring

**Victron Remote Monitoring**（VRM）集成会将 [Victron Energy](https://www.victronenergy.com/) 的 <abbr title="Victron Remote Monitoring">VRM</abbr> 门户中的站点统计数据、太阳能发电预测和用电预测导入 Home Assistant。它可提供次日、下一小时以及未来六天的发电和用电预测，也包含峰值时段预测。此集成需要至少 30 天的 VRM 历史数据后，预测功能才会可用。

## 前提条件

* <abbr title="Victron Remote Monitoring">VRM</abbr> 访问令牌（请务必保密）。可在 VRM Portal 的 **Preferences** > **Integrations** > **Access tokens** 中创建，或使用[此链接](https://vrm.victronenergy.com/access-tokens)。
* 使用创建该令牌的账户访问您的站点。

### 预测要求

* <abbr title="Victron Remote Monitoring">VRM</abbr> 安装中必须包含太阳能系统，并且所有用电数据都通过逆变器或电网电表进行计量。
* VRM 中至少需要有 30 天数据后，预测才会出现。

:::important
您的 <abbr title="Victron Remote Monitoring">VRM</abbr> 访问令牌可完全访问 VRM 门户，包括系统控制和数据读取。请像对待密码一样对待它：

* 不要分享它。
* 如果怀疑已泄露，请立即轮换令牌。

:::
:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 设置说明

1. 出现提示时，粘贴您的 <abbr title="Victron Remote Monitoring">VRM</abbr> 访问令牌。
2. 验证通过后，集成会自动获取该令牌可访问的站点列表。
3. 从下拉列表中选择站点并完成设置。

## 数据更新

<abbr title="Victron Remote Monitoring">VRM</abbr> 集成每 60 分钟从 VRM API 获取一次最新数据。

## 传感器实体

### 太阳能发电预测

* Estimated energy production — Yesterday
* Estimated energy production — Today
* Remaining production — Today
* Estimated energy production — Tomorrow
* Production — Current hour
* Production — Next hour
* Peak production time — Yesterday
* Peak production time — Today
* Peak production time — Tomorrow

### 用电预测

* Estimated energy consumption — Yesterday
* Estimated energy consumption — Today
* Remaining consumption — Today
* Estimated energy consumption — Tomorrow
* Consumption — Current hour
* Consumption — Next hour
* Peak consumption time — Yesterday
* Peak consumption time — Today
* Peak consumption time — Tomorrow

## 将 Victron Remote Monitoring 添加到能源仪表板

太阳能发电预测可以添加到内置的[能源仪表板](/home-assistant/docs/energy/index.md)，以便将预期发电量与实际能耗数据一起可视化显示。

### 前提条件

* 您必须先将太阳能板添加到能源仪表板。
  * 如果尚未添加，请按照[能源仪表板文档](/home-assistant/docs/energy/index.md)中的说明完成设置。

### 将 Victron Remote Monitoring 添加到能源仪表板

1. Go to [**Settings** > **Dashboards** > **Energy**](https://my.home-assistant.io/redirect/energy/).
2. In the **Solar panels** section, edit your solar panels and enable the **Forecast production** option.
3. Select the desired Victron Remote Monitoring installation from the list of available forecast providers.
4. 选择 **Save**。
   * 无需额外参数。集成会从您的 VRM 数据中获取预测。
   * **结果**：预测现在会显示在能源仪表板的太阳能发电图表中。

## 故障排除

### 无法设置身份验证

#### 症状：“Invalid authentication”

#### 说明

这通常表示所使用的令牌无效或已过期。

#### 解决方法

请确认您登录的是正确的 <abbr title="Victron Remote Monitoring">VRM</abbr> 账户，然后尝试以下步骤：

1. Log in to the VRM portal and under **Preferences** > **Integrations** > **Access tokens** (or use [this link](https://vrm.victronenergy.com/access-tokens)), remove the current token if present.
2. Generate a new token by selecting **Add** on the same page, enter the token name, leave the expiry date empty, and select **Create token**.
3. Copy and paste the newly generated token into Home Assistant. Follow the setup instructions.

### 设置期间未列出任何站点

#### 症状：下拉列表为空、“No sites found for this account” 或 “Site ID not found. Please check the ID and try again.”

#### 说明

集成无法找到与您账户关联的任何站点或安装。

#### 解决方法

请确认您登录的是正确的 <abbr title="Victron Remote Monitoring">VRM</abbr> 账户，并且拥有访问目标站点或安装的权限。

### 找不到传感器

#### 症状：传感器不可用或缺失

#### 说明

集成无法获取预测数据。

#### 解决方法

1. Check the logs and the **Settings** > **Devices & services** page for any errors.
2. Check if you still have permission to access the desired site or installation.
3. 如果您刚重置或刚设置 <abbr title="Victron Remote Monitoring">VRM</abbr> Forecasts，数据出现前可能会有最长 30 天的延迟。

## 移除集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，请前往 <abbr title="Victron Remote Monitoring">VRM</abbr> Portal 的 **Preferences** > **Integrations** > **Access tokens**，或使用[此链接](https://vrm.victronenergy.com/access-tokens)删除该令牌。
