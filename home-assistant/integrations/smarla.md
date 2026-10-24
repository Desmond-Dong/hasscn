# Swing2Sleep Smarla

**Swing2Sleep Smarla** 集成使 Home Assistant 能够接入 [Swing2Sleep](https://swing2sleep.de)（Smarla）电动摇篮。通过此集成，您可以控制 Smarla 设备。

## 要求

* 固件版本为 1.6.X 或更高的 Swing2Sleep Smarla 设备。
* Swing2Sleep 应用。
* 可用的互联网连接。

## 注册

1. 按照 Swing2Sleep 应用中的说明操作。
2. 将设备连接到 Wi-Fi 网络。
3. 按照 **Configuration** 的步骤继续，直到出现 access token 字段。
4. 在 Swing2Sleep 应用的 **Settings** 中生成 access token。
5. 复制 access token，并继续完成 **Configuration**。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

## 实体

此组件会创建以下实体：

| Entity         | Platform | Description |
| -------------- | -------- | ----------- |
| `swing_active` | `switch` | 打开或关闭摇篮摆动。 |
| `smart_mode`   | `switch` | 启用或禁用自动强度控制。 |
| `intensity`    | `number` | 设置强度等级（范围：`0` 到 `100`）。 |
| `amplitude`    | `sensor` | 显示当前测得的摆动振幅。 |
| `period`       | `sensor` | 显示当前测得的摆动周期。 |
| `activity`     | `sensor` | 显示当前测得的活动等级。 |
| `swing_count`  | `sensor` | 显示总摆动次数。 |
| `update`       | `update` | 用于跟踪/更新 Smarla 固件。 |

## 移除此集成

此集成遵循标准的集成移除流程。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.

删除集成后，还请前往 Swing2Sleep 应用，在 **Settings** > **Connected devices** 下移除 `Home Assistant` 条目。
