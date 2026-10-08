# Homee

[homee](https://hom.ee) 是一个智能家居系统，可集成 Z-Wave、Zigbee、EnOcean 等多种协议。homee 集成可让您在 Home Assistant 中使用 homee 的设备。

## Prerequisites

您需要在 homee 应用中创建一个新用户。请创建一个仅供 Home Assistant 使用的用户。出于安全考虑，建议您：

* 使用强且唯一的密码。
* 仅授予该用户在 Home Assistant 中所需的权限。
* 不要将此账号用于其他用途。

1. 在 homee 应用左上角，选择菜单按钮。
2. 在展开菜单右上角，选择齿轮 `[mdi:gear-outline]` 图标。
3. 选择 **Manage users**。
4. 选择 **Add user** 并按需配置。

:::note 配置
此集成可通过 UI 配置。前往 **设置 > 设备与服务** 添加。
:::

```yaml
Host:
  description: homee 的 IP 地址。
User:
  description: 您在前置条件中设置的用户名。
Password:
  description: 该用户的密码。
```

可用设备会自动出现在您的 Home Assistant 安装中。
向 homee 添加新设备后，重启 Home Assistant 即可自动发现。此重启仅在添加新设备时需要，现有设备状态更新不需要重启。

## Limitations

数值变化会由 homee 按固定时间间隔上报，而非始终实时上报。例如，当遮罩设备移动时，位置仅每隔几秒更新一次，Home Assistant 可能会错过中间状态。

## Troubleshooting

请先查看通用的 [Home Assistant 故障排查指南](/home-assistant/docs/configuration/troubleshooting/index.md)。

**homee** 集成支持[调试日志和诊断](/home-assistant/docs/configuration/troubleshooting/index.md#debug-logs-and-diagnostics)。

### homee device not working as expected

请先确认设备在 homee 中运行正常。
如果某个 homee 设备已出现在 Home Assistant 中，但运行异常或缺少实体，请提交 [issue](https://github.com/home-assistant/core/issues) 并附上错误日志和设备诊断数据。

### Integration not loading or homee device not showing up in HA

请检查用于 Home Assistant 的 homee 用户是否有权限查看该设备。
如果权限无误，请提交 [issue](https://github.com/home-assistant/core/issues) 并附上错误日志和集成诊断数据。

## Reconfiguration

此集成支持重新配置，即使设备已完成设置，您仍可修改 IP 地址。

### To start the reconfiguration

1. 前往 [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/)，并选择 homee 集成卡片。
2. 在中枢列表中，选择要重新配置的设备。
3. 在该条目旁选择三点 `[mdi:dots-vertical]` 菜单，然后选择 **Reconfigure**。

## Removing the integration

此集成遵循标准移除流程。移除集成后，您也可以在 homee 中删除该专用用户。

### To remove an integration instance from Home Assistant

1. Go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/) and select the integration card.
2. From the list of devices, select the integration instance you want to remove.
3. Next to the entry, select the three-dot `[mdi:dots-vertical]` menu. Then, select **Delete**.
